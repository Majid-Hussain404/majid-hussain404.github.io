import { useState, useEffect } from 'react';
import { useScrollAnimation, useAdminMode } from '../hooks';
import { PlusIcon, CloseIcon, GitHubIcon, FilterIcon, EyeIcon, EyeOffIcon } from './Icons';
import hiddenReposConfig from '../config/hiddenRepos.json';
import { getCentralHiddenRepoIds, saveCentralHiddenRepoIds } from '../lib/db';

function isRepoHidden(project, hiddenList) {
  if (!project || !hiddenList || !Array.isArray(hiddenList) || hiddenList.length === 0) return false;
  const pId = String(project.id || '').toLowerCase();
  const pTitle = String(project.title || '').toLowerCase();
  const pGithubTitle = `github-${pTitle}`;
  return hiddenList.some((item) => {
    const s = String(item).toLowerCase();
    return s === pId || s === pTitle || s === pGithubTitle;
  });
}

const DEFAULT_PROJECTS = [
  {
    id: 'NetPulse-Network-Monitoring-Dashboard',
    title: 'NetPulse-Network-Monitoring-Dashboard',
    subtitle: 'CSS / Python Project',
    description:
      'A real-time network monitoring dashboard built with Python, Flask, HTML, CSS, and JavaScript.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    textColor: '#ffffff',
    link: 'https://github.com/Majid-Hussain404/NetPulse-Network-Monitoring-Dashboard',
    tags: ['CSS', 'Python', 'Flask', 'JavaScript', 'Networking'],
    updatedAtFormatted: 'Updated Oct 9, 2026',
    isGitHub: true,
    isCustom: false,
  },
  {
    id: 'study-planner',
    title: 'study-planner',
    subtitle: 'TypeScript Project',
    description:
      'Interactive study planner and productivity application built with TypeScript and React.',
    gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    textColor: '#ffffff',
    link: 'https://github.com/Majid-Hussain404/study-planner',
    tags: ['TypeScript', 'React', 'Study Tools'],
    updatedAtFormatted: 'Updated Oct 8, 2026',
    isGitHub: true,
    isCustom: false,
  },
  {
    id: 'photo-portfolio',
    title: 'photo-portfolio',
    subtitle: 'TypeScript Project',
    description:
      'Creative photo portfolio builder and visual presentation app built with TypeScript.',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    textColor: '#ffffff',
    link: 'https://github.com/Majid-Hussain404/photo-portfolio',
    tags: ['TypeScript', 'Portfolio', 'UI/UX'],
    updatedAtFormatted: 'Updated Oct 9, 2026',
    isGitHub: true,
    isCustom: false,
  },
  {
    id: 'cloud-network-moniter',
    title: 'cloud-network-moniter',
    subtitle: 'Python Project',
    description:
      'Cloud network monitoring and traffic analysis utility developed in Python.',
    gradient: 'linear-gradient(135deg, #06b6d4, #0284c7)',
    textColor: '#ffffff',
    link: 'https://github.com/Majid-Hussain404/cloud-network-moniter',
    tags: ['Python', 'Cloud', 'Networking'],
    updatedAtFormatted: 'Updated Oct 8, 2026',
    isGitHub: true,
    isCustom: false,
  },
  {
    id: 'network-monitor',
    title: 'network-monitor',
    subtitle: 'Python Project',
    description:
      'Lightweight Python network monitoring script and socket analysis system.',
    gradient: 'linear-gradient(135deg, #a855f7, #7e22ce)',
    textColor: '#ffffff',
    link: 'https://github.com/Majid-Hussain404/network-monitor',
    tags: ['Python', 'Networking', 'Sockets'],
    updatedAtFormatted: 'Updated Oct 7, 2026',
    isGitHub: true,
    isCustom: false,
  },
  {
    id: 'majid404',
    title: 'majid404',
    subtitle: 'JavaScript Project',
    description:
      'Personal developer portfolio showcase & web application.',
    gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
    textColor: '#ffffff',
    link: 'https://github.com/Majid-Hussain404/majid404',
    tags: ['JavaScript', 'React', 'Vite', 'Portfolio'],
    updatedAtFormatted: 'Updated Oct 10, 2026',
    isGitHub: true,
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
  const { isAdmin, toggleAdmin } = useAdminMode();

  const [customProjects, setCustomProjects] = useState(() => {
    const saved = localStorage.getItem('majid_portfolio_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter((p) => p.isCustom);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [githubProjects, setGithubProjects] = useState([]);
  const [isFetchingGithub, setIsFetchingGithub] = useState(true);
  const [isLoadingVisibility, setIsLoadingVisibility] = useState(true);
  const [hiddenRepoIds, setHiddenRepoIds] = useState(() => {
    return hiddenReposConfig?.hiddenRepoIds || [];
  });

  useEffect(() => {
    async function syncCentralVisibility() {
      setIsLoadingVisibility(true);
      try {
        const dbIds = await getCentralHiddenRepoIds();
        if (dbIds && Array.isArray(dbIds)) {
          setHiddenRepoIds(dbIds);
        }
      } catch (err) {
        console.warn('Could not sync central database visibility:', err);
      } finally {
        setIsLoadingVisibility(false);
      }
    }
    syncCentralVisibility();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageReposModalOpen, setIsManageReposModalOpen] = useState(false);
  const [projectImage, setProjectImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    link: '',
    tags: '',
    gradient: PRESET_GRADIENTS[0].value,
  });

  useEffect(() => {
    localStorage.setItem('majid_portfolio_hidden_repos', JSON.stringify(hiddenRepoIds));
  }, [hiddenRepoIds]);

  const toggleRepoVisibility = async (idOrTitle) => {
    const target = String(idOrTitle).toLowerCase();
    const isCurrentlyHidden = isRepoHidden({ id: idOrTitle, title: idOrTitle }, hiddenRepoIds);
    let updated;
    if (isCurrentlyHidden) {
      updated = hiddenRepoIds.filter((item) => {
        const s = String(item).toLowerCase();
        return s !== target && s !== `github-${target}` && `github-${s}` !== target;
      });
    } else {
      updated = [...hiddenRepoIds, idOrTitle];
    }
    setHiddenRepoIds(updated);
    await saveCentralHiddenRepoIds(updated);
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return 'Updated recently';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Updated just now';
    if (diffHours < 24) return `Updated ${diffHours}h ago`;
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays}d ago`;
    return `Updated ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const fetchGitHubRepos = async () => {
    setIsFetchingGithub(true);
    try {
      const res = await fetch(
        'https://api.github.com/users/Majid-Hussain404/repos?sort=pushed&direction=desc'
      );
      if (res.ok) {
        const data = await res.json();
        const formatted = data
          .filter((repo) => !repo.fork && repo.name !== 'test')
          .map((repo, idx) => ({
            id: repo.name,
            title: repo.name,
            subtitle: repo.language ? `${repo.language} Project` : 'GitHub Project',
            description:
              repo.description ||
              `Public repository by @Majid-Hussain404 built with ${repo.language || 'modern tech'}.`,
            gradient: PRESET_GRADIENTS[idx % PRESET_GRADIENTS.length].value,
            link: repo.html_url,
            tags: [repo.language, ...(repo.topics || []), 'GitHub'].filter(Boolean),
            updatedAtFormatted: formatTimeAgo(repo.pushed_at || repo.updated_at),
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            isGitHub: true,
            isCustom: false,
          }));
        setGithubProjects(formatted);
      }
    } catch (err) {
      console.error('Error fetching GitHub repos:', err);
    } finally {
      setIsFetchingGithub(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  useEffect(() => {
    localStorage.setItem('majid_portfolio_projects', JSON.stringify(customProjects));
  }, [customProjects]);

  const allProjectsList = [
    ...customProjects,
    ...(githubProjects.length > 0 ? githubProjects : DEFAULT_PROJECTS),
  ];

  const displayProjects = (isLoadingVisibility && !isAdmin)
    ? []
    : isAdmin
    ? allProjectsList
    : allProjectsList.filter((p) => !isRepoHidden(p, hiddenRepoIds));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      image: projectImage || null,
      textColor: '#ffffff',
      link: formData.link.trim() || 'https://github.com/Majid-Hussain404',
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : ['Project'],
      updatedAtFormatted: 'Updated just now',
      isCustom: true,
    };

    setCustomProjects([newProj, ...customProjects]);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      link: '',
      tags: '',
      gradient: PRESET_GRADIENTS[0].value,
    });
    setProjectImage(null);
    setIsModalOpen(false);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to remove this custom project?')) {
      setCustomProjects(customProjects.filter((p) => p.id !== id));
    }
  };

  const handleUploadButtonClick = () => {
    if (isAdmin) {
      setIsModalOpen(true);
    } else {
      toggleAdmin();
    }
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
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
                  background: 'var(--accent-bg)',
                  color: 'var(--accent)',
                }}
              >
                Work Gallery
              </span>
              <button
                onClick={fetchGitHubRepos}
                disabled={isFetchingGithub}
                title="Fetch live updates from GitHub"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: isFetchingGithub ? '#f59e0b' : '#22c55e',
                    boxShadow: isFetchingGithub
                      ? '0 0 6px rgba(245, 158, 11, 0.8)'
                      : '0 0 6px rgba(34, 197, 94, 0.8)',
                  }}
                />
                {isFetchingGithub ? 'Syncing GitHub...' : 'Live GitHub Auto-Sync'}
              </button>
            </div>
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
              A live showcase of my public GitHub repositories and software projects, with real-time commit activity updates.
            </p>
          </div>

          {/* Top Right Header Controls (Owner Only) */}
          {isAdmin && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsManageReposModalOpen(true)}
                title="Select which repositories to display"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '1rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  background: 'var(--bg-card)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.2s ease',
                }}
              >
                <FilterIcon />
                Select Repos
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                title="Upload new custom project"
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
            </div>
          )}
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
            marginTop: '48px',
          }}
        >
            {displayProjects.map((project, idx) => {
            const isHidden = isRepoHidden(project, hiddenRepoIds);
            return (
              <div
                className="card-animate"
                key={project.id || project.title}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  border: isHidden ? '2px dashed #ef4444' : '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  boxShadow: 'var(--shadow)',
                  position: 'relative',
                  opacity: isHidden ? 0.75 : 1,
                  transition: 'all 0.4s ease, transform 0.4s ease',
                  transitionDelay: `${idx * 0.08}s`,
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
                {/* Top Left Live Update Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 10,
                    background: 'rgba(0,0,0,0.65)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: project.isGitHub ? '#38bdf8' : '#22c55e',
                      boxShadow: project.isGitHub ? '0 0 6px #38bdf8' : '0 0 6px #22c55e',
                    }}
                  />
                  {project.updatedAtFormatted || 'Updated recently'}
                </div>

                {/* Owner Controls: Visibility Toggle + Delete */}
                {isAdmin && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, display: 'flex', gap: '6px' }}>
                    <button
                      title={isHidden ? 'Hidden from public (Click to show)' : 'Visible on public (Click to hide)'}
                      onClick={() => toggleRepoVisibility(project.id)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isHidden ? 'rgba(239, 68, 68, 0.85)' : 'rgba(0,0,0,0.65)',
                        color: '#fff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {isHidden ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>

                    {project.isCustom && (
                      <button
                        title="Remove custom project"
                        onClick={() => handleDeleteProject(project.id)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(0,0,0,0.65)',
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
                  </div>
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
                  background: project.image
                    ? `url(${project.image}) center/cover no-repeat`
                    : project.gradient,
                  color: project.textColor || '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                {project.image && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.45)',
                      backdropFilter: 'blur(1px)',
                      zIndex: 1,
                    }}
                  />
                )}
                <span
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textShadow: project.image ? '0 2px 4px rgba(0,0,0,0.7)' : '0 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {project.title}
                </span>
                <span
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    opacity: 0.9,
                    textShadow: project.image ? '0 1px 3px rgba(0,0,0,0.7)' : 'none',
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
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
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
                  <GitHubIcon />
                  View on GitHub
                </a>
              </div>
            </div>
          );
        })}
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
            background: 'rgba(0,0,0,0.65)',
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
              maxWidth: '560px',
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

              {/* Cover Image Upload Option */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Project Cover Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--text)',
                  }}
                />
                {projectImage && (
                  <div style={{ marginTop: '8px', position: 'relative', width: '100%', height: '120px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img src={projectImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => setProjectImage(null)}
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        background: 'rgba(0,0,0,0.7)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {!projectImage && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                    Or Choose Banner Gradient Theme
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
              )}

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

      {/* Selective Repositories Manager Modal */}
      {isManageReposModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsManageReposModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              borderRadius: '2rem',
              padding: '32px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              color: 'var(--text)',
              position: 'relative',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
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
                  <FilterIcon size={20} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>
                  Select Repositories to Feature
                </h3>
              </div>
              <button
                onClick={() => setIsManageReposModalOpen(false)}
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

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px', marginTop: 0 }}>
              Toggle which GitHub repositories or custom projects are visible to visitors on your portfolio website.
            </p>

            {/* Quick Bulk Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => setHiddenRepoIds([])}
                style={{
                  padding: '6px 14px',
                  borderRadius: '0.6rem',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--accent)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Show All
              </button>
              <button
                type="button"
                onClick={() => setHiddenRepoIds(allProjectsList.map((p) => p.id))}
                style={{
                  padding: '6px 14px',
                  borderRadius: '0.6rem',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Hide All
              </button>
            </div>

            {/* Repositories Checkbox List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxHeight: '340px',
                overflowY: 'auto',
                paddingRight: '6px',
                marginBottom: '20px',
              }}
            >
              {allProjectsList.map((repo) => {
                const isVisible = !isRepoHidden(repo, hiddenRepoIds);
                return (
                  <div
                    key={repo.id}
                    onClick={() => toggleRepoVisibility(repo.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '1rem',
                      background: 'var(--bg-secondary)',
                      border: isVisible ? '1px solid var(--accent)' : '1px solid var(--border)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => {}}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--accent)', cursor: 'pointer' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
                          {repo.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {repo.subtitle} • {repo.updatedAtFormatted || 'Updated recently'}
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        background: isVisible ? 'var(--accent-bg)' : 'rgba(239, 68, 68, 0.15)',
                        color: isVisible ? 'var(--accent)' : '#ef4444',
                      }}
                    >
                      {isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  const configData = {
                    hiddenRepoIds: hiddenRepoIds,
                    customProjects: customProjects,
                  };
                  const jsonStr = JSON.stringify(configData, null, 2);
                  const blob = new Blob([jsonStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'hiddenRepos.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                title="Download hiddenRepos.json file to save permanently for all devices"
                style={{
                  padding: '8px 16px',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--accent)',
                  background: 'var(--accent-bg)',
                  color: 'var(--accent)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                📥 Save & Export hiddenRepos.json
              </button>

              <button
                type="button"
                onClick={() => setIsManageReposModalOpen(false)}
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
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
