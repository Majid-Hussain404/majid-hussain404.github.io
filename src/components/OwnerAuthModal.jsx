import { useState } from 'react';
import { CloseIcon, KeyIcon, SettingsIcon, EmailIcon, LockIcon, UnlockIcon } from './Icons';

export default function OwnerAuthModal({
  isAuthModalOpen,
  setIsAuthModalOpen,
  isSettingsModalOpen,
  setIsSettingsModalOpen,
  loginWithPasscode,
  getPasscode,
  updatePasscode,
}) {
  const [authInput, setAuthInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Settings Modal State
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const success = loginWithPasscode(authInput);
    if (success) {
      setAuthInput('');
      setIsAuthModalOpen(false);
      setIsForgotMode(false);
    } else {
      setAuthError('Incorrect passcode! Access denied.');
    }
  };

  const handleSendResetEmail = () => {
    const ownerEmail = 'majidhussainmir239@gmail.com';
    const subject = encodeURIComponent('Portfolio Passcode Reset Request');
    const body = encodeURIComponent(
      'Hi Majid,\n\nA passcode reset was requested for your portfolio site (majid-hussain404.github.io).\nIf this was you, please reset your passcode or use your default owner credentials.\n\nTarget Email: ' + ownerEmail
    );
    window.open(`mailto:${ownerEmail}?subject=${subject}&body=${body}`, '_blank');
    setResetSent(true);
  };

  const handleUpdatePasscodeSubmit = (e) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');

    const storedPasscode = getPasscode();
    if (currentPinInput !== storedPasscode && currentPinInput !== 'Majid@33hussain') {
      setSettingsError('Current passcode is incorrect!');
      return;
    }

    if (!newPinInput || newPinInput.length < 4) {
      setSettingsError('New passcode must be at least 4 characters long.');
      return;
    }

    if (newPinInput !== confirmPinInput) {
      setSettingsError('New passcode and confirmation do not match.');
      return;
    }

    updatePasscode(newPinInput);
    setSettingsSuccess('Passcode successfully updated!');
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    setTimeout(() => {
      setIsSettingsModalOpen(false);
      setSettingsSuccess('');
    }, 1500);
  };

  if (!isAuthModalOpen && !isSettingsModalOpen) return null;

  return (
    <>
      {/* 1. AUTH / UNLOCK MODAL */}
      {isAuthModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAuthModalOpen(false);
              setIsForgotMode(false);
            }
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              borderRadius: '2rem',
              padding: '32px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              color: 'var(--text)',
              position: 'relative',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '0.75rem',
                    background: 'var(--accent-bg)',
                    color: 'var(--accent)',
                    display: 'flex',
                  }}
                >
                  <LockIcon size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                  {isForgotMode ? 'Forgot Passcode' : 'Owner Authentication'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setIsForgotMode(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {!isForgotMode ? (
              /* Passcode Input Form */
              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                  Enter your owner passcode to unlock profile picture updates and project uploading.
                </p>

                {authError && (
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '0.75rem',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      fontSize: '0.825rem',
                      fontWeight: 500,
                    }}
                  >
                    {authError}
                  </div>
                )}

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Owner Passcode
                  </label>
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="Enter passcode..."
                    value={authInput}
                    onChange={(e) => setAuthInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '0.85rem',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setIsForgotMode(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      cursor: 'pointer',
                    }}
                  >
                    Forgot Passcode?
                  </button>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setIsAuthModalOpen(false)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '0.85rem',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '10px 22px',
                        borderRadius: '0.85rem',
                        border: 'none',
                        background: 'var(--accent)',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Unlock
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Forgot Passcode Reset View */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                  Send a passcode reset link directly to your registered Gmail address:
                </p>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '0.85rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <EmailIcon />
                  majidhussainmir239@gmail.com
                </div>

                {resetSent && (
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '0.75rem',
                      background: 'rgba(34, 197, 94, 0.15)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      color: '#22c55e',
                      fontSize: '0.825rem',
                      fontWeight: 500,
                    }}
                  >
                    Reset link email pre-filled! Check your Gmail inbox to complete reset.
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsForgotMode(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    ← Back to Login
                  </button>
                  <button
                    type="button"
                    onClick={handleSendResetEmail}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '0.85rem',
                      border: 'none',
                      background: 'var(--accent)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <EmailIcon />
                    Send Reset Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. PASSCODE SETTINGS MODAL */}
      {isSettingsModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSettingsModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              borderRadius: '2rem',
              padding: '32px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              color: 'var(--text)',
              position: 'relative',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '0.75rem',
                    background: 'var(--accent-bg)',
                    color: 'var(--accent)',
                    display: 'flex',
                  }}
                >
                  <KeyIcon size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                  Update Owner Passcode
                </h3>
              </div>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                }}
              >
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleUpdatePasscodeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Update your security passcode. Keep this secure so only you can upload projects or change your profile picture.
              </p>

              {settingsError && (
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '0.75rem',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    fontSize: '0.825rem',
                    fontWeight: 500,
                  }}
                >
                  {settingsError}
                </div>
              )}

              {settingsSuccess && (
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '0.75rem',
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#22c55e',
                    fontSize: '0.825rem',
                    fontWeight: 500,
                  }}
                >
                  {settingsSuccess}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Current Passcode *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current passcode..."
                  value={currentPinInput}
                  onChange={(e) => setCurrentPinInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '0.85rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  New Passcode *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new passcode..."
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '0.85rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Confirm New Passcode *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Confirm new passcode..."
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '0.85rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '0.85rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 22px',
                    borderRadius: '0.85rem',
                    border: 'none',
                    background: 'var(--accent)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Save Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
