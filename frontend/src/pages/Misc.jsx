import { Link, useParams } from 'react-router-dom';
import { BRAND } from '../data';

export function Legal() {
  const { pathname } = window.location;
  const priv = pathname.includes('privacy');
  return (
    <>
      <section className="page-hero"><div className="container"><h1>{priv ? 'Privacy Policy' : 'Terms & Conditions'}</h1></div></section>
      <section className="section tight"><div className="container narrow article card no-tilt" style={{ padding: 32 }}>
        {priv ? (<>
          <p>We collect only the details you share through our forms (name, phone, email, goal) so our coaches can contact you. We do not sell your data.</p>
          <p>Messages are sent through WhatsApp using your own device. For questions or deletion requests email {BRAND.email}.</p>
        </>) : (<>
          <p>Our diet and workout plans are general guidance and not medical advice. Please consult a doctor before starting any new program, especially if you have a medical condition.</p>
          <p>Results vary from person to person and depend on consistency. Fees, refunds and plan changes are explained by your coach before you enroll.</p>
        </>)}
        <p className="muted small">Replace this placeholder text with your final legal copy.</p>
      </div></section>
    </>
  );
}
export function NotFound() {
  return <section className="page-hero"><div className="container"><h1>Page not found</h1><p>The page you are looking for does not exist.</p><Link to="/" className="btn btn-primary">Back to Home</Link></div></section>;
}
