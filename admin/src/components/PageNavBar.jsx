import React from 'react';
import {
  Home,
  UserCheck,
  Dumbbell,
  UtensilsCrossed,
  Sparkles,
  PhoneCall,
  Inbox,
  Database,
  Award,
  Layers,
  Edit3,
} from 'lucide-react';

export const PAGE_DEFINITIONS = [
  {
    id: 'home',
    label: 'Home Page',
    icon: Home,
    sections: [
      { id: 'home_hero', label: '⚡ Hero & Main Title' },
      { id: 'home_stats', label: '📊 7+ Yrs & 100% Stats' },
      { id: 'instagram_reviews', label: '📸 TrainXShiv Instagram' },
    ],
  },
  {
    id: 'about',
    label: 'About Trainer',
    icon: UserCheck,
    sections: [
      { id: 'head_trainer', label: '👤 Master Coach Shivam' },
      { id: 'certificates', label: '🏅 4 Certificates (PT, Nutrition, Injury, Specialization)' },
      { id: 'metrics_strip', label: '📈 Metrics Strip (+18KG, 10%)' },
      { id: 'team_trainers', label: '👥 Coaching Team' },
    ],
  },
  {
    id: 'programs',
    label: 'Programs & Packages',
    icon: Dumbbell,
    sections: [
      { id: 'manage_programs', label: '🏋️ 9 Coaching Packages' },
      { id: 'manage_pricing', label: '💳 Pricing Tiers' },
    ],
  },
  {
    id: 'diets',
    label: 'Diet Plans',
    icon: UtensilsCrossed,
    sections: [
      { id: 'manage_diets', label: '🥗 Starter, Pro & Elite Diets' },
      { id: 'diet_generator', label: '⚡ ₹99 Diet WhatsApp Checkout' },
    ],
  },
  {
    id: 'transforms',
    label: 'Transformations',
    icon: Sparkles,
    sections: [
      { id: 'manage_transforms', label: '🔄 Client Photos & Results' },
      { id: 'instagram_reviews', label: '📹 Instagram Watch Story Links' },
    ],
  },
  {
    id: 'contact',
    label: 'Brand & Contact',
    icon: PhoneCall,
    sections: [
      { id: 'brand_contact', label: '📞 Phone, WhatsApp & Address' },
      { id: 'brand_announcement', label: '📢 Top Announcement Banner' },
    ],
  },
  {
    id: 'inquiries',
    label: 'Leads & CRM',
    icon: Inbox,
    sections: [
      { id: 'view_inquiries', label: '📩 Consultations & Leads' },
    ],
  },
  {
    id: 'backup',
    label: 'MySQL & Sync',
    icon: Database,
    sections: [
      { id: 'view_backup', label: '💾 Database Status & Export' },
    ],
  },
];

export default function PageNavBar({
  activePage,
  setActivePage,
  onOpenSectionModal,
  counts = {},
  dbStatus = {},
}) {
  const currentPageObj = PAGE_DEFINITIONS.find((p) => p.id === activePage) || PAGE_DEFINITIONS[0];

  return (
    <div className="admin-page-navbar-wrapper">
      {/* 1. TOP PAGE BUTTONS ROW */}
      <div className="admin-page-buttons-scroll">
        <div className="admin-page-buttons-track">
          {PAGE_DEFINITIONS.map((page) => {
            const IconComp = page.icon;
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                type="button"
                className={`admin-page-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActivePage(page.id)}
              >
                <IconComp size={16} />
                <span>{page.label}</span>
                {page.id === 'inquiries' && counts.newInquiries > 0 && (
                  <span className="page-pill-badge">{counts.newInquiries}</span>
                )}
                {page.id === 'about' && (
                  <span className="page-pill-badge gold">4 Certs</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PAGE QUICK-ACTION SECTION PILLS (Direct Click to Modal) */}
      <div className="admin-section-pills-bar">
        <div className="pills-label">
          <Layers size={13} className="text-yellow" />
          <span>Click any section to edit in Modal:</span>
        </div>

        <div className="admin-section-pills-scroll">
          {currentPageObj.sections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className="admin-section-pill-btn"
              onClick={() => onOpenSectionModal(sec.id)}
            >
              <Edit3 size={12} />
              <span>{sec.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

