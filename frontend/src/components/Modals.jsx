import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Check, Send, Clock, BarChart3, VideoOff, Target, AlertCircle, Sparkles } from 'lucide-react';
import { useModal, useContent } from '../context';
import { BRAND, PROGRAMS, PLANS, BLOG } from '../data';
import { Icon, Img, inr, waLink } from './ui';
import DietTool from './DietTool';

function Shell({ children, onClose, wide, dark, label }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [onClose]);
  return createPortal(
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${wide ? 'wide' : ''} ${dark ? 'dark-modal' : ''}`} role="dialog" aria-modal="true" aria-label={label}>
        <button className="m-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        {children}
      </div>
    </div>,
    document.body
  );
}

function Enroll({ data, close }) {
  const [f, setF] = useState({ name: '', phone: '', goal: data.goal || 'fat', plan: data.plan || data.program || '', note: '' });
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const goals = { fat: 'Fat Loss', gain: 'Weight Gain', muscle: 'Muscle Building', fit: 'Fitness & Toning' };
  const submit = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr('Please enter your name.');
    if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s|\+91/g, ''))) return setErr('Enter a valid 10-digit mobile number.');
    setErr('');
    const msg = `Hi TrainXShiv! I want to start my transformation.\nName: ${f.name}\nPhone: ${f.phone}\nGoal: ${goals[f.goal] || f.goal}\nPlan: ${f.plan || 'Not sure yet'}\n${f.note ? 'Note: ' + f.note : ''}`;
    
    window.open(waLink(msg), '_blank');
    setSent(true);
  };
  if (sent)
    return (
      <div className="m-body center consultation-success">
        <div className="success"><CheckCircle2 size={56} className="text-yellow" /></div>
        <h3>You're one step closer!</h3>
        <p className="muted">WhatsApp opened with your details. Send the message and Coach Shivam will reply shortly. If it did not open, call {BRAND.phone}.</p>
        <button className="btn btn-primary" onClick={close}>Done</button>
      </div>
    );
  return (
    <div className="m-body consultation-modal-body">
      <span className="pill pill-gold"><Sparkles size={13} className="text-yellow" /> Free Consultation</span>
      <h3 className="consultation-title">Start Your Transformation</h3>
      <p className="consultation-sub">Tell us your goal. Coach Shivam will reach out directly on WhatsApp.</p>
      <form className="form consultation-form" onSubmit={submit}>
        <div className="grid g2 consultation-grid-row">
          <label>Full name<input type="text" value={f.name} onChange={set('name')} placeholder="Your name" /></label>
          <label>Mobile number<input type="tel" value={f.phone} onChange={set('phone')} placeholder="98XXXXXXXX" /></label>
        </div>
        <div className="grid g2 consultation-grid-row">
          <label>Your goal
            <select value={f.goal} onChange={set('goal')}>{Object.entries(goals).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
          </label>
          <label>Plan / program
            <select value={f.plan} onChange={set('plan')}>
              <option value="">Not sure yet (Guidance needed)</option>
              {PLANS.map((p) => <option key={p.id} value={p.name}>{p.name} ({inr(p.price)})</option>)}
              {PROGRAMS.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
              {f.plan && !PLANS.some((p) => p.name === f.plan) && !PROGRAMS.some((p) => p.title === f.plan) && <option value={f.plan}>{f.plan}</option>}
            </select>
          </label>
        </div>
        <label>Anything we should know? (optional)<textarea rows="2" value={f.note} onChange={set('note')} placeholder="Injuries, food preference, preferred workout timing…" /></label>
        {err && <p className="err-gold" role="alert">{err}</p>}
        <button className="btn btn-primary btn-lg consultation-submit-btn" type="submit"><Send size={18} /> Connect with Coach on WhatsApp</button>
      </form>
    </div>
  );
}

function Video({ data }) {
  const [fail, setFail] = useState(false);
  return (
    <div className="vid">
      {data.youtube ? (
        <iframe title={data.title} src={`https://www.youtube.com/embed/${data.youtube}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      ) : fail ? (
        <div className="vid-fail"><VideoOff size={34} /><p>Video not added yet.<br />Put the file at <code>{data.src}</code> in the <code>public</code> folder.</p></div>
      ) : (
        <video src={data.src} controls autoPlay playsInline onError={() => setFail(true)} />
      )}
      {data.title && <div className="vid-cap"><b>{data.title}</b>{data.sub && <span>{data.sub}</span>}</div>}
    </div>
  );
}

function ProgramDetail({ data, open }) {
  const { programs } = useContent();
  const list = programs || PROGRAMS;
  const p = list.find((x) => x.id === data.id) || PROGRAMS.find((x) => x.id === data.id);
  if (!p) return null;

  const km = p.knowMore || {};
  const priceDisplay = p.priceFormatted || (p.price ? inr(p.price) : (p.from ? inr(p.from) : ''));
  const periodDisplay = p.pricePeriod || (p.weeks ? `/${p.weeks}` : '');
  const whatYouGet = km.whatYouGet || (p.features ? p.features.map(f => ({ title: f, desc: '' })) : []);
  const whoIsThisFor = km.whoIsThisFor || [];
  const headline = km.headline || p.title;
  const story = km.story || p.tag || '';
  const important = km.important || null;
  const ctaText = km.ctaText || 'Get Started Now';
  const validityText = km.validity || p.validity || '';

  const handleWhatsApp = () => {
    const text = `Hi Shivam! I want to enroll in "${p.title}" (${priceDisplay}${periodDisplay ? ' ' + periodDisplay : ''}). Please share details on how to get started.`;
    window.open(waLink(text), '_blank');
  };

  return (
    <div className="pkg-modal-container">
      {/* Top Header / Pricing Banner */}
      <div className="pkg-modal-header">
        <div className="pkg-modal-badges">
          <span className="pill pkg-cat-pill"><Icon name={p.icon || 'Dumbbell'} size={14} /> {p.cat}</span>
          {p.weeks && <span className="pill pkg-time-pill"><Clock size={13} /> {p.weeks}</span>}
        </div>
        <h2 className="pkg-modal-title">{p.title}</h2>
        {p.tagline && <p className="pkg-modal-tagline">{p.tagline}</p>}

        <div className="pkg-modal-pricing-card">
          <div className="pkg-modal-price-row">
            <div>
              <span className="pkg-modal-price-label">Program Investment</span>
              <div className="pkg-modal-price">
                {priceDisplay}
                {periodDisplay && <span className="pkg-modal-period">{periodDisplay}</span>}
              </div>
            </div>
            <button className="btn btn-primary pkg-modal-header-cta" onClick={handleWhatsApp}>
              <Send size={15} />
              <span>{ctaText}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pkg-modal-body">
        {/* Headline & Story */}
        <div className="pkg-section">
          <h3 className="pkg-section-title">{headline}</h3>
          {story.split('\n\n').map((para, idx) => (
            <p key={idx} className="pkg-story-para">{para}</p>
          ))}
        </div>

        {/* What You Get */}
        {whatYouGet.length > 0 && (
          <div className="pkg-section">
            <h4 className="pkg-block-title">
              <CheckCircle2 size={18} className="text-yellow" />
              <span>WHAT YOU GET:</span>
            </h4>
            <div className="pkg-what-you-get-grid">
              {whatYouGet.map((item, idx) => (
                <div key={idx} className="pkg-feature-item">
                  <div className="pkg-feature-num">{idx + 1}</div>
                  <div className="pkg-feature-content">
                    <strong className="pkg-feature-title">{item.title}{item.desc ? ':' : ''}</strong>
                    {item.desc && <span className="pkg-feature-desc"> {item.desc}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Who Is This For */}
        {whoIsThisFor.length > 0 && (
          <div className="pkg-section">
            <h4 className="pkg-block-title">
              <Target size={18} className="text-yellow" />
              <span>WHO IS THIS FOR?</span>
            </h4>
            <ul className="pkg-who-list">
              {whoIsThisFor.map((item, idx) => (
                <li key={idx}>
                  <Check size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Important Warning / Note */}
        {important && (
          <div className="pkg-important-box">
            <div className="pkg-important-header">
              <AlertCircle size={17} />
              <span>IMPORTANT</span>
            </div>
            <p>{important}</p>
          </div>
        )}

        {/* Validity Note */}
        {validityText && (
          <div className="pkg-validity-note">
            <strong>VALIDITY:</strong> {validityText}
          </div>
        )}

        {/* Bottom CTA Action Row */}
        <div className="pkg-modal-footer">
          <div className="pkg-footer-price">
            <span className="muted small">Package Price</span>
            <div className="price">{priceDisplay} {periodDisplay}</div>
          </div>
          <div className="pkg-footer-actions">
            <button 
              type="button" 
              className="btn btn-outline-light" 
              onClick={() => open('enroll', { program: p.title, plan: p.title })}
            >
              Book Consultation
            </button>
            <button 
              type="button" 
              className="btn btn-primary btn-lg" 
              onClick={handleWhatsApp}
            >
              <Send size={16} />
              <span>{ctaText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Blog({ data, open }) {
  const b = BLOG.find((x) => x.id === data.id);
  if (!b) return null;
  return (
    <div className="m-body article">
      <span className="pill">{b.cat}</span>
      <h3>{b.title}</h3>
      <small className="muted">{b.read} read · By Team TrainXShiv</small>
      {b.body.map((p, i) => <p key={i}>{p}</p>)}
      <div className="note-box">Want this applied to your own body and schedule?
        <button className="btn btn-primary btn-sm" onClick={() => open('enroll')}>Talk to a coach</button></div>
    </div>
  );
}

export default function Modals() {
  const { modal, close, open } = useModal();
  if (!modal) return null;
  const { type, data } = modal;
  if (type === 'video') return <Shell onClose={close} dark label="Video"><Video data={data} /></Shell>;
  if (type === 'program') return <Shell onClose={close} wide label="Program details"><ProgramDetail data={data} open={open} /></Shell>;
  if (type === 'blog') return <Shell onClose={close} wide label="Article"><Blog data={data} open={open} /></Shell>;
  if (type === 'freediet')
    return (
      <Shell onClose={close} wide label="Diet Plan">
        <div className="m-body"><span className="pill pill-gold">Personalized Plan &bull; ₹99</span><h3>Indian Diet Plan Generator</h3><p className="muted">Get your daily calories, macros and full personalized meal plan on WhatsApp.</p><DietTool compact /></div>
      </Shell>
    );
  return <Shell onClose={close} label="Enroll"><Enroll data={data} close={close} /></Shell>;
}
