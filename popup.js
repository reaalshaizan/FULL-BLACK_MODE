const STORAGE_KEY = 'fullBlackMode_enabled';

const toggle = document.getElementById('darkToggle');
const statusText = document.getElementById('statusText');
const siteDot = document.getElementById('siteDot');
const siteName = document.getElementById('siteName');
const toggleSection = document.getElementById('toggleSection');

let currentTabId = null;

// Get current tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab) return;
  currentTabId = tab.id;

  if (tab.url) {
    try {
      const url = new URL(tab.url);
      siteName.textContent = url.hostname || tab.url;
    } catch {
      siteName.textContent = tab.url;
    }
  } else {
    siteName.textContent = 'Unknown page';
  }
});

// Load current state from storage and set UI
chrome.storage.sync.get([STORAGE_KEY], (result) => {
  const enabled = result[STORAGE_KEY] !== false;
  updateUI(enabled);
});

function updateUI(enabled) {
  toggle.checked = enabled;
  statusText.textContent = enabled ? 'ACTIVE' : 'DISABLED';
  statusText.className = 'toggle-status' + (enabled ? ' on' : '');
  siteDot.className = 'site-dot' + (enabled ? '' : ' off');
}

function applyToggle(enabled) {
  // 1. Save to storage (affects all future page loads)
  chrome.storage.sync.set({ [STORAGE_KEY]: enabled });

  // 2. Update UI immediately
  updateUI(enabled);

  // 3. Send message to content script in current tab
  if (currentTabId !== null) {
    chrome.tabs.sendMessage(currentTabId, { type: 'TOGGLE_DARK', enabled }, () => {
      // If content script not loaded, use scripting API as fallback
      if (chrome.runtime.lastError) {
        chrome.scripting.executeScript({
          target: { tabId: currentTabId },
          func: (isEnabled) => {
            const STYLE_ID = 'full-black-mode-style';
            const darkCSS = `
              html.fbm-active {
                filter: invert(1) hue-rotate(180deg) !important;
                background: #000 !important;
              }
              html.fbm-active img,
              html.fbm-active video,
              html.fbm-active iframe,
              html.fbm-active canvas,
              html.fbm-active picture {
                filter: invert(1) hue-rotate(180deg) !important;
              }
            `;
            if (isEnabled) {
              let style = document.getElementById(STYLE_ID);
              if (!style) {
                style = document.createElement('style');
                style.id = STYLE_ID;
                document.documentElement.appendChild(style);
              }
              style.textContent = darkCSS;
              document.documentElement.classList.add('fbm-active');
            } else {
              document.documentElement.classList.remove('fbm-active');
              const el = document.getElementById(STYLE_ID);
              if (el) el.remove();
            }
          },
          args: [enabled]
        });
      }
    });
  }
}

// Toggle on switch change
toggle.addEventListener('change', () => {
  applyToggle(toggle.checked);
});

// Also allow clicking the whole section
toggleSection.addEventListener('click', (e) => {
  if (e.target !== toggle && e.target.tagName !== 'INPUT') {
    const newState = !toggle.checked;
    toggle.checked = newState;
    applyToggle(newState);
  }
});
