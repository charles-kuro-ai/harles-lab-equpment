/**
 * HARLES LAB EQUIPMENT — SHARED UTILITIES
 * Utility functions used across all pages.
 */

// ─── DOM Helpers ─────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Safely set text content (never innerHTML with user data) */
function setText(el, text) {
  if (el) el.textContent = text;
}

/** Show/hide element with display toggle */
function show(el) { if (el) el.classList.remove('hidden'); }
function hide(el) { if (el) el.classList.add('hidden'); }
function toggle(el, condition) {
  if (el) el.classList.toggle('hidden', !condition);
}

// ─── Mobile Navigation ───────────────────────────────
function initMobileNav() {
  const menuBtn   = $('#mobile-menu-btn');
  const overlay   = $('#mobile-nav-overlay');
  const panel     = $('#mobile-nav-panel');
  const closeBtn  = $('#mobile-nav-close');
  const navLinks  = $$('#mobile-nav-panel a');

  if (!menuBtn || !overlay || !panel) return;

  function openNav() {
    overlay.classList.add('open');
    panel.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeNav() {
    overlay.classList.remove('open');
    panel.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuBtn?.focus();
  }

  menuBtn.addEventListener('click', openNav);
  overlay.addEventListener('click', closeNav);
  closeBtn?.addEventListener('click', closeNav);
  navLinks.forEach(link => link.addEventListener('click', closeNav));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeNav();
  });
}

// ─── Active Nav Highlighting ─────────────────────────
function initActiveNav() {
  const current = window.location.pathname.replace(/\/$/, '') || '/index.html';
  $$('a[data-nav]').forEach(link => {
    const href = link.getAttribute('href')?.replace(/\/$/, '');
    const isActive =
      href === current ||
      (href === '/index.html' && (current === '' || current === '/')) ||
      (href !== '/index.html' && current.includes(href));
    if (isActive) {
      link.classList.add('nav-link-active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// ─── FAQ Accordions ──────────────────────────────────
function initFAQs() {
  $$('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item    = trigger.closest('.faq-item');
      const answer  = item?.querySelector('.faq-answer');
      const icon    = trigger.querySelector('.faq-icon');
      const isOpen  = answer?.classList.contains('open');

      // Close all others
      $$('.faq-answer.open').forEach(a => a.classList.remove('open'));
      $$('.faq-icon.open').forEach(i => i.classList.remove('open'));
      $$('.faq-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        answer?.classList.add('open');
        icon?.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    trigger.setAttribute('aria-expanded', 'false');
  });
}

// ─── Back to Top ─────────────────────────────────────
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Current Year in Footer ───────────────────────────
function initCopyrightYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ─── Calendly Navigation ─────────────────────────────
function openCalendly(url) {
  if (!url) {
    showToast('Consultation booking will be available shortly. Please contact us directly.', 'info');
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ─── Toast / Status Messages ─────────────────────────
function showToast(message, type = 'info') {
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();

  const colors = {
    info:    'bg-navy-500 text-white',
    success: 'bg-green-700 text-white',
    error:   'bg-red-700 text-white',
  };

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-lg text-sm font-medium
    shadow-lg z-50 max-w-sm text-center transition-opacity duration-300 ${colors[type] || colors.info}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ─── Form Helpers ─────────────────────────────────────

/** Show field-level error */
function showFieldError(fieldEl, message) {
  clearFieldError(fieldEl);
  fieldEl.classList.add('form-input-error');
  const errorEl = document.createElement('p');
  errorEl.className = 'form-error';
  errorEl.id = `${fieldEl.id}-error`;
  errorEl.innerHTML = `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
  </svg><span>${escapeHTML(message)}</span>`;
  fieldEl.setAttribute('aria-describedby', `${fieldEl.id}-error`);
  fieldEl.insertAdjacentElement('afterend', errorEl);
}

function clearFieldError(fieldEl) {
  fieldEl.classList.remove('form-input-error');
  const existing = document.getElementById(`${fieldEl.id}-error`);
  if (existing) existing.remove();
}

function clearAllErrors(form) {
  form.querySelectorAll('.form-input-error').forEach(el => el.classList.remove('form-input-error'));
  form.querySelectorAll('.form-error').forEach(el => el.remove());
}

/** Validate email format */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Prevent XSS in user-generated content */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/** Format a product enquiry for Telegram (called client-side for UI preview) */
function formatEnquiryPreview(data) {
  return [
    `Product: ${data.productName || 'N/A'}`,
    `From: ${data.name} (${data.organisation || 'N/A'})`,
    `Contact: ${data.email}`,
    data.quantity ? `Quantity: ${data.quantity}` : null,
    data.message ? `Message: ${data.message}` : null,
  ].filter(Boolean).join('\n');
}

// ─── URL Utilities ───────────────────────────────────
function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ─── Debounce ─────────────────────────────────────────
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ─── Init shared site behaviors ──────────────────────
function initSite() {
  initMobileNav();
  initActiveNav();
  initFAQs();
  initBackToTop();
  initCopyrightYear();
}

document.addEventListener('DOMContentLoaded', initSite);
