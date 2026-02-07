(() => {
  const offersUrl = '/assets/data/offers.json';
  const params = new URLSearchParams(window.location.search);
  const offerId = params.get('offerId');

  const titleEl = document.querySelector('[data-thank-you-title]');
  const messageEl = document.querySelector('[data-thank-you-message]');
  const actionEl = document.querySelector('[data-thank-you-action]');
  const fallbackEl = document.querySelector('[data-thank-you-fallback]');

  const setFallback = () => {
    if (messageEl) {
      messageEl.textContent = 'We received your request. Please reply to your receipt email and we will assist you shortly.';
    }
    if (actionEl) {
      actionEl.classList.add('hidden');
    }
  };

  if (!offerId) {
    setFallback();
    return;
  }

  fetch(offersUrl, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Offers not available');
      return response.json();
    })
    .then((offers) => {
      const offer = offers.find((item) => item.id === offerId);
      if (!offer) {
        setFallback();
        return;
      }

      if (titleEl) {
        titleEl.textContent = `Thanks for choosing ${offer.name}`;
      }

      if (offer.fulfillment?.type === 'redirect') {
        if (messageEl) {
          messageEl.textContent = 'Next step: complete the intake form so we can start quickly.';
        }
        if (actionEl) {
          actionEl.textContent = offer.fulfillment.buttonLabel || 'Open intake form';
          actionEl.setAttribute('href', offer.fulfillment.redirectUrl || '#');
          actionEl.classList.remove('hidden');
        }
        if (fallbackEl && offer.fulfillment.fallbackMessage) {
          fallbackEl.textContent = offer.fulfillment.fallbackMessage;
        }
        return;
      }

      if (messageEl) {
        messageEl.textContent =
          offer.fulfillment?.fallbackMessage ||
          'You will receive the next steps by email within 1 business day.';
      }
      if (actionEl) {
        actionEl.classList.add('hidden');
      }
      if (fallbackEl) {
        fallbackEl.textContent = 'If you have questions, reply to your receipt email and we will help.';
      }
    })
    .catch(() => {
      setFallback();
    });
})();
