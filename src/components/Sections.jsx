import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Play, Sparkles, Clock, BarChart3, Quote, Instagram, Gift, Crown, ChevronLeft, ChevronRight } from 'lucide-react';
import { BRAND, PROGRAMS, TRAINERS, TRANSFORMS, VIDEO_REVIEWS, TESTIMONIALS, STEPS } from '../data';
import { useModal } from '../context';
import { Icon, Img, Counter, SectionHead, Stars } from './ui';
import BeforeAfter from './BeforeAfter';

export function Hero() {
  const { open } = useModal();
  return (
    <section className="hero">
      <div className="blob b1" /><div className="blob b2" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="pill"><Sparkles size={13} /> Personalized fitness coaching</span>
          <h1><span className="hero-line">Transform Your Body.</span><br /><em className="hero-line">Transform Your Life.</em></h1>
          <p>At TrainXShiv, we help you build a stronger, healthier and more confident YOU with personalized training, nutrition and complete lifestyle guidance.</p>
          <div className="row wrap">
            <button className="btn btn-primary btn-lg" onClick={() => open('enroll')}>Start Your Transformation <ArrowRight size={18} /></button>
            <Link to="/programs" className="btn btn-ghost btn-lg">Explore Programs</Link>
          </div>
          <div className="stats">
            {[['Users', 500, '+', 'Happy Clients'], ['Trophy', 10, '+', 'Years Experience'], ['Target', 98, '%', 'Success Rate'], ['Headphones', 24, '/7', 'Support']].map(([i, n, s, l]) => (
              <div key={l}><span className="stat-ico"><Icon name={i} size={18} /></span><b><Counter to={n} suffix={s} /></b><small>{l}</small></div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-ring" />
          <div className="hero-photo"><Img src="/foundercoach/shivamsingh.png" alt="Coach Shivam Singh" logo /></div>
          <div className="script">Stronger<br />Fitter<br />Happier<br />You</div>
          <button className="watch" onClick={() => open('video', { title: 'Our Story', src: '/videos/our-story.mp4' })}>
            <span className="playbtn"><Play size={20} fill="currentColor" /></span><span>Watch<br />our story</span>
          </button>
          <div className="badge-card"><b>Discipline today,</b> a stronger tomorrow.</div>
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

export function ProgramGrid({ items = PROGRAMS }) {
  return <div className="grid g3 stagger reveal">{items.map((p) => <ProgramCard key={p.id} p={p} />)}</div>;
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

export function TransformStrip({ items = TRANSFORMS.slice(0, 4), dark = true }) {
  return <div className="grid g4 stagger reveal">{items.map((t) => <BeforeAfter key={t.id} t={t} dark={dark} />)}</div>;
}

export function VideoReviews() {
  const { open } = useModal();
  return (
    <div className="grid g4 stagger reveal">
      {VIDEO_REVIEWS.map((v) => (
        <button key={v.id} className="card vcard" onClick={() => open('video', { title: v.name, sub: v.result, src: v.video, youtube: v.youtube })} aria-label={`Play review by ${v.name}`}>
          <div className="vmedia"><Img src={v.poster} alt={v.name} label={v.name} /><span className="vplay"><Play size={24} fill="currentColor" /></span></div>
          <div className="vinfo"><b>{v.name}</b><span>{v.result}</span></div>
        </button>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="grid g3 stagger reveal">
      {TESTIMONIALS.map((t) => (
        <article key={t.name} className="card tst">
          <Quote className="q" size={34} />
          <div className="who"><div className="avatar"><Img src={t.img} alt={t.name} label={t.name[0]} /></div><div><b>{t.name}</b><Stars /></div></div>
          <p>“{t.text}”</p>
        </article>
      ))}
    </div>
  );
}

export function HowItWorks() {
  return (
    <div className="steps stagger reveal">
      {STEPS.map((s, i) => (
        <div className="step" key={s.t}>
          <div className="step-ico"><Icon name={s.icon} size={26} /><i>{i + 1}</i></div>
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
