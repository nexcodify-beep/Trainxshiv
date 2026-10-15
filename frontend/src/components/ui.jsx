import { useEffect, useRef, useState } from 'react';
import * as L from 'lucide-react';

export const Icon = ({ name, ...p }) => {
  const C = L[name] || L.Dumbbell;
  return <C {...p} />;
};

// Image with a premium fallback so the site never looks broken before photos are added
export function Img({ src, alt = '', label, className = '', logo = false, ...rest }) {
  const [bad, setBad] = useState(!src);
  const [fallbackSrc, setFallbackSrc] = useState(null);
  useEffect(() => {
    if (!src) { setBad(true); return; }
    setBad(false);
    setFallbackSrc(null);
  }, [src]);
  const onImageError = async () => {
    if (bad) return;
    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error('Image unavailable');
      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const scale = Math.max(512 / bitmap.width, 512 / bitmap.height);
      const w = bitmap.width * scale, h = bitmap.height * scale;
      ctx.drawImage(bitmap, (512 - w) / 2, (512 - h) / 2, w, h);
      setFallbackSrc(canvas.toDataURL('image/jpeg', .88));
    } catch {
      setBad(true);
    }
  };
  if (fallbackSrc) return <img className={className} src={fallbackSrc} alt={alt} loading="lazy" {...rest} />;
  if (bad)
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt || label}>
        {logo ? <img src="/logo.png" alt="" className="logo-fb" /> : <L.Dumbbell size={30} />}
        {!logo && <span>{label || alt}</span>}
      </div>
    );
  return <img className={className} src={src} alt={alt} loading="lazy" onError={onImageError} {...rest} />;
}

export function Counter({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const s = performance.now();
      const tick = (t) => {
        const p = Math.min((t - s) / duration, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function SectionHead({ eyebrow, title, sub, action, light }) {
  return (
    <div className={`sec-head reveal ${light ? 'light' : ''}`}>
      <div>
        {eyebrow && <span className="pill"><L.Sparkles size={13} />{eyebrow}</span>}
        <h2 className="title">{title}</h2>
        {sub && <p className="sub">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export const Stars = ({ n = 5 }) => (
  <span className="stars" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: n }).map((_, i) => <L.Star key={i} size={16} fill="currentColor" />)}
  </span>
);

export const inr = (n) => '₹' + n.toLocaleString('en-IN');

export function waLink(text) {
  return `https://wa.me/917080263878?text=${encodeURIComponent(text)}`;
}
