import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <section id="contact" className="contact bg-light section-padding">
        <div className="container">
          <div className="contact-grid">
            <div className="process-side">
              <h2>{t('foot.ctatitle')}</h2>
              <p className="process-desc">{t('foot.ctadesc')}</p>

              <div className="process-steps">
                <div className="process-step">
                  <div className="step-num">01</div>
                  <div className="step-txt">
                    <h4>{t('foot.s1Title')}</h4>
                    <p>{t('foot.s1Desc')}</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-num">02</div>
                  <div className="step-txt">
                    <h4>{t('foot.s2Title')}</h4>
                    <p>{t('foot.s2Desc')}</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-num">03</div>
                  <div className="step-txt">
                    <h4>{t('foot.s3Title')}</h4>
                    <p>{t('foot.s3Desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-side">
              <div className="form-box">
                <h3>{t('foot.fTitle')}</h3>
                <p>{t('foot.fDesc')}</p>
                <form>
                  <input type="text" placeholder={t('foot.name')} />
                  <input type="email" placeholder={t('foot.email')} />
                  <textarea placeholder={t('foot.message')}></textarea>
                  <button type="button" className="btn-primary w-100 btn-submit">
                    {t('foot.send')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer dark-footer">
        <div className="container-footer">
          <div className="footer-content">
            <div className="footer-logo">Coach Amine</div>
            <div className="footer-links">
              <a href="#">{t('nav.programs')}</a>
              <a href="#">{t('nav.about')}</a>
              <a href="#">{t('foot.contact')}</a>
            </div>
            <div className="footer-social">
              <a href='https://www.instagram.com/seif_pcrafter/' target="_blank">IG</a>
              <a href='https://wa.me/213660987635' target="_blank">WA</a>
              <a href='https://www.facebook.com/share/1GQJgu7Hi3/?mibextid=wwXIfr' target="_blank">FB</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t('foot.rights')}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
