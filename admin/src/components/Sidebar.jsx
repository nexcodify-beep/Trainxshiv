import {
  LayoutDashboard,
  Building2,
  Sparkles,
  Dumbbell,
  CreditCard,
  UtensilsCrossed,
  Users,
  Images,
  Video,
  MessageSquareQuote,
  FileText,
  HelpCircle,
  Inbox,
  Database,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flame,
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  counts = {},
  dbStatus = {},
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'brand', label: 'Brand & Socials', icon: Building2 },
    { id: 'hero', label: 'Hero & Home', icon: Sparkles },
    { id: 'programs', label: 'Programs', icon: Dumbbell, count: counts.programs },
    { id: 'pricing', label: 'Pricing Plans', icon: CreditCard },
    { id: 'diets', label: 'Diet Plans', icon: UtensilsCrossed },
    { id: 'trainers', label: 'Trainers & Team', icon: Users, count: counts.trainers },
    { id: 'transforms', label: 'Transformations', icon: Images, count: counts.transforms },
    { id: 'videos', label: 'Video Reviews', icon: Video, count: counts.videos },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, count: counts.testimonials },
    { id: 'blog', label: 'Blog Posts', icon: FileText, count: counts.blogs },
    { id: 'faq', label: 'FAQ Manager', icon: HelpCircle, count: counts.faqs },
    { id: 'inquiries', label: 'Leads & Inquiries', icon: Inbox, badge: counts.newInquiries },
    { id: 'backup', label: 'Backup & Sync', icon: Database },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div
        style={{
          padding: collapsed ? '20px 10px' : '22px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #FF5E1E, #EA580C)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(255, 94, 30, 0.35)',
              }}
            >
              <Flame size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>
                Train<span style={{ color: 'var(--primary)' }}>X</span>Shiv
              </div>
              <div
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                }}
              >
                Control Center
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #FF5E1E, #EA580C)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <Flame size={20} />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: 6,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav Items */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: collapsed ? '12px 8px' : '14px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between',
                width: '100%',
                padding: collapsed ? '12px 0' : '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'var(--primary-subtle)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.875rem',
                border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title={collapsed ? item.label : undefined}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon size={19} color={isActive ? 'var(--primary)' : 'currentColor'} />
                {!collapsed && <span>{item.label}</span>}
              </div>

              {!collapsed && (
                <div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      style={{
                        background: 'var(--primary)',
                        color: '#fff',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: 999,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                      }}
                    >
                      {item.count}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Status & Live Site Link */}
      <div
        style={{
          padding: collapsed ? '12px 8px' : '16px',
          borderTop: '1px solid var(--border)',
          background: '#fafbfc',
        }}
      >
        {!collapsed && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
              fontSize: '0.75rem',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Database:</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                color: dbStatus.mysqlConnected
                  ? 'var(--success)'
                  : dbStatus.online
                  ? 'var(--warning)'
                  : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.6875rem',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: dbStatus.mysqlConnected
                    ? 'var(--success)'
                    : dbStatus.online
                    ? 'var(--warning)'
                    : '#94a3b8',
                }}
              />
              {dbStatus.mysqlConnected
                ? 'MySQL Online'
                : dbStatus.online
                ? 'Fallback Store'
                : 'Standalone'}
            </span>
          </div>
        )}

        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: collapsed ? '10px 0' : '9px 12px',
            background: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: 'var(--shadow-sm)',
          }}
          title="Open Website Frontend"
        >
          <ExternalLink size={15} color="var(--primary)" />
          {!collapsed && <span>View Live Site</span>}
        </a>
      </div>
    </aside>
  );
}

