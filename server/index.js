import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const app = express();
const port = Number(process.env.PORT || 8787);
const emailProvider =
  process.env.EMAIL_PROVIDER || (process.env.GMAIL_USER || process.env.GMAIL_APP_PASSWORD ? 'gmail' : 'smtp');
const gmailUser = process.env.GMAIL_USER || '';
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || '';
const contactToEmail = process.env.CONTACT_TO_EMAIL || 'shravanjbalaji@berkeley.edu';
const contactFromName = process.env.CONTACT_FROM_NAME || 'Shravan Balaji Portfolio';
const contactFromEmail = process.env.CONTACT_FROM_EMAIL || '';
const rateLimitWindowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const rateLimitMax = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);
const requestStore = new Map();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function cleanValue(value) {
  return String(value || '').replace(/\r/g, '').trim();
}

function getClientAddress(request) {
  const forwarded = request.headers['x-forwarded-for'];

  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }

  return request.ip || request.socket.remoteAddress || 'unknown';
}

function isRateLimited(address) {
  const now = Date.now();
  const recentRequests = (requestStore.get(address) || []).filter(
    (timestamp) => now - timestamp < rateLimitWindowMs
  );

  if (recentRequests.length >= rateLimitMax) {
    requestStore.set(address, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestStore.set(address, recentRequests);
  return false;
}

function createTransporter() {
  if (emailProvider === 'gmail') {
    if (!gmailUser || !gmailAppPassword) {
      return null;
    }

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword
      }
    });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === 'true';

  if (!smtpHost || !smtpUser || !smtpPass || !contactFromEmail) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
}

const transporter = createTransporter();
const effectiveFromEmail = emailProvider === 'gmail' ? contactFromEmail || gmailUser : contactFromEmail;
const effectiveFromHeader = effectiveFromEmail ? `"${contactFromName}" <${effectiveFromEmail}>` : '';

if (!transporter) {
  console.warn(
    emailProvider === 'gmail'
      ? 'Contact form mailer is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.'
      : 'Contact form mailer is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_FROM_EMAIL.'
  );
}

if (emailProvider === 'gmail' && contactFromEmail && contactFromEmail !== gmailUser) {
  console.warn(
    'Gmail may rewrite CONTACT_FROM_EMAIL unless that address is configured as a Gmail alias or Workspace sender.'
  );
}

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '32kb' }));

app.post('/api/contact', async (request, response) => {
  const { name, email, organization, message, website } = request.body || {};

  if (cleanValue(website)) {
    return response.status(200).json({ ok: true });
  }

  const cleanName = cleanValue(name);
  const cleanEmail = cleanValue(email).toLowerCase();
  const cleanOrganization = cleanValue(organization);
  const cleanMessage = cleanValue(message);

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return response.status(400).json({
      ok: false,
      message: 'Please provide your name, email, and a message.'
    });
  }

  if (!emailPattern.test(cleanEmail)) {
    return response.status(400).json({
      ok: false,
      message: 'Please enter a valid email address.'
    });
  }

  if (cleanName.length > 120 || cleanOrganization.length > 160 || cleanMessage.length > 4000) {
    return response.status(400).json({
      ok: false,
      message: 'One or more fields are too long.'
    });
  }

  if (!transporter) {
    return response.status(503).json({
      ok: false,
      message:
        emailProvider === 'gmail'
          ? 'The Gmail contact service is not configured yet. Add GMAIL_USER and GMAIL_APP_PASSWORD, or email shravanjbalaji@berkeley.edu directly for now.'
          : 'The contact service is not configured yet. Please email shravanjbalaji@berkeley.edu directly for now.'
    });
  }

  const clientAddress = getClientAddress(request);

  if (isRateLimited(clientAddress)) {
    return response.status(429).json({
      ok: false,
      message: 'Too many contact attempts right now. Please try again in a few minutes.'
    });
  }

  const textBody = [
    'New portfolio inquiry',
    '',
    `Name: ${cleanName}`,
    `Email: ${cleanEmail}`,
    `Organization: ${cleanOrganization || 'Not provided'}`,
    `IP: ${clientAddress}`,
    '',
    cleanMessage
  ].join('\n');

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="margin-bottom: 16px;">New portfolio inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Organization:</strong> ${escapeHtml(cleanOrganization || 'Not provided')}</p>
      <p><strong>IP:</strong> ${escapeHtml(clientAddress)}</p>
      <hr style="margin: 24px 0; border: 0; border-top: 1px solid #cbd5e1;" />
      <p style="white-space: pre-wrap;">${escapeHtml(cleanMessage)}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      to: contactToEmail,
      from: effectiveFromHeader,
      replyTo: `"${cleanName.replaceAll('"', "'")}" <${cleanEmail}>`,
      subject: `Portfolio inquiry from ${cleanName}`,
      text: textBody,
      html: htmlBody
    });

    return response.status(200).json({
      ok: true,
      message: `Message sent successfully to ${contactToEmail}.`
    });
  } catch (error) {
    console.error('Failed to send contact email.', error);

    return response.status(500).json({
      ok: false,
      message: 'Something went wrong while sending the message. Please try again or email directly.'
    });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir));

  app.get('*', (_request, response) => {
    response.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Contact server listening on http://localhost:${port}`);
});
