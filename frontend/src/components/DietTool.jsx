import { useState } from 'react';
import { 
  Calculator, 
  RotateCcw, 
  MessageCircle, 
  Leaf, 
  Drumstick, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  UtensilsCrossed, 
  Droplet 
} from 'lucide-react';
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

// Generates basic Indian daily meals based on diet preference and goal
function getBasicMealPlan(f, res) {
  const isVeg = f.food === 'veg';
  const goal = f.goal;

  if (isVeg) {
    return [
      {
        meal: 'Meal 1: Breakfast (8:00 AM - 9:00 AM)',
        items: [
          '50g Rolled Oats cooked in 200ml Skimmed Milk / Low Fat Milk',
          '10-12 Soaked Almonds + 2 Walnuts',
          '1 Medium Apple or Banana (or 2 Besan / Moong Dal Chillas with Mint Chutney)',
          '1 Scoop Whey Protein or 1 Glass Sattu Buttermilk',
        ],
        approxKcal: 'approx 380 - 450 kcal',
      },
      {
        meal: 'Meal 2: Mid-Day Snack (11:30 AM)',
        items: [
          '1 Seasonal Fresh Fruit (Papaya, Apple, or Orange)',
          'Handful Roasted Chana / Makhana',
          '1 Cup Unsweetened Green Tea or Lemon Water',
        ],
        approxKcal: 'approx 150 - 200 kcal',
      },
      {
        meal: 'Meal 3: Lunch (1:30 PM - 2:30 PM)',
        items: [
          '2 Whole Wheat Rotis (or 1 Medium Bowl Steamed Rice)',
          '1 Bowl Thick Dal / Rajma / Chole / Black Chana',
          '100g Low-Fat Paneer Bhurji / Soya Chunks Curry',
          'Large Bowl Fresh Green Salad (Cucumber, Tomato, Beetroot, Onion)',
        ],
        approxKcal: 'approx 500 - 580 kcal',
      },
      {
        meal: 'Meal 4: Pre / Post-Workout Fuel (5:00 PM)',
        items: [
          '1 Banana + 1 Cup Black Coffee (Pre-Workout)',
          'Post-Workout: 150g Low-fat Curd / Dahi or Sprouted Moong Chaat with lemon',
        ],
        approxKcal: 'approx 200 - 250 kcal',
      },
      {
        meal: 'Meal 5: Dinner (8:00 PM - 9:00 PM)',
        items: [
          '1-2 Rotis or Khichdi / Quinoa bowl',
          '1 Bowl Green Vegetable Sabzi (Palak, Lauki, Gobhi, Bhindi) cooked in 1 tsp olive/mustard oil',
          '100g Paneer or Tofu slices',
          'Cucumber slices with chaat masala',
        ],
        approxKcal: 'approx 400 - 480 kcal',
      },
    ];
  } else {
    return [
      {
        meal: 'Meal 1: Breakfast (8:00 AM - 9:00 AM)',
        items: [
          '3-4 Whole Eggs / Egg Whites Omelette with spinach & onions',
          '2 Slices Whole Grain Brown Bread (or 50g Oats with warm water/milk)',
          '1 Fresh Orange or Apple',
          '1 Cup Green Tea or Black Coffee',
        ],
        approxKcal: 'approx 400 - 460 kcal',
      },
      {
        meal: 'Meal 2: Mid-Day Snack (11:30 AM)',
        items: [
          '1 Seasonal Fruit (Apple or Guava)',
          '10-12 Almonds or Handful Roasted Makhana',
          'Green Tea or Coconut Water',
        ],
        approxKcal: 'approx 150 - 180 kcal',
      },
      {
        meal: 'Meal 3: Lunch (1:30 PM - 2:30 PM)',
        items: [
          '150g Grilled / Boiled Chicken Breast (or Fish Curry)',
          '1 Bowl Steamed Basmati Rice or 2 Whole Wheat Rotis',
          '1 Bowl Dal or Curd',
          'Large Bowl Mixed Vegetable Salad',
        ],
        approxKcal: 'approx 520 - 600 kcal',
      },
      {
        meal: 'Meal 4: Pre / Post-Workout Fuel (5:00 PM)',
        items: [
          'Pre-Workout: 1 Banana + Black Coffee',
          'Post-Workout: 2 Boiled Eggs or 1 Scoop Whey Protein + 1 Rice Cake',
        ],
        approxKcal: 'approx 220 - 260 kcal',
      },
      {
        meal: 'Meal 5: Dinner (8:00 PM - 9:00 PM)',
        items: [
          '150g Shredded Chicken / Grilled Fish or Egg Bhurji',
          '1 Whole Wheat Roti or 1 Bowl Vegetable Soup',
          'Sautéed Vegetables (Broccoli, Capsicum, Carrots, Beans)',
          'Fresh Cucumber & Lemon Salad',
        ],
        approxKcal: 'approx 420 - 480 kcal',
      },
    ];
  }
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
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!(f.age >= 14 && f.age <= 80)) return setErr('Enter an age between 14 and 80.');
    if (!(f.height >= 120 && f.height <= 230)) return setErr('Enter height in cm (120 to 230).');
    if (!(f.weight >= 30 && f.weight <= 250)) return setErr('Enter weight in kg (30 to 250).');
    setErr('');
    setRes(calc(f));
  };

  const handleCopyPlan = (mealPlan) => {
    if (!res) return;
    const text = [
      `🌟 TRAINXSHIV FREE DIET PLAN 🌟`,
      `Goal: ${f.goal.toUpperCase()} | Diet: ${f.food.toUpperCase()}`,
      `Daily Calorie Target: ${res.kcal} kcal/day`,
      `Macros: Protein ${res.protein}g | Carbs ${res.carbs}g | Fat ${res.fat}g | BMI: ${res.bmi}`,
      `-----------------------------------------`,
      ...mealPlan.map((m) => `${m.meal} (${m.approxKcal}):\n${m.items.map((i) => ` • ${i}`).join('\n')}`),
      `-----------------------------------------`,
      `Hydration: 3.5 - 4 Liters water daily`,
      `For 100% custom gram portions, connect with Master Coach Shivam: https://trainxshiv.com`,
    ].join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (res) {
    const tot = res.protein * 4 + res.carbs * 4 + res.fat * 9;
    const mealPlan = getBasicMealPlan(f, res);
    const waLinkText = `https://wa.me/917080263878?text=${encodeURIComponent(
      `Hi Shivam! I generated my free diet plan on TrainXShiv:\n- Goal: ${f.goal}\n- Target Calories: ${res.kcal} kcal\n- Protein: ${res.protein}g | Carbs: ${res.carbs}g | Fat: ${res.fat}g\n- Food: ${f.food} | Weight: ${f.weight}kg\n\nI want to discuss my 1-on-1 personalized coaching!`
    )}`;

    return (
      <div className="dt-res">
        {/* Top Macros & Calories Summary */}
        <div className="dt-top">
          <div className="dt-kcal">
            <small>Your Daily Target</small>
            <b>{res.kcal}</b>
            <span>kcal / day</span>
            <div className="dt-kcal-goal-tag">
              {f.goal === 'fat' && 'Fat Loss Deficit'}
              {f.goal === 'muscle' && 'Muscle Gain Surplus'}
              {f.goal === 'gain' && 'Weight Gain'}
              {f.goal === 'fit' && 'Maintenance'}
            </div>
          </div>
          <div className="dt-macros">
            {[
              ['Protein', res.protein, res.protein * 4, '#FFD700'],
              ['Carbs', res.carbs, res.carbs * 4, '#60A5FA'],
              ['Fat', res.fat, res.fat * 9, '#F87171'],
            ].map(([n, g, k, col]) => (
              <div key={n} className="dt-macro-item">
                <div className="row-between">
                  <span style={{ color: col, fontWeight: 700 }}>{n}</span>
                  <b>{g} g</b>
                </div>
                <div className="bar">
                  <i style={{ width: `${Math.round((k / tot) * 100)}%`, backgroundColor: col }} />
                </div>
              </div>
            ))}
            <div className="dt-stats-subtext">
              <span>BMI: <strong>{res.bmi}</strong></span>
              <span>&bull;</span>
              <span>Maintenance: <strong>&asymp; {res.tdee} kcal</strong></span>
              <span>&bull;</span>
              <span>Water: <strong>3.5 - 4L/day</strong></span>
            </div>
          </div>
        </div>

        {/* Generated Basic Daily Indian Meal Plan */}
        <div className="dt-free-mealplan-section">
          <div className="dt-free-mealplan-header">
            <div className="dt-fmp-title">
              <UtensilsCrossed size={18} className="text-yellow" />
              <h4>Your Basic Daily Indian Meal Plan ({f.food === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'})</h4>
            </div>
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={() => handleCopyPlan(mealPlan)}
            >
              {copied ? <Check size={14} className="text-yellow" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Diet Plan'}</span>
            </button>
          </div>

          <div className="dt-meal-cards-grid">
            {mealPlan.map((m, idx) => (
              <div key={idx} className="dt-meal-card">
                <div className="dt-meal-card-head">
                  <span className="dt-meal-name">{m.meal}</span>
                  <span className="dt-meal-kcal-badge">{m.approxKcal}</span>
                </div>
                <ul className="dt-meal-items">
                  {m.items.map((item, i) => (
                    <li key={i}>
                      <CheckCircle2 size={13} className="text-yellow" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="dt-hydration-banner">
            <Droplet size={18} className="text-blue" />
            <div>
              <strong>Daily Hydration Target: 3.5 to 4.0 Liters</strong>
              <p>Drink a glass of water upon waking up and 30 minutes before meals to optimize digestion and fat metabolism.</p>
            </div>
          </div>
        </div>

        {/* 1-on-1 Custom Plan Coaching Upgrade CTA */}
        <div className="dt-payment-box">
          <div className="dt-payment-header">
            <div className="dt-price-badge">1-ON-1 COACHING</div>
            <h4>Want 100% Exact Kitchen Grams &amp; Weekly WhatsApp Tracking?</h4>
          </div>
          <p className="dt-payment-desc">
            This basic plan gives you general guidelines. For guaranteed results, Master Coach Shivam calculates
            exact gram portions, customizes recipes around what your family cooks, and monitors your progress weekly.
          </p>

          <div className="dt-payment-actions">
            <a
              href={waLinkText}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary dt-pay-btn"
            >
              <MessageCircle size={18} />
              <span>Discuss Custom Plan with Shivam</span>
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
    <form className="form dt-generator-form" onSubmit={submit}>
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

      <div className={`grid ${compact ? 'g3' : 'g3'}`}>
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

      <button type="submit" className="btn btn-primary full dt-submit-btn">
        <Calculator size={18} />
        <span>Generate Free Diet Plan</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
