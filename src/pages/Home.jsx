import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Hero, Marquee, ProgramGrid, TrainerSection, RealResultsSlider, InstaStrip, CTA } from '../components/Sections';
import HeroTransformationSlider from '../components/HeroTransformationSlider';
import { SectionHead } from '../components/ui';
import { PROGRAMS } from '../data';

export default function Home() {
  return (
    <>
      <HeroTransformationSlider />
      <Marquee />
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our programs" title="Choose Your Fitness Goal" sub="Personalized plans designed to help you achieve real results." action={<Link to="/programs" className="link">View All Programs <ArrowRight size={16} /></Link>} />
          <ProgramGrid items={PROGRAMS} />
        </div>
      </section>
      <TrainerSection showHeader={true} />
      <RealResultsSlider />
      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Follow our journey" title="On Instagram @trainxshiv" />
          <InstaStrip />
        </div>
      </section>
      <Hero isFooterHero={true} />
    </>
  );
}
