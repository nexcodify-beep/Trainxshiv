const API_BASE = 'http://localhost:5000/api';
const STORAGE_KEY = 'trainxshiv_cms_data';

// Default initial fallback data
import initialData from '../../backend/data/initialData.json';

export async function fetchContent() {
  try {
    const res = await fetch(`${API_BASE}/content`, { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
        return { data: json.data, source: 'backend' };
      }
    }
  } catch (err) {
    console.warn('Backend API offline or unreachable, using local store:', err.message);
  }

  // Fallback to local storage or initial json
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    try {
      return { data: JSON.parse(local), source: 'local' };
    } catch (e) {
      // corrupt, fallback to initial
    }
  }

  return { data: initialData, source: 'default' };
}

export async function saveContent(fullData) {
  // Always update local storage first for instant feedback
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fullData));

  // Sync to backend if accessible
  try {
    const res = await fetch(`${API_BASE}/content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullData),
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const json = await res.json();
      return { success: true, source: 'backend', data: json.data };
    }
  } catch (err) {
    console.warn('Backend offline, saved locally to localStorage:', err.message);
  }

  return { success: true, source: 'local', data: fullData };
}

export async function resetContent() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  try {
    await fetch(`${API_BASE}/reset`, { method: 'POST', signal: AbortSignal.timeout(3000) });
  } catch (err) {
    // offline
  }
  return initialData;
}

export async function checkBackendStatus() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      const json = await res.json();
      return {
        online: true,
        database: json.database || 'MySQL',
        mysqlConnected: !!json.mysqlConnected,
        dbName: json.dbName || 'trainxshiv_db',
      };
    }
    return { online: false, database: 'Local Storage', mysqlConnected: false };
  } catch {
    return { online: false, database: 'Local Storage', mysqlConnected: false };
  }
}

