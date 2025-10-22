# 🚀 Service Digital Marketing Platform

A full-stack digital marketing inquiry platform showcasing advertising services across 8 major social media and search platforms (Facebook, Instagram, Reddit, YouTube, Google, LinkedIn, TikTok, Snapchat).

## ✨ Features

- 🎯 **11 Public Pages**: Landing pages for 8 advertising platforms + Yash Saxena profile + Contact + Home
- 🔐 **Admin Dashboard**: Secure authentication with session management
- 📊 **Inquiry Management**: Form submissions stored in PostgreSQL database
- 🗺️ **Automatic Sitemap**: SEO-optimized sitemap that auto-updates on server start
- 🌍 **Global SEO**: Hreflang tags, structured data, canonical URLs for 6 markets
- 📱 **Responsive Design**: Mobile-first UI with Tailwind CSS + shadcn/ui
- 🔄 **Form Validation**: React Hook Form + Zod schema validation
- 📈 **GTM Integration**: Google Tag Manager for analytics

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Windows Setup](#windows-setup)
  - [Mac/Linux Setup](#maclinux-setup)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Deployment to Vercel](#deployment-to-vercel)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

### Required for All Platforms

1. **Node.js** (v18.0.0 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Git**
   - Download: https://git-scm.com/
   - Verify: `git --version`

4. **PostgreSQL Database** (Choose one):
   - **Option A**: Local PostgreSQL (v12+) - [Download](https://www.postgresql.org/download/)
   - **Option B**: [Neon](https://neon.tech) (Recommended - Free tier available)
   - **Option C**: [Supabase](https://supabase.com) (Free tier available)
   - **Option D**: [ElephantSQL](https://www.elephantsql.com) (Free tier available)

---

## 📦 Installation

### Clone the Repository

```bash
git clone https://github.com/Raj0028/ServiceDigitalMarketing-1.git
cd ServiceDigitalMarketing-1
```

---

### Windows Setup

#### Step 1: Install Dependencies

Open **Command Prompt** or **PowerShell** as Administrator:

```cmd
npm install
```

#### Step 2: Setup PostgreSQL Database

**Option A: Using Neon (Recommended for Windows)**

1. Create free account at https://neon.tech
2. Create a new project
3. Copy the connection string (looks like):
   ```
   postgresql://username:password@host.neon.tech/database?sslmode=require
   ```

**Option B: Using Local PostgreSQL**

1. Install PostgreSQL from https://www.postgresql.org/download/windows/
2. During installation, remember your password
3. Open **pgAdmin 4** or **SQL Shell (psql)**
4. Create database:
   ```sql
   CREATE DATABASE servicedigitalmarketing;
   ```
5. Your connection string will be:
   ```
   postgresql://postgres:YOUR_PASSWORD@localhost:5432/servicedigitalmarketing
   ```

#### Step 3: Create Environment File

Create a file named `.env` in the project root:

```cmd
type nul > .env
notepad .env
```

Copy and paste the content from `.env.example` and fill in your values:

```env
DATABASE_URL=postgresql://your-database-connection-string
ADMIN_EMAIL=yashsaxena.personal@gmail.com
ADMIN_PASSWORD=your-secure-password
ADMIN_ID=admin-1
SESSION_SECRET=generate-random-string-here
PORT=5000
NODE_ENV=development
HOST=localhost
```

**⚠️ IMPORTANT FOR WINDOWS:** The `HOST=localhost` line is **required on Windows** to avoid socket binding errors (`ENOTSUP`). Don't remove it!

**Generate SESSION_SECRET:**
```cmd
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Step 4: Initialize Database

```cmd
npm run db:push
```

#### Step 5: Run Development Server

**Option A: Using npm script (Recommended)**
```cmd
npm run dev
```

**Option B: Direct command (if Option A fails)**
```cmd
npx tsx server/index.ts
```

**Option C: Using Git Bash (if installed)**
```bash
npm run dev
```

#### Step 6: Open Browser

Visit: **http://localhost:5000**

---

### Mac/Linux Setup

#### Step 1: Install Dependencies

```bash
npm install
```

#### Step 2: Setup PostgreSQL Database

**Option A: Using Neon (Recommended)**

1. Create free account at https://neon.tech
2. Create a new project
3. Copy the connection string

**Option B: Using Homebrew (Mac)**

```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create database
createdb servicedigitalmarketing
```

**Option C: Using apt (Ubuntu/Debian)**

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb servicedigitalmarketing
```

#### Step 3: Create Environment File

```bash
# Copy example file
cp .env.example .env

# Edit with your preferred editor
nano .env
# or
vim .env
# or
code .env
```

Fill in your values:

```env
DATABASE_URL=postgresql://your-database-connection-string
ADMIN_EMAIL=yashsaxena.personal@gmail.com
ADMIN_PASSWORD=your-secure-password
ADMIN_ID=admin-1
SESSION_SECRET=generate-random-string-here
PORT=5000
NODE_ENV=development
```

**Generate SESSION_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Step 4: Initialize Database

```bash
npm run db:push
```

#### Step 5: Run Development Server

```bash
npm run dev
```

#### Step 6: Open Browser

Visit: **http://localhost:5000**

---

## ⚙️ Configuration

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `ADMIN_EMAIL` | ✅ Yes | Admin login email | `admin@example.com` |
| `ADMIN_PASSWORD` | ✅ Yes | Admin login password | `SecurePass123!` |
| `ADMIN_ID` | ⚠️ Optional | Admin user ID | `admin-1` (default) |
| `SESSION_SECRET` | ✅ Yes | Secret for session encryption | Random 64-char string |
| `PORT` | ⚠️ Optional | Server port | `5000` (default) |
| `NODE_ENV` | ⚠️ Optional | Environment mode | `development` or `production` |

### Security Best Practices

1. **Never commit `.env` to Git** (already in `.gitignore` ✅)
2. **Use strong passwords** (min 12 characters with symbols)
3. **Generate unique SESSION_SECRET** for each environment
4. **Use different credentials** for development vs production
5. **Rotate secrets regularly** in production

---

## 🏃 Running Locally

### Development Mode

**Windows (Command Prompt):**
```cmd
npm run dev
```

**Windows (Git Bash) / Mac / Linux:**
```bash
npm run dev
```

**Expected Output:**
```
🗺️  Generating sitemap from routes...
✅ Sitemap updated successfully
serving on port 5000
```

### Verify Installation

Visit these URLs to confirm everything works:

- ✅ Homepage: http://localhost:5000
- ✅ Facebook Ads: http://localhost:5000/facebook-ads
- ✅ Contact: http://localhost:5000/contact
- ✅ Yash Saxena: http://localhost:5000/yash-saxena
- ✅ Login: http://localhost:5000/login
- ✅ Sitemap: http://localhost:5000/sitemap.xml

### First-Time Admin Setup

1. Visit: http://localhost:5000/login
2. Click **"Create Admin Account"** (only available first time)
3. Enter credentials from your `.env` file:
   - Email: `ADMIN_EMAIL` value
   - Password: `ADMIN_PASSWORD` value
4. Login and access admin dashboard

---

## 🚀 Deployment to Vercel

### Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **PostgreSQL Database**: Must use Neon, Supabase, or other cloud database (not localhost)

### Deployment Steps

#### Method 1: Using Vercel CLI (Recommended)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Login to Vercel**
```bash
vercel login
```

**Step 3: Deploy**
```bash
vercel
```

**Step 4: Add Environment Variables**

When prompted, add these secrets:
- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`

Or add them via Vercel dashboard:
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add all variables from `.env.example`

**Step 5: Deploy to Production**
```bash
vercel --prod
```

#### Method 2: Using Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure project

3. **Add Environment Variables**
   - Click **Environment Variables**
   - Add all variables from `.env.example`
   - Click **Deploy**

### Vercel Environment Variables Setup

Add these in **Vercel Dashboard → Settings → Environment Variables**:

```
DATABASE_URL=postgresql://your-neon-connection-string
ADMIN_EMAIL=yashsaxena.personal@gmail.com
ADMIN_PASSWORD=your-secure-production-password
ADMIN_ID=admin-1
SESSION_SECRET=different-secret-than-local
NODE_ENV=production
```

⚠️ **Important**: Use **different values** for production (especially `SESSION_SECRET` and `ADMIN_PASSWORD`)

### Post-Deployment Verification

1. Visit your Vercel URL (e.g., `your-project.vercel.app`)
2. Test all pages load correctly
3. Submit a test inquiry form
4. Login to admin dashboard
5. Verify inquiries appear in database

---

## 📁 Project Structure

```
ServiceDigitalMarketing-1/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── pages/          # All page components
│   │   │   ├── home.tsx
│   │   │   ├── facebook-ads.tsx
│   │   │   ├── yash-saxena.tsx
│   │   │   └── ...
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   └── structured-data.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── use-seo.ts  # SEO meta tag management
│   │   ├── lib/            # Utility functions
│   │   └── App.tsx         # Main app with routing
│   ├── public/             # Static assets
│   │   ├── sitemap.xml     # Auto-generated sitemap
│   │   └── robots.txt      # SEO crawler instructions
│   └── index.html          # HTML entry point
├── server/                  # Backend Express server
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API route handlers
│   ├── auth.ts             # Passport.js authentication
│   ├── storage.ts          # Database operations
│   ├── db.ts               # Database connection
│   └── vite.ts             # Vite integration
├── shared/                  # Shared code between frontend/backend
│   └── schema.ts           # Database schema (Drizzle ORM)
├── scripts/                 # Utility scripts
│   └── generate-sitemap.ts # Automatic sitemap generator
├── .env                     # Environment variables (YOU CREATE THIS)
├── .env.example            # Example environment file
├── vercel.json             # Vercel configuration
├── package.json            # Dependencies and scripts
├── drizzle.config.ts       # Drizzle ORM configuration
├── vite.config.ts          # Vite build configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── README.md               # This file
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Mac/Linux/Git Bash) |
| `npm run dev:win` | Start development server (Windows - alternative) |
| `npm run build` | Build for production |
| `npm run start` | Start production server locally |
| `npm run db:push` | Push database schema changes |
| `npm run check` | TypeScript type checking |
| `npm run vercel-build` | Build command for Vercel deployment |

---

## 🐛 Troubleshooting

### Common Issues

#### **Issue 1: "DATABASE_URL not found"**

**Error:**
```
Error: DATABASE_URL, ensure the database is provisioned
```

**Solution:**
1. Verify `.env` file exists in project root
2. Check `DATABASE_URL` is set correctly
3. Ensure no extra spaces around the `=` sign

```bash
# Check .env file exists
ls -la .env

# View content (Mac/Linux)
cat .env

# View content (Windows)
type .env
```

---

#### **Issue 2: "Port 5000 already in use"**

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

**Option A: Change port in `.env`**
```env
PORT=3000
```

**Option B: Kill process using port 5000**

**Windows:**
```cmd
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

---

#### **Issue 3: PostgreSQL connection failed**

**Error:**
```
Error: Connection refused - connect ECONNREFUSED
```

**Solution:**

1. **Check PostgreSQL is running:**

   **Windows:**
   ```cmd
   # Check service status in Services app
   services.msc
   # Look for "PostgreSQL" service
   ```

   **Mac:**
   ```bash
   brew services list | grep postgresql
   ```

   **Linux:**
   ```bash
   sudo systemctl status postgresql
   ```

2. **Verify connection string format:**
   ```
   postgresql://username:password@host:port/database
   ```

3. **Test connection:**
   ```bash
   psql "your-database-url-here"
   ```

---

#### **Issue 4: "NODE_ENV is not recognized" (Windows)**

**Error:**
```
'NODE_ENV' is not recognized as an internal or external command
```

**Solution:**

**Option A: Use alternative script**
```cmd
npm run dev:win
```

**Option B: Install cross-env (already done if you ran `npm install`)**
```cmd
npm install cross-env
npm run dev
```

**Option C: Use Git Bash**
```bash
npm run dev
```

---

#### **Issue 5: "npm install" fails**

**Solution:**

```bash
# Clear cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json  # Mac/Linux
# or
rmdir /s node_modules & del package-lock.json  # Windows

# Reinstall
npm install
```

---

#### **Issue 6: Sitemap not generating**

**Solution:**

1. **Check tsx is installed:**
   ```bash
   npm list tsx
   ```

2. **Generate manually:**
   ```bash
   npx tsx scripts/generate-sitemap.ts
   ```

3. **Check logs on server start** - should see:
   ```
   🗺️  Generating sitemap from routes...
   ✅ Sitemap updated successfully
   ```

---

#### **Issue 7: Admin login not working**

**Solution:**

1. **Verify credentials match `.env` file:**
   ```bash
   cat .env | grep ADMIN
   ```

2. **Check database has user:**
   ```bash
   psql "your-database-url"
   SELECT * FROM users;
   ```

3. **Reset admin account:**
   - Drop users table and re-run `npm run db:push`
   - Register new admin at `/login`

---

### Database Commands

#### View Database Tables

```bash
# Connect to database
psql "your-database-url"

# List all tables
\dt

# View users
SELECT * FROM users;

# View inquiries
SELECT * FROM inquiries;

# Exit
\q
```

#### Reset Database (Fresh Start)

```bash
# Connect
psql "your-database-url"

# Drop all tables
DROP TABLE users, inquiries CASCADE;

# Exit
\q

# Re-create schema
npm run db:push
```

---

## 📚 Additional Documentation

- **SEO Guide**: See `SITEMAP-GUIDE.md` for automatic sitemap details
- **Deployment**: See `VERCEL-DEPLOYMENT.md` for Vercel-specific instructions
- **Project Info**: See `replit.md` for architecture details

---

## 🐛 Common Issues & Troubleshooting

### Windows: Socket Binding Error (ENOTSUP)

**Error:**
```
Error: listen ENOTSUP: operation not supported on socket 0.0.0.0:5000
```

**Solution:**
Add `HOST=localhost` to your `.env` file:

```env
HOST=localhost
```

This tells the server to bind to `localhost` instead of `0.0.0.0`, which Windows doesn't support the same way Linux does.

### Database Connection Showing `undefined`

**Symptoms:**
- Console shows `DATABASE_URL: undefined`
- Server crashes on startup

**Solution:**
1. Make sure `.env` file exists in root directory
2. Verify `DATABASE_URL` is set in `.env`
3. Restart the server: `npx tsx server/index.ts`

### Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Windows (Command Prompt as Admin)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

## 🔒 Security Notes

1. **Never commit `.env` to version control** ✅ (already in `.gitignore`)
2. **Use strong passwords** (minimum 12 characters)
3. **Rotate `SESSION_SECRET` regularly** in production
4. **Use HTTPS in production** (automatic with Vercel)
5. **Keep dependencies updated**: `npm audit fix`
6. **Different credentials** for dev vs prod

---

## 🤝 Support

If you encounter issues not covered here:

1. Check existing GitHub issues
2. Review error logs in terminal
3. Verify all environment variables are set
4. Ensure PostgreSQL database is accessible
5. Try fresh installation

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🎉 Success Checklist

After setup, verify:

- [ ] `npm install` completed successfully
- [ ] `.env` file created with all variables
- [ ] Database connection working
- [ ] `npm run db:push` completed
- [ ] Development server starts: `npm run dev`
- [ ] Homepage loads at http://localhost:5000
- [ ] All 8 platform pages accessible
- [ ] Contact form works
- [ ] Admin login works
- [ ] Sitemap visible at http://localhost:5000/sitemap.xml
- [ ] Ready to deploy to Vercel! 🚀

---

**Made with ❤️ for Service Digital Marketing**

**Live Site**: https://servicedigitalmarketing.com
