// Hero photo: zoom in from smaller-than-frame on load, then keep zooming + drifting as you scroll past it
const heroBg = document.querySelector('.hero-bg');
const hero = document.getElementById('hero');

requestAnimationFrame(() => heroBg.classList.add('zoomed'));

function parallaxHero() {
  const heroHeight = hero.offsetHeight;
  const progress = Math.min(window.scrollY / heroHeight, 1);
  const scale = 1 + progress * 0.18;
  const drift = progress * 40;
  heroBg.style.transform = `scale(${scale}) translateY(${drift}px)`;
}

window.addEventListener('scroll', parallaxHero, { passive: true });
parallaxHero();

// Scroll-reveal: fade in any .reveal element once it enters the viewport
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Countdown to the wedding date
const WEDDING_DATE = new Date('2026-07-17T18:00:00');

function tickCountdown() {
  const diff = WEDDING_DATE - new Date();
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs'),
  };
  if (diff <= 0) {
    els.days.textContent = els.hours.textContent = els.mins.textContent = els.secs.textContent = '00';
    return;
  }
  const pad = (n) => String(n).padStart(2, '0');
  els.days.textContent = pad(Math.floor(diff / 86400000));
  els.hours.textContent = pad(Math.floor((diff / 3600000) % 24));
  els.mins.textContent = pad(Math.floor((diff / 60000) % 60));
  els.secs.textContent = pad(Math.floor((diff / 1000) % 60));
}

tickCountdown();
setInterval(tickCountdown, 1000);
