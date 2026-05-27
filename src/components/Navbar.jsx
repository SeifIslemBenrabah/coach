import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Logo.svg'
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('en') ? 'ar' : 'en');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt='logo' />
          </Link>
          {/* <span className="logo-text">Kouba Fit</span> */}
        </div>
        <nav className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#programs" onClick={closeMobileMenu}>{t('nav.programs')}</a>
          <a href="/#about" onClick={closeMobileMenu}>{t('nav.about')}</a>
          <a href="/#testimonials" onClick={closeMobileMenu}>{t('nav.testimonials')}</a>
        </nav>
        <div className="navbar-actions">
          <button className="lang-switch-btn" onClick={toggleLanguage}>
            {i18n.language.startsWith('en') ? 'ع' : 'EN'}
          </button>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
