# Configuration Guide (`src/config/`)

This directory contains the central configuration files for the entire e-commerce store.

---

## 1. Site & Brand Configuration (`siteConfig.js`)

File: **[`siteConfig.js`](./siteConfig.js)**

This file is the single source of truth for all branding and store identity across the website. Changing the values in this file automatically updates:
- **Navbar**: Brand logo text, image source, and image alt text.
- **Footer**: Brand name, logo, and dynamic copyright year.
- **Multi-language Translations**: English and French homepage welcome banners.
- **Browser Tab**: Window title (`document.title`) and search engine meta description (`<meta name="description">`).

### Configuration Options

```javascript
export const SITE_CONFIG = {
  // 1. Brand name shown in Navbar, Footer, and Translations
  brandName: process.env.REACT_APP_BRAND_NAME || 'ArbibStore',

  // 2. Browser tab title
  siteTitle: process.env.REACT_APP_SITE_TITLE || 'ArbibStore',

  // 3. Short store description for SEO & meta tags
  description: process.env.REACT_APP_SITE_DESCRIPTION || 'Your eco-friendly shopping destination',

  // 4. Path to your store logo (relative to the public/ directory)
  logoUrl: process.env.REACT_APP_LOGO_URL || '/images/logo.png',

  // 5. Store currency symbol (e.g. 'DH', '$', '€', 'SAR', 'AED')
  currency: process.env.REACT_APP_CURRENCY || 'DH',
};
```

### Two Ways to Customize:

1. **Directly in `siteConfig.js` (Easiest)**:
   Open `src/config/siteConfig.js` and edit the string values directly.

2. **Via `.env` file (Optional)**:
   Add these environment variables to your root `.env` file to override without editing the code:
   ```env
   REACT_APP_BRAND_NAME=MyBrand
   REACT_APP_SITE_TITLE=MyBrand - Online Store
   REACT_APP_SITE_DESCRIPTION=Quality eco-friendly products
   REACT_APP_CURRENCY=DH
   REACT_APP_LOGO_URL=/images/logo.png
   ```

---

## 2. Firebase Configuration (`firebase.js`)

File: **[`firebase.js`](./firebase.js)**

Initializes the Firebase App, Firebase Authentication, and Cloud Firestore.

It reads the project keys from the root `.env` file:
```env
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1234567890
REACT_APP_FIREBASE_APP_ID=1:1234567890:web:abcdef
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

> **Tip**: You can run `node init-firebase.js` in the project root to automatically initialize and verify your Firestore database connection.
