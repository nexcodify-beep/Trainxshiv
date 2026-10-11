import { useState } from 'react';
import { Calculator, Download, RotateCcw, MessageCircle, Leaf, Drumstick } from 'lucide-react';
import { waLink } from './ui';
import { useModal } from '../context';

const MEALS = {
  veg: {
    Breakfast: ['Besan chilla (3) + mint chutney + 1 fruit', 'Oats with milk, banana & almonds', 'Paneer bhurji + 2 multigrain rotis'],
    'Mid-morning': ['Roasted chana + buttermilk', 'Fruit + handful of mixed nuts', 'Hung curd with seeds'],
    Lunch: ['Dal + 2 rotis + sabzi + salad + curd', 'Rajma or chole + rice + salad', 'Soya chunk curry + brown rice + salad'],
    'Evening snack': ['Sprouts chaat', 'Protein shake + banana', 'Makhana + green tea'],
    Dinner: ['Paneer or tofu sabzi + 2 rotis + salad', 'Moong dal khichdi + curd', 'Vegetable dalia + dal'],
  },
  nonveg: {
    Breakfast: ['3 egg-white omelette + 2 whole eggs + 2 brown bread', 'Egg bhurji + 2 rotis + fruit', 'Oats with milk, banana & peanut butter'],
    'Mid-morning': ['2 boiled eggs + fruit', 'Protein shake + handful of nuts', 'Curd with seeds'],
    Lunch: ['Grilled chicken + rice + dal + salad', 'Fish curry + rice + salad', 'Chicken curry + 2 rotis + sabzi + curd'],
    'Evening snack': ['Chicken tikka or boiled egg whites', 'Protein shake + banana', 'Sprouts + green tea'],
    Dinner: ['Chicken or egg curry + 2 rotis + salad', 'Grilled fish + sautéed veggies', 'Egg bhurji + dal + roti'],
  },
};
const SPLIT = { Breakfast: 0.25, 'Mid-morning': 0.1, Lunch: 0.3, 'Evening snack': 0.1, Dinner: 0.25 };
const ACT = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };

function calc(f) {
  const w = +f.weight, h = +f.height, a = +f.age;
  const bmr = 10 * w + 6.25 * h - 5 * a + (f.gender === 'male' ? 5 : -161);
  const tdee = bmr * ACT[f.activity];
  const adj = { fat: -450, gain: 450, muscle: 250, fit: 0 }[f.goal];
  const kcal = Math.max(Math.round((tdee + adj) / 10) * 10, f.gender === 'male' ? 1500 : 1200);
  const protein = Math.round(w * (f.goal === 'fat' || f.goal === 'muscle' ? 2 : 1.7));
  const fat = Math.round((kcal * 0.25) / 9);
  const carbs = Math.max(Math.round((kcal - protein * 4 - fat * 9) / 4), 0);
  const bmi = +(w / ((h / 100) ** 2)).toFixed(1);
  return { kcal, protein, fat, carbs, bmi, tdee: Math.round(tdee) };
}

export default function DietTool({ compact }) {
  const { open } = useModal();
  const [f, setF] = useState({ gender: 'male', age: '', height: '', weight: '', activity: 'moderate', goal: 'fat', food: 'veg' });
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!(f.age >= 14 && f.age <= 80)) return setErr('Enter an age between 14 and 80.');
    if (!(f.height >= 120 && f.height <= 230)) return setErr('Enter height in cm (120 to 230).');
    if (!(f.weight >= 30 && f.weight <= 250)) return setErr('Enter weight in kg (30 to 250).');
    setErr('');
    setRes(calc(f));
  };

  const text = () => {
    const m = MEALS[f.food];
    return [
      'TRAINXSHIV - FREE DIET PLAN', '',
      `Daily calories: ${res.kcal} kcal`, `Protein: ${res.protein} g | Carbs: ${res.carbs} g | Fat: ${res.fat} g`, '',
      ...Object.keys(m).flatMap((k) => [`${k} (~${Math.round(res.kcal * SPLIT[k])} kcal) - pick one:`, ...m[k].map((x) => `  - ${x}`), '']),
      'Drink 3-4 litres of water daily. This is general guidance, not medical advice.',
      'Want a plan made just for you? WhatsApp 7080263878',
    ].join('\n');
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([text()], { type: 'text/plain' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'TrainXShiv-Free-Diet-Plan.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  if (res) {
    const m = MEALS[f.food];
    const tot = res.protein * 4 + res.carbs * 4 + res.fat * 9;
    return (
      <div className="dt-res">
        <div className="dt-top">
          <div className="dt-kcal"><small>Daily target</small><b>{res.kcal}</b><span>kcal</span></div>
          <div className="dt-macros">
            {[['Protein', res.protein, res.protein * 4], ['Carbs', res.carbs, res.carbs * 4], ['Fat', res.fat, res.fat * 9]].map(([n, g, k]) => (
              <div key={n}><div className="row-between"><span>{n}</span><b>{g} g</b></div><div className="bar"><i style={{ width: `${Math.round((k / tot) * 100)}%` }} /></div></div>
            ))}
            <small className="muted">BMI {res.bmi} · Maintenance ≈ {res.tdee} kcal</small>
          </div>
        </div>
        <div className="dt-meals">
          {Object.keys(m).map((k) => (
            <div key={k} className="dt-meal">
              <div className="row-between"><b>{k}</b><span className="chipx">~{Math.round(res.kcal * SPLIT[k])} kcal</span></div>
              <ul>{m[k].map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="muted small">Pick one option per meal. General guidance only, not medical advice.</p>
        <div className="row wrap">
          <button className="btn btn-primary" onClick={download}><Download size={17} /> Download Plan</button>
          <button className="btn btn-ghost" onClick={() => open('enroll', { plan: 'Paid Custom Diet Plan', goal: f.goal })}><MessageCircle size={17} /> Get Custom Paid Plan</button>
          <button className="btn btn-ghost" onClick={() => setRes(null)}><RotateCcw size={17} /> Recalculate</button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="seg">
        {[['male', 'Male'], ['female', 'Female']].map(([v, l]) => (
          <button type="button" key={v} className={`chip ${f.gender === v ? 'on' : ''}`} onClick={() => setF({ ...f, gender: v })}>{l}</button>
        ))}
        <span className="seg-gap" />
        {[['veg', 'Vegetarian', Leaf], ['nonveg', 'Non-Veg', Drumstick]].map(([v, l, I]) => (
          <button type="button" key={v} className={`chip ${f.food === v ? 'on' : ''}`} onClick={() => setF({ ...f, food: v })}><I size={14} /> {l}</button>
        ))}
      </div>
      <div className={`grid ${compact ? 'g2' : 'g3'}`}>
        <label>Age<input type="number" inputMode="numeric" value={f.age} onChange={set('age')} placeholder="25" /></label>
        <label>Height (cm)<input type="number" inputMode="numeric" value={f.height} onChange={set('height')} placeholder="170" /></label>
        <label>Weight (kg)<input type="number" inputMode="numeric" value={f.weight} onChange={set('weight')} placeholder="70" /></label>
      </div>
      <div className="grid g2">
        <label>Activity level
          <select value={f.activity} onChange={set('activity')}>
            <option value="sedentary">Mostly sitting (desk job)</option>
            <option value="light">Light (1-3 workouts / week)</option>
            <option value="moderate">Moderate (3-5 workouts / week)</option>
            <option value="active">Very active (6-7 workouts / week)</option>
          </select>
        </label>
        <label>Your goal
          <select value={f.goal} onChange={set('goal')}>
            <option value="fat">Lose fat</option>
            <option value="gain">Gain weight</option>
            <option value="muscle">Build muscle</option>
            <option value="fit">Stay fit</option>
          </select>
        </label>
      </div>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn btn-primary btn-lg" type="submit"><Calculator size={18} /> Generate My Free Plan</button>
    </form>
  );
}
