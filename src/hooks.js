import { useState, useEffect, useRef, useCallback } from 'react';

/* ===============================================
   useTheme — Dark / Light toggle
   =============================================== */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}

/* ===============================================
   useRotatingWords — cycles through an array
   =============================================== */
export function useRotatingWords(words, interval = 2800) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return { word: words[index], visible };
}

/* ===============================================
   useScrollAnimation — IntersectionObserver
   =============================================== */
export function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all animated children
    const targets = el.querySelectorAll(
      '.section-label-animate, .section-animate, .card-animate, .exp-animate, .contact-animate'
    );
    targets.forEach((t) => observer.observe(t));

    return () => {
      targets.forEach((t) => observer.unobserve(t));
    };
  }, []);

  return ref;
}

/* ===============================================
   useAdminMode — Owner passcode authentication
   =============================================== */
export function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('majid_portfolio_is_admin');
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || urlParams.get('owner') === 'true') {
        localStorage.setItem('majid_portfolio_is_admin', 'true');
        return true;
      }
      return stored === 'true';
    }
    return false;
  });

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.setItem('majid_portfolio_is_admin', 'false');
      return false;
    } else {
      const pin = prompt('Enter Owner Passcode to unlock editing & upload tools (Default: majid123):');
      if (pin === 'majid123' || pin === '404' || pin === 'majid') {
        setIsAdmin(true);
        localStorage.setItem('majid_portfolio_is_admin', 'true');
        return true;
      } else if (pin !== null) {
        alert('Access denied. Only the owner (Majid) can update profile pictures or upload new projects.');
        return false;
      }
      return false;
    }
  };

  return { isAdmin, toggleAdmin, setIsAdmin };
}

