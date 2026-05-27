import React from 'react';
import { Link } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Booking.css';

export default function Booking() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    const introText = isRtl
        ? "أنت على بعد خطوة واحدة من تحقيق أهدافك. في هذه المكالمة المجانية، سنناقش طموحاتك الرياضية والحواجز التي تواجهك، لنقوم ببناء خطة محكمة وتدريب مخصص يناسب نمط حياتك. لا تتردد، حان وقت التغيير الحقيقي نحو الأفضل."
        : "You are one step away from achieving your goals. In this free discovery call, we'll discuss your fitness ambitions and barriers, so we can build a tight strategy and tailored training program that perfectly fits your lifestyle. No more excuses, it's time for real change.";

    return (
        <div className="booking-page animate-fade-in">
            <div className="booking-split">

                {/* Text Half */}
                <div className="booking-text-side animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="booking-nav">
                        <Link to="/" className="btn-outline back-btn">
                            {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t('book.back')}
                        </Link>
                    </div>

                    <div className="booking-header" style={{ textAlign: "start" }}>
                        <h1>{t('book.title')}</h1>
                        <p>{t('book.desc')}</p>
                    </div>

                    <div className="booking-extended-text">
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "2.5rem" }}>
                            {introText}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: "rgba(255,255,255,0.9)" }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <CheckCircle size={22} color="#ff4d00" />
                                <span style={{ fontSize: '1.1rem' }}>{isRtl ? "تقييم أولي شامل" : "Comprehensive Baseline Assessment"}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <CheckCircle size={22} color="#ff4d00" />
                                <span style={{ fontSize: '1.1rem' }}>{isRtl ? "استراتيجية تغذية مخصصة" : "Personalized Nutrition Strategy"}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <CheckCircle size={22} color="#ff4d00" />
                                <span style={{ fontSize: '1.1rem' }}>{isRtl ? "خطة تدريب وتوجيه دائم" : "Continuous Coaching & Guidance"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendly Half */}
                <div className="booking-widget-side animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="calendly-wrapper">
                        <InlineWidget url="https://calendly.com/seifislem-benrabah" styles={{ height: '500px' }} />
                    </div>
                </div>

            </div>
        </div >
    );
}
