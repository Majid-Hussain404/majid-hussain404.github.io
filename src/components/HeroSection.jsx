import { useState, useRef, useEffect } from 'react';
import { useTheme, useRotatingWords, useAdminMode } from '../hooks';
import {
  SunIcon,
  MoonIcon,
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  DocumentIcon,
  CameraIcon,
  LockIcon,
  UnlockIcon,
  SettingsIcon,
} from './Icons';
import OwnerAuthModal from './OwnerAuthModal';
import resumePdf from './My resume .pdf';

const rotatingWords = ['Networks', 'WebApps', 'Security', 'Systems', 'Software'];
const GITHUB_AVATAR = 'https://avatars.githubusercontent.com/u/161548404?v=4';

export default function HeroSection() {
  const { theme, toggleTheme } = useTheme();
  const { word, visible } = useRotatingWords(rotatingWords);
  const {
    isAdmin,
    toggleAdmin,
    getPasscode,
    updatePasscode,
    loginWithPasscode,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
  } = useAdminMode();

  const fileInputRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState(() => {
    return localStorage.getItem('majid_portfolio_avatar') || GITHUB_AVATAR;
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'majid_portfolio_avatar') {
        setAvatarImage(e.newValue || GITHUB_AVATAR);
      }
    };
    const handleCustomUpdate = () => {
      setAvatarImage(localStorage.getItem('majid_portfolio_avatar') || GITHUB_AVATAR);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('avatar-updated', handleCustomUpdate);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('avatar-updated', handleCustomUpdate);
    };
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setAvatarImage(result);
        localStorage.setItem('majid_portfolio_avatar', result);
        window.dispatchEvent(new Event('avatar-updated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setAvatarImage(GITHUB_AVATAR);
    localStorage.removeItem('majid_portfolio_avatar');
    window.dispatchEvent(new Event('avatar-updated'));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section
      id="home"
      className="grid-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Radial overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 20%, var(--bg))',
        }}
      />

      {/* Hidden File Input for Avatar Upload */}
      {isAdmin && (
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      )}

      {/* Hero Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 24px',
        }}
      >
        <div
          className="animate-card-in"
          style={{
            width: '100%',
            maxWidth: '720px',
            borderRadius: '2.5rem',
            padding: 'clamp(24px, 4vw, 40px)',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Top: Avatar + Name + Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Profile Avatar Container */}
              <div
                onClick={() => {
                  if (isAdmin) {
                    fileInputRef.current?.click();
                  } else {
                    toggleAdmin();
                  }
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                title={isAdmin ? 'Click to upload or update profile photo' : 'Click to unlock owner controls & upload photo'}
                style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: isAdmin ? '2.5px solid var(--accent)' : '2px solid var(--border)',
                  overflow: 'hidden',
                  flexShrink: 0,
                  cursor: 'pointer',
                  background: avatarImage
                    ? 'none'
                    : 'linear-gradient(135deg, var(--accent), #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.3s ease',
                }}
              >
                {avatarImage ? (
                  <img
                    src={avatarImage}
                    alt="Majid Hussain"
                    onError={() => setAvatarImage(GITHUB_AVATAR)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '1.6rem',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    MH
                  </span>
                )}

                {/* Hover overlay with camera icon */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.6)',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <CameraIcon size={20} />
                  <span style={{ fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center' }}>
                    {isAdmin ? (avatarImage ? 'Change Photo' : 'Upload Photo') : 'Unlock & Upload'}
                  </span>
                </div>
              </div>
              <div>
                <h1
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  <span className="animate-name-in">Majid.</span>
                </h1>
                <p
                  className="font-mono"
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    marginTop: '2px',
                  }}
                >
                  @majid-hussain404
                </p>
                {/* Photo controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <button
                    onClick={() => {
                      if (isAdmin) {
                        fileInputRef.current?.click();
                      } else {
                        toggleAdmin();
                      }
                    }}
                    style={{
                      background: 'var(--accent-bg)',
                      border: '1px solid var(--border)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <CameraIcon size={12} />
                    {isAdmin ? (avatarImage ? 'Update photo' : 'Upload photo') : 'Update photo'}
                  </button>
                  {isAdmin && avatarImage && (
                    <button
                      onClick={handleRemovePhoto}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px 6px',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Top Right Buttons: Passcode Settings (if Admin) + Admin Lock Toggle + Theme Toggle */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {isAdmin && (
                <button
                  aria-label="Passcode Settings"
                  onClick={() => setIsSettingsModalOpen(true)}
                  title="Owner Passcode Settings (Update Passcode)"
                  style={{
                    padding: '10px',
                    borderRadius: '1rem',
                    border: '1px solid var(--accent)',
                    background: 'var(--accent-bg)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <SettingsIcon />
                </button>
              )}

              <button
                aria-label="Owner Mode"
                onClick={toggleAdmin}
                title={isAdmin ? 'Owner Mode Active (Click to Lock)' : 'Owner Lock (Click to unlock)'}
                style={{
                  padding: '10px',
                  borderRadius: '1rem',
                  border: isAdmin ? '1px solid var(--accent)' : '1px solid var(--border)',
                  background: isAdmin ? 'var(--accent-bg)' : 'var(--bg-secondary)',
                  color: isAdmin ? 'var(--accent)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                {isAdmin ? <UnlockIcon /> : <LockIcon />}
              </button>

              <button
                aria-label="Toggle theme"
                onClick={toggleTheme}
                style={{
                  padding: '10px',
                  borderRadius: '1rem',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>
          </div>

          {/* Headline with rotating word */}
          <div style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--text)',
                margin: 0,
              }}
            >
              I build{' '}
              <em
                className="font-serif rotating-word"
                style={{
                  color: 'var(--text)',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(8px)',
                  fontStyle: 'italic',
                }}
              >
                {word}
              </em>
              .
            </h2>
            <p
              style={{
                marginTop: '12px',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '520px',
              }}
            >
              A motivated B.Tech CS student who builds fast, explores networks &
              cybersecurity, and obsesses over the details that make technology
              truly reliable.
            </p>
          </div>

          {/* Social Links */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '32px',
            }}
          >
            <SocialButton
              href="https://github.com/Majid-Hussain404"
              title="GitHub"
              icon={<GitHubIcon />}
            />
            <SocialButton
              href="https://www.linkedin.com/in/majid-hussain-mir-09a3352a4/"
              title="LinkedIn"
              icon={<LinkedInIcon />}
              color="#0A66C2"
            />
            <SocialButton
              href="mailto:majidhussainmir239@gmail.com"
              title="Email"
              icon={<EmailIcon />}
              color="#EA4335"
            />
          </div>

          {/* Bottom: CV + Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '1rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                background: 'var(--text)',
                color: 'var(--bg)',
                boxShadow: 'var(--shadow)',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              }}
            >
              <DocumentIcon />
              View CV
            </a>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text)',
                }}
              >
                <span
                  className="animate-pulse-dot"
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 8px rgba(34,197,94,0.6)',
                  }}
                />
                Available for opportunities
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-up"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--text-muted)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '22px',
            height: '36px',
            borderRadius: '11px',
            border: '2px solid var(--border-strong)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '4px',
          }}
        >
          <div
            className="animate-scroll-down"
            style={{
              width: '4px',
              height: '8px',
              borderRadius: '2px',
              background: 'var(--text-muted)',
            }}
          />
        </div>
      </div>

      {/* Owner Authentication & Passcode Settings Modal */}
      <OwnerAuthModal
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
        isSettingsModalOpen={isSettingsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        loginWithPasscode={loginWithPasscode}
        getPasscode={getPasscode}
        updatePasscode={updatePasscode}
      />
    </section>
  );
}

function SocialButton({ href, title, icon, color }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener"
      title={title}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '0.85rem',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-secondary)',
        color: color || 'var(--text)',
        transition: 'all 0.2s ease',
      }}
    >
      {icon}
    </a>
  );
}
