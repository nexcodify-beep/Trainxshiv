import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Toast from './components/Toast';

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
  const [activeTab, setActiveTab] = useState('dashboard');
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
      showToast('All changes synced to backend API!');
    } else {
      showToast('Saved locally in browser storage!');
    }
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
    </div>
  );
}

