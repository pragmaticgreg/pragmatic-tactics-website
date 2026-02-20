/**
 * Contact Flow — Multi-step modal form
 * Triggered by [data-contact-flow-trigger] buttons.
 * Works across pages — step count and fields are detected from the DOM.
 */

(() => {
  const modal = document.getElementById('contact-flow');
  if (!modal) return;

  // Auto-detect step count from DOM (exclude confirmation step)
  const allSteps = modal.querySelectorAll('[data-cf-step]');
  const TOTAL_STEPS = allSteps.length - 1;

  // Elements
  const backBtn = modal.querySelector('[data-cf-back]');
  const nextBtn = modal.querySelector('[data-cf-next]');
  const progressText = modal.querySelector('[data-cf-progress-text]');
  const progressBar = modal.querySelector('[data-cf-progress-bar]');
  const footer = modal.querySelector('[data-cf-footer]');
  const steps = modal.querySelectorAll('[data-cf-step]');
  const apiBaseOverride = modal.getAttribute('data-cf-api-base');

  let currentStep = 1;
  let formData = {};
  let isSubmitting = false;

  const getApiBase = () => {
    if (apiBaseOverride) return apiBaseOverride;
    if (window.CONTACT_FLOW_API_BASE) return window.CONTACT_FLOW_API_BASE;
    if (window.location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      return 'https://us-central1-pragmatic-tactics-site.cloudfunctions.net/api';
    }
    return '/api';
  };

  const contactFlowUrl = `${getApiBase().replace(/\/$/, '')}/contact-flow`;
  let submitController = null;
  let submitRequestId = 0;

  // ===================== Open / Close =====================

  function open() {
    cancelInFlightSubmission();
    currentStep = 1;
    formData = {};
    resetAllSteps();
    showStep(1);
    modal.classList.add('cf-modal--active');
    document.body.style.overflow = 'hidden';
    // Focus first input after animation
    setTimeout(() => {
      const firstInput = modal.querySelector('[data-cf-step="1"] .cf-input');
      if (firstInput) firstInput.focus();
    }, 150);
  }

  function close() {
    cancelInFlightSubmission();
    modal.classList.remove('cf-modal--active');
    document.body.style.overflow = '';
  }

  // Triggers
  document.querySelectorAll('[data-contact-flow-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  });

  // Close handlers
  modal.querySelectorAll('[data-cf-close]').forEach(el => {
    el.addEventListener('click', (e) => {
      // Only close if clicking the overlay itself or a close button, not children
      if (e.target === el || el.classList.contains('cf-modal__close') || el.classList.contains('cf-confirmation__link')) {
        close();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('cf-modal--active')) {
      close();
    }
  });

  // ===================== Step Navigation =====================

  function showStep(n) {
    currentStep = n;
    steps.forEach(s => s.classList.remove('cf-step--active'));
    const step = modal.querySelector(`[data-cf-step="${n}"]`);
    if (step) step.classList.add('cf-step--active');

    // Progress
    if (n <= TOTAL_STEPS) {
      progressText.textContent = `Step ${n} of ${TOTAL_STEPS}`;
      progressBar.style.width = `${(n / TOTAL_STEPS) * 100}%`;
    }

    // Back button visibility
    backBtn.classList.toggle('cf-btn-back--hidden', n === 1);

    // Next button label
    if (n === TOTAL_STEPS) {
      nextBtn.textContent = 'Send';
    } else if (n < TOTAL_STEPS) {
      nextBtn.textContent = 'Continue';
    }

    // Hide footer on confirmation step
    if (n === TOTAL_STEPS + 1) {
      footer.style.display = 'none';
      progressText.textContent = '';
      progressBar.style.width = '100%';
    } else {
      footer.style.display = 'flex';
    }

    // Update next button disabled state
    updateNextEnabled();
  }

  backBtn.addEventListener('click', () => {
    if (isSubmitting) return;
    if (currentStep > 1) showStep(currentStep - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (isSubmitting) return;
    if (!validateCurrentStep()) return;
    collectCurrentStepData();

    if (currentStep === TOTAL_STEPS) {
      submitForm();
    } else {
      showStep(currentStep + 1);
    }
  });

  // ===================== Option Selection =====================

  modal.addEventListener('click', (e) => {
    const option = e.target.closest('.cf-option');
    if (!option) return;

    const container = option.closest('[data-cf-select]');
    if (!container) return;

    const selectType = container.getAttribute('data-cf-select');

    if (selectType === 'single') {
      // Deselect all others
      container.querySelectorAll('.cf-option').forEach(o => o.classList.remove('cf-option--selected'));
      option.classList.add('cf-option--selected');

      // Handle "Other" reveal
      const fieldName = container.getAttribute('data-cf-field');
      const otherContainer = modal.querySelector(`[data-cf-other="${fieldName}"]`);
      if (otherContainer) {
        const isOther = option.getAttribute('data-value') === 'Other';
        otherContainer.classList.toggle('cf-other-input--visible', isOther);
        if (isOther) {
          setTimeout(() => otherContainer.querySelector('.cf-input')?.focus(), 100);
        }
      }
    } else if (selectType === 'multi') {
      const max = parseInt(container.getAttribute('data-cf-max') || '99', 10);
      const selected = container.querySelectorAll('.cf-option--selected');

      if (option.classList.contains('cf-option--selected')) {
        option.classList.remove('cf-option--selected');
      } else if (selected.length < max) {
        option.classList.add('cf-option--selected');
      }
    }

    updateNextEnabled();
  });

  // ===================== Validation =====================

  function validateCurrentStep() {
    if (currentStep === 1) {
      const nameInput = modal.querySelector('[data-cf-field="name"]');
      const emailInput = modal.querySelector('[data-cf-field="email"]');
      const nameError = modal.querySelector('[data-cf-error="name"]');
      const emailError = modal.querySelector('[data-cf-error="email"]');
      let valid = true;

      // Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('cf-input--error');
        nameError.classList.add('cf-input-error--visible');
        valid = false;
      } else {
        nameInput.classList.remove('cf-input--error');
        nameError.classList.remove('cf-input-error--visible');
      }

      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('cf-input--error');
        emailError.classList.add('cf-input-error--visible');
        valid = false;
      } else {
        emailInput.classList.remove('cf-input--error');
        emailError.classList.remove('cf-input-error--visible');
      }

      return valid;
    }

    // Steps 2-6 are optional (no required selections)
    return true;
  }

  function updateNextEnabled() {
    if (isSubmitting) {
      nextBtn.disabled = true;
      return;
    }
    if (currentStep === 1) {
      const name = modal.querySelector('[data-cf-field="name"]').value.trim();
      const email = modal.querySelector('[data-cf-field="email"]').value.trim();
      nextBtn.disabled = !name || !email;
    } else {
      nextBtn.disabled = false;
    }
  }

  // Enable/disable next as user types on step 1
  const nameInput = modal.querySelector('[data-cf-field="name"]');
  const emailInput = modal.querySelector('[data-cf-field="email"]');
  if (nameInput) nameInput.addEventListener('input', updateNextEnabled);
  if (emailInput) emailInput.addEventListener('input', updateNextEnabled);

  // Clear error states on input
  if (nameInput) nameInput.addEventListener('input', () => {
    nameInput.classList.remove('cf-input--error');
    modal.querySelector('[data-cf-error="name"]').classList.remove('cf-input-error--visible');
  });
  if (emailInput) emailInput.addEventListener('input', () => {
    emailInput.classList.remove('cf-input--error');
    modal.querySelector('[data-cf-error="email"]').classList.remove('cf-input-error--visible');
  });

  // ===================== Data Collection =====================

  function collectCurrentStepData() {
    const step = modal.querySelector(`[data-cf-step="${currentStep}"]`);
    if (!step) return;

    // Collect text inputs with data-cf-field
    step.querySelectorAll('.cf-input[data-cf-field]').forEach(input => {
      formData[input.getAttribute('data-cf-field')] = input.value.trim();
    });

    // Collect textareas with data-cf-field
    step.querySelectorAll('.cf-textarea[data-cf-field]').forEach(textarea => {
      formData[textarea.getAttribute('data-cf-field')] = textarea.value.trim();
    });

    // Collect option selections
    step.querySelectorAll('[data-cf-select]').forEach(container => {
      const fieldName = container.getAttribute('data-cf-field');
      const selectType = container.getAttribute('data-cf-select');
      const selected = container.querySelectorAll('.cf-option--selected');

      if (selectType === 'single') {
        const value = selected.length ? selected[0].getAttribute('data-value') : '';
        if (value === 'Other') {
          const otherInput = modal.querySelector(`[data-cf-field="${fieldName}_other"]`);
          formData[fieldName] = otherInput ? otherInput.value.trim() || 'Other' : 'Other';
        } else {
          formData[fieldName] = value;
        }
      } else if (selectType === 'multi') {
        formData[fieldName] = Array.from(selected).map(o => o.getAttribute('data-value'));
      }
    });
  }

  // ===================== Submission =====================

  async function submitForm() {
    if (isSubmitting) return;
    isSubmitting = true;
    submitRequestId += 1;
    const requestId = submitRequestId;
    submitController = new AbortController();
    backBtn.disabled = true;
    nextBtn.disabled = true;
    nextBtn.textContent = 'Sending...';
    clearSubmitError();

    const payload = {
      ...formData,
      submitted_at: new Date().toISOString(),
      source_page: modal.getAttribute('data-cf-source') || window.location.pathname
    };

    try {
      const response = await fetch(contactFlowUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: submitController.signal
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      if (requestId === submitRequestId) {
        showStep(TOTAL_STEPS + 1);
      }
    } catch (err) {
      if (err?.name === 'AbortError') {
        return;
      }
      console.error('Contact flow submission error:', err);
      showSubmitError('Something went wrong. Please try again.');
    } finally {
      isSubmitting = false;
      submitController = null;
      backBtn.disabled = false;
      nextBtn.disabled = false;
      nextBtn.textContent = 'Send';
    }
  }

  function cancelInFlightSubmission() {
    if (!isSubmitting) return;
    if (submitController) {
      submitController.abort();
    }
    submitController = null;
    isSubmitting = false;
    backBtn.disabled = false;
    nextBtn.disabled = false;
    nextBtn.textContent = 'Send';
  }

  function getSubmitErrorEl() {
    let errorEl = modal.querySelector('[data-cf-submit-error]');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.setAttribute('data-cf-submit-error', '');
      errorEl.style.color = '#b42318';
      errorEl.style.fontSize = '0.95rem';
      errorEl.style.margin = '0 0 12px';
      errorEl.style.display = 'none';
      footer.prepend(errorEl);
    }
    return errorEl;
  }

  function showSubmitError(message) {
    const errorEl = getSubmitErrorEl();
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }

  function clearSubmitError() {
    const errorEl = modal.querySelector('[data-cf-submit-error]');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  // ===================== Reset =====================

  function resetAllSteps() {
    // Clear text inputs
    modal.querySelectorAll('.cf-input, .cf-textarea').forEach(input => {
      input.value = '';
      input.classList.remove('cf-input--error');
    });

    // Clear error messages
    modal.querySelectorAll('.cf-input-error').forEach(el => {
      el.classList.remove('cf-input-error--visible');
    });

    // Clear option selections
    modal.querySelectorAll('.cf-option').forEach(o => o.classList.remove('cf-option--selected'));

    // Hide "other" inputs
    modal.querySelectorAll('.cf-other-input').forEach(el => el.classList.remove('cf-other-input--visible'));

    // Reset next button
    nextBtn.textContent = 'Continue';
    nextBtn.disabled = true;
    backBtn.disabled = false;

    // Show footer
    footer.style.display = 'flex';

    clearSubmitError();
  }
})();
