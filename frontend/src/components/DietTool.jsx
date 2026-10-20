import { useState } from 'react';
import { Calculator, RotateCcw, MessageCircle, Leaf, Drumstick, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useModal } from '../context';

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
  const [f, setF] = useState({
    gender: 'male',
    age: '',
    height: '',
    weight: '',
    activity: 'moderate',
    goal: 'fat',
    food: 'veg',
  });
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

  if (res) {
    const tot = res.protein * 4 + res.carbs * 4 + res.fat * 9;
    const waPaymentLink = `https://wa.me/917080263878?text=${encodeURIComponent(
      `Hi Shivam! I generated my diet plan target on TrainXShiv:\n- Goal: ${f.goal}\n- Target Calories: ${res.kcal} kcal\n- Protein: ${res.protein}g | Carbs: ${res.carbs}g | Fat: ${res.fat}g\n- Weight: ${f.weight} kg, Height: ${f.height} cm\n- Food: ${f.food}\n\nI want to complete the ₹99 payment to get my full personalized diet plan.`
    )}`;

    return (
      <div className="dt-res">
        <div className="dt-top">
          <div className="dt-kcal">
            <small>Your Target Calories</small>
            <b>{res.kcal}</b>
            <span>kcal / day</span>
          </div>
          <div className="dt-macros">
            {[
              ['Protein', res.protein, res.protein * 4],
              ['Carbs', res.carbs, res.carbs * 4],
              ['Fat', res.fat, res.fat * 9],
            ].map(([n, g, k]) => (
              <div key={n}>
                <div className="row-between">
                  <span>{n}</span>
                  <b>{g} g</b>
                </div>
                <div className="bar">
                  <i style={{ width: `${Math.round((k / tot) * 100)}%` }} />
                </div>
              </div>
            ))}
            <small className="muted">BMI {res.bmi} &bull; Maintenance &asymp; {res.tdee} kcal</small>
          </div>
        </div>

        {/* ₹99 WhatsApp Payment & Delivery Box */}
        <div className="dt-payment-box">
          <div className="dt-payment-header">
            <div className="dt-price-badge">₹99 ONLY</div>
            <h4>Get Your Complete Custom Indian Diet Plan</h4>
          </div>
          <p className="dt-payment-desc">
            Your customized meal chart with exact grams, ghar ka khana food swaps, grocery list &amp; portion
            guidance will be delivered to you on WhatsApp after completing the ₹99 payment.
          </p>
          <ul className="dt-payment-perks">
            <li>
              <CheckCircle2 size={15} className="text-yellow" />
              <span>Personalized {f.food === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Indian Meals</span>
            </li>
            <li>
              <CheckCircle2 size={15} className="text-yellow" />
              <span>Exact portion sizes tailored to your {res.kcal} kcal target</span>
            </li>
            <li>
              <CheckCircle2 size={15} className="text-yellow" />
              <span>Direct WhatsApp delivery by Master Coach Shivam</span>
            </li>
          </ul>

          <div className="dt-payment-actions">
            <a
              href={waPaymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary dt-pay-btn"
            >
              <MessageCircle size={18} />
              <span>Pay ₹99 on WhatsApp &amp; Receive Plan</span>
              <ArrowRight size={16} />
            </a>

            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRes(null)}>
              <RotateCcw size={14} /> Recalculate
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="seg">
        {[
          ['male', 'Male'],
          ['female', 'Female'],
        ].map(([v, l]) => (
          <button
            type="button"
            key={v}
            className={`chip ${f.gender === v ? 'on' : ''}`}
            onClick={() => setF({ ...f, gender: v })}
          >
            {l}
          </button>
        ))}
        <span className="seg-gap" />
        {[
          ['veg', 'Vegetarian', Leaf],
          ['nonveg', 'Non-Veg', Drumstick],
        ].map(([v, l, I]) => (
          <button
            type="button"
            key={v}
            className={`chip ${f.food === v ? 'on' : ''}`}
            onClick={() => setF({ ...f, food: v })}
          >
            <I size={14} /> {l}
          </button>
        ))}
      </div>

      <div className={`grid ${compact ? 'g2' : 'g3'}`}>
        <label>
          Age
          <input
            type="number"
            inputMode="numeric"
            value={f.age}
            onChange={set('age')}
            placeholder="25"
            required
          />
        </label>
        <label>
          Height (cm)
          <input
            type="number"
            inputMode="numeric"
            value={f.height}
            onChange={set('height')}
            placeholder="170"
            required
          />
        </label>
        <label>
          Weight (kg)
          <input
            type="number"
            inputMode="numeric"
            value={f.weight}
            onChange={set('weight')}
            placeholder="70"
            required
          />
        </label>
      </div>

      <div className="grid g2">
        <label>
          Activity Level
          <select value={f.activity} onChange={set('activity')}>
            <option value="sedentary">Sedentary (Desk Job, little exercise)</option>
            <option value="light">Lightly Active (1-3 workouts / week)</option>
            <option value="moderate">Moderately Active (3-5 workouts / week)</option>
            <option value="active">Very Active (6-7 intense workouts / week)</option>
          </select>
        </label>
        <label>
          Fitness Goal
          <select value={f.goal} onChange={set('goal')}>
            <option value="fat">Fat Loss &amp; Toning</option>
            <option value="muscle">Lean Muscle Building</option>
            <option value="gain">Weight Gain</option>
            <option value="fit">Healthy Lifestyle &amp; Maintenance</option>
          </select>
        </label>
      </div>

      {err && <div className="err">{err}</div>}

      <button type="submit" className="btn btn-primary full">
        <Calculator size={18} /> Calculate My Plan &bull; ₹99 On WhatsApp
      </button>
    </form>
  );
}
