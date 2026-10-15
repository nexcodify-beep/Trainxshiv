import { useState } from 'react';
import { Video, Plus, Edit2, Trash2, Play } from 'lucide-react';
import Modal from '../components/Modal';

export default function VideoReviewsManager({ data, updateData, showToast }) {
  const videos = data.videoReviews || [];
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingItem({
      id: Date.now(),
      name: 'Client Name',
      result: 'Lost 10 KG in 3 months',
      poster: '/images/transformations/amit_video_poster.png',
      video: '/videos/review1.mp4',
      youtube: '',
    });
  };

  const handleOpenEdit = (v) => {
    setIsNew(false);
    setEditingItem({ ...v });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this video review?')) {
      const updated = videos.filter((v) => v.id !== id);
      updateData({ ...data, videoReviews: updated });
      showToast('Video review deleted');
    }
  };

  const handleSaveModal = () => {
    let updated;
    if (isNew) {
      updated = [...videos, editingItem];
      showToast('Video review added!');
    } else {
      updated = videos.map((v) => (v.id === editingItem.id ? editingItem : v));
      showToast('Video review updated!');
    }
    updateData({ ...data, videoReviews: updated });
    setEditingItem(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Client Video Reviews</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Video transformations and testimonial clips displayed in the video carousel
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          Add Video Review
        </button>
      </div>

      <div className="grid-3">
        {videos.map((v) => (
          <div key={v.id} className="admin-card" style={{ padding: 16 }}>
            <div
              style={{
                width: '100%',
                height: 180,
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#0f172a',
                marginBottom: 14,
                position: 'relative',
              }}
            >
              <img
                src={v.poster}
                alt={v.name}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  <Play size={20} fill="#fff" />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 800 }}>{v.name}</h3>
                <div style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 700 }}>
                  {v.result}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => handleOpenEdit(v)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: 6 }}
                  title="Edit"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: 6 }}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
              Source: {v.youtube ? 'YouTube' : 'MP4 File'}
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <Modal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          title={isNew ? 'New Video Review' : `Edit: ${editingItem.name}`}
          footer={
            <>
              <button onClick={() => setEditingItem(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveModal} className="btn btn-primary">
                Save Video
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
              <label className="form-label">Result Caption</label>
              <input
                type="text"
                className="form-control"
                value={editingItem.result || ''}
                onChange={(e) => setEditingItem({ ...editingItem, result: e.target.value })}
                placeholder="e.g. Lost 12 KG in 4 months"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Thumbnail Poster Image URL</label>
            <input
              type="text"
              className="form-control"
              value={editingItem.poster || ''}
              onChange={(e) => setEditingItem({ ...editingItem, poster: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Video MP4 File URL or Path</label>
            <input
              type="text"
              className="form-control"
              value={editingItem.video || ''}
              onChange={(e) => setEditingItem({ ...editingItem, video: e.target.value })}
              placeholder="/videos/review1.mp4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Or YouTube Embed Video URL</label>
            <input
              type="text"
              className="form-control"
              value={editingItem.youtube || ''}
              onChange={(e) => setEditingItem({ ...editingItem, youtube: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

