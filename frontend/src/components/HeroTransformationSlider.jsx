import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { useContent, useModal } from '../context';

export function HeroTransformationCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const { transforms } = useContent();
  const { open } = useModal();

  const fallbackTransforms = [
    { id: 1, name: 'Amit Kumar', image: '/images/transformations/ba7.png' },
    { id: 2, name: 'Sneha Verma', image: '/images/transformations/ba8.png' },
    { id: 3, name: 'Rahul Mehta', image: '/images/transformations/b9.png' },
    { id: 4, name: 'Vikas Yadav', image: '/images/transformations/b10.png' },
    { id: 5, name: 'Arjun Singh', image: '/images/transformations/ba_2.png' },
  ];

  const items = transforms && transforms.length > 0 ? transforms : fallbackTransforms;

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4200);
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
      {/* Transformation Poster Card shaped according to the image */}
      <div
        className="hero-poster-card"
        onClick={() => open && open('enroll')}
        role="button"
        tabIndex={0}
        aria-label="View transformation and enroll"
      >
        <img
          key={current.id || currentIndex}
          src={current.image}
          alt={current.name ? `${current.name} Transformation` : 'Client Transformation'}
          className="hero-poster-img"
          onError={(e) => {
            e.target.src = '/images/transformations/ba7.png';
          }}
        />

        {/* Floating Slide Navigation Arrows */}
        <button
          type="button"
          className="poster-nav-btn poster-prev-btn"
          onClick={handlePrev}
          aria-label="Previous transformation"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          className="poster-nav-btn poster-next-btn"
          onClick={handleNext}
          aria-label="Next transformation"
        >
          <ChevronRight size={20} />
        </button>

        {/* Floating Bottom Navigation Bar */}
        <div className="poster-bottom-bar" onClick={(e) => e.stopPropagation()}>
          <div className="poster-dots">
            {items.map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                className={`poster-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to transformation ${idx + 1}`}
              />
            ))}
          </div>
          <span className="poster-counter">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Floating Trust Pill Below Card */}
      <div className="hero-transform-floating-badge">
        <ShieldCheck size={16} className="text-yellow" />
        <span>100% Real Client Transformations</span>
      </div>
    </div>
  );
}

export default function HeroTransformationSlider() {
  return <HeroTransformationCard />;
}
