import { useState } from 'react';
import { Plus, Edit2, Trash2, Dumbbell, Check, Eye } from 'lucide-react';
import Modal from '../components/Modal';

export default function ProgramsManager({ data, updateData, showToast, searchTerm = '' }) {
  const programs = data.programs || [];
  const [editingProg, setEditingProg] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = programs.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cat?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingProg({
      id: 'prog-' + Date.now().toString().slice(-4),
      cat: 'Custom Coaching',
      title: 'New Fitness Program',
      tag: 'Custom coaching program description.',
      weeks: '12 Weeks',
      level: 'All Levels',
      img: '/images/online.jpg',
      from: 1999,
      features: ['Personalized Diet Plan', 'Custom Workout Routine', 'Weekly Check-ins', 'WhatsApp Support'],
    });
  };

  const handleOpenEdit = (p) => {
    setIsNew(false);
    setEditingProg({ ...p, features: p.features ? [...p.features] : [] });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this program?')) {
      const updated = programs.filter((p) => p.id !== id);
      updateData({ ...data, programs: updated });
      showToast('Program removed successfully');
    }
  };

  const handleSaveModal = () => {
    if (!editingProg.title) {
      alert('Please provide a program title');
      return;
    }

    let updated;
    if (isNew) {
      updated = [...programs, editingProg];
      showToast('New Program added!');
    } else {
      updated = programs.map((p) => (p.id === editingProg.id ? editingProg : p));
      showToast('Program updated!');
    }
    updateData({ ...data, programs: updated });
    setEditingProg(null);
  };

  const handleFeatureChange = (index, value) => {
    const nextFeatures = [...editingProg.features];
    nextFeatures[index] = value;
    setEditingProg({ ...editingProg, features: nextFeatures });
  };

  const handleAddFeature = () => {
    setEditingProg({
      ...editingProg,
      features: [...(editingProg.features || []), 'New feature benefit'],
    });
  };

  const handleRemoveFeature = (index) => {
    const nextFeatures = editingProg.features.filter((_, idx) => idx !== index);
    setEditingProg({ ...editingProg, features: nextFeatures });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Coaching Programs</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Manage the fitness packages displayed on the Programs page and Homepage
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          Add New Program
        </button>
      </div>

      {/* Program Cards Grid */}
      <div className="grid-3">
        {filtered.map((prog) => (
          <div
            key={prog.id}
            className="admin-card"
            style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span className="badge badge-orange">{prog.cat}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => handleOpenEdit(prog)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: 6 }}
                  title="Edit Program"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(prog.id)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: 6 }}
                  title="Delete Program"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: 6 }}>{prog.title}</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 16, flex: 1 }}>
              {prog.tag}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginBottom: 16,
                paddingBottom: 14,
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span>⏱ {prog.weeks}</span>
              <span>•</span>
              <span>📈 {prog.level}</span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
                Key Inclusions ({prog.features?.length || 0})
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.8125rem' }}>
                {(prog.features || []).map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                    <Check size={14} color="var(--success)" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
              <div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Starts From</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ₹{prog.from?.toLocaleString('en-IN')}
                </div>
              </div>
              <button onClick={() => handleOpenEdit(prog)} className="btn btn-secondary btn-sm">
                Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingProg && (
        <Modal
          isOpen={true}
          onClose={() => setEditingProg(null)}
          title={isNew ? 'Create New Program' : `Edit ${editingProg.title}`}
          footer={
            <>
              <button onClick={() => setEditingProg(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveModal} className="btn btn-primary">
                Save Program
              </button>
            </>
          }
        >
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Program Title</label>
              <input
                type="text"
                className="form-control"
                value={editingProg.title || ''}
                onChange={(e) => setEditingProg({ ...editingProg, title: e.target.value })}
                placeholder="e.g. Muscle Building Program"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category Badge</label>
              <input
                type="text"
                className="form-control"
                value={editingProg.cat || ''}
                onChange={(e) => setEditingProg({ ...editingProg, cat: e.target.value })}
                placeholder="e.g. Muscle Building"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tagline / Short Summary</label>
            <textarea
              className="form-control"
              value={editingProg.tag || ''}
              onChange={(e) => setEditingProg({ ...editingProg, tag: e.target.value })}
              placeholder="Program summary..."
            />
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Starting Price (₹)</label>
              <input
                type="number"
                className="form-control"
                value={editingProg.from || 0}
                onChange={(e) => setEditingProg({ ...editingProg, from: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Duration (e.g. 12 Weeks)</label>
              <input
                type="text"
                className="form-control"
                value={editingProg.weeks || ''}
                onChange={(e) => setEditingProg({ ...editingProg, weeks: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty / Level</label>
              <input
                type="text"
                className="form-control"
                value={editingProg.level || ''}
                onChange={(e) => setEditingProg({ ...editingProg, level: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Banner Image Path / URL</label>
            <input
              type="text"
              className="form-control"
              value={editingProg.img || ''}
              onChange={(e) => setEditingProg({ ...editingProg, img: e.target.value })}
              placeholder="/images/muscle.jpg"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Included Features & Benefits</label>
              <button type="button" onClick={handleAddFeature} className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>
                + Add Bullet
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(editingProg.features || []).map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    className="form-control"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '0 10px' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

