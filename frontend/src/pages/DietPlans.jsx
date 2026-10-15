import { Check, X, Crown } from 'lucide-react';
import DietTool from '../components/DietTool';
import { PAID_DIETS as DEFAULT_PAID_DIETS } from '../data';
import { SectionHead, inr } from '../components/ui';
import { useModal, useContent } from '../context';
import { CTA } from '../components/Sections';

export default function DietPlans() {
  const { open } = useModal();
  const { paidDiets: dynamicDiets } = useContent();
  const PAID_DIETS = dynamicDiets || DEFAULT_PAID_DIETS;
  const rows = [['Calorie & macro targets', true, true], ['Sample Indian meal ideas', true, true], ['Built around your food choices & budget', false, true], ['Health notes & allergies considered', false, true], ['Weekly plan updates', false, true], ['Chat support with a coach', false, true]];
  return (
    <>
      <section className="page-hero"><div className="container"><span className="pill">Diet & nutrition</span><h1>Free & Paid <em>Diet Plans</em></h1><p>Start free today. Upgrade to a coach-made plan whenever you are ready.</p></div></section>
      <section className="section tight"><div className="container">
        <div className="tool-wrap card no-tilt reveal">
          <div className="tool-side"><span className="pill light">100% free</span><h2>Free Diet Plan Generator</h2><p>Enter your details and get your daily calories, protein, carbs, fat and a sample day of Indian food. Download it and start today.</p><ul className="ticks light"><li><Check size={15} />No signup needed</li><li><Check size={15} />Veg & non-veg options</li><li><Check size={15} />Download as a file</li></ul></div>
          <div className="tool-main"><DietTool /></div>
        </div>
      </div></section>
      <section className="section alt"><div className="container">
        <SectionHead eyebrow="Paid plans" title="Custom Diet Plans By Our Coaches" sub="Built around your body, routine and taste. Updated as you progress." />
        <div className="grid g3 stagger reveal">
          {PAID_DIETS.map((p) => (
            <div key={p.id} className={`card price-card ${p.popular ? 'popular' : ''}`}>
              {p.popular && <span className="ribbon"><Crown size={13} /> Most popular</span>}
              <h3>{p.name}</h3><div className="price">{inr(p.price)}<small> / {p.weeks}</small></div>
              <ul className="ticks">{p.items.map((x) => <li key={x}><Check size={15} />{x}</li>)}</ul>
              <button className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'} full`} onClick={() => open('enroll', { plan: p.name })}>Choose Plan</button>
            </div>
          ))}
        </div>
      </div></section>
      <section className="section"><div className="container">
        <SectionHead eyebrow="Compare" title="Free vs Paid Diet Plan" />
        <div className="table-wrap card no-tilt reveal"><table className="cmp">
          <thead><tr><th>Features</th><th>Free</th><th className="hl">Paid</th></tr></thead>
          <tbody>{rows.map(([n, a, b]) => <tr key={n}><td>{n}</td><td>{a ? <Check className="yes" size={18} /> : <X className="no" size={18} />}</td><td className="hl">{b ? <Check className="yes" size={18} /> : <X className="no" size={18} />}</td></tr>)}</tbody>
        </table></div>
      </div></section>
      <CTA />
    </>
  );
}
