/**
 * HARLES LAB EQUIPMENT — CONTACT PAGE SCRIPTS
 * Handles form validation, Formspree submission, and sidebar rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderContactInfo();
  prefillProductFromURL();
  initEnquiryForm();
  initConsultationButton();
  scrollToAnchorIfNeeded();
});

// ─── Render contact info from config ─────────────
function renderContactInfo() {
  const container = document.getElementById('contact-info-display');
  const config    = window.SITE_CONFIG || {};
  if (!container) return;

  const rows = [];

  if (config.email) {
    rows.push(`
      <div class="flex items-start gap-3">
        <svg class="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <a href="mailto:${escapeHTML(config.email)}" class="text-teal-600 hover:underline">${escapeHTML(config.email)}</a>
      </div>`);
  } else {
    rows.push(`<div class="flex items-start gap-3 text-slate-400 italic">
      <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      <span class="text-xs">Email address — contact us via the form</span>
    </div>`);
  }

  if (config.phone) {
    rows.push(`
      <div class="flex items-start gap-3">
        <svg class="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
        <a href="tel:${config.phone.replace(/\s/g, '')}" class="text-teal-600 hover:underline">${escapeHTML(config.phone)}</a>
      </div>`);
  }

  if (config.address) {
    const addrEl = document.getElementById('sidebar-address');
    if (addrEl) addrEl.textContent = config.address;
    rows.push(`
      <div class="flex items-start gap-3">
        <svg class="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span class="text-slate-600">${escapeHTML(config.address)}</span>
      </div>`);
  }

  if (rows.length === 0) {
    rows.push('<p class="text-sm text-slate-400 italic">Contact details will be added shortly. Please use the form to reach us.</p>');
  }

  container.innerHTML = rows.join('');
}

// ─── Prefill product from URL ─────────────────────
function prefillProductFromURL() {
  const product = getQueryParam('product');
  if (product) {
    const field = document.getElementById('field-product');
    if (field) field.value = decodeURIComponent(product);
    const typeField = document.getElementById('field-type');
    if (typeField) typeField.value = 'quote';
  }
}

// ─── Scroll to anchor on load ─────────────────────
function scrollToAnchorIfNeeded() {
  const hash = window.location.hash;
  if (!hash) return;
  setTimeout(() => {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300);
}

// ─── Enquiry Form ─────────────────────────────────
let formSubmitting = false;

function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();

  if (formSubmitting) return;

  const form      = e.target;
  const submitBtn = document.getElementById('form-submit');
  const successEl = document.getElementById('form-success');
  const errorEl   = document.getElementById('form-error-banner');
  const errorDetail = document.getElementById('form-error-detail');

  // Hide previous alerts
  successEl?.classList.add('hidden');
  errorEl?.classList.add('hidden');
  clearAllFormErrors(form);

  // ── Validate ──
  const fields = {
    name:     document.getElementById('field-name'),
    email:    document.getElementById('field-email'),
    type:     document.getElementById('field-type'),
    message:  document.getElementById('field-message'),
    consent:  document.getElementById('field-consent'),
  };

  let valid = true;
  let firstError = null;

  if (!fields.name.value.trim()) {
    showFormFieldError(fields.name, 'Please enter your full name');
    valid = false;
    firstError = firstError || fields.name;
  }

  if (!fields.email.value.trim()) {
    showFormFieldError(fields.email, 'Please enter your email address');
    valid = false;
    firstError = firstError || fields.email;
  } else if (!isValidEmail(fields.email.value.trim())) {
    showFormFieldError(fields.email, 'Please enter a valid email address');
    valid = false;
    firstError = firstError || fields.email;
  }

  if (!fields.type.value) {
    showFormFieldError(fields.type, 'Please select an enquiry type');
    valid = false;
    firstError = firstError || fields.type;
  }

  if (!fields.message.value.trim()) {
    showFormFieldError(fields.message, 'Please describe your requirements or enquiry');
    valid = false;
    firstError = firstError || fields.message;
  } else if (fields.message.value.trim().length < 10) {
    showFormFieldError(fields.message, 'Please provide a little more detail (at least 10 characters)');
    valid = false;
    firstError = firstError || fields.message;
  }

  if (!fields.consent.checked) {
    showFormFieldError(fields.consent, 'Please confirm you agree to our privacy notice');
    valid = false;
    firstError = firstError || fields.consent;
  }

  if (!valid) {
    firstError?.focus();
    return;
  }

  // ── Check Formspree is configured ──
  const endpoint = window.SITE_CONFIG?.formspreeEndpoint;
  if (!endpoint) {
    if (errorDetail) errorDetail.textContent =
      'The contact form is not yet configured. Please email us directly or use the Telegram enquiry option.';
    errorEl?.classList.remove('hidden');
    errorEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  // ── Submit ──
  formSubmitting = true;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>Sending…';

  const formData = new FormData(form);

  try {
    const res = await fetch(endpoint, {
      method:  'POST',
      body:    formData,
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      form.reset();
      successEl?.classList.remove('hidden');
      successEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      const data = await res.json().catch(() => ({}));
      const msg = data?.errors?.map(e => e.message).join(', ') || 'Submission failed. Please try again.';
      if (errorDetail) errorDetail.textContent = msg;
      errorEl?.classList.remove('hidden');
      errorEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } catch (err) {
    if (errorDetail) errorDetail.textContent =
      'The form could not be submitted — please check your connection and try again, or contact us via email or Telegram.';
    errorEl?.classList.remove('hidden');
    errorEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } finally {
    formSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Submit Enquiry';
  }
}

// ─── Field error helpers ──────────────────────────
function showFormFieldError(el, msg) {
  el.classList.add('error');
  el.setAttribute('aria-invalid', 'true');
  el.setAttribute('aria-describedby', `${el.id}-err`);
  const p = document.createElement('p');
  p.className = 'field-error';
  p.id = `${el.id}-err`;
  p.setAttribute('role', 'alert');
  p.innerHTML = `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg><span>${escapeHTML(msg)}</span>`;
  el.insertAdjacentElement('afterend', p);
}

function clearAllFormErrors(form) {
  form.querySelectorAll('.error').forEach(el => {
    el.classList.remove('error');
    el.removeAttribute('aria-invalid');
    el.removeAttribute('aria-describedby');
  });
  form.querySelectorAll('.field-error').forEach(el => el.remove());
}

// ─── Consultation button ──────────────────────────
function initConsultationButton() {
  const btn = document.getElementById('contact-consult-btn');
  if (!btn) return;
  btn.addEventListener('click', () => openCalendly(window.SITE_CONFIG?.calendlyUrl));
}
