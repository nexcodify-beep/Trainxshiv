import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { Hero, Marquee, ProgramGrid, TrainerSection, InstaStrip } from '../components/Sections';
import { SectionHead } from '../components/ui';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Choose Your Plan Section - Compact & Sleek */}
      <section className="section home-programs-section">
        <div className="container">
          <SectionHead
            eyebrow="Our programs"
            title="Choose Your Plan"
            sub="Personalized training and nutrition plans designed to achieve real, sustainable results."
            action={
              <Link to="/programs" className="link">
                View All 9 Packages <ArrowRight size={16} />
              </Link>
            }
          />
          <ProgramGrid limit={3} />
          <div className="home-programs-footer-cta">
            <Link to="/programs" className="btn btn-outline-light">
              <span>Explore All 9 Packages & Programs</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Expert Trainers Section - Kept Intact */}
      <TrainerSection showHeader={true} />

      {/* TrainXive Reviews on Instagram Section */}
      <section className="section alt instagram-reviews-section">
        <div className="container">
          <SectionHead
            eyebrow="Real Client Feedback"
            title="TrainXive Reviews on Instagram"
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
