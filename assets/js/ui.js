/*
  ui.js
  - torna o menu responsivo em mobile (drawer)
  - controla overlay e teclas (Esc)
  - evita múltiplos listeners ao redimensionar
*/
(function(){
  function $(sel){ return document.querySelector(sel); }
  const menuBtn = $('#menuToggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('mobileOverlay');
  const nav = document.querySelector('.nav');

  let isDrawerOpen = false;
  let attached = false;

  function isMobileView(){ return window.innerWidth <= 1100; }

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

  // attach or detach the toggle handler depending on current viewport
  function updateToggleAttachment(){
    if (!menuBtn) return;
    if (isMobileView() && !attached){
      menuBtn.addEventListener('click', toggleDrawer);
      attached = true;
    } else if (!isMobileView() && attached){
      menuBtn.removeEventListener('click', toggleDrawer);
      attached = false;
      // ensure closed in desktop
      closeDrawer();
    }
  }

  // overlay click closes drawer
  if (overlay){
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
        // small delay to allow navigation handling if any
        setTimeout(closeDrawer, 120);
      }
    });
  }

  // initialize
  updateToggleAttachment();

  // adjust on resize (debounce simple)
  let rid = null;
  window.addEventListener('resize', ()=>{
    if (rid) clearTimeout(rid);
    rid = setTimeout(()=>{
      updateToggleAttachment();
      if (window.innerWidth > 1100){
        // ensure drawer closed and overlay hidden on desktop
        closeDrawer();
      }
    }, 120);
  });

  // expose helpers for debugging if needed
  window.UI_MENU = { open: openDrawer, close: closeDrawer, toggle: toggleDrawer, isOpen: () => isDrawerOpen };
})();