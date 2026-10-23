import React from 'react';
import { Check, Crown, Flame, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import DietTool from '../components/DietTool';
import { PAID_DIETS as DEFAULT_PAID_DIETS } from '../data';
import { SectionHead, inr } from '../components/ui';
import { useModal, useContent } from '../context';
import { CTA } from '../components/Sections';

export default function DietPlans() {
  const { open } = useModal();
  const { paidDiets: dynamicDiets } = useContent();
  const PAID_DIETS = dynamicDiets || DEFAULT_PAID_DIETS;

  // Enriched plans with specialties and clear features
  const ENRICHED_DIETS = [
    {
      id: 'starter',
      name: 'Starter Diet Plan',
      price: 999,
      weeks: '4 Weeks',
      popular: false,
      tagline: 'Ideal for Beginners Starting Their Journey',
      specialties: '100% Home Food Diet &bull; Simple Indian Meal Swaps',
      items: [
        'Custom calorie & macro targets tailored to your metabolic rate',
        'Vegetarian & non-vegetarian flexible Indian meal plan',
        'Budget-friendly home grocery & food ingredient list',
        'One personalized diet revision after 14 days',
        'Daily water intake & portion size guidance',
      ],
    },
    {
      id: 'pro',
      name: 'Pro Diet Plan',
      price: 1999,
      weeks: '12 Weeks',
      popular: true,
      tagline: 'Most Popular for Fat Loss & Muscle Building',
      specialties: 'Weekly Revisions &bull; WhatsApp Chat Support &bull; Supplement Guide',
      items: [
        'Everything included in the Starter Diet Plan',
        'Weekly progressive macro adjustments to prevent weight plateaus',
        'Direct WhatsApp chat support with your coach for doubts',
        'Safe supplement stack guidance (Creatine, Whey, Multivitamins)',
        'Indian festival, wedding & dining out dining tips',
        'Special sweet cravings management & healthy snacks recipes',
      ],
    },
    {
      id: 'elite',
      name: 'Elite Diet + Coaching',
      price: 3499,
      weeks: '24 Weeks',
      popular: false,
      tagline: 'Complete 6-Month Body Recomposition Protocol',
      specialties: 'Complete Workout Included &bull; Video Check-ins &bull; Priority Support',
      items: [
        'Everything included in Pro Diet Plan for 24 continuous weeks',
        'Full personalized workout program (Home or Gym) included',
        'Bi-weekly video check-ins to monitor physical measurements',
        'High-priority direct coach access on WhatsApp',
        'Post-diet reverse dieting protocol to prevent rebounding weight',
      ],
    },
  ];

  return (
    <div className="diet-plans-page">
      {/* Compact Page Hero: Extra spacing minimized */}
      <section className="page-hero compact-hero">
        <div className="container">
          <span className="pill">Nutrition &amp; Meal Plans</span>
          <h1>
            Custom Diet Plans <span className="text-yellow">Built For You</span>
          </h1>
          <p>
            No boring boiled chicken or bland salads. 100% home food diet tailored to your body, routine and
            taste.
          </p>
        </div>
      </section>

      {/* 1. CUSTOM DIET PLANS BY OUR COACHES SECTION (SHOWN FIRST AS REQUESTED) */}
      <section className="section tight zero-top-spacing">
        <div className="container">
          <SectionHead
            eyebrow="Certified Nutritionist Coaching"
            title="Custom Diet Plans By Our Coaches"
            sub="Built around your body, schedule, budget and taste preferences. Updated as your body adapts."
          />

          <div className="grid g3 stagger reveal diet-plans-grid">
            {ENRICHED_DIETS.map((p) => (
              <div key={p.id} className={`card price-card ${p.popular ? 'popular' : ''}`}>
                {p.popular && (
                  <span className="ribbon">
                    <Crown size={13} /> Most Popular
                  </span>
                )}
                <div className="price-card-header">
                  <h3>{p.name}</h3>
                  <div className="price-card-tagline">{p.tagline}</div>
                  <div className="price">
                    {inr(p.price)}
                    <small> / {p.weeks}</small>
                  </div>
                </div>

                <div className="price-card-specialty">
                  <span dangerouslySetInnerHTML={{ __html: p.specialties }} />
                </div>

                <ul className="ticks">
                  {p.items.map((x) => (
                    <li key={x}>
                      <Check size={15} className="tick-icon" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'} full price-cta-btn`}
                  onClick={() => open('enroll', { plan: p.name, price: p.price })}
                >
                  <span>Choose {p.name}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DIET PLAN GENERATOR SECTION (SHOWN SECOND AS REQUESTED) */}
      <section className="section alt diet-generator-section">
        <div className="container">
          <SectionHead
            eyebrow="Instant calculation"
            title="Personalized Diet Plan Generator"
            sub="Calculate your exact daily calorie targets and receive your custom Indian meal chart on WhatsApp for just ₹99."
          />

          <div className="tool-wrap card no-tilt reveal">
            <div className="tool-side">
              <span className="pill light">₹99 WhatsApp Delivery</span>
              <h2>Instant Macro Target &amp; Custom Plan</h2>
              <p>
                Enter your age, height, weight, activity and goal. We calculate your exact calories, protein, carbs
                and fats, and deliver your full personalized Indian meal plan directly to WhatsApp after ₹99 payment.
              </p>
              <ul className="ticks light">
                <li>
                  <Check size={15} /> 100% Home Food Diet (Roti, Dal, Rice, Paneer/Chicken)
                </li>
                <li>
                  <Check size={15} /> Veg &amp; Non-Veg Options
                </li>
                <li>
                  <Check size={15} /> Delivered via WhatsApp by Master Coach Shivam
                </li>
              </ul>
            </div>
            <div className="tool-main">
              <DietTool />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FREE VS PAID DIET PLAN SECTION IS COMPLETELY REMOVED AS REQUESTED */}

      <CTA />
    </div>
  );
}
