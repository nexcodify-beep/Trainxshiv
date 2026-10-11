import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Linkedin, Phone, Mail, MapPin, ArrowRight, Dumbbell } from 'lucide-react';
import { BRAND } from '../data';

export default function Footer() {
  return (
    <footer className="ft">
      {/* Top CTA Strip */}
      <div className="ft-cta-strip">
        <div className="container ft-cta-inner">
          <div className="ft-cta-left">
            <Dumbbell size={22} className="ft-cta-icon" />
            <div>
              <div className="ft-cta-title">Ready to Transform Your Body?</div>
              <div className="ft-cta-sub">Join 500+ clients who changed their lives with TrainXShiv</div>
            </div>
          </div>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi! I want to start my fitness transformation with TrainXShiv.')}`}
            target="_blank" rel="noreferrer"
            className="ft-cta-btn"
          >
            Start Today <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="ft-main">
        <div className="container ft-grid">

          {/* Brand Col */}
          <div className="ft-brand-col">
            <img src="/logo.png" alt="TrainXShiv" className="ft-logo" />
            <p className="ft-tagline">Transforming Lives Through Fitness.<br />Train Your Body, Transform Your Life.</p>
            <div className="ft-socials">
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="ft-social-btn ft-ig"><Instagram size={17} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="ft-social-btn ft-yt"><Youtube size={17} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="ft-social-btn ft-fb"><Facebook size={17} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="ft-social-btn ft-li"><Linkedin size={17} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="ft-col">
            <h4 className="ft-col-title">Quick Links</h4>
            <Link to="/" className="ft-link">Home</Link>
            <Link to="/trainers" className="ft-link">Our Trainers</Link>
            <Link to="/programs" className="ft-link">Programs</Link>
            <Link to="/transformations" className="ft-link">Transformations</Link>
          </div>

          {/* Explore */}
          <div className="ft-col">
            <h4 className="ft-col-title">Explore</h4>
            <Link to="/diet-plans" className="ft-link">Diet Plans</Link>
            <Link to="/pricing" className="ft-link">Pricing</Link>
            <Link to="/blog" className="ft-link">Blog</Link>
            <Link to="/contact" className="ft-link">Contact</Link>
          </div>

          {/* Contact */}
          <div className="ft-col">
            <h4 className="ft-col-title">Contact Us</h4>
            <a href={`tel:${BRAND.phone}`} className="ft-link ft-contact-link"><Phone size={14} />{BRAND.phone}</a>
            <a href={`mailto:${BRAND.email}`} className="ft-link ft-contact-link"><Mail size={14} />{BRAND.email}</a>
            <span className="ft-link ft-contact-link"><MapPin size={14} />{BRAND.city}</span>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="ft-bottom">
        <div className="container ft-bottom-inner">
          <span>© {new Date().getFullYear()} TrainXShiv. All rights reserved.</span>
          <span className="ft-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="ft-dot">·</span>
            <Link to="/terms">Terms & Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
