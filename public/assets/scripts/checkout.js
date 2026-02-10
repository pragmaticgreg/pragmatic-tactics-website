(() => {
  const offersUrl = '/assets/data/offers.json';
  const buyButtons = Array.from(document.querySelectorAll('[data-checkout-button]'));
  const statusEl = document.querySelector('[data-checkout-status]');
  const nameEl = document.querySelector('[data-offer-name-display]');
  const priceEl = document.querySelector('[data-offer-price]');
  const descEl = document.querySelector('[data-offer-description-display]');

  let activeCheckoutToken = null;
  let cachedOffer = null;
  let isInitializingCheckout = false;

  const offerId =
    window.OFFER_ID ||
    buyButtons[0]?.getAttribute('data-offer-id') ||
    document.querySelector('[data-offer-id]')?.getAttribute('data-offer-id');

  if (!offerId) {
    return;
  }

  const setStatus = (message, tone = 'info') => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.dataset.tone = tone;
    statusEl.classList.add('checkout-status--active');
  };

  const formatPrice = (amount, currency) => {
    try {
      return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: currency || 'CAD',
        maximumFractionDigits: 0
      }).format(amount);
    } catch (error) {
      return `${currency || 'CAD'} ${amount}`;
    }
  };

  const loadOffer = async () => {
    if (cachedOffer) return cachedOffer;
    const response = await fetch(offersUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Unable to load offers.');
    }
    const offers = await response.json();
    const offer = offers.find((item) => item.id === offerId);
    if (!offer) {
      throw new Error('Offer not found.');
    }
    cachedOffer = offer;
    return offer;
  };

  const hydrateOffer = async () => {
    try {
      const offer = await loadOffer();
      if (nameEl) nameEl.textContent = offer.name;
      if (descEl && offer.shortDescription) {
        descEl.textContent = offer.shortDescription;
      }
      if (priceEl) {
        priceEl.textContent = formatPrice(offer.price, offer.currency);
      }
    } catch (error) {
      setStatus('Offer details could not be loaded. Please refresh.', 'error');
    }
  };

  const isAllowedOrigin = (origin) => {
    try {
      const url = new URL(origin);
      if (url.protocol !== 'https:') return false;
      return url.hostname === 'secure.helcim.app' || url.hostname.endsWith('.helcim.app');
    } catch (error) {
      return false;
    }
  };

  const handlePaymentEvent = (event) => {
    if (!activeCheckoutToken) return;
    if (!isAllowedOrigin(event.origin)) return;
    const payload = event.data || {};
    const identifierKey = `helcim-pay-js-${activeCheckoutToken}`;

    if (payload.eventName !== identifierKey) return;

    if (payload.eventStatus === 'SUCCESS') {
      window.location.href = `/thank-you.html?offerId=${encodeURIComponent(offerId)}`;
      return;
    }

    if (payload.eventStatus === 'ABORTED') {
      window.location.href = `/cancelled.html?offerId=${encodeURIComponent(offerId)}&status=aborted`;
      return;
    }

    if (payload.eventStatus === 'HIDE') {
      setStatus('Checkout closed. You can try again when ready.', 'info');
    }
  };

  const setButtonsBusy = (isBusy) => {
    buyButtons.forEach((button) => {
      button.setAttribute('aria-busy', isBusy ? 'true' : 'false');
      button.setAttribute('aria-disabled', isBusy ? 'true' : 'false');
      if (isBusy) {
        button.classList.add('is-processing');
      } else {
        button.classList.remove('is-processing');
      }
    });
  };

  const initializeCheckout = async () => {
    if (buyButtons.length === 0 || isInitializingCheckout) return;
    isInitializingCheckout = true;

    setButtonsBusy(true);
    setStatus('Preparing secure checkout...', 'info');

    try {
      await loadOffer();
      const response = await fetch('/api/checkout/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offerId })
      });

      if (!response.ok) {
        throw new Error('Checkout initialization failed.');
      }

      const data = await response.json();
      const checkoutToken = data.checkoutToken;

      if (!checkoutToken || typeof window.appendHelcimPayIframe !== 'function') {
        throw new Error('Checkout is unavailable. Please contact us.');
      }

      activeCheckoutToken = checkoutToken;
      window.addEventListener('message', handlePaymentEvent);
      window.appendHelcimPayIframe(checkoutToken);
      setStatus('Checkout ready. Complete your payment to continue.', 'success');
    } catch (error) {
      setStatus('We could not start checkout. Please try again or contact us.', 'error');
    } finally {
      isInitializingCheckout = false;
      setButtonsBusy(false);
    }
  };

  hydrateOffer();

  buyButtons.forEach((buyButton) => {
    buyButton.addEventListener('click', (event) => {
      event.preventDefault();
      initializeCheckout();
    });
  });
})();
