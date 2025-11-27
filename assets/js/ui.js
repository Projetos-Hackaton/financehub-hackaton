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

  // somente inicializa o comportamento de drawer em telas mobile
  function isMobileView(){ return window.innerWidth <= 1100; }

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

  // toggle — só anexa listener se estivermos em mobile
  function attachToggle(){
    if (!menuBtn) return;
    // remove listeners previous (defensive)
    menuBtn.onclick = null;
    if (!isMobileView()){
      // garantir estado desktop
      closeDrawer();
      menuBtn.setAttribute('aria-expanded','false');
      return;
    }
    menuBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      if (!sidebar) return;
      if (sidebar.classList.contains('open')) closeDrawer();
      else openDrawer();
    });
  }

  attachToggle();

  // overlay click fecha drawer
  if (overlay){
    overlay.addEventListener('click', closeDrawer);
  }

  // close on ESC
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeDrawer();
  });

  // fechar drawer ao clicar em link do menu (mobile)
  document.addEventListener('click', (e)=>{
    const target = e.target;
    if (!sidebar) return;
    if (isMobileView() && target.closest('.nav')) {
      closeDrawer();
    }
  });

  // ajustar comportamento ao redimensionar
  window.addEventListener('resize', ()=>{
    // reataiva/descativa o listener do botão conforme viewport
    attachToggle();

    if (window.innerWidth > 1100){
      // garantir layout desktop consistente
      sidebar && sidebar.classList.remove('open');
      document.body.classList.remove('drawer-open');
      overlay && overlay.classList.remove('show');
    }
  });
})();