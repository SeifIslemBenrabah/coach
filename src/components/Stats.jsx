import React from 'react';
import { useTranslation } from 'react-i18next';
import './Stats.css';

export default function Stats() {
  const { t } = useTranslation();
  const stats = [
    { value: t('stats.clients'), label: t('stats.clientsLabel'), sub: t('stats.clientsSub') },
    { value: t('stats.success'), label: t('stats.successLabel'), sub: t('stats.successSub') },
    { value: t('stats.days'), label: t('stats.daysLabel'), sub: t('stats.daysSub') },
    { value: t('stats.progress'), label: t('stats.progressLabel'), sub: t('stats.progressSub') }
  ];
  return (
    <section className="stats bg-light section-padding">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s,i) => (
             <div key={i} className="stat-item animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
               <h3>{s.value}</h3>
               <p className="stat-label">{s.label}</p>
               <p className="stat-sub">{s.sub}</p>
             </div>
          ))}
        </div>
      </div>
    </section>
  )
}
