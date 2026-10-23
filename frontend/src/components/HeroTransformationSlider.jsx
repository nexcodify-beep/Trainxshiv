import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Gift, Sparkles } from 'lucide-react';
import { useContent, useModal } from '../context';

export function HeroTransformationCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const { transforms } = useContent();
  const { open } = useModal();

  // Comprehensive transformation datasets matching the About Trainer Shivam Before/After card structure
  const fallbackTransforms = [
    {
      id: 1,
      name: 'Amit Kumar',
      goal: 'Fat Loss & Abs',
      result: '-12 KG',
      period: 'in 4 Months',
      image: '/images/transformations/ba7.png',
      beforeWeight: '78 KG',
      beforeFat: '26%',
      beforeTime: 'Month 1',
      afterWeight: '66 KG',
      afterFat: '14%',
      afterResult: '-12 KG',
    },
    {
      id: 2,
      name: 'Sneha Verma',
      goal: 'Fat Loss & Inch Loss',
      result: '-10 KG',
      period: 'in 3 Months',
      image: '/images/transformations/ba8.png',
      beforeWeight: '68 KG',
      beforeFat: '31%',
      beforeTime: 'Week 1',
      afterWeight: '58 KG',
      afterFat: '21%',
      afterResult: '-10 KG',
    },
    {
      id: 3,
      name: 'Rahul Mehta',
      goal: 'Lean Muscle Building',
      result: '+8 KG',
      period: 'in 5 Months',
      image: '/images/transformations/b9.png',
      beforeWeight: '55 KG',
      beforeFat: '13%',
      beforeTime: 'Month 1',
      afterWeight: '63 KG',
      afterFat: '11%',
      afterResult: '+8 KG',
    },
    {
      id: 4,
      name: 'Vikas Yadav',
      goal: 'Fat Loss & Core Strength',
      result: '-14 KG',
      period: 'in 6 Months',
      image: '/images/transformations/b10.png',
      beforeWeight: '84 KG',
      beforeFat: '28%',
      beforeTime: 'Month 1',
      afterWeight: '70 KG',
      afterFat: '15%',
      afterResult: '-14 KG',
    },
    {
      id: 5,
      name: 'Arjun Singh',
      goal: 'Body Recomposition',
      result: '-14 KG',
      period: 'in 5 Months',
      image: '/images/transformations/ba_2.png',
      beforeWeight: '86 KG',
      beforeFat: '29%',
      beforeTime: 'Month 1',
      afterWeight: '72 KG',
      afterFat: '16%',
      afterResult: '-14 KG',
    },
    {
      id: 6,
      name: 'Coach Shivam',
      goal: 'Natural Muscle Building',
      result: '+18 KG',
      period: 'Master Coach',
      beforeImg: '/images/trainers/shivan_before.jpg',
      afterImg: '/images/trainers/shivan_after.jpg',
      beforeWeight: '58 KG',
      beforeFat: '19%',
      beforeTime: '2018',
      afterWeight: '76 KG',
      afterFat: '10%',
      afterResult: '2024',
    },
  ];

  const items = transforms && transforms.length > 0 ? transforms : fallbackTransforms;

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, items.length]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const current = items[currentIndex] || items[0];

  return (
    <div
      className="hero-transform-card-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Meta & Slider Navigation */}
      <div className="home-hero-ba-topbar">
        <div className="home-hero-ba-meta">
          <span className="home-hero-ba-tag">Real Transformation</span>
          <div className="home-hero-ba-title-row">
            <h4 className="home-hero-ba-name">{current.name}</h4>
            <span className="home-hero-ba-result-pill">
              {current.result || current.afterResult} {current.period ? `• ${current.period}` : ''}
            </span>
          </div>
        </div>

        <div className="home-hero-ba-controls">
          <button
            type="button"
            className="home-ba-nav-btn"
            onClick={handlePrev}
            aria-label="Previous transformation"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="home-ba-counter">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            className="home-ba-nav-btn"
            onClick={handleNext}
            aria-label="Next transformation"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Dual Cards Matching About Trainer Shivam Before/After UI */}
      <div className="about-hero-visual home-hero-ba-cards">
        {/* Before Card */}
        <div className="hero-ba-card before-card">
          <div className="ba-badge before-badge">Before</div>
          <div className="ba-img-wrap">
            {current.beforeImg ? (
              <img
                src={current.beforeImg}
                alt={`${current.name} Before Transformation`}
                loading="eager"
              />
            ) : (
              <div className="ba-split-container">
                <img
                  src={current.image}
                  className="ba-split-img ba-split-before"
                  alt={`${current.name} Before Transformation`}
                  loading="eager"
                />
              </div>
            )}
          </div>
          <div className="ba-stats-footer">
            <div className="ba-stat-item">
              <strong>{current.beforeWeight || '78 KG'}</strong>
              <span>Body Weight</span>
            </div>
            <div className="ba-stat-item">
              <strong>{current.beforeFat || '26%'}</strong>
              <span>Body Fat</span>
            </div>
            <div className="ba-stat-item">
              <strong>{current.beforeTime || 'Baseline'}</strong>
              <span>Timeline</span>
            </div>
          </div>
        </div>

        {/* Center Circular Connector Arrow */}
        <div className="hero-ba-connector" aria-hidden="true">
          <ArrowRight size={18} />
        </div>

        {/* After Card */}
        <div className="hero-ba-card after-card">
          <div className="ba-badge after-badge">After</div>
          <div className="ba-img-wrap">
            {current.afterImg ? (
              <img
                src={current.afterImg}
                alt={`${current.name} After Transformation`}
                loading="eager"
              />
            ) : (
              <div className="ba-split-container">
                <img
                  src={current.image}
                  className="ba-split-img ba-split-after"
                  alt={`${current.name} After Transformation`}
                  loading="eager"
                />
              </div>
            )}
          </div>
          <div className="ba-stats-footer">
            <div className="ba-stat-item">
              <strong>{current.afterWeight || '66 KG'}</strong>
              <span>Body Weight</span>
            </div>
            <div className="ba-stat-item">
              <strong>{current.afterFat || '14%'}</strong>
              <span>Body Fat</span>
            </div>
            <div className="ba-stat-item">
              <strong>{current.afterResult || current.result || '-12 KG'}</strong>
              <span>Result</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots Indicator */}
      <div className="home-ba-dots">
        {items.map((item, idx) => (
          <button
            key={item.id || idx}
            type="button"
            className={`home-ba-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to transformation ${idx + 1}`}
          />
        ))}
      </div>

      {/* Prominent "Book Your Free Trial" Button directly below the transformation section */}
      <div className="home-hero-trial-cta-wrap">
        <button
          type="button"
          className="btn-book-free-trial"
          onClick={() => open && open('enroll', { plan: 'Free Trial Consultation' })}
          aria-label="Book Your Free Trial Consultation"
        >
          <div className="trial-btn-icon-box">
            <Gift size={20} />
          </div>
          <div className="trial-btn-text">
            <strong>Book Your Free Trial</strong>
            <span>Free 1-on-1 Fitness Strategy &amp; Diet Consultation</span>
          </div>
          <ArrowRight size={20} className="trial-btn-arrow" />
        </button>

        <div className="trial-btn-subnote">
          <ShieldCheck size={14} className="text-yellow" />
          <span>100% Free Consultation • Direct WhatsApp with Shivam • Zero Pressure</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroTransformationSlider() {
  return <HeroTransformationCard />;
}
