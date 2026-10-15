import { Save, Check, RefreshCw, Bell, Search, ExternalLink } from 'lucide-react';

export default function TopBar({
  title,
  subtitle,
  onSave,
  saving,
  hasUnsaved,
  onReset,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <header className="admin-topbar">
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{subtitle}</p>
        )}
      </div>

      <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', gap: 14 }}>
        {/* Search */}
        {setSearchTerm && (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: 12,
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Quick search..."
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{
                paddingLeft: 36,
                paddingRight: 14,
                paddingTop: 8,
                paddingBottom: 8,
                fontSize: '0.8125rem',
                width: 210,
                borderRadius: 999,
              }}
            />
          </div>
        )}

        {/* Save button */}
        <button
          onClick={onSave}
          disabled={saving}
          className="btn btn-primary btn-sm"
          style={{
            minWidth: 130,
            background: hasUnsaved ? 'var(--primary)' : '#10b981',
          }}
        >
          {saving ? (
            <>
              <RefreshCw size={15} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
              Saving...
            </>
          ) : hasUnsaved ? (
            <>
              <Save size={15} />
              Save Changes
            </>
          ) : (
            <>
              <Check size={15} />
              All Saved
            </>
          )}
        </button>

        {/* Profile Avatar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft: 8,
            borderLeft: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.875rem',
            }}
          >
            S
          </div>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, lineHeight: 1.1 }}>Shivam</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}

