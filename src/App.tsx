import Skills from "./Skills";
import useScrollMotion from "./useScrollMotion";
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
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}
function ProjectNotes({ project }: { project: Project }) {
  return <>
    <p className="case-intro">{project.summary}</p>
    {[
      ["The challenge", project.challenge],
      ["What I built", project.approach],
      ["Details & scope", project.detail],
    ].map(([heading, body]) => (
      <div className="case-note" key={heading}>
        <h3>{heading}</h3><p>{body}</p>
      </div>
    ))}
    <p className="stack">{project.stack.join(" / ")}</p>
    <div className="project-links">
      {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live site <Arrow /></a>}
      <a href={project.repo} target="_blank" rel="noreferrer">View source <Arrow /></a>
    </div>
  </>;
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
      Dhaka, Bangladesh <span className="clock-time">{time}</span>
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
          <ProjectNotes project={project} />
          <a className="text-link case-permalink" href={`/work/${project.id}/`}>Open full project page <Arrow /></a>
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
    <article
      id={`project-${project.id}`}
      className={`project project-${project.id}`}
    >
      <div className="project-heading">
        <h3>{project.title}</h3>
        <p>{project.label}</p>
      </div>
      <button
        className="project-visual"
        onClick={() => open(project)}
        aria-label={`Read project notes for ${project.title}`}
      >
        <img
          src={`/images/${project.id}.${illustration ? "svg" : "jpg"}`}
          alt={`${project.title} ${illustration ? "interface illustration" : "website preview"}`}
          width="1440"
          height="1000"
          loading={project.id === "codeswitch" ? "eager" : "lazy"}
          fetchPriority={project.id === "codeswitch" ? "high" : "auto"}
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
        <p className="project-summary">{project.summary}</p>
        <ul className="stack" aria-label="Technology stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-links">
          <a href={`/work/${project.id}/`} onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            open(project);
          }}>
            Behind the build <span aria-hidden="true">→</span>
          </a>
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
    title: "SQL (Advanced)",
    type: "Certificate of accomplishment",
    issuer: "HackerRank",
    date: "12 October 2026",
    image: "sql-advanced-certificate.jpg",
    href: "https://yajgqpnfknhujdpdwkoq.supabase.co/storage/v1/object/public/pdfs/d9833da2-365e-426b-9571-525afa74bc62/sql_advanced_certificate-34c82a06ccd04f6c9c6aa4c2b639f269.pdf",
    description:
      "Passed the HackerRank SQL (Advanced) skills certification test.",
  },
  {
    title: "REST API (Intermediate)",
    type: "Certificate of accomplishment",
    issuer: "HackerRank",
    date: "15 October 2026",
    image: "rest-api-intermediate-certificate.jpg",
    href: "https://yajgqpnfknhujdpdwkoq.supabase.co/storage/v1/object/public/pdfs/d9833da2-365e-426b-9571-525afa74bc62/rest_api_intermediate_certificate-3959363cc12f44ce96ba749767e8cbdf.pdf",
    description:
      "Passed the HackerRank REST API (Intermediate) skills certification test.",
  },
  {
    title: "Millennium Fellowship",
    type: "Certificate of completion",
    issuer: "UNAI & Millennium Campus Network",
    date: "Class of 2025",
    image: "fellowship-certificate.jpg",
    href: "/documents/millennium-fellowship.pdf",
    description:
      "Completed the fellowship through Project SAFE at RICH Club Bangladesh.",
  },
  {
    title: "Global Admissions Committee",
    type: "Certificate of appreciation",
    issuer: "Millennium Campus Network",
    date: "2026 · Completed",
    image: "gac-certificate.jpg",
    href: "https://yajgqpnfknhujdpdwkoq.supabase.co/storage/v1/object/public/pdfs/d9833da2-365e-426b-9571-525afa74bc62/Tousif_Rahman_Anto_GAC_Certificate-g125iIBaAKHzwbokOMsdta0BgCIx0z.pdf",
    description:
      "Served on the 2026 committee, reviewing 40 fellowship applications.",
  },
  {
    title: "A recommendation from MCN",
    type: "Letter of recommendation",
    issuer: "Emmanuel Opatola, Admissions Manager",
    date: "10 August 2026",
    image: "recommendation.jpg",
    href: "https://yajgqpnfknhujdpdwkoq.supabase.co/storage/v1/object/public/pdfs/d9833da2-365e-426b-9571-525afa74bc62/Tousif_Rahman_Anto_MCN_Letter_of_Recommendation-jADB5rSToauVuNWP20ebvBfor7dt4J.pdf",
    description:
      "MCN’s recommendation recognises my judgment and reliability during the admissions cycle and confirms that I completed my service.",
  },
];

function HomePage() {
  useScrollMotion();
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState<Project | null>(null);
  const [active, setActive] = useState("home");
  const [copyStatus, setCopyStatus] = useState("");
  const copied = copyStatus === "Email copied.";
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    const findTarget = (hash: string) => {
      try {
        return document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return null;
      }
    };
    const scrollToTarget = (target: HTMLElement) => {
      target.scrollIntoView({ block: "start" });
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true },
        );
      }
      target.focus({ preventScroll: true });
    };
    const navigate = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      const target = findTarget(url.hash);
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
    };
    const initialTarget = findTarget(location.hash);
    const frame = initialTarget
      ? requestAnimationFrame(() => {
          scrollToTarget(initialTarget);
          history.replaceState(
            history.state,
            "",
            location.pathname + location.search,
          );
        })
      : undefined;
    document.addEventListener("click", navigate);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      document.removeEventListener("click", navigate);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document
      .querySelectorAll(".portfolio-content > section[id]")
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
      <div className="reading-progress" aria-hidden="true">
        <span />
      </div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Tousif Rahman Anto home">
          Tousif Rahman Anto<span className="accent">.</span>
        </a>
        <nav aria-label="Main navigation">
          {[
            ["work", "Work"],
            ["about", "About"],
            ["skills", "Skills"],
            ["credentials", "Credentials"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "current" : ""}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="header-resume"
          href="/documents/tousif-rahman-anto-resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Résumé <Arrow />
        </a>
      </header>
      <main id="main" className="portfolio-layout">
        <aside id="home" className="identity-rail" aria-label="About Tousif">
          <div className="identity-sticky">
            <img
              className="identity-portrait"
              src="/images/portrait.jpg"
              alt="Tousif Rahman Anto in Dhaka"
              width="152"
              height="190"
              fetchPriority="high"
            />
            <h1>
              Tousif
              <br />
              Rahman Anto.
            </h1>
            <p className="identity-role">
              Backend & full-stack developer.
              <br />
              BRAC University CSE graduate.
              <br />
              Based in Dhaka.
            </p>
            <p className="identity-focus">
              I build APIs and web applications with Node.js, TypeScript,
              Express and Django REST Framework.
            </p>
            <p className="availability">
              <span className="status-dot" />
              Open to internships and
              <br />
              entry-level engineering roles.
            </p>
            <a
              className="primary-link"
              href="/documents/tousif-rahman-anto-resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Read my résumé <Arrow />
            </a>
          </div>
        </aside>
        <div className="portfolio-content">
          <section id="work" className="work section-shell">
            <div className="section-heading">
              <div>
                <h2>Software I’ve built.</h2>
                <p className="section-intro">
                  Explore the interfaces and the engineering behind them.
                </p>
              </div>
            </div>
            <div className="work-toolbar">
              <div
                className="filters"
                role="group"
                aria-label="Filter projects"
              >
                {["All work", "Web Apps", "AI & Tools", "Mobile"].map(
                  (name) => (
                    <button
                      key={name}
                      onClick={() => setFilter(name)}
                      aria-pressed={filter === name}
                      className={filter === name ? "active" : ""}
                    >
                      {name}
                      {name === "All work" && <span>{projects.length}</span>}
                    </button>
                  ),
                )}
              </div>
              <span className="work-count" aria-live="polite">
                {visible.length} {visible.length === 1 ? "project" : "projects"}
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
                <span className="eyebrow accent">My final-year research</span>
                <span>2025 to 2026</span>
              </div>
              <div className="research-content">
                <div>
                  <h3>Building a chatbot that checks its own replies.</h3>
                  <p>
                    My thesis focused on an emotional-support chatbot that runs
                    locally. I led a team of five. We brought model adaptation,
                    response checks and conversation memory together in one
                    system for non-clinical use.
                  </p>
                  <p>
                    I built four checks for empathy consistency, response drift,
                    support quality and support consistency. Before sending a
                    reply, the system uses those checks to decide whether to try
                    again or return a fallback response. Correction stays within
                    set limits.
                  </p>
                  <p>
                    I prepared the conversation data and brought in Mistral,
                    Qwen, DeepSeek and Llama for comparison. Using 4-bit QLoRA,
                    we adapted 7B–8B models on a consumer GPU with 12 GB of
                    memory.
                  </p>
                  <p>
                    I also built the Gradio interface and added user ratings,
                    identifier redaction and optional conversation memory in
                    MongoDB. Accepted conversations helped shape later prompts
                    and summaries. The model’s weights stayed fixed while people
                    chatted with it.
                  </p>
                  <span className="stack">
                    Python / QLoRA / Mistral / Gradio / MongoDB
                  </span>
                  <a
                    className="text-link"
                    href="/documents/tousif-rahman-anto-resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read about my thesis <Arrow />
                  </a>
                </div>
                <div className="research-facts">
                  <div>
                    <strong>4</strong>
                    <span>Checks before a reply is sent</span>
                  </div>
                  <div>
                    <strong>12 GB</strong>
                    <span>GPU memory used to adapt the models</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="additional-work section-shell"
            aria-labelledby="educore-title"
          >
            <h3 id="educore-title">EduCore: a learning platform.</h3>
            <p>
              I built EduCore with Next.js and Strapi. The platform supports
              four user roles, course enrollment, saved progress and auto-graded
              quizzes. I also built its content workflows and role management
              features and added platform statistics.
            </p>
            <span className="stack">
              Next.js / TypeScript / Strapi / REST APIs / RBAC
            </span>
          </section>
          <section id="about" className="about section-shell">
            <div className="section-heading">
              <div>
                <h2>How I got here.</h2>
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
                  and built web and mobile applications. For my final-year
                  thesis, I led a team of five building an emotional-support
                  chatbot that runs locally, checks its replies and remembers
                  conversations.
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
                    "Led a team of five building a local emotional-support chatbot with response checks and conversation memory.",
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
                    "Project work",
                    "Full-Stack Developer",
                    "AFK Productions",
                    "Built tournament management software for a production team of 25+ members.",
                  ],
                  [
                    "September 2026 · Graduated",
                    "BSc, Computer Science & Engineering",
                    "BRAC University",
                    "Coursework: data structures and algorithms, object-oriented programming, databases, operating systems and software engineering.",
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
                <h2>Skills & service.</h2>
              </div>
              <p>
                Certifications alongside my Millennium Fellowship and admissions
                committee work. Each document is available to read below.
              </p>
            </div>
            <div className="credential-list">
              {credentials.map((credential) => (
                <article className="credential" key={credential.href}>
                  <a
                    className="credential-image"
                    href={credential.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open the ${credential.type.toLowerCase()} for ${credential.title}`}
                  >
                    <img
                      src={`/images/${credential.image}`}
                      alt={`${credential.type} for Tousif Rahman Anto`}
                      width="1200"
                      height={
                        credential.image === "recommendation.jpg" ? 1553 : 750
                      }
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
                      href={credential.href}
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
              <h2>Let’s build something useful.</h2>
            </div>
            <div className="contact-bottom">
              <div>
                <p>
                  I’m looking for an internship or entry-level engineering role.{" "}
                  <br />
                  If my work fits your team or project, send me an email.
                </p>
                <div className="email-row">
                  <a href={`mailto:${email}`}>{email}</a>
                  <button
                    className={`copy-email${copied ? " is-copied" : ""}`}
                    onClick={copy}
                    aria-label={
                      copied ? "Email copied. Copy again" : "Copy email address"
                    }
                    type="button"
                  >
                    <span className="copy-icon" aria-hidden="true">
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
                    </span>
                    <span className="copy-label" aria-hidden="true">
                      Copied
                    </span>
                  </button>
                </div>
                <p className="copy-status" role="status">
                  <span className={copied ? "sr-only" : undefined}>
                    {copyStatus}
                  </span>
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
            <Clock />
            <a href="#home">Back to top ↑</a>
          </footer>
        </div>
      </main>
      <CaseStudy project={selected} close={() => setSelected(null)} />
    </>
  );
}

export default function App({ path = "/" }: { path?: string }) {
  path = path.replace(/\/index\.html$/, "/");
  if (path === "/") return <HomePage />;
  const project = projects.find((item) => path.replace(/\/$/, "") === `/work/${item.id}`);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="/">Tousif Rahman Anto<span className="accent">.</span></a>
      <nav aria-label="Main navigation"><a href="/#work">All work</a><a href="/#contact">Contact</a></nav>
    </header>
    <main id="main" className="project-page case-content">
      <nav className="case-top" aria-label="Breadcrumb"><a href="/">Home</a><span>{project?.title ?? "Page not found"}</span></nav>
      <p className="eyebrow">{project?.label ?? "404"}</p>
      <h1>{project?.title ?? "This page doesn’t exist."}</h1>
      {project ? <ProjectNotes project={project} /> : <p className="case-intro">You can find my projects and contact details on the homepage.</p>}
      <a className="text-link case-permalink" href="/#work">Explore all projects <Arrow /></a>
    </main>
    <footer className="project-page-footer"><span>Built by Tousif Rahman Anto · Dhaka, Bangladesh</span><a href={`mailto:${email}`}>Get in touch <Arrow /></a></footer>
  </>;
}
