import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { BRAND as DEFAULT_BRAND, NAV } from '../data';
import { useModal, useContent } from '../context';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useModal();
  const { brand: dynamicBrand } = useContent();
  const BRAND = dynamicBrand || DEFAULT_BRAND;
  const loc = useLocation();
  const navigate = useNavigate();
  const isHome = loc.pathname === '/';

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
        <div className="nav-brand-group">
          {!isHome && (
            <button
              type="button"
              className="mob-back-btn"
              onClick={() => navigate(-1)}
              aria-label="Go Back"
              title="Go Back"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          )}
          <Link to="/" className="brand" aria-label="TrainXShiv home">
            <img src="/logo.png" alt="TrainXShiv logo" />
          </Link>
        </div>
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
