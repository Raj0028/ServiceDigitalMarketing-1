# Digital Marketing Platform

## Overview

This is a full-stack digital marketing inquiry platform that showcases advertising services across multiple social media and search platforms. The application allows potential clients to submit inquiries for platform-specific advertising campaigns and redirects them to thank-you pages upon successful submission.

The platform features dedicated landing pages for eight major advertising platforms (Facebook, Instagram, Reddit, YouTube, Google, LinkedIn, TikTok, and Snapchat), each with customized messaging, statistics, and inquiry forms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight routing library. Each platform has dedicated landing and thank-you pages with dynamic routes.

**UI Components**: Heavily utilizes shadcn/ui component library built on Radix UI primitives, providing a comprehensive set of accessible, customizable components (buttons, forms, dialogs, cards, etc.). Styling is handled through Tailwind CSS with a custom design system defined in CSS variables.

**State Management**: TanStack Query (React Query) manages server state, API requests, and data caching. Form state is managed locally using React Hook Form with Zod schema validation.

**Design System**: Custom theming with CSS variables for colors, typography, shadows, and spacing. Supports both light and dark modes through class-based theme switching.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Development Setup**: Custom Vite integration in development mode provides HMR (Hot Module Replacement) and middleware mode for seamless frontend-backend integration. Production builds serve static assets from the dist directory.

**API Design**: RESTful API with routes defined in `server/routes.ts`:
- `POST /api/inquiries` - Submit new inquiry
- `GET /api/inquiries` - Retrieve all inquiries
- `GET /api/inquiries/:platform` - Get platform-specific inquiries

**Request Processing**: JSON body parsing with raw body preservation for potential webhook integrations. Request/response logging middleware tracks API performance and responses.

**Error Handling**: Centralized error handling with Zod validation errors returning structured 400 responses, and general errors returning 500 status codes.

### Data Storage Solutions

**Database**: PostgreSQL accessed via Neon serverless driver for connection pooling and edge compatibility.

**ORM**: Drizzle ORM provides type-safe database operations with schema-first approach. Schema definitions include:
- `inquiries` table: Stores client inquiries with name, phone, email, country, message, platform, and timestamp
- `users` table: Stores user authentication data (currently unused but scaffolded)

**Schema Validation**: Drizzle-Zod integration generates Zod schemas from database schema, ensuring runtime validation matches database constraints.

**Storage Abstraction**: `IStorage` interface with in-memory implementation (`MemStorage`) for development/testing. Can be swapped for database implementation without changing business logic.

**Migration Strategy**: Drizzle Kit handles schema migrations with `db:push` command for applying changes to PostgreSQL database.

### Authentication and Authorization

**Current State**: User schema exists but authentication is not implemented. The application currently has no authentication layer, making all inquiry endpoints publicly accessible.

**Planned Architecture**: User table structure supports username/password authentication, suggesting future implementation of session-based or token-based authentication.

### External Dependencies

**UI Libraries**:
- Radix UI primitives for accessible component foundation
- shadcn/ui for pre-built component library
- Tailwind CSS for utility-first styling
- Lucide React for iconography
- React Icons for social media icons

**Form Handling**:
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for validation integration

**Database & ORM**:
- Neon Database serverless PostgreSQL
- Drizzle ORM for database operations
- Drizzle Kit for migrations

**Development Tools**:
- Vite for build tooling and dev server
- tsx for TypeScript execution
- esbuild for production server bundling
- Replit-specific plugins for development experience

**Routing & State**:
- Wouter for client-side routing
- TanStack Query for server state management

**Utility Libraries**:
- date-fns for date manipulation
- clsx and class-variance-authority for conditional class names
- nanoid for unique ID generation