import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { BRAND } from '../data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <img src="/logo.png" alt="TrainXShiv" className="foot-logo" />
          <p>Transforming Lives Through Fitness.<br />Train Your Body, Transform Your Life.</p>
          <div className="socials">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link><Link to="/trainers">About Trainers</Link><Link to="/programs">Programs</Link><Link to="/transformations">Transformations</Link>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/diet-plans">Diet Plans</Link><Link to="/pricing">Pricing</Link><Link to="/blog">Blog</Link><Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Contact Us</h4>
          <a href={`tel:${BRAND.phone}`}><Phone size={15} /> {BRAND.phone}</a>
          <a href={`mailto:${BRAND.email}`}><Mail size={15} /> {BRAND.email}</a>
          <span><MapPin size={15} /> {BRAND.city}</span>
        </div>
      </div>
      <div className="container foot-base">
        <span>© {new Date().getFullYear()} TrainXShiv. All rights reserved.</span>
        <span><Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms & Conditions</Link></span>
      </div>
    </footer>
  );
}
