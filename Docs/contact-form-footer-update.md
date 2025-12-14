# Footer Restructure + Popup Simplification

## Overview

Two related changes:
1. **Footer** — Restructure to 4 columns with contact form (repurposed from current popup)
2. **Popup** — Simplify to newsletter-only signup with honest, low-pressure messaging

---

## Part 1: New Footer Layout

### Structure

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│  BRAND              NAVIGATE           TOOLS              GET IN TOUCH          │
│  [LOGO]             Find Your Fit      FinDoc Extractor   [Name           ]     │
│                     Starter Projects                      [Email          ]     │
│  Revelstoke, BC     The Foundation                        [Message        ]     │
│  Remote support     The Process                           [    Send       ]     │
│                                                                                 │
│  [in]                                                                           │
│                                                                                 │
│  ───────────────────────────────────────────────────────────────────────────    │
│  © 2025 Pragmatic Tactics. All rights reserved.                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### HTML — Replace Entire Footer

```html
<footer class="footer" role="contentinfo">
    <div class="container">
        
        <div class="footer__main">
            
            <!-- Column 1: Brand -->
            <div class="footer__brand">
                <a href="/" class="footer__logo-link" aria-label="Pragmatic Tactics home">
                    <img 
                        src="assets/logos/Logo - Horizontal vibrant.svg" 
                        alt="Pragmatic Tactics" 
                        class="footer__logo"
                        loading="lazy"
                    >
                </a>
                
                <div class="footer__location">
                    <p class="footer__location-city">Revelstoke, BC, Canada</p>
                    <p class="footer__location-note">Remote support across Canada</p>
                </div>
                
                <div class="footer__social">
                    <a href="https://www.linkedin.com/in/greg-fortier-4ta/" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                        <i data-lucide="linkedin"></i>
                    </a>
                </div>
            </div>
            
            <!-- Column 2: Navigate -->
            <div class="footer__nav">
                <h4 class="footer__heading">Navigate</h4>
                <ul class="footer__links">
                    <li><a href="#fit-finder">Find Your Fit</a></li>
                    <li><a href="#starter-projects">Starter Projects</a></li>
                    <li><a href="#foundation">The Foundation</a></li>
                    <li><a href="#process">The Process</a></li>
                </ul>
            </div>
            
            <!-- Column 3: Tools -->
            <div class="footer__nav">
                <h4 class="footer__heading">Tools</h4>
                <ul class="footer__links">
                    <li>
                        <a href="https://findoc-extractor.app" target="_blank" rel="noopener noreferrer">
                            FinDoc Extractor
                            <svg class="footer__external-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            
            <!-- Column 4: Contact Form -->
            <div class="footer__contact">
                <h4 class="footer__heading">Get in Touch</h4>
                <form class="footer__form" id="footer-contact-form">
                    <div class="footer__form-group">
                        <label for="footer-name" class="visually-hidden">Name</label>
                        <input 
                            type="text" 
                            id="footer-name" 
                            name="name" 
                            placeholder="Name"
                            required
                            autocomplete="name"
                            class="footer__input"
                        >
                    </div>
                    <div class="footer__form-group">
                        <label for="footer-email" class="visually-hidden">Email</label>
                        <input 
                            type="email" 
                            id="footer-email" 
                            name="email" 
                            placeholder="Email"
                            required
                            autocomplete="email"
                            class="footer__input"
                        >
                    </div>
                    <div class="footer__form-group">
                        <label for="footer-message" class="visually-hidden">Message</label>
                        <textarea 
                            id="footer-message" 
                            name="message" 
                            placeholder="What's on your mind?"
                            rows="3"
                            class="footer__textarea"
                        ></textarea>
                    </div>
                    <button type="submit" class="footer__submit" id="footer-contact-submit">
                        <span class="button-text">Send Message</span>
                        <span class="button-loading" style="display: none;">
                            <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" />
                            </svg>
                            Sending...
                        </span>
                    </button>
                </form>
                <div id="footer-contact-message" class="footer__form-message" style="display: none;"></div>
            </div>
            
        </div>
        
        <!-- Footer Bottom -->
        <div class="footer__bottom">
            <p class="footer__copyright">© 2025 Pragmatic Tactics. All rights reserved.</p>
        </div>
        
    </div>
</footer>
```

### CSS — Replace All Footer Styles

Replace existing footer CSS (approximately lines 2997-3423) with:

```css
/* ============================================= */
/* FOOTER                                        */
/* ============================================= */

.footer {
    background: var(--sand-200);
    color: var(--text-secondary);
    margin-top: 80px;
}

/* ─────────────────────────────────────────────
   FOOTER MAIN: 4-Column Layout
   ───────────────────────────────────────────── */

.footer__main {
    display: grid;
    grid-template-columns: 1fr auto auto 280px;
    gap: 48px;
    align-items: start;
    padding: 48px 0;
    border-bottom: 1px solid var(--sand-300);
}

/* Column 1: Brand */
.footer__brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
}

.footer__logo-link {
    display: inline-block;
    transition: opacity 0.3s ease;
}

.footer__logo-link:hover {
    opacity: 0.8;
}

.footer__logo {
    height: 40px;
    width: auto;
}

.footer__location {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.footer__location-city {
    font-weight: 600;
    color: var(--charcoal);
    font-size: 14px;
    margin: 0;
    line-height: 1.4;
}

.footer__location-note {
    color: var(--charcoal-muted);
    font-size: 13px;
    margin: 0;
    line-height: 1.4;
}

.footer__social {
    display: flex;
    gap: 10px;
    margin-top: 4px;
}

.footer__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: var(--sand-300);
    border: none;
    border-radius: 8px;
    color: var(--charcoal-light);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.25s ease;
}

.footer__social-link:hover {
    background: var(--sage-800);
    color: var(--sand-50);
    transform: translateY(-2px);
    box-shadow: var(--shadow-subtle);
}

.footer__social-link i {
    width: 18px;
    height: 18px;
}

/* Columns 2 & 3: Navigation */
.footer__nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer__heading {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--sage-700);
    margin: 0;
}

.footer__links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.footer__links li {
    margin: 0;
    padding: 0;
}

.footer__links a {
    color: var(--charcoal);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;
}

.footer__links a:hover {
    color: var(--clay-500);
}

.footer__external-icon {
    display: inline-block;
    margin-left: 5px;
    opacity: 0.4;
    vertical-align: middle;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.footer__links a:hover .footer__external-icon {
    opacity: 1;
    transform: translate(2px, -2px);
}

/* Column 4: Contact Form */
.footer__contact {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer__form-group {
    display: flex;
    flex-direction: column;
}

.footer__input,
.footer__textarea {
    width: 100%;
    padding: 12px 14px;
    background: var(--sand-50);
    border: 1px solid var(--sand-300);
    border-radius: 8px;
    color: var(--charcoal);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    transition: all 0.2s ease;
}

.footer__input:focus,
.footer__textarea:focus {
    outline: none;
    border-color: var(--sage-600);
    background: var(--background-white);
    box-shadow: 0 0 0 3px rgba(61, 94, 89, 0.08);
}

.footer__input::placeholder,
.footer__textarea::placeholder {
    color: var(--charcoal-muted);
}

.footer__textarea {
    resize: vertical;
    min-height: 80px;
}

.footer__submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    background: var(--sage-800);
    color: var(--sand-50);
    border: none;
    border-radius: 8px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
}

.footer__submit:hover {
    background: var(--clay-500);
}

.footer__submit:active {
    transform: scale(0.98);
}

.footer__submit .spinner {
    animation: footer-spin 1s linear infinite;
}

@keyframes footer-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.footer__form-message {
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13px;
    text-align: center;
}

.footer__form-message.success {
    background: rgba(44, 74, 70, 0.08);
    color: var(--sage-800);
    border: 1px solid rgba(44, 74, 70, 0.2);
}

.footer__form-message.error {
    background: rgba(168, 99, 72, 0.08);
    color: var(--clay-700);
    border: 1px solid rgba(168, 99, 72, 0.2);
}

/* ─────────────────────────────────────────────
   FOOTER BOTTOM
   ───────────────────────────────────────────── */

.footer__bottom {
    padding: 24px 0;
}

.footer__copyright {
    font-size: 13px;
    color: var(--charcoal-muted);
    margin: 0;
    text-align: center;
}

/* ─────────────────────────────────────────────
   FOOTER RESPONSIVE
   ───────────────────────────────────────────── */

/* Tablet */
@media (max-width: 1024px) {
    .footer__main {
        grid-template-columns: 1fr 1fr;
        gap: 40px 48px;
    }
    
    .footer__brand {
        grid-column: 1 / 2;
    }
    
    .footer__contact {
        grid-column: 2 / 3;
        grid-row: 1 / 3;
    }
    
    .footer__nav:first-of-type {
        grid-column: 1 / 2;
    }
    
    .footer__nav:last-of-type {
        grid-column: 1 / 2;
    }
}

/* Mobile */
@media (max-width: 600px) {
    .footer {
        margin-top: 60px;
    }
    
    .footer__main {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 40px 0;
        text-align: center;
    }
    
    .footer__brand {
        align-items: center;
    }
    
    .footer__location {
        align-items: center;
    }
    
    .footer__social {
        justify-content: center;
    }
    
    .footer__nav {
        align-items: center;
    }
    
    .footer__links {
        align-items: center;
    }
    
    .footer__contact {
        align-items: center;
        width: 100%;
        max-width: 320px;
        margin: 0 auto;
    }
    
    .footer__form {
        width: 100%;
    }
    
    .footer__bottom {
        padding: 20px 0;
    }
}
```

### JavaScript — Footer Contact Form Handler

Add this to your existing JS or create a new file. This mirrors the logic from your existing popup form:

```javascript
// Footer Contact Form Handler
(function() {
    const form = document.getElementById('footer-contact-form');
    const submitBtn = document.getElementById('footer-contact-submit');
    const messageDiv = document.getElementById('footer-contact-message');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const buttonText = submitBtn.querySelector('.button-text');
        const buttonLoading = submitBtn.querySelector('.button-loading');
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;
        
        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Replace with your actual form endpoint
            const response = await fetch('YOUR_FORM_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                messageDiv.textContent = "Thanks! I'll be in touch soon.";
                messageDiv.className = 'footer__form-message success';
                messageDiv.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            messageDiv.textContent = "Something went wrong. Please try again or email me directly.";
            messageDiv.className = 'footer__form-message error';
            messageDiv.style.display = 'block';
        } finally {
            // Reset button state
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
})();
```

---

## Part 2: Simplified Newsletter Popup

### HTML — Replace Popup Content

Find the existing popup HTML (around line 1092 in index.html) and replace:

```html
<!-- Newsletter Popup -->
<div id="newsletter-popup" class="newsletter-popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
    <div class="newsletter-popup__backdrop"></div>
    <div class="newsletter-popup__modal">
        <button class="newsletter-popup__close" aria-label="Close popup">
            <i data-lucide="x"></i>
        </button>
        
        <div class="newsletter-popup__content">
            <h3 id="popup-title" class="newsletter-popup__title">Stay in the loop</h3>
            
            <p class="newsletter-popup__description">
                Get occasional updates on new tools and services — plus insights that might actually be useful. 
                No inbox spam. Unsubscribe anytime.
            </p>
            
            <form class="newsletter-popup__form" id="popup-newsletter-form">
                <div class="newsletter-popup__form-row">
                    <label for="popup-email" class="visually-hidden">Email address</label>
                    <input 
                        type="email" 
                        id="popup-email" 
                        name="email" 
                        placeholder="Your email"
                        required
                        autocomplete="email"
                        class="newsletter-popup__input"
                    >
                    <button type="submit" class="newsletter-popup__submit">
                        <span class="button-text">Subscribe</span>
                        <span class="button-loading" style="display: none;">
                            <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4 31.4" />
                            </svg>
                        </span>
                    </button>
                </div>
            </form>
            
            <div id="popup-newsletter-message" class="newsletter-popup__message" style="display: none;"></div>
            
            <p class="newsletter-popup__privacy">
                <i data-lucide="shield-check" class="newsletter-popup__privacy-icon"></i>
                Your email stays private. Always.
            </p>
        </div>
    </div>
</div>
```

### CSS — Replace Popup Styles

Find existing popup CSS (around line 3463) and replace:

```css
/* ============================================= */
/* NEWSLETTER POPUP                              */
/* ============================================= */

.newsletter-popup {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.newsletter-popup.is-visible {
    opacity: 1;
    visibility: visible;
}

.newsletter-popup__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(45, 55, 72, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

.newsletter-popup__modal {
    position: relative;
    background: var(--background-white);
    border-radius: 16px;
    padding: 40px;
    max-width: 420px;
    width: 100%;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    transform: translateY(20px) scale(0.95);
    transition: transform 0.3s ease;
}

.newsletter-popup.is-visible .newsletter-popup__modal {
    transform: translateY(0) scale(1);
}

.newsletter-popup__close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: var(--charcoal-muted);
    cursor: pointer;
    transition: all 0.2s ease;
}

.newsletter-popup__close:hover {
    background: var(--sand-200);
    color: var(--charcoal);
}

.newsletter-popup__close i {
    width: 20px;
    height: 20px;
}

.newsletter-popup__content {
    text-align: center;
}

.newsletter-popup__title {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0 0 12px 0;
}

.newsletter-popup__description {
    font-size: 15px;
    line-height: 1.6;
    color: var(--charcoal-light);
    margin: 0 0 24px 0;
}

.newsletter-popup__form {
    margin-bottom: 16px;
}

.newsletter-popup__form-row {
    display: flex;
    gap: 0;
}

.newsletter-popup__input {
    flex: 1;
    padding: 14px 16px;
    background: var(--sand-100);
    border: 1px solid var(--sand-300);
    border-right: none;
    border-radius: 10px 0 0 10px;
    color: var(--charcoal);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 15px;
    transition: all 0.2s ease;
}

.newsletter-popup__input:focus {
    outline: none;
    border-color: var(--sage-600);
    background: var(--background-white);
    box-shadow: 0 0 0 3px rgba(61, 94, 89, 0.08);
}

.newsletter-popup__input::placeholder {
    color: var(--charcoal-muted);
}

.newsletter-popup__submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 24px;
    background: var(--sage-800);
    color: var(--sand-50);
    border: 1px solid var(--sage-800);
    border-radius: 0 10px 10px 0;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.newsletter-popup__submit:hover {
    background: var(--clay-500);
    border-color: var(--clay-500);
}

.newsletter-popup__submit:active {
    transform: scale(0.98);
}

.newsletter-popup__submit .spinner {
    animation: popup-spin 1s linear infinite;
}

@keyframes popup-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.newsletter-popup__message {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 16px;
}

.newsletter-popup__message.success {
    background: rgba(44, 74, 70, 0.08);
    color: var(--sage-800);
    border: 1px solid rgba(44, 74, 70, 0.2);
}

.newsletter-popup__message.error {
    background: rgba(168, 99, 72, 0.08);
    color: var(--clay-700);
    border: 1px solid rgba(168, 99, 72, 0.2);
}

.newsletter-popup__privacy {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
    color: var(--charcoal-muted);
    margin: 0;
}

.newsletter-popup__privacy-icon {
    width: 14px;
    height: 14px;
    color: var(--sage-600);
}

/* ─────────────────────────────────────────────
   POPUP RESPONSIVE
   ───────────────────────────────────────────── */

@media (max-width: 480px) {
    .newsletter-popup__modal {
        padding: 32px 24px;
    }
    
    .newsletter-popup__title {
        font-size: 24px;
    }
    
    .newsletter-popup__description {
        font-size: 14px;
    }
    
    .newsletter-popup__form-row {
        flex-direction: column;
        gap: 12px;
    }
    
    .newsletter-popup__input {
        border-radius: 10px;
        border-right: 1px solid var(--sand-300);
    }
    
    .newsletter-popup__submit {
        border-radius: 10px;
        width: 100%;
    }
}
```

### JavaScript — Simplified Popup Handler

Replace the existing ContactPopup class with this simplified newsletter version:

```javascript
/**
 * Newsletter Popup
 * Triggers after user scrolls past a certain point, once per session
 */
class NewsletterPopup {
    constructor(options = {}) {
        this.popup = document.getElementById('newsletter-popup');
        this.form = document.getElementById('popup-newsletter-form');
        this.closeBtn = this.popup?.querySelector('.newsletter-popup__close');
        this.backdrop = this.popup?.querySelector('.newsletter-popup__backdrop');
        this.submitBtn = this.popup?.querySelector('.newsletter-popup__submit');
        this.messageDiv = document.getElementById('popup-newsletter-message');
        
        // Configuration
        this.triggerElement = options.triggerElement || '#fit-finder';
        this.triggerThreshold = options.triggerThreshold || 0.5;
        this.triggerDelay = options.triggerDelay || 2000;
        this.sessionKey = 'newsletter_popup_shown';
        
        this.hasTriggered = false;
        
        if (!this.popup) return;
        
        this.init();
    }
    
    init() {
        // Check if already shown this session
        if (sessionStorage.getItem(this.sessionKey)) {
            return;
        }
        
        this.setupScrollTrigger();
        this.setupEventListeners();
    }
    
    setupScrollTrigger() {
        const targetElement = document.querySelector(this.triggerElement);
        if (!targetElement) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasTriggered) {
                    this.hasTriggered = true;
                    setTimeout(() => this.show(), this.triggerDelay);
                    observer.disconnect();
                }
            });
        }, {
            threshold: this.triggerThreshold
        });
        
        observer.observe(targetElement);
    }
    
    setupEventListeners() {
        // Close button
        this.closeBtn?.addEventListener('click', () => this.hide());
        
        // Backdrop click
        this.backdrop?.addEventListener('click', () => this.hide());
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('is-visible')) {
                this.hide();
            }
        });
        
        // Form submission
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    show() {
        if (sessionStorage.getItem(this.sessionKey)) return;
        
        this.popup.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
        
        // Focus the input
        setTimeout(() => {
            this.popup.querySelector('input[type="email"]')?.focus();
        }, 300);
    }
    
    hide() {
        this.popup.classList.remove('is-visible');
        document.body.style.overflow = '';
        sessionStorage.setItem(this.sessionKey, 'true');
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const buttonText = this.submitBtn.querySelector('.button-text');
        const buttonLoading = this.submitBtn.querySelector('.button-loading');
        
        // Show loading
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline-flex';
        this.submitBtn.disabled = true;
        
        const email = this.form.querySelector('input[type="email"]').value;
        
        try {
            // Replace with your actual newsletter endpoint
            const response = await fetch('YOUR_NEWSLETTER_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            if (response.ok) {
                this.messageDiv.textContent = "You're in! Watch your inbox.";
                this.messageDiv.className = 'newsletter-popup__message success';
                this.messageDiv.style.display = 'block';
                this.form.style.display = 'none';
                
                // Auto-close after success
                setTimeout(() => this.hide(), 2500);
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            this.messageDiv.textContent = "Something went wrong. Please try again.";
            this.messageDiv.className = 'newsletter-popup__message error';
            this.messageDiv.style.display = 'block';
        } finally {
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new NewsletterPopup({
        triggerElement: '#fit-finder',  // Show after this section is visible
        triggerThreshold: 0.5,          // 50% visible
        triggerDelay: 2000              // 2 seconds after visible
    });
});
```

---

## Summary of Changes

| Component | Before | After |
|-----------|--------|-------|
| **Footer layout** | Multi-row with newsletter on top | Single 4-column row |
| **Footer contact** | None (or just email link) | Full contact form |
| **Footer newsletter** | Full form in footer | Removed from footer |
| **Popup purpose** | Full contact form | Newsletter signup only |
| **Popup messaging** | "Let's Trade Insights" | "Stay in the loop" (low pressure) |
| **Popup ask level** | High (name, email, business, message) | Low (email only) |

---

## Files to Modify

1. **index.html**
   - Replace footer HTML
   - Replace popup HTML

2. **main.css**
   - Replace footer CSS (lines ~2997-3423)
   - Replace popup CSS (lines ~3463+)

3. **contact-popup.js** (or equivalent)
   - Replace ContactPopup class with NewsletterPopup class
   - Add footer contact form handler

---

## Verification Checklist

### Footer
- [ ] 4 columns display correctly on desktop
- [ ] Brand column: Logo, location, LinkedIn stacked
- [ ] Navigate column: 4 links in single column
- [ ] Tools column: FinDoc Extractor with external link icon
- [ ] Contact form: Name, Email, Message fields + Submit button
- [ ] Form submission works and shows success/error message
- [ ] Tablet: Collapses to 2-column layout
- [ ] Mobile: Collapses to single column, centered

### Popup
- [ ] Triggers after scrolling past fit-finder section (2 sec delay)
- [ ] Only shows once per session
- [ ] Shows title "Stay in the loop"
- [ ] Shows honest, low-pressure description
- [ ] Email input + Subscribe button (horizontal on desktop)
- [ ] Mobile: Input and button stack vertically
- [ ] Close button works
- [ ] Backdrop click closes popup
- [ ] Escape key closes popup
- [ ] Form submission works
- [ ] Success message shows and auto-closes

---

## Notes

- Update `YOUR_FORM_ENDPOINT` and `YOUR_NEWSLETTER_ENDPOINT` with actual endpoints
- The popup uses sessionStorage, so it will show again if the user closes and reopens the browser
- If you want it to persist longer, change to localStorage with a timestamp check
- The form endpoints may need to be different for contact vs newsletter if they go to different systems