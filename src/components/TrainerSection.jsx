import React from 'react';
import { Crown, Dumbbell, User, Utensils, Instagram, Youtube, Mail } from 'lucide-react';
import { HEAD_TRAINER, TEAM_TRAINERS } from '../data';
import { useModal } from '../context';

function WhatsAppIcon({ size = 15, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const BADGE_ICONS = {
  Dumbbell: Dumbbell,
  User: User,
  Utensils: Utensils,
  Crown: Crown,
};

export default function TrainerSection({ showHeader = true }) {
  const { open } = useModal();

  return (
    <section className="trainer-tree-section" id="trainers-section">
      {/* Decorative ambient background curves */}
      <div className="trainer-bg-decor" aria-hidden="true">
        {/* Left smooth flowing wave */}
        <svg className="trainer-wave wave-left" viewBox="0 0 450 800" fill="none" preserveAspectRatio="none">
          <path
            d="M-50 0 C 120 180, 240 320, 140 520 C 50 680, 20 750, -50 800 Z"
            fill="url(#waveGradLeft)"
          />
          <defs>
            <linearGradient id="waveGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#BFDBFE" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>

        {/* Right smooth flowing wave */}
        <svg className="trainer-wave wave-right" viewBox="0 0 450 800" fill="none" preserveAspectRatio="none">
          <path
            d="M500 0 C 330 200, 260 380, 360 560 C 420 670, 460 740, 500 800 Z"
            fill="url(#waveGradRight)"
          />
          <defs>
            <linearGradient id="waveGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#BFDBFE" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dot pattern accents */}
        <div className="trainer-dot-matrix dot-matrix-tl" />
        <div className="trainer-dot-matrix dot-matrix-tr" />
        <div className="trainer-dot-matrix dot-matrix-br" />
      </div>

      <div className="container trainer-container">
        {showHeader && (
          <div className="trainer-header-block center">
            <div className="trainer-eyebrow">
              <span className="eyebrow-line" />
              <span className="eyebrow-text">MEET OUR TEAM</span>
              <span className="eyebrow-line" />
            </div>
            <h2 className="trainer-title">
              Our Client &amp; Expert <span className="trainer-title-highlight">Trainers</span>
            </h2>
            <p className="trainer-subtitle">
              Your fitness journey is guided by a dedicated team of professionals.<br />
              From personalized training to expert nutrition advice, we are here to support you at every step.
            </p>
          </div>
        )}

        {/* ================= HIERARCHY TREE ================= */}
        <div className="trainer-tree-wrapper">
          {/* ROOT: Head Trainer & Founder (Shivan) */}
          <div className="trainer-root-node">
            <div className="trainer-avatar-halo">
              <div className="trainer-avatar-ring head-avatar-ring">
                <img
                  src={HEAD_TRAINER.img}
                  alt={HEAD_TRAINER.name}
                  className="trainer-avatar-img"
                  loading="lazy"
                />
              </div>

              {/* Floating Head Trainer & Founder Badge */}
              <div className="head-badge-pill" title="Head Trainer & Founder">
                <Crown size={20} className="head-badge-crown" />
                <div className="head-badge-text">
                  <span>HEAD TRAINER</span>
                  <span>&amp; FOUNDER</span>
                </div>
              </div>
            </div>

            {/* Shivan Card */}
            <article className="trainer-card head-card" onClick={() => open('enroll', { plan: `Coaching with ${HEAD_TRAINER.name}` })}>
              <h3 className="trainer-card-name">{HEAD_TRAINER.name}</h3>
              <div className="trainer-card-role">{HEAD_TRAINER.role}</div>
              <p className="trainer-card-bio">{HEAD_TRAINER.bio}</p>

              {/* Social links row */}
              <div className="trainer-socials" onClick={(e) => e.stopPropagation()}>
                {HEAD_TRAINER.socials.instagram && (
                  <a
                    href={HEAD_TRAINER.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="social-btn social-ig"
                  >
                    <Instagram size={16} />
                  </a>
                )}
                {HEAD_TRAINER.socials.youtube && (
                  <a
                    href={HEAD_TRAINER.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="social-btn social-yt"
                  >
                    <Youtube size={16} />
                  </a>
                )}
                {HEAD_TRAINER.socials.whatsapp && (
                  <a
                    href={HEAD_TRAINER.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="social-btn social-wa"
                  >
                    <WhatsAppIcon size={16} />
                  </a>
                )}
                {HEAD_TRAINER.socials.email && (
                  <a
                    href={HEAD_TRAINER.socials.email}
                    aria-label="Email"
                    className="social-btn social-mail"
                  >
                    <Mail size={16} />
                  </a>
                )}
              </div>
            </article>

            {/* Top Anchor Dot */}
            <div className="connector-root-dot" aria-hidden="true" />
          </div>

          {/* SVG Connector Branch Lines for Desktop */}
          <div className="trainer-connector-container" aria-hidden="true">
            <svg
              className="trainer-connector-svg"
              viewBox="0 0 1000 85"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Central vertical stem from Shivan */}
              <path
                d="M 500 0 L 500 30"
                stroke="#0066FF"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
              {/* Central hub dot */}
              <circle cx="500" cy="30" r="4.5" fill="#0066FF" />

              {/* Left branch curving down to Rahul Sharma */}
              <path
                d="M 500 30 C 500 56, 166.6 46, 166.6 85"
                stroke="#0066FF"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Middle branch going straight down to Priya Singh */}
              <path
                d="M 500 30 L 500 85"
                stroke="#0066FF"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Right branch curving down to Aman Verma */}
              <path
                d="M 500 30 C 500 56, 833.3 46, 833.3 85"
                stroke="#0066FF"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Anchor Node Dots on top of each trainer */}
              <circle cx="166.6" cy="85" r="6" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="500" cy="85" r="6" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="833.3" cy="85" r="6" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2.5" />
            </svg>
          </div>

          {/* TEAM ROW: Rahul Sharma, Priya Singh, Aman Verma */}
          <div className="trainer-team-grid">
            {TEAM_TRAINERS.map((trainer) => {
              const IconComp = BADGE_ICONS[trainer.badgeIcon] || Dumbbell;
              return (
                <div key={trainer.id} className="trainer-team-column">
                  {/* Top Connection Node Indicator */}
                  <div className="trainer-node-anchor" aria-hidden="true" />

                  {/* Avatar with Floating Role Badge */}
                  <div className="trainer-avatar-wrapper">
                    <div className="trainer-avatar-ring team-avatar-ring">
                      <img
                        src={trainer.img}
                        alt={trainer.name}
                        className="trainer-avatar-img"
                        loading="lazy"
                      />
                    </div>

                    {/* Role Pill Badge overlapping bottom of avatar */}
                    <div className="trainer-badge-pill">
                      <IconComp size={16} className="trainer-badge-icon" />
                      <span className="trainer-badge-label">{trainer.badge}</span>
                    </div>
                  </div>

                  {/* Trainer Info Card */}
                  <article
                    className="trainer-card team-card"
                    onClick={() => open('enroll', { plan: `Training with ${trainer.name}` })}
                  >
                    <h3 className="trainer-card-name">{trainer.name}</h3>
                    <div className="trainer-card-role">{trainer.role}</div>
                    <p className="trainer-card-bio">{trainer.bio}</p>

                    {/* Social links row */}
                    <div className="trainer-socials" onClick={(e) => e.stopPropagation()}>
                      {trainer.socials.instagram && (
                        <a
                          href={trainer.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${trainer.name} Instagram`}
                          className="social-btn social-ig"
                        >
                          <Instagram size={16} />
                        </a>
                      )}
                      {trainer.socials.whatsapp && (
                        <a
                          href={trainer.socials.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${trainer.name} WhatsApp`}
                          className="social-btn social-wa"
                        >
                          <WhatsAppIcon size={16} />
                        </a>
                      )}
                      {trainer.socials.email && (
                        <a
                          href={trainer.socials.email}
                          aria-label={`${trainer.name} Email`}
                          className="social-btn social-mail"
                        >
                          <Mail size={16} />
                        </a>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

