/* Dynalektric — Shared JavaScript */

// ── Navbar scroll effect ─────────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileClose = document.querySelector('.mobile-nav-close');

navToggle?.addEventListener('click', () => {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
});
mobileClose?.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
});
mobileNav?.addEventListener('click', e => {
  if (e.target === mobileNav) {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── Scroll-triggered animations ──────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// ── Smooth page transitions ──────────────────────────────────
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('http')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity .25s ease';
      setTimeout(() => { window.location.href = href; }, 260);
    });
  }
});
window.addEventListener('pageshow', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity .3s ease';
});

// ── Counter animation ────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const start = performance.now();
  const update = now => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ── Products filter ──────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.filterable').forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = '';
        card.style.animation = 'fadeUp .4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ── Calculator logic ─────────────────────────────────────────
const calcDisplay = document.getElementById('calc-display');
if (calcDisplay) {
  let calcValue = '';
  document.querySelectorAll('.key-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;
      if (val === 'C') { calcValue = ''; calcDisplay.value = ''; return; }
      if (val === '=') {
        try { calcDisplay.value = eval(calcValue); calcValue = String(eval(calcValue)); }
        catch { calcDisplay.value = 'Error'; calcValue = ''; }
        return;
      }
      calcValue += val;
      calcDisplay.value = calcValue;
    });
  });
}

// ── Power estimator ──────────────────────────────────────────
const estimatorForm = document.getElementById('estimator-form');
if (estimatorForm) {
  estimatorForm.addEventListener('submit', e => {
    e.preventDefault();
    const kva = parseFloat(document.getElementById('kva-input').value) || 0;
    const voltage = parseFloat(document.getElementById('voltage-input').value) || 415;
    const pf = parseFloat(document.getElementById('pf-input').value) || 0.85;
    const currentA = ((kva * 1000) / (Math.sqrt(3) * voltage)).toFixed(1);
    const activePower = (kva * pf).toFixed(2);
    const efficiency = (pf * 100).toFixed(1);

    document.getElementById('res-current').textContent = currentA + ' A';
    document.getElementById('res-active').textContent = activePower + ' kW';
    document.getElementById('res-efficiency').textContent = efficiency + '%';
    document.getElementById('res-kva').textContent = kva + ' kVA';
    document.getElementById('calc-results').style.display = 'block';
    document.getElementById('calc-results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// ── Contact form ─────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type=submit]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#22c55e';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}
