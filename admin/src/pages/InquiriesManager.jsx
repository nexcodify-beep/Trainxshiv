import { useState } from 'react';
import { Inbox, Plus, MessageCircle, Phone, Mail, Trash2, Edit2, Calendar } from 'lucide-react';
import Modal from '../components/Modal';

export default function InquiriesManager({ data, updateData, showToast, searchTerm = '' }) {
  const inquiries = data.inquiries || [];
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [editingInq, setEditingInq] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = inquiries
    .filter((inq) => {
      if (filterStatus === 'ALL') return true;
      return inq.status === filterStatus;
    })
    .filter((inq) => {
      const s = searchTerm.toLowerCase();
      return (
        inq.name?.toLowerCase().includes(s) ||
        inq.phone?.includes(s) ||
        inq.goal?.toLowerCase().includes(s)
      );
    });

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingInq({
      id: 'INQ-' + Date.now().toString().slice(-5),
      name: 'Walk-in Client',
      phone: '9876543210',
      email: '',
      goal: 'Fat Loss & Abs',
      plan: 'Online Coaching',
      status: 'New',
      notes: '',
      createdAt: new Date().toISOString(),
    });
  };

  const handleOpenEdit = (inq) => {
    setIsNew(false);
    setEditingInq({ ...inq });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this inquiry?')) {
      const updated = inquiries.filter((i) => i.id !== id);
      updateData({ ...data, inquiries: updated });
      showToast('Inquiry removed');
    }
  };

  const handleSaveModal = () => {
    let updated;
    if (isNew) {
      updated = [editingInq, ...inquiries];
      showToast('Lead added manually');
    } else {
      updated = inquiries.map((i) => (i.id === editingInq.id ? editingInq : i));
      showToast('Lead updated');
    }
    updateData({ ...data, inquiries: updated });
    setEditingInq(null);
  };

  const handleQuickStatus = (id, newStatus) => {
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status: newStatus } : i));
    updateData({ ...data, inquiries: updated });
    showToast(`Status changed to ${newStatus}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Client Leads &amp; Consultations</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Track potential clients from website contact forms and consultation requests
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary">
          <Plus size={16} />
          Add Client Lead
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['ALL', 'New', 'Contacted', 'Enrolled', 'Closed'].map((st) => {
          const count =
            st === 'ALL'
              ? inquiries.length
              : inquiries.filter((i) => i.status === st).length;
          const active = filterStatus === st;
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`btn btn-sm ${active ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 999 }}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
            No inquiries match this filter.
          </div>
        ) : (
          <div className="admin-table-wrap" style={{ border: 'none' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Contact Details</th>
                  <th>Goal &amp; Plan</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq) => {
                  const phoneClean = (inq.phone || '').replace(/\D/g, '');
                  const waHref = `https://wa.me/91${phoneClean}?text=Hi%20${encodeURIComponent(
                    inq.name
                  )},%20I'm%20Coach%20Shivam%20from%20TrainXShiv.%20I%20saw%20your%20interest%20in%20our%20${encodeURIComponent(
                    inq.plan || 'transformation'
                  )}%20program.%20Let's%20discuss%20your%20goal!`;

                  return (
                    <tr key={inq.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{inq.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          ID: {inq.id}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{inq.phone || '—'}</div>
                        {inq.email && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {inq.email}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="badge badge-orange">{inq.goal}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                          Plan: <strong>{inq.plan}</strong>
                        </div>
                      </td>
                      <td style={{ maxWidth: 220 }}>
                        <div style={{ fontSize: '0.8125rem', color: inq.notes ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                          {inq.notes || 'No notes added'}
                        </div>
                      </td>
                      <td>
                        <select
                          value={inq.status}
                          onChange={(e) => handleQuickStatus(inq.id, e.target.value)}
                          className="form-control"
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            borderRadius: 999,
                            width: 'auto',
                            background:
                              inq.status === 'New'
                                ? 'var(--primary-subtle)'
                                : inq.status === 'Enrolled'
                                ? 'var(--success-subtle)'
                                : '#f1f5f9',
                            color:
                              inq.status === 'New'
                                ? 'var(--primary)'
                                : inq.status === 'Enrolled'
                                ? 'var(--success)'
                                : 'var(--text-primary)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <option value="New">● New</option>
                          <option value="Contacted">● Contacted</option>
                          <option value="Enrolled">● Enrolled</option>
                          <option value="Closed">● Closed</option>
                        </select>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {phoneClean && (
                            <a
                              href={waHref}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-outline-primary"
                              title="Chat on WhatsApp"
                              style={{ padding: '5px 10px' }}
                            >
                              <MessageCircle size={14} />
                              WhatsApp
                            </a>
                          )}
                          <button
                            onClick={() => handleOpenEdit(inq)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: 6 }}
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(inq.id)}
                            className="btn btn-danger btn-sm"
                            style={{ padding: 6 }}
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingInq && (
        <Modal
          isOpen={true}
          onClose={() => setEditingInq(null)}
          title={isNew ? 'Add Client Lead' : `Edit Lead: ${editingInq.name}`}
          footer={
            <>
              <button onClick={() => setEditingInq(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveModal} className="btn btn-primary">
                Save Lead
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
                value={editingInq.name || ''}
                onChange={(e) => setEditingInq({ ...editingInq, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={editingInq.phone || ''}
                onChange={(e) => setEditingInq({ ...editingInq, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={editingInq.email || ''}
                onChange={(e) => setEditingInq({ ...editingInq, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                value={editingInq.status || 'New'}
                onChange={(e) => setEditingInq({ ...editingInq, status: e.target.value })}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Fitness Goal</label>
              <input
                type="text"
                className="form-control"
                value={editingInq.goal || ''}
                onChange={(e) => setEditingInq({ ...editingInq, goal: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Plan Interested In</label>
              <input
                type="text"
                className="form-control"
                value={editingInq.plan || ''}
                onChange={(e) => setEditingInq({ ...editingInq, plan: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Coach Notes &amp; Follow-up Details</label>
            <textarea
              className="form-control"
              rows={3}
              value={editingInq.notes || ''}
              onChange={(e) => setEditingInq({ ...editingInq, notes: e.target.value })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

