import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MessageSquare,
  Target,
  Dumbbell,
  Trophy,
  Play,
  Pause,
  RotateCw,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';

const PLANET_STEPS = [
  {
    id: 1,
    orbitNum: 1,
    title: '1-on-1 Discovery',
    tag: 'ORBIT 1 • IGNITION',
    desc: 'Free deep-dive consultation to analyze your body composition, daily schedule, eating habits and target goals.',
    icon: MessageSquare,
    color: '#0066FF',
    glow: 'rgba(0, 102, 255, 0.45)',
    radius: 120, // px from center
    speed: 22, // seconds per revolution
    initialAngle: 0,
    deliverables: ['Body Composition Audit', 'Target Goal Roadmap', 'Lifestyle Assessment'],
  },
  {
    id: 2,
    orbitNum: 2,
    title: 'Personalized Blueprint',
    tag: 'ORBIT 2 • TRAJECTORY',
    desc: 'Customized workout regimen and everyday Indian meal plan tailored strictly around your budget and timetable.',
    icon: Target,
    color: '#00D2FF',
    glow: 'rgba(0, 210, 255, 0.45)',
    radius: 190,
    speed: 34,
    initialAngle: 90,
    deliverables: ['Custom Calorie & Macro Target', 'Indian Veg / Non-Veg Diet', 'Home or Gym Workout Plan'],
  },
  {
    id: 3,
    orbitNum: 3,
    title: 'Guided Coaching & Form',
    tag: 'ORBIT 3 • ACCELERATION',
    desc: 'Direct daily 1-on-1 WhatsApp coaching, video form check-ups, and weekly adjustments based on real progress.',
    icon: Dumbbell,
    color: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.45)',
    radius: 265,
    speed: 46,
    initialAngle: 180,
    deliverables: ['Weekly Video Check-ins', 'Exercise Form Analysis', 'Continuous WhatsApp Support'],
  },
  {
    id: 4,
    orbitNum: 4,
    title: 'Peak Transformation',
    tag: 'ORBIT 4 • DESTINATION',
    desc: 'Sustainable fat loss, lean muscle gains, unmatched energy levels and confidence that lasts a lifetime.',
    icon: Trophy,
    color: '#FFB800',
    glow: 'rgba(255, 184, 0, 0.45)',
    radius: 340,
    speed: 60,
    initialAngle: 270,
    deliverables: ['Measurable Fat Loss / Muscle', 'Long-term Habit Mastery', 'Certified Transformation'],
  },
];

export default function SolarHowItWorks({ showHead = true }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through step details every 6s if not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % PLANET_STEPS.length) + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentStepData = PLANET_STEPS.find((p) => p.id === activeStep) || PLANET_STEPS[0];

  return (
    <div className="solar-system-wrapper" id="how-it-works-solar">
      {/* Background Cosmic Canvas Accents */}
      <div className="cosmic-bg" aria-hidden="true">
        <div className="cosmic-nebula nebula-1" />
        <div className="cosmic-nebula nebula-2" />
        <div className="cosmic-nebula nebula-3" />
        {/* Star speckles */}
        <div className="star-field" />
      </div>

      {/* Header Block */}
      {showHead ? (
        <div className="solar-head-block center">
          <div className="solar-eyebrow">
            <Sparkles size={14} className="solar-sparkle-icon" />
            <span>Continuous Transformation Orbit</span>
          </div>
          <h3 className="solar-title">
            How It Works — <span className="solar-title-hl">The Transformation Solar Orbit</span>
          </h3>
          <p className="solar-subtitle">
            Just like planets orbiting the sun, your entire fitness ecosystem—training, diet, and coaching—revolves continuously around YOUR transformation goal.
          </p>

          {/* Orbit Controls */}
          <div className="solar-controls">
            <button
              className={`solar-ctrl-btn ${isPaused ? 'paused' : ''}`}
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume Orbit Motion' : 'Pause Orbit Motion'}
            >
              {isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} />}
              <span>{isPaused ? 'Resume Orbits' : 'Pause Orbits'}</span>
            </button>
            <div className="orbit-live-badge">
              <span className="live-pulse-dot" />
              <span>Orbiting Around Your Goal</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="solar-controls" style={{ marginBottom: 20 }}>
          <button
            className={`solar-ctrl-btn ${isPaused ? 'paused' : ''}`}
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume Orbit Motion' : 'Pause Orbit Motion'}
          >
            {isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} />}
            <span>{isPaused ? 'Resume Orbits' : 'Pause Orbits'}</span>
          </button>
          <div className="orbit-live-badge">
            <span className="live-pulse-dot" />
            <span>Orbiting Around Your Goal</span>
          </div>
        </div>
      )}

      {/* ================= SOLAR REVOLUTION STAGE ================= */}
      <div className="solar-stage-container">
        <div className={`solar-stage ${isPaused ? 'orbits-paused' : ''}`}>
          {/* SVG OSCILLATING SOLAR FLARE / BEAM LINES (Out to end & returning back) */}
          <svg className="solar-ray-svg" viewBox="0 0 740 740" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="solarRayGrad" x1="50%" y1="50%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0066FF" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#00D2FF" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
              </linearGradient>

              <radialGradient id="sunGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="25%" stopColor="#60A5FA" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#0066FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#020817" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 12 Radiant Laser Beams that oscillate outward to the perimeter and return back */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
              <g key={angle} transform={`rotate(${angle} 370 370)`}>
                <line
                  x1="370"
                  y1="370"
                  x2="370"
                  y2="30"
                  className={`oscillating-solar-ray ray-anim-${(idx % 4) + 1}`}
                  stroke="url(#solarRayGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="16 120"
                />
              </g>
            ))}

            {/* Gravitational Wave Ripple Rings expanding outward */}
            <circle cx="370" cy="370" r="85" className="gravity-ripple ripple-1" />
            <circle cx="370" cy="370" r="85" className="gravity-ripple ripple-2" />
            <circle cx="370" cy="370" r="85" className="gravity-ripple ripple-3" />
          </svg>

          {/* 4 ORBITAL TRACKS WITH TRAVELING COMETS AND REVOLVING PLANETS */}
          {PLANET_STEPS.map((planet) => {
            const IconComponent = planet.icon;
            const isActive = activeStep === planet.id;

            return (
              <div
                key={planet.id}
                className={`orbital-ring-track track-${planet.orbitNum} ${isActive ? 'track-active' : ''}`}
                style={{
                  width: `${planet.radius * 2}px`,
                  height: `${planet.radius * 2}px`,
                  animationDuration: `${planet.speed}s`,
                }}
              >
                {/* SVG Comet Trail on this track */}
                <svg
                  className="orbital-comet-svg"
                  viewBox={`0 0 ${planet.radius * 2} ${planet.radius * 2}`}
                >
                  <circle
                    cx={planet.radius}
                    cy={planet.radius}
                    r={planet.radius - 1}
                    className="comet-path-stroke"
                    stroke={planet.color}
                    strokeWidth={isActive ? '2.5' : '1.5'}
                    strokeDasharray="40 240"
                  />
                </svg>

                {/* THE REVOLVING PLANET / STEP STATION */}
                <div
                  className={`planet-node-wrapper node-${planet.orbitNum} ${isActive ? 'is-active-planet' : ''}`}
                  onClick={() => {
                    setActiveStep(planet.id);
                    setIsPaused(true);
                  }}
                  title={`Click to view Step ${planet.id}: ${planet.title}`}
                >
                  {/* Planet Sphere */}
                  <div
                    className="planet-sphere"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${planet.color} 55%, #051438 100%)`,
                      boxShadow: `0 0 16px ${planet.glow}, 0 0 28px ${planet.glow}`,
                    }}
                  >
                    {/* Counter-rotating container so icon & text stay upright */}
                    <div
                      className="planet-content-counter"
                      style={{ animationDuration: `${planet.speed}s` }}
                    >
                      <IconComponent size={16} className="planet-icon" />
                      <span className="planet-num-badge">0{planet.id}</span>
                    </div>
                  </div>

                  {/* Planet Orbiting Label */}
                  <div
                    className="planet-label-counter"
                    style={{ animationDuration: `${planet.speed}s` }}
                  >
                    <span className="planet-label-text">{planet.title}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ================= THE SUN (CENTER HUB) ================= */}
          <div className="sun-center-core" onClick={() => setIsPaused(!isPaused)}>
            <div className="sun-corona-glow" />
            <div className="sun-corona-rays" />
            <div className="sun-body">
              <div className="sun-inner-glow">
                <Flame size={24} className="sun-flame-icon" />
                <span className="sun-title">YOUR GOAL</span>
                <span className="sun-sub">CENTER OF GRAVITY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= INTERACTIVE STEP CARDS GRID ================= */}
      <div className="solar-cards-container">
        <div className="solar-cards-grid">
          {PLANET_STEPS.map((step) => {
            const IconComp = step.icon;
            const isSelected = activeStep === step.id;

            return (
              <div
                key={step.id}
                className={`solar-step-card ${isSelected ? 'card-selected' : ''}`}
                onClick={() => {
                  setActiveStep(step.id);
                  setIsPaused(true);
                }}
                style={{
                  '--step-accent': step.color,
                  '--step-glow': step.glow,
                }}
              >
                <div className="card-top-row">
                  <div className="step-orbit-pill" style={{ borderColor: step.color, color: step.color }}>
                    <span className="pill-dot" style={{ background: step.color }} />
                    {step.tag}
                  </div>
                  <span className="step-num-large">0{step.id}</span>
                </div>

                <div className="card-icon-title">
                  <div className="step-card-ico" style={{ background: `linear-gradient(135deg, ${step.color}, #091E42)` }}>
                    <IconComp size={20} color="#FFFFFF" />
                  </div>
                  <h4>{step.title}</h4>
                </div>

                <p className="step-card-desc">{step.desc}</p>

                <div className="step-deliverables-list">
                  {step.deliverables.map((item, i) => (
                    <div key={i} className="deliverable-item">
                      <CheckCircle2 size={13} style={{ color: step.color, flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="card-indicator-line" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
