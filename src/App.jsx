import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import { DataProvider } from './context/DataContext';

function AppContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasAdminParam = urlParams.get('admin') === 'true';
    const hasToken = sessionStorage.getItem('kbp_admin_token') === 'true';

    if (hasToken) {
      setIsAdmin(true);
      setShowLogin(false);
    } else if (hasAdminParam) {
      setShowLogin(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setShowLogin(false);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  if (showLogin && !isAdmin) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-brand-bgMain text-brand-text font-sans selection:bg-brand-primary selection:text-white relative">
      <Navbar />
      {isAdmin && (
        <div className="fixed top-24 right-6 z-[90] bg-brand-primary text-white text-xs px-4 py-2 rounded-full shadow-lg shadow-brand-primary/20 flex items-center gap-3 border border-white/20 backdrop-blur-md font-bold">
          <span>✨ Admin Mode</span>
          <button 
            onClick={() => {
              sessionStorage.removeItem('kbp_admin_token');
              setIsAdmin(false);
            }} 
            className="hover:text-red-200 bg-white/10 px-2 py-1 rounded transition-colors"
            title="Keluar dari mode admin"
          >
            Log Out
          </button>
        </div>
      )}
      <main>
        <Hero />
        <About />
        <Menu isAdmin={isAdmin} />
        <Gallery isAdmin={isAdmin} />
        <Location />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;
