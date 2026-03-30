import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#AC402B] shadow-md py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex flex-col items-start font-serif font-bold text-white drop-shadow-md hover:opacity-90 transition-opacity">
          <span className="text-xl md:text-2xl tracking-[0.15em] leading-tight">KOPI</span>
          <span className="text-xl md:text-2xl tracking-wide leading-none">BUDE PAKDE</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors text-white/90 hover:text-white ${
                isScrolled ? 'text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#order"
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all transform hover:-translate-y-0.5 ${
              isScrolled 
                ? 'bg-white text-brand-text hover:bg-gray-100 shadow-md' 
                : 'bg-white text-brand-text hover:bg-gray-100 shadow-md'
            }`}
          >
            Order Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 relative z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="text-brand-text" size={24} />
          ) : (
            <MenuIcon className="text-white drop-shadow-md" size={24} />
          )}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-64 bg-brand-bgMain shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col pt-24 px-6 gap-6 z-40`}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="text-lg font-medium text-brand-text hover:text-brand-primary border-b border-gray-200 pb-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a
          href="#order"
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-4 w-full py-3 bg-brand-primary text-white text-center rounded-xl font-bold text-lg hover:bg-brand-hover transition-colors shadow-lg shadow-brand-primary/20"
        >
          Order Sekarang
        </a>
      </div>
    </header>
  );
};

export default Navbar;
