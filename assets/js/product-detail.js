/**
 * HARLES LAB EQUIPMENT — PRODUCT DETAIL PAGE
 */

document.addEventListener('DOMContentLoaded', () => {
  const slug = getQueryParam('slug');

  if (!slug) {
    showNotFound();
    return;
  }

  // Basic slug validation — letters, numbers, hyphens only
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    showNotFound();
    return;
  }

  const product = getProductBySlug(slug);

  if (!product) {
    showNotFound();
    return;
  }

  renderProduct(product);
});

// ─── Show Not Found ───────────────────────────────
function showNotFound() {
  document.getElementById('product-loading')?.classList.add('hidden');
  document.getElementById('product-not-found')?.classList.remove('hidden');
}

// ─── Render Product ───────────────────────────────
function renderProduct(product) {
  document.getElementById('product-loading')?.classList.add('hidden');
  const container = document.getElementById('product-detail');
  if (!container) return;

  // Update page meta
  const titleEl = document.getElementById('page-title');
  const descEl  = document.getElementById('page-description');
  if (titleEl) titleEl.textContent = `${product.name} — Harles Lab Equipment`;
  if (descEl)  descEl.content = product.shortDesc + ' — Harles Lab Equipment, Port Harcourt, Nigeria.';

  const catLabel = CATEGORIES[product.category]?.label || product.category;
  const imgSrc   = getProductImagePath(product.image);

  const related = getRelatedProducts(product.slug, 3);

  container.innerHTML = `
    <!-- Breadcrumb -->
    <div class="bg-slate-50 border-b border-gray-100">
      <div class="container-xl py-3">
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
            <li><a href="/index.html" class="hover:text-navy-500 transition-colors">Home</a></li>
            <li aria-hidden="true"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></li>
            <li><a href="/products.html" class="hover:text-navy-500 transition-colors">Products</a></li>
            <li aria-hidden="true"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></li>
            <li><a href="/products.html?cat=${encodeURIComponent(product.category)}" class="hover:text-navy-500 transition-colors">${escapeHTML(catLabel)}</a></li>
            <li aria-hidden="true"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></li>
            <li class="text-slate-600 font-medium truncate max-w-[200px]" aria-current="page">${escapeHTML(product.name)}</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Product Main Section -->
    <section class="container-xl py-10 lg:py-14">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        <!-- Image -->
        <div class="sticky top-24">
          <div class="bg-slate-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-8">
            <img id="main-product-img"
                 src="${imgSrc}"
                 alt="${escapeHTML(product.name)}"
                 class="w-full h-full object-contain max-h-80"
                 width="500" height="500"
                 onerror="this.src='/assets/images/placeholder-product.svg'">
          </div>

          ${product.gallery && product.gallery.length > 0 ? `
          <div class="flex gap-3 mt-4">
            ${product.gallery.map((img, i) => `
              <button onclick="switchImage('/assets/images/products/${escapeHTML(img)}')"
                class="w-16 h-16 rounded-lg overflow-hidden bg-slate-50 border-2 border-gray-100 hover:border-teal-400 transition-colors flex items-center justify-center p-1"
                aria-label="View image ${i + 2}">
                <img src="/assets/images/products/${escapeHTML(img)}" alt="" class="w-full h-full object-contain" loading="lazy">
              </button>`).join('')}
          </div>` : ''}
        </div>

        <!-- Info Panel -->
        <div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700">${escapeHTML(catLabel)}</span>
            ${product.manufacturer ? `<span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">${escapeHTML(product.manufacturer)}</span>` : ''}
          </div>

          <h1 class="text-2xl md:text-3xl font-bold text-navy-500 leading-tight">${escapeHTML(product.name)}</h1>
          ${product.model ? `<p class="text-sm text-slate-400 mt-1">Model: <span class="font-medium text-slate-600">${escapeHTML(product.model)}</span></p>` : ''}

          <p class="mt-5 text-slate-600 leading-relaxed">${escapeHTML(product.shortDesc)}</p>

          ${product.description ? `
          <div class="mt-4 text-sm text-slate-600 leading-relaxed space-y-3 prose-sm">
            ${product.description.split('\n\n').map(para =>
              para.trim() ? `<p>${escapeHTML(para.trim())}</p>` : ''
            ).join('')}
          </div>` : ''}

          <!-- Applications -->
          ${product.applications && product.applications.length > 0 ? `
          <div class="mt-6">
            <h2 class="text-sm font-semibold text-navy-500 mb-3">Applications</h2>
            <ul class="space-y-1.5">
              ${product.applications.map(app => `
                <li class="flex items-center gap-2 text-sm text-slate-600">
                  <svg class="w-4 h-4 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  ${escapeHTML(app)}
                </li>`).join('')}
            </ul>
          </div>` : ''}

          <!-- Enquiry actions -->
          <div class="mt-8 pt-6 border-t border-gray-100 space-y-3">
            <a href="/contact.html?product=${encodeURIComponent(product.name)}#quote"
               class="flex items-center justify-center gap-2 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Request a Quote
            </a>
            <button onclick="openTelegramFromDetail()"
              class="flex items-center justify-center gap-2 w-full border border-gray-200 text-navy-500 hover:bg-slate-50 font-semibold py-3 rounded-lg transition-colors text-sm">
              <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
              </svg>
              Enquire on Telegram
            </button>

            ${product.brochureUrl ? `
            <a href="${escapeHTML(product.brochureUrl)}" target="_blank" rel="noopener noreferrer"
               class="flex items-center justify-center gap-2 w-full border border-teal-200 text-teal-700 hover:bg-teal-50 font-semibold py-3 rounded-lg transition-colors text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Download Brochure
            </a>` : ''}
          </div>

          <!-- Verified notice -->
          <div class="mt-5 flex items-center gap-2 text-xs text-slate-400">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Prices are not displayed. Request a quote for current pricing.
          </div>
        </div>
      </div>
    </section>

    <!-- Specifications -->
    ${product.specs && Object.keys(product.specs).length > 0 ? `
    <section class="bg-slate-50 border-t border-gray-100" aria-labelledby="specs-heading">
      <div class="container-xl py-10">
        <h2 id="specs-heading" class="text-xl font-bold text-navy-500 mb-6">Technical Specifications</h2>
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table class="w-full text-sm">
            <caption class="sr-only">Technical specifications for ${escapeHTML(product.name)}</caption>
            <tbody>
              ${Object.entries(product.specs).map(([key, val], i) => `
                <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}">
                  <th scope="row" class="px-6 py-3 text-left font-medium text-slate-500 w-2/5 border-b border-gray-50">${escapeHTML(key)}</th>
                  <td class="px-6 py-3 text-slate-700 border-b border-gray-50">${escapeHTML(String(val))}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <p class="text-xs text-slate-400 mt-3">Specifications sourced from manufacturer documentation. Contact us to verify current specifications for your application.</p>
      </div>
    </section>` : ''}

    <!-- Related Products -->
    ${related.length > 0 ? `
    <section class="bg-white border-t border-gray-100" aria-labelledby="related-heading">
      <div class="container-xl py-10">
        <h2 id="related-heading" class="text-xl font-bold text-navy-500 mb-6">Related Equipment</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${related.map(p => buildRelatedCard(p)).join('')}
        </div>
      </div>
    </section>` : ''}
  `;

  container.classList.remove('hidden');

  // Attach current product for Telegram modal
  window._currentProduct = product;
}

function buildRelatedCard(product) {
  const imgSrc = getProductImagePath(product.image);
  return `
    <a href="/product.html?slug=${encodeURIComponent(product.slug)}"
       class="flex gap-4 items-start bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
      <div class="w-16 h-16 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 p-2">
        <img src="${imgSrc}" alt="" class="w-full h-full object-contain" loading="lazy" onerror="this.src='/assets/images/placeholder-product.svg'">
      </div>
      <div>
        <p class="text-sm font-semibold text-navy-500 leading-snug hover:text-teal-600 transition-colors">${escapeHTML(product.name)}</p>
        ${product.manufacturer ? `<p class="text-xs text-slate-400 mt-0.5">${escapeHTML(product.manufacturer)}</p>` : ''}
      </div>
    </a>`;
}

function switchImage(src) {
  const img = document.getElementById('main-product-img');
  if (img) img.src = src;
}

function openTelegramFromDetail() {
  const product = window._currentProduct;
  if (!product) return;
  // Reuse catalogue module's modal
  if (typeof openTelegramEnquiry === 'function') {
    openTelegramEnquiry(product.name, product.slug);
  }
}
