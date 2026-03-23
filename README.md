# 🦷 Dr. Yousef Abu Koush — Dental Clinic

> A modern dental clinic landing page built with Astro SSG, managed with Decap CMS, and deployed on Netlify.

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://resonant-heliotrope-b7a3fd.netlify.app/)
![Astro](https://img.shields.io/badge/Astro-4.x-BC52EE?logo=astro&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![Decap CMS](https://img.shields.io/badge/Decap_CMS-3.x-FF5A5F)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify&logoColor=white)

**🌐 Live Site:** [https://resonant-heliotrope-b7a3fd.netlify.app](https://resonant-heliotrope-b7a3fd.netlify.app/)
**📝 CMS Admin:** [https://resonant-heliotrope-b7a3fd.netlify.app/admin](https://resonant-heliotrope-b7a3fd.netlify.app/admin)

---

## ✨ Features

- **Static Site Generation** — pre-built HTML at deploy time via Astro, zero server required
- **Git-based CMS** — content edits commit directly to the repo via Decap CMS
- **Fully editable content** — every section, image, and text block manageable from the CMS UI
- **Per-section visibility toggles** — hide/show any section without touching code
- **Live styled CMS preview** — the admin preview pane mirrors the real site design
- **Bootstrap 5** integrated with a fully custom design system
- **Responsive** — mobile-first layout with sticky nav, mobile CTA bar, and touch-friendly interactions
- **Scroll animations**, scroll-spy navigation, and an interactive mascot (Sparky the Tooth 🦷)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Static Site Generator | [Astro 4](https://astro.build) |
| CSS Framework | [Bootstrap 5.3](https://getbootstrap.com) + custom CSS |
| Content Management | [Decap CMS 3](https://decapcms.org) |
| Authentication | [Netlify Identity](https://docs.netlify.com/security/secure-access-to-sites/identity/) |
| Hosting | [Netlify](https://netlify.com) |
| Content Format | YAML frontmatter (Markdown) |
| Fonts | Google Fonts — Merriweather + Lato |

---

## 📁 Project Structure

```
/
├── src/
│   ├── content/
│   │   ├── config.ts           # Astro content collection schema
│   │   └── pages/
│   │       └── home.md         # All page content (CMS-editable)
│   ├── layouts/
│   │   └── Layout.astro        # HTML shell, Bootstrap & CSS links
│   └── pages/
│       └── index.astro         # Page template — reads from home.md
├── public/
│   ├── reset.css               # Meyer's CSS reset
│   ├── style.css               # Custom design system
│   ├── doc.png                 # Doctor photo
│   └── admin/
│       ├── index.html          # Decap CMS entry point
│       ├── config.yml          # CMS field schema
│       └── preview.js          # Custom styled CMS preview
├── astro.config.mjs
├── netlify.toml                # Build: npm run build → dist/
└── package.json
```

---

## 🗂️ What's Editable via CMS

Every piece of visible content is editable through the admin panel at `/admin` — no code changes needed:

| Section | Editable Fields |
|---|---|
| **Hero** | Eyebrow, title, lead text, CTA labels, background image, trust items |
| **Services** | Heading, all 6 service cards (title, icon, description) |
| **About** | Doctor name, photo, bio paragraphs, highlights, experience badge |
| **Testimonials** | All 4 patient cards (name, treatment, quote, avatar photo) |
| **Stats Bar** | All 4 numbers and labels |
| **Gallery** | All 5 images (upload, alt text, caption, tall/wide layout flags) |
| **Contact** | Address, phone, email, opening hours |
| **Footer** | Tagline |
| **Meta** | Page `<title>` and `<meta description>` |

Each section also has a **Show / Hide toggle** — flip it off in the CMS to remove it from the live site.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+

### Run Locally

```bash
git clone <repo-url>
cd PW_LAB4
npm install
npm run dev       # → http://localhost:4321
```

### Build for Production

```bash
npm run build     # outputs to dist/
npm run preview   # preview the built output locally
```

---

## 🔄 How It Works

```
Editor saves in CMS
       │
       ▼
Decap CMS commits home.md to GitHub
       │
       ▼
Netlify detects push → runs: npm run build
       │
       ▼
Astro reads home.md → generates static HTML
       │
       ▼
dist/ deployed to Netlify CDN  (~60 seconds total)
```

---

## 🎨 Color Palette

| Role | Hex |
|---|---|
| Primary blue | `#0077B6` |
| Accent cyan | `#00B4D8` |
| Light blue bg | `#E8F4FD` |
| Dark text | `#1D2D44` |
| Muted text | `#5A6A7A` |

---

## 🔐 CMS Access

The admin panel is protected by **Netlify Identity**:

1. Go to [/admin](https://resonant-heliotrope-b7a3fd.netlify.app/admin)
2. Log in with your Netlify Identity credentials
3. Edit any content field → click **Publish**
4. Netlify automatically rebuilds and deploys the site

---

_Lab 4 — Web Programming, 2026_
