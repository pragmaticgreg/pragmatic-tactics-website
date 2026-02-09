// Reveal-on-scroll bus: toggles is-revealed and dispatches section:reveal
document.addEventListener('DOMContentLoaded', function(){
  const targets = Array.from(document.querySelectorAll('[data-reveal-on-scroll]'));
  if (!targets.length) return;
  const revealNow = (el) => {
    el.classList.add('is-revealed');
    // If configured, reveal children with stagger
    const childSelector = el.getAttribute('data-reveal-children');
    if (childSelector) {
      let children = Array.from(el.querySelectorAll(childSelector));
      const stagger = parseInt(el.getAttribute('data-stagger-children') || '80', 10);
      const randomize = (el.getAttribute('data-reveal-random') || 'false') === 'true';
      if (randomize) {
        // Fisher-Yates shuffle
        for (let i = children.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [children[i], children[j]] = [children[j], children[i]];
        }
      }
      children.forEach((child, index) => {
        const run = () => child.classList.add('is-visible');
        setTimeout(run, index * stagger);
      });
    }
    el.dispatchEvent(new CustomEvent('section:reveal', { bubbles: true }));
  };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    targets.forEach(el => {
      const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
      if (delay > 0) {
        setTimeout(() => revealNow(el), delay);
      } else {
        revealNow(el);
      }
    });
    return;
  }
  const getOpts = (el) => ({
    threshold: parseFloat(el.getAttribute('data-reveal-threshold') || '0.15'),
    rootMargin: el.getAttribute('data-reveal-root-margin') || '0px 0px -10% 0px'
  });
  const observers = new Map();
  targets.forEach(el => {
    const opts = getOpts(el);
    const key = JSON.stringify(opts);
    if (!observers.has(key)) {
      observers.set(key, new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          const node = entry.target;
          if (entry.isIntersecting) {
            const delay = parseInt(node.getAttribute('data-reveal-delay') || '0', 10);
            const once = node.getAttribute('data-reveal-once');
            const run = () => revealNow(node);
            if (delay > 0) setTimeout(run, delay); else run();
            if (once !== 'false') obs.unobserve(node);
          }
        });
      }, opts));
    }
    observers.get(key).observe(el);
  });
});
