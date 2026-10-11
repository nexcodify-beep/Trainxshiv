import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Hero, Marquee, ProgramGrid, DietTeaser, TrainerGrid, TrainerSection, RealResultsSlider, TransformStrip, Testimonials, HowItWorks, Guidance, InstaStrip, CTA } from '../components/Sections';
import { SectionHead } from '../components/ui';
import { PROGRAMS } from '../data';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our programs" title="Choose Your Fitness Goal" sub="Personalized plans designed to help you achieve real results." action={<Link to="/programs" className="link">View All Programs <ArrowRight size={16} /></Link>} />
          <ProgramGrid items={PROGRAMS.slice(0, 6)} />
        </div>
      </section>
      <DietTeaser />
      <TrainerSection showHeader={true} />
      <RealResultsSlider />
      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Client testimonials" title="What Our Clients Say" action={<span className="rating"><Star size={16} fill="currentColor" /> 4.9/5 from 500+ happy clients</span>} />
          <Testimonials />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Simple process" title="How It Works" sub="Your transformation journey in 4 simple steps." />
          <HowItWorks />
          <div style={{ height: 16 }} />
          <Guidance />
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Follow our journey" title="On Instagram @trainxshiv" />
          <InstaStrip />
        </div>
      </section>
      <CTA />
    </>
  );
}
