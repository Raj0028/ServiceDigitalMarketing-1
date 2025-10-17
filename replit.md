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