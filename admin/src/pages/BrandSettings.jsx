import { Building2, Globe, Phone, Mail, Instagram, Youtube, Sparkles, MessageCircle } from 'lucide-react';

export default function BrandSettings({ data, updateData, showToast }) {
  const brand = data.brand || {};
  const announcement = brand.announcement || { enabled: false, text: '', link: '' };

  const handleChange = (field, val) => {
    updateData({
      ...data,
      brand: {
        ...brand,
        [field]: val,
      },
    });
  };

  const handleAnnouncementChange = (field, val) => {
    updateData({
      ...data,
      brand: {
        ...brand,
        announcement: {
          ...announcement,
          [field]: val,
        },
      },
    });
  };

  return (
    <div>
      <div className="grid-2">
        {/* Brand & Business Details */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <Building2 size={20} color="var(--primary)" />
              Brand & Business Details
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Brand Name</label>
            <input
              type="text"
              className="form-control"
              value={brand.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. TrainXShiv"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tagline / Motto</label>
            <input
              type="text"
              className="form-control"
              value={brand.tagline || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="e.g. Fitness & Lifestyle Transformation"
            />
          </div>

          <div className="form-group">
            <label className="form-label">City / Location</label>
            <input
              type="text"
              className="form-control"
              value={brand.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="e.g. Lucknow, Uttar Pradesh"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Badge Chip</label>
            <input
              type="text"
              className="form-control"
              value={brand.heroBadge || ''}
              onChange={(e) => handleChange('heroBadge', e.target.value)}
              placeholder="e.g. 🔥 Elite 1-on-1 Transformation"
            />
          </div>
        </div>

        {/* Contact & Socials */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <Phone size={20} color="var(--primary)" />
              Contact & Social Channels
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp Contact Number (Without +)</label>
            <input
              type="text"
              className="form-control"
              value={brand.whatsapp || ''}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="e.g. 917080263878"
            />
            <div className="form-help">Used for all WhatsApp direct booking buttons on the site.</div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number (Display)</label>
            <input
              type="text"
              className="form-control"
              value={brand.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. 7080263878"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={brand.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. trainxshiv@gmail.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Instagram Profile URL</label>
            <input
              type="url"
              className="form-control"
              value={brand.instagram || ''}
              onChange={(e) => handleChange('instagram', e.target.value)}
              placeholder="https://www.instagram.com/trainxshiv/"
            />
          </div>

          <div className="form-group">
            <label className="form-label">YouTube Channel URL</label>
            <input
              type="url"
              className="form-control"
              value={brand.youtube || ''}
              onChange={(e) => handleChange('youtube', e.target.value)}
              placeholder="https://www.youtube.com/@trainxshiv"
            />
          </div>
        </div>
      </div>

      {/* Announcement Bar Settings */}
      <div className="admin-card" style={{ marginTop: 24 }}>
        <div className="admin-card-header">
          <div className="admin-card-title">
            <Sparkles size={20} color="var(--primary)" />
            Top Announcement Ribbon
          </div>
          <label className="switch-label">
            <span>Show Announcement Bar:</span>
            <div
              className={`switch-toggle ${announcement.enabled ? 'active' : ''}`}
              onClick={() => handleAnnouncementChange('enabled', !announcement.enabled)}
            />
          </label>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Announcement Message</label>
            <input
              type="text"
              className="form-control"
              value={announcement.text || ''}
              onChange={(e) => handleAnnouncementChange('text', e.target.value)}
              placeholder="e.g. ⚡ Special Offer: Get 30% Off On 12-Week Transformation Packages!"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Button / Destination Link</label>
            <input
              type="text"
              className="form-control"
              value={announcement.link || ''}
              onChange={(e) => handleAnnouncementChange('link', e.target.value)}
              placeholder="e.g. /pricing or https://wa.me/..."
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div style={{ marginTop: 12 }}>
          <div className="form-label">Live Preview:</div>
          <div
            style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-md)',
              background: announcement.enabled
                ? 'linear-gradient(90deg, #ff5e1e, #ea580c)'
                : '#f1f5f9',
              color: announcement.enabled ? '#ffffff' : 'var(--text-muted)',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              textAlign: 'center',
            }}
          >
            {announcement.enabled ? (
              <>
                <span>{announcement.text || 'Your announcement will appear here'}</span>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.25)',
                    padding: '2px 8px',
                    borderRadius: 999,
                    fontSize: '0.75rem',
                  }}
                >
                  Claim Now →
                </span>
              </>
            ) : (
              'Announcement Bar is currently disabled'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

