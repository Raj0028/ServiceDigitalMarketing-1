# Digital Marketing Platform

## Overview

This is a full-stack digital marketing inquiry platform designed to showcase advertising services across various social media and search platforms. Its primary purpose is to allow potential clients to submit inquiries for platform-specific advertising campaigns. The application features dedicated landing pages for eight major advertising platforms (Facebook, Instagram, Reddit, YouTube, Google, LinkedIn, TikTok, and Snapchat), each with customized messaging and inquiry forms. Additionally, it includes a dedicated landing page for Yash Saxena, highlighting his digital advertising expertise, global experience, and a portfolio of resources and case studies. The platform aims to connect businesses with expert digital marketing services, facilitating lead generation and showcasing professional capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React and TypeScript, using Vite for development and bundling. Wouter handles client-side routing, providing dynamic routes for platform-specific content. UI components are primarily sourced from shadcn/ui, built on Radix UI primitives, and styled with Tailwind CSS, supporting a custom design system and dark/light modes. State management utilizes TanStack Query for server state and API requests, while React Hook Form with Zod manages local form state and validation. SEO is managed via a custom `useSEO` hook for dynamic title, meta descriptions, Open Graph, and Twitter Card tags, with structured data (Schema.org JSON-LD) implemented for Organization, WebSite, Person, and Service schemas. Google Tag Manager is integrated for analytics.

### Backend Architecture

The backend is developed with Express.js on Node.js, also using TypeScript. It provides a RESTful API for inquiry submission, retrieval, and admin authentication. Key endpoints include `/api/inquiries` for submissions and retrieval, and `/api/auth` for user registration, login, and session management. Request processing includes JSON body parsing and logging. Centralized error handling returns structured responses.

### Data Storage Solutions

Data is stored in a PostgreSQL database accessed via the Neon serverless driver. Drizzle ORM provides type-safe database interactions, with schemas defined for `inquiries` (client details, platform, message) and `users` (admin credentials). Drizzle-Zod integration ensures schema validation, and Drizzle Kit manages database migrations.

### Authentication and Authorization

The platform uses session-based authentication via Passport.js with a local strategy. Security features include bcrypt for password hashing, first-user-only admin registration, and secure HTTP-only cookies for session management (24-hour expiry). Protected routes, such as the admin dashboard and inquiry retrieval endpoints, require authentication. Public routes include inquiry submission and all landing pages.

### System Design Choices

The architecture emphasizes a modern full-stack approach with a clear separation of concerns. The UI/UX focuses on accessibility and customizability through shadcn/ui and Tailwind CSS. The system prioritizes SEO with comprehensive meta tag management, sitemap, robots.txt, and structured data, ensuring high search visibility and AI bot accessibility. The domain for canonical URLs and sitemap is `servicedigitalmarketing.com`.

### International SEO & Global Targeting

**Hreflang Implementation (October 2025):**
The platform implements enhanced global SEO targeting using hreflang tags for all major English-speaking markets. This ensures equal search visibility across multiple countries:

**Target Markets:**
- `en-US` - United States
- `en-GB` - United Kingdom
- `en-CA` - Canada
- `en-AU` - Australia
- `en-IN` - India
- `x-default` - Global fallback for all other countries/languages

**Technical Implementation:**
- HTML `lang` attribute set to `en-US` (US English)
- Six hreflang tags in HTML `<head>` pointing to servicedigitalmarketing.com
- All hreflang tags use absolute URLs with HTTPS
- x-default serves as fallback for countries not explicitly targeted

**Structured Data Updates:**
- Organization Schema lists "United States" first in areaServed
- Service Schemas include language indicator (`en-US`)
- Person Schema mentions US market advertising expertise
- WebSite Schema includes `inLanguage: 'en-US'`

**Expected Impact:**
- Equal search priority in US, UK, Canada, Australia, and India
- Improved global organic visibility across all English-speaking markets
- Enhanced AI search engine recognition (ChatGPT Search, Perplexity, Claude)
- Better international SERP performance

**AI Bot Accessibility:**
The robots.txt explicitly allows all major AI search bots including OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, Amazonbot, and CCBot for maximum global AI-powered search visibility.

**Sitemap Management:**
A fully automatic sitemap system (`scripts/generate-sitemap.ts`) generates and updates the sitemap on every server startup. The system:
- Automatically reads routes from `client/src/App.tsx` using regex parsing
- Generates `client/public/sitemap.xml` with all public routes
- Intelligently assigns priorities based on route patterns (1.0 for homepage, 0.95 for Yash Saxena, 0.9 for platform ads, 0.8 for other pages)
- Auto-updates lastmod dates to current date
- Automatically excludes admin, login, and thank-you pages (noindex)
- Uses servicedigitalmarketing.com as the domain
- Runs automatically on server startup via `server/index.ts`

**Zero manual steps required** - just add routes to App.tsx and the sitemap updates automatically. See `SITEMAP-GUIDE.md` for complete documentation.

## External Dependencies

### UI Libraries

- Radix UI primitives
- shadcn/ui
- Tailwind CSS
- Lucide React
- React Icons

### Form Handling

- React Hook Form
- Zod
- @hookform/resolvers

### Database & ORM

- Neon Database (PostgreSQL)
- Drizzle ORM
- Drizzle Kit

### Authentication

- Passport.js
- passport-local
- bcrypt
- express-session

### Development Tools

- Vite
- tsx
- esbuild

### Routing & State

- Wouter
- TanStack Query

### Utility Libraries

- date-fns
- clsx
- class-variance-authority
- nanoid