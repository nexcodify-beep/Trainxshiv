import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  ArrowRight,
  Play,
  CheckCircle2,
  Dumbbell,
  BarChart3,
  Target,
  Crown,
  Trophy,
  Award,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Youtube,
  Mail,
  Check,
  ExternalLink,
  Flame,
  Sparkles,
} from 'lucide-react';
import { HEAD_TRAINER as DEFAULT_HEAD, BRAND as DEFAULT_BRAND, TEAM_TRAINERS as DEFAULT_TEAM } from '../data';
import { useModal, useContent } from '../context';

export default function Trainers() {
  const { open } = useModal();
  const { headTrainer: dynamicHead, brand: dynamicBrand, teamTrainers: dynamicTeam } = useContent();
  const HEAD_TRAINER = dynamicHead || DEFAULT_HEAD;
  const BRAND = dynamicBrand || DEFAULT_BRAND;
  const TEAM_TRAINERS = dynamicTeam || DEFAULT_TEAM;

  const [activeCert, setActiveCert] = useState(0);

  // Certificates for slider - placeholder cards ready for certificate photos
  const CERTIFICATES = [
    {
      id: 1,
      title: 'ISSA Certified Fitness Trainer (CFT)',
      org: 'International Sports Sciences Association',
      badge: 'Certified Master Trainer',
      year: 'Accredited',
      desc: 'Expertise in biomechanics, progressive overload strength training and injury-free exercise mechanics.',
      icon: Award,
      accent: '#FFD700',
    },
    {
      id: 2,
      title: 'Certified Nutrition & Diet Planning',
      org: 'Sports Nutrition & Macronutrient Specialist',
      badge: 'Certified Nutritionist',
      year: 'Accredited',
      desc: 'Custom macro calculation, flexible Indian diet planning, fat loss & muscle building meal structures.',
      icon: Dumbbell,
      accent: '#22C55E',
    },
    {
      id: 3,
      title: 'Transformation & Fat Loss Specialist',
      org: 'Physique Transformation Academy',
      badge: 'Body Recomposition Specialist',
      year: 'Accredited',
      desc: 'Proven protocol for sustained fat loss, metabolic recovery and natural body recomposition.',
      icon: Flame,
      accent: '#F97316',
    },
    {
      id: 4,
      title: 'Muscle Building & Strength Training',
      org: 'Hypertrophy & Strength Conditioning',
      badge: 'Hypertrophy Specialist',
      year: 'Accredited',
      desc: 'Science-based progressive programming for natural muscle gain, strength milestones & posture.',
      icon: Target,
      accent: '#3B82F6',
    },
    {
      id: 5,
      title: 'Lifestyle & Mindset Coaching',
      org: 'Behavioral Habit Transformation',
      badge: 'Mindset & Lifestyle Coach',
      year: 'Accredited',
      desc: 'Building sustainable lifelong fitness habits without restrictive or unrealistic crash diets.',
      icon: Sparkles,
      accent: '#A855F7',
    },
  ];

  const nextCert = () => {
    setActiveCert((prev) => (prev + 1) % CERTIFICATES.length);
  };

  const prevCert = () => {
    setActiveCert((prev) => (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length);
  };

  return (
    <div className="about-trainer-page">
      {/* ========================================================
          1. HERO SECTION: MEET SHIVAN — MASTER COACH
      ======================================================== */}
      <section className="about-trainer-hero">
        <div className="container about-hero-container">
          {/* Left Column: Introduction & Story */}
          <div className="about-hero-copy">
            <div className="about-hero-badge">
              <Crown size={14} className="text-yellow" />
              <span>Master Coach</span>
            </div>

            <h1 className="about-hero-title">
              Meet <span className="text-yellow">Shivan</span> — Master Coach Behind{' '}
              <span className="text-yellow">TrainXShiv</span>
            </h1>

            <p className="about-hero-desc">
              Hi, I'm Shivan, a certified fitness coach and founder of TrainXShiv. From struggling with gains, to
              transforming into a stronger, leaner, and healthier version of myself — my mission is to help people
              build a stronger and more confident version of themselves through science-based training, sustainable
              nutrition and disciplined mindset coaching.
            </p>

            <div className="about-hero-highlights">
              <div className="about-hl-item">
                <CheckCircle2 size={16} className="text-yellow" />
                <span>ISSA Certified Fitness &amp; Sports Nutritionist</span>
              </div>
              <div className="about-hl-item">
                <CheckCircle2 size={16} className="text-yellow" />
                <span>7+ Years Experience &bull; 100% Natural Transformation</span>
              </div>
              <div className="about-hl-item">
                <CheckCircle2 size={16} className="text-yellow" />
                <span>500+ Successful Transformations Guided</span>
              </div>
            </div>

            {/* Social Proof Stack */}
            <div className="about-hero-social-proof">
              <div className="avatar-stack">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                  alt="client"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="client"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="client"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                  alt="client"
                />
              </div>
              <div className="proof-text">
                <strong>500+ Happy Clients</strong>
                <span>100% Verified Transformations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Transformation Visual & Action Buttons Underneath */}
          <div className="about-hero-visual-col">
            <div className="about-hero-visual">
              {/* Before Card */}
              <div className="hero-ba-card before-card">
                <div className="ba-badge before-badge">Before</div>
                <div className="ba-img-wrap">
                  <img
                    src="/images/trainers/shivan_before.jpg"
                    alt="Shivan Before Transformation"
                    loading="eager"
                  />
                </div>
                <div className="ba-stats-footer">
                  <div className="ba-stat-item">
                    <strong>58 KG</strong>
                    <span>Body Weight</span>
                  </div>
                  <div className="ba-stat-item">
                    <strong>19%</strong>
                    <span>Body Fat</span>
                  </div>
                  <div className="ba-stat-item">
                    <strong>2018</strong>
                    <span>Year</span>
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
                  <img
                    src="/images/trainers/shivan_after.jpg"
                    alt="Shivan After Transformation"
                    loading="eager"
                  />
                </div>
                <div className="ba-stats-footer">
                  <div className="ba-stat-item">
                    <strong>76 KG</strong>
                    <span>Body Weight</span>
                  </div>
                  <div className="ba-stat-item">
                    <strong>10%</strong>
                    <span>Body Fat</span>
                  </div>
                  <div className="ba-stat-item">
                    <strong>2024</strong>
                    <span>Year</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: Directly under the photo as requested */}
            <div className="about-photo-actions">
              <button
                type="button"
                className="btn-about-primary"
                onClick={() => open('enroll', { plan: '1-on-1 Consultation with Master Coach Shivan' })}
              >
                <span>Book 1-on-1 Consultation</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={BRAND.instagram || 'https://www.instagram.com/trainxshiv/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-about-watch"
              >
                <div className="watch-play-circle">
                  <Play size={12} fill="#FFD700" className="text-yellow" />
                </div>
                <span>Watch My Story</span>
                <ExternalLink size={13} className="ext-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. METRICS STRIP (7+ YEARS & 100% SUCCESS)
      ======================================================== */}
      <section className="about-blue-strip">
        <div className="container about-strip-grid">
          <div className="strip-item">
            <div className="strip-ico-wrap">
              <Dumbbell size={22} className="strip-ico" />
            </div>
            <div className="strip-meta">
              <strong>+18 KG</strong>
              <span>Lean Muscle Gained</span>
            </div>
          </div>

          <div className="strip-divider" />

          <div className="strip-item">
            <div className="strip-ico-wrap">
              <BarChart3 size={22} className="strip-ico" />
            </div>
            <div className="strip-meta">
              <strong>10%</strong>
              <span>Body Fat Reduced</span>
            </div>
          </div>

          <div className="strip-divider" />

          <div className="strip-item">
            <div className="strip-ico-wrap">
              <Target size={22} className="strip-ico" />
            </div>
            <div className="strip-meta">
              <strong>100%</strong>
              <span>Natural &amp; Sustainable</span>
            </div>
          </div>

          <div className="strip-divider" />

          <div className="strip-item">
            <div className="strip-ico-wrap">
              <Crown size={22} className="strip-ico" />
            </div>
            <div className="strip-meta">
              <strong>7+ Years</strong>
              <span>Fitness Coaching Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. CERTIFICATIONS & SPECIALIZATIONS (CAROUSEL SLIDER)
          Placed directly under transformation photo section
      ======================================================== */}
      <section className="about-certifications-section">
        <div className="container">
          <div className="cert-section-head">
            <div>
              <span className="pill cert-pill">
                <Award size={14} className="text-yellow" /> Professional Accreditations
              </span>
              <h2 className="section-title">
                Certifications &amp; <span className="text-yellow">Specializations</span>
              </h2>
              <p className="section-sub">
                Verified certifications in sports sciences, personal training, and clinical diet planning.
              </p>
            </div>

            <div className="cert-slider-controls">
              <button
                type="button"
                className="cert-nav-btn"
                onClick={prevCert}
                aria-label="Previous Certificate"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="cert-nav-btn"
                onClick={nextCert}
                aria-label="Next Certificate"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Certificate Slider Showcase */}
          <div className="cert-slider-wrapper">
            <div className="cert-cards-track">
              {CERTIFICATES.map((cert, index) => {
                const IconComp = cert.icon;
                const isSelected = index === activeCert;
                return (
                  <article
                    key={cert.id}
                    className={`cert-slide-card ${isSelected ? 'active-cert' : ''}`}
                    onClick={() => setActiveCert(index)}
                  >
                    <div className="cert-card-top">
                      <div className="cert-badge-tag">
                        <IconComp size={15} style={{ color: cert.accent }} />
                        <span>{cert.badge}</span>
                      </div>
                      <span className="cert-accredited-pill">Verified</span>
                    </div>

                    <div className="cert-seal-box">
                      <Award size={36} className="cert-gold-seal" />
                      <div className="cert-seal-text">TRAINXSHIV CERTIFIED</div>
                    </div>

                    <h3 className="cert-card-title">{cert.title}</h3>
                    <div className="cert-card-org">{cert.org}</div>
                    <p className="cert-card-desc">{cert.desc}</p>

                    <div className="cert-card-footer">
                      <span className="cert-status-dot" />
                      <span>Certified &amp; Active Practicing Coach</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. "WATCH ALL TRANSFORMATIONS" BANNER
          Replaces Real Clients. Real Progress. as requested
      ======================================================== */}
      <section className="about-all-transformations-banner">
        <div className="container banner-inner-card">
          <div className="banner-content">
            <span className="banner-pill">
              <Trophy size={13} className="text-yellow" /> 500+ Verified Natural Transformations
            </span>
            <h2 className="banner-title">
              Real People. <span className="text-yellow">Real Results.</span>
            </h2>
            <p className="banner-desc">
              Discover verified before-and-after transformations, client journeys, and natural fat loss stories
              achieved with TrainXShiv coaching.
            </p>
          </div>

          <div className="banner-action">
            <Link to="/transformations" className="btn-watch-transformations">
              <span>Watch All Transformations</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR COACHING TEAM SECTION (KEPT INTACT)
      ======================================================== */}
      <section className="about-team-section">
        <div className="container">
          <div className="about-team-header">
            <h2 className="section-title">
              Our Coaching <span className="text-yellow">Team</span>
            </h2>
            <p className="section-sub">
              Led by Master Coach Shivan, our team of certified trainers work together to provide the best
              guidance in training, nutrition and lifestyle transformation.
            </p>
          </div>

          <div className="about-team-grid">
            {/* Featured Master Coach: Shivan */}
            <article className="team-featured-card">
              <div className="team-featured-img-col">
                <img
                  src={HEAD_TRAINER.img || '/foundercoach/shivamsingh.png'}
                  alt={HEAD_TRAINER.name || 'Shivan'}
                />
                <div className="team-featured-badge">
                  <Crown size={13} />
                  <span>Master Coach</span>
                </div>
              </div>

              <div className="team-featured-body">
                <h3 className="team-featured-name">{HEAD_TRAINER.name || 'Shivan'}</h3>
                <div className="team-featured-role">Master Coach &bull; TrainXShiv</div>
                <p className="team-featured-bio">
                  Helping people build a stronger, healthier and more confident version of themselves through
                  personalized coaching.
                </p>

                <div className="team-social-row">
                  <a
                    href={HEAD_TRAINER.socials?.instagram || 'https://www.instagram.com/trainxshiv/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="team-social-circle"
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href={HEAD_TRAINER.socials?.youtube || 'https://www.youtube.com/@trainxshiv'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="team-social-circle"
                  >
                    <Youtube size={14} />
                  </a>
                  <a
                    href={HEAD_TRAINER.socials?.email || 'mailto:trainxshiv@gmail.com'}
                    aria-label="Email"
                    className="team-social-circle"
                  >
                    <Mail size={14} />
                  </a>
                </div>

                <button
                  type="button"
                  className="btn-featured-consult"
                  onClick={() => open('enroll', { plan: `Coaching with ${HEAD_TRAINER.name || 'Shivan'}` })}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>

            {/* Team Trainer 2: Rohit Sharma */}
            <article className="team-portrait-card">
              <div className="team-portrait-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&auto=format&fit=crop&q=80"
                  alt="Rohit Sharma"
                  loading="lazy"
                />
              </div>
              <div className="team-portrait-body">
                <h3 className="team-portrait-name">Rohit Sharma</h3>
                <div className="team-portrait-role">Strength &amp; Conditioning</div>

                <div className="team-social-row center">
                  <a
                    href="https://www.instagram.com/trainxshiv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="team-social-circle"
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp || '917080263878'}?text=Hi%20Rohit,%20I%20am%20interested%20in%20Strength%20%26%20Conditioning`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="team-social-circle"
                  >
                    <MessageCircle size={14} />
                  </a>
                  <a
                    href="https://www.youtube.com/@trainxshiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="team-social-circle"
                  >
                    <Youtube size={14} />
                  </a>
                </div>

                <button
                  type="button"
                  className="btn-team-profile"
                  onClick={() => open('enroll', { plan: 'Training with Rohit Sharma' })}
                >
                  <span>View Profile</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </article>

            {/* Team Trainer 3: Priya Singh */}
            <article className="team-portrait-card">
              <div className="team-portrait-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
                  alt="Priya Singh"
                  loading="lazy"
                />
              </div>
              <div className="team-portrait-body">
                <h3 className="team-portrait-name">Priya Singh</h3>
                <div className="team-portrait-role">Nutrition Specialist</div>

                <div className="team-social-row center">
                  <a
                    href="https://www.instagram.com/trainxshiv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="team-social-circle"
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp || '917080263878'}?text=Hi%20Priya,%20I%20am%20interested%20in%20Nutrition%20guidance`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="team-social-circle"
                  >
                    <MessageCircle size={14} />
                  </a>
                  <a
                    href="https://www.youtube.com/@trainxshiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="team-social-circle"
                  >
                    <Youtube size={14} />
                  </a>
                </div>

                <button
                  type="button"
                  className="btn-team-profile"
                  onClick={() => open('enroll', { plan: 'Training with Priya Singh' })}
                >
                  <span>View Profile</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </article>

            {/* Team Trainer 4: Aarav Verma */}
            <article className="team-portrait-card">
              <div className="team-portrait-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                  alt="Aarav Verma"
                  loading="lazy"
                />
              </div>
              <div className="team-portrait-body">
                <h3 className="team-portrait-name">Aarav Verma</h3>
                <div className="team-portrait-role">Lifestyle Coach</div>

                <div className="team-social-row center">
                  <a
                    href="https://www.instagram.com/trainxshiv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="team-social-circle"
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp || '917080263878'}?text=Hi%20Aarav,%20I%20am%20interested%20in%20Lifestyle%20Coaching`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="team-social-circle"
                  >
                    <MessageCircle size={14} />
                  </a>
                  <a
                    href="https://www.youtube.com/@trainxshiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="team-social-circle"
                  >
                    <Youtube size={14} />
                  </a>
                </div>

                <button
                  type="button"
                  className="btn-team-profile"
                  onClick={() => open('enroll', { plan: 'Training with Aarav Verma' })}
                >
                  <span>View Profile</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. WHY OUR COACHING DELIVERS UNMATCHED RESULTS
      ======================================================== */}
      <section className="about-coaching-results-section">
        <div className="container">
          <div className="coaching-results-header">
            <h2 className="section-title">
              Why Our Coaching <span className="text-yellow">Delivers</span> Unmatched{' '}
              <span className="text-yellow">Results</span>
            </h2>
            <p className="section-sub">
              We don't sell shortcuts — we build real habits, real progress, and real life transformation.
            </p>
          </div>

          <div className="coaching-results-grid">
            <div className="coaching-feature-card">
              <div className="coaching-ico-box">
                <Target size={22} className="text-yellow" />
              </div>
              <h3>100% Goal-Based Plans</h3>
              <p>Customized training and nutrition plans based on your body, lifestyle and goals.</p>
            </div>

            <div className="coaching-feature-card">
              <div className="coaching-ico-box">
                <ShieldCheck size={22} className="text-yellow" />
              </div>
              <h3>Injury-Free Form Audits</h3>
              <p>Learn the right technique to train safely, avoid injuries and maximize results.</p>
            </div>

            <div className="coaching-feature-card">
              <div className="coaching-ico-box">
                <MessageSquare size={22} className="text-yellow" />
              </div>
              <h3>Direct Coach on WhatsApp</h3>
              <p>Get ongoing support, doubt solving and personal guidance directly from the coach.</p>
            </div>

            <div className="coaching-feature-card">
              <div className="coaching-ico-box">
                <BarChart3 size={22} className="text-yellow" />
              </div>
              <h3>Weekly Progress Adjustments</h3>
              <p>Your plan is updated regularly based on your progress, feedback and changing goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. CTA: LET'S BUILD A STRONGER YOU
      ======================================================== */}
      <section className="about-cta-banner">
        <div className="container about-cta-inner">
          <div className="about-cta-logo-wrap">
            <div className="about-cta-logo-circle">
              <img src="/logo.png" alt="TrainXShiv" />
            </div>
          </div>

          <div className="about-cta-content">
            <span className="about-cta-eyebrow">READY TO TRANSFORM?</span>
            <h2 className="about-cta-title">Let's Build a Stronger You</h2>
            <p className="about-cta-desc">
              Get personalized training, diet plans and one-on-one coaching to achieve your fitness goals.
            </p>

            <div className="about-cta-actions">
              <button
                type="button"
                className="btn-cta-gold"
                onClick={() => open('enroll', { plan: 'Complete Transformation Coaching' })}
              >
                <span>Start Your Transformation</span>
                <ArrowRight size={16} />
              </button>

              <Link to="/contact" className="btn-cta-outline">
                <span>Contact a Coach</span>
              </Link>
            </div>

            <div className="about-cta-perks">
              <span>
                <Check size={14} className="perk-check text-yellow" /> Personalized Plans
              </span>
              <span>
                <Check size={14} className="perk-check text-yellow" /> Expert Guidance
              </span>
              <span>
                <Check size={14} className="perk-check text-yellow" /> Flexible Training
              </span>
              <span>
                <Check size={14} className="perk-check text-yellow" /> Ongoing Support
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
