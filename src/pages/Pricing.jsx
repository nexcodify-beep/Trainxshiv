import { useState } from 'react';
import { Check, X, Plus, Minus, Crown } from 'lucide-react';
import { PLANS, FAQ } from '../data';
import { SectionHead, Icon, inr } from '../components/ui';
import { useModal } from '../context';
import { CTA } from '../components/Sections';

export default function Pricing() {
  const { open } = useModal();
  const [q, setQ] = useState(0);
  const yn = (v) => (v ? <Check className="yes" size={18} /> : <X className="no" size={18} />);
  return (
    <>
      <section className="page-hero"><div className="container"><span className="pill">Pricing</span><h1>Simple Plans. <em>Serious Results.</em></h1><p>Pick the level of support that suits you. Upgrade any time.</p></div></section>
      <section className="section tight"><div className="container">
        <div className="grid g4 stagger reveal">
          {PLANS.map((p) => (
            <div key={p.id} className={`card price-card ${p.popular ? 'popular' : ''}`}>
              {p.popular && <span className="ribbon"><Crown size={13} /> Best value</span>}
              <span className="d-ico"><Icon name={p.icon} size={22} /></span>
              <h3>{p.name}</h3><div className="price"><small>Starting </small>{inr(p.price)}</div>
              <ul className="ticks">
                <li><Check size={15} />{p.duration}</li>
                {p.workout && <li><Check size={15} />Workout plan</li>}
                {p.diet && <li><Check size={15} />Diet plan</li>}
                <li><Check size={15} />{p.support}</li>
                {p.tracking && <li><Check size={15} />Progress tracking</li>}
              </ul>
              <button className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'} full`} onClick={() => open('enroll', { plan: p.name })}>Choose Plan</button>
            </div>
          ))}
        </div>
      </div></section>
      <section className="section alt"><div className="container">
        <SectionHead eyebrow="Program comparison" title="Compare Our Programs" />
        <div className="table-wrap card no-tilt reveal"><table className="cmp">
          <thead><tr><th>Features</th>{PLANS.map((p) => <th key={p.id} className={p.popular ? 'hl' : ''}>{p.name}</th>)}</tr></thead>
          <tbody>
            <tr><td>Duration</td>{PLANS.map((p) => <td key={p.id} className={p.popular ? 'hl' : ''}>{p.duration}</td>)}</tr>
            <tr><td>Workout Plan</td>{PLANS.map((p) => <td key={p.id} className={p.popular ? 'hl' : ''}>{yn(p.workout)}</td>)}</tr>
            <tr><td>Diet Plan</td>{PLANS.map((p) => <td key={p.id} className={p.popular ? 'hl' : ''}>{yn(p.diet)}</td>)}</tr>
            <tr><td>Trainer Support</td>{PLANS.map((p) => <td key={p.id} className={p.popular ? 'hl' : ''}>{p.support}</td>)}</tr>
            <tr><td>Progress Tracking</td>{PLANS.map((p) => <td key={p.id} className={p.popular ? 'hl' : ''}>{yn(p.tracking)}</td>)}</tr>
            <tr><td>Price (Starting)</td>{PLANS.map((p) => <td key={p.id} className={p.popular ? 'hl' : ''}><b>{inr(p.price)}</b></td>)}</tr>
          </tbody>
        </table></div>
      </div></section>
      <section className="section"><div className="container narrow">
        <SectionHead eyebrow="FAQ" title="Questions? We've Got Answers" />
        <div className="faq reveal">{FAQ.map(([a, b], i) => (
          <div key={a} className={`card faq-i no-tilt ${q === i ? 'open' : ''}`}>
            <button onClick={() => setQ(q === i ? -1 : i)} aria-expanded={q === i}><span>{a}</span>{q === i ? <Minus size={18} /> : <Plus size={18} />}</button>
            <div className="faq-a"><p>{b}</p></div>
          </div>))}
        </div>
      </div></section>
      <CTA />
    </>
  );
}
