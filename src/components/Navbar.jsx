import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { BRAND, NAV } from '../data';
import { useModal } from '../context';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useModal();
  const loc = useLocation();
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => setMenu(false), [loc.pathname]);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-in">
        <Link to="/" className="brand" aria-label="TrainXShiv home">
          <img src="/logo.png" alt="TrainXShiv logo" />
        </Link>
        <nav className={`links ${menu ? 'open' : ''}`}>
          {NAV.map(([n, to]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{n}</NavLink>
          ))}
          <button className="btn btn-primary mob-only" onClick={() => open('enroll')}>Start Your Transformation</button>
        </nav>
        <div className="nav-cta">
          <a href={`tel:${BRAND.phone}`} className="nav-phone"><Phone size={15} /> {BRAND.phone}</a>
          <button className="btn btn-primary btn-sm" onClick={() => open('enroll')}>Join Now <ArrowRight size={16} /></button>
          <button className="burger" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}
