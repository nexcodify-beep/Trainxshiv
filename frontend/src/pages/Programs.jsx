import { useState } from 'react';
import { ArrowRight, RotateCcw, Wand2, Target, Check } from 'lucide-react';
import { PROGRAMS as DEFAULT_PROGRAMS, PLANS as DEFAULT_PLANS } from '../data';
import { ProgramGrid, Guidance, CTA } from '../components/Sections';
import { SectionHead, Icon, inr } from '../components/ui';
import { useModal, useContent } from '../context';

const QUIZ = [
  { q: 'What is your primary goal?', o: [['premium-online-coaching', 'Personal Coaching (1:1 Online)'], ['recorded-muscle-building', 'Build Muscle & Strength'], ['recorded-weight-loss', 'Weight Loss Program'], ['offline-pt', 'Doorstep Personal Training']] },
  { q: 'How experienced are you?', o: [['b', 'Beginner'], ['i', 'Intermediate'], ['a', 'Advanced']] },
  { q: 'Where will you train?', o: [['gym', 'Gym'], ['home', 'Home'], ['both', 'Both']] },
  { q: 'How do you want support?', o: [['online', 'Online Live / Chat guidance'], ['personal', 'Doorstep 1-on-1 supervision']] },
];

function Quiz() {
  const { open } = useModal();
  const { programs: dynamicProgs } = useContent();
  const PROGRAMS = dynamicProgs || DEFAULT_PROGRAMS;

  const [step, setStep] = useState(0);
  const [ans, setAns] = useState([]);
  const pick = (v) => { setAns([...ans, v]); setStep(step + 1); };
  const done = step >= QUIZ.length;
  const prog = done ? (PROGRAMS.find((p) => p.id === ans[0]) || PROGRAMS[0]) : null;
  return (
    <section className="section quiz-sec">
      <div className="container">
        <div className="quiz">
          <div>
            <span className="pill light"><Wand2 size={13} /> Find your perfect program</span>
            <h2>Which Program Is Right For You?</h2>
            <p>Answer 4 quick questions and we'll suggest the best program for your goal.</p>
          </div>
          <div className="quiz-box">
            {!done ? (
              <>
                <div className="qprog"><span>Step {step + 1} of {QUIZ.length}</span><div className="bar"><i style={{ width: `${((step + 1) / QUIZ.length) * 100}%` }} /></div></div>
                <h4>{QUIZ[step].q}</h4>
                <div className="qopts">{QUIZ[step].o.map(([v, l]) => <button key={v} className="chip q" onClick={() => pick(v)}>{l}</button>)}</div>
              </>
            ) : (
              <div className="qres">
                <small>We recommend</small>
                <h4>{prog?.title}</h4>
                <p>{prog?.tagline || prog?.tag} ({prog?.priceFormatted || inr(prog?.price || 1999)} {prog?.pricePeriod || ''})</p>
                <div className="row wrap">
                  <button className="btn btn-light" onClick={() => open('program', { id: prog?.id })}>Know More <ArrowRight size={16} /></button>
                  <button className="btn btn-outline-light" onClick={() => { setStep(0); setAns([]); }}><RotateCcw size={15} /> Retake</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Programs() {
  const { programs: dynamicProgs } = useContent();
  const PROGRAMS = dynamicProgs || DEFAULT_PROGRAMS;
  const cats = ['All', ...new Set(PROGRAMS.map((p) => p.cat))];
  const [cat, setCat] = useState('All');
  const items = cat === 'All' ? PROGRAMS : PROGRAMS.filter((p) => p.cat === cat);

  return (
    <>
      {/* Compact Page Hero: Extra spacing removed so goal selector directly follows */}
      <section className="page-hero compact-hero">
        <div className="container">
          <span className="pill">TrainXShiv packages</span>
          <h1>Packages & Programs Built Around <span className="text-yellow">Your Goal</span></h1>
          <p>Personalized training, nutrition and recorded programs designed for real, lasting results.</p>
        </div>
      </section>

      {/* Goal Category Filter & Programs Grid directly below hero without gap */}
      <section className="section tight zero-top-spacing">
        <div className="container">
          <SectionHead eyebrow="Explore Packages" title="Choose Your Fitness Package" sub="From doorstep 1-on-1 personal training to custom nutrition plans and workout programs." />
          <div className="chips reveal">
            {cats.map((c) => {
              const count = c === 'All' ? PROGRAMS.length : PROGRAMS.filter((p) => p.cat === c).length;
              return (
                <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>
                  {c} ({count})
                </button>
              );
            })}
          </div>
          <ProgramGrid key={cat} items={items} />
        </div>
      </section>

      <Quiz />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Why choose TrainXShiv" title="What You Get With Every Program" />
          <div className="grid g6 stagger reveal">
            {[
              ['MessageSquare', 'Personalized Workout Plan', 'Tailored to your goal and fitness level.'],
              ['Utensils', 'Personalized Diet Plan', 'Nutrition plans as per your lifestyle.'],
              ['LineChart', 'Weekly Progress Tracking', 'Track your results and stay motivated.'],
              ['Users', 'Expert Trainer Support', 'Direct guidance and regular check-ins.'],
              ['Video', 'Exercise Guidance', 'Video tutorials and proper form support.'],
              ['HeartPulse', 'Lifestyle Coaching', 'Long term habits for a healthier you.'],
            ].map(([i, t, d]) => (
              <div className="card feat-card" key={t}>
                <span className="d-ico"><Icon name={i} size={22} /></span>
                <h4>{t}</h4>
                <p className="muted small">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Complete support" title="Workout & Diet Guidance" sub="Clear roadmap and nutrition for your fitness transformation." />
          <Guidance />
        </div>
      </section>

      <CTA />
    </>
  );
}
