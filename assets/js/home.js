/**
 * HARLES LAB EQUIPMENT — HOME PAGE SCRIPTS
 */

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  initConsultationButton();
  initTelegramButton();
});

// ─── Featured Products ────────────────────────────
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products-grid');
  const empty = document.getElementById('no-featured-products');
  if (!grid) return;

  const featured = getFeaturedProducts();

  if (featured.length === 0) {
    grid.classList.add('hidden');
    if (empty) empty.classList.remove('hidden');
    return;
  }

  grid.innerHTML = featured.slice(0, 3).map(product => buildProductCard(product)).join('');
}

function buildProductCard(product) {
  const imgSrc  = getProductImagePath(product.image);
  const catLabel = CATEGORIES[product.category]?.label || product.category;

  return `
    <article class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
      <a href="/product.html?slug=${encodeURIComponent(product.slug)}"
         class="block aspect-[4/3] bg-slate-50 overflow-hidden" tabindex="-1" aria-hidden="true">
        <img src="${imgSrc}"
             alt=""
             class="w-full h-full object-contain p-4"
             width="400" height="300"
             loading="lazy"
             onerror="this.src='/assets/images/placeholder-product.svg'">
      </a>
      <div class="p-5 flex flex-col flex-1 gap-3">
        <div class="flex items-start justify-between gap-2">
          <span class="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700">
            ${escapeHTML(catLabel)}
          </span>
          ${product.manufacturer ? `<span class="text-xs text-slate-400 font-medium">${escapeHTML(product.manufacturer)}</span>` : ''}
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-navy-500 leading-snug">
            <a href="/product.html?slug=${encodeURIComponent(product.slug)}"
               class="hover:text-teal-600 transition-colors">
              ${escapeHTML(product.name)}
            </a>
          </h3>
          ${product.model ? `<p class="text-xs text-slate-400 mt-0.5">Model: ${escapeHTML(product.model)}</p>` : ''}
          <p class="text-sm text-slate-600 mt-2 leading-relaxed">${escapeHTML(product.shortDesc)}</p>
        </div>
        <div class="flex gap-2 pt-2 border-t border-gray-50">
          <a href="/contact.html?product=${encodeURIComponent(product.name)}#quote"
             class="flex-1 text-center text-xs font-semibold text-white bg-teal-500 hover:bg-teal-600 py-2 rounded-md transition-colors">
            Request Quote
          </a>
          <a href="/product.html?slug=${encodeURIComponent(product.slug)}"
             class="flex-1 text-center text-xs font-semibold text-navy-500 border border-gray-200 hover:bg-slate-50 py-2 rounded-md transition-colors">
            View Details
          </a>
        </div>
      </div>
    </article>`;
}

// ─── Consultation Button ──────────────────────────
function initConsultationButton() {
  const btn = document.getElementById('book-consultation-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const url = window.SITE_CONFIG?.calendlyUrl;
    openCalendly(url);
  });
}

// ─── Telegram Button ─────────────────────────────
function initTelegramButton() {
  const btn = document.getElementById('home-telegram-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    // Open a simple enquiry modal or redirect to contact page with Telegram section
    window.location.href = '/contact.html#telegram';
  });
}
