/**
 * HARLES LAB EQUIPMENT — PUBLIC SITE CONFIGURATION
 * ==================================================
 * This file contains public-facing configuration values only.
 * Do NOT put private API keys, bot tokens, or secrets here.
 *
 * HOW TO UPDATE:
 * - Replace placeholder values with real values before going live.
 * - Items marked [REQUIRED] must be configured before launch.
 * - Items marked [OPTIONAL] can be omitted if the feature is not used.
 *
 * SECRETS (Telegram bot token, etc.) must be set as environment
 * variables in Vercel — never in this file. See README.md.
 */

const SITE_CONFIG = {

  // ─── Business Identity ───────────────────────────────
  businessName: 'Harles Lab Equipment',
  tagline: 'Reliable Laboratory Equipment. Expert Support.',
  location: 'Port Harcourt, Rivers State, Nigeria',

  // ─── Contact Details [REQUIRED — enter real values] ──
  // Replace null values with actual verified contact information.
  email: null,           // e.g. 'info@harleslabequipment.com'
  phone: null,           // e.g. '+234 XXX XXX XXXX'
  whatsapp: null,        // e.g. '+234XXXXXXXXXX' (digits only, no spaces)
  address: null,         // e.g. '123 Ada George Road, Port Harcourt, Rivers State'

  // ─── Social Media [OPTIONAL] ─────────────────────────
  // Only include verified, active accounts.
  social: {
    linkedin: null,      // e.g. 'https://linkedin.com/company/harles-lab'
    twitter: null,
    facebook: null,
    instagram: null,
  },

  // ─── Formspree [REQUIRED for contact form] ───────────
  // 1. Go to https://formspree.io and create a free account.
  // 2. Create a new form and copy the endpoint URL.
  // 3. Paste it below (it looks like https://formspree.io/f/XXXXXXXX).
  formspreeEndpoint: null, // e.g. 'https://formspree.io/f/xpwdabcd'

  // ─── Calendly [REQUIRED for consultation booking] ────
  // 1. Create a Calendly account at https://calendly.com.
  // 2. Set up an event type for laboratory equipment consultations.
  // 3. Copy your scheduling link and paste it below.
  calendlyUrl: null,    // e.g. 'https://calendly.com/harleslab/consultation'

  // ─── Telegram Enquiry API [REQUIRED for Telegram feature] ─
  // The bot token and chat ID are stored server-side in Vercel.
  // This is the URL of your Vercel serverless function endpoint.
  // It is automatically set correctly when deployed to Vercel.
  // Change only if you rename the function file.
  telegramApiEndpoint: '/api/telegram-enquiry',

  // ─── Open Graph / Social Sharing ─────────────────────
  // Used for link previews on social media and messaging apps.
  siteUrl: null,         // e.g. 'https://www.harleslabequipment.com'
  ogImage: '/assets/images/og-image.jpg', // 1200×630px image

  // ─── Internal Flags ───────────────────────────────────
  // Set to false once real product data has been added
  showDemoNotice: true,
};

// Make available globally
window.SITE_CONFIG = SITE_CONFIG;
