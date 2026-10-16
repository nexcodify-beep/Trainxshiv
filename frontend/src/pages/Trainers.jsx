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
  Star,
  Award,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Youtube,
  Mail,
  X,
  ClipboardList,
  FlaskConical,
  Check,
} from 'lucide-react';
import { HEAD_TRAINER as DEFAULT_HEAD, BRAND as DEFAULT_BRAND, TEAM_TRAINERS as DEFAULT_TEAM } from '../data';
import { useModal, useContent } from '../context';

export default function Trainers() {
  const { open } = useModal();
  const { headTrainer: dynamicHead, brand: dynamicBrand, teamTrainers: dynamicTeam } = useContent();
  const HEAD_TRAINER = dynamicHead || DEFAULT_HEAD;
  const BRAND = dynamicBrand || DEFAULT_BRAND;
  const TEAM_TRAINERS = dynamicTeam || DEFAULT_TEAM;

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Client transformation data directly matching the reference design
  const CLIENT_TRANSFORMS = [
    {
      id: 1,
      name: 'Amit Kumar',
      sublabel: 'Lost 12 KG • Gained Strength',
      tagline: '4 MONTHS TRANSFORMATION',
      img: '/images/transformations/ba7.png',
      tag1: '⬇ -12 KG Weight Loss',
      tag1Type: 'loss',
      tag2: '⬆ +8 KG Muscle Gain',
      tag2Type: 'gain',
    },
    {
      id: 2,
      name: 'Rohit Verma',
      sublabel: 'Fat to Fit Transformation',
      tagline: '4 MONTHS TRANSFORMATION',
      img: '/images/transformations/ba8.png',
      tag1: '⬇ -10 KG Weight Loss',
      tag1Type: 'loss',
      tag2: '⬆ +6 KG Muscle Gain',
      tag2Type: 'gain',
    },
    {
      id: 3,
      name: 'Rahul Mishra',
      sublabel: 'Lean Physique & Better Posture',
      tagline: '4 MONTHS TRANSFORMATION',
      img: '/images/transformations/b9.png',
      tag1: '⬇ -8 KG Weight Loss',
      tag1Type: 'loss',
      tag2: '⬆ +6 KG Muscle Gain',
      tag2Type: 'gain',
    },
    {
      id: 4,
      name: 'Vikas Yadav',
      sublabel: 'Mass Gain Transformation',
      tagline: '6 MONTHS TRANSFORMATION',
      img: '/images/transformations/b10.png',
      tag1: '⬆ +14 KG Muscle Gain',
      tag1Type: 'gain',
      tag2: '⬇ -6% Body Fat',
      tag2Type: 'loss',
    },
  ];

  const nextTransform = () => {
    setActiveSlide((prev) => (prev + 1) % CLIENT_TRANSFORMS.length);
  };

  const prevTransform = () => {
    setActiveSlide((prev) => (prev - 1 + CLIENT_TRANSFORMS.length) % CLIENT_TRANSFORMS.length);
  };

  return (
    <div className="about-trainer-page">
      {/* ========================================================
          1. HERO SECTION: MEET SHIVAN — THE VISIONARY BEHIND TRAINXSHIV
      ======================================================== */}
      <section className="about-trainer-hero">
        <div className="container about-hero-container">
          {/* Left Column: Hero Copy & Feature Pills */}
          <div className="about-hero-copy">
            <div className="about-hero-badge">
              <User size={14} className="text-blue" />
              <span>Founder &amp; Head Coach</span>
            </div>

            <h1 className="about-hero-title">
              Meet <span className="text-blue">Shivan</span> — The Visionary Behind{' '}
              <span className="text-blue">TrainXShiv</span>
            </h1>

            <p className="about-hero-desc">
              From struggling with gains, to transforming into a stronger and healthier version of myself — now
              helping people achieve their own transformation through science-based training, nutrition and
              mindset coaching.
            </p>

            {/* 4 Feature Badges */}
            <div className="about-hero-features-grid">
              <div className="about-feat-pill">
                <ClipboardList size={15} className="text-blue" />
                <span>Personalized Coaching</span>
              </div>
              <div className="about-feat-pill">
                <FlaskConical size={15} className="text-blue" />
                <span>Science Based Approach</span>
              </div>
              <div className="about-feat-pill">
                <Target size={15} className="text-blue" />
                <span>Sustainable Results</span>
              </div>
              <div className="about-feat-pill">
                <MessageCircle size={15} className="text-blue" />
                <span>Online &amp; Offline Support</span>
              </div>
            </div>

            {/* Actions */}
            <div className="about-hero-actions">
              <button
                type="button"
                className="btn-about-primary"
                onClick={() => open('enroll', { plan: '1-on-1 Consultation with Shivan' })}
              >
                <span>Book 1-on-1 Consultation</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn-about-watch"
                onClick={() => setVideoModalOpen(true)}
              >
                <div className="watch-play-circle">
                  <Play size={12} fill="#1D5BF0" className="text-blue" />
                </div>
                <span>Watch My Story</span>
              </button>
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
                <strong>500+</strong>
                <span>Happy Transformations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dual Before & After Visual Cards */}
          <div className="about-hero-visual-wrapper">
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
          </div>
        </div>
      </section>

      {/* ========================================================
          2. BLUE HIGHLIGHT STRIP (STATS BAR)
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
              <strong>10+ Years</strong>
              <span>Fitness Coaching Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. ABOUT SHIVAN & CERTIFICATIONS (3-COLUMN SECTION)
      ======================================================== */}
      <section className="about-founder-deep-section">
        <div className="container about-founder-3col-grid">
          {/* Column 1: Bio & 2x2 Mini Stats */}
          <div className="founder-col-bio">
            <span className="founder-eyebrow">FOUNDER OF TRAINXSHIV</span>
            <h2 className="founder-col-title">
              About <span className="text-blue">Shivan</span>
            </h2>
            <p className="founder-col-text">
              Hi, I'm Shivan, a certified fitness coach and the founder of TrainXShiv. My mission is to help people
              build a stronger, healthier and more confident version of themselves through personalized training,
              nutrition guidance and a balanced lifestyle. I believe fitness is not just about looks, it's about
              better energy, discipline and a happier life.
            </p>

            {/* 2x2 Mini Stats Grid */}
            <div className="founder-mini-stats-grid">
              <div className="mini-stat-box">
                <Dumbbell size={18} className="mini-ico text-green" />
                <div>
                  <strong>500+</strong>
                  <span>Clients Transformed</span>
                </div>
              </div>
              <div className="mini-stat-box">
                <Target size={18} className="mini-ico text-blue" />
                <div>
                  <strong>98%</strong>
                  <span>Client Satisfaction</span>
                </div>
              </div>
              <div className="mini-stat-box">
                <Trophy size={18} className="mini-ico text-amber" />
                <div>
                  <strong>10+ Years</strong>
                  <span>Coaching Experience</span>
                </div>
              </div>
              <div className="mini-stat-box">
                <Star size={18} className="mini-ico text-purple" />
                <div>
                  <strong>4.9/5</strong>
                  <span>Average Rating</span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="founder-col-actions">
              <button
                type="button"
                className="btn-founder-consult"
                onClick={() => open('enroll', { plan: 'Free Consultation with Shivan' })}
              >
                <span>Book a Free Consultation</span>
                <ArrowRight size={15} />
              </button>

              <a
                href={`https://wa.me/${BRAND.whatsapp || '917080263878'}?text=${encodeURIComponent(
                  'Hi Shivan, I want to discuss my fitness transformation.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-founder-whatsapp"
              >
                <MessageCircle size={15} />
                <span>Chat with Shivan</span>
              </a>
            </div>
          </div>

          {/* Column 2: Video Card with Center Play Button */}
          <div className="founder-col-video">
            <div
              className="founder-video-card"
              onClick={() => setVideoModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setVideoModalOpen(true)}
              aria-label="Play Founder Story Video"
            >
              <img
                src="/foundercoach/shivamsingh.png"
                alt="Watch Founder Story"
                className="founder-video-img"
              />
              <div className="video-card-overlay">
                <button type="button" className="video-center-play-btn" aria-label="Play Video">
                  <Play size={20} fill="#1D5BF0" className="text-blue" />
                </button>
                <div className="video-meta-bottom">
                  <h4>Watch Founder's Story</h4>
                  <span>2:36 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Certifications & Specializations */}
          <div className="founder-col-certs">
            <div className="certs-card">
              <div className="certs-card-header">
                <Award size={18} className="text-blue" />
                <h3>Certifications &amp; Specializations</h3>
              </div>

              <div className="certs-list">
                <div className="cert-item">
                  <CheckCircle2 size={18} className="cert-check" />
                  <div>
                    <h4>ISSA Certified Fitness Trainer (CFT)</h4>
                    <p>International Sports Sciences Association</p>
                  </div>
                </div>

                <div className="cert-item">
                  <CheckCircle2 size={18} className="cert-check" />
                  <div>
                    <h4>Certified Nutrition &amp; Diet Planning</h4>
                    <p>Personalized Diet Plans For All Goals</p>
                  </div>
                </div>

                <div className="cert-item">
                  <CheckCircle2 size={18} className="cert-check" />
                  <div>
                    <h4>Transformation &amp; Fat Loss Specialist</h4>
                    <p>Specialist in Natural &amp; Sustainable Results</p>
                  </div>
                </div>

                <div className="cert-item">
                  <CheckCircle2 size={18} className="cert-check" />
                  <div>
                    <h4>Muscle Building &amp; Strength Training</h4>
                    <p>Progressive &amp; Science Based Programs</p>
                  </div>
                </div>

                <div className="cert-item">
                  <CheckCircle2 size={18} className="cert-check" />
                  <div>
                    <h4>Lifestyle &amp; Mindset Coaching</h4>
                    <p>Building Healthy Habits for Long Term Results</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. REAL CLIENTS. REAL PROGRESS. CAROUSEL SHOWCASE
      ======================================================== */}
      <section className="about-clients-progress-section">
        <div className="container">
          <div className="clients-progress-header">
            <div>
              <h2 className="section-title">
                Real Clients. <span className="text-blue">Real Progress.</span>
              </h2>
              <p className="section-sub">
                Here are some of my clients who trusted the process and achieved life-changing results.
              </p>
            </div>
            <div className="progress-nav-arrows">
              <button
                type="button"
                className="arrow-btn"
                onClick={prevTransform}
                aria-label="Previous Transformation"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="arrow-btn"
                onClick={nextTransform}
                aria-label="Next Transformation"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="progress-cards-grid">
            {CLIENT_TRANSFORMS.map((client) => (
              <article key={client.id} className="progress-card">
                <div className="progress-card-img-wrap">
                  <img src={client.img} alt={`${client.name} Transformation`} loading="lazy" />
                </div>
                <div className="progress-card-info">
                  <h3 className="progress-client-name">{client.name}</h3>
                  <p className="progress-client-sublabel">{client.sublabel}</p>
                  <div className="progress-tags-row">
                    <span className={client.tag1Type === 'loss' ? 'ptag-loss' : 'ptag-gain'}>
                      {client.tag1}
                    </span>
                    <span className={client.tag2Type === 'gain' ? 'ptag-gain' : 'ptag-loss'}>
                      {client.tag2}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR COACHING TEAM SECTION
      ======================================================== */}
      <section className="about-team-section">
        <div className="container">
          <div className="about-team-header">
            <h2 className="section-title">
              Our Coaching <span className="text-blue">Team</span>
            </h2>
            <p className="section-sub">
              Led by Shivan, our team of certified trainers work together to provide the best guidance in
              training, nutrition and lifestyle transformation.
            </p>
          </div>

          <div className="about-team-grid">
            {/* Featured Head Coach Card: Shivan */}
            <article className="team-featured-card">
              <div className="team-featured-img-col">
                <img
                  src={HEAD_TRAINER.img || '/foundercoach/shivamsingh.png'}
                  alt={HEAD_TRAINER.name || 'Shivan'}
                />
                <div className="team-featured-badge">
                  <Crown size={13} />
                  <span>Founder &amp; Head Coach</span>
                </div>
              </div>

              <div className="team-featured-body">
                <h3 className="team-featured-name">{HEAD_TRAINER.name || 'Shivan'}</h3>
                <div className="team-featured-role">Founder of TrainXShiv</div>
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
              Why Our Coaching <span className="text-blue">Delivers</span> Unmatched{' '}
              <span className="text-blue">Results</span>
            </h2>
            <p className="section-sub">
              We don't sell shortcuts — we build real habits, real progress, and real life transformation.
            </p>
          </div>

          <div className="coaching-results-grid">
            <div className="coaching-feature-card">
              <div className="coaching-ico-box">
                <Target size={22} className="text-blue" />
              </div>
              <h3>100% Goal-Based Plans</h3>
              <p>Customized training and nutrition plans based on your body, lifestyle and goals.</p>
            </div>

            <div className="coaching-feature-card">
              <div className="coaching-ico-box">
                <ShieldCheck size={22} className="text-blue" />
              </div>
              <h3>Injury-Free Form Audits</h3>
              <p>Learn the right technique to train safely, avoid injuries and maximize results.</p>
            </div>

            <div className="coaching-feature-card">
              <div className="coaching-ico-box">
                <MessageSquare size={22} className="text-blue" />
              </div>
              <h3>Direct Coach on WhatsApp</h3>
              <p>Get ongoing support, doubt solving and personal guidance directly from the coach.</p>
            </div>

            <div className="coaching-feature-card">
              <div className="coaching-ico-box">
                <BarChart3 size={22} className="text-blue" />
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
                className="btn-cta-white"
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
                <Check size={14} className="perk-check" /> Personalized Plans
              </span>
              <span>
                <Check size={14} className="perk-check" /> Expert Guidance
              </span>
              <span>
                <Check size={14} className="perk-check" /> Flexible Training
              </span>
              <span>
                <Check size={14} className="perk-check" /> Ongoing Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          VIDEO MODAL FOR FOUNDER STORY
      ======================================================== */}
      {videoModalOpen && (
        <div
          className="about-video-modal-backdrop"
          onClick={() => setVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="about-video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="about-video-close-btn"
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close Video"
            >
              <X size={20} />
            </button>

            <div className="about-video-player-wrap">
              <video
                src="/videos/our-story.mp4"
                controls
                autoPlay
                playsInline
                className="about-video-element"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
