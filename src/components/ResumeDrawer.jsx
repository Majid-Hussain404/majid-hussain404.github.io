import { useEffect, useRef } from 'react';
import resumePdf from './My resume .pdf';

const sectionTitles = {
  objective: 'Majid Hussain Mir — Career Objective',
  capabilities: 'Majid Hussain Mir — Capabilities',
  education: 'Majid Hussain Mir — Education',
  contact: 'Majid Hussain Mir — Contact',
  all: 'Majid Hussain Mir — Complete Dossier',
};

const networkingSkills = [
  'Computer Networking & Network Fundamentals',
  'TCP/IP, OSI Model & Network Protocols',
  'IP Addressing, Subnetting & Routing Fundamentals',
  'LAN, WAN, DNS, DHCP & Network Troubleshooting',
  'Basic Network Security & Network Monitoring',
];

const softwareSkills = [
  'C, C++ & Python Programming',
  'Java Programming & Object-Oriented Programming (OOP)',
  'Data Structures & Algorithms',
  'Database Management Systems (DBMS) & SQL',
  'Operating Systems & Computer Architecture',
  'Machine Learning Fundamentals',
  'Software Engineering & SDLC',
  'Web Technologies: HTML, CSS & JavaScript',
];

function ObjectiveSection() {
  return (
    <section className="drawer-section" id="drawer-objective">
      <h3 className="drawer-section-title">01 / Career Objective</h3>
      <p className="drawer-text">
        Motivated B.Tech CSE student seeking an entry-level opportunity in
        Computer Networking and IT infrastructure. Eager to apply my knowledge
        of networking, programming, troubleshooting, and problem-solving while
        gaining practical industry experience. A quick learner with a strong
        work ethic, committed to continuously developing technical skills and
        contributing effectively to organizational goals.
      </p>
    </section>
  );
}

function SkillList({ title, skills }) {
  return (
    <div className="skill-group">
      <h4>{title}</h4>
      <ul className="skill-list">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

function CapabilitiesSection() {
  return (
    <section className="drawer-section" id="drawer-capabilities">
      <h3 className="drawer-section-title">
        02 / Technical &amp; Professional Skills
      </h3>
      <div className="skills-grid">
        <SkillList title="Networking & Infrastructure" skills={networkingSkills} />
        <SkillList title="Software, Systems & Web" skills={softwareSkills} />
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="drawer-section" id="drawer-education">
      <h3 className="drawer-section-title">03 / Education History</h3>
      <article className="education-entry">
        <span className="education-date">30/01/2020 — 01/06/2022</span>
        <h4>Intermediate (10+2)</h4>
        <p>Government Boys Higher Secondary School, Magam</p>
        <p className="education-detail">
          <strong>Core:</strong> English, Physics, Chemistry, Mathematics,
          Computer Programming
        </p>
      </article>
      <article className="education-entry">
        <span className="education-date">01/01/2019 — 10/01/2020</span>
        <h4>10th Grade Examination</h4>
        <p>Green View Public High School, Magam</p>
      </article>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="drawer-section" id="drawer-contact">
      <h3 className="drawer-section-title">04 / Get in Touch</h3>
      <p className="drawer-text contact-intro">
        Currently open for opportunities in Computer Networking, IT Systems,
        and Software Engineering. Feel free to connect directly via email,
        phone, or address.
      </p>
      <dl className="contact-details">
        <div>
          <dt>Email</dt>
          <dd>
            <a href="mailto:majidhussainmir239@gmail.com">
              majidhussainmir239@gmail.com
            </a>
          </dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            <a href="tel:+916006495081">(+91) 6006495081</a>
          </dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Magam, Budgam, Jammu &amp; Kashmir, 193401</dd>
        </div>
      </dl>
    </section>
  );
}

const sections = [
  { id: 'objective', Component: ObjectiveSection },
  { id: 'capabilities', Component: CapabilitiesSection },
  { id: 'education', Component: EducationSection },
  { id: 'contact', Component: ContactSection },
];

export default function ResumeDrawer({ section, onClose }) {
  const drawerBodyRef = useRef(null);
  const isOpen = section !== null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    drawerBodyRef.current?.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      aria-hidden={!isOpen}
      aria-labelledby="drawer-title"
      aria-modal={isOpen}
      className={`drawer-backdrop${isOpen ? ' is-open' : ''}`}
      inert={!isOpen}
      hidden={!isOpen}
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div className="drawer">
        <div className="drawer-header">
          <h2 className="drawer-title" id="drawer-title">
            {sectionTitles[section] ?? sectionTitles.all}
          </h2>
          <div className="drawer-header-actions">
            <a
              className="resume-download"
              download="Majid-Hussain-Mir-Resume.pdf"
              href={resumePdf}
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="16"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  d="M8 1.75v8.5m0 0 3-3m-3 3-3-3M2.25 10.5v2.25c0 .55.45 1 1 1h9.5c.55 0 1-.45 1-1V10.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
              Download resume
            </a>
            <button
              aria-label="Close resume"
              className="drawer-close"
              onClick={onClose}
              type="button"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="drawer-body" ref={drawerBodyRef}>
          {sections.map(({ id, Component }) =>
            section === 'all' || section === id ? (
              <Component key={id} />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
