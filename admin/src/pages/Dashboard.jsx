import {
  Inbox,
  Dumbbell,
  Users,
  Images,
  MessageSquareQuote,
  FileText,
  Flame,
  ArrowUpRight,
  TrendingUp,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function Dashboard({ data, updateData, setActiveTab, showToast }) {
  const inquiries = data.inquiries || [];
  const programs = data.programs || [];
  const team = data.teamTrainers || [];
  const transforms = data.transforms || [];
  const blogs = data.blog || [];
  const brand = data.brand || {};
  const announcement = brand.announcement || { enabled: false, text: '', link: '' };

  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  const handleToggleAnnouncement = () => {
    updateData({
      ...data,
      brand: {
        ...brand,
        announcement: {
          ...announcement,
          enabled: !announcement.enabled,
        },
      },
    });
    showToast(`Top Announcement Bar ${!announcement.enabled ? 'Enabled' : 'Disabled'}`);
  };

  const handleUpdateInquiryStatus = (id, newStatus) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    updateData({ ...data, inquiries: updated });
    showToast(`Lead status updated to ${newStatus}`);
  };

  return (
    <div>
      {/* Top Banner Quick Announcement Control */}
      <div
        className="admin-card"
        style={{
          marginBottom: 24,
          background: announcement.enabled
            ? 'linear-gradient(135deg, #fff9f5, #ffffff)'
            : '#ffffff',
          border: announcement.enabled
            ? '1px solid var(--primary-border)'
            : '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 'var(--radius-md)',
                background: announcement.enabled ? 'var(--primary-subtle)' : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: announcement.enabled ? 'var(--primary)' : 'var(--text-muted)',
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Website Top Announcement Bar</h3>
                <span className={`badge ${announcement.enabled ? 'badge-orange' : 'badge-gray'}`}>
                  {announcement.enabled ? 'Active on Live Site' : 'Hidden'}
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                {announcement.text || 'No announcement message set'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setActiveTab('brand')}
              className="btn btn-secondary btn-sm"
            >
              Edit Text
            </button>
            <button
              onClick={handleToggleAnnouncement}
              className={`btn btn-sm ${announcement.enabled ? 'btn-danger' : 'btn-primary'}`}
            >
              {announcement.enabled ? 'Turn Off' : 'Turn On'}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-4" style={{ marginBottom: 28 }}>
        <div className="stat-tile" onClick={() => setActiveTab('inquiries')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#fff4ed', color: '#ff5e1e' }}>
            <Inbox size={26} />
          </div>
          <div>
            <div className="stat-value">{inquiries.length}</div>
            <div className="stat-title">Client Leads ({newInquiriesCount} new)</div>
          </div>
        </div>

        <div className="stat-tile" onClick={() => setActiveTab('programs')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <Dumbbell size={26} />
          </div>
          <div>
            <div className="stat-value">{programs.length}</div>
            <div className="stat-title">Coaching Programs</div>
          </div>
        </div>

        <div className="stat-tile" onClick={() => setActiveTab('transforms')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
            <Images size={26} />
          </div>
          <div>
            <div className="stat-value">{transforms.length}</div>
            <div className="stat-title">Transformations</div>
          </div>
        </div>

        <div className="stat-tile" onClick={() => setActiveTab('trainers')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon" style={{ background: '#faf5ff', color: '#a855f7' }}>
            <Users size={26} />
          </div>
          <div>
            <div className="stat-value">{team.length + 1}</div>
            <div className="stat-title">Coaches & Team</div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="admin-card" style={{ marginBottom: 28 }}>
        <div className="admin-card-header">
          <div className="admin-card-title">
            <TrendingUp size={20} color="var(--primary)" />
            Quick Management Actions
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('programs')}
            className="btn btn-secondary"
            style={{ flex: '1 1 200px' }}
          >
            <Dumbbell size={16} color="var(--primary)" />
            Manage Programs
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className="btn btn-secondary"
            style={{ flex: '1 1 200px' }}
          >
            <Sparkles size={16} color="var(--primary)" />
            Edit Pricing Plans
          </button>
          <button
            onClick={() => setActiveTab('transforms')}
            className="btn btn-secondary"
            style={{ flex: '1 1 200px' }}
          >
            <Images size={16} color="var(--primary)" />
            Add Transformation
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className="btn btn-secondary"
            style={{ flex: '1 1 200px' }}
          >
            <FileText size={16} color="var(--primary)" />
            Write Blog Post
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className="btn btn-primary"
            style={{ flex: '1 1 200px' }}
          >
            <Inbox size={16} />
            View Leads CRM ({newInquiriesCount})
          </button>
        </div>
      </div>

      {/* Recent Client Consultations / Leads */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title">
            <Inbox size={20} color="var(--primary)" />
            Recent Client Consultations & Inquiries
          </div>
          <button
            onClick={() => setActiveTab('inquiries')}
            className="btn btn-secondary btn-sm"
          >
            View All ({inquiries.length})
            <ArrowUpRight size={14} />
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            No consultation inquiries received yet.
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Phone / WhatsApp</th>
                  <th>Fitness Goal</th>
                  <th>Plan Interested</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inq) => {
                  const phoneClean = (inq.phone || '').replace(/\D/g, '');
                  const waHref = `https://wa.me/91${phoneClean}?text=Hi%20${encodeURIComponent(
                    inq.name
                  )},%20thank%20you%20for%20contacting%20TrainXShiv!%20How%20can%20we%20help%20you%20with%20your%20fitness%20transformation?`;

                  return (
                    <tr key={inq.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{inq.name}</div>
                        {inq.email && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {inq.email}
                          </div>
                        )}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{inq.phone || '—'}</div>
                      </td>
                      <td>
                        <span className="badge badge-gray">{inq.goal}</span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                          {inq.plan || 'General'}
                        </div>
                      </td>
                      <td>
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
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
    </div>
  );
}

