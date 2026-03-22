// Full Black Mode - Content Script by Shaizan Siddiqui
(function () {
  const STORAGE_KEY = 'fullBlackMode_enabled';
  const STYLE_ID = 'full-black-mode-style';

  // Strong dark mode using filter invert + hue-rotate trick (most reliable method)
  const darkCSS = `
    html.fbm-active {
      filter: invert(1) hue-rotate(180deg) !important;
      background: #000 !important;
    }
    html.fbm-active img,
    html.fbm-active video,
    html.fbm-active iframe,
    html.fbm-active canvas,
    html.fbm-active picture,
    html.fbm-active svg image,
    html.fbm-active [style*="background-image"] {
      filter: invert(1) hue-rotate(180deg) !important;
    }
    html.fbm-active ::-webkit-scrollbar {
      background: #111 !important;
    }
    html.fbm-active ::-webkit-scrollbar-thumb {
      background: #444 !important;
    }
  `;

  function injectStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = darkCSS;
    document.documentElement.classList.add('fbm-active');
  }

  function removeStyle() {
    document.documentElement.classList.remove('fbm-active');
    const el = document.getElementById(STYLE_ID);
    if (el) el.remove();
  }

  function applyDarkMode(enabled) {
    if (enabled) {
      injectStyle();
    } else {
      removeStyle();
    }
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'TOGGLE_DARK') {
      applyDarkMode(msg.enabled);
      sendResponse({ success: true });
    }
    if (msg.type === 'GET_STATUS') {
      sendResponse({ enabled: document.documentElement.classList.contains('fbm-active') });
    }
    return true;
  });

  // On load, check storage
  chrome.storage.sync.get([STORAGE_KEY], (result) => {
    const enabled = result[STORAGE_KEY] !== false;
    applyDarkMode(enabled);
  });

  // Re-apply after head changes (SPAs)
  const observer = new MutationObserver(() => {
    chrome.storage.sync.get([STORAGE_KEY], (result) => {
      const enabled = result[STORAGE_KEY] !== false;
      if (enabled && !document.getElementById(STYLE_ID)) {
        injectStyle();
      }
    });
  });

  if (document.head) {
    observer.observe(document.head, { childList: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.head, { childList: true });
    });
  }
})();
