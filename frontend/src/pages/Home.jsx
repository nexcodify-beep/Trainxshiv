import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Utensils, Dumbbell, Sparkles } from 'lucide-react';
import { Hero, Marquee, TrainerSection, InstaStrip } from '../components/Sections';
import { SectionHead } from '../components/ui';
import WhyChooseUs from '../components/WhyChooseUs';
import DietTool from '../components/DietTool';
import WorkoutTool from '../components/WorkoutTool';

export default function Home() {
  const [activeToolTab, setActiveToolTab] = useState('diet'); // 'diet' | 'workout'

  return (
    <>
      {/* Hero Section with Before/After Dual Transformation Cards & Book Free Trial Button */}
      <Hero />

      {/* Ticker Ribbon */}
      <Marquee />

      {/* 1. What Makes Us Different Section */}
      <WhyChooseUs />

      {/* 2. Free Fitness Tools: Diet Plan & Workout Routine Generators */}
      <section className="section home-free-tools-section" id="free-tools">
        <div className="container">
          <SectionHead
            eyebrow="100% Free Tools"
            title="Instant Fitness Plan Generators"
            sub="Generate your personalized Indian diet plan target or customized workout split routine in seconds — completely free."
          />

          {/* Interactive Tool Switcher Tabs - One Horizontal Line with Moving Arrow */}
          <div className="free-tools-tab-bar">
            <button
              type="button"
              className={`free-tool-tab-btn ${activeToolTab === 'diet' ? 'active' : ''}`}
              onClick={() => setActiveToolTab('diet')}
            >
              <Utensils size={17} className="tab-tool-icon" />
              <span className="tab-label-desktop">Free Diet Plan Generator</span>
              <span className="tab-label-mobile">Diet Generator</span>
              {activeToolTab === 'diet' && (
                <ArrowRight size={16} className="tab-animated-arrow" />
              )}
            </button>

            <button
              type="button"
              className={`free-tool-tab-btn ${activeToolTab === 'workout' ? 'active' : ''}`}
              onClick={() => setActiveToolTab('workout')}
            >
              <Dumbbell size={17} className="tab-tool-icon" />
              <span className="tab-label-desktop">Free Workout Routine Generator</span>
              <span className="tab-label-mobile">Workout Routine</span>
              {activeToolTab === 'workout' && (
                <ArrowRight size={16} className="tab-animated-arrow" />
              )}
            </button>
          </div>

          {/* Tool Container Box */}
          <div className="free-tool-stage-box">
            {activeToolTab === 'diet' ? (
              <div className="tool-tab-content">
                <div className="tool-tab-intro">
                  <span className="pill pill-gold">
                    <Sparkles size={12} className="text-yellow" /> Home-Cooked Nutrition Focus
                  </span>
                  <h3>Calculate Your Calories, Macros &amp; Daily Meal Chart</h3>
                  <p>
                    Enter your age, height, weight and food preference to instantly receive your target calories and
                    a structured daily Indian meal plan.
                  </p>
                </div>
                <DietTool compact={false} />
              </div>
            ) : (
              <div className="tool-tab-content">
                <div className="tool-tab-intro">
                  <span className="pill pill-gold">
                    <Sparkles size={12} className="text-yellow" /> Science-Based Splits
                  </span>
                  <h3>Custom Workout Routine Tailored to Your Schedule &amp; Equipment</h3>
                  <p>
                    Whether training at home with dumbbells, bodyweight, or in a full commercial gym, select your goal
                    and days to generate your customized workout routine.
                  </p>
                </div>
                <WorkoutTool />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Our Expert Trainers Section */}
      <TrainerSection showHeader={true} />

      {/* 4. TrainXShiv Reviews on Instagram Section */}
      <section className="section alt instagram-reviews-section">
        <div className="container">
          <SectionHead
            eyebrow="Real Client Feedback"
            title="TrainXShiv Reviews on Instagram"
            sub="Watch real transformation stories, client video reviews and workouts directly on Instagram Reels."
            action={
              <a
                href="https://www.instagram.com/trainxshiv/"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                <Instagram size={15} /> Visit @trainxshiv <ArrowRight size={15} />
              </a>
            }
          />
          <InstaStrip />
        </div>
      </section>
    </>
  );
}
