import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Toast from './components/Toast';
import PageNavBar from './components/PageNavBar';
import SectionModals from './components/SectionModals';

import Dashboard from './pages/Dashboard';
import BrandSettings from './pages/BrandSettings';
import HeroSettings from './pages/HeroSettings';
import ProgramsManager from './pages/ProgramsManager';
import PricingManager from './pages/PricingManager';
import DietPlansManager from './pages/DietPlansManager';
import TrainersManager from './pages/TrainersManager';
import TransformationsManager from './pages/TransformationsManager';
import VideoReviewsManager from './pages/VideoReviewsManager';
import TestimonialsManager from './pages/TestimonialsManager';
import BlogManager from './pages/BlogManager';
import FaqManager from './pages/FaqManager';
import InquiriesManager from './pages/InquiriesManager';
import BackupManager from './pages/BackupManager';

import { fetchContent, saveContent, checkBackendStatus } from './api';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [activeModal, setActiveModal] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dbStatus, setDbStatus] = useState({ online: false, database: 'Local Fallback', mysqlConnected: false });
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load Initial Content
  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchContent();
      setData(res.data);
      const status = await checkBackendStatus();
      setDbStatus(status);
      setLoading(false);
    }
    load();
  }, []);

  // Update Data handler
  const handleUpdateData = (nextData) => {
    setData(nextData);
    setHasUnsaved(true);
    // Also auto-save to local storage
    saveContent(nextData);
  };

  // Explicit Save Changes button
  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const result = await saveContent(data);
    setSaving(false);
    setHasUnsaved(false);
    if (result.source === 'backend') {
      showToast('All changes synced to MySQL backend API!');
    } else {
      showToast('Saved locally in browser storage!');
    }
  };

  // Modal section launcher
  const handleOpenSectionModal = (secId) => {
    if (secId === 'home_hero' || secId === 'home_stats') {
      setActiveModal('home_hero');
    } else if (secId === 'instagram_reviews') {
      setActiveModal('instagram_reviews');
    } else if (secId === 'head_trainer') {
      setActiveModal('head_trainer');
    } else if (secId === 'certificates') {
      setActiveModal('certificates');
    } else if (secId === 'metrics_strip') {
      setActiveModal('metrics_strip');
    } else if (secId === 'team_trainers') {
      setActiveTab('trainers');
    } else if (secId === 'manage_programs') {
      setActiveTab('programs');
    } else if (secId === 'manage_pricing') {
      setActiveTab('pricing');
    } else if (secId === 'manage_diets') {
      setActiveTab('diets');
    } else if (secId === 'diet_generator') {
      setActiveModal('diet_generator');
    } else if (secId === 'manage_transforms') {
      setActiveTab('transforms');
    } else if (secId === 'brand_contact' || secId === 'brand_announcement') {
      setActiveModal('brand_contact');
    } else if (secId === 'view_inquiries') {
      setActiveTab('inquiries');
    } else if (secId === 'view_backup') {
      setActiveTab('backup');
    } else {
      setActiveModal(secId);
    }
  };

  const handleSaveModalData = async (nextData) => {
    setData(nextData);
    setSaving(true);
    const result = await saveContent(nextData);
    setSaving(false);
    setHasUnsaved(false);
    if (result.source === 'backend') {
      showToast('✅ Saved to MySQL database & synced to frontend!');
    } else {
      showToast('✅ Saved locally & synced to frontend!');
    }
  };

  const getMappedPage = (tab) => {
    if (tab === 'home' || tab === 'hero') return 'home';
    if (tab === 'about' || tab === 'trainers') return 'about';
    if (tab === 'programs' || tab === 'pricing') return 'programs';
    if (tab === 'diets') return 'diets';
    if (tab === 'transforms' || tab === 'videos' || tab === 'testimonials') return 'transforms';
    if (tab === 'contact' || tab === 'brand') return 'contact';
    if (tab === 'inquiries') return 'inquiries';
    if (tab === 'backup') return 'backup';
    return 'home';
  };

  const handleSelectPage = (pageId) => {
    if (pageId === 'home') setActiveTab('hero');
    else if (pageId === 'about') setActiveTab('trainers');
    else if (pageId === 'programs') setActiveTab('programs');
    else if (pageId === 'diets') setActiveTab('diets');
    else if (pageId === 'transforms') setActiveTab('transforms');
    else if (pageId === 'contact') setActiveTab('brand');
    else if (pageId === 'inquiries') setActiveTab('inquiries');
    else if (pageId === 'backup') setActiveTab('backup');
  };

  if (loading || !data) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: 'var(--bg-app)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '4px solid #e2e8f0',
            borderTopColor: '#ff5e1e',
            animation: 'spin 0.8s linear infinite',
            marginBottom: 16,
          }}
        />
        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Loading TrainXShiv Admin Panel...</div>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const counts = {
    programs: data.programs?.length || 0,
    trainers: (data.teamTrainers?.length || 0) + 1,
    transforms: data.transforms?.length || 0,
    videos: data.videoReviews?.length || 0,
    testimonials: data.testimonials?.length || 0,
    blogs: data.blog?.length || 0,
    faqs: data.faq?.length || 0,
    newInquiries: (data.inquiries || []).filter((i) => i.status === 'New').length,
  };

  const titles = {
    dashboard: 'Dashboard Overview',
    brand: 'Brand & Social Media Settings',
    hero: 'Hero & Home Page Setup',
    programs: 'Coaching Programs Manager',
    pricing: 'Pricing & Membership Packages',
    diets: 'Diet Plans & Nutrition Packages',
    trainers: 'Trainers & Team Management',
    transforms: 'Transformations (Before / After)',
    videos: 'Client Video Reviews',
    testimonials: 'Client Reviews & Ratings',
    blog: 'Blog & Article Management',
    faq: 'FAQ Manager',
    inquiries: 'Leads & Consultations CRM',
    backup: 'Data Backup & Sync',
  };

  const subtitles = {
    dashboard: 'Summary of site content, quick stats, and latest consultation leads',
    brand: 'Manage logo, WhatsApp number, contact info, and top banner',
    hero: 'Customize the main title, CTA buttons, metrics, and steps',
    programs: 'Create and update training programs with pricing and bullet features',
    pricing: 'Set package rates, duration, and featured plan highlights',
    diets: 'Manage starter, pro, and elite nutrition plans',
    trainers: 'Update head coach Shivam & specialist trainer profiles',
    transforms: 'Showcase real client results with photos and weight change stats',
    videos: 'Configure transformation video testimonials and thumbnails',
    testimonials: 'Edit client reviews, feedback quotes, and 5-star ratings',
    blog: 'Write and publish fitness guides and diet articles',
    faq: 'Add and organize frequently asked questions',
    inquiries: 'Follow up with potential clients directly on WhatsApp',
    backup: 'Download JSON exports or test API connection',
  };

  return (
    <div className="admin-shell">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        counts={counts}
        dbStatus={dbStatus}
      />

      <div className="admin-main">
        <TopBar
          title={titles[activeTab] || 'Admin Panel'}
          subtitle={subtitles[activeTab]}
          onSave={handleSave}
          saving={saving}
          hasUnsaved={hasUnsaved}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Page-wise Navigation with Section Action Buttons */}
        <PageNavBar
          activePage={getMappedPage(activeTab)}
          setActivePage={handleSelectPage}
          onOpenSectionModal={handleOpenSectionModal}
          counts={counts}
          dbStatus={dbStatus}
        />

        <main className="admin-content">
          {activeTab === 'dashboard' && (
            <Dashboard
              data={data}
              updateData={handleUpdateData}
              setActiveTab={setActiveTab}
              showToast={showToast}
            />
          )}

          {activeTab === 'brand' && (
            <BrandSettings
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
            />
          )}

          {activeTab === 'hero' && (
            <HeroSettings
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
            />
          )}

          {activeTab === 'programs' && (
            <ProgramsManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'pricing' && (
            <PricingManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
            />
          )}

          {activeTab === 'diets' && (
            <DietPlansManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
            />
          )}

          {activeTab === 'trainers' && (
            <TrainersManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
            />
          )}

          {activeTab === 'transforms' && (
            <TransformationsManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
            />
          )}

          {activeTab === 'videos' && (
            <VideoReviewsManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
            />
          )}

          {activeTab === 'blog' && (
            <BlogManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'faq' && (
            <FaqManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
            />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'backup' && (
            <BackupManager
              data={data}
              updateData={handleUpdateData}
              showToast={showToast}
              dbStatus={dbStatus}
              setDbStatus={setDbStatus}
            />
          )}
        </main>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Dedicated Section Edit Modal */}
      {activeModal && (
        <SectionModals
          modalType={activeModal}
          data={data}
          onClose={() => setActiveModal(null)}
          onSave={handleSaveModalData}
        />
      )}
    </div>
  );
}

