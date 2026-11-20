import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CartCheckout from './pages/CartCheckout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import OrderManager from './pages/admin/OrderManager';
import ProductManager from './pages/admin/ProductManager';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Contact from './pages/Contact';
import AdminContact from './pages/admin/AdminContact';
import ThankYou from './pages/ThankYou';
import ReactPixel from 'react-facebook-pixel';
import { SITE_CONFIG } from './config/siteConfig';

// Initialize Meta Pixel
const options = {
  autoConfig: true,
  debug: false,
};
ReactPixel.init('1089323955929554', {}, options);

// Custom hook to track page views on route change
function usePageViewPixel() {
  const location = useLocation();
  useEffect(() => {
    ReactPixel.pageView();
  }, [location]);
}

// Protected Route component for admin routes
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/admingate');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-loading-spinner">
          <div className="admin-spinner"></div>
          <div style={{ marginTop: '1rem', color: '#1976d2', fontWeight: 600, fontSize: '1.1rem' }}>Loading...</div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admingate" />;
};

// Layout component for non-admin routes
const MainLayout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const AppRoutes = () => {
  usePageViewPixel();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/admingate';

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admingate" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute>
              <OrderManager />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/products" 
          element={
            <ProtectedRoute>
              <ProductManager />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/contact" 
          element={
            <ProtectedRoute>
              <AdminContact />
            </ProtectedRoute>
          } 
        />
      </Routes>
    );
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart-checkout" element={<CartCheckout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </MainLayout>
  );
};

function App() {
  useEffect(() => {
    if (SITE_CONFIG.siteTitle) {
      document.title = SITE_CONFIG.siteTitle;
    }
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && SITE_CONFIG.description) {
      metaDescription.setAttribute('content', `${SITE_CONFIG.brandName} - ${SITE_CONFIG.description}`);
    }
  }, []);

  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
