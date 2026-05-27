import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import mainImage from '../assets/About.jpeg';
import './About.css';

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="about bg-light section-padding">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-col animate-fade-in">
            <img src={mainImage} alt="Coach Amine" className="about-img" />
          </div>

          <div className="about-content-col animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="about-title">{t('about.title')}</h2>
            <p className="about-desc">{t('about.desc1')}</p>
            <p className="about-desc">{t('about.desc2')}</p>

            <a href="#more" className="about-link">
              {t('about.more')} <ArrowRight size={16} />
            </a>

            <div className="about-badges">
              <div className="badge-item">
                <span className="badge-value">{t('about.badge1Val')}</span>
                <span className="badge-text">{t('about.badge1Label')}</span>
              </div>
              <div className="badge-item">
                <span className="badge-value">{t('about.badge2Val')}</span>
                <span className="badge-text">{t('about.badge2Label')}</span>
              </div>
              <div className="badge-item">
                <span className="badge-value">{t('about.badge3Val')}</span>
                <span className="badge-text">{t('about.badge3Label')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
