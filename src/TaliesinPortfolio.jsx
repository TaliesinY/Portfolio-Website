import { useState, useEffect, useRef } from "react";
import Particles from "./Particles";
import "./index.css";

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
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
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
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) setActiveSection(id);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Wide container style used for all sections
  const wide = { maxWidth: 1400, margin: "0 auto", padding: "0 80px" };

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: "#0d0d0d", color: "#e8e0d0", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>

      <Cursor />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"24px 80px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"linear-gradient(180deg,rgba(13,13,13,0.95) 60%,transparent)", borderBottom:"1px solid #1a1a1a", backdropFilter:"blur(8px)" }}>
        <button onClick={() => scrollTo("home")} style={{ background:"none", border:"none", cursor:"none", fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", color:"#e8e0d0", letterSpacing:"0.05em" }}>
          T<span className="gold">.</span>YHL
        </button>
        <div className="desktop-nav" style={{ display:"flex", gap:40 }}>
          {sections.filter(s => s !== "home").map(s => (
            <button key={s} className={`nav-link${activeSection===s?" active":""}`} style={{ background:"none", border:"none" }} onClick={() => scrollTo(s)}>{s}</button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background:"none", border:"none", cursor:"none", color:"#d4a853", fontSize:22 }}>☰</button>
      </nav>

      {menuOpen && (
        <div style={{ position:"fixed", inset:0, background:"#0d0d0d", zIndex:90, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:40 }}>
          {sections.map(s => (
            <button key={s} className="nav-link" style={{ background:"none", border:"none", fontSize:14 }} onClick={() => scrollTo(s)}>{s}</button>
          ))}
        </div>
      )}

      {/* HERO — full bleed particles */}
      <section id="home" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        {/* Particles fills the entire hero */}
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <Particles
            particleColors={["#d4a853", "#a89060", "#e8e0d0", "#6a6055"]}
            particleCount={350}
            particleSpread={12}
            speed={0.08}
            particleBaseSize={80}
            sizeRandomness={1.2}
            alphaParticles
            moveParticlesOnHover
            particleHoverFactor={0.3}
            cameraDistance={22}
            pixelRatio={window.devicePixelRatio || 1}
          />
        </div>

        {/* Gradient overlay so text stays readable */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(13,13,13,0.85) 40%, rgba(13,13,13,0.4) 100%)", zIndex:1 }} />

        <div style={{ ...wide, position:"relative", zIndex:2 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.3em", textTransform:"uppercase", color:"#d4a853", marginBottom:32, opacity:0, animation:"fadeUp 0.8s ease 0.2s forwards" }}>
            Engineering Student · Full Stack Developer
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(54px,9vw,120px)", lineHeight:0.95, letterSpacing:"-0.02em", color:"#e8e0d0", opacity:0, animation:"fadeUp 0.8s ease 0.4s forwards" }}>
            Taliesin<br /><em style={{ fontStyle:"italic", color:"#a89060" }}>Yip Hoi-Lee</em>
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(16px,2vw,22px)", color:"#8a8070", maxWidth:560, marginTop:36, lineHeight:1.7, opacity:0, animation:"fadeUp 0.8s ease 0.6s forwards" }}>
            Building thoughtful digital products at the intersection of engineering and strategy.
          </p>
          <div style={{ display:"flex", gap:24, marginTop:52, opacity:0, animation:"fadeUp 0.8s ease 0.8s forwards" }}>
            <button onClick={() => scrollTo("experience")} className="hoverable"
              style={{ cursor:"none", background:"#d4a853", color:"#0d0d0d", border:"none", padding:"14px 36px", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", transition:"all 0.3s" }}
              onMouseEnter={e => e.target.style.background="#e8c070"}
              onMouseLeave={e => e.target.style.background="#d4a853"}>
              View Work
            </button>
            <button onClick={() => scrollTo("contact")} className="hoverable"
              style={{ cursor:"none", background:"transparent", color:"#888", border:"1px solid #3a3a3a", padding:"14px 36px", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", transition:"all 0.3s" }}
              onMouseEnter={e => { e.target.style.borderColor="#d4a853"; e.target.style.color="#d4a853"; }}
              onMouseLeave={e => { e.target.style.borderColor="#3a3a3a"; e.target.style.color="#888"; }}>
              Contact
            </button>
          </div>
        </div>

        <div style={{ position:"absolute", bottom:40, left:80, display:"flex", alignItems:"center", gap:16, zIndex:2, opacity:0, animation:"fadeUp 0.8s ease 1.2s forwards" }}>
          <div style={{ width:40, height:1, background:"#2a2a2a" }} />
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"#3a3a3a" }}>Scroll</span>
        </div>
      </section>

      {/* ── CONTENT SECTIONS ── */}
      <div style={{ ...wide }}>

        {/* ABOUT */}
        <section id="about" style={{ paddingTop:100, paddingBottom:100 }}>
          <FadeIn>
            <div className="section-label">01 — About</div>
            {/* Wider 3-col grid: bio | education | skills */}
            <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr", gap:80, alignItems:"start" }}>
              <div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(32px,4vw,56px)", lineHeight:1.05, letterSpacing:"-0.01em", marginBottom:28 }}>
                  Crafting things<br /><em style={{ color:"#a89060" }}>that work.</em>
                </h2>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, lineHeight:1.85, color:"#8a8070" }}>
                  {data.about}
                </p>
              </div>
              <div>
                <div className="section-label" style={{ marginBottom:24 }}>Education</div>
                {data.education.map((ed, i) => (
                  <div key={i} style={{ marginBottom:24, paddingBottom:24, borderBottom: i < data.education.length-1 ? "1px solid #1a1a1a" : "none" }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:400, marginBottom:6 }}>{ed.school}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#888", letterSpacing:"0.1em", lineHeight:1.6 }}>{ed.degree}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#d4a853", marginTop:6, letterSpacing:"0.08em" }}>{ed.period} · {ed.location}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="section-label" style={{ marginBottom:24 }}>Skills</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {data.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <div className="divider" />

        {/* EXPERIENCE */}
        <section id="experience" style={{ paddingTop:100, paddingBottom:100 }}>
          <FadeIn>
            <div className="section-label">02 — Experience</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(32px,4vw,56px)", lineHeight:1.05, letterSpacing:"-0.01em", marginBottom:64 }}>
              Where I've<br /><em style={{ color:"#a89060" }}>worked.</em>
            </h2>
          </FadeIn>
          {/* 3-col experience grid */}
          <div className="exp-cols" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:48 }}>
            {data.experience.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="exp-card hoverable" style={{ height:"100%" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#d4a853", letterSpacing:"0.1em", marginBottom:10 }}>{exp.period}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:21, fontWeight:400, marginBottom:4 }}>{exp.company}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#666", letterSpacing:"0.08em", marginBottom:20 }}>{exp.role}</div>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                        <span style={{ color:"#d4a853", flexShrink:0, fontFamily:"'DM Mono',monospace", fontSize:10, marginTop:3 }}>→</span>
                        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:"#8a8070", lineHeight:1.65 }}>{b}</span>
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
        <section id="activities" style={{ paddingTop:100, paddingBottom:100 }}>
          <FadeIn>
            <div className="section-label">03 — Leadership & Activities</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(32px,4vw,56px)", lineHeight:1.05, letterSpacing:"-0.01em", marginBottom:64 }}>
              Beyond the<br /><em style={{ color:"#a89060" }}>classroom.</em>
            </h2>
          </FadeIn>
          {/* 4-col activity grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2 }}>
            {data.activities.map((act, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="hoverable" style={{ padding:"32px 28px", border:"1px solid #1a1a1a", transition:"border-color 0.3s,background 0.3s", height:"100%" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#2a2418"; e.currentTarget.style.background="rgba(212,168,83,0.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#1a1a1a"; e.currentTarget.style.background="transparent"; }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#d4a853", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>{act.period}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, marginBottom:6 }}>{act.org}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#666", letterSpacing:"0.08em", marginBottom:16 }}>{act.role}</div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"#6a6055", lineHeight:1.7 }}>{act.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* CONTACT */}
        <section id="contact" style={{ paddingTop:100, paddingBottom:140 }}>
          <FadeIn>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:120, alignItems:"start" }}>
              <div>
                <div className="section-label">04 — Contact</div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(36px,5vw,72px)", lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:20 }}>
                  Let's build<br /><em style={{ color:"#a89060" }}>something together.</em>
                </h2>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:"#6a6055", lineHeight:1.8, maxWidth:400 }}>
                  Open to opportunities, collaborations, and interesting conversations.
                </p>
              </div>
              <div style={{ paddingTop:48, display:"flex", flexDirection:"column", gap:28 }}>
                <a href={`mailto:${data.email}`} className="contact-link hoverable">
                  <span style={{ width:32, height:1, background:"#2a2a2a", display:"inline-block", flexShrink:0 }} />
                  {data.email}
                </a>
                <a href={`tel:${data.phone}`} className="contact-link hoverable">
                  <span style={{ width:32, height:1, background:"#2a2a2a", display:"inline-block", flexShrink:0 }} />
                  {data.phone}
                </a>
                <div className="contact-link">
                  <span style={{ width:32, height:1, background:"#2a2a2a", display:"inline-block", flexShrink:0 }} />
                  {data.location}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid #1a1a1a", padding:"28px 80px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:"#3a3a3a" }}>
          T<span className="gold">.</span>YHL — {new Date().getFullYear()}
        </span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#2a2a2a", letterSpacing:"0.15em", textTransform:"uppercase" }}>
          Engineering · Development · Leadership
        </span>
      </footer>
    </div>
  );
}
