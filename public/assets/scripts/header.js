(function(){
  async function injectHeader() {
    const placeholder = document.querySelector('[data-include="site-header"]');
    if (!placeholder) return;
    try {
      const res = await fetch('partials/header.html', { cache: 'no-cache' });
      const html = await res.text();
      placeholder.innerHTML = html;
      initHeaderInteractions();
      initHeaderBookingCta();
    } catch(e) {
      // silent fail
    }
  }

  function initHeaderInteractions(){
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;
    hamburger.addEventListener('click', function(){
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    document.addEventListener('click', function(event){
      if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)){
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => link.addEventListener('click', function(){
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    }));
  }

  function withTracking(base, fallbackContent) {
    const params = new URLSearchParams(window.location.search);
    const utm = new URLSearchParams({
      utm_source: params.get('utm_source') || 'site',
      utm_medium: params.get('utm_medium') || 'cta',
      utm_campaign: params.get('utm_campaign') || 'booking',
      utm_content: sessionStorage.getItem('cta_source') || fallbackContent || 'header'
    });
    return base + (base.includes('?') ? '&' : '?') + utm.toString();
  }

  function initHeaderBookingCta(){
    const mount = document.getElementById('header-booking-cta');
    if (!mount) return;
    const bookingUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zhmhI_3L1J6eLQEaOtS_u8S02GcQHAkbFfH5H5gSX76HTYS6UTTVJHuWW64YQVD7h1QTDjddc?gv=true';
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
    document.head.appendChild(linkEl);
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    scriptEl.async = true;
    document.head.appendChild(scriptEl);
    scriptEl.addEventListener('load', function(){
      try {
        if (window.calendar && calendar.schedulingButton && calendar.schedulingButton.load) {
          calendar.schedulingButton.load({
            url: withTracking(bookingUrl, 'header'),
            color: '#EF6C00',
            label: 'Schedule a Call',
            target: mount
          });
          return;
        }
      } catch(e) {}
      const a = document.createElement('a');
      a.className = 'cta-primary';
      a.href = withTracking(bookingUrl, 'header');
      a.textContent = 'Schedule a Call';
      a.setAttribute('data-cta', 'header');
      mount.appendChild(a);
    });
  }

  document.addEventListener('DOMContentLoaded', injectHeader);
})();


