/**
 * HARLES LAB EQUIPMENT — SHARED LAYOUT
 * Injects consistent header and footer into every page.
 * Edit the HTML strings below to update site-wide navigation.
 */

const NAV_LINKS = [
  { href: '/index.html',    label: 'Home' },
  { href: '/products.html', label: 'Products' },
  { href: '/services.html', label: 'Services' },
  { href: '/about.html',    label: 'About' },
  { href: '/contact.html',  label: 'Contact' },
];

function buildHeader() {
  const nav = NAV_LINKS.map(l =>
    `<a href="${l.href}" data-nav class="nav-link">${l.label}</a>`
  ).join('');

  const mobileNav = NAV_LINKS.map(l =>
    `<a href="${l.href}" data-nav class="block px-6 py-3 text-sm font-medium text-slate-700 hover:text-navy-500 hover:bg-slate-50 transition-colors">${l.label}</a>`
  ).join('');

  return `
<!-- Skip navigation for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Mobile nav overlay -->
<div id="mobile-nav-overlay" class="mobile-nav-overlay" aria-hidden="true"></div>

<!-- Mobile nav panel -->
<nav id="mobile-nav-panel" class="mobile-nav-panel" aria-label="Mobile navigation">
  <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
    <a href="/index.html" class="flex items-center gap-2.5">
      <img src="/assets/images/logo-placeholder.svg" alt="Harles Lab Equipment" class="h-9 w-auto" onerror="this.style.display='none'">
    </a>
    <button id="mobile-nav-close" aria-label="Close navigation menu"
      class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
  <div class="flex-1 overflow-y-auto py-4">
    ${mobileNav}
  </div>
  <div class="px-6 pb-6 border-t border-gray-100 pt-4">
    <a href="/contact.html#quote" class="btn-primary w-full text-center">
      Request a Quote
    </a>
  </div>
</nav>

<!-- Header -->
<header class="sticky top-0 z-20 bg-white shadow-nav" role="banner">
  <div class="container-xl">
    <div class="flex items-center justify-between h-16">

      <!-- Logo -->
      <a href="/index.html" class="flex items-center gap-2.5 flex-shrink-0" aria-label="Harles Lab Equipment — Home">
        <img src="/assets/images/logo-placeholder.svg"
             alt="Harles Lab Equipment"
             class="h-9 w-auto"
             width="180" height="36"
             onerror="this.style.display='none'">
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6" aria-label="Main navigation">
        ${nav}
      </nav>

      <!-- Desktop CTA -->
      <div class="hidden md:flex items-center gap-3">
        <a href="/contact.html#quote" class="btn-primary">
          Request a Quote
        </a>
      </div>

      <!-- Mobile menu button -->
      <button id="mobile-menu-btn"
        class="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="mobile-nav-panel">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

    </div>
  </div>
</header>`;
}

function buildFooter() {
  const config = window.SITE_CONFIG || {};

  const emailLink = config.email
    ? `<a href="mailto:${config.email}" class="hover:text-white transition-colors">${config.email}</a>`
    : `<span class="text-slate-500 italic">Email address — coming soon</span>`;

  const phoneLink = config.phone
    ? `<a href="tel:${config.phone.replace(/\s/g,'')}}" class="hover:text-white transition-colors">${config.phone}</a>`
    : `<span class="text-slate-500 italic">Phone number — coming soon</span>`;

  return `
<!-- Footer -->
<footer class="bg-navy-500 text-slate-300" role="contentinfo">
  <div class="container-xl py-14">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      <!-- Brand Column -->
      <div class="lg:col-span-1">
        <a href="/index.html" class="inline-block mb-5">
          <img src="/assets/images/logo-placeholder.svg"
               alt="Harles Lab Equipment"
               class="h-10 w-auto brightness-0 invert opacity-90"
               width="180" height="40"
               onerror="this.style.display='none'">
        </a>
        <p class="text-sm leading-relaxed text-slate-400 max-w-xs">
          Reliable laboratory equipment and diagnostic instruments for hospitals,
          laboratories, and healthcare facilities in Nigeria.
        </p>
        <p class="text-sm mt-4 text-slate-400">${config.location || 'Port Harcourt, Rivers State, Nigeria'}</p>
      </div>

      <!-- Equipment Column -->
      <div>
        <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Equipment</h3>
        <ul class="space-y-2.5 text-sm">
          <li><a href="/products.html?cat=haematology" class="hover:text-white transition-colors">Haematology Analysers</a></li>
          <li><a href="/products.html?cat=biochemistry" class="hover:text-white transition-colors">Biochemistry Analysers</a></li>
          <li><a href="/products.html?cat=immunoassay" class="hover:text-white transition-colors">Immunoassay Systems</a></li>
          <li><a href="/products.html?cat=urinalysis" class="hover:text-white transition-colors">Urinalysis Analysers</a></li>
          <li><a href="/products.html?cat=coagulation" class="hover:text-white transition-colors">Coagulation Analysers</a></li>
          <li><a href="/products.html" class="hover:text-white transition-colors font-medium">View All Equipment →</a></li>
        </ul>
      </div>

      <!-- Company Column -->
      <div>
        <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
        <ul class="space-y-2.5 text-sm">
          <li><a href="/about.html" class="hover:text-white transition-colors">About Harles</a></li>
          <li><a href="/services.html" class="hover:text-white transition-colors">Our Services</a></li>
          <li><a href="/contact.html" class="hover:text-white transition-colors">Contact Us</a></li>
          <li><a href="/contact.html#quote" class="hover:text-white transition-colors">Request a Quote</a></li>
          <li><a href="/privacy.html" class="hover:text-white transition-colors">Privacy Policy</a></li>
        </ul>
      </div>

      <!-- Contact Column -->
      <div>
        <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Get in Touch</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-start gap-2.5">
            <svg class="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            ${emailLink}
          </li>
          <li class="flex items-start gap-2.5">
            <svg class="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            ${phoneLink}
          </li>
          <li class="flex items-start gap-2.5">
            <svg class="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>${config.address || 'Port Harcourt, Rivers State, Nigeria'}</span>
          </li>
        </ul>

        ${config.calendlyUrl ? `
        <a href="${config.calendlyUrl}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-2 mt-5 text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Book a Consultation
        </a>` : ''}
      </div>

    </div>
  </div>

  <!-- Bottom bar -->
  <div class="border-t border-white/10">
    <div class="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
      <p>&copy; <span id="copyright-year"></span> Harles Lab Equipment. All rights reserved.</p>
      <div class="flex items-center gap-5">
        <a href="/privacy.html" class="hover:text-slate-300 transition-colors">Privacy Policy</a>
        <a href="/contact.html" class="hover:text-slate-300 transition-colors">Contact</a>
      </div>
    </div>
  </div>
</footer>

<!-- Back to top -->
<button id="back-to-top" class="back-to-top" aria-label="Back to top">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
  </svg>
</button>`;
}

// Inject layout on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const headerTarget = document.getElementById('site-header');
  const footerTarget = document.getElementById('site-footer');

  if (headerTarget) headerTarget.innerHTML = buildHeader();
  if (footerTarget) footerTarget.innerHTML = buildFooter();
});
