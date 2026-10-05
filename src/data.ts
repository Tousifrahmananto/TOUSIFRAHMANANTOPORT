export const email = "tousif.rahman.anto@g.bracu.ac.bd";
export const github = "https://github.com/Tousifrahmananto";
export const linkedin = "https://www.linkedin.com/in/tousif-rahman-anto/";
// Set this to your actual profile URL to show an X / Twitter link.
export const xProfile: string | null = null;

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  label: string;
  summary: string;
  stack: string[];
  live?: string;
  repo: string;
  challenge: string;
  approach: string;
  detail: string;
};

export const projects: Project[] = [
  {
    id: "codeswitch",
    number: "01",
    title: "CodeSwitch",
    category: "AI & Tools",
    label: "AI-assisted code conversion",
    summary:
      "I built CodeSwitch to convert code between programming languages. It uses an AI engine with a rule-based fallback when the model service is unavailable.",
    stack: ["React", "TypeScript", "Django", "LLM APIs"],
    live: "https://code-switchgg.vercel.app/",
    repo: `${github}/CodeSwitch`,
    challenge:
      "Code translation still needs to work when model providers hit rate limits or go offline. I also needed to keep the browser editor quick to load.",
    approach:
      "I built two conversion paths: one uses multiple AI providers and the other follows conversion rules. The React frontend loads Monaco Editor only when needed. Django handles provider failover, authentication and code execution requests.",
    detail:
      "CodeSwitch supports Python, C, C++, Java and JavaScript. It also includes shareable snippets and learning modules. AI output needs review. The fallback covers a smaller set of conversion patterns.",
  },
  {
    id: "afk",
    number: "02",
    title: "AFK Arena",
    category: "Web Apps",
    label: "Real-time tournament operations",
    summary:
      "I brought registration, team management and live match progression into one esports platform. It grew out of my work at AFK Productions and the practical demands of tournament days.",
    stack: ["React", "Node.js", "MongoDB", "Socket.IO"],
    repo: `${github}/AFK_PRODUCTIONS`,
    challenge:
      "Players, teams and event staff need to see the same tournament state. I needed clear permissions for each role so they could work together without sharing every control.",
    approach:
      "I automated brackets for single elimination, double elimination and round robin. Socket.IO sends live notifications. Express APIs and role-based permissions give players, team managers, sponsors and admins their own workflows.",
    detail:
      "The platform includes team rosters, match statistics, galleries and sponsor campaign management. I drew on my role at AFK Productions and my hands-on experience running esports operations.",
  },
  {
    id: "archive",
    number: "03",
    title: "The Archive",
    category: "Web Apps",
    label: "PDF storage, previews and sharing",
    summary:
      "The Archive is a PDF vault with storage scoped to each user. I built in-browser previews and shareable links so people can find their documents and choose what to share.",
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    live: "https://the-archive-pdf.vercel.app/",
    repo: `${github}/The-Archive`,
    challenge:
      "I wanted uploading, previewing and sharing to feel straightforward. File operations also needed to stay tied to the authenticated owner.",
    approach:
      "I used Supabase authentication and verified bearer tokens on the server. A storage abstraction lets the app use either Vercel Blob or Supabase Storage. Users can search, browse recent and shared files, delete documents and create public sharing links.",
    detail:
      "Protected API routes identify the owner through a verified session rather than a user ID sent by the client. Users can upload, find, view and share documents in the same interface.",
  },
  {
    id: "medipay",
    number: "04",
    title: "MediPay",
    category: "Web Apps",
    label: "Healthcare billing & settlement",
    summary:
      "I built MediPay to handle hospital billing when patients make partial payments. It keeps invoices, payments, refunds and reconciliation in sync across the billing process.",
    stack: ["React", "Node.js", "MongoDB", "SSLCOMMERZ"],
    repo: `${github}/SAAS_PROJECT`,
    challenge:
      "Patient records, encounters, invoices and settlements all need to stay consistent. I had to account for partial payments and refunds as well as the usual billing steps.",
    approach:
      "I delivered 16 screens across three release milestones. Immutable invoice snapshots and MongoDB Decimal128 keep financial calculations consistent. Settlement uses transactions and idempotent operations for SSLCOMMERZ and Bangla QR checkout methods.",
    detail:
      "I added PDF invoices and receipts, CSV reporting and audit events that account for user roles. The preview illustrates the interface with sample data. You can find the implementation in the source repository.",
  },
  {
    id: "physics",
    number: "05",
    title: "Game Physics Lab",
    category: "AI & Tools",
    label: "Interactive 3D physics sandbox",
    summary:
      "Game Physics Lab lets you test an idea in the browser before rebuilding it in a game engine. You can import models, change physical materials, run experiments and export the measurements.",
    stack: ["React", "Three.js", "Cannon-es", "Vite"],
    live: "https://game-physics-engine-rho.vercel.app/",
    repo: `${github}/game_physics_engine`,
    challenge:
      "I wanted a hands-on way to test game-object physics without installing a game engine. The lab also needed to work without an account or a backend.",
    approach:
      "I paired Three.js rendering with Cannon-es rigid-body simulation. The lab supports primitive creation, GLB/GLTF/OBJ imports, transform controls and material presets. Drop, bounce, explosion and gravity scenarios give users focused experiments to run.",
    detail:
      "The lab records speed and height. Users can export their run history as JSON or CSV. It is a functional prototype. Imported models use bounding boxes for collisions while fire, wind and water use approximations intended for games. Uploaded models stay in the browser.",
  },
  {
    id: "blog",
    number: "06",
    title: "The Chuckle Chronicles",
    category: "Web Apps",
    label: "Full-stack publishing & moderation",
    summary:
      "I built The Chuckle Chronicles as a PHP publishing platform. It brings together author accounts, categories, search, comments, likes and an admin workspace.",
    stack: ["PHP", "MySQL", "JavaScript", "CSS"],
    repo: `${github}/Bloging__Site`,
    challenge:
      "Readers, authors and administrators need different things from a blog. I connected the public reading pages with publishing tools and administrator controls.",
    approach:
      "I built session-based authentication with password hashing. I then added post creation and editing, category management, featured posts, search, comments and the ability to like or unlike posts. Authors manage their own posts. Admins manage users and categories.",
    detail:
      "The app uses procedural PHP with MySQL and runs on Apache/XAMPP. The preview illustrates the interface with sample content. The repository includes source code and setup instructions. There is no linked public deployment.",
  },
  {
    id: "geomap",
    number: "07",
    title: "Geo Entity Manager",
    category: "Mobile",
    label: "Location-aware Flutter application",
    summary:
      "I built this Flutter app to show geographic records in a list and on a map. It brings photos, GPS capture and editable map markers into the same mobile workflow.",
    stack: ["Flutter", "Dart", "Provider", "OpenStreetMap"],
    repo: `${github}/cse489mid`,
    challenge:
      "The list and map needed to stay in sync as users created and updated records. Each record contains a title, coordinates and an image.",
    approach:
      "I used Provider to manage entity state and flutter_map with OpenStreetMap tiles for map views. image_picker handles uploads. geolocator captures the current position. The app uses an HTTP API for record operations.",
    detail:
      "I built this app for a mobile development course. The repository includes screens for listing, mapping, adding and updating records. The app depends on the course API. I’ve shared its source code rather than linking to a deployed app. The thumbnail illustrates the interface.",
  },
  {
    id: "workshop",
    number: "08",
    title: "Workshop Appointments",
    category: "Web Apps",
    label: "Car-service booking & administration",
    summary:
      "This PHP application connects a customer booking form with a protected administrator workspace. Customers book appointments that staff can review and edit.",
    stack: ["PHP", "MySQL", "Sessions", "CSS"],
    repo: `${github}/CSE391_ASSIGNMENT3`,
    challenge:
      "A booking form alone wasn’t enough. I needed to save appointments and give staff a separate place to review and edit them.",
    approach:
      "I built the customer form, database storage, administrator login and appointment editing. Each mechanic can accept up to four appointments per day. A customer cannot use the same phone number to book twice on the same date. The repository includes a MySQL schema and instructions for running the app locally with XAMPP.",
    detail:
      "This coursework app uses server-rendered forms, session authentication and CRUD workflows. I included it because appointment booking adds a distinct use case to my work. The preview uses sample data to illustrate the interface. The source code is available in the repository. There is no linked live deployment.",
  },
];
