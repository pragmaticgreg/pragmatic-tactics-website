// Simple header interactions - no injection needed
(function(){
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!hamburger || !mobileMenu) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
    
    // Close menu when clicking on menu links
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }
  
  function initStarterCardTracking() {
    // Only track CTA clicks from starter service cards
    const starterSection = document.querySelector('#starter-projects');
    if (!starterSection) return;
    
    starterSection.querySelectorAll('[data-cta]').forEach(el => {
      el.addEventListener('click', () => {
        sessionStorage.setItem('cta_source', el.getAttribute('data-cta') || 'starter-card');
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initStarterCardTracking();
  });
})();


