import { useState } from 'react';
import { FileText, Plus, Edit2, Trash2, Clock, CheckCircle } from 'lucide-react';
import Modal from '../components/Modal';

export default function BlogManager({ data, updateData, showToast, searchTerm = '' }) {
  const blogs = data.blog || [];
  const [editingBlog, setEditingBlog] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.cat?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingBlog({
      id: Date.now(),
      title: 'New Fitness & Nutrition Article',
      cat: 'Nutrition',
      read: '4 min',
      published: true,
      date: 'Oct 2026',
      bodyText: 'First paragraph of the article...\n\nSecond paragraph of the article with tips and recommendations.',
    });
  };

  const handleOpenEdit = (b) => {
    setIsNew(false);
    setEditingBlog({
      ...b,
      bodyText: Array.isArray(b.body) ? b.body.join('\n\n') : b.body || '',
    });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this blog post?')) {
      const updated = blogs.filter((b) => b.id !== id);
      updateData({ ...data, blog: updated });
      showToast('Article deleted');
    }
  };

  const handleSaveModal = () => {
    const paragraphs = editingBlog.bodyText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const formattedBlog = {
      ...editingBlog,
      body: paragraphs,
    };
    delete formattedBlog.bodyText;

    let updated;
    if (isNew) {
      updated = [formattedBlog, ...blogs];
      showToast('Article published!');
    } else {
      updated = blogs.map((b) => (b.id === editingBlog.id ? formattedBlog : b));
      showToast('Article updated!');
    }
    updateData({ ...data, blog: updated });
    setEditingBlog(null);
  };

  const handleTogglePublished = (id) => {
    const updated = blogs.map((b) =>
      b.id === id ? { ...b, published: b.published === false ? true : false } : b
    );
    updateData({ ...data, blog: updated });
    showToast('Publication status updated');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Blog &amp; Knowledge Base</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Publish fitness guides, diet advice, and workout tips for clients
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          Create New Article
        </button>
      </div>

      <div className="grid-2">
        {filtered.map((b) => {
          const isPublished = b.published !== false;
          return (
            <div key={b.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="badge badge-orange">{b.cat}</span>
                  <span className={`badge ${isPublished ? 'badge-green' : 'badge-gray'}`}>
                    {isPublished ? '● Published' : '○ Draft'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: 6 }}
                    title="Edit"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: 6 }}
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: 8 }}>{b.title}</h3>

              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 16,
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {Array.isArray(b.body) ? b.body[0] : b.body}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  borderTop: '1px solid var(--border)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={14} />
                  <span>{b.read} read</span>
                </div>

                <button
                  onClick={() => handleTogglePublished(b.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                >
                  {isPublished ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingBlog && (
        <Modal
          isOpen={true}
          onClose={() => setEditingBlog(null)}
          title={isNew ? 'Create New Article' : `Edit: ${editingBlog.title}`}
          footer={
            <>
              <button onClick={() => setEditingBlog(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveModal} className="btn btn-primary">
                Save Article
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Article Title</label>
            <input
              type="text"
              className="form-control"
              value={editingBlog.title || ''}
              onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
            />
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={editingBlog.cat || 'Nutrition'}
                onChange={(e) => setEditingBlog({ ...editingBlog, cat: e.target.value })}
              >
                <option value="Fat Loss">Fat Loss</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Workout">Workout</option>
                <option value="Mindset">Mindset</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Read Time</label>
              <input
                type="text"
                className="form-control"
                value={editingBlog.read || '4 min'}
                onChange={(e) => setEditingBlog({ ...editingBlog, read: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                value={editingBlog.published !== false ? 'pub' : 'draft'}
                onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.value === 'pub' })}
              >
                <option value="pub">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Article Content (Separate paragraphs with a blank line)</label>
            <textarea
              className="form-control"
              rows={8}
              value={editingBlog.bodyText || ''}
              onChange={(e) => setEditingBlog({ ...editingBlog, bodyText: e.target.value })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

