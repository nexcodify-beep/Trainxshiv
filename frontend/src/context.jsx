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
          return { ...initialData, ...JSON.parse(stored) };
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
      setContent(stored ? { ...initialData, ...JSON.parse(stored) } : initialData);
    } catch (e) {
      console.warn('Failed to load saved site content:', e);
      setContent(initialData);
    }
  }, []);

  useEffect(() => {
    syncFromRemote();

    // Listen for content changes saved by another tab on this browser.
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setContent(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [syncFromRemote]);

  const value = {
    content,
    brand: content.brand || initialData.brand,
    hero: content.hero || initialData.hero,
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
