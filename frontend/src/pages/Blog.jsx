import { useState } from 'react';
import { Search, ArrowRight, Clock } from 'lucide-react';
import { BLOG as DEFAULT_BLOG } from '../data';
import { useModal, useContent } from '../context';
import { CTA } from '../components/Sections';
import { Img } from '../components/ui';

const blogImages = ['/images/fat-loss.jpg', '/images/diet.jpg', '/images/workout.jpg', '/images/online.jpg', '/images/nutrition.jpg', '/images/muscle.jpg'];

export default function Blog() {
  const { open } = useModal();
  const { blog: dynamicBlog } = useContent();
  const BLOG = (dynamicBlog || DEFAULT_BLOG).filter(b => b.published !== false);
  const cats = ['All', ...new Set(BLOG.map((b) => b.cat))];
  const [cat, setCat] = useState('All');
  const [s, setS] = useState('');
  const items = BLOG.filter((b) => (cat === 'All' || b.cat === cat) && b.title.toLowerCase().includes(s.toLowerCase()));
  return (
    <>
      <section className="page-hero"><div className="container"><span className="pill">Blog</span><h1>Fitness Tips & <em>Nutrition Guides</em></h1><p>Simple, practical advice from our coaches.</p></div></section>
      <section className="section tight"><div className="container">
        <div className="blog-bar reveal">
          <div className="chips">{cats.map((c) => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
          <label className="search"><Search size={16} /><input type="text" placeholder="Search articles" value={s} onChange={(e) => setS(e.target.value)} /></label>
        </div>
        {items.length === 0 && <p className="muted center-t">No articles match your search. Try another word or category.</p>}
        <div className="grid g3 stagger reveal" key={cat + s}>
          {items.map((b) => (
            <article key={b.id} className="card bcard" onClick={() => open('blog', { id: b.id })} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && open('blog', { id: b.id })}>
              <div className="media"><Img src={blogImages[b.id - 1]} alt={b.title} label={b.cat} /></div>
              <div className="card-body"><span className="tagx">{b.cat}</span><h3>{b.title}</h3><div className="row-between"><small className="muted"><Clock size={13} /> {b.read}</small><span className="link">Read <ArrowRight size={15} /></span></div></div>
            </article>
          ))}
        </div>
      </div></section>
      <CTA />
    </>
  );
}
