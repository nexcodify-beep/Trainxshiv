import { useState } from 'react';
import { Images, Plus, Edit2, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import Modal from '../components/Modal';

export default function TransformationsManager({ data, updateData, showToast }) {
  const transforms = data.transforms || [];
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingItem({
      id: Date.now(),
      name: 'Client Name',
      goal: 'Fat Loss & Abs',
      type: 'fat',
      result: '-10 KG',
      period: 'in 3 Months',
      image: '/images/transformations/ba7.png',
    });
  };

  const handleOpenEdit = (t) => {
    setIsNew(false);
    setEditingItem({ ...t });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this transformation story?')) {
      const updated = transforms.filter((t) => t.id !== id);
      updateData({ ...data, transforms: updated });
      showToast('Transformation deleted');
    }
  };

  const handleSaveModal = () => {
    let updated;
    if (isNew) {
      updated = [...transforms, editingItem];
      showToast('Transformation story added!');
    } else {
      updated = transforms.map((t) => (t.id === editingItem.id ? editingItem : t));
      showToast('Transformation story updated!');
    }
    updateData({ ...data, transforms: updated });
    setEditingItem(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Before &amp; After Transformations</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Real client weight loss &amp; muscle building success stories with photos
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          Add Transformation Story
        </button>
      </div>

      <div className="grid-3">
        {transforms.map((t) => (
          <div key={t.id} className="admin-card" style={{ padding: 16 }}>
            {/* Image Preview */}
            <div
              style={{
                width: '100%',
                height: 200,
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#f1f5f9',
                marginBottom: 14,
                position: 'relative',
              }}
            >
              <img
                src={t.image}
                alt={t.name}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'rgba(15, 23, 42, 0.85)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  backdropFilter: 'blur(4px)',
                }}
              >
                {t.result} {t.period}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 800 }}>{t.name}</h3>
                <span className="badge badge-orange" style={{ marginTop: 4 }}>
                  {t.goal}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: 6 }}
                  title="Edit"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: 6 }}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
              Category: <strong style={{ color: 'var(--text-primary)' }}>{t.type?.toUpperCase()}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <Modal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          title={isNew ? 'New Transformation' : `Edit: ${editingItem.name}`}
          footer={
            <>
              <button onClick={() => setEditingItem(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveModal} className="btn btn-primary">
                Save Transformation
              </button>
            </>
          }
        >
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Client Name</label>
              <input
                type="text"
                className="form-control"
                value={editingItem.name || ''}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Transformation Type</label>
              <select
                className="form-control"
                value={editingItem.type || 'fat'}
                onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
              >
                <option value="fat">Fat Loss</option>
                <option value="muscle">Muscle Building</option>
                <option value="gain">Body Recomposition</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Result Metric (e.g. -12 KG / +8 KG)</label>
              <input
                type="text"
                className="form-control"
                value={editingItem.result || ''}
                onChange={(e) => setEditingItem({ ...editingItem, result: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Duration (e.g. in 4 Months)</label>
              <input
                type="text"
                className="form-control"
                value={editingItem.period || ''}
                onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Goal Description</label>
            <input
              type="text"
              className="form-control"
              value={editingItem.goal || ''}
              onChange={(e) => setEditingItem({ ...editingItem, goal: e.target.value })}
              placeholder="e.g. Fat Loss & Inch Loss"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Before / After Image Path or URL</label>
            <input
              type="text"
              className="form-control"
              value={editingItem.image || ''}
              onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
              placeholder="/images/transformations/ba7.png"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

