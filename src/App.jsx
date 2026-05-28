import { useState, useEffect, useRef } from "react";

const data = {
  name: "Taliesin Yip Hoi-Lee",
  tagline: "Full Stack Developer & Engineering Student",
  email: "taliesinyip@gmail.com",
  phone: "416-553-0291",
  location: "Ontario, Canada",
  about:
    "Engineering student at Western University with hands-on experience building full-stack web applications. I bridge the gap between technical execution and strategic thinking — from PHP backends to React frontends, from sponsorship outreach to leading project teams.",
  experience: [
    {
      company: "Western Undergraduate Engineering Society",
      role: "Web Tech Commissioner",
      period: "2026 – Present",
      bullets: [
        "Maintains the UES website and online store",
        "Coordinates with board members to keep content current and relevant",
      ],
    },
    {
      company: "Riipen Labs",
      role: "Project Lead Intern",
      period: "2026",
      bullets: [
        "Led a team of 5 students to deliver strategic business growth solutions",
        "Formulated data-driven recommendations focused on customer acquisition and lead generation",
      ],
    },
    {
      company: "Digitera",
      role: "Full Stack PHP Developer (Co-op)",
      period: "2024 – 2025",
      bullets: [
        "Built and maintained web applications using PHP, MySQL, HTML, CSS, and JavaScript",
        "Identified and resolved full-stack bugs with peer and supervisor feedback",
      ],
    },
  ],
  activities: [
    {
      org: "Western Developers Society",
      role: "Developer",
      period: "2025 – Present",
      desc: "Building websites with React & PostgreSQL for real clients, collaborating to meet deadlines.",
    },
    {
      org: "Canadian Young Investors Society",
      role: "VP of Technology",
      period: "2025 – Present",
      desc: "Maintaining the org's website, forms, and databases; managing tech onboarding via Slack & Google Workspace.",
    },
    {
      org: "Western Engineering Autopilot Club",
      role: "Sponsorship Director",
      period: "2025 – Present",
      desc: "Outreaching to automotive companies to secure sponsorships and supporting club operations.",
    },
    {
      org: "World in Focus",
      role: "Research Coordinator / Web Developer",
      period: "2023 – 2025",
      desc: "Researched ophthalmology topics, wrote newsletters, and maintained the organization's website.",
    },
  ],
  skills: ["React", "PHP", "MySQL", "PostgreSQL", "JavaScript", "HTML/CSS", "Python", "Git", "Slack", "Google Workspace"],
  education: [
    { school: "Western University", degree: "Bachelor of Engineering", period: "2025 – 2029", location: "London, ON" },
    { school: "Richmond Hill High School", degree: "Ontario Secondary School Diploma (OSSD)", period: "2021 – 2025", location: "Richmond Hill, ON" },
  ],
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setBig(!!e.target.closest("a, button, .hoverable"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <div style={{
      position: "fixed", left: pos.x, top: pos.y, pointerEvents: "none", zIndex: 9999,
      width: big ? 40 : 12, height: big ? 40 : 12,
      background: big ? "transparent" : "#d4a853",
      border: big ? "1.5px solid #d4a853" : "none",
      borderRadius: "50%",
      transform: "translate(-50%,-50%)",
      transition: "width 0.2s, height 0.2s, background 0.2s",
      mixBlendMode: "difference",
    }} />
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = ["home", "about", "experience", "activities", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0d0d0d", color: "#e8e0d0", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #d4a853; border-radius: 2px; }
        a { color: inherit; text-decoration: none; }
        .gold { color: #d4a853; }
        .mono { font-family: 'DM Mono', monospace; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .nav-link { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #888; transition: color 0.3s; cursor: none; }
        .nav-link:hover, .nav-link.active { color: #d4a853; }
        .skill-tag { display: inline-block; border: 1px solid #2a2a2a; padding: 6px 14px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; color: #888; transition: all 0.3s; cursor: default; }
        .skill-tag:hover { border-color: #d4a853; color: #d4a853; background: rgba(212,168,83,0.05); }
        .exp-card { border-left: 1px solid #2a2a2a; padding-left: 28px; position: relative; transition: border-color 0.3s; }
        .exp-card::before { content: ''; position: absolute; left: -4px; top: 6px; width: 7px; height: 7px; border-radius: 50%; background: #2a2a2a; transition: background 0.3s; }
        .exp-card:hover { border-color: #d4a853; }
        .exp-card:hover::before { background: #d4a853; }
        .section-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #d4a853; margin-bottom: 16px; }
        .divider { height: 1px; background: linear-gradient(90deg, #2a2a2a, transparent); margin: 60px 0; }
        .contact-link { font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 0.1em; color: #888; transition: color 0.3s; display: flex; align-items: center; gap: 12px; }
        .contact-link:hover { color: #d4a853; }
        .hamburger { display: none; }
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>

      <Cursor />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(180deg,#0d0d0d 60%,transparent)", borderBottom: "1px solid #1a1a1a" }}>
        <button onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: "18px", color: "#e8e0d0", letterSpacing: "0.05em" }}>
          T<span className="gold">.</span>YHL
        </button>
        <div className="desktop-nav" style={{ display: "flex", gap: 36 }}>
          {sections.filter(s => s !== "home").map(s => (
            <button key={s} className={`nav-link${activeSection === s ? " active" : ""}`} style={{ background: "none", border: "none" }} onClick={() => scrollTo(s)}>{s}</button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "none", color: "#d4a853", fontSize: 22 }}>☰</button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "#0d0d0d", zIndex: 90, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
          {sections.map(s => (
            <button key={s} className="nav-link" style={{ background: "none", border: "none", fontSize: 14 }} onClick={() => scrollTo(s)}>{s}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
        {/* Background geometric */}
        <div style={{ position: "absolute", right: "-10%", top: "15%", width: 500, height: 500, border: "1px solid #1a1a1a", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "5%", top: "30%", width: 280, height: 280, border: "1px solid #1e1a10", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "40%", bottom: "10%", width: 160, height: 160, border: "1px solid #1a1a1a", transform: "rotate(45deg)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, position: "relative" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#d4a853", marginBottom: 32, opacity: 0, animation: "fadeUp 0.8s ease 0.2s forwards" }}>
            Engineering Student · Full Stack Developer
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(54px, 9vw, 110px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "#e8e0d0", opacity: 0, animation: "fadeUp 0.8s ease 0.4s forwards" }}>
            Taliesin<br /><em style={{ fontStyle: "italic", color: "#a89060" }}>Yip Hoi-Lee</em>
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(16px, 2vw, 22px)", color: "#6a6055", maxWidth: 520, marginTop: 36, lineHeight: 1.7, opacity: 0, animation: "fadeUp 0.8s ease 0.6s forwards" }}>
            Building thoughtful digital products at the intersection of engineering and strategy.
          </p>
          <div style={{ display: "flex", gap: 24, marginTop: 52, opacity: 0, animation: "fadeUp 0.8s ease 0.8s forwards" }}>
            <button onClick={() => scrollTo("experience")} className="hoverable" style={{ cursor: "none", background: "#d4a853", color: "#0d0d0d", border: "none", padding: "14px 32px", fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s" }}
              onMouseEnter={e => { e.target.style.background = "#e8c070"; }}
              onMouseLeave={e => { e.target.style.background = "#d4a853"; }}>
              View Work
            </button>
            <button onClick={() => scrollTo("contact")} className="hoverable" style={{ cursor: "none", background: "transparent", color: "#888", border: "1px solid #2a2a2a", padding: "14px 32px", fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s" }}
              onMouseEnter={e => { e.target.style.borderColor = "#d4a853"; e.target.style.color = "#d4a853"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#2a2a2a"; e.target.style.color = "#888"; }}>
              Contact
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: 48, display: "flex", alignItems: "center", gap: 16, opacity: 0, animation: "fadeUp 0.8s ease 1.2s forwards" }}>
          <div style={{ width: 40, height: 1, background: "#2a2a2a" }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#3a3a3a" }}>Scroll</span>
        </div>

        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        `}</style>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px" }}>

        {/* ABOUT */}
        <section id="about" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <FadeIn>
            <div className="section-label">01 — About</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 28 }}>
                  Crafting things<br /><em style={{ color: "#a89060" }}>that work.</em>
                </h2>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, lineHeight: 1.8, color: "#8a8070" }}>
                  {data.about}
                </p>
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ marginBottom: 32 }}>
                  <div className="section-label" style={{ marginBottom: 20 }}>Education</div>
                  {data.education.map((ed, i) => (
                    <div key={i} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < data.education.length - 1 ? "1px solid #1a1a1a" : "none" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontWeight: 400, marginBottom: 4 }}>{ed.school}</div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#888", letterSpacing: "0.1em" }}>{ed.degree}</div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#d4a853", marginTop: 4, letterSpacing: "0.08em" }}>{ed.period} · {ed.location}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="section-label" style={{ marginBottom: 16 }}>Skills</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {data.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <div className="divider" />

        {/* EXPERIENCE */}
        <section id="experience" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <FadeIn>
            <div className="section-label">02 — Experience</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 56 }}>
              Where I've<br /><em style={{ color: "#a89060" }}>worked.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {data.experience.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="exp-card hoverable">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 400 }}>{exp.company}</div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#d4a853", letterSpacing: "0.1em", marginTop: 4 }}>{exp.role}</div>
                    </div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{exp.period}</div>
                  </div>
                  <ul style={{ listStyle: "none", marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ color: "#d4a853", marginTop: 2, flexShrink: 0, fontFamily: "'DM Mono',monospace", fontSize: 10 }}>→</span>
                        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, color: "#8a8070", lineHeight: 1.6 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ACTIVITIES */}
        <section id="activities" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <FadeIn>
            <div className="section-label">03 — Leadership & Activities</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 56 }}>
              Beyond the<br /><em style={{ color: "#a89060" }}>classroom.</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 2 }}>
            {data.activities.map((act, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="hoverable" style={{ padding: "32px", border: "1px solid #1a1a1a", transition: "border-color 0.3s, background 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#2a2418"; e.currentTarget.style.background = "rgba(212,168,83,0.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.background = "transparent"; }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#d4a853", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{act.period}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 4 }}>{act.org}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#666", letterSpacing: "0.08em", marginBottom: 16 }}>{act.role}</div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#6a6055", lineHeight: 1.7 }}>{act.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* CONTACT */}
        <section id="contact" style={{ paddingTop: 80, paddingBottom: 120 }}>
          <FadeIn>
            <div className="section-label">04 — Contact</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(36px,6vw,72px)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 20 }}>
              Let's build<br /><em style={{ color: "#a89060" }}>something together.</em>
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "#6a6055", marginBottom: 52, maxWidth: 440, lineHeight: 1.7 }}>
              Open to opportunities, collaborations, and interesting conversations.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <a href={`mailto:${data.email}`} className="contact-link hoverable">
                <span style={{ width: 32, height: 1, background: "#2a2a2a", display: "inline-block", flexShrink: 0, transition: "background 0.3s" }} />
                {data.email}
              </a>
              <a href={`tel:${data.phone}`} className="contact-link hoverable">
                <span style={{ width: 32, height: 1, background: "#2a2a2a", display: "inline-block", flexShrink: 0 }} />
                {data.phone}
              </a>
              <div className="contact-link">
                <span style={{ width: 32, height: 1, background: "#2a2a2a", display: "inline-block", flexShrink: 0 }} />
                {data.location}
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#3a3a3a" }}>
          T<span className="gold">.</span>YHL — {new Date().getFullYear()}
        </span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#2a2a2a", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Engineering · Development · Leadership
        </span>
      </footer>
    </div>
  );
}