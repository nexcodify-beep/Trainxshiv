import React, { useState } from 'react';
import {
  Crown,
  Award,
  CheckCircle2,
  Users,
  Trophy,
  Flame,
  ArrowRight,
  MessageCircle,
  Instagram,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  Dumbbell,
  Maximize2,
  X,
  MoveHorizontal,
  Star,
  Layers,
} from 'lucide-react';
import { HEAD_TRAINER, BRAND, TRANSFORMS } from '../data';
import { useModal } from '../context';

export default function FounderProfile() {
  const { open } = useModal();
  // 'side-by-side' | 'compare' | 'before' | 'after'
  const [activeTab, setActiveTab] = useState('side-by-side');
  const [sliderPos, setSliderPos] = useState(50);
  const [afterAngle, setAfterAngle] = useState(1); // 1 = peak lean, 2 = bicep pose
  const [zoomImg, setZoomImg] = useState(null); // { src, title, tag, weight }

  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    'Hi Shivan! I want to consult directly with you regarding my fitness transformation.'
  )}`;

  const currentAfterSrc =
    afterAngle === 1
      ? '/images/trainers/shivan_after.jpg'
      : '/images/trainers/shivan_after_2.jpg';

  // 4 Featured clients trained by Shivan
  const shivanClients = TRANSFORMS.slice(0, 4);

  return (
    <section className="founder-spotlight-section">
      <div className="container">
        {/* ================= SECTION HEADER ================= */}
        <div className="founder-spotlight-head center">
          <span className="founder-pill">
            <Crown size={14} className="founder-crown-icon" />
            Founder & Head Coach Profile
          </span>
          <h2 className="founder-spotlight-title">
            Meet <span className="text-grad">Shivan</span> — The Visionary Behind TrainXShiv
          </h2>
          <p className="founder-spotlight-sub">
            From struggling with skinny, unstructured fitness to building 18 kg of lean muscle naturally and personally coaching 500+ people across 8 countries. Here is his transformation, philosophy, and proven coaching system.
          </p>
        </div>

        {/* ================= GRAND TRANSFORMATION SHOWCASE (CARDS BADA & FULL IMAGE) ================= */}
        <div className="founder-grand-showcase">
          {/* Top Control Bar */}
          <div className="founder-showcase-bar">
            <div className="founder-avatar-chip">
              <img src={HEAD_TRAINER.img} alt="Shivan" className="founder-chip-avatar" />
              <div>
                <b>Shivan</b>
                <small>Founder's Own Transformation</small>
              </div>
            </div>

            {/* Pose switcher for After photo */}
            {(activeTab === 'side-by-side' || activeTab === 'after' || activeTab === 'compare') && (
              <div className="founder-pose-switcher">
                <span className="pose-lbl">After Pose:</span>
                <button
                  type="button"
                  className={`pose-btn ${afterAngle === 1 ? 'active' : ''}`}
                  onClick={() => setAfterAngle(1)}
                >
                  Front Physique
                </button>
                <button
                  type="button"
                  className={`pose-btn ${afterAngle === 2 ? 'active' : ''}`}
                  onClick={() => setAfterAngle(2)}
                >
                  Muscle Definition
                </button>
              </div>
            )}

            {/* View Mode Tabs */}
            <div className="founder-view-tabs">
              <button
                type="button"
                className={`f-tab ${activeTab === 'side-by-side' ? 'active' : ''}`}
                onClick={() => setActiveTab('side-by-side')}
              >
                <Layers size={14} />
                <span>Side-by-Side</span>
              </button>
              <button
                type="button"
                className={`f-tab ${activeTab === 'compare' ? 'active' : ''}`}
                onClick={() => setActiveTab('compare')}
              >
                <MoveHorizontal size={14} />
                <span>Split Slider</span>
              </button>
              <button
                type="button"
                className={`f-tab ${activeTab === 'before' ? 'active' : ''}`}
                onClick={() => setActiveTab('before')}
              >
                <span>Before Only</span>
              </button>
              <button
                type="button"
                className={`f-tab ${activeTab === 'after' ? 'active' : ''}`}
                onClick={() => setActiveTab('after')}
              >
                <span>After Only</span>
              </button>
            </div>
          </div>

          {/* ================= VIEW 1: DUAL BIG CARDS (SIDE-BY-SIDE) ================= */}
          {activeTab === 'side-by-side' && (
            <div className="founder-dual-cards">
              {/* BIG CARD 1: BEFORE */}
              <article className="founder-big-card before-card">
                <div className="f-card-top">
                  <span className="founder-stage-badge badge-before">
                    BEFORE • 58 KG
                  </span>
                  <span className="f-card-subtitle">Starting Point (Untrained)</span>
                  <button
                    type="button"
                    className="f-zoom-btn"
                    onClick={() =>
                      setZoomImg({
                        src: '/images/trainers/shivan_before.jpg',
                        title: 'Shivan Before Transformation (Starting Point)',
                        tag: 'BEFORE',
                        weight: '58 KG',
                      })
                    }
                    title="Pura Image Bada Dekhein (Zoom)"
                    aria-label="Zoom Before Image"
                  >
                    <Maximize2 size={16} />
                    <span>Zoom</span>
                  </button>
                </div>

                <div
                  className="founder-big-stage"
                  onClick={() =>
                    setZoomImg({
                      src: '/images/trainers/shivan_before.jpg',
                      title: 'Shivan Before Transformation (Starting Point)',
                      tag: 'BEFORE',
                      weight: '58 KG',
                    })
                  }
                >
                  <img
                    src="/images/trainers/shivan_before.jpg"
                    alt="Shivan Before 58 KG Full Body"
                    className="founder-big-img"
                  />
                  <div className="f-stage-hint">
                    <Maximize2 size={14} />
                    <span>Click for Fullscreen View</span>
                  </div>
                </div>

                <div className="f-card-bottom">
                  <div className="f-metric-item">
                    <span className="m-val">58 KG</span>
                    <span className="m-lbl">Starting Weight</span>
                  </div>
                  <div className="f-metric-sep" />
                  <div className="f-metric-item">
                    <span className="m-val">~19%</span>
                    <span className="m-lbl">Body Fat</span>
                  </div>
                  <div className="f-metric-sep" />
                  <div className="f-metric-item">
                    <span className="m-val">2018</span>
                    <span className="m-lbl">Day 1</span>
                  </div>
                </div>
              </article>

              {/* BIG CARD 2: AFTER */}
              <article className="founder-big-card after-card">
                <div className="f-card-top">
                  <span className="founder-stage-badge badge-after">
                    <Sparkles size={13} />
                    AFTER • 76 KG
                  </span>
                  <span className="f-card-subtitle text-cyan">+18 KG Lean Muscle</span>
                  <button
                    type="button"
                    className="f-zoom-btn"
                    onClick={() =>
                      setZoomImg({
                        src: currentAfterSrc,
                        title: 'Shivan Peak Aesthetic Physique (Natural)',
                        tag: 'AFTER',
                        weight: '76 KG',
                      })
                    }
                    title="Pura Image Bada Dekhein (Zoom)"
                    aria-label="Zoom After Image"
                  >
                    <Maximize2 size={16} />
                    <span>Zoom</span>
                  </button>
                </div>

                <div
                  className="founder-big-stage"
                  onClick={() =>
                    setZoomImg({
                      src: currentAfterSrc,
                      title: 'Shivan Peak Aesthetic Physique (Natural)',
                      tag: 'AFTER',
                      weight: '76 KG',
                    })
                  }
                >
                  <img
                    src={currentAfterSrc}
                    alt="Shivan After 76 KG Peak Physique Full Body"
                    className="founder-big-img"
                  />
                  <div className="f-stage-hint">
                    <Maximize2 size={14} />
                    <span>Click for Fullscreen View</span>
                  </div>
                </div>

                <div className="f-card-bottom after-bottom">
                  <div className="f-metric-item">
                    <span className="m-val text-blue">76 KG</span>
                    <span className="m-lbl">+18 KG Lean Muscle</span>
                  </div>
                  <div className="f-metric-sep" />
                  <div className="f-metric-item">
                    <span className="m-val text-blue">10%</span>
                    <span className="m-lbl">Defined Fat</span>
                  </div>
                  <div className="f-metric-sep" />
                  <div className="f-metric-item">
                    <span className="m-val text-blue">100%</span>
                    <span className="m-lbl">Natural & Sustainable</span>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* ================= VIEW 2: INTERACTIVE SPLIT SLIDER ================= */}
          {activeTab === 'compare' && (
            <div className="founder-slider-container">
              <div className="founder-big-slider">
                <div className="slider-stage-contain">
                  {/* Under image: AFTER */}
                  <div className="slider-layer layer-after">
                    <img
                      src={currentAfterSrc}
                      alt="Shivan After Full Physique"
                      className="slider-contain-img"
                    />
                    <span className="founder-stage-badge badge-after right">
                      <Sparkles size={13} /> AFTER • 76 KG
                    </span>
                  </div>

                  {/* Over image: BEFORE */}
                  <div
                    className="slider-layer layer-before"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img
                      src="/images/trainers/shivan_before.jpg"
                      alt="Shivan Before Full Physique"
                      className="slider-contain-img"
                    />
                    <span className="founder-stage-badge badge-before left">
                      BEFORE • 58 KG
                    </span>
                  </div>

                  {/* Divider Line & Button */}
                  <div className="slider-line" style={{ left: `${sliderPos}%` }}>
                    <div className="slider-handle">
                      <MoveHorizontal size={18} />
                    </div>
                  </div>

                  {/* Draggable range input */}
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="slider-range-drag"
                    aria-label="Drag before and after split slider"
                  />
                </div>

                <div className="slider-hint-bar">
                  <span>◀ Drag the slider left & right to compare head-to-toe transformation ▶</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: BEFORE ONLY ================= */}
          {activeTab === 'before' && (
            <div className="founder-single-container">
              <div className="founder-big-card before-card single-focus">
                <div className="f-card-top">
                  <span className="founder-stage-badge badge-before">
                    BEFORE • 58 KG (Starting Point)
                  </span>
                  <span className="f-card-subtitle">Untrained Phase (2018)</span>
                  <button
                    type="button"
                    className="f-zoom-btn"
                    onClick={() =>
                      setZoomImg({
                        src: '/images/trainers/shivan_before.jpg',
                        title: 'Shivan Before Transformation',
                        tag: 'BEFORE',
                        weight: '58 KG',
                      })
                    }
                  >
                    <Maximize2 size={16} />
                    <span>Zoom Fullscreen</span>
                  </button>
                </div>

                <div
                  className="founder-big-stage single-stage"
                  onClick={() =>
                    setZoomImg({
                      src: '/images/trainers/shivan_before.jpg',
                      title: 'Shivan Before Transformation',
                      tag: 'BEFORE',
                      weight: '58 KG',
                    })
                  }
                >
                  <img
                    src="/images/trainers/shivan_before.jpg"
                    alt="Shivan Before Full Body"
                    className="founder-big-img"
                  />
                </div>

                <div className="f-card-bottom">
                  <div className="f-metric-item">
                    <span className="m-val">58 KG</span>
                    <span className="m-lbl">Starting Body Weight</span>
                  </div>
                  <div className="f-metric-sep" />
                  <div className="f-metric-item">
                    <span className="m-val">~19%</span>
                    <span className="m-lbl">Untrained Body Fat</span>
                  </div>
                  <div className="f-metric-sep" />
                  <div className="f-metric-item">
                    <span className="m-val">Natural</span>
                    <span className="m-lbl">Baseline Fitness</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 4: AFTER ONLY ================= */}
          {activeTab === 'after' && (
            <div className="founder-single-container">
              <div className="founder-big-card after-card single-focus">
                <div className="f-card-top">
                  <span className="founder-stage-badge badge-after">
                    <Sparkles size={13} /> AFTER • 76 KG (Peak Aesthetic)
                  </span>
                  <span className="f-card-subtitle text-cyan">+18 KG Lean Muscle</span>
                  <button
                    type="button"
                    className="f-zoom-btn"
                    onClick={() =>
                      setZoomImg({
                        src: currentAfterSrc,
                        title: 'Shivan Peak Aesthetic Physique',
                        tag: 'AFTER',
                        weight: '76 KG',
                      })
                    }
                  >
                    <Maximize2 size={16} />
                    <span>Zoom Fullscreen</span>
                  </button>
                </div>

                <div
                  className="founder-big-stage single-stage"
                  onClick={() =>
                    setZoomImg({
                      src: currentAfterSrc,
                      title: 'Shivan Peak Aesthetic Physique',
                      tag: 'AFTER',
                      weight: '76 KG',
                    })
                  }
                >
                  <img
                    src={currentAfterSrc}
                    alt="Shivan After Full Body"
                    className="founder-big-img"
                  />
                </div>

                <div className="f-card-bottom after-bottom">
                  <div className="f-metric-item">
                    <span className="m-val text-blue">76 KG</span>
                    <span className="m-lbl">+18 KG Solid Muscle</span>
                  </div>
                  <div className="f-metric-sep" />
                  <div className="f-metric-item">
                    <span className="m-val text-blue">10%</span>
                    <span className="m-lbl">Year-Round Fat</span>
                  </div>
                  <div className="f-metric-sep" />
                  <div className="f-metric-item">
                    <span className="m-val text-blue">100%</span>
                    <span className="m-lbl">Natural & Proven</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= METRICS STRIP ================= */}
          <div className="founder-metrics-strip">
            <div className="f-metric">
              <span className="f-m-val">+18 KG</span>
              <span className="f-m-lbl">Lean Muscle Gained</span>
            </div>
            <div className="f-metric-div" />
            <div className="f-metric">
              <span className="f-m-val">10%</span>
              <span className="f-m-lbl">Year-Round Body Fat</span>
            </div>
            <div className="f-metric-div" />
            <div className="f-metric">
              <span className="f-m-val">100%</span>
              <span className="f-m-lbl">Natural Transformation</span>
            </div>
            <div className="f-metric-div" />
            <div className="f-metric">
              <span className="f-m-val">10+ Yrs</span>
              <span className="f-m-lbl">Dedicated Experience</span>
            </div>
          </div>

          {/* ================= FOUNDER PERSONAL QUOTE ================= */}
          <div className="founder-quote-banner">
            <div className="founder-quote-symbol">“</div>
            <p>
              I didn’t start with great genetics or quick shortcuts. I spent years making mistakes with generic crash diets and unguided workouts so that my clients never have to. Today, we turn fitness into a natural, sustainable part of everyday Indian living.
            </p>
            <div className="founder-sign">— Shivan, Head Coach & Founder</div>
          </div>
        </div>

        {/* ================= COACH AUTHORITY, CREDENTIALS & 500+ TRAINED ================= */}
        <div className="founder-details-grand-grid">
          {/* LEFT: Impact Stats & Coaching Story */}
          <div className="founder-story-column">
            {/* 4 Grand Stat Cards */}
            <div className="founder-stats-grid">
              <div className="f-stat-card">
                <div className="f-stat-ico ico-blue">
                  <Users size={24} />
                </div>
                <div className="f-stat-data">
                  <b>500+</b>
                  <span>Clients Personally Trained</span>
                </div>
                <small className="f-stat-sub">Across 8+ countries worldwide</small>
              </div>

              <div className="f-stat-card">
                <div className="f-stat-ico ico-amber">
                  <Trophy size={24} />
                </div>
                <div className="f-stat-data">
                  <b>10+ Yrs</b>
                  <span>Hands-on Coaching</span>
                </div>
                <small className="f-stat-sub">Practical & science-backed</small>
              </div>

              <div className="f-stat-card">
                <div className="f-stat-ico ico-green">
                  <Target size={24} />
                </div>
                <div className="f-stat-data">
                  <b>98%</b>
                  <span>Goal Achievement Rate</span>
                </div>
                <small className="f-stat-sub">Verified transformation success</small>
              </div>

              <div className="f-stat-card">
                <div className="f-stat-ico ico-purple">
                  <Sparkles size={24} />
                </div>
                <div className="f-stat-data">
                  <b>4.9 / 5</b>
                  <span>Client Satisfaction</span>
                </div>
                <small className="f-stat-sub">From 500+ happy client reviews</small>
              </div>
            </div>

            {/* Coach Story Narrative */}
            <div className="founder-story-card">
              <div className="founder-name-row">
                <div>
                  <h3 className="founder-name">Shivan</h3>
                  <p className="founder-tagline">
                    Head Trainer, Founder & Certified Sports Nutritionist
                  </p>
                </div>
                <div className="founder-experience-pill">
                  <Award size={15} />
                  <span>10+ Years Coaching</span>
                </div>
              </div>

              <p className="founder-narrative">
                With more than a decade of experience in fitness coaching and evidence-based nutrition, Shivan has personally guided hundreds of busy working professionals, students, and fitness enthusiasts to achieve sustainable fat loss, aesthetic muscle gain, and lifelong habit mastery.
              </p>
              <p className="founder-narrative">
                His signature philosophy rejects boiled-chicken starvation diets. Instead, he designs flexible Indian nutrition structures around dal, roti, rice, paneer, and eggs — ensuring you enjoy your food while hitting razor-sharp fitness goals.
              </p>
            </div>
          </div>

          {/* RIGHT: Certifications, Specialties & Action */}
          <div className="founder-credentials-column">
            {/* Certifications & Trust Credentials */}
            <div className="founder-certifications-box">
              <div className="f-box-title">
                <ShieldCheck size={20} className="text-blue" />
                <h4>Certified Credentials & Accreditations</h4>
              </div>

              <div className="f-certs-list">
                <div className="f-cert-item">
                  <CheckCircle2 size={18} className="cert-check" />
                  <div>
                    <b>ISSA Certified Fitness Trainer (CFT)</b>
                    <span>International Sports Sciences Association accredited coach</span>
                  </div>
                </div>

                <div className="f-cert-item">
                  <CheckCircle2 size={18} className="cert-check" />
                  <div>
                    <b>Certified Sports & Performance Nutritionist</b>
                    <span>Evidence-based Indian macro calculation & metabolic recovery</span>
                  </div>
                </div>

                <div className="f-cert-item">
                  <CheckCircle2 size={18} className="cert-check" />
                  <div>
                    <b>Biomechanics & Form Correction Specialist</b>
                    <span>Joint-safe progressive overload and injury-free movement execution</span>
                  </div>
                </div>

                <div className="f-cert-item">
                  <CheckCircle2 size={18} className="cert-check" />
                  <div>
                    <b>Hormonal & Lifestyle Recomposition Expert</b>
                    <span>Optimizing stress, sleep, and nutrition around demanding Indian work schedules</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialization Tags */}
            <div className="founder-specialties-row">
              <span className="spec-label">Specialties:</span>
              <div className="spec-chips">
                <span className="spec-chip">Fat Loss & Leaning</span>
                <span className="spec-chip">Hypertrophy & Muscle</span>
                <span className="spec-chip">Custom Indian Diets</span>
                <span className="spec-chip">Injury Prevention</span>
                <span className="spec-chip">1-on-1 WhatsApp Coaching</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="founder-actions-row">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => open('enroll')}
              >
                <span>Book 1-on-1 Consultation</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={18} />
                <span>Chat with Shivan</span>
              </a>

              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-icon-only"
                aria-label="Shivan Instagram Profile"
                title="Follow on Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* ================= CLIENT TRANSFORMATIONS TRAINED BY SHIVAN (BIG CARDS) ================= */}
        <div className="founder-clients-showcase">
          <div className="f-clients-header center">
            <span className="founder-pill">
              <Sparkles size={14} className="founder-crown-icon" />
              Proof of System
            </span>
            <h3 className="f-clients-title">
              Real Clients Coached Personally by <span className="text-grad">Shivan</span>
            </h3>
            <p className="f-clients-sub">
              Full uncropped before & after photos of clients who achieved life-changing body recomposition.
            </p>
          </div>

          <div className="f-clients-grid">
            {shivanClients.map((client) => {
              const imgSrc = client.image || client.baImage || client.after;
              return (
                <div key={client.id} className="f-client-card">
                  <div
                    className="f-client-stage"
                    onClick={() =>
                      setZoomImg({
                        src: imgSrc,
                        title: `${client.name} — ${client.result}`,
                        tag: client.goal,
                        weight: client.result,
                      })
                    }
                  >
                    <img
                      src={imgSrc}
                      alt={`${client.name} Transformation`}
                      className="f-client-img"
                    />
                    <div className="f-client-tag-l">Before</div>
                    <div className="f-client-tag-r">After</div>
                    <div className="f-client-zoom-overlay">
                      <Maximize2 size={16} />
                      <span>Full View</span>
                    </div>
                  </div>

                  <div className="f-client-info">
                    <div className="f-client-main">
                      <h4 className="f-client-name">{client.name}</h4>
                      <span className="f-client-goal">{client.goal}</span>
                    </div>
                    <div className="f-client-badge">
                      <b>{client.result}</b>
                      <small>{client.period}</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX / FULLSCREEN ZOOM MODAL ================= */}
      {zoomImg && (
        <div
          className="f-lightbox-backdrop"
          onClick={() => setZoomImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="f-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="f-lightbox-header">
              <div className="f-lightbox-title-box">
                <span className="f-lightbox-tag">{zoomImg.tag || 'FULL VIEW'}</span>
                <h4 className="f-lightbox-title">{zoomImg.title}</h4>
                {zoomImg.weight && (
                  <span className="f-lightbox-weight">{zoomImg.weight}</span>
                )}
              </div>
              <button
                type="button"
                className="f-lightbox-close"
                onClick={() => setZoomImg(null)}
                aria-label="Close Fullscreen View"
              >
                <X size={22} />
              </button>
            </div>

            <div className="f-lightbox-body">
              <img
                src={zoomImg.src}
                alt={zoomImg.title}
                className="f-lightbox-img"
              />
            </div>

            <div className="f-lightbox-footer">
              <span>Full resolution uncropped photo • Press anywhere or ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
