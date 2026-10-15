import { useState } from 'react';
import { MessageSquareQuote, Plus, Edit2, Trash2, Star } from 'lucide-react';
import Modal from '../components/Modal';

export default function TestimonialsManager({ data, updateData, showToast }) {
  const testimonials = data.testimonials || [];
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingItem({
      id: Date.now(),
      name: 'Client Name',
      rating: 5,
      text: 'Great experience training with Coach Shivam! Learned proper form and sustainable nutrition.',
      img: '/images/transformations/amit_avatar.png',
    });
  };

  const handleOpenEdit = (t) => {
    setIsNew(false);
    setEditingItem({ ...t });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this testimonial?')) {
      const updated = testimonials.filter((t) => t.id !== id);
      updateData({ ...data, testimonials: updated });
      showToast('Testimonial deleted');
    }
  };

  const handleSaveModal = () => {
    let updated;
    if (isNew) {
      updated = [...testimonials, editingItem];
      showToast('Testimonial added!');
    } else {
      updated = testimonials.map((t) => (t.id === editingItem.id ? editingItem : t));
      showToast('Testimonial updated!');
    }
    updateData({ ...data, testimonials: updated });
    setEditingItem(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Client Testimonials &amp; Reviews</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Quotes and 5-star ratings displayed in the client reviews section
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      <div className="grid-3">
        {testimonials.map((t) => (
          <div key={t.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img
                  src={t.img}
                  alt={t.name}
                  onError={(e) => {
                    e.target.src = 'https://randomuser.me/api/portraits/men/32.jpg';
                  }}
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{t.name}</h3>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                </div>
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

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic', flex: 1 }}>
              &ldquo;{t.text}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {editingItem && (
        <Modal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          title={isNew ? 'New Testimonial' : `Edit: ${editingItem.name}`}
          footer={
            <>
              <button onClick={() => setEditingItem(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveModal} className="btn btn-primary">
                Save Review
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
              <label className="form-label">Star Rating (1 - 5)</label>
              <select
                className="form-control"
                value={editingItem.rating || 5}
                onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
              >
                <option value={5}>★★★★★ (5 Stars)</option>
                <option value={4}>★★★★☆ (4 Stars)</option>
                <option value={3}>★★★☆☆ (3 Stars)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Avatar Image URL</label>
            <input
              type="text"
              className="form-control"
              value={editingItem.img || ''}
              onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Review Text</label>
            <textarea
              className="form-control"
              rows={4}
              value={editingItem.text || ''}
              onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

