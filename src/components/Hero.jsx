import React, { useRef, useEffect } from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import mainImage from '../assets/ahmed.jpg';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="hero-img"
        >
          <source src="https://www.pexels.com/download/video/33515044/" type="video/mp4" />
        </video>
      </div>

      <div className="container hero-content">
        <div className="hero-top-badges animate-fade-in">
          <div className="badge-location glass-panel">
            <MapPin size={16} className="text-accent" />
            <span>{t('hero.location')}</span>
          </div>
          <div className="badge-rating glass-panel">
            <div className="avatar-group">
              <img src={mainImage} alt="User" />
              <img src={mainImage} alt="User" />
            </div>
            <div className="rating-info">
              <div className="stars">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="#ff4d00" color="#ff4d00" />)}
              </div>
              <span className="rating-number">4.9/5</span>
            </div>
          </div>
        </div>

        <div className="hero-main">
          <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.3s' }} dangerouslySetInnerHTML={{ __html: t('hero.title') }} />

          <div className="hero-cta-box animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p>{t('hero.subtitle')}</p>
            <a
              href="#contact"
              className="btn-primary cta-action-btn"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
              {t('hero.button')} <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
