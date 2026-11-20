import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/siteConfig';
import './Navbar.css';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const { t } = useLanguage();
  const location = useLocation();

  // Calculate total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Close menu on route change
  React.useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav className={`navbar${open ? ' menu-open' : ''}`}>
      <div className="navbar__logo">
        <NavLink to="/" className="navbar__logo-link">
          <img src={SITE_CONFIG.logoUrl} alt={`${SITE_CONFIG.brandName} Logo`} className="navbar__logo-img" />
          <span>{SITE_CONFIG.brandName}</span>
        </NavLink>
      </div>
      <div className="navbar__right-group">
        <div className="navbar__cart-mobile">
          <NavLink to="/cart" className={({ isActive }) => 'navbar__cart-link' + (isActive ? ' active' : '')}>
            <span className="navbar__cart-icon" aria-label={t('cart')}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M2.5 3h2l2.2 13.1a2 2 0 0 0 2 1.7h7.6a2 2 0 0 0 2-1.7l1.2-7.1H6.1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </NavLink>
        </div>
        <button className={`navbar__toggle${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          <span className="navbar__hamburger"></span>
          <span className="navbar__hamburger"></span>
          <span className="navbar__hamburger"></span>
        </button>
      </div>
      <div className={`navbar__links${open ? ' open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>{t('home')}</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>{t('products')}</NavLink>
        {/* Cart link only for desktop */}
        <div className="navbar__cart-desktop">
          <NavLink to="/cart" className={({ isActive }) => 'navbar__cart-link' + (isActive ? ' active' : '')}>
            <span className="navbar__cart-icon" aria-label={t('cart')}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M2.5 3h2l2.2 13.1a2 2 0 0 0 2 1.7h7.6a2 2 0 0 0 2-1.7l1.2-7.1H6.1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;