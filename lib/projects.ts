export interface ProjectSummary {
  slug: string;
  title: string;
  /** Shorter name for the projects grid; defaults to `title` when omitted */
  cardTitle?: string;
  description: string;
}

export interface ProjectDetail extends ProjectSummary {
  tags: string[];
  body: string[];
  /** Optional H2 sections with paragraphs (rendered after `body`) */
  subsections?: { heading: string; paragraphs: string[] }[];
  /** Optional two-column feature summary (e.g. feature → what it means) */
  featureTable?: { feature: string; meaning: string }[];
  /** Short closing paragraphs after the feature table */
  closingParagraphs?: string[];
  /** Public path under `/public`, e.g. `/images/saas-boilerplate.png` */
  image?: string;
  /** Google Drive file ID for an embedded video demo */
  video?: string;
  liveUrl?: string;
  /** Overrides the default “Visit live site” label for the primary external link */
  liveUrlLabel?: string;
  repoUrl?: string;
}

export const PROJECTS: ProjectDetail[] = [
  {
    slug: "saas-boilerplate",
    title: "SaaS Boilerplate",
    description:
      "Opinionated Turborepo starter for real SaaS products: Next.js app, standalone Hono API, Prisma + Postgres, Supabase Auth, and OpenAPI contracts shared end-to-end via Zod and workspace packages.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Hono",
      "Prisma",
      "PostgreSQL",
      "Supabase Auth",
      "OpenAPI",
      "Zod",
      "Turborepo",
      "pnpm",
    ],
    body: [
      "This boilerplate is built for teams who want a clean split between the customer-facing app and the API from day one. The web layer is Next.js (App Router); the API is a dedicated Hono server with its own process boundary, not a thin wrapper around route handlers. That keeps deploy units, scaling, and ownership obvious as the codebase grows.",
      "Every meaningful contract flows through Zod: request bodies, query params, and responses are validated at runtime, and the same schemas drive an OpenAPI document your frontend and third parties can trust. Shared DTOs and error shapes live in workspace packages so the web app, API, and future workers never drift silently.",
      "Data access goes through Prisma against Postgres, with migrations and a schema you own. Authentication is Supabase-backed—email and password, refreshable sessions, HTTP-only cookies where it matters, and hooks for OAuth and role-aware UI—so you can ship sign-up, sign-in, dashboards, and protected JSON without inventing auth infrastructure on week one.",
    ],
    subsections: [
      {
        heading: "Monorepo layout",
        paragraphs: [
          "The repo is organized as a pnpm + Turborepo workspace: one Next.js application for marketing and the authenticated product UI, one Hono service for HTTP APIs, and shared packages for database types, validation schemas, and OpenAPI artifacts. Turbo pipelines orchestrate type-checks, tests, and builds so CI stays fast as packages multiply.",
          "That layout means you can version and deploy the API independently from the web app, share code without copy-paste, and add packages later—billing webhooks, a background worker, or an admin CLI—without restructuring the tree.",
        ],
      },
      {
        heading: "API design with Hono",
        paragraphs: [
          "Routes are grouped with Hono’s composable routers: public endpoints for health and auth callbacks, authenticated routes for tenant-scoped resources, and consistent middleware for CORS, logging, and error formatting.",
          "Responses follow a small set of JSON envelopes so the Next.js app can branch predictably on success vs validation vs auth errors, and generated OpenAPI clients (or hand-rolled fetch wrappers) stay aligned with what the server actually returns.",
        ],
      },
      {
        heading: "Schema-first validation and docs",
        paragraphs: [
          "Zod schemas are the single source of truth. They validate inbound traffic, shape outbound DTOs, and feed OpenAPI generation so documentation is never a stale markdown file on the side.",
          "When the API changes, TypeScript surfaces mismatches in the web app at build time—especially valuable when multiple engineers touch the same feature across stacks.",
        ],
      },
      {
        heading: "Database and migrations",
        paragraphs: [
          "Prisma models map to Postgres tables with explicit relations, indexes where you need them for multi-tenant queries, and a migration history you can review in PRs. The API imports a thin data layer so route handlers stay focused on orchestration, not raw SQL.",
        ],
      },
      {
        heading: "Auth and sessions",
        paragraphs: [
          "Supabase Auth handles identity primitives while your Hono layer enforces session cookies, refresh flows, and server-side guards on protected routes. The starter wires common paths—sign up, sign in, password reset, and sign out—so you can extend with OAuth providers or organization invites without replacing the foundation.",
          "Role and permission checks are structured so UI gating and API authorization can share the same mental model as you introduce admin vs member vs billing roles.",
        ],
      },
      {
        heading: "Who it is for",
        paragraphs: [
          "Founding engineers who want a serious baseline before writing product-specific code.",
          "Agencies spinning up multiple SaaS MVPs where consistent API and auth patterns save review time.",
          "Teams migrating off a single Next.js API folder toward a dedicated service without a big-bang rewrite.",
        ],
      },
    ],
    featureTable: [
      {
        feature: "Split web + API",
        meaning: "Clear ownership and deploy story instead of everything living in one Next process.",
      },
      {
        feature: "Zod + OpenAPI",
        meaning: "Validated I/O and living API docs generated from the same definitions.",
      },
      {
        feature: "Prisma + Postgres",
        meaning: "Typed queries, migrations, and a database you can grow into multi-tenant workloads.",
      },
      {
        feature: "Supabase Auth",
        meaning: "Hosted identity with session patterns suited to dashboards and protected APIs.",
      },
      {
        feature: "Turborepo + pnpm",
        meaning: "Fast incremental builds and strict workspace boundaries between packages.",
      },
    ],
    closingParagraphs: [
      "The live demo mirrors the structure described above: browse the UI, hit documented endpoints, and use the repo as a template to start billing, teams, or vertical features on top of a stack that already agrees on types, auth, and API shape.",
    ],
    image: "/images/saas-boilerplate.png",
    liveUrl: "https://saas-monorepo.khalilbchir.pro/",
  },
  {
    slug: "blockbuilder",
    title: "BlockBuilder",
    description:
      "Launch and run your own blockchain network from one dashboard—configure nodes, deploy contracts, mint assets, and monitor health without deep infra expertise.",
    tags: ["Next.js", "Node.js", "Blockchain", "Web3", "Hyperledger Fabric"],
    body: [
      "BlockBuilder is a platform that lets organizations launch and manage their own blockchain network from a single dashboard—no deep technical expertise required. Teams can configure network settings, deploy smart contracts, create tokens and NFTs, control access permissions, and monitor network health in real time. From first setup to day-to-day operations, BlockBuilder handles the heavy lifting so you can focus on building.",
      "BlockBuilder is an all-in-one platform designed for organizations that want to build on blockchain technology without starting from scratch. It gives teams everything they need to launch, configure, and operate their own blockchain network from a single dashboard.",
    ],
    subsections: [
      {
        heading: "What it does",
        paragraphs: [
          "At its core, BlockBuilder removes the complexity of setting up blockchain infrastructure. What traditionally takes months of engineering work can be done in minutes. Organizations define their network, deploy it, and start operating, while BlockBuilder handles the heavy lifting behind the scenes.",
          "The platform is made up of two main components: a web dashboard where clients manage everything—networks, nodes, smart contracts, tokens, and access permissions—and a backend service that powers the dashboard, handling authentication, network operations, background jobs, and real-time status updates.",
        ],
      },
      {
        heading: "Network setup and configuration",
        paragraphs: [
          "Organizations can launch their own blockchain network by choosing a network name, defining participation rules, and configuring node layout. The platform supports both private enterprise networks with strict access control and more open participation models.",
        ],
      },
      {
        heading: "Smart contracts",
        paragraphs: [
          "Teams can write, review, and deploy smart contracts directly through the platform. All deployments are tracked and visible, making it easy to manage the lifecycle of on-chain logic as a product evolves.",
        ],
      },
      {
        heading: "Tokens and NFTs",
        paragraphs: [
          "BlockBuilder supports the creation and deployment of token and NFT contracts, enabling organizations to build product ecosystems with programmable business rules and digital assets.",
        ],
      },
      {
        heading: "Access control and permissions",
        paragraphs: [
          "Role-based access control lets organizations define who can view, operate, or administer different parts of the platform. This is especially valuable for enterprise and multi-team environments.",
        ],
      },
      {
        heading: "Monitoring and visibility",
        paragraphs: [
          "Built-in monitoring tools give teams real-time visibility into network health, node status, and on-chain activity. An integrated explorer makes it easier to understand and audit what is happening on the network.",
        ],
      },
      {
        heading: "Who it is for",
        paragraphs: [
          "Enterprises that need a private, auditable network with controlled participation.",
          "Product teams building ecosystems that rely on tokens, NFTs, or automated smart contract logic.",
          "Internal operations teams looking to reduce manual approvals and reconciliation through on-chain automation.",
          "Innovation and R&D teams that need a fast path to a working blockchain environment for prototyping.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Define your network by choosing a name, configuration, and participation rules.",
          "Deploy using BlockBuilder's provisioning system, which handles infrastructure setup automatically.",
          "Operate by monitoring the network, managing nodes, and deploying or updating contracts as your application grows.",
        ],
      },
      {
        heading: "What is included",
        paragraphs: [
          "A full client dashboard with onboarding, admin flows, and interfaces for networks, nodes, and smart contracts.",
          "A backend API managing authentication, network lifecycle, background processing, and real-time job feedback.",
          "Operational tooling for monitoring, upgrades, and scaling over time.",
          "Migration support for importing existing networks or contracts when needed.",
        ],
      },
    ],
    image: "/images/blockbuilder.png",
    video: "1M3qd9nR5WcdmKp0njiNiXLgr7wIjWLuf",
  },
  {
    slug: "awraaq",
    title: "AWRAAQ",
    cardTitle: "Awraaq",
    description:
      "PoC institutional trading platform—brokers and clients run RFQs, negotiate in real time, and settle on-chain with full EN/AR (RTL), themes, and RBAC.",
    tags: ["Next.js", "Node.js", "Vercel", "Microsoft Azure", "Supabase"],
    body: [
      "AWRAAQ is a proof-of-concept blockchain-powered institutional trading platform connecting brokers and clients through a structured deal flow. Brokers can create and send requests for quotes, while clients review, negotiate, and approve trade terms in real time through an interactive interface. Finalized deals are settled on-chain, providing an immutable audit trail from negotiation to confirmation. The platform supports English and Arabic with full RTL layout, dark and light themes, and role-based access control so broker and client experiences stay separate and secure.",
    ],
    subsections: [
      {
        heading: "What is AWRAAQ?",
        paragraphs: [
          "AWRAAQ is a professional web app where brokers (sellers and intermediaries) and clients (buyers) trade with each other. Instead of relying on scattered paperwork or unsecured email, they use the platform to lock in deals.",
          "Blockchain is the trust layer: it works like an unchangeable digital receipt that proves a trade happened exactly as agreed.",
        ],
      },
      {
        heading: "For brokers (the sellers)",
        paragraphs: [
          "Send quotes: create a request for quote (RFQ) to offer a deal to a client.",
          "Manage deals: a dashboard surfaces all active offers in one place.",
          "Negotiate: exchange messages with the client until you settle on a final price.",
          "Settle: once terms are agreed, the broker pushes the deal on-chain to complete the transaction.",
        ],
      },
      {
        heading: "For clients (the buyers)",
        paragraphs: [
          "Review offers: follow a deal flow of incoming offers from brokers.",
          "Haggle: send counter-offers when pricing or terms need adjustment.",
          "Approve: confirm the final terms with a single action.",
          "Track: use the settlement tracker to see exactly when the trade is finalized.",
        ],
      },
      {
        heading: "Key features for everyone",
        paragraphs: [
          "Arabic and English support: the entire app can switch languages, including right-to-left layouts for Arabic.",
          "Dark and light mode: choose a dark screen for long sessions or a standard light theme.",
          "Responsive layout: the experience is tuned to feel professional on desktop and mobile.",
          "Security first: broker and client areas are gated—you need the right role to see any trading data.",
        ],
      },
      {
        heading: "Why use blockchain for this?",
        paragraphs: [
          "Traditional workflows often invite disputes about who said what, or when a payment or confirmation really happened.",
          "Transparency: both sides reference the same source of truth for deal state.",
          "Immutability: once a trade is recorded on-chain, terms like price and timing cannot be quietly rewritten.",
          "Audit trail: every step from first offer to final settlement stays logged for institutional review.",
        ],
      },
    ],
    closingParagraphs: [
      "AWRAAQ replaces messy email and phone tag with a bilingual, role-aware dashboard. It aims to make block trading—moving large asset positions—faster, more transparent, and more secure for professional institutions.",
    ],
    image: "/images/awraaq.png",
    liveUrl: "https://awraaq.vercel.app",
  },
  {
    slug: "qistaschain",
    title: "Business Verification DApp",
    cardTitle: "Qistaschain",
    description:
      "Decentralized on-chain registry and reviews—wallet registration, admin-moderated approval, and immutable reputation for businesses.",
    tags: ["Next.js", "Blockchain", "Node.js", "Vercel", "Microsoft Azure"],
    body: [
      "Business Verification DApp is a decentralized on-chain registry and review system built with Web3 technologies. Businesses register their details via a connected wallet and go through an admin-moderated approval flow before becoming publicly listed. Once approved, verified businesses appear on the platform and are open to user reviews stored immutably on-chain. The system eliminates review manipulation and fraudulent listings by leveraging blockchain transparency and auditability, creating a trustless reputation layer for businesses.",
    ],
    subsections: [
      {
        heading: "What this app does",
        paragraphs: [
          "Think of it as a trust registry. Instead of a private company (like Google or Yelp) owning the data, the information is stored on a blockchain—a public, digital ledger that no single person can secretly change or delete.",
        ],
      },
      {
        heading: "For customers (the public)",
        paragraphs: [
          "Find legit businesses: you can browse a list of companies that have been officially vetted.",
          "See the stats: check how much money a company has raised and see their quality score.",
          "Leave reviews: you can rate businesses. To prevent spam, the system makes you wait a certain amount of time between reviews (a cooldown).",
        ],
      },
      {
        heading: "For business owners",
        paragraphs: [
          "Apply for a badge: you submit your business details to prove you are real.",
          "Build a reputation: once an admin approves you, your profile becomes public, showing your funding and your customer ratings.",
        ],
      },
      {
        heading: "How it stays safe (the gatekeepers)",
        paragraphs: [
          "The app does not let anyone do whatever they want. It uses different levels of authority to keep things honest:",
          "Managers: people who check applications and green-light businesses for the public list.",
          "Verifiers: people whose job is to double-check that a business's claims are true.",
          "The emergency brake: if something goes wrong (like a hack or a bug), a pauser can freeze the entire app instantly to protect everyone.",
        ],
      },
      {
        heading: "How do you log in?",
        paragraphs: [
          "There are no usernames or passwords. Instead, you use a digital wallet (like MetaMask). Your wallet acts as your ID card. When you want to leave a review or register a business, you sign it with your wallet. This proves it was really you and makes the action permanent.",
        ],
      },
    ],
    featureTable: [
      {
        feature: "Public registry",
        meaning: "A transparent list of every approved business.",
      },
      {
        feature: "Role-based access",
        meaning: "Only authorized people can approve businesses or change settings.",
      },
      {
        feature: "On-chain data",
        meaning: "Everything is recorded forever; no one can hide a bad review or fake their stats.",
      },
      {
        feature: "Real-time updates",
        meaning: "As soon as a business is approved or a review is left, it appears instantly.",
      },
    ],
    closingParagraphs: [
      "In short: it is a tool to make sure that when a business says they are successful and well-liked, they actually have the digital receipts to prove it.",
    ],
    image: "/images/qistas.png",
    video: "1Y02yeAHTf2Duk3oszzzU9cjMgFDgQYM0",
    liveUrl: "https://on-chain-review-system.vercel.app/",
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
