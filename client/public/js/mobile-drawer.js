/**
 * Lightweight, zero-dependency Mobile Drawer & Global Fixes
 * For Tiến Phát Đạt - Cửa Hàng Vải Thun
 */
(function() {
  // 1. Polyfill missing WordPress/WooCommerce globals to prevent console errors
  if (typeof window.Cookies === 'undefined') {
    window.Cookies = {
      get: function() { return null; },
      set: function() {},
      remove: function() {}
    };
  }
  if (typeof window.wc_order_attribution === 'undefined') {
    window.wc_order_attribution = { params: {} };
  }

  // 2. Initialize mobile drawer when DOM is ready
  function initMobileDrawer() {
    const mainMenu = document.getElementById('main-menu');
    if (!mainMenu) return;

    // Check if backdrop already exists
    let backdrop = document.getElementById('main-menu-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'main-menu-backdrop';
      document.body.appendChild(backdrop);
    }

    // Add close button to main menu if not present
    let closeBtn = mainMenu.querySelector('.drawer-close-btn');
    if (!closeBtn) {
      const headerDiv = document.createElement('div');
      headerDiv.className = 'drawer-header-bar';
      headerDiv.innerHTML = `
        <div style="font-weight: 800; font-size: 15px; color: #F58634; text-transform: uppercase; letter-spacing: 0.5px;">TIẾN PHÁT ĐẠT</div>
        <button type="button" class="drawer-close-btn" aria-label="Đóng menu" style="background: none; border: none; color: #334155; font-size: 26px; line-height: 1; cursor: pointer; padding: 4px 8px;">&times;</button>
      `;
      mainMenu.insertBefore(headerDiv, mainMenu.firstChild);
      closeBtn = headerDiv.querySelector('.drawer-close-btn');
    }

    function openDrawer(e) {
      if (e) e.preventDefault();
      mainMenu.classList.remove('mfp-hide');
      mainMenu.classList.add('drawer-active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer(e) {
      if (e && e.preventDefault) e.preventDefault();
      mainMenu.classList.remove('drawer-active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (!mainMenu.classList.contains('drawer-active')) {
          mainMenu.classList.add('mfp-hide');
        }
      }, 300);
    }

    // Attach click listeners to all open triggers
    const triggers = document.querySelectorAll('[data-open="#main-menu"]');
    triggers.forEach(trig => {
      trig.addEventListener('click', openDrawer);
    });

    // Close on backdrop click
    backdrop.addEventListener('click', closeDrawer);

    // Close on close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainMenu.classList.contains('drawer-active')) {
        closeDrawer();
      }
    });

    // Close when navigating via link inside drawer (if not accordion toggle)
    const links = mainMenu.querySelectorAll('a');
    links.forEach(l => {
      l.addEventListener('click', () => {
        const href = l.getAttribute('href');
        if (href && !href.startsWith('#')) {
          closeDrawer();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileDrawer);
  } else {
    initMobileDrawer();
  }
})();
