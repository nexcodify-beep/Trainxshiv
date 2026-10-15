import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, Play, Sparkles, Clock, BarChart3, Quote, Instagram, 
  Gift, Crown, ChevronLeft, ChevronRight, Users, Trophy, Target, Headphones 
} from 'lucide-react';
import { BRAND, PROGRAMS, TRAINERS, TRANSFORMS, VIDEO_REVIEWS, TESTIMONIALS, STEPS } from '../data';
import { useModal, useContent } from '../context';
import { Icon, Img, Counter, SectionHead, Stars } from './ui';
import BeforeAfter from './BeforeAfter';
import { HeroTransformationCard } from './HeroTransformationSlider';

export function Hero({ className = '', isFooterHero = false }) {
  const { open } = useModal();
  const { hero, brand, headTrainer } = useContent();

  const defaultLine1 = 'Transform Your Body.';
  const defaultLine2 = 'Transform Your Life.';
  let line1 = defaultLine1;
  let line2 = defaultLine2;

  if (hero?.title) {
    if (hero.title.includes('\n')) {
      const parts = hero.title.split('\n');
      line1 = parts[0].trim();
      line2 = parts.slice(1).join(' ').trim();
    } else if (hero.title.toLowerCase().includes('transform your body') && hero.title.toLowerCase().includes('transform your life')) {
      line1 = 'Transform Your Body.';
      line2 = 'Transform Your Life.';
    } else if (hero.title.includes('.')) {
      const parts = hero.title.split('.');
      line1 = parts[0] + '.';
      line2 = parts.slice(1).join('.').trim();
    } else {
      const words = hero.title.split(' ');
      if (words.length > 3) {
        const mid = Math.ceil(words.length / 2);
        line1 = words.slice(0, mid).join(' ');
        line2 = words.slice(mid).join(' ');
      } else {
        line1 = hero.title;
        line2 = '';
      }
    }
  }

  const subtitleText = hero?.subtitle || 'At TrainXShiv, we help you build a stronger, healthier and more confident YOU with personalized training, nutrition and complete lifestyle guidance.';
  const stat1Num = parseInt((hero?.stat1Number || '500').replace(/\D/g, '')) || 500;
  const stat1Suffix = (hero?.stat1Number || '500+').replace(/\d/g, '') || '+';
  const stat2Num = parseInt((hero?.stat2Number || '98').replace(/\D/g, '')) || 98;
  const stat2Suffix = (hero?.stat2Number || '98%').replace(/\d/g, '') || '%';
  const stat3Num = parseInt((hero?.stat3Number || '10').replace(/\D/g, '')) || 10;
  const stat3Suffix = (hero?.stat3Number || '10+').replace(/\d/g, '') || '+';

  return (
    <section className={`hero-exact-section ${className} ${isFooterHero ? 'hero-footer-style' : ''}`}>
      {/* Background ambient lighting */}
      <div className="hero-ambient-glow left" />
      <div className="hero-ambient-glow right" />

      <div className="container hero-exact-grid">
        {/* Left Side: Exactly matching user image */}
        <div className="hero-exact-copy">
          {/* Pill Badge */}
          <div className="hero-pill-badge">
            <Sparkles size={14} className="hero-pill-sparkle" />
            <span>{brand?.heroBadge || 'Start With Coach Shivam'}</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-exact-title">
            <span className="hero-title-dark">{line1}</span>
            {line2 && <span className="hero-title-blue">{line2}</span>}
          </h1>

          {/* Subtitle */}
          <p className="hero-exact-subtitle">{subtitleText}</p>

          {/* Action Buttons */}
          <div className="hero-exact-actions">
            <button className="btn-hero-primary" onClick={() => open('enroll')}>
              <span>{hero?.ctaPrimary || 'Start Your Transformation'}</span>
              <ArrowRight size={18} />
            </button>
            <Link to="/programs" className="btn-hero-outline">
              <span>{hero?.ctaSecondary || 'Explore Programs'}</span>
            </Link>
          </div>

          {/* 4 Stats Cards Row */}
          <div className="hero-exact-stats-grid">
            {/* Stat 1: Happy Clients */}
            <div className="hero-stat-card">
              <div className="hero-stat-icon-box">
                <Users size={19} />
              </div>
              <div className="hero-stat-meta">
                <div className="hero-stat-number"><Counter to={stat1Num} suffix={stat1Suffix} /></div>
                <div className="hero-stat-label">{hero?.stat1Label || 'Happy Clients'}</div>
              </div>
            </div>

            {/* Stat 2: Years Experience */}
            <div className="hero-stat-card">
              <div className="hero-stat-icon-box">
                <Trophy size={19} />
              </div>
              <div className="hero-stat-meta">
                <div className="hero-stat-number"><Counter to={stat3Num} suffix={stat3Suffix} /></div>
                <div className="hero-stat-label">{hero?.stat3Label || 'Years Experience'}</div>
              </div>
            </div>

            {/* Stat 3: Success Rate */}
            <div className="hero-stat-card">
              <div className="hero-stat-icon-box">
                <Target size={19} />
              </div>
              <div className="hero-stat-meta">
                <div className="hero-stat-number"><Counter to={stat2Num} suffix={stat2Suffix} /></div>
                <div className="hero-stat-label">{hero?.stat2Label || 'Success Rate'}</div>
              </div>
            </div>

            {/* Stat 4: Support */}
            <div className="hero-stat-card">
              <div className="hero-stat-icon-box">
                <Headphones size={19} />
              </div>
              <div className="hero-stat-meta">
                <div className="hero-stat-number">24/7</div>
                <div className="hero-stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Transformation Slider replacing image on Hero */}
        <div className="hero-exact-visual">
          <HeroTransformationCard />
        </div>
      </div>
    </section>
  );
}

export function ProgramCard({ p }) {
  const { open } = useModal();
  return (
    <article className="card pcard">
      <div className="media"><Img src={p.img} alt={p.title} label={p.cat} /><span className="ico"><Icon name={p.icon} size={22} /></span></div>
      <div className="card-body">
        <h3>{p.title}</h3>
        <p className="muted">{p.tag}</p>
        <ul className="ticks">{p.features.map((x) => <li key={x}><Check size={15} />{x}</li>)}</ul>
        <div className="meta"><span><Clock size={13} /> {p.weeks}</span><span><BarChart3 size={13} /> {p.level}</span></div>
        <button className="btn btn-primary btn-sm full" onClick={() => open('program', { id: p.id })}>Explore Program <ArrowRight size={15} /></button>
      </div>
    </article>
  );
}

export function ProgramGrid({ items }) {
  const { programs } = useContent();
  const list = items || programs;
  return <div className="grid g3 stagger reveal">{list.map((p) => <ProgramCard key={p.id} p={p} />)}</div>;
}

export function DietTeaser() {
  const { open } = useModal();
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Diet plans" title="Free or Paid. Your Diet, Your Way." sub="Start free in 30 seconds, or get a plan built just for your body, food choices and routine." />
        <div className="grid g2 stagger reveal">
          <div className="card diet-card">
            <span className="d-ico"><Gift size={26} /></span>
            <span className="tagx green">Free</span>
            <h3>Free Diet Plan</h3>
            <p className="muted">Enter your age, height and weight to get daily calories, macros and a sample Indian meal plan.</p>
            <ul className="ticks"><li><Check size={15} />Calorie & macro targets</li><li><Check size={15} />Veg & non-veg meal ideas</li><li><Check size={15} />Download instantly</li></ul>
            <button className="btn btn-primary" onClick={() => open('freediet')}>Get Free Plan <ArrowRight size={17} /></button>
          </div>
          <div className="card diet-card gold">
            <span className="d-ico"><Crown size={26} /></span>
            <span className="tagx">Paid · from ₹999</span>
            <h3>Custom Diet Plan</h3>
            <p className="muted">A coach designs your plan around your body, schedule, budget and health notes, then updates it as you progress.</p>
            <ul className="ticks"><li><Check size={15} />Made by a certified coach</li><li><Check size={15} />Weekly updates & chat support</li><li><Check size={15} />Grocery list & travel tips</li></ul>
            <Link to="/diet-plans" className="btn btn-ghost">See Paid Plans <ArrowRight size={17} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import TrainerSection from './TrainerSection';
import RealResultsSlider from './RealResultsSlider';
export { TrainerSection, RealResultsSlider };

export function TrainerGrid({ showHeader = false, ...props }) {
  return <TrainerSection showHeader={showHeader} {...props} />;
}

export function TransformStrip({ items, dark = true }) {
  const { transforms } = useContent();
  const list = items || transforms.slice(0, 4);
  return <div className="grid g4 stagger reveal">{list.map((t) => <BeforeAfter key={t.id} t={t} dark={dark} />)}</div>;
}

export function VideoReviews({ items }) {
  const { open } = useModal();
  const { videoReviews } = useContent();
  const list = items || videoReviews;
  return (
    <div className="grid g4 stagger reveal">
      {list.map((v) => (
        <button key={v.id} className="card vcard" onClick={() => open('video', { title: v.name, sub: v.result, src: v.video, youtube: v.youtube })} aria-label={`Play review by ${v.name}`}>
          <div className="vmedia"><Img src={v.poster} alt={v.name} label={v.name} /><span className="vplay"><Play size={24} fill="currentColor" /></span></div>
          <div className="vinfo"><b>{v.name}</b><span>{v.result}</span></div>
        </button>
      ))}
    </div>
  );
}

export function Testimonials({ items }) {
  const { testimonials } = useContent();
  const list = items || testimonials;
  return (
    <div className="grid g3 stagger reveal">
      {list.map((t) => (
        <article key={t.id || t.name} className="card tst">
          <Quote className="q" size={34} />
          <div className="who"><div className="avatar"><Img src={t.img} alt={t.name} label={t.name[0]} /></div><div><b>{t.name}</b><Stars /></div></div>
          <p>“{t.text}”</p>
        </article>
      ))}
    </div>
  );
}

export function HowItWorks({ items }) {
  const { steps } = useContent();
  const list = items || steps;
  return (
    <div className="steps stagger reveal">
      {list.map((s, i) => (
        <div className="step" key={s.t || i}>
          <div className="step-ico"><Icon name={s.icon || 'Target'} size={26} /><i>{i + 1}</i></div>
          <h4>{s.t}</h4><p className="muted small">{s.d}</p>
        </div>
      ))}
    </div>
  );
}

export function Guidance() {
  return (
    <div className="grid g2 stagger reveal">
      <div className="card gcard">
        <div className="g-text"><span className="pill">Diet guidance</span><h3>Nutrition for a Better You</h3>
          <ul className="ticks">{['Personalized meal plans', 'Vegetarian & non-vegetarian options', 'Easy & sustainable diets', 'Nutrition tracking'].map((x) => <li key={x}><Check size={15} />{x}</li>)}</ul>
          <Link to="/diet-plans" className="btn btn-primary btn-sm">Explore Diet Plans <ArrowRight size={15} /></Link></div>
        <div className="g-img"><Img src="/images/nutrition.jpg" alt="Healthy meal" label="Nutrition" /></div>
      </div>
      <div className="card gcard">
        <div className="g-text"><span className="pill">Workout guidance</span><h3>Structured Training Plans</h3>
          <ul className="ticks">{['Gym workouts', 'Home workout plans', 'Video tutorials', 'Progress tracking'].map((x) => <li key={x}><Check size={15} />{x}</li>)}</ul>
          <Link to="/programs" className="btn btn-primary btn-sm">Explore Workouts <ArrowRight size={15} /></Link></div>
        <div className="g-img"><Img src="/images/workout.jpg" alt="Dumbbells" label="Workout" /></div>
      </div>
    </div>
  );
}

export function InstaStrip() {
  const reels = [
    'DKv6xndhtVg',
    'DeJyFXKJOJT',
    'Dc8uhPpSU60',
    'Dbm01Kspt2l',
    'DawQuANzQSZ',
    'DZLOlhEBTIO',
  ];

  return (
    <div className="insta stagger reveal">
      {reels.map((reel) => (
        <InstagramReel key={reel} reel={reel} />
      ))}
    </div>
  );
}

function InstagramReel({ reel }) {
  const [loaded, setLoaded] = useState(false);
  const reelUrl = `https://www.instagram.com/reel/${reel}/`;

  return (
    <div className="card itile">
      <div className="itile-video">
        {!loaded && (
          <div className="insta-loader" role="status" aria-label="Loading Instagram video">
            <span />
          </div>
        )}
        <iframe
          src={`${reelUrl}embed/?autoplay=1&muted=1`}
          title={`TrainXShiv Instagram reel ${reel}`}
          loading="lazy"
          scrolling="no"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
      <a className="insta-open-link" href={reelUrl} target="_blank" rel="noreferrer">
        <Instagram size={16} /> Open on Instagram
      </a>
    </div>
  );
}

export function CTA() {
  const { open } = useModal();
  return (
    <section className="cta">
      <div className="container cta-in">
        <div className="cta-logo"><img src="/logo.png" alt="" /></div>
        <div>
          <span className="pill light">Ready to start?</span>
          <h2>Let's Build a Stronger You</h2>
          <p>Join TrainXShiv today and take the first step towards a healthier, stronger and more confident life.</p>
          <div className="row wrap">
            <button className="btn btn-light btn-lg" onClick={() => open('enroll')}>Start Your Transformation <ArrowRight size={18} /></button>
            <Link to="/contact" className="btn btn-outline-light btn-lg">Contact a Coach</Link>
          </div>
          <div className="perks">{['Personalized Plans', 'Expert Trainers', 'Flexible Training', 'Ongoing Support'].map((x) => <span key={x}><Check size={15} />{x}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [
    { text: 'Diet Plans', highlight: true },
    { text: 'Online Coaching', highlight: true },
    { text: 'Personal Training', highlight: true },
    { text: 'Fat Loss', highlight: false },
    { text: 'Muscle Building', highlight: false },
    { text: '1-on-1 Guidance', highlight: true },
    { text: 'Custom Nutrition', highlight: false },
    { text: 'Real Transformations', highlight: true },
  ];

  const renderGroup = (keyPrefix) => (
    <div className="marquee-group" key={keyPrefix}>
      {items.map((item, idx) => (
        <span key={`${keyPrefix}-${idx}`} className={`marquee-item ${item.highlight ? 'feat' : ''}`}>
          <Sparkles size={14} className="marquee-ico" />
          <span>{item.text}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-inner">
        {renderGroup('g1')}
        {renderGroup('g2')}
      </div>
    </div>
  );
}
