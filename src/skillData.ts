const resume = "/documents/tousif-rahman-anto-resume.pdf";
const evidence = (project: string, label: string) => ({ href: `#project-${project}`, label });
const background = { href: "#about", label: "My teaching experience" };
const research = { href: "#research", label: "My research project" };
const listed = { href: resume, label: "Listed in my résumé" };

export const skillGroups = [
  {
    id: "languages", title: "Languages",
    intro: "I use different languages for different kinds of work, from teaching beginners to building web and mobile applications.",
    items: [
      { name: "Python", description: "I taught Python syntax, control flow, functions and problem solving at Dreamers Academy. I also used Python in my language-model research and Django work.", evidence: background },
      { name: "TypeScript", description: "I use TypeScript in React and Next.js applications, including CodeSwitch, The Archive and EduCore.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
      { name: "JavaScript", description: "My full-stack web work includes JavaScript on the frontend and Node.js on the backend. AFK Arena connects that work through live tournament updates.", evidence: evidence("afk", "Explore AFK Arena") },
      { name: "Java", description: "Java is one of the programming languages in my résumé. My university coursework includes object-oriented programming and data structures and algorithms.", evidence: listed },
      { name: "C++", description: "C++ is part of my programming background and one of the five languages supported by CodeSwitch. My coursework also covers data structures and algorithms.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
      { name: "Dart", description: "I used Dart with Flutter to build Geo Entity Manager, a mobile app with geographic records, photos and map views.", evidence: evidence("geomap", "Explore Geo Entity Manager") },
      { name: "Lua", description: "I developed a Lua curriculum for Roblox Studio game development and gave learners individual feedback at Dreamers Academy.", evidence: background },
    ],
  },
  {
    id: "frontend", title: "Frontend & mobile",
    intro: "My frontend work covers web interfaces, live updates and mobile screens. The framework depends on what the application needs.",
    items: [
      { name: "React", description: "I built React interfaces for CodeSwitch, MediPay and AFK Arena. In CodeSwitch, I used route-level code splitting and lazy loading for Monaco Editor.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
      { name: "Next.js", description: "I built The Archive with Next.js and TypeScript. EduCore also uses Next.js for course delivery, progress tracking and assessments.", evidence: evidence("archive", "Explore The Archive") },
      { name: "TypeScript", description: "TypeScript is part of my frontend stack across React and Next.js projects, including the editor in CodeSwitch and the document interface in The Archive.", evidence: evidence("archive", "Explore The Archive") },
      { name: "Tailwind CSS", description: "Tailwind CSS is listed in my frontend toolkit alongside React, Next.js and TypeScript.", evidence: listed },
      { name: "Flutter", description: "Geo Entity Manager uses Flutter for list, map, add and update screens. I used Provider for state, image_picker for photos and geolocator for GPS capture.", evidence: evidence("geomap", "Explore Geo Entity Manager") },
    ],
  },
  {
    id: "backend", title: "Backend & APIs",
    intro: "I build the server-side workflows that connect an interface to its data, permissions and external services.",
    items: [
      { name: "Node.js", description: "I used Node.js for MediPay’s billing backend and AFK Arena’s tournament platform. These projects cover payments, role-based workflows and live event operations.", evidence: evidence("medipay", "Explore MediPay") },
      { name: "Express.js", description: "AFK Arena uses Express APIs for administrators, players, team managers and sponsors. Express is also part of MediPay’s backend stack.", evidence: evidence("afk", "Explore AFK Arena") },
      { name: "Django", description: "CodeSwitch’s Django backend coordinates AI providers and handles authentication and code execution requests.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
      { name: "Django REST Framework", description: "I built CodeSwitch’s REST API with httpOnly JWT cookies, brute-force lockouts and Content Security Policy middleware.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
      { name: "REST APIs", description: "I work from API design through to the connected interface. EduCore uses REST APIs with Strapi while my other applications connect web and mobile clients to backend services.", evidence: { href: "#educore-title", label: "Read about EduCore" } },
      { name: "Socket.IO", description: "I used Socket.IO for AFK Arena’s live notifications and interface updates across single elimination, double elimination and round robin tournaments.", evidence: evidence("afk", "Explore AFK Arena") },
    ],
  },
  {
    id: "data", title: "Data & deployment",
    intro: "My work includes database schemas, per-user storage and deployed interfaces. Some tools below appear in my résumé without a separate public project.",
    items: [
      { name: "MongoDB", description: "MediPay uses immutable invoice snapshots and MongoDB Decimal128 for exact financial calculations. Its settlement workflow handles partial payments, refunds and reconciliation.", evidence: evidence("medipay", "Explore MediPay") },
      { name: "PostgreSQL", description: "PostgreSQL is part of my database toolkit. My full-stack work includes schema design and database-backed applications.", evidence: listed },
      { name: "Supabase", description: "I designed The Archive’s Supabase schema and authentication flow. Authenticated uploads and per-user bearer-token isolation keep document access tied to its owner.", evidence: evidence("archive", "Explore The Archive") },
      { name: "Firebase", description: "Firebase is listed under databases and cloud in my résumé. I don’t attach a specific public project to it here.", evidence: listed },
      { name: "Vercel", description: "I deployed The Archive’s Next.js interface to Vercel. The live project includes secure in-browser PDF previews and user-scoped document storage.", evidence: evidence("archive", "Explore The Archive") },
      { name: "Railway", description: "Railway is part of the cloud and deployment toolkit listed in my résumé.", evidence: listed },
    ],
  },
  {
    id: "ai", title: "AI & research",
    intro: "I’ve worked with hosted model APIs and locally adapted models. My projects include code conversion and a non-clinical emotional-support chatbot.",
    items: [
      { name: "OpenAI API", description: "CodeSwitch uses OpenAI alongside Groq and Gemini for code conversion. Automatic provider failover and API-key rotation handle rate limits and outages across the three providers.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
      { name: "Groq API", description: "Groq is one of CodeSwitch’s three AI providers. A deterministic regex fallback gives the app a second conversion path when model services are unavailable.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
      { name: "Gemini API", description: "I integrated Gemini into CodeSwitch’s multi-provider conversion engine, which supports bidirectional conversion across five programming languages.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
      { name: "LangChain", description: "LangChain is included in my AI engineering toolkit. My résumé lists it alongside model APIs, prompt engineering and NLP.", evidence: listed },
      { name: "Prompt engineering", description: "My research included a response-control framework that checks empathy, relevance and support quality, regenerates unsuitable responses and provides fallback replies.", evidence: research },
      { name: "NLP", description: "I evaluated emotional-support responses using 37 matched prompt pairs and a separate 360-turn study. We compared automated metrics with three AI-judge collections across 320 shared responses.", evidence: research },
      { name: "QLoRA & model adaptation", description: "I led a five-member team that adapted Mistral, Qwen, DeepSeek and Llama with QLoRA for consumer-grade hardware. We documented limits in repeated responses, fallback behaviour and evaluation consistency.", evidence: research },
    ],
  },
  {
    id: "security", title: "Authentication & access",
    intro: "Permissions and authentication are part of my application work, from a document vault to tournament operations and learning platforms.",
    items: [
      { name: "JWT", description: "CodeSwitch uses httpOnly JWT cookies and brute-force lockouts. AFK Arena uses JWT-authenticated REST APIs for its stakeholder workflows.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
      { name: "RBAC", description: "EduCore separates Admin, Content Manager, Instructor and Student permissions. AFK Arena also has role-based access for administrators, players, team managers and sponsors.", evidence: { href: "#educore-title", label: "Read about EduCore" } },
      { name: "CSP", description: "I added Content Security Policy middleware to CodeSwitch’s Django REST API as part of its authentication and abuse-risk controls.", evidence: evidence("codeswitch", "Explore CodeSwitch") },
    ],
  },
  {
    id: "tools", title: "Tools & workflow",
    intro: "These are the engineering and AI development tools listed in my résumé. The project sections show the applications I’ve built with my wider stack.",
    items: [
      { name: "Git", description: "Git is part of my engineering toolkit. My public repositories include web applications, a Flutter app and a browser physics lab.", evidence: { href: "https://github.com/Tousifrahmananto", label: "Browse my repositories" } },
      { name: "Docker", description: "Docker is listed in my engineering toolkit alongside Git and Postman.", evidence: listed },
      { name: "Postman", description: "Postman is part of the engineering toolkit in my résumé, which also covers REST API design and implementation.", evidence: listed },
      { name: "Claude", description: "Claude is one of the AI development tools listed in my résumé.", evidence: listed },
      { name: "GitHub Copilot", description: "GitHub Copilot is included in my AI development toolkit.", evidence: listed },
      { name: "Codex", description: "Codex is listed alongside Claude and GitHub Copilot in my AI development toolkit.", evidence: listed },
    ],
  },
];
