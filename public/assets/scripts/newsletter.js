// MailerLite Newsletter Integration
(function() {
  // Configuration - Replace with your MailerLite details
  const MAILERLITE_CONFIG = {
    apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMDYwMTE4Njg3NTFkN2Q4NTY4MTNkNTI4ZTkxYzdkZjQwZjMwYzliNDY4Y2RiYjgyMzExMDAzNTY1MTJkNzE2ZmY4Mjk3Y2U2ZDEyNDE2NDMiLCJpYXQiOjE3NTg1NjQ5ODcuNDAyODcxLCJuYmYiOjE3NTg1NjQ5ODcuNDAyODczLCJleHAiOjQ5MTQyMzg1ODcuMzk4ODY4LCJzdWIiOiIxODI2NDIyIiwic2NvcGVzIjpbXX0.FugPJwmCL7RPZ2n66sl2HCNh_Fb9z13ctcl-mmrlnq-7OdCiyUN8tXcJsi333JTjAeResMnNlgUd1Rn16ITjsIlap0PnAmtLxCbbVkSyPPqeKg6eIdhnxNDn2t3rQ9DjRBBXA2wBaxI7aS5UJ8z2nMTfGwnPbWirNc3nj_a5irW5a5TDRZb01nXk8wlG6SxKdZICryQjJ00XvxyXA950jIN8ECo-b_vxFEW04qgnltCpCOJ22nsSN-GqMqSmOR2dknEuY1_dbu5Jz4cMydS63rGytg6pT8Xbnx_M93QzUJYAMqSJ6rlbEqqgY_5xd5f_GzTeJWJnYrESPLBmxlhynWUpkIEgdU84UqGXPEXDKMBTe7LRFeGReoVezc-foYjrUmfC9nAJnmDYhPxBk4opBmZ99Z-Q49Q75zxuTmUwKwnxIGyQiYY3ipn-q3_4uM98HB3c7ILZ4POWFVHTJftNyV8Q5iqEthws94Zm8Wb2oC8ySSd3cKRzfasNq03JFX0ATPrtm-96aVUjVIBCYKu4Kzv6uColbfKc7igPgrVIeKhHfuNGyFvEupgKAb2ucAWWAUUQo-ZlPva2zu7blJEBgBS2DlvQWdxB2Kwhmqv3XQ-5USHwlEzWRXlKv05Vx7knL4bYbaBHmHE4HTjmifMlvvLlrDNIByvdt2smzwEpfVg', // Get from MailerLite dashboard
    groupId: '166265571715843440', // Get from MailerLite dashboard
    apiUrl: 'https://connect.mailerlite.com/api/subscribers'
  };

  function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', handleNewsletterSubmit);
  }

  async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = document.getElementById('newsletter-email');
    const submitButton = document.getElementById('newsletter-submit');
    const messageDiv = document.getElementById('newsletter-message');
    
    const email = emailInput.value.trim();
    
    if (!email) {
      showMessage(messageDiv, 'Please enter a valid email address.', 'error');
      return;
    }

    // Show loading state
    setLoadingState(submitButton, true);
    hideMessage(messageDiv);

    try {
      const response = await fetch(MAILERLITE_CONFIG.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_CONFIG.apiKey}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          groups: [MAILERLITE_CONFIG.groupId],
          status: 'active'
        })
      });

      if (response.ok) {
        showMessage(messageDiv, 'Thanks for subscribing! Check your email for confirmation.', 'success');
        form.reset();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Something went wrong. Please try again.';
        showMessage(messageDiv, errorMessage, 'error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      showMessage(messageDiv, 'Network error. Please check your connection and try again.', 'error');
    } finally {
      setLoadingState(submitButton, false);
    }
  }

  function setLoadingState(button, isLoading) {
    if (isLoading) {
      button.classList.add('loading');
      button.disabled = true;
    } else {
      button.classList.remove('loading');
      button.disabled = false;
    }
  }

  function showMessage(messageDiv, text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `newsletter-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        hideMessage(messageDiv);
      }, 5000);
    }
  }

  function hideMessage(messageDiv) {
    messageDiv.style.display = 'none';
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initNewsletterForm);
})();
