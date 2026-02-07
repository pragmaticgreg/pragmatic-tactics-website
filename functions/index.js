const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

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

exports.api = onRequest(
  { secrets: [helcimApiToken], cors: true, region: 'us-central1' },
  async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
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
