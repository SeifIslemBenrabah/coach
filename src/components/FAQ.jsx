import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './FAQ.css';

export default function FAQ() {
  const { t } = useTranslation();
  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') }
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq bg-light section-padding">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-intro">
            <h2>{t('faq.title')}</h2>
            <p>{t('faq.desc')}</p>
            <a href="#contact" className="btn-outline mt-3">{t('faq.contact')}</a>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openIdx === i ? 'open' : ''}`}
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  {openIdx === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
