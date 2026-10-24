/**
 * HARLES LAB EQUIPMENT — PRODUCT CATALOGUE
 * Handles search, filtering, and grid rendering on products.html
 */

let activeCategory = 'all';
let searchQuery    = '';

document.addEventListener('DOMContentLoaded', () => {
  // Only run catalogue init if the product grid exists on this page
  if (!document.getElementById('product-grid') && !document.getElementById('category-filters')) return;

  // Show demo notice when configured
  if (window.SITE_CONFIG?.showDemoNotice) {
    const notice = document.getElementById('demo-notice');
    if (notice) notice.classList.remove('hidden');
  }

  buildCategoryFilters();
  applyURLFilters();
  renderProducts();

  // Search input
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(e => {
      searchQuery = e.target.value.trim();
      renderProducts();
    }, 200));

    // Prefill from URL param
    const urlQuery = getQueryParam('q');
    if (urlQuery) {
      searchInput.value = urlQuery;
      searchQuery = urlQuery;
    }
  }

  // Clear filters button
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery    = '';
      const searchInput = document.getElementById('product-search');
      if (searchInput) searchInput.value = '';
      buildCategoryFilters();
      renderProducts();
    });
  }
});

// ─── Category Filters ─────────────────────────────
function buildCategoryFilters() {
  const container = document.getElementById('category-filters');
  if (!container) return;

  const publishedCats = getPublishedCategories();

  const chips = ['all', ...publishedCats].map(cat => {
    const label = cat === 'all' ? 'All Equipment' : (CATEGORIES[cat]?.label || cat);
    const isActive = activeCategory === cat;
    return `
      <button data-cat="${cat}"
        class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border
               transition-colors duration-150 cursor-pointer
               ${isActive
                 ? 'border-teal-500 text-teal-700 bg-teal-50'
                 : 'border-gray-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-gray-300'}"
        aria-pressed="${isActive}">
        ${escapeHTML(label)}
      </button>`;
  }).join('');

  container.innerHTML = chips;

  container.querySelectorAll('button[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      buildCategoryFilters();
      renderProducts();
    });
  });
}

// ─── Apply URL filters on page load ──────────────
function applyURLFilters() {
  const cat = getQueryParam('cat');
  if (cat && CATEGORIES[cat]) {
    activeCategory = cat;
  }
}

// ─── Render Products ─────────────────────────────
function renderProducts() {
  const grid     = document.getElementById('product-grid');
  const empty    = document.getElementById('empty-state');
  const countEl  = document.getElementById('product-count');
  if (!grid) return;

  let products = searchQuery ? searchProducts(searchQuery) : getPublishedProducts();

  if (activeCategory !== 'all') {
    products = products.filter(p => p.category === activeCategory);
  }

  // Update count
  if (countEl) {
    countEl.textContent = products.length
      ? `${products.length} product${products.length !== 1 ? 's' : ''}`
      : '';
  }

  if (products.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }

  if (empty) empty.classList.add('hidden');

  grid.innerHTML = products.map(p => buildCatalogueCard(p)).join('');
}

// ─── Product Card ─────────────────────────────────
function buildCatalogueCard(product) {
  const imgSrc   = getProductImagePath(product.image);
  const catLabel = CATEGORIES[product.category]?.label || product.category;

  return `
    <article class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">

      <!-- Image -->
      <a href="/product.html?slug=${encodeURIComponent(product.slug)}"
         class="block aspect-[4/3] bg-slate-50 overflow-hidden" tabindex="-1" aria-hidden="true">
        <img src="${imgSrc}"
             alt=""
             class="w-full h-full object-contain p-4"
             width="400" height="300"
             loading="lazy"
             onerror="this.src='/assets/images/placeholder-product.svg'">
      </a>

      <!-- Body -->
      <div class="p-5 flex flex-col flex-1 gap-3">
        <div class="flex items-start justify-between gap-2 flex-wrap">
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700">
            ${escapeHTML(catLabel)}
          </span>
          ${product.manufacturer ? `<span class="text-xs text-slate-400">${escapeHTML(product.manufacturer)}</span>` : ''}
        </div>

        <div class="flex-1">
          <h2 class="text-sm font-semibold text-navy-500 leading-snug">
            <a href="/product.html?slug=${encodeURIComponent(product.slug)}"
               class="hover:text-teal-600 transition-colors">
              ${escapeHTML(product.name)}
            </a>
          </h2>
          ${product.model ? `<p class="text-xs text-slate-400 mt-0.5">Model: ${escapeHTML(product.model)}</p>` : ''}
          <p class="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">${escapeHTML(product.shortDesc)}</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 pt-2 border-t border-gray-50">
          <a href="/contact.html?product=${encodeURIComponent(product.name)}#quote"
             class="flex-1 text-center text-xs font-semibold text-white bg-teal-500 hover:bg-teal-600 py-2 rounded-md transition-colors">
            Request Quote
          </a>
          <a href="/product.html?slug=${encodeURIComponent(product.slug)}"
             class="flex-1 text-center text-xs font-semibold text-navy-500 border border-gray-200 hover:bg-slate-50 py-2 rounded-md transition-colors">
            Details
          </a>
          <button
            data-product-name="${escapeHTML(product.name)}"
            data-product-slug="${escapeHTML(product.slug)}"
            onclick="openTelegramEnquiry(this.dataset.productName, this.dataset.productSlug)"
            aria-label="Enquire about ${escapeHTML(product.name)} on Telegram"
            class="w-8 h-8 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 flex items-center justify-center text-blue-500 transition-colors flex-shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
            </svg>
          </button>
        </div>
      </div>
    </article>`;
}

// ─── Telegram Enquiry Modal ───────────────────────
function openTelegramEnquiry(productName, productSlug) {
  // Remove existing modal
  document.getElementById('telegram-modal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'telegram-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'tg-modal-title');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50';

  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
      <div class="flex items-center justify-between p-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
            </svg>
          </div>
          <h2 id="tg-modal-title" class="font-semibold text-navy-500 text-sm">Telegram Enquiry</h2>
        </div>
        <button id="tg-modal-close" aria-label="Close"
          class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="p-6">
        <p class="text-xs text-slate-500 mb-4">Product: <strong class="text-navy-500">${escapeHTML(productName)}</strong></p>

        <form id="telegram-form" novalidate class="space-y-4">
          <div>
            <label for="tg-name" class="block text-xs font-medium text-slate-700 mb-1">Your name <span aria-label="required">*</span></label>
            <input type="text" id="tg-name" name="name" required autocomplete="name"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              placeholder="Full name">
          </div>
          <div>
            <label for="tg-org" class="block text-xs font-medium text-slate-700 mb-1">Organisation</label>
            <input type="text" id="tg-org" name="organisation" autocomplete="organization"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              placeholder="Hospital, laboratory, or institution">
          </div>
          <div>
            <label for="tg-email" class="block text-xs font-medium text-slate-700 mb-1">Work email <span aria-label="required">*</span></label>
            <input type="email" id="tg-email" name="email" required autocomplete="email"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              placeholder="you@organisation.com">
          </div>
          <div>
            <label for="tg-qty" class="block text-xs font-medium text-slate-700 mb-1">Quantity required</label>
            <input type="number" id="tg-qty" name="quantity" min="1"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              placeholder="1">
          </div>
          <div>
            <label for="tg-msg" class="block text-xs font-medium text-slate-700 mb-1">Additional requirements</label>
            <textarea id="tg-msg" name="message" rows="3"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 resize-none"
              placeholder="Any specific configuration, timeline, or questions…"></textarea>
          </div>

          <!-- Status message -->
          <div id="tg-status" class="hidden" role="status" aria-live="polite"></div>

          <div class="flex gap-3 pt-2">
            <button type="submit" id="tg-submit"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
              </svg>
              Send Enquiry
            </button>
            <button type="button" id="tg-modal-cancel"
              class="px-4 py-2.5 text-sm font-medium text-slate-600 border border-gray-200 rounded-lg hover:bg-slate-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>`;

  document.body.appendChild(modal);
  document.getElementById('tg-name').focus();

  // Close handlers
  const closeModal = () => {
    modal.remove();
    document.body.style.overflow = '';
  };
  document.getElementById('tg-modal-close').addEventListener('click', closeModal);
  document.getElementById('tg-modal-cancel').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); }
  });

  document.body.style.overflow = 'hidden';

  // Form submit
  document.getElementById('telegram-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitTelegramEnquiry(productName, productSlug);
  });
}

async function submitTelegramEnquiry(productName, productSlug) {
  const form    = document.getElementById('telegram-form');
  const submitBtn = document.getElementById('tg-submit');
  const statusEl  = document.getElementById('tg-status');

  const nameEl  = document.getElementById('tg-name');
  const emailEl = document.getElementById('tg-email');
  const orgEl   = document.getElementById('tg-org');
  const qtyEl   = document.getElementById('tg-qty');
  const msgEl   = document.getElementById('tg-msg');

  // Clear previous errors
  [nameEl, emailEl].forEach(el => {
    el.classList.remove('border-red-400');
    const err = document.getElementById(`${el.id}-err`);
    if (err) err.remove();
  });

  // Validate
  let valid = true;
  if (!nameEl.value.trim()) {
    setFieldError(nameEl, 'Please enter your name');
    valid = false;
  }
  if (!emailEl.value.trim() || !isValidEmail(emailEl.value.trim())) {
    setFieldError(emailEl, 'Please enter a valid email address');
    valid = false;
  }
  if (!valid) return;

  // Submit
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Sending…';
  statusEl.className = 'hidden';

  const payload = {
    productName,
    productSlug,
    name:         nameEl.value.trim(),
    organisation: orgEl.value.trim(),
    email:        emailEl.value.trim(),
    quantity:     qtyEl.value.trim() || null,
    message:      msgEl.value.trim(),
  };

  const endpoint = window.SITE_CONFIG?.telegramApiEndpoint || '/api/telegram-enquiry';

  try {
    const res = await fetch(endpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      statusEl.className = 'flex items-start gap-3 px-4 py-3 rounded-lg bg-green-50 text-green-800 border border-green-200 text-sm';
      statusEl.innerHTML = `<svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg><span>Your enquiry has been sent. We will be in touch shortly.</span>`;
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enquiry Sent ✓';
    } else {
      throw new Error(data.error || 'Request failed');
    }
  } catch (err) {
    statusEl.className = 'flex items-start gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm';
    statusEl.innerHTML = `<svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg><span>Sorry, the enquiry could not be sent. Please try the <a href="/contact.html#quote" class="underline font-semibold">contact form</a> instead.</span>`;
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg> Send Enquiry';
  }
}

function setFieldError(el, msg) {
  el.classList.add('border-red-400');
  const p = document.createElement('p');
  p.id = `${el.id}-err`;
  p.className = 'text-xs text-red-600 mt-1';
  p.textContent = msg;
  el.insertAdjacentElement('afterend', p);
  el.focus();
}
