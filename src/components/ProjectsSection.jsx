import { useState, useEffect } from 'react';
import { useScrollAnimation, useAdminMode } from '../hooks';
import { PlusIcon, CloseIcon } from './Icons';

const DEFAULT_PROJECTS = [
  {
    id: 'default-1',
    title: 'Network Monitor',
    subtitle: 'Real-Time Dashboard',
    description:
      'A real-time network monitoring dashboard that tracks bandwidth usage, latency, and device health across local and wide area networks. Built with live data visualizations.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    textColor: '#ffffff',
    link: 'https://github.com/Majid-Hussain404',
    tags: ['Networking', 'Real-Time', 'Dashboard'],
    isCustom: false,
  },
  {
    id: 'default-2',
    title: 'SecureVault',
    subtitle: 'Password Manager',
    description:
      'A secure, encrypted password manager with AES-256 encryption, auto-fill capabilities, and cross-platform sync. Designed with zero-knowledge architecture.',
    gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    textColor: '#ffffff',
    link: 'https://github.com/Majid-Hussain404',
    tags: ['Cybersecurity', 'AES-256', 'Crypto'],
    isCustom: false,
  },
  {
    id: 'default-3',
    title: 'DevFolio',
    subtitle: 'Portfolio Builder',
    description:
      'A modern portfolio website template for developers featuring dark/light themes, animated sections, and responsive design. Built with React and vanilla CSS.',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    textColor: '#ffffff',
    link: 'https://github.com/Majid-Hussain404',
    tags: ['React', 'CSS3', 'Portfolio'],
    isCustom: false,
  },
];

const PRESET_GRADIENTS = [
  { id: 'emerald', label: 'Emerald', value: 'linear-gradient(135deg, #10b981, #059669)' },
  { id: 'indigo', label: 'Indigo', value: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
  { id: 'amber', label: 'Amber', value: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { id: 'rose', label: 'Rose', value: 'linear-gradient(135deg, #f43f5e, #e11d48)' },
  { id: 'cyan', label: 'Cyan', value: 'linear-gradient(135deg, #06b6d4, #0284c7)' },
  { id: 'purple', label: 'Purple', value: 'linear-gradient(135deg, #a855f7, #7e22ce)' },
];

export default function ProjectsSection() {
  const sectionRef = useScrollAnimation();
  const { isAdmin } = useAdminMode();
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('majid_portfolio_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PROJECTS;
      }
    }
    return DEFAULT_PROJECTS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    link: '',
    tags: '',
    gradient: PRESET_GRADIENTS[0].value,
  });

  useEffect(() => {
    localStorage.setItem('majid_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    const newProj = {
      id: `custom-${Date.now()}`,
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim() || 'Custom Project',
      description: formData.description.trim(),
      gradient: formData.gradient,
      textColor: '#ffffff',
      link: formData.link.trim() || 'https://github.com/Majid-Hussain404',
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : ['Project'],
      isCustom: true,
    };

    setProjects([newProj, ...projects]);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      link: '',
      tags: '',
      gradient: PRESET_GRADIENTS[0].value,
    });
    setIsModalOpen(false);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <section
      id="projects"
      className="grid-bg"
      ref={sectionRef}
      style={{ position: 'relative', padding: '96px 0' }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
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
              Work Gallery
            </span>
            <h2
              className="section-animate"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '16px',
                color: 'var(--text)',
                transitionDelay: '0.1s',
              }}
            >
              Selected{' '}
              <em className="font-serif" style={{ fontStyle: 'italic' }}>
                Projects
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
              A showcase of my work, blending technical excellence with elegant design.
            </p>
          </div>

          {/* Upload / Add Project Button - Only for Owner */}
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '1rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                background: 'var(--accent)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <PlusIcon />
              Upload Project
            </button>
          )}
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '32px',
            marginTop: '48px',
          }}
        >
          {projects.map((project, idx) => (
            <div
              className="card-animate"
              key={project.id || project.title}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '2rem',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow)',
                position: 'relative',
                transition: 'all 0.4s ease, transform 0.4s ease',
                transitionDelay: `${idx * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
            >
              {/* Delete button if custom and Admin */}
              {isAdmin && project.isCustom && (
                <button
                  title="Remove project"
                  onClick={() => handleDeleteProject(project.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 10,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.5)',
                    color: '#fff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <CloseIcon size={16} />
                </button>
              )}

              {/* Card Header Banner */}
              <div
                style={{
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: project.gradient,
                  color: project.textColor || '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.title}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    opacity: 0.85,
                  }}
                >
                  {project.subtitle}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '16px',
                    }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '3px 10px',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          background: 'var(--tag-bg)',
                          color: 'var(--tag-text)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div style={{ padding: '0 20px 20px' }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '0.85rem',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: 'var(--text)',
                    color: 'var(--bg)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                  }}
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Project Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '540px',
              borderRadius: '2rem',
              padding: '32px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              color: 'var(--text)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
                Upload New Project
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
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

            {/* Form */}
            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Packet Sniffer CLI"
                  value={formData.title}
                  onChange={handleInputChange}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  name="subtitle"
                  placeholder="e.g. Real-Time Network Analysis Tool"
                  value={formData.subtitle}
                  onChange={handleInputChange}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="Describe your project, key features, and technology stack..."
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '0.85rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Project URL / GitHub Link
                </label>
                <input
                  type="url"
                  name="link"
                  placeholder="https://github.com/Majid-Hussain404/my-repo"
                  value={formData.link}
                  onChange={handleInputChange}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Tech Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="Python, Scapy, Socket, Flask"
                  value={formData.tags}
                  onChange={handleInputChange}
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  Banner Gradient Theme
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {PRESET_GRADIENTS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, gradient: preset.value }))}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '0.75rem',
                        border:
                          formData.gradient === preset.value
                            ? '2px solid var(--text)'
                            : '1px solid var(--border)',
                        background: preset.value,
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '0.85rem',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '0.85rem',
                    border: 'none',
                    background: 'var(--accent)',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
