# Digital Marketing Platform

## Overview

This is a full-stack digital marketing inquiry platform that showcases advertising services across multiple social media and search platforms. The application allows potential clients to submit inquiries for platform-specific advertising campaigns and redirects them to thank-you pages upon successful submission.

The platform features dedicated landing pages for eight major advertising platforms (Facebook, Instagram, Reddit, YouTube, Google, LinkedIn, TikTok, and Snapchat), each with customized messaging, statistics, and inquiry forms. Additionally, there is a dedicated landing page for Yash Saxena at `/yash-saxena` showcasing his digital advertising expertise with 6.2+ years experience across global markets (India, Asia-Pacific, Middle East, US, Canada, Europe) with portfolio resources and case studies.

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
- `POST /api/inquiries` - Submit new inquiry (public)
- `GET /api/inquiries` - Retrieve all inquiries (requires authentication)
- `GET /api/inquiries/:platform` - Get platform-specific inquiries (requires authentication)
- `POST /api/auth/register` - Register first admin user (restricted to first user only)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Check authentication status
- `GET /api/auth/can-register` - Check if registration is available

**Request Processing**: JSON body parsing with raw body preservation for potential webhook integrations. Request/response logging middleware tracks API performance and responses.

**Error Handling**: Centralized error handling with Zod validation errors returning structured 400 responses, and general errors returning 500 status codes.

### Data Storage Solutions

**Database**: PostgreSQL accessed via Neon serverless driver for connection pooling and edge compatibility.

**ORM**: Drizzle ORM provides type-safe database operations with schema-first approach. Schema definitions include:
- `inquiries` table: Stores client inquiries with name, phone, email, country, message, platform, and timestamp
- `users` table: Stores admin user credentials (username and bcrypt-hashed password)

**Schema Validation**: Drizzle-Zod integration generates Zod schemas from database schema, ensuring runtime validation matches database constraints.

**Storage Abstraction**: `DatabaseStorage` implementation using PostgreSQL via Drizzle ORM. Provides methods for user management (getUser, getUserByUsername, getAllUsers, createUser) and inquiry management (createInquiry, getInquiries, getInquiriesByPlatform).

**Migration Strategy**: Drizzle Kit handles schema migrations with `db:push` command for applying changes to PostgreSQL database.

### Authentication and Authorization

**Implementation**: Session-based authentication using Passport.js with local strategy for username/password authentication.

**Security Features**:
- **Password Hashing**: bcrypt with 12 salt rounds for secure password storage
- **First-User-Only Registration**: Admin registration restricted to first user only (prevents unauthorized admin creation)
- **Protected Endpoints**: All inquiry read endpoints require authentication
- **Session Management**: Express-session with secure HTTP-only cookies (24-hour expiry)

**Authentication Flow**:
1. First-time setup: User creates admin account at `/login` (only available when no users exist)
2. Subsequent access: Users login at `/login` with username/password
3. Protected access: Admin dashboard at `/admin` requires authentication, redirects to login if not authenticated
4. Logout: Clears session and redirects to login page

**Access Control**:
- Public routes: Inquiry submission (`POST /api/inquiries`), all landing pages
- Protected routes: Admin dashboard (`/admin`), inquiry retrieval (`GET /api/inquiries`, `GET /api/inquiries/:platform`)
- Admin-only: CSV export functionality for downloading all inquiry data

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

**Authentication**:
- Passport.js for authentication strategy
- passport-local for username/password authentication
- bcrypt for password hashing
- express-session for session management

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

## Recent Updates (October 2025)

### Yash Saxena Landing Page Enhancements

**Contact Section**:
- WhatsApp button now displays WhatsApp logo (SiWhatsapp icon)
- Email changed from button to text display with Mail icon
- Email displayed as: yashsaxena.personal@gmail.com

**Global Experience**:
- Added "Middle East" region to global markets coverage
- Complete coverage: India, Asia-Pacific, Middle East, United States, Canada, Europe

**New Resources Section**:
Added "Campaign Resources & Case Studies" section with three external resource links:

1. **Facebook, Instagram & Google Ads Screenshots**
   - Google Slides presentation with real campaign examples
   - Link: https://docs.google.com/presentation/d/1zqvyAQIz5sI1x5Ic_3CJzANhuuZ37eof/edit

2. **Reddit Ads Screenshots**
   - Specialized Reddit advertising campaign deck
   - Link: https://docs.google.com/presentation/d/15Y8fziafk6P7A2_OYN2SVLTWtvVedQdR/edit

3. **Data Analytics Performance Report**
   - Detailed campaign metrics and performance analysis spreadsheet
   - Link: https://docs.google.com/spreadsheets/d/1fJ6CNZZ5FZeWywg6iWS7GFgpuGe7I8YpGob1UgfI9KM/edit

All resource links open in new tabs with proper security attributes (target="_blank", rel="noopener noreferrer").

### SEO Implementation (October 2025)

**Custom SEO Hook**:
- Created `useSEO` hook at `client/src/hooks/use-seo.ts` for dynamic SEO management
- Hook manages document title, meta description, and Open Graph tags
- Properly handles optional fields (ogImage, ogUrl) by removing stale tags during navigation
- Supports Twitter Card metadata for better social media sharing

**Meta Tags Implementation**:
- **Document Title**: Unique, descriptive titles for every page
- **Meta Description**: Concise, keyword-rich descriptions for search engines
- **Open Graph Tags**: og:title, og:description, og:type for social media sharing
- **Twitter Cards**: twitter:card, twitter:title, twitter:description for Twitter optimization
- **Fallback Metadata**: Default title and description in `client/index.html`

**SEO Coverage**:
- ✅ Home page with platform overview
- ✅ 8 platform-specific pages (Facebook, Instagram, Reddit, YouTube, Google, LinkedIn, TikTok, Snapchat)
- ✅ Yash Saxena profile page
- ✅ Contact page
- ✅ 9 thank-you pages (8 platform-specific + contact)

**Technical Details**:
- SEO updates occur on component mount via React useEffect
- Dynamic meta tag creation/update/removal prevents stale metadata
- Client-side navigation properly refreshes all SEO metadata
- Tested and verified across all pages with end-to-end tests

### Contact Page Completion (October 2025)

**Contact Thank You Page**:
- Created `/contact-thank-you` page for successful contact form submissions
- Follows the same design pattern as other thank-you pages with platform-neutral messaging
- Includes success checkmark, confirmation message, and "What's Next?" steps
- Properly integrated with SEO metadata (title and description)

**Schema Update**:
- Added "contact" to the platform enum in `shared/schema.ts`
- Enables contact form submissions to be properly validated and stored
- Contact inquiries now stored in database alongside platform-specific inquiries

**Routing**:
- Added ContactThankYou route at `/contact-thank-you` in App.tsx
- Form submission from contact page redirects to thank you page
- Full end-to-end flow tested and verified

**Testing**:
- E2E test confirms: navigation to /contact, form field validation, submission to API
- Verified successful redirect to /contact-thank-you after form submission
- All UI elements and user interactions working as expected

### Comprehensive Technical SEO Implementation (October 2025)

**Sitemap & Robots Configuration**:
- Created `client/public/sitemap.xml` with all 11 public pages
- Sitemap includes: home, 8 platform ad pages, Yash Saxena profile, contact
- Sitemap priorities: 1.0 (home), 0.95 (Yash profile), 0.9 (platform pages), 0.8 (contact)
- Created `client/public/robots.txt` allowing all crawlers with proper disallow rules
- Robots.txt blocks: /admin, /login, all thank-you pages
- Sitemap reference included in robots.txt

**Enhanced useSEO Hook**:
- Added canonical URL support for proper page identification
- Added robots meta tag support (noindex, nofollow) for private pages
- Improved Open Graph URL handling with automatic cleanup
- All meta tags dynamically updated on route changes

**Structured Data (Schema.org JSON-LD)**:
- Created `StructuredData` component for Schema.org markup
- **Organization Schema**: Company information on home page
- **WebSite Schema**: Site-wide search and navigation data on home page
- **Person Schema**: Yash Saxena professional profile on /yash-saxena
- **Service Schema**: Platform-specific advertising services on all ad pages

**Page-Level SEO Configuration**:
- **Public Pages**: Canonical URLs set for all 11 public pages
- **Private Pages**: noindex meta tag on admin, login, and all thank-you pages
- **Home Page**: Organization + WebSite structured data
- **Platform Pages**: Service structured data with platform-specific details
- **Yash Saxena Page**: Person structured data with professional details

**Google Tag Manager Integration**:
- GTM container (GTM-K2K5RQG3) added to client/index.html
- Tracks user interactions and conversion events across the site

**SEO Best Practices Implemented**:
- Unique titles and descriptions on all 22+ pages
- Proper meta robots tags preventing duplicate content indexing
- Canonical URLs avoiding content duplication issues
- Structured data enhancing rich snippet eligibility
- XML sitemap facilitating efficient crawling
- Robots.txt providing clear crawler guidance

**Testing & Verification**:
- E2E tests confirmed sitemap accessibility and correctness
- Verified canonical URLs on all public pages
- Confirmed noindex tags on private pages
- Validated structured data rendering on appropriate pages
- All SEO meta tags verified across different page types

**Domain Configuration (October 2025)**:
- Updated all canonical URLs from yashsaxena.replit.app to servicedigitalmarketing.com
- Updated sitemap.xml to use servicedigitalmarketing.com domain
- Updated robots.txt sitemap reference to servicedigitalmarketing.com
- All SEO meta tags and Open Graph URLs now reference servicedigitalmarketing.com
- Domain change applied across all 11 public pages