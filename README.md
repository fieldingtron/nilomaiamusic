# Nilo Maia - Musician Website

A polished, mobile-first one-page website built with Astro and Tailwind CSS for professional guitarist Nilo Maia.

## Features

- **Dark Mode Design** with Brazilian color accents (green #009739, yellow #FEDD00, blue #002776)
- **Mobile-First Responsive** layout that works beautifully on all devices
- **SEO Optimized** with complete meta tags, OpenGraph, and JSON-LD structured data
- **Accessible** with semantic HTML, keyboard navigation, focus states, and ARIA labels
- **Performance Focused** - Lighthouse-friendly with minimal JavaScript
- **Smooth Scrolling** navigation with sticky header

## Sections

1. **Hero** - Compelling headline with CTAs and trust indicators
2. **About** - Professional background and musical lineage
3. **Lessons** - Three lesson types with "How It Works" details
4. **Brazil Tour** - Featured February tour to Lumiar with itinerary
5. **Calendar** - Booking widget placeholder with email options
6. **Mailing List** - Simple email signup form
7. **Contact** - Contact form with social links and direct email

## Tech Stack

- **Astro** v5.16.6 - Static site generator
- **Tailwind CSS** v4.1.18 - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **No Database** - Fully static site
- **No Authentication** - Simple contact forms with client-side validation

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Astro components
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Lessons.astro
│   │   ├── Tour.astro
│   │   ├── Calendar.astro
│   │   ├── MailingList.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── pages/
│   │   └── index.astro  # Main page with SEO
│   └── styles/
│       └── global.css   # Tailwind config & custom styles
├── package.json
└── astro.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Navigate to the project:
```bash
cd testnilo
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser to `http://localhost:4322` (or whatever port is shown)

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Color Palette

### Brazilian Accent Colors
- Green: `#009739` - Primary CTA, links, accents
- Yellow: `#fedd00` - Secondary CTA, highlights
- Blue: `#002776` - Tertiary accent

### Base Dark Palette
- Charcoal: `#1a1a1a` - Primary background
- Charcoal Light: `#2a2a2a` - Secondary background
- Charcoal Lighter: `#3a3a3a` - Borders, subtle elements
- Cream: `#f5f5f0` - Primary text
- Gray: `#a0a0a0` - Secondary text

## Forms & Interactions

All forms use **client-side validation only**:
- Mailing list signup shows success message (no backend)
- Contact form validates and shows confirmation (no backend)
- Booking uses `mailto:` links with pre-filled subjects

To connect to a real backend:
1. Add form submission handlers in component `<script>` tags
2. Replace success messages with actual API calls
3. Consider services like Formspree, Netlify Forms, or custom API

## SEO & Structured Data

The site includes:
- Complete meta tags (title, description, keywords)
- OpenGraph tags for social sharing
- Twitter Card tags
- JSON-LD structured data:
  - **Person** schema for Nilo Maia
  - **Service** schema for guitar lessons
  - **Event** schema for Brazil tour

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states with ring utilities
- Sufficient color contrast (WCAG AA compliant)
- Mobile menu with proper aria-expanded states

## Customization

### Update Colors
Edit `src/styles/global.css` in the `@theme` block

### Update Content
Edit individual component files in `src/components/`

### Update SEO
Edit meta tags and JSON-LD in `src/pages/index.astro`

### Add Real Booking Calendar
Replace the placeholder in `src/components/Calendar.astro` with Calendly embed or similar

## Deployment

Deploy to any static hosting:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect repo and deploy
- **GitHub Pages**: Enable in repo settings
- **Cloudflare Pages**: Connect repo

## License

© 2025 Nilo Maia. All rights reserved.

## Contact

For questions: hello@nilomaia.com

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
