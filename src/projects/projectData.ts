/**
 * Single source of truth for real DC Miranda content, transcribed from the
 * live site (index.html on feature/system-portfolio-rebuild). Nothing here
 * is invented — categories, descriptions, tags, links, and status values
 * mirror what's actually published. Where the real site has no case study
 * yet for a category, that is represented honestly as `status: "pending"`
 * rather than filled in with placeholder work.
 */

export type CategoryId =
  | "web"
  | "software"
  | "automation"
  | "gohighlevel"
  | "graphics"
  | "video";

export interface Category {
  id: CategoryId;
  number: string;
  name: string;
  description: string;
  tags: string[];
  accent: string; // CSS custom-property value (gradient), matches the live site's [data-accent] palette
  glow: string;
}

export const categories: Category[] = [
  {
    id: "web",
    number: "01",
    name: "Web Design & Development",
    description: "Modern websites designed around the business — not just a template.",
    tags: [
      "Landing pages",
      "Business websites",
      "Conversion-focused websites",
      "Responsive experiences",
      "Interactive & animated interfaces",
      "Performance optimization",
      "Custom front-end development",
      "Next.js",
    ],
    accent: "linear-gradient(135deg, #5ec8ff, #6a8bff)",
    glow: "rgba(94, 168, 255, 0.4)",
  },
  {
    id: "software",
    number: "02",
    name: "AI Web & Software Development",
    description:
      "AI-assisted development to build software faster — without losing focus on usability, scalability, and the actual business problem.",
    tags: [
      "AI-powered web applications",
      "Custom business applications",
      "Internal tools",
      "Client portals",
      "Dashboards",
      "Database-driven applications",
      "API integrations",
      "Custom workflows & business systems",
    ],
    accent: "linear-gradient(135deg, #b06bff, #ff6bd6)",
    glow: "rgba(176, 107, 255, 0.4)",
  },
  {
    id: "automation",
    number: "03",
    name: "AI Automation",
    description: "Reducing repetitive work by connecting a business's tools, data, and processes.",
    tags: [
      "AI-powered workflows",
      "Lead automation",
      "Customer follow-ups",
      "Data processing",
      "Email & messaging automation",
      "CRM automation",
      "AI agents & assistants",
      "API-based integrations",
    ],
    accent: "linear-gradient(135deg, #49ffb4, #4dd9ff)",
    glow: "rgba(73, 255, 180, 0.35)",
  },
  {
    id: "gohighlevel",
    number: "04",
    name: "GoHighLevel",
    description:
      "Building and customizing GoHighLevel systems that connect marketing, sales, communication, and client management.",
    tags: [
      "CRM setup",
      "Pipelines",
      "Funnels",
      "Landing pages",
      "Forms & surveys",
      "Calendars & appointments",
      "Workflows",
      "Lead nurturing",
      "Email/SMS automation",
      "Client onboarding",
      "Custom integrations",
    ],
    accent: "linear-gradient(135deg, #ffd166, #ff9a4d)",
    glow: "rgba(255, 209, 102, 0.4)",
  },
  {
    id: "graphics",
    number: "05",
    name: "Graphics & Visual Content",
    description: "The visual assets needed to communicate a brand and support its digital presence.",
    tags: [
      "Brand graphics",
      "Social media graphics",
      "Marketing materials",
      "Website graphics",
      "UI visuals",
      "Promotional graphics",
      "Presentation visuals",
      "Creative direction",
    ],
    accent: "linear-gradient(135deg, #ff5c8a, #ff8a5c)",
    glow: "rgba(255, 92, 138, 0.4)",
  },
  {
    id: "video",
    number: "06",
    name: "Video & Motion",
    description: "Video assets designed to communicate ideas clearly and hold attention.",
    tags: [
      "Promotional videos",
      "Social media content",
      "Product videos",
      "Website video",
      "Motion graphics",
      "Screen recordings",
      "Video editing",
      "Short-form content",
    ],
    accent: "linear-gradient(135deg, #8b8bff, #c86bff)",
    glow: "rgba(139, 139, 255, 0.4)",
  },
];

export interface Project {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  status: "live" | "pending";
  href?: string;
  action: string; // e.g. "Watch ↗", "In progress"
}

/**
 * Transcribed 1:1 from #work-listing in index.html. Six real video deliverables
 * (hosted on Google Drive, linked out — no video files are self-hosted, so
 * nothing here fabricates an embeddable asset that doesn't exist) plus four
 * honest "pending" rows for the categories that don't have a published case
 * study on the live site yet. No graphics-only case study exists separately
 * from these videos, so the "graphics" category intentionally has no project
 * rows of its own — see graphicsNote below instead of inventing one.
 */
export const projects: Project[] = [
  {
    id: "ai-talking-head-demo",
    name: "ai-talking-head-demo.mp4",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1DGOQpx4uDRX8DFot35eGjw-N-eCvDx5M/view?usp=sharing",
    action: "Watch ↗",
  },
  {
    id: "course-walkthrough",
    name: "course-walkthrough.mp4",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1mZFJ7r3PKA64NUfgIn2ZR1ZMYZUsGNu5/view?usp=sharing",
    action: "Watch ↗",
  },
  {
    id: "ai-assisted-talking-head",
    name: "ai-assisted-talking-head.mp4",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1Oo-IFk9EyPYk-J_4zcyTdXfiy5Z8CfcZ/view?usp=sharing",
    action: "Watch ↗",
  },
  {
    id: "course-explainer-walkthrough",
    name: "course-explainer-walkthrough.mp4",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/10pPppvF0aScidHWUu0uFMUIMGSHQSs1A/view?usp=drive_link",
    action: "Watch ↗",
  },
  {
    id: "social-media-reels",
    name: "social-media-reels.mp4",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1DhlfNliYJYvNu4ylvCxjvP59sYaB1jgl/view?usp=drive_link",
    action: "Watch ↗",
  },
  {
    id: "reel-samples",
    name: "reel-samples.mp4",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1PsfUqRn9iZUgrB4IVPSmMh0aH-VQ_bWc/view?usp=sharing",
    action: "Watch ↗",
  },
  {
    id: "web-projects",
    name: "web-projects.pending",
    category: "web",
    categoryLabel: "Web",
    status: "pending",
    action: "In progress",
  },
  {
    id: "ai-software-projects",
    name: "ai-software-projects.pending",
    category: "software",
    categoryLabel: "AI & Software",
    status: "pending",
    action: "In progress",
  },
  {
    id: "automation-case-studies",
    name: "automation-case-studies.pending",
    category: "automation",
    categoryLabel: "AI Automation",
    status: "pending",
    action: "In progress",
  },
  {
    id: "gohighlevel-builds",
    name: "gohighlevel-builds.pending",
    category: "gohighlevel",
    categoryLabel: "GoHighLevel",
    status: "pending",
    action: "In progress",
  },
];

export const graphicsNote =
  "Graphics & Video are published together on the live site — the video deliverables above are the current published creative work.";

export interface TimelineEntry {
  marker: string;
  period: string;
  description: string;
  status?: boolean;
}

/** Transcribed from #origin .timeline in index.html. */
export const experienceTimeline: TimelineEntry[] = [
  { marker: "01", period: "2014–19", description: "Customer support & tech assistance — the foundation." },
  { marker: "02", period: "2020–21", description: "Social media & web developer, Outsourced Doers." },
  { marker: "03", period: "2021–now", description: "Independent — running Aequora Digital." },
  { marker: "✓", period: "Status", description: "Active — web, software, and automation, connected.", status: true },
];

export const originStatement = {
  title: "Where this comes from.",
  body: "Before AI, automation, or code, there was troubleshooting — helping people and teams get unstuck, one ticket at a time. That instinct became Aequora Digital.",
};

/** Transcribed from #difference and #vow in index.html. */
export const differenceLines: string[] = [
  "I don't just build websites.",
  "I look at the entire digital workflow.",
  "A website might generate the lead.",
  "A CRM might organize it.",
  "Automation might follow up.",
  "AI might qualify it.",
  "A team member might close it.",
];
export const differenceStatus = "And the data from the entire process can tell the business what to improve next.";
export const differenceClosing = "That's the kind of system I like building.";

export const vow = {
  title: "AI is part of my workflow — not the product",
  lines: [
    { tag: "Craft", text: "AI speeds up prototyping and automates repetitive development — but it's still just a tool." },
    { tag: "Craft", text: "The important part is knowing what to build, why to build it, and how it fits the business." },
  ],
  intent: {
    tag: "Intent",
    text: "Combine AI with design thinking, development experience, and business understanding to build things that are actually useful.",
  },
};

export const contact = {
  email: "dc@aequoradigital.com",
  whatsapp: { display: "+63 995 315 1787", href: "https://wa.me/639953151787" },
  portfolio: { display: "Notion archive", href: "https://app.notion.com/p/1a9a2bae673880779176edcf0d9e264f?pvs=21" },
  resume: { display: "Static record", href: "/DC%20Miranda%20-%20Resume.html" },
  statement: "Let's build\nsomething useful.",
  body: "Whether you need a new website, a custom application, a GoHighLevel system, AI automation, graphics, video, or a combination of all of them — let's figure out what the business actually needs.",
  motto: "You bring the problem. I'll help build the system.",
};

/**
 * Real 6-step AI + Automation flow, transcribed from #ai-automation in
 * index.html: User -> Website -> CRM -> Automation -> AI -> Business Outcome.
 * Laid out here with light branching for visual interest in the 3D node
 * network (CRM and Automation as parallel stops feeding into AI before the
 * outcome), while every label and the overall order stays true to the real
 * content — nothing renamed beyond this layout choice.
 */
export const aiAutomationFlow = {
  title: "AI isn't a feature. It's part of the workflow.",
  body: "Keep the existing AI and automation approach at the center of how a digital system runs — from the first visit to the outcome the business actually wants.",
  nodes: [
    { key: "ai", label: "User" },
    { key: "data", label: "Website" },
    { key: "crm", label: "CRM" },
    { key: "workflow", label: "Automation" },
    { key: "logic", label: "AI" },
    { key: "result", label: "Business Outcome" },
  ],
};

/** Real GoHighLevel pipeline, transcribed from #ghl-flow in index.html. */
export const ghlFlow = {
  title: "GoHighLevel, beyond basic setup.",
  body: "CRM, funnels, pipelines, workflows, forms, calendars, email, SMS, and automation, connected into one system that moves a lead all the way to a client.",
  nodes: [
    { key: "leads", label: "Leads" },
    { key: "crm", label: "CRM" },
    { key: "pipeline", label: "Pipeline" },
    { key: "followup", label: "Follow-Up" },
    { key: "appointment", label: "Appointment" },
    { key: "client", label: "Client" },
  ],
  tags: ["CRM", "Funnels", "Pipelines", "Workflows", "Forms", "Calendars", "Email", "SMS", "Client Onboarding"],
};

/** Transcribed from #process in index.html. */
export const processSteps = [
  { no: "01", title: "Understand", body: "Before building anything, I want to understand the business, the audience, the problem, and the desired outcome." },
  { no: "02", title: "Plan", body: "I determine what the project actually needs — a website, software, CRM, automation, content, or a combination." },
  { no: "03", title: "Design", body: "I create the visual and user experience before turning the concept into a functional system." },
  { no: "04", title: "Build", body: "Using modern development tools and AI-assisted workflows, I turn the design into a fast, responsive, functional product." },
  { no: "05", title: "Connect", body: "I integrate the tools the business already uses — CRMs, forms, calendars, APIs, databases, and third-party platforms." },
  { no: "06", title: "Automate", body: "Where repetitive work exists, I look for ways to automate it using workflows, integrations, and AI." },
  { no: "07", title: "Improve", body: "A system isn't finished at launch. I look for ways to improve performance, usability, and efficiency over time." },
];

export const hero = {
  tag: "AI-Powered Web, Software & Automation",
  name: "DC MIRANDA",
  caps: ["AI", "WEB", "SOFTWARE", "AUTOMATION", "CREATIVE"],
  statement:
    "I combine design, content, AI, development, and automation to build digital experiences that look great, work efficiently, and help businesses move forward.",
  body: "From websites and custom software to graphics, video, GoHighLevel systems, and AI automation — I help turn ideas into working digital systems.",
  motto: "Design it. Build it. Automate it.",
};

export const wordReveal = [
  { key: "design", label: "DESIGN", text: "Web Design, UI/UX, Responsive Design, Interactive & Animated Interfaces, Brand Graphics, Creative Direction." },
  { key: "build", label: "BUILD", text: "Front-End Development, Next.js, AI Web Applications, Custom Software, Dashboards, Client Portals, API Integrations." },
  { key: "automate", label: "AUTOMATE", text: "AI Workflows, AI Agents, Business Automation, CRM Automation, GoHighLevel Workflows, Lead Nurturing." },
  { key: "create", label: "CREATE", text: "Video Editing, Motion Graphics, Promotional Video, Short-Form Content, Social Media Graphics, Digital Assets." },
];

export function projectsByCategory(category: CategoryId): Project[] {
  return projects.filter((p) => p.category === category);
}
