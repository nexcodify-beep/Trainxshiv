import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Utensils, 
  Dumbbell, 
  MessageCircle, 
  ShieldCheck, 
  Target, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SectionHead } from './ui';

export const DIFFERENCE_PILLARS_DATA = [
  {
    id: 'food',
    slug: 'home-food-diet',
    icon: Utensils,
    title: '100% Home Food Diet',
  },
  {
    id: 'science',
    slug: 'science-based-workouts',
    icon: Dumbbell,
    title: 'Science-Based Workouts',
  },
  {
    id: 'mentorship',
    slug: 'daily-1-on-1-coaching',
    icon: MessageCircle,
    title: 'Daily 1-on-1 Coaching',
  },
  {
    id: 'form',
    slug: 'video-form-corrections',
    icon: ShieldCheck,
    title: 'Video Form Corrections',
  },
  {
    id: 'recomposition',
    slug: 'permanent-transformation',
    icon: Target,
    title: 'Permanent Transformation',
  },
  {
    id: 'natural',
    slug: 'certified-master-coach',
    icon: Award,
    title: 'Certified Master Coach',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section what-makes-us-different-section" id="what-makes-us-different">
      <div className="container">
        {/* Section Header: 'What Makes Us Different' */}
        <SectionHead
          eyebrow="The TrainXShiv Difference"
          title="What Makes Us Different"
          sub="Personalized 1-on-1 coaching, Indian nutrition, and daily accountability built around your lifestyle."
        />

        {/* Feature Cards Grid: Icons, Names, and Learn More links to separate pages */}
        <div className="diff-cards-grid">
          {DIFFERENCE_PILLARS_DATA.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link 
                key={item.id} 
                to={`/difference/${item.slug}`} 
                className="diff-card"
                aria-label={`Learn more about ${item.title}`}
              >
                <div className="diff-card-icon-box">
                  <IconComponent size={24} className="diff-card-icon" />
                </div>
                <h3 className="diff-card-title">{item.title}</h3>
                <span className="diff-card-learn-more">
                  <span>Learn More</span>
                  <ArrowRight size={13} className="diff-card-arrow" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
