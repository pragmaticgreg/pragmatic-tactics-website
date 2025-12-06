/**
 * Contact Form Popup
 * Handles scroll-triggered popup and form submission
 */

class ContactPopup {
    constructor() {
        this.popup = document.getElementById('contact-popup');
        this.form = document.getElementById('contact-form');
        this.successMessage = document.getElementById('contact-success');
        this.closeBtn = document.querySelector('.contact-popup__close');
        this.overlay = document.querySelector('.contact-popup__overlay');
        this.submitBtn = document.querySelector('.contact-form__submit');
        this.submitText = document.querySelector('.contact-form__submit-text');
        this.submitLoading = document.querySelector('.contact-form__submit-loading');
        
        this.hasShown = false;
        this.triggerElement = document.getElementById('problems-v2');
        
        this.init();
    }
    
    init() {
        // Set up scroll listener
        this.setupScrollListener();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize Lucide icons
        this.initIcons();
    }
    
    setupScrollListener() {
        if (!this.triggerElement) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasShown) {
                    // Wait a bit after the section is visible to show popup
                    setTimeout(() => {
                        this.showPopup();
                    }, 2000); // 2 second delay
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the section is visible
        });
        
        observer.observe(this.triggerElement);
    }
    
    setupEventListeners() {
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
        // Initialize Lucide icons for the popup
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    showPopup() {
        if (this.hasShown) return;
        
        this.hasShown = true;
        this.popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Initialize icons after popup is shown
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 100);
    }
    
    hidePopup() {
        this.popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
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
            // Send email using PHP script
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
        this.form.style.display = 'none';
        this.successMessage.style.display = 'block';
        
        // Initialize success icon
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            this.hidePopup();
            // Reset form for next time
            this.resetForm();
        }, 5000);
    }
    
    showError() {
        // Simple error handling - you could make this more sophisticated
        alert('Sorry, there was an error sending your message. Please try again or contact me directly.');
    }
    
    resetForm() {
        this.form.reset();
        this.form.style.display = 'block';
        this.successMessage.style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPopup();
});

// Alternative simple email solution using mailto
class SimpleContactPopup extends ContactPopup {
    async handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const businessType = formData.get('business_type');
        const message = formData.get('message');
        
        // Create mailto link
        const subject = encodeURIComponent(`Contact from ${name} - ${businessType}`);
        const body = encodeURIComponent(`
Name: ${name}
Email: ${email}
Business Type: ${businessType}
Message: ${message}

---
Sent from contact popup on website
        `);
        
        const mailtoLink = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        this.showSuccess();
    }
}

// Use simple version for now (replace with your email)
// Uncomment the line below and comment out the ContactPopup initialization above
// document.addEventListener('DOMContentLoaded', () => {
//     new SimpleContactPopup();
// });
