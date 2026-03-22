# Isha Pal — Personal Portfolio Website

A modern, dark-themed personal portfolio website with cloud computing–inspired UI, animated backgrounds, 3D-style cloud visuals, and smooth animations.

---

## 📁 File Structure

```
portfolio/
├── index.html    ← Main HTML page (all sections)
├── style.css     ← All styles (dark theme, animations, responsive)
├── script.js     ← Interactions (loader, canvas, scroll reveal, navbar)
└── README.md     ← This file
```

---

## 🚀 How to Run (Step by Step)

### Option 1 — Open directly in a browser (simplest)
1. Download all 3 files into the same folder: `index.html`, `style.css`, `script.js`
2. Double-click `index.html`
3. It opens in your default browser — done!

> ⚠️ Google Fonts and Font Awesome load from the internet, so an internet connection is needed for full styling.

---

### Option 2 — Using VS Code Live Server (recommended for development)
1. Install [VS Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension (Extensions tab → search "Live Server")
3. Open the `portfolio/` folder in VS Code
4. Right-click `index.html` → **Open with Live Server**
5. Your browser opens automatically at `http://127.0.0.1:5500`

---

### Option 3 — Using Python's built-in server
1. Open a terminal in the `portfolio/` folder
2. Run:
   ```bash
   # Python 3
   python -m http.server 8080
   ```
3. Open your browser at: `http://localhost:8080`

---

## ✏️ Customization Tips

| What to change | Where |
|---|---|
| Name / role / tagline | `index.html` → `#hero` section |
| GitHub / LinkedIn URLs | Search for `github.com/Ishapal1209` and `linkedin.com/in/ishapal01` in `index.html` |
| Projects | `#projects` section in `index.html` |
| Certifications | `#certifications` section in `index.html` |
| Colors | CSS variables at the top of `style.css` (`:root {}`) |
| Font | Change `Syne` / `DM Mono` in the `<link>` tag in `index.html` |

---

## 🌟 Features
- Animated canvas starfield + floating cloud glows
- Smooth scroll-reveal for every section
- Sticky responsive navbar with mobile hamburger menu
- Loading animation with CSS cloud
- Project cards with hover glow effects
- Certification cards with direct Google Drive links
- Fully responsive (mobile + desktop)
- No frameworks — pure HTML, CSS, JS

---

Built with ♥ for Isha Pal
