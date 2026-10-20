import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import initialData from './initialData.json';

const STORAGE_KEY = 'trainxshiv_cms_data';

// Modal Context
const ModalCtx = createContext(null);
export const useModal = () => useContext(ModalCtx);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);
  const open = useCallback((type, data = {}) => setModal({ type, data }), []);
  const close = useCallback(() => setModal(null), []);
  return <ModalCtx.Provider value={{ modal, open, close }}>{children}</ModalCtx.Provider>;
}

// Content Context for Dynamic CMS State
const ContentCtx = createContext(null);

export function useContent() {
  const ctx = useContext(ContentCtx);
  if (!ctx) {
    return initialData;
  }
  return ctx;
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (
            !parsed.programs ||
            parsed.programs.length < 9 ||
            parsed.programs.some(p => p.id === 'offline-pt' && p.img?.includes('shivamsingh.png')) ||
            parsed.programs.some(p => p.id === 'online-group-coaching' && !p.img)
          ) {
            parsed.programs = initialData.programs;
          }
          // Ensure online group coaching has group.jpg
          const groupCoaching = parsed.programs?.find(p => p.id === 'online-group-coaching');
          if (groupCoaching && (!groupCoaching.img || groupCoaching.img === '')) {
            groupCoaching.img = '/images/group.jpg';
          }
          if (!parsed.certificates || parsed.certificates.length < 4 || parsed.certificates.some(c => c.img && c.img.endsWith('.svg'))) {
            parsed.certificates = initialData.certificates;
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          return { ...initialData, ...parsed };
        }
      } catch (e) {
        console.warn('Failed to parse cached data:', e);
      }
    }
    return initialData;
  });

  const syncFromRemote = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          !parsed.programs ||
          parsed.programs.length < 9 ||
          parsed.programs.some(p => p.id === 'offline-pt' && p.img?.includes('shivamsingh.png')) ||
          parsed.programs.some(p => p.id === 'online-group-coaching' && !p.img)
        ) {
          parsed.programs = initialData.programs;
        }
        const groupCoaching = parsed.programs?.find(p => p.id === 'online-group-coaching');
        if (groupCoaching && (!groupCoaching.img || groupCoaching.img === '')) {
          groupCoaching.img = '/images/group.jpg';
        }
        if (!parsed.certificates || parsed.certificates.length < 4 || parsed.certificates.some(c => c.img && c.img.endsWith('.svg'))) {
          parsed.certificates = initialData.certificates;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        setContent({ ...initialData, ...parsed });
      } else {
        setContent(initialData);
      }
    } catch (e) {
      console.warn('Failed to load saved site content:', e);
      setContent(initialData);
    }
  }, []);

  useEffect(() => {
    syncFromRemote();

    // Fetch live from MySQL backend API if available
    const controller = new AbortController();
    fetch('http://localhost:5000/api/content', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.success && json.data) {
          const freshData = { ...initialData, ...json.data };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
          setContent(freshData);
        }
      })
      .catch(() => {
        // Standalone offline mode, already loaded from localStorage / initialData
      });

    // Listen for content changes saved by admin on another tab
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setContent(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      controller.abort();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncFromRemote]);

  const value = {
    content,
    brand: content.brand || initialData.brand,
    hero: content.hero || initialData.hero,
    certificates: content.certificates || initialData.certificates || [],
    programs: content.programs || initialData.programs,
    plans: content.plans || initialData.plans,
    paidDiets: content.paidDiets || initialData.paidDiets,
    headTrainer: content.headTrainer || initialData.headTrainer,
    teamTrainers: content.teamTrainers || initialData.teamTrainers,
    trainers: [content.headTrainer || initialData.headTrainer, ...(content.teamTrainers || initialData.teamTrainers)],
    transforms: content.transforms || initialData.transforms,
    videoReviews: content.videoReviews || initialData.videoReviews,
    testimonials: content.testimonials || initialData.testimonials,
    steps: content.steps || initialData.steps,
    blog: content.blog || initialData.blog,
    faq: (content.faq && content.faq.map(f => Array.isArray(f) ? f : [f.q, f.a])) || initialData.faq.map(f => Array.isArray(f) ? f : [f.q, f.a]),
    reloadContent: syncFromRemote,
  };

  return <ContentCtx.Provider value={value}>{children}</ContentCtx.Provider>;
}
