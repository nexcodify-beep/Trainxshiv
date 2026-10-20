import { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Award, Instagram, MessageCircle, Mail } from 'lucide-react';
import Modal from '../components/Modal';

export default function TrainersManager({ data, updateData, showToast }) {
  const headTrainer = data.headTrainer || {};
  const teamTrainers = data.teamTrainers || [];

  const [editingTrainer, setEditingTrainer] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const handleHeadTrainerChange = (field, val) => {
    updateData({
      ...data,
      headTrainer: {
        ...headTrainer,
        [field]: val,
      },
    });
  };

  const handleHeadSocialChange = (channel, val) => {
    updateData({
      ...data,
      headTrainer: {
        ...headTrainer,
        socials: {
          ...(headTrainer.socials || {}),
          [channel]: val,
        },
      },
    });
  };

  const handleOpenAddTeam = () => {
    setIsNew(true);
    setEditingTrainer({
      id: Date.now(),
      name: 'New Coach Name',
      badge: 'FITNESS COACH',
      badgeIcon: 'Dumbbell',
      role: 'STRENGTH & CONDITIONING',
      tags: ['Strength', 'Weight Loss'],
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Coach bio and fitness background.',
      socials: {
        instagram: 'https://www.instagram.com/trainxshiv/',
        whatsapp: 'https://wa.me/917080263878',
        email: 'mailto:trainxshiv@gmail.com',
      },
    });
  };

  const handleOpenEditTeam = (t) => {
    setIsNew(false);
    setEditingTrainer({ ...t, tags: t.tags ? [...t.tags] : [] });
  };

  const handleDeleteTeam = (id) => {
    if (confirm('Delete this trainer?')) {
      const updated = teamTrainers.filter((t) => t.id !== id);
      updateData({ ...data, teamTrainers: updated });
      showToast('Trainer removed');
    }
  };

  const handleSaveModal = () => {
    let updated;
    if (isNew) {
      updated = [...teamTrainers, editingTrainer];
      showToast('New Coach added!');
    } else {
      updated = teamTrainers.map((t) => (t.id === editingTrainer.id ? editingTrainer : t));
      showToast('Trainer updated!');
    }
    updateData({ ...data, teamTrainers: updated });
    setEditingTrainer(null);
  };

  return (
    <div>
      {/* Head Trainer Profile */}
      <div className="admin-card" style={{ marginBottom: 28 }}>
        <div className="admin-card-header">
          <div className="admin-card-title">
            <Award size={20} color="var(--primary)" />
            Head Trainer &amp; Founder Profile (Shivam)
          </div>
          <span className="badge badge-orange">Featured on Homepage</span>
        </div>

        <div className="grid-2">
          <div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={headTrainer.name || ''}
                onChange={(e) => handleHeadTrainerChange('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Title / Designation Badge</label>
              <input
                type="text"
                className="form-control"
                value={headTrainer.badge || ''}
                onChange={(e) => handleHeadTrainerChange('badge', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bio &amp; Philosophy</label>
              <textarea
                className="form-control"
                value={headTrainer.bio || ''}
                onChange={(e) => handleHeadTrainerChange('bio', e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="form-group">
              <label className="form-label">Trainer Photo Image URL / Path</label>
              <input
                type="text"
                className="form-control"
                value={headTrainer.img || ''}
                onChange={(e) => handleHeadTrainerChange('img', e.target.value)}
              />
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
                <img
                  src={headTrainer.img}
                  alt={headTrainer.name}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'; }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--primary)',
                  }}
                />
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Current head coach profile avatar
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Direct WhatsApp Consultation Link</label>
              <input
                type="text"
                className="form-control"
                value={headTrainer.socials?.whatsapp || ''}
                onChange={(e) => handleHeadSocialChange('whatsapp', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Official Certifications & Specializations (4 Required Slots) */}
      <div className="admin-card" style={{ marginBottom: 28 }}>
        <div className="admin-card-header">
          <div className="admin-card-title">
            <Award size={20} color="#FFD700" />
            Certifications &amp; Specializations (4 Required Slots)
          </div>
          <span className="badge badge-success">Displayed on About Page Slider</span>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 18 }}>
          Accredited credentials shown in the interactive slider directly below Master Coach Shivan&apos;s photo.
          Required order: <strong>1. Personal Training</strong> &bull; <strong>2. Nutrition</strong> &bull; <strong>3. Injury &amp; Rehab</strong> &bull; <strong>4. Specialization</strong>.
        </p>

        <div className="grid-2">
          {(data.certificates || []).map((cert, idx) => (
            <div key={cert.id || idx} className="sm-cert-inline-card">
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div className="sm-cert-thumb-box">
                  <img
                    src={cert.img || '/images/certificate/personal-training.svg'}
                    alt={cert.title}
                    onError={(e) => { e.target.src = '/images/certificate/personal-training.svg'; }}
                  />
                  <span>Slot {idx + 1}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span className="badge badge-orange" style={{ fontSize: '0.6875rem' }}>{cert.badge}</span>
                    <span style={{ fontSize: '0.6875rem', color: '#10b981', fontWeight: 700 }}>VERIFIED</span>
                  </div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: '2px 0 4px', color: 'var(--text-primary)' }}>
                    {cert.title}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                    {cert.org}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                    <code>{cert.img}</code>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                    value={cert.img || ''}
                    placeholder="Image URL path"
                    onChange={(e) => {
                      const next = [...(data.certificates || [])];
                      next[idx].img = e.target.value;
                      updateData({ ...data, certificates: next });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Trainers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Team Trainers &amp; Specialists</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Manage the coaches shown on the &quot;About Trainers&quot; page
          </p>
        </div>
        <button onClick={handleOpenAddTeam} className="btn btn-primary">
          <Plus size={16} />
          Add Coach
        </button>
      </div>

      <div className="grid-3">
        {teamTrainers.map((t) => (
          <div key={t.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img
                  src={t.img}
                  alt={t.name}
                  onError={(e) => { e.target.src = 'https://randomuser.me/api/portraits/men/32.jpg'; }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid var(--border)',
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{t.name}</h3>
                  <span className="badge badge-gray" style={{ fontSize: '0.6875rem' }}>
                    {t.badge}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => handleOpenEditTeam(t)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: 6 }}
                  title="Edit"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDeleteTeam(t.id)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: 6 }}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 14, flex: 1 }}>
              {t.bio}
            </p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              {(t.tags || []).map((tag, idx) => (
                <span key={idx} className="badge badge-blue" style={{ fontSize: '0.6875rem' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <a
                href={t.socials?.whatsapp || '#'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary"
                style={{ width: '100%' }}
              >
                <MessageCircle size={14} />
                WhatsApp Message Link
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingTrainer && (
        <Modal
          isOpen={true}
          onClose={() => setEditingTrainer(null)}
          title={isNew ? 'Add New Coach' : `Edit Coach: ${editingTrainer.name}`}
          footer={
            <>
              <button onClick={() => setEditingTrainer(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveModal} className="btn btn-primary">
                Save Coach
              </button>
            </>
          }
        >
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Coach Name</label>
              <input
                type="text"
                className="form-control"
                value={editingTrainer.name || ''}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Specialization Badge</label>
              <input
                type="text"
                className="form-control"
                value={editingTrainer.badge || ''}
                onChange={(e) => setEditingTrainer({ ...editingTrainer, badge: e.target.value })}
                placeholder="e.g. STRENGTH TRAINER"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Photo Image URL</label>
            <input
              type="text"
              className="form-control"
              value={editingTrainer.img || ''}
              onChange={(e) => setEditingTrainer({ ...editingTrainer, img: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea
              className="form-control"
              value={editingTrainer.bio || ''}
              onChange={(e) => setEditingTrainer({ ...editingTrainer, bio: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Direct WhatsApp URL</label>
            <input
              type="text"
              className="form-control"
              value={editingTrainer.socials?.whatsapp || ''}
              onChange={(e) =>
                setEditingTrainer({
                  ...editingTrainer,
                  socials: { ...(editingTrainer.socials || {}), whatsapp: e.target.value },
                })
              }
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

