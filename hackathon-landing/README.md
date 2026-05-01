# 🚀 Hackathon 2025 — Landing Page

> **Frontend Interview Assignment** — A fully responsive, accessible, and animated hackathon landing page built with pure HTML5, CSS3, and Vanilla JavaScript.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-7c3aed?style=for-the-badge&logo=github)](https://your-username.github.io/hackathon-landing/)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=flat&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Animations-1572B6?style=flat&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📋 Project Overview

This project is a **pixel-accurate recreation of a Figma design** for a hackathon event page. It includes three main sections:

- **Why Participate?** — Animated astronaut with radial orbit rings and benefit cards
- **Hackathon Schedule** — Interactive swipeable timeline slider
- **Gallery** — Mosaic image grid with hover animations

The page is built **without any frameworks or build tools** — just clean, standards-compliant HTML, CSS, and JavaScript. Every interaction is accessible via keyboard and touch devices.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure (`<section>`, `<article>`, ARIA roles) |
| **CSS3** | Animations, CSS Grid, Custom Properties (variables), `@keyframes` |
| **Vanilla JavaScript (ES6+)** | Slider logic, IntersectionObserver, custom cursor, swipe detection |
| **Google Fonts** | `Syne` (headings) + `DM Sans` (body text) |
| **Unsplash** | Royalty-free placeholder images |

> No npm, no bundlers, no frameworks — opens directly in any browser.

---

## ✨ Features

### 🎨 Visual & Animation
- **Floating astronaut** with continuous `translateY` + rotation keyframe loop
- **Radial pulse rings** — three concentric circles with staggered opacity/scale animation
- **Glowing blob** — radial gradient that drifts vertically on an 8s loop
- **Custom cursor** — circular follower that expands on hover over interactive elements
- **Noise texture overlay** — subtle SVG grain for a cinematic dark-theme feel

### 🖱 Interactions
- **Scroll-triggered fade-ins** via `IntersectionObserver` — cards animate in when they enter the viewport
- **Timeline slider** — navigate with buttons, dot indicators, keyboard arrows, or touch swipe
- **Gallery hover effects** — images scale and reveal a purple gradient label overlay
- **Connector lines** on benefit cards that point toward the central astronaut

### ♿ Accessibility
- Semantic HTML5 elements throughout
- Full `ARIA` labelling (`aria-label`, `aria-labelledby`, `role`, `aria-selected`)
- `:focus-visible` keyboard focus indicators on all interactive elements
- Touch swipe support with a configurable 50px threshold
- Keyboard navigation on slider cards (`ArrowLeft` / `ArrowRight` / `Enter`)

### 📱 Responsive Design
- CSS Grid collapses from 3-column → single column on mobile (≤768px)
- Slider cards use `clamp()` for fluid widths across breakpoints
- Gallery mosaic resets to a single column on small screens
- Connector lines hidden on mobile to avoid layout issues
- Orbit rings scale down on narrow viewports using `min()`

---

## ⚙️ Setup Instructions

### Option 1 — Open directly (no server needed)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/hackathon-landing.git

# 2. Open in your browser
open hackathon-landing/index.html
# or just double-click index.html in your file explorer
```

### Option 2 — Local dev server (recommended for accurate font loading)

```bash
# Using Python (built-in)
cd hackathon-landing
python3 -m http.server 3000
# Open http://localhost:3000

# Using Node.js (npx)
npx serve hackathon-landing
```

### Option 3 — Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Set source branch to `main`, folder to `/ (root)`
4. Click **Save** — your site will be live at:

```
https://your-username.github.io/hackathon-landing/
```

> 💡 Update the Live Demo badge URL at the top of this README once deployed.

---

## 📁 Folder Structure

```
hackathon-landing/
│
├── index.html                  # Entry point — semantic HTML structure
│
├── assets/
│   ├── css/
│   │   └── styles.css          # All styles: tokens, layout, animations, responsive
│   │
│   ├── js/
│   │   └── main.js             # All interactivity: cursor, slider, observer, gallery
│   │
│   └── images/                 # Local image assets (if any; currently uses Unsplash CDN)
│
└── README.md                   # Project documentation (you are here)
```

### Why this structure?

| File | Responsibility |
|---|---|
| `index.html` | Structure only — no inline `<style>` or `<script>` tags |
| `assets/css/styles.css` | Presentation only — CSS custom properties at the top for easy theming |
| `assets/js/main.js` | Behaviour only — ES6+, strict mode, JSDoc comments on every function |

This **separation of concerns** makes the codebase easy to scan, debug, and extend.

---

## 🧪 Testing Checklist

| Test | Status |
|---|---|
| Desktop (Chrome, Firefox, Safari, Edge) | ✅ |
| Mobile — iOS Safari | ✅ |
| Mobile — Android Chrome | ✅ |
| Retina / HiDPI screens | ✅ |
| Keyboard-only navigation | ✅ |
| Touch swipe on slider | ✅ |
| Smooth 60fps animations | ✅ |
| No layout shift on resize | ✅ |

---

## 🎨 Design Tokens (CSS Variables)

Edit `assets/css/styles.css` line ~15 to retheme instantly:

```css
:root {
  --purple:       #7c3aed;   /* Primary accent */
  --purple-light: #a855f7;   /* Highlights, borders on hover */
  --purple-dim:   #4c1d95;   /* Subtle backgrounds */
  --bg:           #050508;   /* Page background */
  --text:         #e8e0ff;   /* Body text */
  --muted:        #9580cc;   /* Secondary text, descriptions */
  --white:        #ffffff;   /* Headings */
}
```

---

## 👤 Author

**Aakash Saxena**
B.Tech Computer Science — ABES Engineering College, Ghaziabad

---

## 📄 License

This project was created as part of a frontend interview assignment.
Feel free to reference the code for learning purposes.