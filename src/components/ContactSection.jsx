import { useScrollAnimation } from '../hooks';
import { ArrowRightIcon } from './Icons';

export default function ContactSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      id="contact"
      className="grid-bg"
      ref={sectionRef}
      style={{ position: 'relative', padding: '96px 0', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
        {/* CTA Card */}
        <div
          className="contact-animate"
          style={{
            position: 'relative',
            borderRadius: '3rem',
            padding: 'clamp(48px, 6vw, 96px)',
            textAlign: 'center',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            background: 'var(--bg-secondary)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-96px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '384px',
              height: '384px',
              borderRadius: '50%',
              pointerEvents: 'none',
              background:
                'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            }}
          />

          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '24px',
              background: 'var(--accent-bg)',
              color: 'var(--accent)',
            }}
          >
            Get in touch
          </span>

          <h2
            style={{
              position: 'relative',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              color: 'var(--text)',
            }}
          >
            Let's Work{' '}
            <em className="font-serif" style={{ fontStyle: 'italic' }}>
              Together
            </em>
          </h2>

          <p
            style={{
              position: 'relative',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '480px',
              margin: '0 auto 40px',
              color: 'var(--text-muted)',
            }}
          >
            Have an opportunity or want to collaborate? I'm currently open to new
            roles in networking, cybersecurity, and software development.
          </p>

          <a
            href="mailto:majidhussainmir239@gmail.com"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 40px',
              borderRadius: '1.25rem',
              fontSize: '1rem',
              fontWeight: 700,
              background: 'var(--text)',
              color: 'var(--bg)',
              boxShadow: 'var(--shadow-lg)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
          >
            Start a Conversation
            <ArrowRightIcon />
          </a>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: '64px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <strong
              style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: '4px',
                color: 'var(--text)',
              }}
            >
              Majid Hussain Mir
            </strong>
            <a
              href="mailto:majidhussainmir239@gmail.com"
              className="font-mono"
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                transition: 'color 0.2s ease',
                textDecoration: 'none',
              }}
            >
              majidhussainmir239@gmail.com
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '8px',
            }}
          >
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Majid Hussain Mir • All rights
              reserved.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a
                href="https://github.com/Majid-Hussain404"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/majid-hussain-mir-09a3352a4/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
