const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const nodemailer = require('nodemailer');

const helcimApiToken = defineSecret('HELCIM_API_TOKEN');
const contactFlowSmtpUser = defineSecret('CONTACT_FLOW_SMTP_USER');
const contactFlowSmtpPass = defineSecret('CONTACT_FLOW_SMTP_PASS');

const OFFERS = {
  'ops-basecamp': {
    price: 750,
    currency: 'CAD',
    helcimOptions: {
      paymentMethod: 'cc',
      confirmationScreen: true,
      displayContactFields: 1
    }
  },
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
  },
  'discovery': {
    price: 800,
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
  { secrets: [helcimApiToken, contactFlowSmtpUser, contactFlowSmtpPass], cors: true, region: 'us-central1' },
  async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    // --- Contact Flow Submission ---
    if (isContactFlowPath(req) && req.method === 'POST') {
      try {
        const body = req.body || {};
        const { name, email, source_page, submitted_at, ...rest } = body;

        if (!name || !email) {
          res.status(400).json({ error: 'Name and email are required' });
          return;
        }

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: contactFlowSmtpUser.value(),
            pass: contactFlowSmtpPass.value()
          }
        });

        const sourcePage = source_page || 'unknown';
        const submittedAt = submitted_at || new Date().toISOString();

        // Build email body from all submitted fields
        const emailLines = [
          `New contact flow submission (${sourcePage})`,
          '',
          `Name: ${name}`,
          `Email: ${email}`
        ];

        // Append all other fields dynamically
        for (const [key, value] of Object.entries(rest)) {
          const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          if (Array.isArray(value)) {
            emailLines.push(`${label}: ${value.length ? value.join(', ') : 'None selected'}`);
          } else {
            emailLines.push(`${label}: ${value || 'Not provided'}`);
          }
        }

        emailLines.push(`Submitted at: ${submittedAt}`);
        emailLines.push(`Source page: ${sourcePage}`);

        await transporter.sendMail({
          from: `Pragmatic Tactics <${contactFlowSmtpUser.value()}>`,
          to: 'Greg@pragmatictactics.com',
          replyTo: email,
          subject: `Contact flow submission (${sourcePage}) - ${name}`,
          text: emailLines.join('\n')
        });

        res.json({ success: true });
      } catch (error) {
        console.error('Contact flow error:', error);
        res.status(500).json({ error: 'Failed to send submission' });
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
