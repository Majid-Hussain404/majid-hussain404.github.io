const navigationItems = [
  { label: 'Objective', section: 'objective' },
  { label: 'Capabilities', section: 'capabilities' },
  { label: 'Education', section: 'education' },
];

export default function Header({ onOpenSection }) {
  return (
    <header className="site-header">
      <a className="site-brand" href="#home">
        Majid Hussain Mir
      </a>
      <nav className="site-nav" aria-label="Resume sections">
        {navigationItems.map(({ label, section }) => (
          <button
            className="nav-link"
            key={section}
            onClick={() => onOpenSection(section)}
            type="button"
          >
            {label}
          </button>
        ))}
        <button
          className="button button-small"
          onClick={() => onOpenSection('contact')}
          type="button"
        >
          Contact
        </button>
      </nav>
    </header>
  );
}
