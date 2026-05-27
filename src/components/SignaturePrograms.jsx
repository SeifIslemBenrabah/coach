import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './SignaturePrograms.css';

export default function SignaturePrograms() {
  const { t } = useTranslation();
  return (
    <section id="allprograms" className="signature bg-light pb-section">
      <div className="container-sig">
        <div className="signature-header">
          <h2 className="signature-title">{t('sig.title')}</h2>
          <p className="signature-desc">{t('sig.desc')}</p>
        </div>

        <div className="signature-grid">
          {/* Card 1 */}
          <div className="plan-card">
            <div className="plan-header">
              <h3 className="plan-title">{t('sig.p1Name')}</h3>
              <div className="plan-price"><span>$399</span> {t('sig.mo')}</div>
            </div>
            <p className="plan-subtitle">{t('sig.p1Desc')}</p>
            <ul className="plan-features">
              <li><Check size={18} color="#000" /> {t('sig.p1f1')}</li>
              <li><Check size={18} color="#000" /> {t('sig.p1f2')}</li>
              <li><Check size={18} color="#000" /> {t('sig.p1f3')}</li>
            </ul>
            <button className="btn-outline w-100" style={{ color: '#000' }}>{t('sig.choose')}</button>
          </div>

          {/* Card 2 - Highlighted */}
          <div className="plan-card plan-card-highlight">
            <div className="plan-badge">{t('sig.p2Badge')}</div>
            <div className="plan-header">
              <h3 className="plan-title">{t('sig.p2Name')}</h3>
              <div className="plan-price"><span>$299</span> {t('sig.mo')}</div>
            </div>
            <p className="plan-subtitle">{t('sig.p2Desc')}</p>
            <ul className="plan-features">
              <li><Check size={18} color="#fff" /> {t('sig.p2f1')}</li>
              <li><Check size={18} color="#fff" /> {t('sig.p2f2')}</li>
              <li><Check size={18} color="#fff" /> {t('sig.p2f3')}</li>
            </ul>
            <button className="btn-primary w-100" style={{ backgroundColor: '#000', color: '#fff', display: 'flex', justifyContent: 'center' }}>{t('sig.choose')}</button>
          </div>

          {/* Card 3 */}
          <div className="plan-card plan-card-dark">
            <div className="plan-header">
              <h3 className="plan-title">{t('sig.p3Name')}</h3>
              <div className="plan-price"><span>$199</span> {t('sig.mo')}</div>
            </div>
            <p className="plan-subtitle">{t('sig.p3Desc')}</p>
            <ul className="plan-features">
              <li><Check size={18} color="#fff" /> {t('sig.p3f1')}</li>
              <li><Check size={18} color="#fff" /> {t('sig.p3f2')}</li>
              <li><Check size={18} color="#fff" /> {t('sig.p3f3')}</li>
            </ul>
            <button className="btn-outline w-100" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>{t('sig.choose')}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
