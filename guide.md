# Lab 4 — Static Site Generator & Git-Based CMS
### Dr. Yousef Abu Koush Dental Clinic

---

## Overview

This laboratory work migrates the dental clinic landing page built in Lab 3 into a modern **Jamstack architecture**. The site is now powered by a **Static Site Generator (SSG)** and a **Git-based Content Management System (CMS)**, enabling non-technical editors to update content through a visual UI without touching any code.

**Live site:** https://resonant-heliotrope-b7a3fd.netlify.app
**CMS admin:** https://resonant-heliotrope-b7a3fd.netlify.app/admin

---

## Technology Choices

### Static Site Generator — Astro

**Astro** (https://astro.build) was chosen for the following reasons:

- **No mandatory frontend framework** — Astro works with plain HTML, CSS, and JavaScript, making it a natural fit for the vanilla CSS + Bootstrap site from Lab 3.
- **Content Collections** — Astro has a built-in system for managing structured content files, which integrates cleanly with a Git-based CMS.
- **Zero JavaScript by default** — Astro ships no client-side JS unless explicitly needed, resulting in fast page loads.
- **Static output** — the build command (`npm run build`) generates a `dist/` folder of pure static HTML/CSS/JS files, deployable to any CDN.

### Git-Based CMS — Decap CMS

**Decap CMS** (https://decapcms.org) was chosen for the following reasons:

- **Git-native** — all content changes are committed directly to the Git repository. There is no separate database; the Git history IS the content history.
- **No backend required** — it runs entirely in the browser as a single-page app served from `/admin/`.
- **Netlify Identity integration** — authentication is handled by Netlify's built-in identity service with no additional infrastructure.
- **Declarative configuration** — the entire CMS schema is defined in a single `config.yml` file, making it easy to version-control and modify.

### Deployment — Netlify

**Netlify** hosts the site for the following reasons:

- Free tier sufficient for a static site.
- Native integration with Decap CMS via **Netlify Identity** and **Git Gateway** (the authentication proxy that allows the CMS to commit to GitHub on the user's behalf).
- Automatic rebuilds triggered on every git push or CMS content save.

---

## How a Static Site Generator Works

A traditional website generates HTML on the server for every request. A static site generator does the opposite: it generates **all HTML pages at build time**, once, and serves them as plain files.

```
Content Files (Markdown/YAML)
         +
Astro Templates (.astro)
         │
         ▼
    npm run build
         │
         ▼
    dist/index.html   ← pre-built, ready to serve
    dist/admin/       ← CMS admin panel
    dist/style.css
    dist/...
```

This means the server has nothing to compute at request time — it just serves files. The result is extremely fast load times and high security (no server-side code to exploit).

---

## Project Structure

```
PW_LAB4/
├── src/
│   ├── content/
│   │   ├── config.ts           # Defines Astro content collections
│   │   └── pages/
│   │       └── home.md         # ALL editable page content (YAML frontmatter)
│   ├── layouts/
│   │   └── Layout.astro        # HTML shell: <head>, Bootstrap, CSS links
│   └── pages/
│       └── index.astro         # Main page template — reads from home.md
├── public/
│   ├── reset.css               # Meyer's CSS reset (served as static file)
│   ├── style.css               # Site styles (served as static file)
│   ├── doc.png                 # Doctor's photo
│   └── admin/
│       ├── index.html          # Decap CMS single-page app entry point
│       ├── config.yml          # CMS schema — defines all editable fields
│       └── preview.js          # Custom styled preview panel for the CMS
├── astro.config.mjs            # Astro configuration
├── netlify.toml                # Netlify build settings
├── package.json                # Node.js dependencies (only Astro)
└── tsconfig.json               # TypeScript configuration
```

---

## Content Layer — Astro Content Collections

All page content lives in a single file: `src/content/pages/home.md`.

This file uses **YAML frontmatter** — a block of structured data between `---` markers at the top of a Markdown file. Every section of the page (hero, services, about, testimonials, gallery, contact, footer) is represented as structured YAML.

**Example excerpt from `home.md`:**
```yaml
---
hero:
  eyebrow: Your Trusted Dental Partner
  title: A Healthier Smile
  title_sub: Starts Here
  lead: State-of-the-art dentistry delivered with compassion and precision.

services:
  items:
    - title: General Dentistry
      icon: tooth
      description: Routine exams, X-rays, professional cleaning...
    - title: Teeth Whitening
      icon: smile
      description: Professional-grade in-office whitening...
---
```

Astro's **Content Collections API** reads this file at build time:

```javascript
// src/pages/index.astro
const home = await getEntry('pages', 'home');
const { hero, services, about } = home.data;
```

The template then renders the data into HTML:

```html
<h1 class="hero__title">{hero.title}<br />{hero.title_sub}</h1>
<p class="hero__lead">{hero.lead}</p>
```

This separation of **content** (the `.md` file) from **template** (the `.astro` file) is the core principle that enables the CMS integration.

---

## Git-Based CMS — How Decap CMS Works

### Architecture

```
Editor opens /admin/
       │
       ▼
Decap CMS loads in browser (reads config.yml)
       │
       ▼
Editor makes changes in the visual UI
       │
       ▼
Decap CMS commits the change to GitHub
via Netlify Git Gateway (acts as auth proxy)
       │
       ▼
GitHub push triggers Netlify webhook
       │
       ▼
Netlify runs: npm run build
       │
       ▼
New dist/ deployed to CDN (~60 seconds total)
```

There is no database. The content file (`home.md`) is the single source of truth, and its full history is in Git.

### CMS Schema (`public/admin/config.yml`)

The schema maps every field in `home.md` to a CMS widget. For example:

```yaml
- label: Hero Section
  name: hero
  widget: object
  fields:
    - { label: "Title Line 1", name: title, widget: string }
    - { label: "Background Image", name: bg_image, widget: image }
    - label: Trust Items
      name: trust_items
      widget: list
      fields:
        - { label: Text, name: text, widget: string }
```

Widget types used:
| Widget | Purpose |
|--------|---------|
| `string` | Single-line text (titles, labels) |
| `text` | Multi-line text (paragraphs, descriptions) |
| `image` | Image upload with preview |
| `object` | Group of fields (a section) |
| `list` | Repeatable items (services, testimonials, gallery images) |
| `select` | Dropdown (service icon choice) |
| `boolean` | Toggle (gallery tall/wide layout flags) |

### What is Editable via the CMS

Every piece of user-visible content on the page is editable without touching code:

- **Hero** — eyebrow text, title (2 lines), lead paragraph, CTA button labels, background image, trust bar items
- **Services** — section heading, subtitle, all 6 service cards (title, description, icon)
- **About** — doctor name, photo, experience badge, both bio paragraphs, highlights list, CTA text
- **Testimonials** — section heading, all 4 patient cards (name, treatment, quote, avatar photo)
- **Stats bar** — all 4 numbers and labels
- **Gallery** — section heading, all 5 images (upload, alt text, caption, layout flags)
- **Contact** — section heading, address, phone, email, opening hours
- **Footer** — tagline text
- **Meta** — page `<title>` and `<meta description>`

---

## Custom CMS Preview (`public/admin/preview.js`)

By default, Decap CMS shows a plain-text data dump in its preview pane. Two APIs were used to create a styled, accurate preview:

### 1. `CMS.registerPreviewStyle(url)`
Injects the site's actual CSS into the preview iframe:
```javascript
CMS.registerPreviewStyle('/reset.css');
CMS.registerPreviewStyle('/style.css');
CMS.registerPreviewStyle('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
```

### 2. `CMS.registerPreviewTemplate(name, component)`
Registers a React component (using Decap's built-in `createClass` and `h` helpers — no build step needed) that renders the full page layout using live CMS data:

```javascript
var HomePreview = createClass({
  render: function() {
    var entry = this.props.entry;
    var hero = entry.getIn(['data', 'hero']).toJS();

    return h('section', { className: 'hero' },
      h('h1', { className: 'hero__title' }, hero.title)
      // ... all other sections
    );
  }
});

CMS.registerPreviewTemplate('home', HomePreview);
```

The `getAsset` prop is used to resolve uploaded images into preview-able blob URLs while the editor is working:
```javascript
var heroBg = this.props.getAsset(hero.bg_image);
h('img', { src: heroBg.toString() })
```

The result is a preview pane that shows the real site layout, typography, colors, and images — updating live as the editor types.

---

## Authentication Flow

Netlify Identity is used to protect the CMS:

1. Editor navigates to `/admin/`
2. Decap CMS detects no session → shows login modal
3. Editor logs in with email/password (managed by Netlify Identity)
4. Netlify Identity issues a JWT token
5. Decap CMS uses this token with **Git Gateway** — a Netlify proxy that signs GitHub API requests on behalf of the editor
6. All commits appear in GitHub history under the editor's name

When a new editor is invited:
- Netlify sends an invite email with a token link
- Clicking the link redirects to `/#invite_token=...`
- A script in `<head>` detects the token and redirects to `/admin/#invite_token=...`
- Decap CMS's admin page handles the token and shows the password-setup form

---

## Build & Deployment

### Local Development
```bash
npm install       # install Astro (only dependency)
npm run dev       # start dev server at http://localhost:4321
```

### Production Build
```bash
npm run build     # outputs to dist/
npm run preview   # preview the dist/ output locally
```

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Netlify reads this file automatically. Every push to the `main` branch triggers a new build and deployment.

---

## CSS Framework Integration (Lab 3 Requirement)

The Bootstrap 5 CSS framework from Lab 3 is preserved in full:

- Bootstrap CSS is loaded via CDN in `src/layouts/Layout.astro`
- Bootstrap JS bundle is loaded at the bottom of `<body>`
- All Bootstrap utility classes (`container`, `navbar`, `navbar-expand-lg`, `collapse`, `row`, `col-*`, `form-control`, `form-select`, `btn`, `ms-auto`, etc.) are used throughout `index.astro`
- The custom `style.css` overrides and extends Bootstrap with the clinic's design system (CSS custom properties, BEM class naming, responsive breakpoints)

Both stylesheets are placed in `public/` so they are also available inside the CMS preview iframe.

---

## Summary of Lab Requirements Met

| Requirement | Implementation |
|---|---|
| Static Site Generator | Astro 4 |
| Git-based CMS | Decap CMS 3 |
| CSS framework from Lab 3 | Bootstrap 5.3 + custom CSS, fully preserved |
| As much content as possible editable via CMS | All text, images, and structured data on every section |
| Site deployed live | https://resonant-heliotrope-b7a3fd.netlify.app |
| Decent git history | Each CMS save = 1 commit; manual commits for code changes |
