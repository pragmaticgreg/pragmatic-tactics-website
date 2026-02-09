const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const helcimApiToken = defineSecret('HELCIM_API_TOKEN');

const OFFERS = {
  'strategy-kickoff': {
    price: 297,
    currency: 'CAD',
    helcimOptions: {
      paymentMethod: 'cc',
      confirmationScreen: true,
      displayContactFields: 1
    }
  },
  'ops-blueprint-download': {
    price: 79,
    currency: 'CAD',
    helcimOptions: {
      paymentMethod: 'cc',
      confirmationScreen: true,
      displayContactFields: 1
    }
  },
  'findoc-extractor-access': {
    price: 49,
    currency: 'CAD',
    helcimOptions: {
      paymentMethod: 'cc',
      confirmationScreen: true,
      displayContactFields: 1
    }
  }
};

const isCheckoutInitPath = (req) => {
  return req.path === '/checkout/initialize' || req.originalUrl === '/api/checkout/initialize';
};

const isContactFlowPath = (req) => {
  return req.path === '/contact-flow' || req.originalUrl === '/api/contact-flow';
};

exports.api = onRequest(
  { secrets: [helcimApiToken], cors: true, region: 'us-central1' },
  async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    // --- Contact Flow Submission ---
    if (isContactFlowPath(req) && req.method === 'POST') {
      try {
        const {
          name, email, business_type, team_size,
          biggest_drags, interests, open_text,
          submitted_at, source_page
        } = req.body || {};

        if (!name || !email) {
          res.status(400).json({ error: 'Name and email are required' });
          return;
        }

        await db.collection('contact_flow_submissions').add({
          name,
          email,
          business_type: business_type || '',
          team_size: team_size || '',
          biggest_drags: biggest_drags || [],
          interests: interests || [],
          open_text: open_text || '',
          submitted_at: submitted_at || new Date().toISOString(),
          source_page: source_page || '',
          created_at: admin.firestore.FieldValue.serverTimestamp()
        });

        res.json({ success: true });
      } catch (error) {
        console.error('Contact flow error:', error);
        res.status(500).json({ error: 'Failed to save submission' });
      }
      return;
    }

    if (!isCheckoutInitPath(req) || req.method !== 'POST') {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    const { offerId } = req.body || {};
    const offer = OFFERS[offerId];

    if (!offer) {
      res.status(400).json({ error: 'Invalid offer' });
      return;
    }

    try {
      const response = await fetch('https://api.helcim.com/v2/helcim-pay/initialize', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-token': helcimApiToken.value()
        },
        body: JSON.stringify({
          paymentType: 'purchase',
          amount: offer.price,
          currency: offer.currency,
          ...offer.helcimOptions
        })
      });

      if (!response.ok) {
        const errorPayload = await response.text();
        res.status(502).json({ error: 'Payment init failed', details: errorPayload });
        return;
      }

      const data = await response.json();
      res.json({ checkoutToken: data.checkoutToken });
    } catch (error) {
      res.status(500).json({ error: 'Unexpected error initializing checkout' });
    }
  }
);
