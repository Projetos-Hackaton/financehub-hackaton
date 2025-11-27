/*
  ui.js
  - remove o menu adicional para usuários de PC (desktop)
  - mantém o drawer apenas em mobile (<=1100px)
  - evita múltiplos listeners e trata resize
*/
(function(){
  function $(sel){ return document.querySelector(sel); }
  const sidebar = document.querySelector('.sidebar');
  const nav = document.querySelector('.nav');

  let menuBtn = null;
  let overlay = null;
  let isDrawerOpen = false;
  let attached = false;

  function isMobileView(){ return window.innerWidth <= 1100; }

  function createRefs(){
    menuBtn = document.getElementById('menuToggle');
    overlay = document.getElementById('mobileOverlay');
  }

  function removeMobileControlsFromDOM(){
    // remove elementos que só devem existir em mobile
    const mb = document.getElementById('menuToggle');
    const ov = document.getElementById('mobileOverlay');
    if (mb) mb.remove();
    if (ov) ov.remove();
    // garantir estado desktop
    if (sidebar) {
      sidebar.classList.remove('open');
      sidebar.removeAttribute('aria-hidden');
    }
    document.body.classList.remove('drawer-open');
  }

  function openDrawer(){
    if (!sidebar) return;
    sidebar.classList.add('open');
    document.body.classList.add('drawer-open');
    if (overlay) overlay.classList.add('show');
    sidebar.setAttribute('aria-hidden','false');
    if (menuBtn) menuBtn.setAttribute('aria-expanded','true');
    isDrawerOpen = true;
  }
  function closeDrawer(){
    if (!sidebar) return;
    sidebar.classList.remove('open');
    document.body.classList.remove('drawer-open');
    if (overlay) overlay.classList.remove('show');
    sidebar.setAttribute('aria-hidden','true');
    if (menuBtn) menuBtn.setAttribute('aria-expanded','false');
    isDrawerOpen = false;
  }
  function toggleDrawer(e){
    if (e) e.stopPropagation();
    if (isDrawerOpen) closeDrawer();
    else openDrawer();
  }

  function attachToggle(){
    createRefs();
    if (!menuBtn) return;
    if (isMobileView() && !attached){
      menuBtn.addEventListener('click', toggleDrawer);
      attached = true;
    } else if (!isMobileView() && attached){
      menuBtn.removeEventListener('click', toggleDrawer);
      attached = false;
      closeDrawer();
    }
  }

  // overlay click closes drawer (attach only if overlay exists)
  function attachOverlayHandler(){
    createRefs();
    if (!overlay) return;
    overlay.addEventListener('click', closeDrawer);
  }

  // close on ESC
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeDrawer();
  });

  // close drawer when clicking an item in the nav (mobile only)
  if (nav){
    nav.addEventListener('click', (e)=>{
      if (isMobileView() && e.target.closest('.nav-item')) {
        setTimeout(closeDrawer, 120);
      }
    });
  }

  // inicialização após DOM pronto
  document.addEventListener('DOMContentLoaded', ()=>{
    createRefs();

    // se for desktop, remover controles mobile do DOM e sair (menu padrão do projeto permanece)
    if (!isMobileView()){
      removeMobileControlsFromDOM();
      return;
    }

    // mobile: garantir handlers
    attachToggle();
    attachOverlayHandler();
  });

  // tratar mudanças de viewport (debounce simples)
  let rid = null;
  window.addEventListener('resize', ()=>{
    if (rid) clearTimeout(rid);
    rid = setTimeout(()=>{
      createRefs();
      if (!isMobileView()){
        // ao passar para desktop, remove controles mobile
        removeMobileControlsFromDOM();
      } else {
        // ao voltar para mobile, re-attach se possível
        attachToggle();
        attachOverlayHandler();
      }
    }, 140);
  });

  // expose helpers (opcional para debug)
  window.UI_MENU = { open: openDrawer, close: closeDrawer, toggle: toggleDrawer, isOpen: () => isDrawerOpen };
})();