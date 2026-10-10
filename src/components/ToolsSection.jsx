import { useScrollAnimation } from '../hooks';
import {
  JavaScriptIcon,
  PythonIcon,
  HtmlIcon,
  CssIcon,
  CppIcon,
  JavaIcon,
  GitIcon,
  GithubIconAlt,
  NetworkIcon,
  DatabaseIcon,
  VsCodeIcon,
  SecurityIcon,
  TerminalIcon,
} from './Icons';

const row1 = [
  { name: 'Python', icon: <PythonIcon /> },
  { name: 'C/C++', icon: <CppIcon /> },
  { name: 'Java', icon: <JavaIcon /> },
  { name: 'JavaScript', icon: <JavaScriptIcon /> },
  { name: 'HTML5', icon: <HtmlIcon /> },
  { name: 'CSS3', icon: <CssIcon /> },
  { name: 'Networking', icon: <NetworkIcon /> },
  { name: 'TCP/IP', icon: <NetworkIcon /> },
];

const row2 = [
  { name: 'Git', icon: <GitIcon /> },
  { name: 'GitHub', icon: <GithubIconAlt /> },
  { name: 'SQL', icon: <DatabaseIcon /> },
  { name: 'VS Code', icon: <VsCodeIcon /> },
  { name: 'Cybersecurity', icon: <SecurityIcon /> },
  { name: 'Linux CLI', icon: <TerminalIcon /> },
  { name: 'DSA', icon: <TerminalIcon /> },
  { name: 'Machine Learning', icon: <PythonIcon /> },
];

function TechPill({ name, icon }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '9999px',
        border: '1px solid var(--border)',
        whiteSpace: 'nowrap',
        fontSize: '0.82rem',
        fontWeight: 500,
        flexShrink: 0,
        background: 'var(--bg-card)',
        color: 'var(--text)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {icon}
      <span>{name}</span>
    </div>
  );
}

export default function ToolsSection() {
  const sectionRef = useScrollAnimation();

  // Duplicate items for seamless loop
  const row1Items = [...row1, ...row1];
  const row2Items = [...row2, ...row2];

  return (
    <section
      id="tools"
      className="grid-bg"
      ref={sectionRef}
      style={{ position: 'relative', padding: '96px 0' }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header */}
        <div>
          <span
            className="section-label-animate"
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              background: 'var(--accent-bg)',
              color: 'var(--accent)',
            }}
          >
            Tech Stack
          </span>
          <h2
            className="section-animate"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '24px',
              color: 'var(--text)',
              transitionDelay: '0.1s',
            }}
          >
            Tools &amp;{' '}
            <em className="font-serif" style={{ fontStyle: 'italic' }}>
              Technologies
            </em>
          </h2>
          <p
            className="section-animate"
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '540px',
              color: 'var(--text-muted)',
              transitionDelay: '0.2s',
            }}
          >
            The technologies I work with to build fast, scalable, and secure
            applications.
          </p>
        </div>

        {/* Marquee Container */}
        <div
          className="section-animate"
          style={{
            position: 'relative',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            marginTop: '40px',
          }}
        >
          {/* Left fade */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '80px',
              zIndex: 10,
              pointerEvents: 'none',
              background: 'linear-gradient(to right, var(--bg), transparent)',
            }}
          />
          {/* Right fade */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '80px',
              zIndex: 10,
              pointerEvents: 'none',
              background: 'linear-gradient(to left, var(--bg), transparent)',
            }}
          />

          {/* Row 1 - Left scroll */}
          <div style={{ overflow: 'hidden', padding: '6px 0' }}>
            <div
              className="animate-marquee"
              style={{ display: 'flex', gap: '12px', width: 'max-content' }}
            >
              {row1Items.map((tech, i) => (
                <TechPill key={`${tech.name}-${i}`} {...tech} />
              ))}
            </div>
          </div>

          {/* Row 2 - Right scroll */}
          <div style={{ overflow: 'hidden', padding: '6px 0' }}>
            <div
              className="animate-marquee-reverse"
              style={{ display: 'flex', gap: '12px', width: 'max-content' }}
            >
              {row2Items.map((tech, i) => (
                <TechPill key={`${tech.name}-${i}`} {...tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
