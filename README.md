# 🌑 Full Black Mode — Chrome Extension

<div align="center">

![Full Black Mode Banner](https://img.shields.io/badge/Full%20Black%20Mode-v2.0-000000?style=for-the-badge&logo=googlechrome&logoColor=4ade80)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-4ade80?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Made By](https://img.shields.io/badge/Made%20by-Shaizan%20Siddiqui-4ade80?style=for-the-badge)

**Forces a full, true black dark mode on every website you visit — instantly.**

*No more blinding white screens. Pure darkness, everywhere.*

</div>

---

## 📸 Preview

| Before | After |
|--------|-------|
| ⬜ Bright white website | ⬛ Full black dark mode |
| 😵 Eyes hurt at night | 😌 Comfortable in any light |
| No control | Toggle ON/OFF with one click |

---

## ✨ Features

- 🖤 **True Black Backgrounds** — Forces `#000000` black on all websites, not just grey
- 🔄 **Works Everywhere** — Google, YouTube, Twitter, Reddit, news sites, any website
- ⚡ **Instant Toggle** — Turn dark mode ON or OFF with one click from the popup
- 🔁 **SPA Support** — Works on React, Vue, Angular apps that load content dynamically
- 🖼️ **Smart Image Handling** — Images & videos stay natural using double-invert technique
- 💾 **Remembers Your Choice** — Settings are saved and applied automatically on every new tab
- 🌐 **All Frames** — Works inside iframes and embedded content too
- 🚀 **Lightweight** — No heavy libraries, pure vanilla JS + CSS

---

## 📁 File Structure

```
full-black-mode/
├── manifest.json       # Extension config (Manifest V3)
├── content.js          # Injected into every webpage — applies dark mode CSS
├── background.js       # Service worker — handles install & tab navigation
├── popup.html          # Extension popup UI
├── popup.js            # Popup toggle logic
└── icons/
    ├── icon16.png      # Toolbar icon (16x16)
    ├── icon48.png      # Extensions page icon (48x48)
    └── icon128.png     # Chrome Web Store icon (128x128)
```

---

## 🛠️ How It Works

This extension uses the **CSS Filter Invert + Hue-Rotate** technique — the most reliable and powerful method for dark mode:

```css
html.fbm-active {
  filter: invert(1) hue-rotate(180deg);
}
```

**Why this method?**
- `invert(1)` flips all colors — white becomes black, dark becomes light
- `hue-rotate(180deg)` corrects the hue so colors (red, blue, green) look natural
- Images and videos get **double-inverted** so they display normally

This is the same core technique used by popular extensions like Dark Reader.

---

## 📦 Installation

### Method 1 — Load Unpacked (Developer Mode)

> This is for the downloaded ZIP from this repo.

**Step 1:** Download the ZIP from the [Releases](../../releases) page and **extract** it to a folder.

**Step 2:** Open Google Chrome and go to:
```
chrome://extensions/
```

**Step 3:** Enable **Developer mode** by clicking the toggle in the **top-right corner**.

![Developer Mode Toggle](https://img.shields.io/badge/Developer%20Mode-Enable%20Top%20Right-blue?style=flat-square)

**Step 4:** Click **"Load unpacked"** button (top-left).

**Step 5:** Select the extracted `dark-extension` folder.

**Step 6:** ✅ Done! The 🌑 icon will appear in your Chrome toolbar.

> **Tip:** Pin the extension by clicking the puzzle icon 🧩 in the toolbar and pinning **Full Black Mode**.

---

### Method 2 — Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/full-black-mode.git

# Go into the folder
cd full-black-mode
```

Then follow Steps 2–6 from Method 1, selecting the cloned folder.

---

## 🚀 How to Use

### Turning Dark Mode ON / OFF

1. Click the 🌑 **Full Black Mode icon** in your Chrome toolbar
2. The popup will open showing the current status
3. Click the **toggle switch** to turn dark mode ON or OFF
4. The current website changes **instantly** — no refresh needed
5. Your choice is **saved automatically** for all future websites

### Popup Interface

```
┌─────────────────────────────┐
│  🌑  Full Black Mode        │
│      Total darkness          │
├─────────────────────────────┤
│  Dark Mode          [ ON ●] │
│  ACTIVE                      │
├─────────────────────────────┤
│  ● google.com                │
├─────────────────────────────┤
│  Full Black Mode injects     │
│  deep dark CSS into every    │
│  website...                  │
├─────────────────────────────┤
│  Made by Shaizan Siddiqui    │
└─────────────────────────────┘
```

---

## ⚠️ Known Limitations

| Limitation | Reason |
|-----------|--------|
| Does NOT work on `chrome://` pages | Chrome security policy — extensions cannot modify internal pages |
| Does NOT work on Chrome Web Store | Same Chrome security restriction |
| Some websites may look slightly off | Highly customized sites with complex CSS may need a page refresh |
| PDF viewer may not darken | Chrome's built-in PDF viewer is sandboxed |

---

## 🔧 Permissions Explained

| Permission | Why it's needed |
|-----------|----------------|
| `activeTab` | To apply dark mode to the current tab |
| `scripting` | Fallback to inject CSS if content script doesn't respond |
| `storage` | Save your ON/OFF preference |
| `tabs` | Detect when you navigate to a new page |
| `webNavigation` | Re-apply dark mode after page loads |
| `<all_urls>` | Access all websites to inject the dark mode CSS |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** this repository
2. Create a new branch: `git checkout -b feature/my-improvement`
3. Make your changes
4. Commit: `git commit -m "Add: my improvement"`
5. Push: `git push origin feature/my-improvement`
6. Open a **Pull Request**

### Ideas for contributions
- [ ] Per-site whitelist/blacklist
- [ ] Brightness/contrast slider
- [ ] Scheduled dark mode (e.g. only at night)
- [ ] Custom color themes

---

## 🐛 Reporting Bugs

Found a bug? Please open an [Issue](../../issues) with:
- The website URL where it doesn't work
- What you expected vs what happened
- Your Chrome version (`chrome://version`)

---

## 📄 License

```
MIT License

Copyright (c) 2025 Shaizan Siddiqui

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 👨‍💻 Author

<div align="center">

**Made with 🖤 by Shaizan Siddiqui**

![Author](https://img.shields.io/badge/GitHub-Shaizan%20Siddiqui-181717?style=for-the-badge&logo=github)

*If you find this useful, please ⭐ star the repo!*

</div>

---

<div align="center">
<sub>Full Black Mode v2.0 — True darkness for every website</sub>
</div>
