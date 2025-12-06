# Contact Popup Setup Instructions

## Overview
A scroll-triggered contact form popup that appears after users scroll past the problem identification section. The popup includes your custom copy and collects contact information to start conversations.

## Features
- ✅ Scroll-triggered popup (appears 2 seconds after problem section is 50% visible)
- ✅ Custom copy: "Let's Trade Insights" with checklist
- ✅ Contact form with name, email, business type dropdown, and message
- ✅ Clear disclaimer that it's not a subscription
- ✅ Email submission via PHP script
- ✅ Success/error handling
- ✅ Mobile responsive design
- ✅ Keyboard navigation (ESC to close)
- ✅ Prevents multiple popups per session

## Setup Instructions

### 1. Update Email Configuration
Edit `/public/api/contact.php` and update these lines:
```php
$to = 'your-email@example.com'; // Replace with your email
$headers = [
    'From: noreply@yourdomain.com', // Replace with your domain
    // ... rest of headers
];
```

### 2. Test the Popup
1. Open your website in a browser
2. Scroll down to the "The Pragmatic Foundation" section
3. Wait 2 seconds after the section is visible
4. The popup should appear with your custom copy
5. Fill out the form and test submission

### 3. Alternative: Use Mailto (No Server Required)
If you don't have PHP support, you can use the mailto fallback:

1. Edit `/public/assets/scripts/contact-popup.js`
2. Comment out the ContactPopup initialization (line ~150)
3. Uncomment the SimpleContactPopup initialization (line ~155)
4. Update the email address in the SimpleContactPopup class

### 4. Customize Business Types
The dropdown includes these business types:
- Professional Services
- E-commerce
- Manufacturing
- Healthcare
- Technology
- Real Estate
- Retail
- Food & Beverage
- Construction
- Other

To modify, edit the `<select>` options in `/public/index.html` around line 982.

## Files Created/Modified
- `/public/index.html` - Added popup HTML structure
- `/public/assets/styles/main.css` - Added popup styles
- `/public/assets/scripts/contact-popup.js` - Added popup functionality
- `/public/api/contact.php` - Added email handling script

## Technical Details
- Uses Intersection Observer API for scroll detection
- Form validation on both client and server side
- Responsive design with mobile optimizations
- Accessible with proper ARIA labels
- Prevents background scrolling when popup is open
- Auto-closes after successful submission (5 seconds)

## Troubleshooting
- **Popup doesn't appear**: Check browser console for JavaScript errors
- **Form doesn't submit**: Verify PHP script permissions and email configuration
- **Styling issues**: Check CSS file is loading properly
- **Mobile issues**: Test on actual mobile device, not just browser dev tools

## Customization Options
- Change trigger delay: Modify `setTimeout(() => { this.showPopup(); }, 2000);` in contact-popup.js
- Change trigger threshold: Modify `threshold: 0.5` in the IntersectionObserver options
- Modify popup copy: Edit the HTML content in index.html
- Change styling: Modify CSS classes in main.css

