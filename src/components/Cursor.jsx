import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    document.body.classList.add('has-cursor');
    let x = -100, y = -100, rx = -100, ry = -100, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.current.style.transform = `translate(${x}px,${y}px)`;
    };
    const over = (e) => {
      const hot = e.target.closest('a,button,[role=button],.card,summary,label,select,.ba-range,.chip');
      ring.current.classList.toggle('hot', !!hot);
      const txt = e.target.closest('input:not([type=range]),textarea');
      document.body.classList.toggle('on-text', !!txt);
    };
    const down = () => ring.current.classList.add('down');
    const up = () => ring.current.classList.remove('down');
    const loop = () => {
      rx += (x - rx) * 0.17; ry += (y - ry) * 0.17;
      ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);
  return (
    <>
      <div ref={ring} className="cur-ring" />
      <div ref={dot} className="cur-dot" />
    </>
  );
}
