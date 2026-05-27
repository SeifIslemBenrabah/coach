import React from 'react';
import { useTranslation } from 'react-i18next';
import mainImage from '../assets/Methode.jpeg';
import './Methodology.css';

export default function Methodology() {
  const { t } = useTranslation();
  const steps = [
    { title: t('method.s1Title'), desc: t('method.s1Desc') },
    { title: t('method.s2Title'), desc: t('method.s2Desc') },
    { title: t('method.s3Title'), desc: t('method.s3Desc') },
    { title: t('method.s4Title'), desc: t('method.s4Desc') },
  ];

  return (
    <section className="methodology bg-light section-padding">
      <div className="container">
        <div className="methodology-grid">
          <div className="method-left animate-fade-in">
            <h2 className="method-title" dangerouslySetInnerHTML={{ __html: t('method.title') }} />
            <p className="method-desc">{t('method.desc')}</p>
            <button className="btn-primary" style={{ backgroundColor: '#000', color: '#fff' }}>{t('method.view')}</button>
            <div className="method-img-box">
              <img src={mainImage} alt="Training methodology" className="method-img" />
            </div>
          </div>

          <div className="method-right">
            <div className="steps-list">
              {steps.map((s, i) => (
                <div key={i} className="step-item animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="step-number">0{i + 1}</div>
                  <div className="step-content">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
