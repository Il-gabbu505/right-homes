import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Articles from './pages/Articles'; 
import Footer from './components/Footer';
import './App.css';

// --- CUSTOM ANIMATED NAV LINK ---
const AnimatedNavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} style={{ textDecoration: 'none' }} onClick={onClick}>
      <motion.div
        whileHover={{ color: '#ffffff' }}
        whileTap={{ scale: 0.95 }}
        style={{
          color: isActive ? '#ffffff' : '#94a3b8', 
          fontWeight: isActive ? '700' : '400',    
          fontSize: '1rem', 
          fontFamily: '"Inter", sans-serif',
          transition: 'color 0.2s ease',
          position: 'relative',
          padding: '8px 0', 
        }}
      >
        {children}
        
        {/* Exact-width copper underline */}
        {isActive && (
          <motion.div
            layoutId="navbar-underline"
            style={{
              position: 'absolute',
              bottom: 0, 
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: '#c27329', 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

// --- ROUTE ANIMATION WRAPPER ---
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} /> 
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

// --- MAIN APP ---
export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <Router>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: isMobile ? '0 20px' : '0 60px', 
        height: '100px', // Increased height to comfortably fit the bigger logo
        backgroundColor: '#000000', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000,
      }}>
        
        {/* --- UPDATED IMAGE LOGO --- */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginLeft: '-15px' }} onClick={() => setIsMenuOpen(false)}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <img 
              src="/latest.png" 
              alt="Right Homes Real Estate" 
              style={{ height: isMobile ? '65px' : '85px', width: 'auto', display: 'block' }}
            />
          </motion.div>
        </Link>
        {/* -------------------------- */}

        {/* --- DESKTOP NAVIGATION --- */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <AnimatedNavLink to="/">Properties</AnimatedNavLink>
            <AnimatedNavLink to="/about">About & Agents</AnimatedNavLink>
            <AnimatedNavLink to="/articles">Articles</AnimatedNavLink>
            <AnimatedNavLink to="/contact">Contact</AnimatedNavLink>
          </div>
        )}

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        {isMobile && (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#ffffff', 
              cursor: 'pointer',
              padding: '10px', 
              zIndex: 1001 
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        )}
      </nav>

      {/* --- MOBILE FULL-SCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '100px', // Updated to match the new navbar height
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#0a0a0a', 
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: '40px 30px',
              gap: '30px'
            }}
          >
            <AnimatedNavLink to="/" onClick={() => setIsMenuOpen(false)}>Properties</AnimatedNavLink>
            <AnimatedNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About & Agents</AnimatedNavLink>
            <AnimatedNavLink to="/articles" onClick={() => setIsMenuOpen(false)}>Articles</AnimatedNavLink>
            <AnimatedNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</AnimatedNavLink>
            
            <div style={{ marginTop: 'auto', borderTop: '1px solid #1e293b', paddingTop: '30px', color: '#94a3b8', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#c27329' }}>📞</span> +356 9997 8211
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#c27329' }}>✉️</span> office@righthomes.com.mt
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main style={{ minHeight: 'calc(100vh - 100px)', overflowX: 'hidden' }}>
        <AnimatedRoutes />
      </main>

      <Footer /> 

    </Router>
  );
}