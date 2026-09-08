/**
 * Single source of truth for real DC Miranda content. Transcribed from
 * index.html (feature/system-portfolio-rebuild) and "DC Miranda -
 * Resume.html" — the richer per-project blurbs and the resume timeline
 * below come verbatim from the latter. Nothing here is invented.
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
  bg: string; // pastel section/card background
  accent: string; // saturated foreground color for headings/links on that card
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
    bg: "#eaf4ff",
    accent: "#2054c9",
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
    bg: "#f3ecff",
    accent: "#6d28d9",
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
    bg: "#eafff3",
    accent: "#047857",
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
    bg: "#fff8e6",
    accent: "#b45309",
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
    bg: "#fff0f5",
    accent: "#be185d",
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
    bg: "#eef1ff",
    accent: "#4338ca",
  },
];

export interface Project {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  category: CategoryId;
  categoryLabel: string;
  status: "live" | "pending";
  href?: string;
  blurb?: string;
  action: string;
}

/**
 * The six published rows, with blurbs carried over verbatim from the
 * "Project proof and portfolio links" section of DC Miranda - Resume.html
 * (that file already existed on the live site — this doesn't invent new
 * copy, just reuses the richer description written for the resume page).
 * The four pending rows mirror #work-listing on index.html exactly.
 */
export const projects: Project[] = [
  {
    id: "ai-talking-head-demo",
    slug: "ai-talking-head-demo",
    name: "ai-talking-head-demo.mp4",
    displayName: "AI Talking Head Demo",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1DGOQpx4uDRX8DFot35eGjw-N-eCvDx5M/view?usp=sharing",
    blurb: "Showcases AI-assisted content creation and polished digital presentation.",
    action: "Watch",
  },
  {
    id: "course-walkthrough",
    slug: "course-walkthrough",
    name: "course-walkthrough.mp4",
    displayName: "Course Walkthrough Video",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1mZFJ7r3PKA64NUfgIn2ZR1ZMYZUsGNu5/view?usp=sharing",
    blurb: "Demonstrates intuitive structure, pacing, and polished delivery for learning experiences.",
    action: "Watch",
  },
  {
    id: "ai-assisted-talking-head",
    slug: "ai-assisted-talking-head",
    name: "ai-assisted-talking-head.mp4",
    displayName: "Talking Head Production",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1Oo-IFk9EyPYk-J_4zcyTdXfiy5Z8CfcZ/view?usp=sharing",
    blurb: "Highlights AI media workflows, editing, and content assembly in a polished package.",
    action: "Watch",
  },
  {
    id: "course-explainer-walkthrough",
    slug: "course-explainer-walkthrough",
    name: "course-explainer-walkthrough.mp4",
    displayName: "Course Explainer Walkthrough",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/10pPppvF0aScidHWUu0uFMUIMGSHQSs1A/view?usp=drive_link",
    blurb: "Shows structured explainers designed for product education and client understanding.",
    action: "Watch",
  },
  {
    id: "social-media-reels",
    slug: "social-media-reels",
    name: "social-media-reels.mp4",
    displayName: "Social Media Reels",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1DhlfNliYJYvNu4ylvCxjvP59sYaB1jgl/view?usp=drive_link",
    blurb: "Short-form visual work and campaign-style storytelling examples.",
    action: "Watch",
  },
  {
    id: "reel-samples",
    slug: "reel-samples",
    name: "reel-samples.mp4",
    displayName: "Additional Reel Sample",
    category: "video",
    categoryLabel: "Graphics/Video",
    status: "live",
    href: "https://drive.google.com/file/d/1PsfUqRn9iZUgrB4IVPSmMh0aH-VQ_bWc/view?usp=sharing",
    blurb: "More examples of short-form digital content and visual execution.",
    action: "Watch",
  },
  {
    id: "web-projects",
    slug: "web-projects",
    name: "web-projects.pending",
    displayName: "Web Projects",
    category: "web",
    categoryLabel: "Web",
    status: "pending",
    action: "In progress",
  },
  {
    id: "ai-software-projects",
    slug: "ai-software-projects",
    name: "ai-software-projects.pending",
    displayName: "AI & Software Projects",
    category: "software",
    categoryLabel: "AI & Software",
    status: "pending",
    action: "In progress",
  },
  {
    id: "automation-case-studies",
    slug: "automation-case-studies",
    name: "automation-case-studies.pending",
    displayName: "Automation Case Studies",
    category: "automation",
    categoryLabel: "AI Automation",
    status: "pending",
    action: "In progress",
  },
  {
    id: "gohighlevel-builds",
    slug: "gohighlevel-builds",
    name: "gohighlevel-builds.pending",
    displayName: "GoHighLevel Builds",
    category: "gohighlevel",
    categoryLabel: "GoHighLevel",
    status: "pending",
    action: "In progress",
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
export function projectsByCategory(category: CategoryId): Project[] {
  return projects.filter((p) => p.category === category);
}

export interface TimelineEntry {
  role: string;
  period: string;
  description: string;
}

/** Verbatim from the "Experience and strengths" section of the resume
 * page — richer phrasing than the homepage's shorter origin-story
 * version, and this is the one used on /resume. */
export const resumeTimeline: TimelineEntry[] = [
  {
    role: "Freelance Web & Digital Growth Specialist",
    period: "2021–Present",
    description: "Built digital experiences, automation systems, landing pages, and campaign support around growth goals.",
  },
  {
    role: "Web & Social Media Developer, Outsourced Doers",
    period: "2020–2021",
    description: "Delivered websites and branded multimedia content for clients in a fast-paced service environment.",
  },
  {
    role: "Support, Operations, and Marketing Experience",
    period: "2014–2019",
    description: "Developed client handling, coordination, and problem-solving skills that travel well into modern web and product work.",
  },
];

/** Shorter homepage version, transcribed from #origin in index.html. */
export const originStatement = {
  title: "Where this comes from.",
  body: "Before AI, automation, or code, there was troubleshooting — helping people and teams get unstuck, one ticket at a time. That instinct became Aequora Digital.",
};

export const resumeStats = [
  { title: "Full-stack mindset", body: "Front end, backend logic, integrations, and launch-ready execution." },
  { title: "AI-assisted delivery", body: "Content, automation, workflow design, and faster execution with modern tools." },
  { title: "Growth-ready UX", body: "Designed to support lead capture, conversions, and digital experiences." },
  { title: "Business-focused", body: "Built for service businesses, membership products, and client-facing platforms." },
];

export const resumeCapabilities = [
  { title: "Modern websites", body: "Landing pages, service business sites, and polished marketing websites designed to look sharp and convert." },
  { title: "Membership portals", body: "Client areas, course portals, gated content, dashboards, and onboarding experiences that feel structured and professional." },
  { title: "Automation and CRM", body: "Forms, lead routing, follow-up automation, pipelines, and integrations that support smoother business operations." },
  { title: "SEO and performance", body: "Search-friendly structure, discoverability, and performance-oriented thinking that helps sites get found and used." },
];

export const techStack = [
  "HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "SQL",
  "WordPress", "GoHighLevel", "Zapier", "Notion", "ChatGPT", "Descript", "CapCut",
];

/** Real 6-step AI + Automation flow, transcribed from #ai-automation in
 * index.html: User -> Website -> CRM -> Automation -> AI -> Business Outcome. */
export const aiAutomationFlow = {
  title: "AI isn't a feature. It's part of the workflow.",
  body: "Keep the existing AI and automation approach at the center of how a digital system runs — from the first visit to the outcome the business actually wants.",
  steps: ["User", "Website", "CRM", "Automation", "AI", "Business Outcome"],
};

/** Real GoHighLevel pipeline, transcribed from #ghl-flow in index.html. */
export const ghlFlow = {
  title: "GoHighLevel, beyond basic setup.",
  body: "CRM, funnels, pipelines, workflows, forms, calendars, email, SMS, and automation, connected into one system that moves a lead all the way to a client.",
  steps: ["Leads", "CRM", "Pipeline", "Follow-Up", "Appointment", "Client"],
  tags: ["CRM", "Funnels", "Pipelines", "Workflows", "Forms", "Calendars", "Email", "SMS", "Client Onboarding"],
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
  statement: "Let's build something useful.",
  body: "Whether you need a new website, a custom application, a GoHighLevel system, AI automation, graphics, video, or a combination of all of them — let's figure out what the business actually needs.",
  motto: "You bring the problem. I'll help build the system.",
};

export const hero = {
  eyebrow: "AI-Powered Web, Software & Automation",
  greeting: "Hi, I'm DC,",
  role: "Full-Stack Web Developer",
  statement:
    "I combine design, content, AI, development, and automation to build digital experiences that look great, work efficiently, and help businesses move forward.",
  body: "From websites and custom software to graphics, video, GoHighLevel systems, and AI automation — I help turn ideas into working digital systems.",
};

export const processSteps = [
  { no: "01", title: "Understand", body: "Before building anything, I want to understand the business, the audience, the problem, and the desired outcome." },
  { no: "02", title: "Plan", body: "I determine what the project actually needs — a website, software, CRM, automation, content, or a combination." },
  { no: "03", title: "Design", body: "I create the visual and user experience before turning the concept into a functional system." },
  { no: "04", title: "Build", body: "Using modern development tools and AI-assisted workflows, I turn the design into a fast, responsive, functional product." },
  { no: "05", title: "Connect", body: "I integrate the tools the business already uses — CRMs, forms, calendars, APIs, databases, and third-party platforms." },
  { no: "06", title: "Automate", body: "Where repetitive work exists, I look for ways to automate it using workflows, integrations, and AI." },
  { no: "07", title: "Improve", body: "A system isn't finished at launch. I look for ways to improve performance, usability, and efficiency over time." },
];
