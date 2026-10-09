(function () {
	'use strict';

	if (!window.themeWPShowDemo) {
		return;
	}

	var settings = window.themeWPShowDemo;

	if (settings.ajaxUrl) {
		document.addEventListener(
			'click',
			function (event) {
				if (!event.target || typeof event.target.closest !== 'function') {
					return;
				}

				var link = event.target.closest('[data-twp-event]');

				if (!link) {
					return;
				}

				var eventName = link.getAttribute('data-twp-event');

				if (['website', 'cta', 'hotline'].indexOf(eventName) === -1) {
					return;
				}

				var data = new FormData();
				data.append('action', settings.action);
				data.append('nonce', settings.nonce);
				data.append('profile_id', settings.profileId);
				data.append('event', eventName);

				if (navigator.sendBeacon) {
					navigator.sendBeacon(settings.ajaxUrl, data);
					return;
				}

				if (window.fetch) {
					fetch(settings.ajaxUrl, {
						method: 'POST',
						body: data,
						credentials: 'same-origin',
						keepalive: true
					}).catch(function () {
					});
				}
			},
			true
		);
	}

	var popupSettings = settings.popup || {};
	var popupMode = popupSettings.mode === 'flatsome' ? 'flatsome' : 'custom';
	var popupSelector = String(popupSettings.selector || '');
	var popup = popupMode === 'custom' ? document.querySelector('[data-twp-popup]') : null;
	var forceOpen = Boolean(popupSettings.forceOpen) || Boolean(popup && popup.getAttribute('data-twp-popup-forced') === '1');
	var flatsomePopup = popupMode === 'flatsome' && popupSelector
		? document.querySelector(popupSelector)
		: null;

	if (
		!popupSettings.enabled
		|| (popupMode === 'custom' && !popup)
		|| (popupMode === 'flatsome' && !flatsomePopup)
	) {
		return;
	}

	var storageKey = String(popupSettings.storageKey || 'twp_showdemo_popup_profile');
	var ttlMs = Math.max(60000, Number(popupSettings.ttlMs) || 86400000);
	var delayMs = Math.max(0, Number(popupSettings.delayMs) || 0);
	var previousFocus = null;
	var closeTimer = null;
	var visibilityHandler = null;
	var flatsomeOpening = false;

	function wasShownRecently() {
		if (forceOpen) {
			return false;
		}

		try {
			var lastShown = Number(window.localStorage.getItem(storageKey) || 0);
			return lastShown > 0 && Date.now() - lastShown < ttlMs;
		} catch (error) {
			return false;
		}
	}

	function markAsShown() {
		if (forceOpen) {
			return;
		}

		try {
			window.localStorage.setItem(storageKey, String(Date.now()));
		} catch (error) {
		}
	}

	function focusableElements() {
		return Array.prototype.slice.call(
			popup.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
		);
	}

	function openCustomPopup() {
		if (wasShownRecently() || !popup.hidden) {
			return;
		}

		markAsShown();
		previousFocus = document.activeElement;
		popup.hidden = false;
		popup.setAttribute('aria-hidden', 'false');
		document.body.classList.add('twp-showdemo-popup-open');

		window.requestAnimationFrame(function () {
			popup.classList.add('is-visible');
		});

		var closeButton = popup.querySelector('[data-twp-popup-close]');

		if (closeButton) {
			try {
				closeButton.focus({ preventScroll: true });
			} catch (error) {
				closeButton.focus();
			}
		}
	}

	function openFlatsomePopup() {
		if (wasShownRecently() || flatsomeOpening || !window.jQuery) {
			return;
		}

		var $ = window.jQuery;
		flatsomeOpening = true;

		function showNativePopup() {
			if (!$.magnificPopup || typeof $.magnificPopup.open !== 'function') {
				flatsomeOpening = false;
				return;
			}

			var options = {
				midClick: true,
				removalDelay: 300,
				items: {
					src: popupSelector,
					type: 'inline'
				}
			};
			var lightboxSettings = window.flatsomeVars && window.flatsomeVars.lightbox
				? window.flatsomeVars.lightbox
				: null;

			if (lightboxSettings) {
				if (typeof lightboxSettings.close_btn_inside !== 'undefined') {
					options.closeBtnInside = lightboxSettings.close_btn_inside;
				}

				if (lightboxSettings.close_markup) {
					options.closeMarkup = lightboxSettings.close_markup;
				}
			}

			$.magnificPopup.open(options);
			markAsShown();
			flatsomeOpening = false;
		}

		try {
			if (typeof $.loadMagnificPopup === 'function') {
				var loader = $.loadMagnificPopup();

				if (loader && typeof loader.then === 'function') {
					var pending = loader.then(showNativePopup);

					if (pending && typeof pending.catch === 'function') {
						pending.catch(function () {
							flatsomeOpening = false;
						});
					} else if (typeof loader.fail === 'function') {
						loader.fail(function () {
							flatsomeOpening = false;
						});
					}
					return;
				}
			}

			showNativePopup();
		} catch (error) {
			flatsomeOpening = false;
		}
	}

	function openPopup() {
		if (popupMode === 'flatsome') {
			openFlatsomePopup();
			return;
		}

		openCustomPopup();
	}

	function finishClose() {
		popup.hidden = true;
		popup.setAttribute('aria-hidden', 'true');
		document.body.classList.remove('twp-showdemo-popup-open');

		if (previousFocus && typeof previousFocus.focus === 'function') {
			try {
				previousFocus.focus({ preventScroll: true });
			} catch (error) {
				previousFocus.focus();
			}
		}
	}

	function closePopup() {
		if (forceOpen || popup.hidden) {
			return;
		}

		popup.classList.remove('is-visible');
		window.clearTimeout(closeTimer);
		closeTimer = window.setTimeout(finishClose, 180);
	}

	function handleKeydown(event) {
		if (popup.hidden) {
			return;
		}

		if (event.key === 'Escape') {
			if (forceOpen) {
				event.preventDefault();
				return;
			}
			event.preventDefault();
			closePopup();
			return;
		}

		if (event.key !== 'Tab') {
			return;
		}

		var focusable = focusableElements();

		if (!focusable.length) {
			event.preventDefault();
			return;
		}

		var first = focusable[0];
		var last = focusable[focusable.length - 1];

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	if (popupMode === 'custom') {
		popup.addEventListener('click', function (event) {
			var closeButton = event.target && typeof event.target.closest === 'function'
				? event.target.closest('[data-twp-popup-close]')
				: null;

			if (!forceOpen && (event.target === popup || closeButton)) {
				closePopup();
			}
		});

		document.addEventListener('keydown', handleKeydown);
	}

	window.setTimeout(function () {
		if (document.visibilityState === 'hidden') {
			visibilityHandler = function () {
				if (document.visibilityState === 'visible') {
					document.removeEventListener('visibilitychange', visibilityHandler);
					visibilityHandler = null;
					openPopup();
				}
			};
			document.addEventListener('visibilitychange', visibilityHandler);
			return;
		}

		openPopup();
	}, delayMs);
})();
