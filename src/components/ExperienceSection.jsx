import { useScrollAnimation } from '../hooks';

const experiences = [
  {
    title: 'Bachelor of Technology (B.Tech), CSE',
    company: 'Central University of Kashmir',
    location: 'Ganderbal, J&K, India',
    period: 'Sept 2023 — July 2027 (Expected)',
    description:
      'Focused on computer networking, cybersecurity fundamentals, and full-stack software development. Building expertise in TCP/IP protocols, subnetting, network security, and modern web technologies.',
    tags: [
      'Networking',
      'Cybersecurity',
      'TCP/IP',
      'Subnetting',
      'Full-Stack',
      'Web Dev',
    ],
  },
  {
    title: 'Intermediate (10+2)',
    company: 'Government Boys Higher Secondary School',
    location: 'Magam, J&K, India',
    period: '30/01/2020 — 01/06/2022',
    description:
      'Core subjects: English, Physics, Chemistry, Mathematics, Computer Programming.',
    tags: ['Physics', 'Chemistry', 'Mathematics', 'Computer Programming'],
  },
  {
    title: '10th Grade Examination',
    company: 'Green View Public High School',
    location: 'Magam, J&K, India',
    period: '01/01/2019 — 10/01/2020',
    description:
      'Completed 10th grade matriculation focusing on foundational science, mathematics, and general studies.',
    tags: ['Science', 'Mathematics', 'Academics'],
  },
];

export default function ExperienceSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      id="experience"
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
            Journey
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
            Education &{' '}
            <em className="font-serif" style={{ fontStyle: 'italic' }}>
              Experience
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
            My journey in technology, building impact one step at a time.
          </p>
        </div>

        {/* Experience Cards */}
        <div style={{ maxWidth: '720px', margin: '48px auto 0' }}>
          {experiences.map((exp, idx) => (
            <div
              className="exp-animate"
              key={exp.title}
              style={{
                position: 'relative',
                borderRadius: '2rem',
                padding: 'clamp(24px, 4vw, 40px)',
                marginBottom: '24px',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                transition: 'all 0.3s ease, box-shadow 0.3s ease',
                transitionDelay: `${idx * 0.12}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Hover gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '2rem',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                  background:
                    'linear-gradient(135deg, rgba(99,102,241,0.04) 0%, transparent 60%)',
                }}
              />

              {/* Header */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      marginBottom: '4px',
                      color: 'var(--text)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {exp.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {exp.company}
                    <span
                      style={{
                        margin: '0 8px',
                        color: 'var(--text-muted)',
                      }}
                    >
                      •
                    </span>
                    {exp.location}
                  </div>
                </div>
                <div
                  className="font-mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border)',
                    fontSize: '0.78rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    background: 'var(--bg-card)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {exp.period}
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  position: 'relative',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                  color: 'var(--text-muted)',
                }}
              >
                {exp.description}
              </p>

              {/* Tags */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: 'var(--tag-bg)',
                      color: 'var(--tag-text)',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
