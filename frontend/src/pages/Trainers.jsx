import React from 'react';
import FounderProfile from '../components/FounderProfile';
import { TrainerSection, CTA } from '../components/Sections';
import { SectionHead } from '../components/ui';
import { ShieldCheck, Utensils, MessageSquare, Flame } from 'lucide-react';

export default function Trainers() {
  return (
    <div className="trainers-page-wrapper">
      {/* 1. FOUNDER TRAINER SPOTLIGHT (Shivan's Story, Before/After & 500+ Clients Trained) */}
      <FounderProfile />

      {/* 2. THE COMPLETE COACHING TEAM ORG TREE (Kept intact as requested) */}
      <div className="trainers-team-section-wrap">
        <div className="container">
          <SectionHead
            eyebrow="The complete team"
            title="Our Dedicated Coaching Team"
            sub="Led by Shivan, our specialized certified trainers work in synergy to handle every aspect of your strength, nutrition, and body recomposition."
          />
        </div>
        <TrainerSection showHeader={false} />
      </div>

      {/* 3. COACHING STANDARDS & WHAT SETS TRAINXSHIV APART */}
      <section className="section alt">
        <div className="container">
          <SectionHead
            eyebrow="The TrainXShiv standard"
            title="Why Our Coaching Delivers Unmatched Results"
            sub="We don't sell cookie-cutter PDFs or automated app bots. Here is the standard every TrainXShiv client receives."
          />
          <div className="grid g4 stagger reveal">
            <div className="card feat-card">
              <div className="d-ico text-blue">
                <Utensils size={24} />
              </div>
              <h4>100% Ghar Ka Khana Diets</h4>
              <p className="muted">
                No expensive supplements or bland boiled food. Custom macros designed around your family meals, roti, dal, rice, paneer or chicken.
              </p>
            </div>

            <div className="card feat-card">
              <div className="d-ico text-green">
                <Flame size={24} />
              </div>
              <h4>Injury-Free Form Audits</h4>
              <p className="muted">
                Send workout videos directly on WhatsApp. We inspect joint angles, range of motion, and posture to protect your back and knees.
              </p>
            </div>

            <div className="card feat-card">
              <div className="d-ico text-amber">
                <MessageSquare size={24} />
              </div>
              <h4>Direct Coach on WhatsApp</h4>
              <p className="muted">
                Got a doubt at a restaurant or traveling for work? Get instant guidance from your trainer so you stay on track everywhere.
              </p>
            </div>

            <div className="card feat-card">
              <div className="d-ico text-purple">
                <ShieldCheck size={24} />
              </div>
              <h4>Weekly Progressive Adjustments</h4>
              <p className="muted">
                As your metabolism changes, we update weights, cardio intervals, and calories every single week to prevent frustrating fat loss plateaus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <CTA />
    </div>
  );
}
