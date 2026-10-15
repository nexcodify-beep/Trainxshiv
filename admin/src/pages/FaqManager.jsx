import { useState } from 'react';
import { HelpCircle, Plus, Edit2, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import Modal from '../components/Modal';

export default function FaqManager({ data, updateData, showToast }) {
  const faqs = data.faq || [];
  const [editingFaq, setEditingFaq] = useState(null);
  const [isNew, setIsNew] = useState(false);

  // Normalize FAQs to objects with q and a
  const normalizedFaqs = faqs.map((f, i) => {
    if (Array.isArray(f)) {
      return { id: i + 1, q: f[0], a: f[1] };
    }
    return { ...f, id: f.id || i + 1 };
  });

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingFaq({
      id: Date.now(),
      q: 'New Question?',
      a: 'Answer description explaining the details clearly.',
    });
  };

  const handleOpenEdit = (f) => {
    setIsNew(false);
    setEditingFaq({ ...f });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this FAQ?')) {
      const updated = normalizedFaqs.filter((f) => f.id !== id);
      updateData({ ...data, faq: updated });
      showToast('FAQ removed');
    }
  };

  const handleSaveModal = () => {
    let updated;
    if (isNew) {
      updated = [...normalizedFaqs, editingFaq];
      showToast('FAQ created!');
    } else {
      updated = normalizedFaqs.map((f) => (f.id === editingFaq.id ? editingFaq : f));
      showToast('FAQ updated!');
    }
    updateData({ ...data, faq: updated });
    setEditingFaq(null);
  };

  const handleMove = (index, dir) => {
    const nextFaqs = [...normalizedFaqs];
    const target = index + dir;
    if (target < 0 || target >= nextFaqs.length) return;
    const temp = nextFaqs[index];
    nextFaqs[index] = nextFaqs[target];
    nextFaqs[target] = temp;
    updateData({ ...data, faq: nextFaqs });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Frequently Asked Questions (FAQ)</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Manage the FAQ accordion displayed on the website
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          Add New FAQ
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {normalizedFaqs.map((f, idx) => (
          <div key={f.id} className="admin-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ display: 'flex', gap: 14 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--primary-subtle)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    flexShrink: 0,
                  }}
                >
                  Q{idx + 1}
                </span>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>{f.q}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{f.a}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <button
                  onClick={() => handleMove(idx, -1)}
                  disabled={idx === 0}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: 6 }}
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  onClick={() => handleMove(idx, 1)}
                  disabled={idx === normalizedFaqs.length - 1}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: 6 }}
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  onClick={() => handleOpenEdit(f)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: 6 }}
                  title="Edit"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: 6 }}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingFaq && (
        <Modal
          isOpen={true}
          onClose={() => setEditingFaq(null)}
          title={isNew ? 'New FAQ' : 'Edit FAQ'}
          footer={
            <>
              <button onClick={() => setEditingFaq(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveModal} className="btn btn-primary">
                Save FAQ
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Question</label>
            <input
              type="text"
              className="form-control"
              value={editingFaq.q || ''}
              onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Answer</label>
            <textarea
              className="form-control"
              rows={4}
              value={editingFaq.a || ''}
              onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

