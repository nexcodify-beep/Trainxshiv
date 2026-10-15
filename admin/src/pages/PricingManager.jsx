import { useState } from 'react';
import { CreditCard, Check, X, Star, Plus, Edit2, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';

export default function PricingManager({ data, updateData, showToast }) {
  const plans = data.plans || [];
  const [editingPlan, setEditingPlan] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingPlan({
      id: 'plan-' + Date.now().toString().slice(-4),
      name: 'Custom Package',
      price: 2999,
      duration: '12 Weeks',
      workout: true,
      diet: true,
      support: 'Priority Chat Support',
      tracking: true,
      popular: false,
    });
  };

  const handleOpenEdit = (plan) => {
    setIsNew(false);
    setEditingPlan({ ...plan });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this pricing plan?')) {
      const updated = plans.filter((p) => p.id !== id);
      updateData({ ...data, plans: updated });
      showToast('Pricing plan deleted');
    }
  };

  const handleSaveModal = () => {
    let updated;
    if (isNew) {
      updated = [...plans, editingPlan];
      showToast('New pricing plan created!');
    } else {
      updated = plans.map((p) => (p.id === editingPlan.id ? editingPlan : p));
      showToast('Pricing plan updated!');
    }
    updateData({ ...data, plans: updated });
    setEditingPlan(null);
  };

  const handleTogglePopular = (id) => {
    const updated = plans.map((p) => ({
      ...p,
      popular: p.id === id ? !p.popular : false,
    }));
    updateData({ ...data, plans: updated });
    showToast('Featured plan updated');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Pricing Plans & Memberships</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Configure package rates, features, duration, and the &quot;Most Popular&quot; featured badge
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          Add Pricing Tier
        </button>
      </div>

      <div className="grid-4">
        {plans.map((p) => (
          <div
            key={p.id}
            className="admin-card"
            style={{
              position: 'relative',
              border: p.popular ? '2px solid var(--primary)' : '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {p.popular && (
              <div
                style={{
                  position: 'absolute',
                  top: -12,
                  right: 20,
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: 999,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                ★ Most Popular
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>{p.name}</h3>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: 6 }}
                  title="Edit"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: 6 }}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{p.price?.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Duration: {p.duration}
              </div>
            </div>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8125rem', marginBottom: 20, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {p.workout ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--danger)" />}
                <span>Workout Routine</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {p.diet ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--danger)" />}
                <span>Indian Diet Plan</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={16} color="var(--success)" />
                <span>{p.support}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {p.tracking ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--danger)" />}
                <span>Weekly Tracking</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button
                onClick={() => handleTogglePopular(p.id)}
                className={`btn btn-sm ${p.popular ? 'btn-secondary' : 'btn-outline-primary'}`}
                style={{ width: '100%' }}
              >
                <Star size={13} />
                {p.popular ? 'Remove Popular Tag' : 'Set As Popular'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPlan && (
        <Modal
          isOpen={true}
          onClose={() => setEditingPlan(null)}
          title={isNew ? 'Create Pricing Plan' : `Edit Plan: ${editingPlan.name}`}
          footer={
            <>
              <button onClick={() => setEditingPlan(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveModal} className="btn btn-primary">
                Save Plan
              </button>
            </>
          }
        >
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Plan Name</label>
              <input
                type="text"
                className="form-control"
                value={editingPlan.name || ''}
                onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price in INR (₹)</label>
              <input
                type="number"
                className="form-control"
                value={editingPlan.price || 0}
                onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Duration Label</label>
              <input
                type="text"
                className="form-control"
                value={editingPlan.duration || ''}
                onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                placeholder="e.g. 12 Weeks or Flexible"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Support Level Description</label>
              <input
                type="text"
                className="form-control"
                value={editingPlan.support || ''}
                onChange={(e) => setEditingPlan({ ...editingPlan, support: e.target.value })}
                placeholder="e.g. WhatsApp Chat Support"
              />
            </div>
          </div>

          <div
            style={{
              padding: 16,
              background: '#f8fafc',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <label className="switch-label">
              <div
                className={`switch-toggle ${editingPlan.workout ? 'active' : ''}`}
                onClick={() => setEditingPlan({ ...editingPlan, workout: !editingPlan.workout })}
              />
              <span>Includes Custom Workout Plan</span>
            </label>

            <label className="switch-label">
              <div
                className={`switch-toggle ${editingPlan.diet ? 'active' : ''}`}
                onClick={() => setEditingPlan({ ...editingPlan, diet: !editingPlan.diet })}
              />
              <span>Includes Indian Diet Plan</span>
            </label>

            <label className="switch-label">
              <div
                className={`switch-toggle ${editingPlan.tracking ? 'active' : ''}`}
                onClick={() => setEditingPlan({ ...editingPlan, tracking: !editingPlan.tracking })}
              />
              <span>Includes Weekly Body Measurements Tracking</span>
            </label>

            <label className="switch-label">
              <div
                className={`switch-toggle ${editingPlan.popular ? 'active' : ''}`}
                onClick={() => setEditingPlan({ ...editingPlan, popular: !editingPlan.popular })}
              />
              <span>Highlight as &quot;Most Popular&quot; Tier</span>
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
}

