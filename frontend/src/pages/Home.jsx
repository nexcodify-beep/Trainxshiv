import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Hero, Marquee, ProgramGrid, TrainerSection, RealResultsSlider, InstaStrip } from '../components/Sections';
import { SectionHead } from '../components/ui';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our programs" title="Choose Your Fitness Goal" sub="Personalized plans designed to help you achieve real results." action={<Link to="/programs" className="link">View All Programs <ArrowRight size={16} /></Link>} />
          <ProgramGrid />
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
    </>
  );
}
