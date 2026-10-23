import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Utensils, 
  Dumbbell, 
  MessageCircle, 
  ShieldCheck, 
  Target, 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Shield, 
  Clock, 
  Users, 
  Flame, 
  HeartHandshake 
} from 'lucide-react';
import { useModal } from '../context';

export const DIFFERENCE_PILLARS = [
  {
    slug: 'home-food-diet',
    id: 'food',
    icon: Utensils,
    title: '100% Home Food Diet',
    tagline: 'Eat What You Love — Zero Starvation or Boring Salads',
    shortDesc: 'Custom Indian diet plans with roti, dal, rice, paneer, and eggs tailored to your mother’s kitchen and daily schedule.',
    heroSubtitle: 'Most fitness programs fail because they force unsustainable western diets with boiled chicken and raw salads. At TrainXShiv, we build your fat loss and muscle gain plans entirely around the food you actually eat at home.',
    stats: [
      { num: '100%', label: 'Indian Home Food' },
      { num: '0', label: 'Boring Crash Diets' },
      { num: '1-on-1', label: 'Custom Portions' }
    ],
    highlights: [
      {
        title: 'Real Indian Home Kitchen Nutrition',
        desc: 'Enjoy roti, rice, dal, subzi, paneer, eggs, and chicken cooked with standard Indian home spices. No exotic or costly imported items needed.'
      },
      {
        title: 'Exact Grams & Macro Balancing',
        desc: 'We calculate your precise Daily Caloric Expenditure (TDEE) and balance protein, carbohydrates, and healthy fats so you stay full while burning fat.'
      },
      {
        title: 'Dining Out & Festival Flexibility',
        desc: 'Life does not stop for a diet. We give you easy restaurant ordering hacks and celebration guidelines so you never feel guilty or isolated during parties.'
      },
      {
        title: 'No Rebound Weight Gain',
        desc: 'By feeding your body sufficient carbohydrates and micronutrients, your metabolism remains high, preventing cravings and post-diet binge eating.'
      }
    ],
    includedFoods: [
      'Whole Wheat Roti, Paratha & Rice',
      'Thick Dal, Rajma, Chole & Moong',
      'Low-Fat Paneer & Soya Chunks',
      'Eggs, Omelettes & Chicken Breast',
      'Curd, Dahi, Buttermilk & Milk',
      'Seasonal Fruits & Fresh Vegetables'
    ]
  },
  {
    slug: 'science-based-workouts',
    id: 'science',
    icon: Dumbbell,
    title: 'Science-Based Workouts',
    tagline: 'Biomechanic Progressive Training for Home & Gym',
    shortDesc: 'Routines engineered with progressive overload principles that protect your joints while maximizing lean muscle definition.',
    heroSubtitle: 'Mindless cardio and random machine circuits do not build an aesthetic physique. We provide structured training splits based on your anatomy, posture, and available equipment.',
    stats: [
      { num: '100%', label: 'Form-First Biomechanics' },
      { num: 'Home/Gym', label: 'Adaptable Setups' },
      { num: '3-5x', label: 'Weekly Splits' }
    ],
    highlights: [
      {
        title: 'Progressive Overload Tracking',
        desc: 'Every session has logged target weights, sets, and rep ranges. This guarantees continuous muscle development and avoids frustrating plateaus.'
      },
      {
        title: 'Joint-Friendly Exercise Selection',
        desc: 'We replace risky, painful exercises with biomechanically superior alternatives that target the muscle without putting shearing force on your lower back and knees.'
      },
      {
        title: 'Customized for Home or Commercial Gym',
        desc: 'Whether you train in a fully equipped commercial gym or at home with just a pair of dumbbells and bands, your routine is 100% optimized for results.'
      },
      {
        title: 'Time-Efficient 45-60 Minute Sessions',
        desc: 'No spending 2 hours wasting time in the gym. Every set has high intensity and intent, leaving you with great energy for the rest of your day.'
      }
    ],
    includedFoods: [
      'Push / Pull / Legs (PPL) Splits',
      'Upper / Lower Body Hypertrophy',
      'Home Dumbbell & Resistance Routines',
      'Joint Mobility & Dynamic Warmups',
      'Core & Postural Alignment Drills',
      'Cardio & Active Recovery Protocols'
    ]
  },
  {
    slug: 'daily-1-on-1-coaching',
    id: 'mentorship',
    icon: MessageCircle,
    title: 'Daily 1-on-1 Coaching',
    tagline: 'Direct WhatsApp Mentorship with Master Coach Shivam',
    shortDesc: 'Send exercise videos for form feedback, get daily habit checks, and receive direct voice & text guidance — not an automated bot.',
    heroSubtitle: 'The biggest reason fitness programs fail is lack of accountability. When you sign up with TrainXShiv, you talk directly with Coach Shivam every single day — not an automated app or untrained intern.',
    stats: [
      { num: '24/7', label: 'WhatsApp Access' },
      { num: 'Daily', label: 'Habit & Form Checks' },
      { num: 'Weekly', label: 'Progress Adjustments' }
    ],
    highlights: [
      {
        title: 'Direct WhatsApp Line to Shivam',
        desc: 'Got a question about your lunch menu or how heavy to lift? Shoot a quick message on WhatsApp and get prompt, personal answers.'
      },
      {
        title: 'Daily Habit & Step Tracking',
        desc: 'We monitor your daily water intake, step counts, sleep quality, and adherence. When you know someone is checking on you, consistency becomes effortless.'
      },
      {
        title: 'Weekly Progress & Body Metric Calls',
        desc: 'Every week we analyze your weight trends, waist measurements, and progress photos to make data-backed adjustments to your diet and workouts.'
      },
      {
        title: 'Mindset & Lifestyle Guidance',
        desc: 'We coach you through stress, busy work weeks, travel hurdles, and low motivation to ensure you stay confident and disciplined.'
      }
    ],
    includedFoods: [
      'Direct Voice Notes & Chat on WhatsApp',
      'Daily Step & Calorie Accountability',
      'Weekly Weight Trend Analysis',
      'Progress Photo Comparisons',
      'Dining Out Guidance on Demand',
      'Motivational Mindset Support'
    ]
  },
  {
    slug: 'video-form-corrections',
    id: 'form',
    icon: ShieldCheck,
    title: 'Video Form Corrections',
    tagline: 'Protect Your Joints & Master Exercise Technique',
    shortDesc: 'Record a video of your squats, deadlifts, or bench press and send it directly on WhatsApp. Shivam personally reviews posture and tempo.',
    heroSubtitle: 'Lifting with poor form causes shoulder impingements, knee pain, and disc bulges — while robbing your target muscles of growth stimulus. Our video review system guarantees your technique is flawless.',
    stats: [
      { num: '100%', label: 'Injury Prevention' },
      { num: 'Personal', label: 'Video Markups' },
      { num: 'Real-time', label: 'Feedback Loop' }
    ],
    highlights: [
      {
        title: 'Video Upload on WhatsApp',
        desc: 'Record a 10 to 15-second video of your compound lifts (Squats, Bench Press, Deadlifts, Rows) and send it directly on WhatsApp.'
      },
      {
        title: 'Detailed Video Analysis & Voice Feedback',
        desc: 'Shivam breaks down your bar path, joint angles, spine neutrality, foot placement, and tempo to point out exact corrective cues.'
      },
      {
        title: 'Safe Weight Progression',
        desc: 'You will only increase weight once your movement pattern is clean, ensuring you build supreme strength without risking an injury.'
      },
      {
        title: 'Pain-Free Movement Patterns',
        desc: 'If you have existing joint aches or tight hips, we modify your setup angles so you train pain-free with maximum confidence.'
      }
    ],
    includedFoods: [
      'Squat Depth & Knee Tracking Check',
      'Bench Press Shoulder & Elbow Tuck',
      'Deadlift Spine Neutrality & Hip Hinge',
      'Shoulder Press Core Bracing',
      'Pull-up & Row Lat Engagement',
      'Corrective Mobility Stretches'
    ]
  },
  {
    slug: 'permanent-transformation',
    id: 'recomposition',
    icon: Target,
    title: 'Permanent Transformation',
    tagline: 'Metabolic Health — No Rebound Fat Gain Ever',
    shortDesc: 'We protect your metabolic rate and teach you dining out strategies so you maintain your dream body for life.',
    heroSubtitle: 'Over 90% of dieters gain back all the weight they lost within 6 months. At TrainXShiv, we design your exit strategy from day one, so your new body stays with you permanently.',
    stats: [
      { num: '0%', label: 'Rebound Weight' },
      { num: '100%', label: 'Metabolic Protection' },
      { num: 'Life', label: 'Sustainable Habits' }
    ],
    highlights: [
      {
        title: 'Reverse Dieting Protocol',
        desc: 'After reaching your fat loss goal, we gradually increase your calories week by week. This restores your metabolism without storing any new body fat.'
      },
      {
        title: 'Nutritional Literacy & Education',
        desc: 'You learn how to eyeball food portions, read nutrition labels, and manage calories intuitively so you never need a coach again.'
      },
      {
        title: 'Hormonal & Thyroid Health',
        desc: 'We keep your energy, libido, thyroid markers, and sleep high by avoiding dangerous prolonged calorie deficits and crash diets.'
      },
      {
        title: 'Sustainable Lifestyle Integration',
        desc: 'Your routine becomes an automatic, joyful part of your lifestyle rather than an exhausting punishment you want to escape from.'
      }
    ],
    includedFoods: [
      'Metabolic Rate Preservation',
      'Phased Reverse Dieting Strategy',
      'Intuitive Eating Guidelines',
      'Dining Out Lifestyle Mastery',
      'Long-Term Habit Retention',
      'Zero Yo-Yo Weight Cycling'
    ]
  },
  {
    slug: 'certified-master-coach',
    id: 'natural',
    icon: Award,
    title: 'Certified Master Coach',
    tagline: 'ISSA & FGIIT Accredited Coaching with 500+ Transformations',
    shortDesc: 'Certified in Personal Training, Clinical Nutrition, Injury Rehab, and Powerlifting. Zero dangerous shortcuts or banned substances.',
    heroSubtitle: 'Coach Shivam went through his own transformation — growing from a skinny 58 kg beginner into a 76 kg natural master trainer. Every method he coaches has been tried, tested, and backed by international certifications.',
    stats: [
      { num: '500+', label: 'Clients Transformed' },
      { num: '4+', label: 'Accredited Diplomas' },
      { num: '100%', label: 'Natural & Safe' }
    ],
    highlights: [
      {
        title: 'Diploma in Personal Training',
        desc: 'Accredited by FGIIT and INPTA, specializing in biomechanics, posture analysis, functional movements, and customized exercise programming.'
      },
      {
        title: 'Diploma in 1-on-1 Clinical Nutrition',
        desc: 'Certified in clinical macronutrient calculations, metabolic health, gut digestion, and sustainable Indian dietary planning.'
      },
      {
        title: 'Injury Rehabilitation Masterclass',
        desc: 'Specialized in joint stabilization, pain-free corrective movement patterns, and postural rehabilitation.'
      },
      {
        title: '100% Natural Drug-Free Philosophy',
        desc: 'Zero dangerous steroids, SARMs, or harmful fat burners. We build authentic strength, health, and athletic aesthetics naturally.'
      }
    ],
    includedFoods: [
      'FGIIT & INPTA Accredited',
      'ISSA Standards Curriculum',
      'Clinical Nutritionist Certified',
      'Injury Rehab & Joint Care',
      'Powerlifting Strength Coach',
      '100% Drug-Free & Natural'
    ]
  }
];

export default function DifferenceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { open } = useModal();

  // Find matching pillar or default to the first one
  const currentPillar = DIFFERENCE_PILLARS.find((p) => p.slug === slug) || DIFFERENCE_PILLARS[0];
  const IconComponent = currentPillar.icon;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  return (
    <div className="difference-detail-page">
      {/* Top Breadcrumb Header Bar */}
      <div className="diff-page-topbar">
        <div className="container diff-topbar-inner">
          <Link to="/" className="diff-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <span className="diff-topbar-crumb">
            What Makes Us Different &bull; <strong>{currentPillar.title}</strong>
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="diff-hero-section">
        <div className="container">
          <div className="diff-hero-card">
            <div className="diff-hero-badge">
              <Sparkles size={14} className="text-yellow" />
              <span>The TrainXShiv Difference</span>
            </div>

            <div className="diff-hero-title-row">
              <div className="diff-hero-icon-wrap">
                <IconComponent size={34} />
              </div>
              <div>
                <h1 className="diff-hero-title">{currentPillar.title}</h1>
                <p className="diff-hero-tagline">{currentPillar.tagline}</p>
              </div>
            </div>

            <p className="diff-hero-desc">{currentPillar.heroSubtitle}</p>

            {/* Quick Stats Grid */}
            <div className="diff-stats-grid">
              {currentPillar.stats.map((s, idx) => (
                <div key={idx} className="diff-stat-item">
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="diff-hero-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => open && open('enroll', { plan: currentPillar.title })}
              >
                <span>Book Free Consultation</span>
                <ArrowRight size={18} />
              </button>
              <a
                href={`https://wa.me/917080263878?text=${encodeURIComponent(
                  `Hi Shivam! I was reading about "${currentPillar.title}" on your website and want to learn more about 1-on-1 coaching.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-lg"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Breakdown Section */}
      <section className="section diff-content-section">
        <div className="container">
          <div className="diff-section-head">
            <span className="pill pill-gold">In-Depth Methodology</span>
            <h2>Why This Method Works So Effectively</h2>
            <p>Here is how Coach Shivam personalizes this pillar specifically for your lifestyle:</p>
          </div>

          <div className="diff-highlights-grid">
            {currentPillar.highlights.map((h, i) => (
              <div key={i} className="diff-highlight-card">
                <div className="diff-hl-num">0{i + 1}</div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>

          {/* Included Features Box */}
          <div className="diff-features-box">
            <div className="diff-features-header">
              <Shield size={20} className="text-yellow" />
              <h3>What’s Included in This Pillar</h3>
            </div>
            <div className="diff-features-grid">
              {currentPillar.includedFoods.map((item, idx) => (
                <div key={idx} className="diff-feature-pill">
                  <CheckCircle2 size={16} className="text-yellow" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Switch Between All 6 Pillars */}
      <section className="section diff-pillars-switcher-section">
        <div className="container">
          <div className="diff-switcher-head">
            <h3>Explore Other Pillars of What Makes Us Different</h3>
            <p>Click any pillar below to discover the rest of our coaching methodology:</p>
          </div>

          <div className="diff-switcher-grid">
            {DIFFERENCE_PILLARS.map((p) => {
              const PIcon = p.icon;
              const isActive = p.slug === currentPillar.slug;
              return (
                <Link
                  key={p.slug}
                  to={`/difference/${p.slug}`}
                  className={`diff-switch-card ${isActive ? 'active' : ''}`}
                >
                  <div className="diff-switch-icon-box">
                    <PIcon size={20} />
                  </div>
                  <strong>{p.title}</strong>
                  {isActive ? (
                    <span className="diff-active-label">Currently Viewing</span>
                  ) : (
                    <span className="diff-view-label">Learn More &rarr;</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="diff-bottom-banner-wrap">
        <div className="container">
          <div className="diff-bottom-banner">
            <div>
              <h3>Ready to Experience The TrainXShiv Transformation?</h3>
              <p>Get a personalized 1-on-1 strategy call with Coach Shivam completely free. No strings attached.</p>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => open && open('enroll', { plan: 'What Makes Us Different - Consultation' })}
            >
              <span>Book Your Free Trial</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

