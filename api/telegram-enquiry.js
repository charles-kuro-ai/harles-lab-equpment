/**
 * HARLES LAB EQUIPMENT — TELEGRAM ENQUIRY SERVERLESS FUNCTION
 * ============================================================
 * Route:   POST /api/telegram-enquiry
 * Runtime: Vercel Serverless (Node.js)
 *
 * This function receives product enquiry data from the browser,
 * validates it, and forwards it as a Telegram message to the
 * configured recipient chat.
 *
 * SECURITY:
 * - The Telegram bot token NEVER appears in the browser or frontend.
 * - Credentials are read from Vercel environment variables only.
 * - User-supplied text is escaped before inclusion in the Telegram message.
 * - Request size, field lengths, and Content-Type are all validated.
 *
 * ENVIRONMENT VARIABLES (set in Vercel Dashboard → Project → Settings → Environment Variables):
 *   TELEGRAM_BOT_TOKEN   — The token from @BotFather (e.g. 123456789:ABCdef...)
 *   TELEGRAM_CHAT_ID     — The numeric chat ID of the recipient (e.g. -1001234567890)
 *
 * See README.md for full setup instructions.
 */

// ─── Constants ────────────────────────────────────
const MAX_BODY_BYTES    = 8192;          // 8 KB request limit
const TELEGRAM_API_BASE = 'https://api.telegram.org';
const TIMEOUT_MS        = 10_000;        // 10 s timeout for Telegram API calls
const ALLOWED_ORIGINS   = [
  'https://www.harleslabequipment.com',
  'https://harleslabequipment.com',
  // Add your Vercel preview domain here during development if needed:
  // 'https://harles-lab-XXXXX.vercel.app',
];

// Field length limits
const LIMITS = {
  productName:  200,
  productSlug:  200,
  name:         120,
  organisation: 200,
  email:        254,
  quantity:     20,
  message:      2000,
};

// ─── Main Handler ─────────────────────────────────
export default async function handler(req, res) {
  // ── CORS / Origin check ──
  // This is a supplementary measure; the bot token server-side is the real protection.
  const origin = req.headers['origin'] || '';
  const isDev  = process.env.NODE_ENV === 'development';

  if (!isDev && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ success: false, error: 'Forbidden' });
  }

  // Add CORS headers for allowed origins
  if (ALLOWED_ORIGINS.includes(origin) || isDev) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  // ── Preflight ──
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // ── Method check ──
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // ── Content-Type check ──
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return res.status(415).json({ success: false, error: 'Content-Type must be application/json' });
  }

  // ── Read and size-limit body ──
  let body;
  try {
    body = await readBodyWithLimit(req, MAX_BODY_BYTES);
  } catch (err) {
    return res.status(413).json({ success: false, error: 'Request too large' });
  }

  // ── Parse JSON ──
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return res.status(400).json({ success: false, error: 'Invalid JSON' });
  }

  // ── Validate fields ──
  const validation = validatePayload(payload);
  if (!validation.valid) {
    return res.status(400).json({ success: false, error: validation.error });
  }

  // ── Check credentials are configured ──
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId   = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    // Log on server; never expose to client
    console.error('[telegram-enquiry] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables');
    return res.status(503).json({
      success: false,
      error:   'Enquiry service is not configured. Please contact us directly.',
    });
  }

  // ── Format Telegram message ──
  const message = formatMessage(payload);

  // ── Send to Telegram ──
  try {
    const telegramRes = await sendTelegramMessage(botToken, chatId, message);
    if (!telegramRes.ok) {
      console.error('[telegram-enquiry] Telegram API error:', telegramRes.description);
      return res.status(502).json({
        success: false,
        error:   'Could not deliver the enquiry. Please try the contact form instead.',
      });
    }
  } catch (err) {
    console.error('[telegram-enquiry] Network error:', err.message);
    return res.status(502).json({
      success: false,
      error:   'Could not reach the enquiry service. Please try the contact form.',
    });
  }

  return res.status(200).json({ success: true });
}

// ─── Validate Payload ─────────────────────────────
function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Invalid request payload' };
  }

  const { name, email, productName } = payload;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return { valid: false, error: 'Name is required' };
  }
  if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
    return { valid: false, error: 'A valid email address is required' };
  }
  if (!productName || typeof productName !== 'string' || !productName.trim()) {
    return { valid: false, error: 'Product name is required' };
  }

  // Length checks
  for (const [field, limit] of Object.entries(LIMITS)) {
    const value = payload[field];
    if (value && typeof value === 'string' && value.length > limit) {
      return { valid: false, error: `Field '${field}' exceeds maximum length` };
    }
  }

  return { valid: true };
}

// ─── Format Telegram Message ──────────────────────
// Uses MarkdownV2 escaping for Telegram. All user input is escaped.
function formatMessage(payload) {
  const {
    productName,
    productSlug,
    name,
    organisation,
    email,
    quantity,
    message,
  } = payload;

  const lines = [
    `📋 *New Product Enquiry — Harles Lab Equipment*`,
    ``,
    `*Product:* ${escapeMd(productName)}`,
    productSlug ? `*Product ID:* ${escapeMd(productSlug)}` : null,
    ``,
    `*From:* ${escapeMd(name)}`,
    organisation ? `*Organisation:* ${escapeMd(organisation)}` : null,
    `*Email:* ${escapeMd(email)}`,
    quantity    ? `*Quantity:* ${escapeMd(String(quantity))}` : null,
    ``,
    message ? `*Message:*\n${escapeMd(message)}` : null,
    ``,
    `_Submitted via the Harles Lab Equipment website_`,
  ];

  return lines.filter(l => l !== null).join('\n');
}

// ─── Telegram MarkdownV2 Escape ───────────────────
// Escape special chars required by Telegram MarkdownV2
function escapeMd(text) {
  return String(text).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, c => `\\${c}`);
}

// ─── Send Telegram Message ────────────────────────
async function sendTelegramMessage(botToken, chatId, text) {
  const url = `${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`;

  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        chat_id:    chatId,
        text,
        parse_mode: 'MarkdownV2',
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// ─── Read body with size limit ────────────────────
function readBodyWithLimit(req, maxBytes) {
  return new Promise((resolve, reject) => {
    let data  = '';
    let bytes = 0;

    req.on('data', chunk => {
      bytes += chunk.length;
      if (bytes > maxBytes) {
        reject(new Error('Body too large'));
        req.destroy();
        return;
      }
      data += chunk.toString();
    });

    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

// ─── Email validation (server-side) ──────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}
