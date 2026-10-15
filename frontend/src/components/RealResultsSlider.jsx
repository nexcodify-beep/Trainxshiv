import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight,
  Play, Pause, Volume2, VolumeX, Maximize2,
  MapPin, ArrowRight, Star, TrendingUp, Calendar, Zap, Lock, Quote,
} from 'lucide-react';

const SLIDES = [
  {
    id: 1, name: 'Amit Kumar', profession: 'Software Engineer', location: 'Noida, UP',
    avatar: '/images/transformations/ba7.png', baImage: '/images/transformations/ba7.png',
    beforeWeight: '78 KG', afterWeight: '66 KG', result: '-12 KG', duration: '4 Months',
    tag: 'Fat Loss',
    quote: 'With proper guidance and consistent workouts, I lost 12 kg and feel more confident than ever before!',
    stats: [{ icon: Lock, value: '-12 KG', label: 'Lost' }, { icon: Calendar, value: '4 Mo', label: 'Duration' }, { icon: Zap, value: '100%', label: 'Energy' }, { icon: TrendingUp, value: '↑', label: 'Confidence' }],
    videoSrc: '/videos/review1.mp4', videoTotalSeconds: 16,
  },
  {
    id: 2, name: 'Sneha Verma', profession: 'Marketing Lead', location: 'Lucknow, UP',
    avatar: '/images/transformations/ba8.png', baImage: '/images/transformations/ba8.png',
    beforeWeight: '68 KG', afterWeight: '58 KG', result: '-10 KG', duration: '3 Months',
    tag: 'Weight Loss',
    quote: 'Lost 10 kg and dropped 3 dress sizes in just 90 days. Best coaching decision ever!',
    stats: [{ icon: Lock, value: '-10 KG', label: 'Lost' }, { icon: Calendar, value: '3 Mo', label: 'Duration' }, { icon: Zap, value: '100%', label: 'Consistent' }, { icon: TrendingUp, value: '↑', label: 'Health' }],
    videoSrc: '/videos/review2.mp4', videoTotalSeconds: 26,
  },
  {
    id: 3, name: 'Rahul Mehta', profession: 'Business Analyst', location: 'Delhi, NCR',
    avatar: '/images/transformations/b9.png', baImage: '/images/transformations/b9.png',
    beforeWeight: '55 KG', afterWeight: '63 KG', result: '+8 KG', duration: '5 Months',
    tag: 'Muscle Gain',
    quote: 'Gained 8 kg of solid muscle and doubled my bench press with proper form coaching!',
    stats: [{ icon: Lock, value: '+8 KG', label: 'Gained' }, { icon: Calendar, value: '5 Mo', label: 'Duration' }, { icon: Zap, value: '2×', label: 'Strength' }, { icon: TrendingUp, value: '↑', label: 'Posture' }],
    videoSrc: '/videos/review3.mp4', videoTotalSeconds: 44,
  },
  {
    id: 4, name: 'Vikas Yadav', profession: 'Architect', location: 'Gurgaon, HR',
    avatar: '/images/transformations/b10.png', baImage: '/images/transformations/b10.png',
    beforeWeight: '82 KG', afterWeight: '72 KG', result: '-10 KG', duration: '6 Months',
    tag: 'Fat Loss',
    quote: 'Visible abs for the first time in my life at 32. Highly recommended!',
    stats: [{ icon: Lock, value: '-10 KG', label: 'Lost' }, { icon: Calendar, value: '6 Mo', label: 'Duration' }, { icon: Zap, value: '100%', label: 'Transformed' }, { icon: TrendingUp, value: '↑', label: 'Stamina' }],
    videoSrc: '/videos/review4.mp4', videoTotalSeconds: 33,
  },
  {
    id: 5, name: 'Arjun Singh', profession: 'Chartered Accountant', location: 'Mumbai, MH',
    avatar: '/images/transformations/ba_2.png', baImage: '/images/transformations/ba_2.png',
    beforeWeight: '88 KG', afterWeight: '74 KG', result: '-14 KG', duration: '5 Months',
    tag: 'Fat Loss',
    quote: 'Cut down 14 kg of stubborn belly fat while maintaining desk job hours!',
    stats: [{ icon: Lock, value: '-14 KG', label: 'Lost' }, { icon: Calendar, value: '5 Mo', label: 'Duration' }, { icon: Zap, value: '100%', label: 'Energy' }, { icon: TrendingUp, value: 'Peak', label: 'Vigor' }],
    videoSrc: '/videos/review5.mp4', videoTotalSeconds: 49,
  },
];

export default function RealResultsSlider() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const videoRef = useRef(null);
  const slide = SLIDES[idx];

  const go = (n) => {
    setPlaying(false);
    setCurrentTime(0);
    setAnimKey(k => k + 1);
    setIdx((prev) => (prev + n + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(slide.videoTotalSeconds || 0);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, [idx]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause(); setPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const dur = duration || slide.videoTotalSeconds;
    if (videoRef.current && dur > 0)
      videoRef.current.currentTime = Math.max(0, Math.min(dur, pos * dur));
  };

  const fmt = (s) => { const v = Math.floor(s || 0); return `${Math.floor(v / 60)}:${(v % 60).toString().padStart(2, '0')}`; };
  const dur = duration || slide.videoTotalSeconds || 1;
  const progress = Math.min(100, (currentTime / dur) * 100);

  return (
    <section className="rr-section" id="real-results">
      {/* Background decor */}
      <div className="rr-bg-orb rr-orb1" />
      <div className="rr-bg-orb rr-orb2" />

      <div className="container rr-wrap">

        {/* ── HEADER ── */}
        <div className="rr-head">
          <div className="rr-head-left">
            <div className="rr-eyebrow">
              <span className="rr-eyebrow-dot" />
              Real Transformations
            </div>
            <h2 className="rr-h2">Real People.<br /><span className="rr-h2-blue">Real Results.</span></h2>
            <p className="rr-sub">100% natural, verified results from real TrainXShiv clients across India.</p>
          </div>
          <div className="rr-head-right">
            <div className="rr-trust-row">
              <div className="rr-trust-stat"><span className="rr-trust-num">500+</span><span className="rr-trust-lbl">Happy Clients</span></div>
              <div className="rr-trust-div" />
              <div className="rr-trust-stat"><span className="rr-trust-num">8+</span><span className="rr-trust-lbl">Countries</span></div>
              <div className="rr-trust-div" />
              <div className="rr-trust-stat"><span className="rr-trust-num">98%</span><span className="rr-trust-lbl">Success Rate</span></div>
            </div>
            <Link to="/transformations" className="rr-view-btn">View All Results <ArrowRight size={15} /></Link>
          </div>
        </div>

        {/* ── MAIN SLIDER ── */}
        <div className="rr-slider-outer">
          {/* Nav Arrows */}
          <button className="rr-nav rr-nav-l" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft size={22} /></button>
          <button className="rr-nav rr-nav-r" onClick={() => go(1)} aria-label="Next"><ChevronRight size={22} /></button>

          <div className="rr-card" key={animKey}>

            {/* ── LEFT: Photo ── */}
            <div className="rr-photo-panel">
              <div className="rr-photo-inner">
                <img src={slide.baImage} alt={`${slide.name} transformation`} className="rr-photo-img" />
                {/* Gradient overlay bottom */}
                <div className="rr-photo-overlay" />
                {/* Tags */}
                <div className="rr-photo-tags">
                  <span className="rr-ptag rr-ptag-before">BEFORE<br /><strong>{slide.beforeWeight}</strong></span>
                  <span className="rr-ptag rr-ptag-after">AFTER<br /><strong>{slide.afterWeight}</strong></span>
                </div>
                {/* Result badge */}
                <div className="rr-result-badge">
                  <span className="rr-result-val">{slide.result}</span>
                  <span className="rr-result-dur">in {slide.duration}</span>
                </div>
                {/* Goal tag */}
                <div className="rr-goal-chip">{slide.tag}</div>
              </div>
            </div>

            {/* ── MIDDLE: Info ── */}
            <div className="rr-info-panel">
              {/* Client header */}
              <div className="rr-client-header">
                <img src={slide.avatar} alt={slide.name} className="rr-avatar" />
                <div className="rr-client-meta">
                  <div className="rr-client-name">{slide.name}</div>
                  <div className="rr-client-prof">{slide.profession}</div>
                  <div className="rr-client-loc"><MapPin size={11} />{slide.location}</div>
                </div>
                <div className="rr-stars-col">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
                  <span className="rr-verified">Verified</span>
                </div>
              </div>

              {/* Quote */}
              <div className="rr-quote-box">
                <Quote size={28} className="rr-quote-icon" />
                <p className="rr-quote-text">{slide.quote}</p>
              </div>

              {/* Stats */}
              <div className="rr-stats-row">
                {slide.stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="rr-stat-box">
                      <div className="rr-stat-icon-wrap"><Icon size={14} /></div>
                      <div className="rr-stat-val">{s.value}</div>
                      <div className="rr-stat-lbl">{s.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Progress indicator */}
              <div className="rr-slide-progress">
                <div className="rr-slide-num">{String(idx + 1).padStart(2, '0')} <span>/ {String(SLIDES.length).padStart(2, '0')}</span></div>
                <div className="rr-slide-track">
                  <div className="rr-slide-fill" style={{ width: `${((idx + 1) / SLIDES.length) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* ── RIGHT: Video ── */}
            <div className="rr-video-panel">
              <div className="rr-video-card" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  key={slide.videoSrc}
                  src={slide.videoSrc}
                  className="rr-video-el"
                  playsInline preload="metadata" muted={muted}
                  onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                  onLoadedMetadata={() => videoRef.current?.duration && setDuration(videoRef.current.duration)}
                  onEnded={() => { setPlaying(false); setTimeout(() => go(1), 600); }}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />

                {/* Top label */}
                <div className="rr-vid-label"><Play size={11} fill="#fff" />Client Review</div>

                {/* Play button */}
                <div className={`rr-vid-play ${playing ? 'rr-vid-play-hide' : ''}`}>
                  <div className="rr-vid-play-ring" />
                  <Play size={24} fill="#fff" style={{ marginLeft: 3 }} />
                </div>

                {/* Controls */}
                <div className="rr-vid-controls" onClick={e => e.stopPropagation()}>
                  <div className="rr-vid-progress" onClick={handleSeek}>
                    <div className="rr-vid-fill" style={{ width: `${progress}%` }} />
                    <div className="rr-vid-thumb" style={{ left: `${progress}%` }} />
                  </div>
                  <div className="rr-vid-bar">
                    <button className="rr-vid-btn" onClick={togglePlay}>
                      {playing ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
                    </button>
                    <span className="rr-vid-time">{fmt(currentTime)} / {fmt(dur)}</span>
                    <div style={{ flex: 1 }} />
                    <button className="rr-vid-btn" onClick={e => { e.stopPropagation(); if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); } }}>
                      {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
                    <button className="rr-vid-btn" onClick={e => { e.stopPropagation(); videoRef.current?.requestFullscreen?.(); }}>
                      <Maximize2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── DOTS ── */}
        <div className="rr-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`rr-dot${i === idx ? ' rr-dot-on' : ''}`} onClick={() => { setAnimKey(k => k + 1); setIdx(i); }} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

      </div>
    </section>
  );
}
