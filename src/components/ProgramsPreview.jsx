import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import mainImage from '../assets/image.jpeg';
import './ProgramsPreview.css';

export default function ProgramsPreview() {
  const { t } = useTranslation();
  return (
    <section id="programs" className="programs-preview section-padding">
      <div className="container">
        <div className="programs-grid">
          <div className="programs-info">
            <h2 className="programs-title" dangerouslySetInnerHTML={{ __html: t('progprev.title') }} />
            <p className="programs-desc">{t('progprev.desc')}</p>
            <a href="#allprograms" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
              {t('progprev.all')} <ArrowRight size={20} style={{ marginLeft: '10px' }} />
            </a>
          </div>

          <div className="programs-cards">
            <div className="prog-card prog-card-tall">
              <h3>{t('progprev.nyc')}</h3>
              <p>{t('progprev.nycSub')}</p>
              <span className="prog-detail">{t('progprev.nycDetail')}</span>
            </div>

            <div className="prog-card">
              <h3>{t('progprev.online')}</h3>
              <p>{t('progprev.onlineSub')}</p>
              <span className="prog-detail">{t('progprev.onlineDetail')}</span>
            </div>

            <div className="prog-card prog-card-img">
              <div className="prog-card-overlay">
                <h3>{t('progprev.retreat')}</h3>
                <p>{t('progprev.retreatSub')}</p>
              </div>
              <img src={mainImage} alt="Retreat" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
