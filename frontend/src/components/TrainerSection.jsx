import React from 'react';
import { Crown, Dumbbell, User, Utensils, Instagram, Youtube, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { HEAD_TRAINER as DEFAULT_HEAD, TEAM_TRAINERS as DEFAULT_TEAM } from '../data';
import { useModal, useContent } from '../context';

function WhatsAppIcon({ size = 14, color = '#FFFFFF' }) {
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
  const { headTrainer: dynamicHead, teamTrainers: dynamicTeam } = useContent();
  const HEAD_TRAINER = dynamicHead || DEFAULT_HEAD;
  const TEAM_TRAINERS = dynamicTeam || DEFAULT_TEAM;

  return (
    <section className="premium-trainers-section" id="trainers-section">
      <div className="container">
        {showHeader && (
          <div className="trainers-section-head center">
            <span className="pill">
              <Sparkles size={13} /> MEET OUR TEAM
            </span>
            <h2>
              Our <span className="text-blue">Expert Trainers</span>
            </h2>
            <p className="subtitle">
              Your transformation journey is guided by certified coaches and nutritionists dedicated to your daily results.
            </p>
          </div>
        )}

        {/* Featured Head Trainer Card (Coach Shivam) with Big Prominent Image */}
        <div className="trainer-head-featured-card">
          <div className="head-card-inner">
            <div className="head-card-avatar-col">
              <div className="head-card-photo-box">
                <img
                  src={HEAD_TRAINER.img || '/foundercoach/shivamsingh.png'}
                  alt={HEAD_TRAINER.name}
                  className="head-card-big-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/foundercoach/shivamsingh.png';
                  }}
                />
                <div className="head-card-badge-overlay">
                  <Crown size={14} className="crown-ico" />
                  <span>HEAD TRAINER &amp; FOUNDER</span>
                </div>
              </div>
            </div>

            <div className="head-card-content-col">
              <h3 className="head-card-name">{HEAD_TRAINER.name}</h3>
              <div className="head-card-role">{HEAD_TRAINER.role}</div>
              <p className="head-card-bio">{HEAD_TRAINER.bio}</p>

              {/* Tags */}
              <div className="head-card-tags">
                {(HEAD_TRAINER.tags || ['Head Coach', 'Founder', 'Master Trainer']).map((t) => (
                  <span key={t} className="head-tag-pill">{t}</span>
                ))}
              </div>

              {/* Action Buttons (Compact & Sleek) */}
              <div className="head-card-action-bar">
                <a
                  href={HEAD_TRAINER.socials?.whatsapp || 'https://wa.me/917080263878?text=Hi%20Shivam,%20I%20want%20to%20start%20my%20fitness%20transformation'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-compact-whatsapp"
                >
                  <WhatsAppIcon size={14} />
                  <span>Chat WhatsApp</span>
                </a>

                <button
                  type="button"
                  className="btn-compact-enroll"
                  onClick={() => open('enroll', { plan: `Coaching with ${HEAD_TRAINER.name}` })}
                >
                  <span>Book Consultation</span>
                  <ArrowRight size={13} />
                </button>

                <div className="compact-socials-group">
                  {HEAD_TRAINER.socials?.instagram && (
                    <a
                      href={HEAD_TRAINER.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="compact-social-btn"
                    >
                      <Instagram size={14} />
                    </a>
                  )}
                  {HEAD_TRAINER.socials?.youtube && (
                    <a
                      href={HEAD_TRAINER.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="compact-social-btn"
                    >
                      <Youtube size={14} />
                    </a>
                  )}
                  {HEAD_TRAINER.socials?.email && (
                    <a
                      href={HEAD_TRAINER.socials.email}
                      aria-label="Email"
                      className="compact-social-btn"
                    >
                      <Mail size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Trainers Grid with Big Prominent Photos & Compact Controls */}
        <div className="trainers-cards-grid">
          {TEAM_TRAINERS.map((trainer) => {
            const IconComp = BADGE_ICONS[trainer.badgeIcon] || Dumbbell;
            return (
              <article key={trainer.id} className="team-trainer-card">
                {/* Big Prominent Trainer Photo Stage */}
                <div className="team-photo-stage">
                  <img
                    src={trainer.img}
                    alt={trainer.name}
                    className="team-big-photo"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600';
                    }}
                  />
                  <div className="team-badge-overlay">
                    <IconComp size={12} />
                    <span>{trainer.badge}</span>
                  </div>
                </div>

                {/* Compact Content Body */}
                <div className="team-card-body">
                  <div className="team-header-info">
                    <h3 className="team-trainer-name">{trainer.name}</h3>
                    <div className="team-trainer-role">{trainer.role}</div>
                  </div>

                  <p className="team-trainer-bio">{trainer.bio}</p>

                  <div className="team-tags-list">
                    {(trainer.tags || []).map((tag) => (
                      <span key={tag} className="team-tag">{tag}</span>
                    ))}
                  </div>

                  {/* Sleek, Small Action Buttons */}
                  <div className="team-card-actions">
                    {trainer.socials?.whatsapp && (
                      <a
                        href={trainer.socials.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-btn-whatsapp-compact"
                      >
                        <WhatsAppIcon size={13} />
                        <span>WhatsApp</span>
                      </a>
                    )}
                    <button
                      type="button"
                      className="team-btn-join-compact"
                      onClick={() => open('enroll', { plan: `Training with ${trainer.name}` })}
                    >
                      <span>Join</span>
                      <ArrowRight size={13} />
                    </button>
                    {trainer.socials?.instagram && (
                      <a
                        href={trainer.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${trainer.name} Instagram`}
                        className="team-social-mini-btn"
                      >
                        <Instagram size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
