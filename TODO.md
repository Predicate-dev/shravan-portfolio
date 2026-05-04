# Portfolio TODOs

## Current status

- The portfolio is built with `React`, `Tailwind CSS`, `Framer Motion`, `Vite`, `Express`, and `Nodemailer`.
- The site is now positioned around an ML-engineer narrative instead of a general software-engineering one.
- The landing intro was redesigned into a multi-scene cinematic experience.
- The typing animation under the hero name has been fixed so the cursor tracks the visible text correctly.
- The contact form no longer uses `mailto:`. It now posts to a backend API at `/api/contact`.
- The backend is wired for Gmail App Password delivery by default, but live sending is still blocked until sender credentials are added to `.env`.

## Immediate next steps

1. Decide which sender account to use for Gmail SMTP.
   Use `shravanjbalaji@berkeley.edu` only if Berkeley Google Workspace allows App Passwords.
   Otherwise use a personal Gmail account as the sender and keep `CONTACT_TO_EMAIL=shravanjbalaji@berkeley.edu`.

2. Fill in `.env`.
   Required values:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `CONTACT_FROM_NAME`

3. Run a local end-to-end mail test.
   Suggested commands:
   ```bash
   npm run dev
   ```
   Then submit the contact form through the site and confirm the message arrives in the inbox.

4. Deploy the full stack to a Node-capable host.
   Good options:
   - Render
   - Railway
   - Fly.io

5. Add production environment variables in the hosting dashboard.
   Mirror the same values used in `.env`.

## Implementation details

### Contact form backend

- Frontend form submission lives in `src/App.js`.
- The form sends a `POST` request to `/api/contact`.
- Local development uses a Vite proxy in `vite.config.js` to forward `/api/*` to `http://localhost:8787`.
- The backend API lives in `server/index.js`.
- Gmail is the default provider path.
- The API includes:
  - field validation
  - a hidden honeypot field named `website`
  - basic in-memory rate limiting
  - `replyTo` set to the visitor's email
- If Gmail credentials are missing, the API returns a clear configuration error instead of silently failing.

### Gmail-specific note

- Gmail usually sends from the authenticated account address.
- `CONTACT_FROM_EMAIL` is optional and only works reliably if that address is configured as a Gmail alias or approved Workspace sender.
- If Berkeley does not expose App Passwords, use a personal Gmail account for `GMAIL_USER` and route messages to `shravanjbalaji@berkeley.edu`.

### Intro experience

- The cinematic entry experience lives in `src/components/IntroLanding.jsx`.
- It currently has three scenes:
  - signal / observation
  - modeling / pipeline
  - deployment / system entry
- The intro only shows once per browser session because the seen state is stored in `sessionStorage`.

### Content source

- Resume-backed content is centralized in `src/data/resumeData.js`.
- If the resume changes, that file is the first place to update:
  - hero copy
  - skills
  - experience
  - projects
  - achievements

## Good future improvements

- Add project screenshots, demos, or lightweight media previews.
- Add a resume download button in the hero and footer.
- Add a real analytics layer for portfolio visits and contact submissions.
- Persist contact submissions to a datastore or admin inbox log.
- Tighten the mobile spacing and visual rhythm on the landing intro.
- Add a stronger “selected ML work” case-study section with one featured project expanded.
- Add dark-glass polish to the contact form success state.
- Add deployment configuration files for Render or Railway.
- Add automated health checks for the mail API.

## Useful prompts for later

- “Wire the final Gmail credentials into the contact backend and verify a real email delivery.”
- “Deploy this portfolio to Render and configure the environment variables.”
- “Make the landing intro feel even more Apple-like and more minimal-luxury.”
- “Turn one of the research or ML projects into a full case study section with visuals.”
- “Add screenshots or polished mock cards for each project.”
- “Add a downloadable resume button and a sticky CTA in the nav.”
- “Improve the mobile layout and spacing across the hero and intro.”
- “Add a submission log or simple database for contact form messages.”
- “Push the current backend/contact-form changes to GitHub.”
- “Review the whole portfolio like a senior recruiter and suggest content improvements.”

## Repo note

- `.env` is intentionally git-ignored.
- Current backend/contact-form changes are local until they are committed and pushed.
