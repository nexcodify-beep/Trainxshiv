import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight,
  Play, Pause, Volume2, VolumeX, Maximize2,
  MapPin, ArrowRight, Star, TrendingUp, Calendar, Zap, Lock,
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    name: 'Amit Kumar',
    profession: 'Software Engineer',
    location: 'Noida, UP',
    avatar: '/images/transformations/client_1.jpg',
    baImage: '/images/transformations/ba_1.png',
    beforeWeight: '78 KG', afterWeight: '66 KG',
    result: '-12 KG', duration: '4 Months',
    quote: 'With proper guidance and consistent workouts, I lost 12 kg and feel more confident than ever before!',
    stats: [
      { icon: Lock, value: '-12 KG', label: 'Weight Lost' },
      { icon: Calendar, value: '4 Mo', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Energy' },
      { icon: TrendingUp, value: '↑', label: 'Confidence' },
    ],
    videoSrc: '/videos/review1.mp4',
    videoTotalSeconds: 16,
  },
  {
    id: 2,
    name: 'Sneha Verma',
    profession: 'Marketing Lead',
    location: 'Lucknow, UP',
    avatar: '/images/transformations/client_2.jpg',
    baImage: '/images/transformations/ba_2.png',
    beforeWeight: '68 KG', afterWeight: '58 KG',
    result: '-10 KG', duration: '3 Months',
    quote: 'Lost 10 kg and dropped 3 dress sizes in just 90 days. Best coaching decision ever!',
    stats: [
      { icon: Lock, value: '-10 KG', label: 'Weight Lost' },
      { icon: Calendar, value: '3 Mo', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Consistent' },
      { icon: TrendingUp, value: '↑', label: 'Health' },
    ],
    videoSrc: '/videos/review2.mp4',
    videoTotalSeconds: 26,
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    profession: 'Business Analyst',
    location: 'Delhi, NCR',
    avatar: '/images/transformations/client_3.jpeg',
    baImage: '/images/transformations/ba_3.png',
    beforeWeight: '55 KG', afterWeight: '63 KG',
    result: '+8 KG', duration: '5 Months',
    quote: 'Gained 8 kg of solid muscle and doubled my bench press with proper form coaching!',
    stats: [
      { icon: Lock, value: '+8 KG', label: 'Lean Mass' },
      { icon: Calendar, value: '5 Mo', label: 'Duration' },
      { icon: Zap, value: '2×', label: 'Strength' },
      { icon: TrendingUp, value: '↑', label: 'Posture' },
    ],
    videoSrc: '/videos/review3.mp4',
    videoTotalSeconds: 44,
  },
  {
    id: 4,
    name: 'Vikas Yadav',
    profession: 'Architect',
    location: 'Gurgaon, HR',
    avatar: '/images/transformations/ba_4.jpg',
    baImage: '/images/transformations/ba_4.jpg',
    beforeWeight: '82 KG', afterWeight: '72 KG',
    result: '-10 KG', duration: '6 Months',
    quote: 'Visible abs for the first time in my life at 32. Highly recommended!',
    stats: [
      { icon: Lock, value: '-10 KG', label: 'Body Fat' },
      { icon: Calendar, value: '6 Mo', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Transformed' },
      { icon: TrendingUp, value: '↑', label: 'Stamina' },
    ],
    videoSrc: '/videos/review4.mp4',
    videoTotalSeconds: 33,
  },
  {
    id: 5,
    name: 'Arjun Singh',
    profession: 'Chartered Accountant',
    location: 'Mumbai, MH',
    avatar: '/images/transformations/ba_5.jpg',
    baImage: '/images/transformations/ba_5.jpg',
    beforeWeight: '88 KG', afterWeight: '74 KG',
    result: '-14 KG', duration: '5 Months',
    quote: 'Cut down 14 kg of stubborn belly fat while maintaining desk job hours!',
    stats: [
      { icon: Lock, value: '-14 KG', label: 'Fat Loss' },
      { icon: Calendar, value: '5 Mo', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Energy' },
      { icon: TrendingUp, value: 'Peak', label: 'Vigor' },
    ],
    videoSrc: '/videos/review5.mp4',
    videoTotalSeconds: 49,
  },
  {
    id: 6,
    name: 'Karan Gupta',
    profession: 'Tech Lead',
    location: 'Bangalore, KA',
    avatar: '/images/transformations/ba_6.jpg',
    baImage: '/images/transformations/ba_6.jpg',
    beforeWeight: '76 KG', afterWeight: '67 KG',
    result: '-9 KG', duration: '3.5 Months',
    quote: 'Toned up, increased endurance and fixed my rounded shoulders in 12 weeks!',
    stats: [
      { icon: Lock, value: '-9 KG', label: 'Weight Lost' },
      { icon: Calendar, value: '3.5 Mo', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Endurance' },
      { icon: TrendingUp, value: '↑', label: 'Core' },
    ],
    videoSrc: '/videos/review6.mp4',
    videoTotalSeconds: 40,
  },
  {
    id: 7,
    name: 'Pooja Sharma',
    profession: 'Product Designer',
    location: 'Pune, MH',
    avatar: '/images/transformations/ba_7.jpg',
    baImage: '/images/transformations/ba_7.jpg',
    beforeWeight: '71 KG', afterWeight: '58 KG',
    result: '-13 KG', duration: '5 Months',
    quote: 'Lost 13 kg postpartum and got my energy and posture back!',
    stats: [
      { icon: Lock, value: '-13 KG', label: 'Weight Lost' },
      { icon: Calendar, value: '5 Mo', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Energy' },
      { icon: TrendingUp, value: 'Peak', label: 'Health' },
    ],
    videoSrc: '/videos/review7.mp4',
    videoTotalSeconds: 20,
  },
  {
    id: 8,
    name: 'Rohan Deshmukh',
    profession: 'Operations Manager',
    location: 'Hyderabad, TS',
    avatar: '/images/transformations/ba_8.png',
    baImage: '/images/transformations/ba_8.png',
    beforeWeight: '64 KG', afterWeight: '72 KG',
    result: '+8 KG', duration: '4.5 Months',
    quote: 'Gained 8 kg pure lean mass with sustainable Indian nutrition!',
    stats: [
      { icon: Lock, value: '+8 KG', label: 'Lean Mass' },
      { icon: Calendar, value: '4.5 Mo', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Consistency' },
      { icon: TrendingUp, value: '2×', label: 'Strength' },
    ],
    videoSrc: '/videos/review8.mp4',
    videoTotalSeconds: 89,
  },
];

export default function RealResultsSlider() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);
  const slide = SLIDES[idx];

  const go = (n) => {
    setPlaying(false);
    setCurrentTime(0);
    setIdx((prev) => (prev + n + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(slide.videoTotalSeconds || 0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [idx]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const dur = duration || slide.videoTotalSeconds;
    if (videoRef.current && dur > 0) {
      videoRef.current.currentTime = Math.max(0, Math.min(dur, pos * dur));
    }
  };

  const fmt = (s) => {
    const v = Math.floor(s || 0);
    return `${Math.floor(v / 60)}:${(v % 60).toString().padStart(2, '0')}`;
  };

  const dur = duration || slide.videoTotalSeconds || 1;
  const progress = Math.min(100, (currentTime / dur) * 100);

  return (
    <section className="rr-section" id="real-results">
      <div className="container rr-wrap">

        {/* ── HEADER ── */}
        <div className="rr-head">
          <div className="rr-head-left">
            <div className="rr-eyebrow-pill">
              <Star size={13} fill="currentColor" /> Real Transformations
            </div>
            <h2 className="rr-h2">
              Real People. <span className="rr-blue">Real Results.</span>
            </h2>
            <p className="rr-sub">Verified 100% natural results from real TrainXShiv clients.</p>
          </div>
          <div className="rr-head-right">
            <div className="rr-count-box">
              <span className="rr-count-num">500+</span>
              <span className="rr-count-lbl">Happy Clients</span>
            </div>
            <Link to="/transformations" className="rr-view-all">
              View All <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* ── SLIDER ── */}
        <div className="rr-stage">
          <button className="rr-arrow rr-arrow-l" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft size={20} /></button>
          <button className="rr-arrow rr-arrow-r" onClick={() => go(1)} aria-label="Next"><ChevronRight size={20} /></button>

          <div className="rr-card">

            {/* COL 1 — Before/After Photo */}
            <div className="rr-photo-col">
              <div className="rr-photo-frame">
                <img src={slide.baImage} alt={`${slide.name} transformation`} className="rr-photo-img" />
                <span className="rr-tag rr-tag-before">BEFORE<br /><b>{slide.beforeWeight}</b></span>
                <span className="rr-tag rr-tag-after">AFTER<br /><b>{slide.afterWeight}</b></span>
                <div className="rr-result-pill">{slide.result} in {slide.duration}</div>
              </div>
            </div>

            {/* COL 2 — Client Info */}
            <div className="rr-info-col">
              {/* Client */}
              <div className="rr-client-row">
                <img src={slide.avatar} alt={slide.name} className="rr-client-av" />
                <div>
                  <div className="rr-client-name">{slide.name}</div>
                  <div className="rr-client-prof">{slide.profession}</div>
                  <div className="rr-client-loc"><MapPin size={11} /> {slide.location}</div>
                </div>
                <div className="rr-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="rr-quote">
                <span className="rr-qmark">"</span>
                {slide.quote}
              </blockquote>

              {/* Stats */}
              <div className="rr-stats">
                {slide.stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="rr-stat">
                      <Icon size={15} className="rr-stat-icon" />
                      <div className="rr-stat-val">{s.value}</div>
                      <div className="rr-stat-lbl">{s.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Slide counter */}
              <div className="rr-counter">{idx + 1} / {SLIDES.length}</div>
            </div>

            {/* COL 3 — Video */}
            <div className="rr-video-col">
              <div className="rr-video-wrap" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  key={slide.videoSrc}
                  src={slide.videoSrc}
                  className="rr-video"
                  playsInline
                  preload="metadata"
                  muted={muted}
                  onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                  onLoadedMetadata={() => videoRef.current?.duration && setDuration(videoRef.current.duration)}
                  onEnded={() => { setPlaying(false); setTimeout(() => go(1), 500); }}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />

                <div className="rr-video-label">
                  <Play size={12} fill="#fff" /> Client Review
                </div>

                <div className={`rr-play-btn ${playing ? 'hidden' : ''}`}>
                  <Play size={22} fill="#fff" style={{ marginLeft: 3 }} />
                </div>

                {playing && (
                  <div className="rr-pause-hint">
                    <Pause size={18} fill="#fff" />
                  </div>
                )}

                {/* Controls */}
                <div className="rr-vcontrols" onClick={(e) => e.stopPropagation()}>
                  <div className="rr-progress" onClick={handleSeek}>
                    <div className="rr-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="rr-vrow">
                    <button className="rr-vbtn" onClick={togglePlay}>
                      {playing ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
                    </button>
                    <span className="rr-vtime">{fmt(currentTime)} / {fmt(dur)}</span>
                    <div style={{ flex: 1 }} />
                    <button className="rr-vbtn" onClick={(e) => { e.stopPropagation(); if (videoRef.current) { videoRef.current.muted = !muted; setMuted(!muted); } }}>
                      {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
                    <button className="rr-vbtn" onClick={(e) => { e.stopPropagation(); videoRef.current?.requestFullscreen?.(); }}>
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
            <button key={i} className={`rr-dot${i === idx ? ' rr-dot-on' : ''}`} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

      </div>
    </section>
  );
}
