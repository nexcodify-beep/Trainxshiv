import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { TRANSFORMS } from '../data';

export default function HeroTransformationSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const items = TRANSFORMS;

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const current = items[currentIndex];

  // Visible preview thumbnails around active
  const prevItem = items[(currentIndex - 1 + items.length) % items.length];
  const nextItem = items[(currentIndex + 1) % items.length];

  return (
    <section
      className="hero-cards-only-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-slider-glow-left" />
      <div className="hero-slider-glow-right" />

      <div className="hero-cards-track-container">
        {/* Left Peek Card (Desktop) */}
        <div 
          className="h-peek-card peek-left"
          onClick={handlePrev}
          role="button"
          tabIndex={0}
          aria-label="Previous transformation card"
        >
          <img src={prevItem.image} alt="Previous Transformation" />
          <div className="h-peek-overlay">
            <span>{prevItem.name}</span>
          </div>
        </div>

        {/* Main Active Transformation Card */}
        <div className="h-main-active-card">
          {/* Card Top Info Header */}
          <div className="h-slide-header">
            <div className="h-client-info">
              <span className="h-client-name">{current.name}</span>
              <span className="h-client-goal">{current.goal}</span>
            </div>
            <div className="h-badge-result">
              <TrendingUp size={14} />
              <span>{current.result}</span>
              <small>({current.period})</small>
            </div>
          </div>

          {/* Full Before & After Photo View */}
          <div className="h-slide-stage">
            <img
              key={current.id}
              src={current.image}
              alt={`${current.name} Before & After Transformation`}
              className="h-slide-img"
            />
            <span className="h-tag-before">BEFORE</span>
            <span className="h-tag-after">AFTER</span>
          </div>

          {/* Card Footer with Controls */}
          <div className="h-slide-footer">
            <div className="h-slider-dots">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`h-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="h-nav-arrows">
              <button
                type="button"
                className="h-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous transformation"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="h-counter-text">
                <b>{currentIndex + 1}</b> / {items.length}
              </span>
              <button
                type="button"
                className="h-arrow-btn"
                onClick={handleNext}
                aria-label="Next transformation"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Peek Card (Desktop) */}
        <div 
          className="h-peek-card peek-right"
          onClick={handleNext}
          role="button"
          tabIndex={0}
          aria-label="Next transformation card"
        >
          <img src={nextItem.image} alt="Next Transformation" />
          <div className="h-peek-overlay">
            <span>{nextItem.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
