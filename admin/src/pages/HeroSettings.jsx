import { Sparkles, Layers, ListOrdered, CheckCircle } from 'lucide-react';

export default function HeroSettings({ data, updateData }) {
  const hero = data.hero || {};
  const steps = data.steps || [];

  const handleHeroChange = (field, val) => {
    updateData({
      ...data,
      hero: {
        ...hero,
        [field]: val,
      },
    });
  };

  const handleStepChange = (index, field, val) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: val };
    updateData({ ...data, steps: updated });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <div className="admin-card-header">
          <div className="admin-card-title">
            <Sparkles size={20} color="var(--primary)" />
            Hero Section (Home Page Top)
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Hero Main Title (Headline)</label>
          <input
            type="text"
            className="form-control"
            value={hero.title || ''}
            onChange={(e) => handleHeroChange('title', e.target.value)}
            placeholder="TRANSFORM YOUR BODY & MINDSET"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hero Subtitle / Description</label>
          <textarea
            className="form-control"
            value={hero.subtitle || ''}
            onChange={(e) => handleHeroChange('subtitle', e.target.value)}
            placeholder="Personalized online fitness coaching..."
          />
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Primary CTA Button Text</label>
            <input
              type="text"
              className="form-control"
              value={hero.ctaPrimary || ''}
              onChange={(e) => handleHeroChange('ctaPrimary', e.target.value)}
              placeholder="Start Your Transformation"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Secondary CTA Button Text</label>
            <input
              type="text"
              className="form-control"
              value={hero.ctaSecondary || ''}
              onChange={(e) => handleHeroChange('ctaSecondary', e.target.value)}
              placeholder="Explore Programs"
            />
          </div>
        </div>

        {/* Highlight Stats */}
        <div style={{ marginTop: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <div className="form-label" style={{ marginBottom: 12 }}>
            Trust & Credibility Numbers (Hero Stats)
          </div>
          <div className="grid-3">
            <div
              style={{
                background: '#f8fafc',
                padding: 16,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="form-group" style={{ marginBottom: 10 }}>
                <label className="form-label">Stat 1 Value</label>
                <input
                  type="text"
                  className="form-control"
                  value={hero.stat1Number || ''}
                  onChange={(e) => handleHeroChange('stat1Number', e.target.value)}
                  placeholder="500+"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Stat 1 Label</label>
                <input
                  type="text"
                  className="form-control"
                  value={hero.stat1Label || ''}
                  onChange={(e) => handleHeroChange('stat1Label', e.target.value)}
                  placeholder="Clients Transformed"
                />
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: 16,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="form-group" style={{ marginBottom: 10 }}>
                <label className="form-label">Stat 2 Value</label>
                <input
                  type="text"
                  className="form-control"
                  value={hero.stat2Number || ''}
                  onChange={(e) => handleHeroChange('stat2Number', e.target.value)}
                  placeholder="98%"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Stat 2 Label</label>
                <input
                  type="text"
                  className="form-control"
                  value={hero.stat2Label || ''}
                  onChange={(e) => handleHeroChange('stat2Label', e.target.value)}
                  placeholder="Success Rate"
                />
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: 16,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="form-group" style={{ marginBottom: 10 }}>
                <label className="form-label">Stat 3 Value</label>
                <input
                  type="text"
                  className="form-control"
                  value={hero.stat3Number || ''}
                  onChange={(e) => handleHeroChange('stat3Number', e.target.value)}
                  placeholder="5+ Yrs"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Stat 3 Label</label>
                <input
                  type="text"
                  className="form-control"
                  value={hero.stat3Label || ''}
                  onChange={(e) => handleHeroChange('stat3Label', e.target.value)}
                  placeholder="Coaching Experience"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Steps */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title">
            <ListOrdered size={20} color="var(--primary)" />
            How It Works (4 Transformation Steps)
          </div>
        </div>

        <div className="grid-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                padding: 18,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: '#fafafa',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'var(--primary)',
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--primary-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                  }}
                >
                  {idx + 1}
                </span>
                Step {idx + 1}
              </div>

              <div className="form-group">
                <label className="form-label">Step Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={step.t || ''}
                  onChange={(e) => handleStepChange(idx, 't', e.target.value)}
                  placeholder="Title"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={step.d || ''}
                  onChange={(e) => handleStepChange(idx, 'd', e.target.value)}
                  placeholder="Details"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

