import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Instagram, CheckCircle2 } from 'lucide-react';
import { BRAND as DEFAULT_BRAND } from '../data';
import { waLink } from '../components/ui';
import { useContent } from '../context';

export default function Contact() {
  const { brand: dynamicBrand } = useContent();
  const BRAND = dynamicBrand || DEFAULT_BRAND;

  const [f, setF] = useState({ name: '', phone: '', email: '', msg: '' });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr('Please enter your name.');
    if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s|\+91/g, ''))) return setErr('Enter a valid 10-digit mobile number.');
    if (f.msg.trim().length < 5) return setErr('Please write a short message.');
    setErr('');

    // Sync lead to Admin CRM / Backend
    try {
      fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name,
          phone: f.phone,
          email: f.email,
          goal: 'Contact Page Inquiry',
          plan: 'Direct Inquiry',
          notes: f.msg,
        }),
      }).catch(() => {});

      const local = localStorage.getItem('trainxshiv_cms_data');
      if (local) {
        const parsed = JSON.parse(local);
        parsed.inquiries = parsed.inquiries || [];
        parsed.inquiries.unshift({
          id: 'INQ-' + Date.now().toString().slice(-5),
          name: f.name,
          phone: f.phone,
          email: f.email,
          goal: 'Contact Page Inquiry',
          plan: 'Direct Inquiry',
          notes: f.msg,
          status: 'New',
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('trainxshiv_cms_data', JSON.stringify(parsed));
      }
    } catch (e) {}

    window.open(waLink(`Hi TrainXShiv!\nName: ${f.name}\nPhone: ${f.phone}\n${f.email ? 'Email: ' + f.email + '\n' : ''}${f.msg}`), '_blank');
    setOk(true);
  };
  const info = [[Phone, 'Call us', BRAND.phone, `tel:${BRAND.phone}`], [Mail, 'Email', BRAND.email, `mailto:${BRAND.email}`], [Instagram, 'Instagram', '@trainxshiv', BRAND.instagram], [MapPin, 'Location', BRAND.city, '#map']];
  return (
    <>
      <section className="page-hero"><div className="container"><span className="pill">Contact</span><h1>Talk to a <em>Coach</em></h1><p>Questions about a plan? Send a message and we will reply on WhatsApp.</p></div></section>
      <section className="section tight"><div className="container contact-grid">
        <div className="grid g1 stagger reveal">
          {info.map(([I, t, v, h]) => (
            <a key={t} href={h} className="card info-card" target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><span className="d-ico"><I size={22} /></span><div><small>{t}</small><b>{v}</b></div></a>
          ))}
        </div>
        <div className="card no-tilt contact-form reveal">
          {ok ? (
            <div className="center"><div className="success"><CheckCircle2 size={56} /></div><h3>Message ready!</h3><p className="muted">WhatsApp opened with your message. Send it and we will reply soon.</p><button className="btn btn-primary" onClick={() => { setOk(false); setF({ name: '', phone: '', email: '', msg: '' }); }}>Send another</button></div>
          ) : (
            <form className="form" onSubmit={submit}>
              <h3>Send us a message</h3>
              <div className="grid g2"><label>Name<input type="text" value={f.name} onChange={set('name')} placeholder="Your name" /></label><label>Mobile<input type="tel" value={f.phone} onChange={set('phone')} placeholder="98XXXXXXXX" /></label></div>
              <label>Email (optional)<input type="email" value={f.email} onChange={set('email')} placeholder="you@email.com" /></label>
              <label>Message<textarea rows="5" value={f.msg} onChange={set('msg')} placeholder="Tell us about your goal…" /></label>
              {err && <p className="err" role="alert">{err}</p>}
              <button className="btn btn-primary btn-lg" type="submit"><Send size={18} /> Send on WhatsApp</button>
            </form>
          )}
        </div>
      </div></section>
      <section className="section tight" id="map"><div className="container"><div className="map card no-tilt"><iframe title="TrainXShiv location" src="https://www.google.com/maps?q=Lucknow,Uttar+Pradesh&output=embed" loading="lazy" /></div></div></section>
    </>
  );
}
