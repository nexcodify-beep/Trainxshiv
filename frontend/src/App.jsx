import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MessageCircle, ArrowUp } from 'lucide-react';
import FitnessPreloader from './components/FitnessPreloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Modals from './components/Modals';
import { waLink } from './components/ui';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Trainers from './pages/Trainers';
import Transformations from './pages/Transformations';
import DietPlans from './pages/DietPlans';
import Contact from './pages/Contact';
import { Legal, NotFound } from './pages/Misc';

import { BRAND } from './data';

export default function App() {
  const loc = useLocation();
  const [prog, setProg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [loc.pathname]);

  // scroll progress
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      setProg(h > 0 ? (scrollY / h) * 100 : 0);
    };
    f();
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);

  // reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08 });
    const scan = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  // water ripple on every button + 3D tilt/glow on cards
  useEffect(() => {
    const down = (e) => {
      const el = e.target.closest('.btn,.chip');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.4;
      const mk = (cls, delay) => {
        const s = document.createElement('span');
        s.className = cls;
        s.style.cssText = `left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;width:${size}px;height:${size}px;animation-delay:${delay}ms`;
        el.appendChild(s);
        setTimeout(() => s.remove(), 1500);
      };
      mk('rip rip-fill', 0); mk('rip rip-ring', 0); mk('rip rip-ring', 160); mk('rip rip-ring', 320);
    };
    let last = null;
    const reset = (c) => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); };
    const move = (e) => {
      const c = e.target.closest ? e.target.closest('.card:not(.no-tilt)') : null;
      if (last && last !== c) reset(last);
      last = c;
      if (!c) return;
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', px * 100 + '%');
      c.style.setProperty('--my', py * 100 + '%');
      if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        c.style.setProperty('--ry', (px - 0.5) * 7 + 'deg');
        c.style.setProperty('--rx', (0.5 - py) * 7 + 'deg');
      }
    };
    document.addEventListener('pointerdown', down);
    document.addEventListener('mousemove', move);
    return () => { document.removeEventListener('pointerdown', down); document.removeEventListener('mousemove', move); };
  }, []);

  return (
    <>
      {loading && <FitnessPreloader onFinish={() => setLoading(false)} />}
      <div className="progress" style={{ width: prog + '%' }} />
      <Cursor />
      {BRAND.announcement?.enabled && BRAND.announcement?.text && (
        <aside
          style={{
            background: 'linear-gradient(90deg, #ff5e1e, #ea580c)',
            color: '#ffffff',
            textAlign: 'center',
            padding: '8px 16px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            position: 'relative',
            zIndex: 99,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <span>{BRAND.announcement.text}</span>
          {BRAND.announcement.link && (
            <a
              href={BRAND.announcement.link}
              style={{
                background: 'rgba(255,255,255,0.22)',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '2px 8px',
                borderRadius: 999,
                fontSize: '0.75rem',
              }}
            >
              Learn More &rarr;
            </a>
          )}
        </aside>
      )}
      <Navbar />
      <main key={loc.pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/about-trainer" element={<Trainers />} />
          <Route path="/about-trainers" element={<Trainers />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="/diet-plans" element={<DietPlans />} />
          <Route path="/pricing" element={<Navigate to="/programs" replace />} />
          <Route path="/blog" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Modals />
      <div className="fabs">
        {prog > 12 && <button className="fab up" aria-label="Back to top" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={20} /></button>}
        <a className="fab wa" href={waLink('Hi TrainXShiv! I want to know more about your programs.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={24} /></a>
      </div>
    </>
  );
}
