document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.style.display === 'flex';
      nav.style.display = open ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '64px';
      nav.style.right = '20px';
      nav.style.background = '#FFFDF8';
      nav.style.border = '1px solid #E1D8C2';
      nav.style.borderRadius = '12px';
      nav.style.padding = '14px 20px';
      nav.style.gap = '14px';
      nav.style.boxShadow = '0 8px 24px -12px rgba(33,31,25,.25)';
    });
  }

  // close mobile nav after clicking a link
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 880 && nav) nav.style.display = 'none';
    });
  });
});
