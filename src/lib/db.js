import initialConfig from '../config/hiddenRepos.json';

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

const GITHUB_RAW_CONFIG_URL =
  'https://raw.githubusercontent.com/Majid-Hussain404/majid-hussain404.github.io/main/src/config/hiddenRepos.json';
const LOCAL_STORAGE_KEY = 'majid_portfolio_hidden_repos';

/**
 * Fetches hidden repository IDs from Supabase or live GitHub raw CDN.
 * Guaranteed to reflect live configuration across all devices worldwide.
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
      console.warn('Supabase fetch failed, falling back to GitHub raw CDN:', err);
    }
  }

  // 2. Fetch live raw config from GitHub CDN with cache busting
  try {
    const liveRes = await fetch(`${GITHUB_RAW_CONFIG_URL}?t=${Date.now()}`);
    if (liveRes.ok) {
      const liveData = await liveRes.json();
      if (liveData && Array.isArray(liveData.hiddenRepoIds)) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(liveData.hiddenRepoIds));
        }
        return liveData.hiddenRepoIds;
      }
    }
  } catch (err) {
    console.warn('Live GitHub raw CDN fetch failed:', err);
  }

  // 3. Try local storage cache
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

  // 4. Default to imported config file
  return initialConfig?.hiddenRepoIds || [];
}

/**
 * Saves hidden repository IDs to LocalStorage and triggers Supabase update if configured.
 */
export async function saveCentralHiddenRepoIds(hiddenRepoIds) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(hiddenRepoIds));
  }

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
