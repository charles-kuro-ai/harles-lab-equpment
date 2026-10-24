/**
 * HARLES LAB EQUIPMENT — PRODUCT CATALOGUE
 * ==========================================
 * HOW TO USE THIS FILE
 * --------------------
 * 1. Each product is an object in the PRODUCTS array below.
 * 2. Set "status": "published" to make a product visible on the website.
 * 3. Set "status": "draft" to hide it (useful while verifying details).
 * 4. Only include fields you have verified. Leave unverified fields as null.
 * 5. Add product images to /assets/images/products/ and reference by filename.
 * 6. Run `npm run build` after editing to rebuild the production CSS.
 *
 * FIELD GUIDE
 * -----------
 * id           - Unique internal identifier (do not change after publishing)
 * slug         - URL-safe name used in product detail links (letters, numbers, hyphens only)
 * name         - Full product name displayed on the website
 * manufacturer - Manufacturer name (only verified relationships)
 * model        - Exact model number or identifier, if verified
 * category     - One of the CATEGORIES keys below
 * shortDesc    - One or two sentences for the product card
 * description  - Longer description for the product detail page
 * image        - Filename in /assets/images/products/ (e.g. "zybio-z5-front.jpg")
 * gallery      - Array of additional image filenames
 * specs        - Object of verified specification key-value pairs (omit if unverified)
 * applications - Array of intended laboratory applications
 * brochureUrl  - Path or URL to a verified PDF brochure (e.g. "/assets/docs/z5-brochure.pdf")
 * featured     - true to show on the home page featured section
 * status       - "published" or "draft"
 *
 * IMPORTANT CONTENT RULES
 * -----------------------
 * - Never invent a model number, specification, or product claim.
 * - Only use manufacturer names and logos for products you are authorized to represent.
 * - Do not set status to "published" until the product name, description,
 *   and at least one image have been verified.
 * - Prices are NOT shown on the website. Customers request quotations.
 */

// ------------------------------------
// PRODUCT CATEGORIES
// ------------------------------------
const CATEGORIES = {
  haematology:       { label: 'Haematology',            icon: 'drop' },
  biochemistry:      { label: 'Biochemistry',           icon: 'flask' },
  immunoassay:       { label: 'Immunoassay / ELISA',    icon: 'activity' },
  microbiology:      { label: 'Microbiology',           icon: 'microscope' },
  urinalysis:        { label: 'Urinalysis',             icon: 'beaker' },
  coagulation:       { label: 'Coagulation',            icon: 'heart-pulse' },
  molecular:         { label: 'Molecular Diagnostics',  icon: 'dna' },
  pointofcare:       { label: 'Point-of-Care Testing',  icon: 'stethoscope' },
  lab_consumables:   { label: 'Lab Consumables',        icon: 'package' },
};

// ------------------------------------
// PRODUCTS ARRAY
// ------------------------------------
const PRODUCTS = [

  /* ─────────────────────────────────────────────────
     DEMO PRODUCTS — Replace with verified products
     before publishing the live website.
     All items below are labeled DEMO and set to
     "draft" until the business verifies each entry.
     ───────────────────────────────────────────────── */

  {
    id: 'demo-001',
    slug: 'zybio-z5-5-part-haematology-analyser',
    name: 'Zybio Z5 5-Part Haematology Analyser',
    manufacturer: 'Zybio',
    model: 'Z5',
    category: 'haematology',
    shortDesc: 'High-throughput 5-part differential haematology analyser designed for clinical and hospital laboratories.',
    description: `The Zybio Z5 is a 5-part differential haematology analyser built for busy clinical and hospital laboratory environments. It delivers reliable complete blood count (CBC) and differential results to support patient care.

This product listing is a demonstration entry. Replace this description with verified content from the official Zybio product documentation before publishing.`,
    image: 'placeholder-haematology.jpg',
    gallery: [],
    specs: null, // Do not publish specs until verified from official documentation
    applications: [
      'Complete Blood Count (CBC)',
      '5-Part White Blood Cell Differential',
      'Reticulocyte Analysis',
    ],
    brochureUrl: null,
    featured: true,
    status: 'draft', // Change to "published" after verification
    _note: 'DEMO ENTRY — Verify all details with Zybio documentation before publishing',
  },

  {
    id: 'demo-002',
    slug: 'zybio-zc-480-biochemistry-analyser',
    name: 'Zybio ZC-480 Biochemistry Analyser',
    manufacturer: 'Zybio',
    model: 'ZC-480',
    category: 'biochemistry',
    shortDesc: 'Automated biochemistry analyser suitable for hospital laboratories and diagnostic centres.',
    description: `The Zybio ZC-480 is an automated biochemistry analyser supporting a broad test menu for clinical chemistry. It is designed for hospital laboratories and diagnostic centres requiring accurate and efficient biochemical analysis.

This product listing is a demonstration entry. Replace this description with verified content from the official Zybio product documentation before publishing.`,
    image: 'placeholder-biochemistry.jpg',
    gallery: [],
    specs: null,
    applications: [
      'Clinical Chemistry',
      'Liver Function Tests',
      'Renal Function Tests',
      'Lipid Profile',
      'Glucose Monitoring',
    ],
    brochureUrl: null,
    featured: true,
    status: 'draft',
    _note: 'DEMO ENTRY — Verify all details with Zybio documentation before publishing',
  },

  {
    id: 'demo-003',
    slug: 'zybio-immunoassay-analyser',
    name: 'Zybio Immunoassay Analyser',
    manufacturer: 'Zybio',
    model: null, // Model not yet verified
    category: 'immunoassay',
    shortDesc: 'Chemiluminescent immunoassay analyser for hormones, infectious disease markers, and tumour markers.',
    description: `A chemiluminescent immunoassay analyser from Zybio for quantitative detection of hormones, tumour markers, cardiac markers, and infectious disease markers.

This product listing is a demonstration entry. Replace this description with verified content from the official Zybio product documentation before publishing.`,
    image: 'placeholder-immunoassay.jpg',
    gallery: [],
    specs: null,
    applications: [
      'Hormone Analysis',
      'Tumour Markers',
      'Cardiac Markers',
      'Infectious Disease Serology',
    ],
    brochureUrl: null,
    featured: true,
    status: 'draft',
    _note: 'DEMO ENTRY — Model number not yet verified. Do not publish until confirmed.',
  },

  {
    id: 'demo-004',
    slug: 'zybio-urine-analyser',
    name: 'Zybio Urine Chemistry Analyser',
    manufacturer: 'Zybio',
    model: null,
    category: 'urinalysis',
    shortDesc: 'Automated urine chemistry analyser for high-volume urinalysis in clinical laboratories.',
    description: `An automated urine chemistry analyser from Zybio, designed for efficient urinalysis in clinical and hospital settings. Supports standard urine chemistry parameters.

This product listing is a demonstration entry. Please verify all details before publishing.`,
    image: 'placeholder-urinalysis.jpg',
    gallery: [],
    specs: null,
    applications: [
      'Urine Chemistry Analysis',
      'Kidney Disease Screening',
      'Urinary Tract Infection Investigation',
    ],
    brochureUrl: null,
    featured: false,
    status: 'draft',
    _note: 'DEMO ENTRY',
  },

  {
    id: 'demo-005',
    slug: 'zybio-coagulation-analyser',
    name: 'Zybio Coagulation Analyser',
    manufacturer: 'Zybio',
    model: null,
    category: 'coagulation',
    shortDesc: 'Semi-automated or fully automated coagulation analyser for haemostasis testing.',
    description: `A coagulation analyser from Zybio supporting haemostasis testing including PT, APTT, TT, and fibrinogen. Suitable for hospital haematology laboratories.

This product listing is a demonstration entry. Please verify all details before publishing.`,
    image: 'placeholder-coagulation.jpg',
    gallery: [],
    specs: null,
    applications: [
      'Prothrombin Time (PT)',
      'Activated Partial Thromboplastin Time (APTT)',
      'Thrombin Time (TT)',
      'Fibrinogen',
    ],
    brochureUrl: null,
    featured: false,
    status: 'draft',
    _note: 'DEMO ENTRY',
  },

];

// ------------------------------------
// UTILITY FUNCTIONS
// ------------------------------------

/**
 * Returns only published products
 */
function getPublishedProducts() {
  return PRODUCTS.filter(p => p.status === 'published');
}

/**
 * Returns featured published products (for homepage)
 */
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.status === 'published' && p.featured);
}

/**
 * Find a product by slug
 * @param {string} slug
 * @returns {object|null}
 */
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug && p.status === 'published') || null;
}

/**
 * Get all unique published categories (in CATEGORIES order)
 * @returns {string[]}
 */
function getPublishedCategories() {
  const publishedCats = new Set(getPublishedProducts().map(p => p.category));
  return Object.keys(CATEGORIES).filter(c => publishedCats.has(c));
}

/**
 * Get products by category
 * @param {string} category
 * @returns {object[]}
 */
function getProductsByCategory(category) {
  return getPublishedProducts().filter(p => p.category === category);
}

/**
 * Search published products
 * @param {string} query
 * @returns {object[]}
 */
function searchProducts(query) {
  if (!query || query.trim() === '') return getPublishedProducts();
  const q = query.toLowerCase().trim();
  return getPublishedProducts().filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.manufacturer && p.manufacturer.toLowerCase().includes(q)) ||
    (p.model && p.model.toLowerCase().includes(q)) ||
    CATEGORIES[p.category]?.label.toLowerCase().includes(q) ||
    p.shortDesc.toLowerCase().includes(q)
  );
}

/**
 * Get related products (same category, excluding current)
 * @param {string} currentSlug
 * @param {number} limit
 * @returns {object[]}
 */
function getRelatedProducts(currentSlug, limit = 3) {
  const current = getProductBySlug(currentSlug);
  if (!current) return [];
  return getPublishedProducts()
    .filter(p => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}

/**
 * Get product image path with fallback
 * @param {string|null} image
 * @returns {string}
 */
function getProductImagePath(image) {
  if (!image) return '/assets/images/placeholder-product.svg';
  return `/assets/images/products/${image}`;
}
