import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Video as VideoIcon,
  Camera,
  MoveHorizontal,
  ArrowRight,
  User,
  Lock,
  Calendar,
  Zap,
  TrendingUp,
  MapPin,
  Sparkles,
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    name: 'Amit Kumar',
    profession: 'Software Engineer',
    location: 'Noida, UP',
    avatar: '/images/transformations/client_1.jpg',
    baImage: '/images/transformations/ba_1.png',
    beforeWeight: '78 KG',
    afterWeight: '66 KG',
    beforeTag: 'BEFORE',
    afterTag: 'AFTER',
    quoteTop: 'With proper guidance and consistent workouts, I lost 12 kg and feel more confident than ever before!',
    quoteBottom:
      'The training, diet plan and support from the team changed my lifestyle completely. Not just weight loss, I got strength, discipline and a healthier mindset.',
    stats: [
      { icon: Lock, value: '-12 KG', label: 'Weight Loss' },
      { icon: Calendar, value: '4 Months', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'More Energetic' },
      { icon: TrendingUp, value: 'Better', label: 'Confidence' },
    ],
    videoSrc: '/videos/review1.mp4',
    videoDuration: '00:16',
    videoTotalSeconds: 16,
  },
  {
    id: 2,
    name: 'Sneha Verma',
    profession: 'Marketing Lead',
    location: 'Lucknow, UP',
    avatar: '/images/transformations/client_2.jpg',
    baImage: '/images/transformations/ba_2.png',
    beforeWeight: '68 KG',
    afterWeight: '58 KG',
    beforeTag: 'BEFORE',
    afterTag: 'AFTER',
    quoteTop: 'Lost 10 kg and dropped 3 dress sizes in just 90 days. Best coaching decision ever!',
    quoteBottom:
      'I was struggling with weight gain for 2 years. TrainXShiv\'s personalized home workouts and easy Indian diet plan gave me results without starving.',
    stats: [
      { icon: Lock, value: '-10 KG', label: 'Weight Loss' },
      { icon: Calendar, value: '3 Months', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Consistent' },
      { icon: TrendingUp, value: 'Better', label: 'Health' },
    ],
    videoSrc: '/videos/review2.mp4',
    videoDuration: '00:26',
    videoTotalSeconds: 26,
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    profession: 'Business Analyst',
    location: 'Delhi, NCR',
    avatar: '/images/transformations/client_3.jpeg',
    baImage: '/images/transformations/ba_3.png',
    beforeWeight: '55 KG',
    afterWeight: '63 KG',
    beforeTag: 'BEFORE',
    afterTag: 'AFTER',
    quoteTop: 'Gained 8 kg of solid muscle and doubled my bench press with proper form coaching!',
    quoteBottom:
      'Skinny all my life, I struggled to gain muscle. Shivam created a surplus Indian diet plan and heavy compound routine that finally worked.',
    stats: [
      { icon: Lock, value: '+8 KG', label: 'Lean Mass' },
      { icon: Calendar, value: '5 Months', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Strength Boost' },
      { icon: TrendingUp, value: 'Better', label: 'Posture' },
    ],
    videoSrc: '/videos/review3.mp4',
    videoDuration: '00:44',
    videoTotalSeconds: 44,
  },
  {
    id: 4,
    name: 'Vikas Yadav',
    profession: 'Architect',
    location: 'Gurgaon, HR',
    avatar: '/images/transformations/ba_4.jpg',
    baImage: '/images/transformations/ba_4.jpg',
    beforeWeight: '82 KG',
    afterWeight: '72 KG',
    beforeTag: 'BEFORE',
    afterTag: 'AFTER',
    quoteTop: 'Visible abs for the first time in my life at 32. Highly recommended!',
    quoteBottom:
      'Managing long work hours was hard, but the structured 4-day workout plan and weekly WhatsApp check-ins kept me accountable.',
    stats: [
      { icon: Lock, value: '-10 KG', label: 'Body Fat' },
      { icon: Calendar, value: '6 Months', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Transformed' },
      { icon: TrendingUp, value: 'Better', label: 'Stamina' },
    ],
    videoSrc: '/videos/review4.mp4',
    videoDuration: '00:33',
    videoTotalSeconds: 33,
  },
  {
    id: 5,
    name: 'Arjun Singh',
    profession: 'Chartered Accountant',
    location: 'Mumbai, MH',
    avatar: '/images/transformations/ba_5.jpg',
    baImage: '/images/transformations/ba_5.jpg',
    beforeWeight: '88 KG',
    afterWeight: '74 KG',
    beforeTag: 'BEFORE',
    afterTag: 'AFTER',
    quoteTop: 'Cut down 14 kg of stubborn belly fat while maintaining desk job hours!',
    quoteBottom:
      'Shivam’s nutritional guidance showed me that I don’t need to starve or cut carbs completely to get shredded. Best fitness coach in India.',
    stats: [
      { icon: Lock, value: '-14 KG', label: 'Fat Loss' },
      { icon: Calendar, value: '5 Months', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Energy High' },
      { icon: TrendingUp, value: 'Peak', label: 'Vigor' },
    ],
    videoSrc: '/videos/review5.mp4',
    videoDuration: '00:49',
    videoTotalSeconds: 49,
  },
  {
    id: 6,
    name: 'Karan Gupta',
    profession: 'Tech Lead',
    location: 'Bangalore, KA',
    avatar: '/images/transformations/ba_6.jpg',
    baImage: '/images/transformations/ba_6.jpg',
    beforeWeight: '76 KG',
    afterWeight: '67 KG',
    beforeTag: 'BEFORE',
    afterTag: 'AFTER',
    quoteTop: 'Toned up, increased endurance and fixed my rounded shoulders in 12 weeks!',
    quoteBottom:
      'Daily feedback and video posture corrections make TrainXShiv stand apart from random gym memberships. Real results guaranteed.',
    stats: [
      { icon: Lock, value: '-9 KG', label: 'Weight Loss' },
      { icon: Calendar, value: '3.5 Months', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Endurance' },
      { icon: TrendingUp, value: 'Solid', label: 'Core Strength' },
    ],
    videoSrc: '/videos/review6.mp4',
    videoDuration: '00:40',
    videoTotalSeconds: 40,
  },
  {
    id: 7,
    name: 'Pooja Sharma',
    profession: 'Product Designer',
    location: 'Pune, MH',
    avatar: '/images/transformations/ba_7.jpg',
    baImage: '/images/transformations/ba_7.jpg',
    beforeWeight: '71 KG',
    afterWeight: '58 KG',
    beforeTag: 'BEFORE',
    afterTag: 'AFTER',
    quoteTop: 'Lost 13 kg postpartum and got my energy and posture back!',
    quoteBottom:
      'The home workout structure was flexible and easy to manage with my baby. No extreme gym routines needed.',
    stats: [
      { icon: Lock, value: '-13 KG', label: 'Weight Loss' },
      { icon: Calendar, value: '5 Months', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Energy Boost' },
      { icon: TrendingUp, value: 'Peak', label: 'Health' },
    ],
    videoSrc: '/videos/review7.mp4',
    videoDuration: '00:20',
    videoTotalSeconds: 20,
  },
  {
    id: 8,
    name: 'Rohan Deshmukh',
    profession: 'Operations Manager',
    location: 'Hyderabad, TS',
    avatar: '/images/transformations/ba_8.png',
    baImage: '/images/transformations/ba_8.png',
    beforeWeight: '64 KG',
    afterWeight: '72 KG',
    beforeTag: 'BEFORE',
    afterTag: 'AFTER',
    quoteTop: 'Gained 8 kg pure lean mass with sustainable Indian nutrition!',
    quoteBottom:
      'Clear weekly adjustments on WhatsApp ensured I never hit a plateau while traveling for work.',
    stats: [
      { icon: Lock, value: '+8 KG', label: 'Lean Mass' },
      { icon: Calendar, value: '4.5 Months', label: 'Duration' },
      { icon: Zap, value: '100%', label: 'Consistency' },
      { icon: TrendingUp, value: 'Double', label: 'Strength' },
    ],
    videoSrc: '/videos/review8.mp4',
    videoDuration: '01:29',
    videoTotalSeconds: 89,
  },
];

export default function RealResultsSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  // 'video' (default) | 'photo'
  const [mediaTab, setMediaTab] = useState('video');
  const videoRef = useRef(null);

  const activeSlide = SLIDES[currentIdx];

  const goToNext = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
  };

  const goToPrev = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentIdx((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Reset video state when slide changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(activeSlide.videoTotalSeconds || 0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentIdx]);

  // Video playback handler
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setTimeout(() => goToNext(), 600);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const dur = duration || activeSlide.videoTotalSeconds;
    if (videoRef.current && dur > 0) {
      const targetTime = Math.max(0, Math.min(dur, pos * dur));
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitEnterFullscreen) {
        videoRef.current.webkitEnterFullscreen();
      }
    }
  };

  const formatTime = (secs) => {
    const sVal = Math.floor(secs || 0);
    const m = Math.floor(sVal / 60);
    const s = sVal % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const effectiveDuration = duration || activeSlide.videoTotalSeconds || 1;
  const progressPercent = Math.min(100, (currentTime / effectiveDuration) * 100);

  return (
    <section className="real-results-section" id="real-results">
      {/* Decorative ambient background waves */}
      <div className="rr-bg-decor" aria-hidden="true">
        <div className="rr-glow-left" />
        <div className="rr-glow-right" />
        <div className="rr-wave-accent wave-acc-1" />
        <div className="rr-wave-accent wave-acc-2" />
      </div>

      <div className="container rr-container">
        {/* ================= HEADER ================= */}
        <div className="rr-header">
          <div className="rr-header-left">
            <div className="rr-eyebrow-pill">
              <User size={15} className="rr-eyebrow-icon" />
              <span>Real Transformations</span>
            </div>
            <h2 className="rr-title">
              Real People. <span className="rr-title-highlight">Real Results.</span>
              <svg className="rr-swoosh" viewBox="0 0 200 14" fill="none">
                <path
                  d="M 2 9 C 60 14, 140 3, 198 6"
                  stroke="#0066FF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </h2>
            <p className="rr-subtitle">
              Watch real client workout and review journeys — verified 100% natural results.
            </p>
          </div>

          <div className="rr-header-right">
            {/* Happy client avatar stack */}
            <div className="rr-avatar-stack">
              <img src="/images/transformations/client_1.jpg" alt="Client 1" className="stack-avatar" />
              <img src="/images/trainers/shivan.png" alt="Client 2" className="stack-avatar" />
              <img src="/images/trainers/priya.png" alt="Client 3" className="stack-avatar" />
              <img src="/images/trainers/aman.png" alt="Client 4" className="stack-avatar" />
            </div>

            <div className="rr-clients-count">
              <span className="count-num">500+</span>
              <span className="count-label">Happy Clients</span>
            </div>

            <Link to="/transformations" className="rr-header-cta">
              <span>View All Transformations</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* ================= BIG SLIDER SHOWCASE ================= */}
        <div className="rr-slider-stage">
          {/* Previous Arrow Button */}
          <button
            className="rr-nav-arrow arrow-prev"
            onClick={goToPrev}
            aria-label="Previous transformation"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next Arrow Button */}
          <button
            className="rr-nav-arrow arrow-next"
            onClick={goToNext}
            aria-label="Next transformation"
          >
            <ChevronRight size={22} />
          </button>

          {/* Left Peeking Card preview (Desktop) */}
          <div
            className="rr-peek-card peek-left"
            onClick={goToPrev}
            aria-hidden="true"
          >
            <div className="peek-inner">
              <span className="peek-tag">{SLIDES[(currentIdx - 1 + SLIDES.length) % SLIDES.length].beforeTag}</span>
              <span className="peek-weight">{SLIDES[(currentIdx - 1 + SLIDES.length) % SLIDES.length].beforeWeight}</span>
            </div>
          </div>

          {/* MAIN ACTIVE CARD */}
          <article className="rr-main-card">
            {/* COLUMN 1: Before / After Comparison */}
            <div className="rr-col-ba">
              <div className="rr-ba-frame">
                <img
                  src={activeSlide.baImage}
                  alt={`${activeSlide.name} Transformation Before & After`}
                  className="rr-ba-img"
                />

                {/* Top Badges */}
                <div className="rr-badge-before">{activeSlide.beforeTag}</div>
                <div className="rr-badge-after">{activeSlide.afterTag}</div>

                {/* Bottom Weight Badges */}
                <div className="rr-weight-before">{activeSlide.beforeWeight}</div>
                <div className="rr-weight-after">{activeSlide.afterWeight}</div>

                {/* Center interactive Handle */}
                <div className="rr-ba-handle">
                  <MoveHorizontal size={16} className="handle-icon" />
                </div>
              </div>
            </div>

            {/* COLUMN 2: Client Story & Stat Badges */}
            <div className="rr-col-info">
              {/* Client Info Header */}
              <div className="rr-client-top">
                <div className="rr-client-profile">
                  <img
                    src={activeSlide.avatar}
                    alt={activeSlide.name}
                    className="rr-client-avatar"
                  />
                  <div className="rr-client-meta">
                    <h3 className="rr-client-name">{activeSlide.name}</h3>
                    <div className="rr-client-sub">{activeSlide.profession}</div>
                    <div className="rr-client-loc">
                      <MapPin size={12} className="loc-pin" />
                      <span>{activeSlide.location}</span>
                    </div>
                  </div>
                </div>

                <div className="rr-quote-top-bubble">
                  <span className="rr-quote-icon">“</span>
                  <p className="rr-quote-top-text">“{activeSlide.quoteTop}”</p>
                </div>
              </div>

              {/* 4 Stat Badges Grid */}
              <div className="rr-stats-grid">
                {activeSlide.stats.map((s, idx) => {
                  const IconComp = s.icon;
                  return (
                    <div key={idx} className="rr-stat-card">
                      <div className="stat-icon-wrap">
                        <IconComp size={16} className="stat-icon" />
                      </div>
                      <div className="stat-value">{s.value}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Testimonial */}
              <div className="rr-testimonial-box">
                <span className="rr-quote-icon-sm">“</span>
                <p className="rr-testimonial-text">“{activeSlide.quoteBottom}”</p>
              </div>
            </div>

            {/* COLUMN 3: Compact Video Player (Inside Card As Before) */}
            <div className="rr-col-video">
              <div className="rr-video-card" onClick={togglePlay}>
                {/* Real video tag */}
                <video
                  ref={videoRef}
                  key={activeSlide.videoSrc}
                  src={activeSlide.videoSrc}
                  className="rr-video-element"
                  playsInline
                  preload="metadata"
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleEnded}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Top Badge Overlay */}
                <div className="rr-video-top-badge">
                  <div className="video-icon-circle">
                    <VideoIcon size={14} />
                  </div>
                  <div className="video-badge-text">
                    <span className="badge-main">Watch My Journey</span>
                    <span className="badge-sub">Real Client Video</span>
                  </div>
                </div>

                {/* Top Right Duration Pill */}
                <div className="rr-video-duration-pill">
                  {formatTime(currentTime)} / {formatTime(effectiveDuration)}
                </div>

                {/* Center Big Play Button (Hides when video is playing) */}
                <div
                  className={`rr-play-btn-pulse ${isPlaying ? 'is-playing' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause size={24} fill="#FFFFFF" />
                  ) : (
                    <Play size={24} fill="#FFFFFF" style={{ marginLeft: 3 }} />
                  )}
                </div>

                {/* Bottom Custom Video Controls Bar */}
                <div
                  className="rr-video-controls"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Scrub Progress Bar with click-to-seek */}
                  <div
                    className="rr-progress-bar-bg"
                    onClick={handleSeek}
                    title="Seek video"
                  >
                    <div
                      className="rr-progress-bar-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="rr-controls-row">
                    <button
                      type="button"
                      className="ctrl-btn"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
                    </button>

                    <span className="ctrl-time">
                      {formatTime(currentTime)} / {formatTime(effectiveDuration)}
                    </span>

                    <div className="ctrl-spacer" />

                    <button
                      type="button"
                      className="ctrl-btn"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      title={isMuted ? 'Unmute audio' : 'Mute audio'}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>

                    <button
                      type="button"
                      className="ctrl-btn"
                      onClick={toggleFullscreen}
                      aria-label="Fullscreen"
                      title="Fullscreen view"
                    >
                      <Maximize2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Right Peeking Card preview (Desktop) */}
          <div
            className="rr-peek-card peek-right"
            onClick={goToNext}
            aria-hidden="true"
          >
            <div className="peek-inner">
              <span className="peek-tag">{SLIDES[(currentIdx + 1) % SLIDES.length].beforeTag}</span>
              <span className="peek-weight">{SLIDES[(currentIdx + 1) % SLIDES.length].beforeWeight}</span>
            </div>
          </div>
        </div>

        {/* ================= PAGINATION DOTS ================= */}
        <div className="rr-dots-row">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              className={`rr-dot ${idx === currentIdx ? 'active' : ''}`}
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
