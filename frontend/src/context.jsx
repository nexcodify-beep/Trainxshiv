import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import initialData from './initialData.json';

const STORAGE_KEY = 'trainxshiv_cms_data';
const API_URL = 'http://localhost:5000/api/content';

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

  const syncFromRemote = useCallback(async () => {
    try {
      const res = await fetch(API_URL, { signal: AbortSignal.timeout(2500) });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setContent(json.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
        }
      }
    } catch {
      // Backend offline, keep local/default
    }
  }, []);

  useEffect(() => {
    syncFromRemote();

    // Listen to localStorage changes across browser tabs (Admin <-> Frontend live sync!)
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
