/**
 * Contact Form Popup
 * Opens from the footer email icon.
 */

class ContactPopup {
    constructor() {
        this.popup = document.getElementById('contact-popup');
        this.form = document.getElementById('contact-form');
        this.successMessage = document.getElementById('contact-success');
        this.closeBtn = this.popup?.querySelector('.contact-popup__close');
        this.overlay = this.popup?.querySelector('.contact-popup__overlay');
        this.submitBtn = this.popup?.querySelector('.contact-form__submit');
        this.submitText = this.popup?.querySelector('.contact-form__submit-text');
        this.submitLoading = this.popup?.querySelector('.contact-form__submit-loading');
        this.triggerBtn = document.getElementById('footer-email-trigger');

        if (!this.popup) return;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initIcons();
    }

    setupEventListeners() {
        // Trigger button (footer email icon)
        if (this.triggerBtn) {
            this.triggerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPopup();
            });
        }

        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hidePopup());
        }

        // Overlay click
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.hidePopup());
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.hidePopup();
            }
        });

        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    initIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    showPopup() {
        this.popup.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Initialize icons after popup is shown
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 50);

        // Focus first field
        setTimeout(() => {
            this.popup.querySelector('#contact-name')?.focus();
        }, 150);
    }

    hidePopup() {
        this.popup.classList.remove('active');
        document.body.style.overflow = '';
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Show loading state
        this.setLoadingState(true);

        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            business_type: formData.get('business_type'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            source: 'contact_popup'
        };

        try {
            const response = await fetch('/api/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                this.showSuccess();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending contact form:', error);
            this.showError();
        } finally {
            this.setLoadingState(false);
        }
    }

    setLoadingState(loading) {
        if (!this.submitBtn || !this.submitText || !this.submitLoading) return;

        if (loading) {
            this.submitBtn.disabled = true;
            this.submitText.style.display = 'none';
            this.submitLoading.style.display = 'flex';
        } else {
            this.submitBtn.disabled = false;
            this.submitText.style.display = 'block';
            this.submitLoading.style.display = 'none';
        }
    }

    showSuccess() {
        if (this.form) this.form.style.display = 'none';
        if (this.successMessage) this.successMessage.style.display = 'block';

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Auto-close after 5 seconds
        setTimeout(() => {
            this.hidePopup();
            this.resetForm();
        }, 5000);
    }

    showError() {
        alert('Sorry, there was an error sending your message. Please try again or contact me directly.');
    }

    resetForm() {
        if (!this.form || !this.successMessage) return;

        this.form.reset();
        this.form.style.display = 'block';
        this.successMessage.style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPopup();
});
