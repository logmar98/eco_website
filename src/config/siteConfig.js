/**
 * Global Site & Brand Configuration
 *
 * Change your store details here in this ONE file.
 * Any change made here will automatically reflect across:
 * - Navbar (brand name, logo, alt text)
 * - Footer (brand name, logo, copyright)
 * - Home page & Translations (welcome messages in English, French, etc.)
 * - Browser tab title & Meta description
 */

export const SITE_CONFIG = {
  // Brand name (e.g., 'ArbibStore', 'MyStore', etc.)
  brandName: process.env.REACT_APP_BRAND_NAME || 'ArbibStore',

  // Browser tab title
  siteTitle: process.env.REACT_APP_SITE_TITLE || 'ArbibStore',

  // Short store description (used for meta description & SEO)
  description: process.env.REACT_APP_SITE_DESCRIPTION || 'Your eco-friendly shopping destination',

  // Logo path (relative to public/ directory)
  logoUrl: process.env.REACT_APP_LOGO_URL || '/images/logo.png',

  // Default store currency (e.g., 'DH', '$', '€', 'SAR', 'AED', 'USD')
  currency: process.env.REACT_APP_CURRENCY || 'DH',
};

export default SITE_CONFIG;
