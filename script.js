// ===== Mobile nav toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Active nav based on current page
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Stat counters
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      current += step;
      if (current >= target) { el.textContent = target + suffix; return; }
      el.textContent = current + suffix;
      requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver((es) => {
      es.forEach(en => { if (en.isIntersecting) { tick(); obs.disconnect(); } });
    });
    obs.observe(el);
  });

  // Lightbox
  const lb = document.querySelector('.lightbox');
  if (lb) {
    const lbContent = lb.querySelector('.lightbox-content');
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const label = item.dataset.label || 'Galeri';
        lbContent.innerHTML = `<div class="ph">${label}</div>`;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lightbox-close')) lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  // Contact form -> send email (mailto) to your Gmail
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = form.querySelector('#name');
      const emailEl = form.querySelector('#email');
      const subjectEl = form.querySelector('#subject');
      const msgEl = form.querySelector('#msg');

      const name = nameEl ? nameEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const subject = subjectEl ? subjectEl.value.trim() : '';
      const message = msgEl ? msgEl.value.trim() : '';

      const to = 'antonmajadarman@gmail.com';
      const safeSubject = subject || 'Pesan dari website Nilam Nusantara';
      const bodyLines = [
        `Nama: ${name || '-'}`,
        `Email: ${email || '-'}`,
        `Pesan:`,
        `${message || '-'}`,
      ];

      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(safeSubject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      const btn = form.querySelector('button[type=submit]');
      if (btn) {
        btn.textContent = 'Membuka email...';
        btn.disabled = true;
      }

      window.location.href = mailto;

      form.reset();

      setTimeout(() => {
        if (btn) {
          btn.textContent = 'Kirim Pesan';
          btn.disabled = false;
        }
      }, 2500);
    });
  }
});

