# Eco Website

A modern e-commerce website built with React, featuring eco-friendly products and multi-language support.

## Branding & Site Configuration

To customize the brand name, browser title, and currency for any store, edit **`src/config/siteConfig.js`** (or set environment variables in `.env`):

```javascript
export const SITE_CONFIG = {
  brandName: 'YourBrand',
  siteTitle: 'YourBrand - Online Store',
  description: 'Your shop description',
  logoUrl: '/images/logo.png',
  currency: 'DH'
};
```
Changing these values updates the Navbar, Footer, Translations, Page Titles, and Meta tags automatically.

## Features

### Multi-Language Support

- **English** - Default language
- **French** - Complete French translation
- **Arabic** - Complete Arabic translation with RTL support
- Language selector in the footer
- Automatic RTL layout for Arabic
- Persistent language preference (saved in localStorage)

### E-commerce Features

- Product catalog with search and filtering
- Shopping cart functionality
- Checkout process
- Admin dashboard for product and order management
- Contact information display

### Technical Features

- React with modern hooks
- Firebase integration for backend
- Responsive design
- Loading states and error handling
- Context API for state management

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Language Switching

Users can switch between languages using the language selector in the footer:

- 🇺🇸 English
- 🇫🇷 Français
- 🇸🇦 العربية

The selected language is automatically saved and will be remembered on future visits.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── LanguageSelector.js  # Language switcher component
│   ├── Navbar.js       # Navigation bar
│   └── Footer.js       # Footer with language selector
├── context/
│   ├── CartContext.js  # Shopping cart state management
│   └── LanguageContext.js  # Internationalization context
├── pages/              # Page components
└── styles/             # Global styles including RTL support
```

## Technologies Used

- React 18
- React Router
- Firebase (Firestore)
- CSS3 with RTL support
- Context API for state management
