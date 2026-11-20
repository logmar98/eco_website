import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

// Translation data
const translations = {
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    contact: 'Contact',
    
    // Footer
    allRightsReserved: 'All rights reserved.',
    selectLanguage: 'Select Language',
    
    // Home page
    welcome: `Welcome to ${SITE_CONFIG.brandName}`,
    heroSubtitle: 'Fast shipping, great quality, and unbeatable prices on products you love.',
    shopNow: 'Shop Now',
    popularProducts: 'Popular Products',
    loadingPopularProducts: 'Loading Popular Products',
    loadingSubMessage: 'Please wait while we fetch our popular products...',
    noPopularProducts: 'No popular products found.',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    
    // Product pages
    price: 'Price',
    quantity: 'Quantity',
    description: 'Description',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    
    // Cart
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty! Start shopping now.',
    continueShopping: 'Continue Shopping',
    proceedToCheckout: 'Proceed to Checkout',
    total: 'Total',
    remove: 'Remove',
    update: 'Update',
    clear: 'Clear',
    to: 'to',
    
    // Checkout
    checkout: 'Checkout',
    orderSummary: 'Order Summary',
    shippingInfo: 'Shipping Information',
    paymentInfo: 'Payment Information',
    placeOrder: 'Place Order',
    
    // Contact
    contactUs: 'Contact Us',
    getInTouch: 'Get in Touch',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    
    // General
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    view: 'View',
    close: 'Close',
    submit: 'Submit',
    reset: 'Reset',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    info: 'Info',
    notAvailable: 'Not Available',
    searchPlaceholder: 'Search by name, description, or category...',
    noProductsFound: 'No products found.',
    // Checkout
    quickCheckout: "Quick Checkout",
    cartCheckout: "Cart Checkout",
    thankYou: "Thank you for your order!",
    orderSuccess: "Your order has been placed successfully.",
    paymentOnDelivery: "Payment will be collected on delivery.",
    noProductSelected: "No product selected",
    subtotal: "Subtotal",
    shippingInfo: "Shipping Information",
    fullName: "Full Name",
    phone: "Phone Number",
    city: "City",
    address: "Address",
    paymentMethod: "Payment Method: Cash on Delivery",
    paymentNote: "Total amount will be collected when your order is delivered.",
    placingOrder: "Placing Order...",
    placeOrder: "Place Order",
    enterFullName: "Enter your full name",
    enterPhone: "Enter your phone number",
    enterCity: "Enter your city",
    enterAddress: "Enter your full address",
    orderNumber: "Order Number",
    totalAmount: "Total Amount",
    expectACall: "You can expect a call from our team soon to confirm your order details.",
  },
  fr: {
    // Navigation
    home: 'Accueil',
    products: 'Produits',
    cart: 'Panier',
    contact: 'Contact',
    
    // Footer
    allRightsReserved: 'Tous droits réservés.',
    selectLanguage: 'Sélectionner la langue',
    
    // Home page
    welcome: `Bienvenue chez ${SITE_CONFIG.brandName}`,
    heroSubtitle: 'Expédition rapide, qualité exceptionnelle et prix imbattables sur les produits que vous aimez.',
    shopNow: 'Acheter Maintenant',
    popularProducts: 'Produits Populaires',
    loadingPopularProducts: 'Chargement des Produits Populaires',
    loadingSubMessage: 'Veuillez patienter pendant que nous récupérons nos produits populaires...',
    noPopularProducts: 'Aucun produit populaire trouvé.',
    addToCart: 'Ajouter au Panier',
    buyNow: 'Acheter Maintenant',
    
    // Product pages
    price: 'Prix',
    quantity: 'Quantité',
    description: 'Description',
    outOfStock: 'Rupture de Stock',
    inStock: 'En Stock',
    
    // Cart
    yourCart: 'Votre Panier',
    emptyCart: 'Votre panier est vide ! Commencez à faire vos achats maintenant.',
    continueShopping: 'Continuer les Achats',
    proceedToCheckout: 'Procéder au Paiement',
    total: 'Total',
    remove: 'Supprimer',
    update: 'Mettre à Jour',
    clear: 'Vider',
    to: 'vers',
    
    // Checkout
    checkout: 'Paiement',
    orderSummary: 'Résumé de la Commande',
    shippingInfo: 'Informations de Livraison',
    paymentInfo: 'Informations de Paiement',
    placeOrder: 'Passer la Commande',
    
    // Contact
    contactUs: 'Contactez-nous',
    getInTouch: 'Entrez en Contact',
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    send: 'Envoyer',
    
    // General
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    edit: 'Modifier',
    delete: 'Supprimer',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    view: 'Voir',
    close: 'Fermer',
    submit: 'Soumettre',
    reset: 'Réinitialiser',
    confirm: 'Confirmer',
    yes: 'Oui',
    no: 'Non',
    ok: 'OK',
    info: 'Info',
    notAvailable: 'Non Disponible',
    searchPlaceholder: 'Rechercher par nom, description ou catégorie...',
    noProductsFound: 'Aucun produit trouvé.',
    // Checkout
    quickCheckout: "Paiement Rapide",
    cartCheckout: "Paiement du Panier",
    thankYou: "Merci pour votre commande !",
    orderSuccess: "Votre commande a été passée avec succès.",
    paymentOnDelivery: "Le paiement sera perçu à la livraison.",
    noProductSelected: "Aucun produit sélectionné",
    subtotal: "Sous-total",
    fullName: "Nom Complet",
    phone: "Numéro de Téléphone",
    city: "Ville",
    address: "Adresse",
    paymentMethod: "Mode de Paiement : Paiement à la livraison",
    paymentNote: "Le montant total sera perçu à la livraison de votre commande.",
    placingOrder: "Passation de la commande...",
    enterFullName: "Entrez votre nom complet",
    enterPhone: "Entrez votre numéro de téléphone",
    enterCity: "Entrez votre ville",
    enterAddress: "Entrez votre adresse complète",
    orderNumber: "Numéro de Commande",
    totalAmount: "Montant total",
    expectACall: "Vous pouvez vous attendre à un appel de notre équipe pour confirmer les détails de votre commande.",
  },
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage && translations[savedLanguage] ? savedLanguage : 'en';
  });

  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    }
  };

  const t = (key) => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  useEffect(() => {
    // Set initial document language
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = 'ltr'; // Always LTR now
  }, [currentLanguage]);

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translations,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 