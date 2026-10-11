import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, ChevronDown,
  CircleUserRound, GraduationCap, Handshake, Mail, MapPin, Menu, Phone,
  Send, Sparkles, Target, UsersRound, Workflow, X, CalendarDays, ChartNoAxesCombined
} from "lucide-react";

const navItems = [
  ["About", "about"], ["Journey", "journey"], ["Experience", "experience"],
  ["Project", "project"], ["Contact", "contact"]
];

const strengths = [
  { icon: Handshake, title: "Relationship building", text: "Building trust-based connections that support long-term collaboration." },
  { icon: Workflow, title: "Operations & processes", text: "Coordinating people, priorities, events, and workflows with clarity." },
  { icon: ChartNoAxesCombined, title: "Sales & business growth", text: "Turning customer understanding and practical strategy into growth." },
  { icon: UsersRound, title: "Team leadership", text: "Supporting teams through communication, guidance, and accountability." }
];

const journey = [
  { period: "Professional foundation", role: "Pharmaceutical industry", org: "MCW · Indore", text: "Started the professional journey in pharmaceutical manufacturing and gained valuable industry exposure." },
  { period: "Market insight", role: "Stock Market Strategist", org: "Client advisory", text: "Built experience in market analysis, communication, and guiding clients through decisions." },
  { period: "Business development", role: "Business Development Executive", org: "Dr. Mantra · Ayurvedic healthcare", text: "Moved into business development and strengthened customer relationships and sales execution." },
  { period: "Leadership progression", role: "Trainer · Audit Manager · Sales Manager", org: "Dr. Mantra", text: "Progressed through leadership roles, ultimately managing a sales team for nearly two years." },
  { period: "Current role", role: "Operations Head", org: "Networkers Community", text: "Oversees community operations, chapter coordination, member engagement, and business networking activities." }
];

function Reveal({ children, className = "", delay = 0 }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    node.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div data-reveal className={`reveal ${className}`} style={{ "--delay": `${delay}ms` }}>{children}</div>;
}

function Header({ active, setActive }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      let current = "top";
      navItems.forEach(([, id]) => {
        const section = document.getElementById(id);
        if (section && window.scrollY + 160 >= section.offsetTop) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setActive]);
  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return <header className="header">
    <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); go("top"); }} aria-label="Harshil Tirole home">
      <span className="brand-mark">HT<span>.</span></span><span className="brand-name">HARSHIL TIROLE<small>OPERATIONS · GROWTH · LEADERSHIP</small></span>
    </a>
    <nav className={open ? "nav nav-open" : "nav"} aria-label="Main navigation">
      {navItems.map(([label, id]) => <button key={id} className={active === id ? "nav-link active" : "nav-link"} onClick={() => go(id)}>{label}</button>)}
      <button className="nav-cta" onClick={() => go("contact")}>Let's connect <ArrowUpRight size={15} /></button>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
  </header>;
}

function App() {
  const [active, setActive] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formState, setFormState] = useState({ loading: false, message: "", error: false });

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setShowTop(window.scrollY > 500);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

 
const submit = (e) => {
  e.preventDefault();

  const recipient = "tiroleharshil12@gmail.com";
  const subject = encodeURIComponent(
    form.subject || `Portfolio enquiry from ${form.name}`
  );

  const body = encodeURIComponent(
    `Name: ${form.name}\n` +
    `Email: ${form.email}\n\n` +
    `Message:\n${form.message}`
  );

  window.location.href =
    `mailto:${recipient}?subject=${subject}&body=${body}`;

  setFormState({
    loading: false,
    message: "Your email app will open. Please send the message from there.",
    error: false
  });
};


  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return <>
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
    <Header active={active} setActive={setActive} />
    <main id="top">
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> OPERATIONS HEAD <span className="eyebrow-dot">·</span> INDORE, INDIA</div>
          <h1>Turning meaningful<br />connections into <span className="red-text">growth.</span></h1>
          <p className="hero-intro">I'm <strong>Harshil Tirole</strong> — an operations and business growth professional who brings people, processes, and opportunities together.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo("contact")}>Let's connect <ArrowUpRight size={17} /></button>
            <button className="btn btn-quiet" onClick={() => scrollTo("about")}>Explore my story <ArrowDown size={16} /></button>
          </div>
          <div className="hero-proof">
            <div className="proof-icon"><BriefcaseBusiness size={19} /></div>
            <div><strong>8+ years</strong><span>of professional experience</span></div>
            <span className="proof-divider" />
            <div className="proof-caption">People first.<br />Progress always.</div>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract red and white portfolio artwork">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="art-card card-back"><span className="card-index">01 / OPERATIONS</span><Workflow size={36} /></div>
          <div className="art-card card-front">
            <span className="art-kicker">STRATEGY IN ACTION</span>
            <div className="art-symbol"><Target size={46} strokeWidth={1.3} /></div>
            <h2>Connect.<br />Coordinate.<br /><span>Grow.</span></h2>
            <div className="art-card-bottom"><span>BUSINESS & PEOPLE</span><ArrowUpRight size={18} /></div>
          </div>
          <div className="floating-chip chip-one"><span className="chip-dot" /> People-centered</div>
          <div className="floating-chip chip-two"><Sparkles size={15} /> Growth mindset</div>
          <div className="hero-stamp">HT<span>.</span></div>
          <div className="art-grid" />
        </div>
        <button className="scroll-cue" onClick={() => scrollTo("about")}><span>SCROLL TO EXPLORE</span><ChevronDown size={16} /></button>
      </section>

      <section id="about" className="section section-about">
        <div className="section-shell">
          <Reveal><div className="section-heading"><span className="section-number">01</span><div><p className="eyebrow">A LITTLE ABOUT ME</p><h2>People, purpose<br />& <span className="red-text">possibility.</span></h2></div></div></Reveal>
          <div className="about-grid">
            <Reveal className="about-note" delay={80}>
              <div className="quote-mark">“</div>
              <p className="large-quote">Every experience adds a new skill, every connection creates an opportunity, and every challenge is a chance to grow.</p>
              <span className="quote-credit">MY PROFESSIONAL PHILOSOPHY</span>
              <div className="note-decoration">HT<span>.</span></div>
            </Reveal>
            <Reveal className="about-copy" delay={160}>
              <p className="body-lead">I bring a cross-industry perspective shaped by pharmaceutical manufacturing, market strategy, Ayurvedic healthcare, sales management, and business networking.</p>
              <p>With a Bachelor of Pharmacy and a career built through continuous learning, I've found my strongest work at the intersection of communication, operational excellence, team leadership, and relationship building.</p>
              <p>Today, as Operations Head at Networkers Community, I help create an environment where entrepreneurs and professionals can connect, collaborate, and move their businesses forward.</p>
              <div className="about-facts">
                <div><span className="fact-value">01</span><span className="fact-label">People-first approach</span></div>
                <div><span className="fact-value">02</span><span className="fact-label">Structured execution</span></div>
                <div><span className="fact-value">03</span><span className="fact-label">Growth through trust</span></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section strengths-section">
        <div className="section-shell">
          <Reveal><div className="center-heading"><p className="eyebrow">WHAT I BRING TO THE TABLE</p><h2>Strengths that move<br /><span className="red-text">work forward.</span></h2><p className="section-subtitle">A practical mix of people skills, process thinking, and business understanding.</p></div></Reveal>
          <div className="strength-grid">
            {strengths.map(({ icon: Icon, title, text }, i) => <Reveal key={title} delay={i * 75}><article className="strength-card"><div className="strength-icon"><Icon size={22} /></div><span className="card-count">0{i + 1}</span><h3>{title}</h3><p>{text}</p><div className="card-arrow"><ArrowUpRight size={18} /></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <section id="journey" className="section journey-section">
        <div className="section-shell">
          <Reveal><div className="section-heading"><span className="section-number">02</span><div><p className="eyebrow">THE CAREER JOURNEY</p><h2>Built through<br /><span className="red-text">every chapter.</span></h2></div></div></Reveal>
          <div className="journey-layout">
            <div className="journey-intro"><p>Each role added a new lens — from industry foundations and market insight to team leadership and community operations.</p><div className="journey-label"><span className="journey-label-dot" /> CONTINUOUS LEARNING</div></div>
            <div className="timeline">
              {journey.map((item, i) => <Reveal key={item.role} delay={i * 55}><article className="timeline-item"><div className="timeline-marker">{i === journey.length - 1 ? <MapPin size={16} /> : <span>0{i + 1}</span>}</div><div className="timeline-content"><span className="timeline-period">{item.period}</span><h3>{item.role}</h3><p className="timeline-org">{item.org}</p><p className="timeline-text">{item.text}</p></div></article></Reveal>)}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="section-shell">
          <Reveal><div className="section-heading"><span className="section-number">03</span><div><p className="eyebrow">CURRENT FOCUS</p><h2>Making the moving parts<br /><span className="red-text">work together.</span></h2></div></div></Reveal>
          <Reveal delay={100}><div className="experience-panel">
            <div className="experience-top"><div className="experience-logo"><UsersRound size={29} /></div><div><span className="experience-tag">CURRENT ROLE</span><h3>Operations Head</h3><p>Networkers Community · Business networking</p></div><span className="experience-arrow"><ArrowUpRight size={23} /></span></div>
            <p className="experience-description">Helping entrepreneurs, business owners, and professionals build meaningful connections through well-coordinated community operations and engaging chapter experiences.</p>
            <div className="responsibility-grid">
              {[
                "Chapter meetings & event coordination", "Member onboarding, engagement & retention",
                "Leadership and team coordination", "Attendance, visitor tracking & operational reports",
                "Member communication and follow-ups", "Workflow improvement and operational planning",
                "Presentations and educational sessions", "Support for membership and chapter growth"
              ].map((item, i) => <div className="responsibility" key={item}><span><Check size={14} /></span>{item}</div>)}
            </div>
            <div className="experience-bottom"><span><Target size={16} /> THE OBJECTIVE</span><p>Build an organized, efficient, growth-oriented community with seamless operations and strong member engagement.</p></div>
          </div></Reveal>
        </div>
      </section>

      <section id="project" className="section project-section">
        <div className="section-shell">
          <Reveal><div className="section-heading"><span className="section-number">04</span><div><p className="eyebrow">FEATURED PROJECT</p><h2>Creating space<br />for <span className="red-text">business growth.</span></h2></div></div></Reveal>
          <Reveal delay={100}><article className="project-card">
            <div className="project-visual"><div className="project-visual-ring ring-a" /><div className="project-visual-ring ring-b" /><div className="project-visual-center"><Handshake size={52} strokeWidth={1.2} /></div><span className="project-visual-label">COMMUNITY / COLLABORATION / GROWTH</span><span className="project-big-number">01</span></div>
            <div className="project-details"><div className="project-meta"><span>OPERATIONS & COMMUNITY</span><span className="project-status"><span /> ACTIVE FOCUS</span></div><h3>Networkers Community</h3><p className="project-lead">A business networking platform connecting entrepreneurs, business owners, and professionals to collaborate and grow.</p><p>As Operations Head, I coordinate the systems and experiences that keep the community moving — from meetings and member journeys to communications, reports, and chapter activities.</p>
              <div className="project-outcomes"><div><CalendarDays size={18} /><span>Events & meetings</span></div><div><UsersRound size={18} /><span>Member experience</span></div><div><Workflow size={18} /><span>Operational flow</span></div></div>
              <button className="text-link" onClick={() => scrollTo("contact")}>Discuss collaboration <ArrowRight size={17} /></button>
            </div>
          </article></Reveal>
        </div>
      </section>

      <section className="section education-section">
        <div className="section-shell education-grid">
          <Reveal><div><p className="eyebrow">EDUCATION</p><h2>A foundation in<br /><span className="red-text">pharmaceutical science.</span></h2><p className="education-copy">My academic background has been one part of a broader professional journey shaped by practical experience, adaptability, and continuous learning.</p></div></Reveal>
          <Reveal delay={120}><div className="education-card"><div className="education-icon"><GraduationCap size={27} /></div><div><span className="education-label">DEGREE</span><h3>Bachelor of Pharmacy</h3><p>Academic foundation</p></div><span className="education-check"><Check size={17} /></span></div></Reveal>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="section-shell">
          <Reveal><div className="contact-banner"><div className="contact-banner-shape" /><div className="contact-banner-copy"><p className="eyebrow light-eyebrow">HAVE AN IDEA OR OPPORTUNITY?</p><h2>Let's make<br />something <span>meaningful.</span></h2><p>Open to conversations, connections, and opportunities to create business growth together.</p></div><button className="btn btn-white" onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}>Start a conversation <ArrowUpRight size={17} /></button></div></Reveal>
          <div className="contact-grid">
            <Reveal className="contact-info"><p className="eyebrow">GET IN TOUCH</p><h2>Good things start<br />with a <span className="red-text">conversation.</span></h2><p className="contact-intro">Reach out directly or use the form. I'll be glad to connect.</p>
              <a className="contact-method" href="mailto:tiroleharshil12@gmail.com"><span className="contact-method-icon"><Mail size={19} /></span><span><small>EMAIL</small><strong>tiroleharshil12@gmail.com</strong></span><ArrowUpRight size={17} /></a>
              <a className="contact-method" href="tel:8964862444"><span className="contact-method-icon"><Phone size={19} /></span><span><small>PHONE</small><strong>8964862444</strong></span><ArrowUpRight size={17} /></a>
              <div className="contact-method static-method"><span className="contact-method-icon"><MapPin size={19} /></span><span><small>LOCATION</small><strong>Indore, India</strong></span></div>
            </Reveal>
            <Reveal delay={100}><form id="contact-form" className="contact-form" onSubmit={submit}>
              <div className="form-heading"><h3>Send a message</h3><span><Send size={17} /></span></div>
              <div className="form-row"><label>Your name<input required minLength="2" maxLength="80" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" /></label><label>Email address<input required type="email" maxLength="120" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label></div>
              <label>Subject <span className="optional">(optional)</span><input maxLength="120" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="What would you like to discuss?" /></label>
              <label>Your message<textarea required minLength="8" maxLength="2000" rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me a little about it..." /></label>
              {formState.message && <p className={formState.error ? "form-status error" : "form-status"} role="status">{formState.message}</p>}
              <button className="btn btn-primary form-submit" disabled={formState.loading}>{formState.loading ? "Sending..." : "Send message"} <Send size={16} /></button>
              <p className="form-privacy">Your details are used only to respond to your enquiry.</p>
            </form></Reveal>
          </div>
        </div>
      </section>
    </main>
    <footer className="footer"><div className="section-shell footer-inner"><a className="brand footer-brand" href="#top" onClick={(e) => { e.preventDefault(); scrollTo("top"); }}><span className="brand-mark">HT<span>.</span></span><span className="brand-name">HARSHIL TIROLE<small>OPERATIONS · GROWTH · LEADERSHIP</small></span></a><p>Built around people. Driven by purpose.</p><span className="footer-copy">© {new Date().getFullYear()} Harshil Tirole</span></div></footer>
    <button className={showTop ? "back-top visible" : "back-top"} onClick={() => scrollTo("top")} aria-label="Back to top"><ArrowDown size={18} /></button>
  </>;
}

export default App;
