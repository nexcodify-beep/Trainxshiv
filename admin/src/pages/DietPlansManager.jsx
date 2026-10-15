import { useState } from 'react';
import { UtensilsCrossed, Plus, Edit2, Trash2, Check, Star } from 'lucide-react';
import Modal from '../components/Modal';

export default function DietPlansManager({ data, updateData, showToast }) {
  const diets = data.paidDiets || [];
  const [editingDiet, setEditingDiet] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingDiet({
      id: 'diet-' + Date.now().toString().slice(-4),
      name: 'Custom Diet Plan',
      price: 1499,
      weeks: '8 Weeks',
      popular: false,
      items: ['Custom calorie & macro targets', 'Veg/Non-veg meal chart', 'Grocery list', 'WhatsApp support'],
    });
  };

  const handleOpenEdit = (diet) => {
    setIsNew(false);
    setEditingDiet({ ...diet, items: diet.items ? [...diet.items] : [] });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this diet plan?')) {
      const updated = diets.filter((d) => d.id !== id);
      updateData({ ...data, paidDiets: updated });
      showToast('Diet plan deleted');
    }
  };

  const handleSaveModal = () => {
    let updated;
    if (isNew) {
      updated = [...diets, editingDiet];
      showToast('Diet plan added');
    } else {
      updated = diets.map((d) => (d.id === editingDiet.id ? editingDiet : d));
      showToast('Diet plan updated');
    }
    updateData({ ...data, paidDiets: updated });
    setEditingDiet(null);
  };

  const handleItemChange = (index, value) => {
    const next = [...editingDiet.items];
    next[index] = value;
    setEditingDiet({ ...editingDiet, items: next });
  };

  const handleAddItem = () => {
    setEditingDiet({
      ...editingDiet,
      items: [...(editingDiet.items || []), 'New diet feature'],
    });
  };

  const handleRemoveItem = (index) => {
    const next = editingDiet.items.filter((_, idx) => idx !== index);
    setEditingDiet({ ...editingDiet, items: next });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Customized Diet Plans</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Manage nutrition packages offered on the Diet Plans page
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          Add Diet Package
        </button>
      </div>

      <div className="grid-3">
        {diets.map((diet) => (
          <div
            key={diet.id}
            className="admin-card"
            style={{
              position: 'relative',
              border: diet.popular ? '2px solid var(--primary)' : '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {diet.popular && (
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
                }}
              >
                ★ Best Seller
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>{diet.name}</h3>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => handleOpenEdit(diet)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: 6 }}
                  title="Edit"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(diet.id)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: 6 }}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{diet.price?.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {diet.weeks} Program
              </div>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.8125rem', marginBottom: 20, flex: 1 }}>
              {(diet.items || []).map((it, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  <Check size={14} color="var(--success)" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button
                onClick={() => {
                  const updated = diets.map((d) => ({
                    ...d,
                    popular: d.id === diet.id ? !d.popular : false,
                  }));
                  updateData({ ...data, paidDiets: updated });
                  showToast('Best Seller tag updated');
                }}
                className={`btn btn-sm ${diet.popular ? 'btn-secondary' : 'btn-outline-primary'}`}
                style={{ width: '100%' }}
              >
                <Star size={13} />
                {diet.popular ? 'Remove Best Seller Tag' : 'Set As Best Seller'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingDiet && (
        <Modal
          isOpen={true}
          onClose={() => setEditingDiet(null)}
          title={isNew ? 'Create Diet Plan' : `Edit: ${editingDiet.name}`}
          footer={
            <>
              <button onClick={() => setEditingDiet(null)} className="btn btn-secondary">
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
                value={editingDiet.name || ''}
                onChange={(e) => setEditingDiet({ ...editingDiet, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price in INR (₹)</label>
              <input
                type="number"
                className="form-control"
                value={editingDiet.price || 0}
                onChange={(e) => setEditingDiet({ ...editingDiet, price: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Duration (e.g. 12 Weeks)</label>
            <input
              type="text"
              className="form-control"
              value={editingDiet.weeks || ''}
              onChange={(e) => setEditingDiet({ ...editingDiet, weeks: e.target.value })}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Included In This Diet Plan</label>
              <button type="button" onClick={handleAddItem} className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>
                + Add Item
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(editingDiet.items || []).map((it, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    className="form-control"
                    value={it}
                    onChange={(e) => handleItemChange(idx, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
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

