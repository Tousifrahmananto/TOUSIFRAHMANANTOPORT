import Skills from "./Skills";
import { useEffect, useRef, useState } from "react";
import {
  email,
  github,
  linkedin,
  xProfile,
  projects,
  type Project,
} from "./data";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span>
      Dhaka, BD <span className="clock-time">{time}</span>
    </span>
  );
}
function CaseStudy({
  project,
  close,
}: {
  project: Project | null;
  close: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (project) dialog.current?.showModal();
    else dialog.current?.close();
  }, [project]);
  return (
    <dialog
      ref={dialog}
      className="case-dialog"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-labelledby="case-title"
    >
      {project && (
        <div className="case-content">
          <div className="case-top">
            <span className="eyebrow">Project notes</span>
            <button
              className="close-button"
              onClick={close}
              aria-label="Close case study"
            >
              Close ×
            </button>
          </div>
          <p className="eyebrow accent">{project.label}</p>
          <h2 id="case-title">{project.title}</h2>
          <p className="case-intro">{project.summary}</p>
          {[
            ["The challenge", project.challenge],
            ["What I built", project.approach],
            ["Details & scope", project.detail],
          ].map(([heading, body]) => (
            <div className="case-note" key={heading}>
              <h3>{heading}</h3>
              <p>{body}</p>
            </div>
          ))}
          <p className="stack">{project.stack.join(" / ")}</p>
          <div className="project-links">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer">
                Live site <Arrow />
              </a>
            )}
            <a href={project.repo} target="_blank" rel="noreferrer">
              View source <Arrow />
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
function ProjectRow({
  project,
  open,
}: {
  project: Project;
  open: (project: Project) => void;
}) {
  const illustration = [
    "afk",
    "medipay",
    "blog",
    "geomap",
    "workshop",
  ].includes(project.id);
  return (
    <article id={`project-${project.id}`} className={`project project-${project.id}`}>
      <button
        className="project-visual"
        onClick={() => open(project)}
        aria-label={`Read the ${project.title} case study`}
      >
        <span className="cover-title" aria-hidden="true">
          {project.title}
        </span>
        <span className="cover-mark" aria-hidden="true">
          {
            (
              {
                codeswitch: "{ }",
                afk: "↗",
                archive: "A",
                medipay: "+",
                physics: "↝",
                blog: "¶",
                geomap: "⌖",
                workshop: "⚙",
              } as Record<string, string>
            )[project.id]
          }
        </span>
        <div className="browser-bar">
          <span className="browser-dots">● ● ●</span>
          <span>
            {project.title.toLowerCase().replaceAll(" ", "")} / preview
          </span>
          <Arrow />
        </div>
        <img
          src={`/images/${project.id}.${illustration ? "svg" : "jpg"}`}
          alt={`${project.title} ${illustration ? "interface illustration" : "website preview"}`}
          width="1440"
          height="1000"
          loading="lazy"
        />
        {illustration && (
          <span className="preview-caption">
            Interface illustration · Sample data
          </span>
        )}
        <span className="visual-open">
          <Arrow />
        </span>
      </button>
      <div className="project-copy">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>
            {project.live ? "Live demo + source" : "Source available"}
          </span>
        </div>
        <p className="project-label">{project.label}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <ul className="stack" aria-label="Technology stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-links">
          <button onClick={() => open(project)}>
            Behind the build <span aria-hidden="true">→</span>
          </button>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live site <Arrow />
            </a>
          )}
          <a href={project.repo} target="_blank" rel="noreferrer">
            Source <Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}
const credentials = [
  {
    title: "Millennium Fellowship",
    type: "Certificate of completion",
    issuer: "UNAI & Millennium Campus Network",
    date: "Class of 2025",
    image: "fellowship-certificate.jpg",
    file: "millennium-fellowship.pdf",
    description:
      "Completed the fellowship with Project SAFE with RICH Club Bangladesh.",
  },
  {
    title: "Global Admissions Committee",
    type: "Certificate of appreciation",
    issuer: "Millennium Campus Network",
    date: "2026 · Completed",
    image: "gac-certificate.jpg",
    file: "gac-appreciation.pdf",
    description:
      "Served on the 2026 committee, reviewing 40 fellowship applications.",
  },
  {
    title: "A recommendation from MCN",
    type: "Letter of recommendation",
    issuer: "Emmanuel Opatola, Admissions Manager",
    date: "10 August 2026",
    image: "recommendation.jpg",
    file: "mcn-recommendation.pdf",
    description:
      "MCN’s recommendation recognises my judgment and reliability during the admissions cycle and confirms that I completed my service.",
  },
];

export default function App() {
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState<Project | null>(null);
  const [active, setActive] = useState("home");
  const [copyStatus, setCopyStatus] = useState("");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied.");
    } catch {
      setCopyStatus("Select the email to copy it manually.");
    }
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopyStatus(""), 4500);
  };
  const visible = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="Tousif Rahman Anto home">
          <span className="brand-monogram">
            t<span className="accent">r</span>
            <span className="brand-dot">.</span>
          </span>
          <span>Tousif Rahman Anto</span>
        </a>
        <p className="sidebar-role">
          Full-stack developer
        </p>
        <div className="side-divider" />
        <span className="eyebrow nav-label">Explore</span>
        <nav aria-label="Main navigation">
          {[
            ["home", "Hello"],
            ["work", "Selected work"],
            ["about", "My background"],
            ["skills", "Skills in practice"],
            ["credentials", "Credentials"],
            ["contact", "Get in touch"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "current" : ""}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
              <span className="nav-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </nav>
        <a
          className="resume-link"
          href="/documents/tousif-rahman-anto-resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Read my résumé <Arrow />
        </a>
        <div className="sidebar-bottom">
          <a href={github} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Arrow />
          </a>
          <div className="side-divider" />
          <Clock />
          <span className="sidebar-note">Dhaka, Bangladesh</span>
        </div>
      </aside>
      <header className="mobile-header">
        <a href="#home">
          Tousif<span className="accent">.</span>
        </a>
        <nav aria-label="Mobile navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#credentials">Credentials</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main id="main">
        <section id="home" className="hero section-shell">
          <div className="hero-top">
            <span className="availability">
              <span className="status-dot" />
              Open to engineering opportunities
            </span>
            <span className="eyebrow">Based in Dhaka, Bangladesh</span>
          </div>
          <div className="hero-intro">
            <div>
              <span className="hello">Hi, I’m</span>
              <h1>
                Tousif Rahman Anto<span className="accent">.</span>
              </h1>
              <p className="hero-description">
                I build web applications. I’ve also taught coding, worked in
                esports operations and studied language models.
              </p>
              <p className="hero-detail">
                I studied Computer Science & Engineering at BRAC University.
                I’m now looking for an engineering role where I can build
                software and keep learning with a team.
              </p>
              <a
                className="text-link"
                href="#about"
              >
                More about my background ↓
              </a>
            </div>
            <div className="hero-portrait">
              <img
                src="/images/portrait.jpg"
                alt="Tousif Rahman Anto in Dhaka"
                width="750"
                height="1000"
              />
            </div>
          </div>
        </section>
        <section id="work" className="work section-shell">
          <div className="section-heading">
            <div>
              <h2>What I’ve been building.</h2>
            </div>
            <p>
              Some of these projects began as coursework. Others came from
              esports, teaching or a problem I wanted to explore.
            </p>
          </div>
          <div className="work-toolbar">
            <div className="filters" role="group" aria-label="Filter projects">
              {["All work", "Web Apps", "AI & Tools", "Mobile"].map((name) => (
                <button
                  key={name}
                  onClick={() => setFilter(name)}
                  aria-pressed={filter === name}
                  className={filter === name ? "active" : ""}
                >
                  {name}
                  {name === "All work" && (
                    <span>{projects.length}</span>
                  )}
                </button>
              ))}
            </div>
            <span className="work-count" aria-live="polite">
              {visible.length} projects
            </span>
          </div>
          <div className="project-list" key={filter}>
            {visible.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                open={setSelected}
              />
            ))}
          </div>
          <a
            className="all-source"
            href={github}
            target="_blank"
            rel="noreferrer"
          >
            <span>Explore all my repositories on GitHub.</span>
            <Arrow />
          </a>
          <div id="research" className="research">
            <div className="research-kicker">
              <span className="eyebrow accent">
                My final-year research
              </span>
              <span>2025 to 2026</span>
            </div>
            <div className="research-content">
              <div>
                <h3>
                  Studying emotional support
                  <br />
                  <span className="muted">with local language models.</span>
                </h3>
                <p>
                  I led a five-member team that built a locally hosted chatbot
                  for non-clinical emotional support. We adapted Mistral, Qwen,
                  DeepSeek and Llama with QLoRA. We then studied empathy and
                  response quality along with the limits of our evaluation
                  methods.
                </p>
                <a
                  className="text-link"
                  href="/documents/tousif-rahman-anto-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Research details in my résumé <Arrow />
                </a>
              </div>
              <div className="research-facts">
                <div>
                  <strong>4</strong>
                  <span>Model families adapted</span>
                </div>
                <div>
                  <strong>360</strong>
                  <span>Turns in the conversational study</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="additional-work section-shell"
          aria-labelledby="educore-title"
        >
          <span className="eyebrow accent">Building for education</span>
          <h3 id="educore-title">EduCore: a learning platform.</h3>
          <p>
            I built EduCore with Next.js and Strapi. The platform supports
            four user roles, course enrollment, saved progress and auto-graded
            quizzes. I also built its content workflows, role management and
            platform statistics.
          </p>
          <span className="stack">
            Next.js / TypeScript / Strapi / REST APIs / RBAC
          </span>
        </section>
        <section id="about" className="about section-shell">
          <div className="section-heading">
            <div>
              <h2>
                How I got here.
              </h2>
            </div>
          </div>
          <div className="about-layout">
            <div className="portrait-frame">
              <img
                src="/images/portrait.jpg"
                alt="Tousif Rahman Anto outdoors in Dhaka"
                width="750"
                height="1000"
                loading="lazy"
              />
              <div className="portrait-caption">
                <span>TOUSIF RAHMAN ANTO</span>
                <span>DHAKA, BANGLADESH</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                I’ve worked in classrooms as well as esports and research.
              </p>
              <p>
                At BRAC University, I studied Computer Science & Engineering
                and built applications across the web and mobile. For my final-year
                research, I worked with a five-member team on language-model
                adaptation and evaluation.
              </p>
              <p>
                I also taught Python at Dreamers Academy and developed a
                curriculum for Lua and Roblox Studio. At AFK Productions, I
                worked on tournament software for a production team. Teaching
                and esports showed me different ways people use software and
                what they need it to do.
              </p>
              <a
                className="text-link"
                href="/documents/tousif-rahman-anto-resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Read my résumé <Arrow />
              </a>
            </div>
          </div>
          <div className="experience">
            <div className="experience-heading">
              <h3>Experience & education</h3>
            </div>
            <div className="experience-list">
              {[
                [
                  "2026 · Completed",
                  "Global Admissions Committee Member",
                  "Millennium Campus Network",
                  "Reviewed 40 applications during the 2026 admissions cycle.",
                ],
                [
                  "2025 to 2026",
                  "Research Project Lead",
                  "Local emotional-support conversational AI",
                  "Led a five-member team working on model adaptation, evaluation and privacy safeguards.",
                ],
                [
                  "2024 to 2026",
                  "Coding Instructor & Curriculum Developer",
                  "Dreamers Academy",
                  "Taught Python and developed a Lua / Roblox Studio curriculum.",
                ],
                [
                  "Class of 2025 · Completed",
                  "Millennium Fellow",
                  "UNAI & Millennium Campus Network",
                  "Project SAFE with RICH Club Bangladesh.",
                ],
                [
                  "Project leadership",
                  "Lead Full-Stack Developer",
                  "AFK Arena / AFK Productions",
                  "Built tournament orchestration for a 25+ member production team.",
                ],
                [
                  "Graduated",
                  "BSc, Computer Science & Engineering",
                  "BRAC University",
                  "Focus: machine learning, web development and cyber security.",
                ],
              ].map(([date, title, org, description]) => (
                <div className="experience-row" key={title}>
                  <span>{date}</span>
                  <div>
                    <h4>{title}</h4>
                    <p>{org}</p>
                    <p className="experience-description">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Skills onProjectLink={() => setFilter("All work")} />
        <section id="credentials" className="credentials section-shell">
          <div className="section-heading">
            <div>
              <h2>
                Beyond software.
              </h2>
            </div>
            <p>
              I completed the Millennium Fellowship in 2025, then reviewed
              40 applications for the 2026 admissions committee.
              The certificates and recommendation below document that work.
            </p>
          </div>
          <div className="credential-list">
            {credentials.map((credential, index) => (
              <article className="credential" key={credential.file}>
                <a
                  className="credential-image"
                  href={`/documents/${credential.file}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${credential.title} ${credential.type}`}
                >
                  <img
                    src={`/images/${credential.image}`}
                    alt={`${credential.type} for Tousif Rahman Anto`}
                    width="1200"
                    height={index === 2 ? 1553 : 750}
                    loading="lazy"
                  />
                  <span>
                    View original PDF <Arrow />
                  </span>
                </a>
                <div className="credential-copy">
                  <span className="eyebrow">{credential.date}</span>
                  <h3>{credential.title}</h3>
                  <p className="credential-type">{credential.type}</p>
                  <p>{credential.description}</p>
                  <p className="issuer">{credential.issuer}</p>
                  <a
                    className="text-link"
                    href={`/documents/${credential.file}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read the document <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="contact" className="contact section-shell">
          <div className="contact-heading">
            <h2>
              Let’s talk about
              <br />
              <span className="accent">what’s next.</span>
            </h2>
          </div>
          <div className="contact-bottom">
            <div>
              <p>
                I’m looking for my next engineering role.
                <br />
                If my work fits your team or project, send me an email.
              </p>
              <div className="email-row">
                <a href={`mailto:${email}`}>{email}</a>
                <button onClick={copy} aria-label="Copy email address">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="8" y="8" width="12" height="12" rx="1" />
                    <path d="M16 8V4H4v12h4" />
                  </svg>
                </button>
              </div>
              <p className="copy-status" role="status">
                {copyStatus}
              </p>
            </div>
            <div className="socials">
              <a href={github} target="_blank" rel="noreferrer">
                GitHub <Arrow />
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Arrow />
              </a>
              {xProfile && (
                <a href={xProfile} target="_blank" rel="noreferrer">
                  X / Twitter <Arrow />
                </a>
              )}
              <a
                href="/documents/tousif-rahman-anto-resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Résumé <Arrow />
              </a>
            </div>
          </div>
        </section>
        <footer className="footer section-shell">
          <span>© {new Date().getFullYear()} Tousif Rahman Anto</span>
          <span>Dhaka, Bangladesh</span>
          <a href="#home">Back to top ↑</a>
        </footer>
      </main>
      <CaseStudy project={selected} close={() => setSelected(null)} />
    </>
  );
}
