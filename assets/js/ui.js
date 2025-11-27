/*
  ui.js
  - torna o menu responsivo em mobile (drawer)
  - controla overlay e teclas (Esc)
*/
(function(){
  function $(sel){ return document.querySelector(sel); }
  const menuBtn = $('#menuToggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('mobileOverlay');

  function openDrawer(){
    if (!sidebar) return;
    sidebar.classList.add('open');
    document.body.classList.add('drawer-open');
    if (overlay) overlay.classList.add('show');
    sidebar.setAttribute('aria-hidden','false');
    menuBtn && menuBtn.setAttribute('aria-expanded','true');
  }
  function closeDrawer(){
    if (!sidebar) return;
    sidebar.classList.remove('open');
    document.body.classList.remove('drawer-open');
    if (overlay) overlay.classList.remove('show');
    sidebar.setAttribute('aria-hidden','true');
    menuBtn && menuBtn.setAttribute('aria-expanded','false');
  }

  // toggle
  if (menuBtn){
    menuBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      if (!sidebar) return;
      if (sidebar.classList.contains('open')) closeDrawer();
      else openDrawer();
    });
  }

  // overlay click closes drawer
  if (overlay){
    overlay.addEventListener('click', closeDrawer);
  }

  // close on ESC
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeDrawer();
  });

  // close drawer when clicking a nav link (mobile)
  document.addEventListener('click', (e)=>{
    const target = e.target;
    if (!sidebar) return;
    if (target.closest('.nav') && window.innerWidth <= 1100) {
      closeDrawer();
    }
  });

  // ensure proper initial state on resize
  window.addEventListener('resize', ()=>{
    if (window.innerWidth > 1100){
      // keep sidebar visible in desktop layout
      sidebar && sidebar.classList.remove('open');
      document.body.classList.remove('drawer-open');
      overlay && overlay.classList.remove('show');
    }
  });
})();