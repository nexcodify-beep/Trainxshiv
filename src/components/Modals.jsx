import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Check, Send, Clock, BarChart3, VideoOff } from 'lucide-react';
import { useModal } from '../context';
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
      <div className="m-body center">
        <div className="success"><CheckCircle2 size={56} /></div>
        <h3>You're one step closer!</h3>
        <p className="muted">WhatsApp opened with your details. Send the message and our coach will reply shortly. If it did not open, call {BRAND.phone}.</p>
        <button className="btn btn-primary" onClick={close}>Done</button>
      </div>
    );
  return (
    <div className="m-body">
      <span className="pill">Free consultation</span>
      <h3>Start Your Transformation</h3>
      <p className="muted">Tell us your goal. A coach will reach out on WhatsApp.</p>
      <form className="form" onSubmit={submit}>
        <div className="grid g2">
          <label>Full name<input type="text" value={f.name} onChange={set('name')} placeholder="Your name" autoFocus /></label>
          <label>Mobile number<input type="tel" value={f.phone} onChange={set('phone')} placeholder="98XXXXXXXX" /></label>
        </div>
        <div className="grid g2">
          <label>Your goal
            <select value={f.goal} onChange={set('goal')}>{Object.entries(goals).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
          </label>
          <label>Plan / program
            <select value={f.plan} onChange={set('plan')}>
              <option value="">Not sure yet</option>
              {PLANS.map((p) => <option key={p.id} value={p.name}>{p.name} ({inr(p.price)})</option>)}
              {PROGRAMS.map((p) => <option key={p.id} value={p.title}>{p.title}</option>)}
              {f.plan && !PLANS.some((p) => p.name === f.plan) && !PROGRAMS.some((p) => p.title === f.plan) && <option value={f.plan}>{f.plan}</option>}
            </select>
          </label>
        </div>
        <label>Anything we should know? (optional)<textarea rows="3" value={f.note} onChange={set('note')} placeholder="Injuries, food preference, timing…" /></label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn btn-primary btn-lg" type="submit"><Send size={18} /> Send on WhatsApp</button>
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
  const p = PROGRAMS.find((x) => x.id === data.id);
  if (!p) return null;
  return (
    <div className="pm">
      <div className="pm-media"><Img src={p.img} alt={p.title} label={p.title} /></div>
      <div className="m-body">
        <span className="pill"><Icon name={p.icon} size={13} />{p.cat}</span>
        <h3>{p.title}</h3>
        <p className="muted">{p.tag}</p>
        <div className="meta"><span><Clock size={14} /> {p.weeks}</span><span><BarChart3 size={14} /> {p.level}</span></div>
        <ul className="ticks">{p.features.map((x) => <li key={x}><Check size={16} />{x}</li>)}<li><Check size={16} />Weekly check-ins & support</li></ul>
        <div className="row-between wrap">
          <div><small className="muted">Starting at</small><div className="price">{inr(p.from)}</div></div>
          <button className="btn btn-primary btn-lg" onClick={() => open('enroll', { program: p.title, plan: p.title })}>Enroll in this program</button>
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
      <Shell onClose={close} wide label="Free diet plan">
        <div className="m-body"><span className="pill">100% free</span><h3>Free Diet Plan Generator</h3><p className="muted">Get your daily calories, macros and a sample Indian meal plan in seconds.</p><DietTool compact /></div>
      </Shell>
    );
  return <Shell onClose={close} label="Enroll"><Enroll data={data} close={close} /></Shell>;
}
