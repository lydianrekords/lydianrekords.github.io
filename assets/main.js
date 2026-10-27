
(() => {

  // Persistent light/dark theme toggle, shared across every page.
  const themeButtons = [...document.querySelectorAll('[data-theme-toggle]')];
  const themeKey = 'lydian-rekords-theme';
  const savedTheme = (() => { try { return localStorage.getItem(themeKey); } catch (_) { return null; } })();
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const isLight = theme === 'light';
    themeButtons.forEach(button => {
      button.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      button.setAttribute('aria-pressed', String(isLight));
      const icon = button.querySelector('[data-theme-icon]');
      const label = button.querySelector('.theme-toggle-label');
      if (icon) icon.textContent = isLight ? '☾' : '☼';
      if (label) label.textContent = isLight ? 'Dark' : 'Light';
      button.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    });
  };
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');
  themeButtons.forEach(button => button.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem(themeKey, next); } catch (_) {}
  }));

  const toggle = document.querySelector('[data-menu-toggle]');
  const close = document.querySelectorAll('[data-menu-close]');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.menu-overlay');
  const setMenu = (open) => {
    if (!menu || !overlay || !toggle) return;
    menu.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('mobile-nav-open', open);
  };
  toggle?.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  close.forEach(el => el.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  const slides = [...document.querySelectorAll('.hero-slide')];
  const slideTitle = document.querySelector('[data-slide-title]');
  const slideCount = document.querySelector('[data-slide-count]');
  const titles = ['Sound with feeling', 'Visuals that move', 'Artwork with identity', 'Your next chapter'];
  let active = 0;
  if (slides.length > 1) {
    window.setInterval(() => {
      slides[active].classList.remove('active');
      active = (active + 1) % slides.length;
      slides[active].classList.add('active');
      if (slideTitle) slideTitle.textContent = titles[active] || titles[0];
      if (slideCount) slideCount.textContent = `0${active + 1} / 0${slides.length}`;
    }, 4300);
  }
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), {threshold: .12});
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('visible'));

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-contact-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const service = data.get('service') || 'General enquiry';
      const message = data.get('message') || '';
      const phone = data.get('phone') || '';
      const body = `Hello LYDIAN REKORDS,%0A%0AMy name is ${encodeURIComponent(name)}.%0AService: ${encodeURIComponent(service)}%0APhone: ${encodeURIComponent(phone)}%0A%0A${encodeURIComponent(message)}`;
      window.location.href = `https://wa.me/23355641275?text=${body}`;
    });
  });
})();
