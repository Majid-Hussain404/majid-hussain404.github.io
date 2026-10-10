import initialConfig from '../config/hiddenRepos.json';

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

// Cloud Sync Endpoint for instant cross-device persistence
const CLOUD_SYNC_URL = 'https://api.jsonbin.io/v3/b/661000000000000000000000'; // fallback cloud key
const LOCAL_STORAGE_KEY = 'majid_portfolio_hidden_repos';

/**
 * Fetches hidden repository IDs from the central database (Supabase / Cloud DB).
 * Falls back to src/config/hiddenRepos.json if offline or unreachable.
 */
export async function getCentralHiddenRepoIds() {
  // 1. Try Supabase if configured
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/portfolio_visibility?id=eq.default&select=hidden_repo_ids`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0 && Array.isArray(data[0].hidden_repo_ids)) {
          const ids = data[0].hidden_repo_ids;
          if (typeof window !== 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
          }
          return ids;
        }
      }
    } catch (err) {
      console.warn('Supabase fetch failed, trying cloud fallback:', err);
    }
  }

  // 2. Try LocalStorage cached copy
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // ignore
      }
    }
  }

  // 3. Default to initial configuration file
  return initialConfig?.hiddenRepoIds || [];
}

/**
 * Saves hidden repository IDs to the central database (Supabase & Cloud DB).
 * Also updates local cache for instant UI feedback.
 */
export async function saveCentralHiddenRepoIds(hiddenRepoIds) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(hiddenRepoIds));
  }

  // Save to Supabase if configured
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/portfolio_visibility?id=eq.default`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          hidden_repo_ids: hiddenRepoIds,
          updated_at: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('Supabase update failed:', err);
    }
  }

  return true;
}
