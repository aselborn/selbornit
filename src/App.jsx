import "./App.css";
import profileImage from "./img/Anders Selborn.jpg";

const SKILL_GROUPS = [
  {
    title: "GIS & geodata",
    items: [
      "ArcGIS Pro / ArcPy",
      "QGIS",
      "Geodatabaser / SQL Server",
      "Lantmäteriets geodata och API:er",
      "WMS/WFS och andra geodatatjänster",
      "Spatial analys och automatisering",
    ],
  },
  {
    title: "Backend & integration",
    items: [
      "Python",
      "Node.js",
      "REST API / API-integrationer",
      "JWT / autentisering",
      "Databaser och SQL",
      "Integration mellan externa system och tjänster",
    ],
  },
  {
    title: "Webbutveckling",
    items: [
      "JavaScript / TypeScript",
      "React",
      "Moderna frontendlösningar",
      "API-drivna webbapplikationer",
      "Apache / Linux",
      "Git / Azure DevOps",
    ],
  },
];

const HIGHLIGHTS = [
  "25+ års erfarenhet",
  "Arbetar både tekniskt och verksamhetsnära",
  "Hanterar hela kedjan: data → backend → API → frontend → GIS",
  "Van vid att snabbt sätta sig in i befintliga system",
  "Stark problemlösare",
  "Självgående, driver saker från idé till färdig lösning",
];

const STATS = [
  { value: "25+", label: "år i branschen" },
  { value: "3", label: "specialistområden" },
  { value: "1", label: "kontaktperson – alltid direkt" },
];

function App() {
  return (
    <div className="profile">
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="nav-logo">
            AS<span>.</span>
          </a>
          <nav className="nav-links">
            <a href="#om-mig">Om mig</a>
            <a href="#kompetens">Kompetens</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
          <a href="#kontakt" className="button button-primary nav-cta">
            Kontakta mig
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="availability-badge">
                <span className="pulse-dot"></span>
                Tillgänglig för nya uppdrag
              </div>

              <div className="eyebrow">IT-KONSULT · GÖTEBORG</div>

              <h1>Anders Selborn</h1>
              <p className="role">Systemarkitekt &amp; IT-konsult</p>

              <p className="bio">
                Erfaren systemutvecklare med över 25 år inom IT, med spets
                inom utveckling, GIS och integrationer. Lösningsorienterad,
                självgående och van att snabbt förstå både teknik och
                verksamhetsbehov. Gillar komplexa problem, tar ansvar från idé
                till fungerande lösning och skapar gärna konkret nytta för
                kunden.
              </p>

              <div className="hero-actions">
                <a href="#kontakt" className="button button-primary">
                  Kontakta mig <span>→</span>
                </a>
                <a href="#kompetens" className="button button-secondary">
                  Se kompetenser
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="avatar-ring">
                <img
                  className="avatar"
                  src={profileImage}
                  alt="Anders Selborn"
                />
              </div>
            </div>
          </div>

          <div className="container stats-row">
            {STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="om-mig" className="section highlights">
          <div className="container">
            <div className="eyebrow">OM MIG</div>
            <h2>Varför jobba med mig</h2>

            <div className="highlight-grid">
              {HIGHLIGHTS.map((item, index) => (
                <div className="highlight-card" key={item}>
                  <span className="highlight-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kompetens" className="section skills">
          <div className="container">
            <div className="eyebrow">KOMPETENS</div>
            <h2>Vad jag jobbar med</h2>

            <div className="skill-groups">
              {SKILL_GROUPS.map((group) => (
                <article className="skill-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="contact">
          <div className="container contact-card">
            <div className="eyebrow">KONTAKT</div>

            <h2>
              Har du ett problem
              <br />
              som behöver lösas?
            </h2>

            <p>Hör av dig så tar vi ett förutsättningslöst samtal.</p>

            <a
              href="mailto:aselborn@gmail.com"
              className="button button-primary"
            >
              aselborn@gmail.com <span>→</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>© 2026 Anders Selborn</div>
          <div>Göteborg · Sverige</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
