export default function Hero({ onOpenResume }) {
  return (
    <main className="hero" id="home">
      <p className="eyebrow">Networking · Systems Infrastructure · Code</p>
      <h1>Robust networks make it resilient.</h1>
      <div className="hero-actions">
        <button
          className="button button-primary"
          onClick={() => onOpenResume('all')}
          type="button"
        >
          Explore resume
        </button>
        <p className="hero-caption">
          B.Tech Computer Science <span aria-hidden="true">·</span> Available
          for 2026 Opportunities
        </p>
      </div>
      <div className="contact-list" aria-label="Contact information">
        <a className="contact-chip" href="mailto:majidhussainmir239@gmail.com">
          <span aria-hidden="true">✉</span> majidhussainmir239@gmail.com
        </a>
        <a className="contact-chip" href="tel:+916006495081">
          <span aria-hidden="true">☎</span> (+91) 6006495081
        </a>
        <span className="contact-chip">
          <span aria-hidden="true">⌖</span> Magam, Budgam, J&amp;K, 193401
        </span>
      </div>
    </main>
  );
}
