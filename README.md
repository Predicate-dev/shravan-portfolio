# Shravan Balaji Portfolio

A premium personal portfolio for Shravan Balaji, built to present him as a machine learning engineer with strong applied systems depth.

The site uses:

- `React`
- `Tailwind CSS`
- `Framer Motion`
- `Vite`
- `Express`
- `Nodemailer`

## What is included

- A cinematic first-load landing intro with an Apple-inspired presentation style
- A machine-learning-engineer-first narrative across the hero, about, skills, and experience sections
- A vertical experience timeline with animated reveal behavior
- A filterable project gallery
- A backend-powered contact form that sends directly to `shravanjbalaji@berkeley.edu`
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

That command starts:

- the Vite client on `http://localhost:5173`
- the Express contact API on `http://localhost:8787`

Create a production build:

```bash
npm run build
```

Start the production server locally:

```bash
npm start
```

## Contact form setup

The default path is now Gmail SMTP with a Google App Password.

Copy the environment template:

```bash
cp .env.example .env
```

Then fill in these values:

- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `CONTACT_FROM_NAME`

The contact destination is already set to:

- `CONTACT_TO_EMAIL=shravanjbalaji@berkeley.edu`

Recommended Gmail setup:

- Turn on 2-Step Verification for the Google account you will send from
- Create a 16-character Google App Password for Mail
- Put that account in `GMAIL_USER`
- Put the app password in `GMAIL_APP_PASSWORD`
- Keep `CONTACT_TO_EMAIL=shravanjbalaji@berkeley.edu`

Important Gmail note:

- Gmail usually sends from the authenticated account address, even if you try to set a different `From` email
- If your Berkeley Google Workspace account does not offer App Passwords, use a personal Gmail sender account and keep the Berkeley address only as the destination

Optional:

- `CONTACT_FROM_EMAIL` can be used if that address is configured as a Gmail alias or approved Workspace sender
- The generic SMTP fallback variables remain supported if you later switch providers

Without Gmail credentials, the backend will start but the contact endpoint will return a configuration error instead of sending mail.

## Project structure

```text
server/
  index.js
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
.env.example
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

- Add project screenshots or media previews
- Add a downloadable resume button
- Add a persistent datastore for contact analytics or message logs

## Deployment

This project now includes a backend mail API, so deploy it to a Node-capable host.

Good options:

- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Fly.io](https://fly.io/)
