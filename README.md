# Shravan Balaji Portfolio

A premium personal portfolio for Shravan Balaji, built to present him as a machine learning engineer with strong applied systems depth.

The site uses:

- `React`
- `Tailwind CSS`
- `Framer Motion`
- `Vite`

## What is included

- A cinematic first-load landing intro with an Apple-inspired presentation style
- A machine-learning-engineer-first narrative across the hero, about, skills, and experience sections
- A vertical experience timeline with animated reveal behavior
- A filterable project gallery
- A functional contact section with `mailto:` fallback and copy-email support
- Mobile navigation, reduced-motion handling, and accessibility polish

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
src/
  components/
    IntroLanding.jsx
    ProjectCard.jsx
    SectionReveal.jsx
    TimelineItem.jsx
    TypingHeadline.jsx
  data/
    resumeData.js
  App.js
  index.css
  main.jsx
```

## Content model

Most portfolio content is driven from:

- [`src/data/resumeData.js`](./src/data/resumeData.js)

That file contains:

- personal details
- intro landing copy
- hero content
- about copy
- education
- skills
- experience
- projects
- achievements

## Customization ideas

- Replace the `mailto:` contact flow with a backend form handler
- Add project screenshots or media previews
- Add a downloadable resume button
- Deploy to Vercel, Netlify, or GitHub Pages

## Deployment

This project is ready to deploy as a static frontend.

Good options:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
