import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import mainImage from '../assets/ahmed.jpg';
import './Testimonial.css';

export default function Testimonial() {
  const { t } = useTranslation();
  return (
    <section className="testimonial bg-light pb-section">
      <div className="container">
        <div className="testimonial-content">
          <div className="stars">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="#ff4d00" color="#ff4d00" />)}
          </div>
          <h2 className="testimonial-quote">
            {t('testim.quote')}
          </h2>
          <div className="testimonial-author">
            <img src={mainImage} alt="Ahmed, Client" />
            <div className="author-details">
              <strong>Ahmed</strong>
              <span>{t('testim.client')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
