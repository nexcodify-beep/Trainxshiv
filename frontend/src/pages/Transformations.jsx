import { useState } from 'react';
import { TRANSFORMS as DEFAULT_TRANSFORMS } from '../data';
import BeforeAfter from '../components/BeforeAfter';
import { RealResultsSlider, VideoReviews, Testimonials, CTA } from '../components/Sections';
import { SectionHead } from '../components/ui';
import { useContent } from '../context';

export default function Transformations() {
  const { transforms: dynamicTransforms } = useContent();
  const TRANSFORMS = dynamicTransforms || DEFAULT_TRANSFORMS;
  const [f, setF] = useState('all');
  const tabs = [['all', 'All'], ['fat', 'Fat Loss'], ['gain', 'Weight Gain'], ['muscle', 'Muscle Building']];
  const items = f === 'all' ? TRANSFORMS : TRANSFORMS.filter((t) => t.type === f);
  return (
    <>
      <section className="page-hero"><div className="container"><span className="pill">Transformation examples</span><h1>Fitness Journeys. <em>Stronger Results.</em></h1><p>Illustrative fitness imagery shown for layout preview. Drag any card to compare the images.</p></div></section>
      <RealResultsSlider />
      <section className="section tight"><div className="container">
        <div className="chips reveal">{tabs.map(([k, l]) => <button key={k} className={`chip ${f === k ? 'on' : ''}`} onClick={() => setF(k)}>{l}</button>)}</div>
        <div className="grid g3 stagger reveal" key={f}>{items.map((t) => <BeforeAfter key={t.id} t={t} />)}</div>
      </div></section>
      <section className="section alt"><div className="container">
        <SectionHead eyebrow="Video reviews" title="Client Video Reviews" sub="Watch real clients share their experience." />
        <VideoReviews />
      </div></section>
      <section className="section"><div className="container">
        <SectionHead eyebrow="Client testimonials" title="What Our Clients Say" />
        <Testimonials />
      </div></section>
      <CTA />
    </>
  );
}
