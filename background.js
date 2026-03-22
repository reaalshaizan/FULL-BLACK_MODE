// Full Black Mode - Background Service Worker by Shaizan Siddiqui
const STORAGE_KEY = 'fullBlackMode_enabled';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ [STORAGE_KEY]: true });
});

// Re-inject on tab navigation (for SPAs and new pages)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    chrome.storage.sync.get([STORAGE_KEY], (result) => {
      const enabled = result[STORAGE_KEY] !== false;
      if (enabled) {
        chrome.tabs.sendMessage(tabId, { type: 'TOGGLE_DARK', enabled: true }, () => {
          if (chrome.runtime.lastError) {
            // Content script may not be ready yet; it will auto-apply via storage on load
          }
        });
      }
    });
  }
});
