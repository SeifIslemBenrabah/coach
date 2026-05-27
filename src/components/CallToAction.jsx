import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BeforeAfter from './BeforeAfter';
import mainImage from '../assets/ahmed.jpg';
import './CallToAction.css';

export default function CallToAction() {
  const { t } = useTranslation();
  return (
    <section id="testimonials" className="cta bg-light section-padding">
      <div className="container">
        <div className="cta-grid">
          <div className="cta-content">
            <h2 className="cta-title">{t('cta.title')}</h2>
            <p className="cta-desc">{t('cta.desc')}</p>

            <div className="cta-testimonial">
              <img src={mainImage} alt="Ahmed" />
              <div>
                <strong>Ahmed</strong>
                <span>{t('cta.sophia')}</span>
                <div className="stars mt-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#ff4d00" color="#ff4d00" />)}
                </div>
              </div>
            </div>
            <p className="small-quote">{t('cta.small')}</p>
          </div>

          <div className="cta-image-wrapper">
            <BeforeAfter />
          </div>
        </div>
      </div>
    </section>
  )
}
