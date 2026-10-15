import React, { useState, useEffect } from 'react';
import { Dumbbell, Flame, Sparkles, CheckCircle2 } from 'lucide-react';

const CRITICAL_ASSETS = [
  '/logo.png',
  '/images/hero.png',
  '/images/trainers/shivan.png',
  '/images/trainers/shivan_hero.png',
  '/images/trainers/shivan_before.jpg',
  '/images/trainers/shivan_after.jpg',
  '/images/trainers/shivan_before.jpg',
  '/images/transformations/ba7.png',
  '/images/transformations/ba8.png',
  '/images/transformations/b9.png',
  '/images/transformations/b10.png',
  '/images/transformations/ba_2.png',
  '/images/fat-loss.jpg',
  '/images/muscle.jpg',
  '/images/weight-gain.jpg',
  '/images/toning.jpg',
  '/images/personal.jpg',
  '/images/online.jpg',
  '/images/nutrition.jpg',
  '/images/diet.jpg',
  '/images/workout.jpg',
];

const STATUS_MESSAGES = [
  { threshold: 0, text: 'Igniting Fitness Engine...' },
  { threshold: 22, text: 'Preloading Workout Regimens...' },
  { threshold: 45, text: 'Caching Coach Portfolios & Videos...' },
  { threshold: 70, text: 'Calibrating Nutrition & Macro Data...' },
  { threshold: 90, text: 'Unleashing Your Transformation...' },
];

export default function FitnessPreloader({ onFinish }) {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('Igniting Fitness Engine...');
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = CRITICAL_ASSETS.length;
    let targetPercent = 0;

    // Preload each asset
    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      const onAssetDone = () => {
        loadedCount += 1;
        targetPercent = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
      };
      img.onload = onAssetDone;
      img.onerror = onAssetDone; // Never hang if a network hiccup occurs
      img.src = src;
    });

    // Safety fallback: ensure 100% within 3.2s
    const safetyTimer = setTimeout(() => {
      targetPercent = 100;
    }, 2800);

    // Smooth progress ticker
    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev < targetPercent ? prev + Math.max(1, Math.ceil((targetPercent - prev) * 0.2)) : prev;
        
        // Update status text
        const matched = STATUS_MESSAGES.slice().reverse().find((m) => next >= m.threshold);
        if (matched) setStatusText(matched.text);

        if (next >= 100) {
          clearInterval(interval);
          clearTimeout(safetyTimer);
          setIsDone(true);
          // Start exit curtain transition
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 600);
          }, 350);
          return 100;
        }
        return next;
      });
    }, 35);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, [onFinish]);

  // Circular gauge calculations (r=72, circumference=~452)
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className={`fitness-preloader-overlay ${isExiting ? 'preloader-exit' : ''}`} aria-hidden="true">
      {/* Background Ambience Nebula Waves */}
      <div className="preloader-bg-glow glow-1" />
      <div className="preloader-bg-glow glow-2" />
      <div className="preloader-grid-lines" />

      <div className="fitness-preloader-card">
        {/* Central Circular Progress Gauge with Logo Inside */}
        <div className="preloader-gauge-container">
          <svg className="preloader-gauge-svg" viewBox="0 0 180 180">
            <defs>
              <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0066FF" />
                <stop offset="50%" stopColor="#00D2FF" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
              <filter id="gaugeGlow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Inactive Base Track */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              className="gauge-track-bg"
            />

            {/* Glowing Active Progress Fill */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              className="gauge-track-fill"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              filter="url(#gaugeGlow)"
            />
          </svg>

          {/* LOGO INSIDE THE CIRCLE */}
          <div className="preloader-circle-center-content">
            <div className="preloader-inner-logo-holder">
              <img src="/logo.png" alt="TrainXShiv" className="preloader-inner-logo-img" />
              <div className="preloader-logo-ambient-ring" />
              {/* Mini Dumbbell Fitness Badge */}
              <div className="preloader-dumbbell-mini-badge" title="TrainXShiv Fitness">
                <Dumbbell size={15} />
              </div>
            </div>
          </div>
        </div>

        {/* Numeric Live Counter */}
        <div className="preloader-counter-row">
          <span className="preloader-number">{percent}</span>
          <span className="preloader-percent-symbol">%</span>
        </div>

        {/* Live Status Message */}
        <div className="preloader-status-strip">
          <span className="preloader-status-dot" />
          <span className="preloader-status-text">{statusText}</span>
        </div>

        {/* Progress Bar Line */}
        <div className="preloader-bar-track">
          <div className="preloader-bar-fill" style={{ width: `${percent}%` }} />
        </div>

        {/* Brand Tagline */}
        <p className="preloader-brand-sub">
          TRAIN YOUR BODY • TRANSFORM YOUR LIFE
        </p>
      </div>
    </div>
  );
}

