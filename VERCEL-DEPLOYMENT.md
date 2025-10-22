# 🚀 Deploying to Vercel - Complete Guide

This guide covers deploying your Service Digital Marketing platform to Vercel for production hosting.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Method 1: Deploy via Vercel CLI](#method-1-deploy-via-vercel-cli-recommended)
- [Method 2: Deploy via GitHub Integration](#method-2-deploy-via-github-integration)
- [Environment Variables Setup](#environment-variables-setup)
- [Custom Domain Setup](#custom-domain-setup)
- [Post-Deployment Testing](#post-deployment-testing)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before deploying, ensure you have:

1. **Vercel Account** - Sign up at https://vercel.com (free tier available)
2. **Cloud Database** - Must use cloud PostgreSQL (Neon, Supabase, etc.) - NOT localhost
3. **GitHub Account** - For GitHub integration method (optional)
4. **Project Working Locally** - Test everything works on `localhost:5000`

---

## 📝 Pre-Deployment Checklist

Before deploying, complete these steps:

### 1. Setup Cloud Database

**Why?** Vercel cannot connect to your local PostgreSQL database.

**Recommended: Neon (Free Tier)**

1. Create account at https://neon.tech
2. Create new project: "ServiceDigitalMarketing"
3. Copy connection string (looks like):
   ```
   postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require
   ```
4. Update your **production** `.env` (don't overwrite local one!)

**Alternative: Supabase (Free Tier)**

1. Create account at https://supabase.com
2. Create new project
3. Go to Settings → Database → Connection String
4. Copy **Connection Pooling** string (Mode: Transaction)

### 2. Push Database Schema to Cloud Database

```bash
# Temporarily update DATABASE_URL to cloud database
# Then push schema
npm run db:push
```

This creates the `users` and `inquiries` tables in your cloud database.

### 3. Generate Production Secrets

**Generate new SESSION_SECRET for production:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Save this** - you'll need it in Vercel environment variables.

**⚠️ Important:** NEVER use the same `SESSION_SECRET` in dev and production!

### 4. Commit Latest Changes

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

## 🚀 Method 1: Deploy via Vercel CLI (Recommended)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the browser prompts to authenticate.

### Step 3: Link Project (First Time Only)

```bash
vercel link
```

Answer the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your Vercel account
- **Link to existing project?** → No
- **Project name?** → `service-digital-marketing` (or your choice)

### Step 4: Add Environment Variables

You can add them during deployment or manually:

**Option A: Add via CLI**

```bash
# Add production environment variables
vercel env add DATABASE_URL
# Paste your Neon/Supabase connection string

vercel env add ADMIN_EMAIL
# Enter: yashsaxena.personal@gmail.com

vercel env add ADMIN_PASSWORD
# Enter your secure production password

vercel env add ADMIN_ID
# Enter: admin-1

vercel env add SESSION_SECRET
# Paste the generated secret from Step 3

vercel env add NODE_ENV
# Enter: production
```

**Option B: Add via Dashboard**

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add all variables (see [Environment Variables Setup](#environment-variables-setup))

### Step 5: Deploy to Production

```bash
vercel --prod
```

**Expected Output:**
```
🔍  Inspect: https://vercel.com/...
✅  Production: https://your-project.vercel.app
```

### Step 6: Test Your Deployment

Visit your production URL and verify everything works!

---

## 🔗 Method 2: Deploy via GitHub Integration

### Step 1: Push to GitHub

**Create Repository:**

1. Go to https://github.com/new
2. Create repository: `ServiceDigitalMarketing`
3. Follow instructions to push code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ServiceDigitalMarketing.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Click **Import**

### Step 3: Configure Project

**Framework Preset:** Other (auto-detected)

**Root Directory:** `./` (leave as default)

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```bash
dist/public
```

**Install Command:**
```bash
npm install
```

### Step 4: Add Environment Variables

Before deploying, click **Environment Variables** and add all required variables.

See complete list: [Environment Variables Setup](#environment-variables-setup)

### Step 5: Deploy

Click **Deploy** and wait 2-3 minutes.

**Your site will be live at:** `https://your-project-name.vercel.app`

---

## 🔑 Environment Variables Setup

Add these in **Vercel Dashboard → Settings → Environment Variables**

### Required Variables

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Your Neon/Supabase connection string | Production |
| `ADMIN_EMAIL` | `yashsaxena.personal@gmail.com` | Production |
| `ADMIN_PASSWORD` | Strong password (different from local!) | Production |
| `ADMIN_ID` | `admin-1` | Production |
| `SESSION_SECRET` | Random 64-char hex string | Production |
| `NODE_ENV` | `production` | Production |

### How to Add in Vercel Dashboard

1. Go to your project in Vercel
2. Click **Settings** tab
3. Click **Environment Variables**
4. For each variable:
   - **Name**: Variable name (e.g., `DATABASE_URL`)
   - **Value**: Variable value (e.g., your connection string)
   - **Environment**: Select **Production**, **Preview**, and **Development**
5. Click **Save**

### Example Configuration

```
Name: DATABASE_URL
Value: postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require
Environments: ☑ Production ☑ Preview ☑ Development

Name: ADMIN_EMAIL
Value: yashsaxena.personal@gmail.com
Environments: ☑ Production ☑ Preview ☑ Development

Name: ADMIN_PASSWORD
Value: YourSecureProductionPassword123!
Environments: ☑ Production ☑ Preview ☑ Development

Name: SESSION_SECRET
Value: a7f3c9b2e8d1f4a6c5b9e7d3f2a8c1b4e9d7a3f6c2b8e1d4a7f9c3b6e2d8a1f4
Environments: ☑ Production ☑ Preview ☑ Development

Name: NODE_ENV
Value: production
Environments: ☑ Production
```

---

## 🌐 Custom Domain Setup

### Connect servicedigitalmarketing.com

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **Settings** → **Domains**
   - Enter: `servicedigitalmarketing.com`
   - Click **Add**

2. **Update DNS Records** (at your domain registrar):

   **Option A: Using Nameservers (Recommended)**
   ```
   Change nameservers to Vercel's:
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

   **Option B: Using A/CNAME Records**
   ```
   A Record:
   Name: @
   Value: 76.76.21.21

   CNAME Record:
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for Propagation** (5-60 minutes)

4. **Verify SSL Certificate** (automatic via Vercel)

### Setup www Redirect

Add both domains:
- `servicedigitalmarketing.com` (primary)
- `www.servicedigitalmarketing.com` (redirects to primary)

Vercel automatically handles the redirect!

---

## ✅ Post-Deployment Testing

After deployment, test everything works:

### 1. Homepage Test

Visit: `https://your-project.vercel.app`

**Verify:**
- [ ] Page loads without errors
- [ ] All images load
- [ ] Navigation works
- [ ] GTM tracking loads (check browser console)

### 2. Platform Pages Test

Visit each platform page:
- [ ] https://your-project.vercel.app/facebook-ads
- [ ] https://your-project.vercel.app/instagram-ads
- [ ] https://your-project.vercel.app/reddit-ads
- [ ] https://your-project.vercel.app/youtube-ads
- [ ] https://your-project.vercel.app/google-ads
- [ ] https://your-project.vercel.app/linkedin-ads
- [ ] https://your-project.vercel.app/tiktok-ads
- [ ] https://your-project.vercel.app/snapchat-ads

### 3. Form Submission Test

1. Go to any platform page
2. Fill out inquiry form
3. Submit
4. **Verify:**
   - [ ] Redirects to thank-you page
   - [ ] Check database for new inquiry

### 4. Admin Dashboard Test

1. Visit: https://your-project.vercel.app/login
2. Login with production credentials
3. **Verify:**
   - [ ] Login successful
   - [ ] Admin dashboard loads
   - [ ] Can see submitted inquiries
   - [ ] Can export CSV

### 5. SEO Test

**Verify sitemap:**
```
https://your-project.vercel.app/sitemap.xml
```

**Verify robots.txt:**
```
https://your-project.vercel.app/robots.txt
```

**Check meta tags:**
- View page source (Ctrl+U)
- Verify `<title>`, `<meta name="description">`, Open Graph tags

### 6. Database Connection Test

```bash
# Connect to production database
psql "your-production-database-url"

# Check data
SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5;
SELECT * FROM users;

\q
```

---

## 🐛 Troubleshooting

### Issue 1: Build Failed

**Error:**
```
Error: Command "npm run build" exited with 1
```

**Solution:**

1. Check build logs in Vercel dashboard
2. Verify `package.json` has correct build script
3. Test build locally:
   ```bash
   npm run build
   ```
4. Check for TypeScript errors:
   ```bash
   npm run check
   ```

### Issue 2: Database Connection Failed

**Error:**
```
Error: Connection refused
```

**Solution:**

1. Verify `DATABASE_URL` is set in Vercel
2. Check connection string format:
   ```
   postgresql://user:pass@host:port/database?sslmode=require
   ```
3. Ensure database is accessible from internet (not localhost)
4. Test connection locally with production URL

### Issue 3: Environment Variables Not Working

**Error:**
```
Error: SESSION_SECRET is undefined
```

**Solution:**

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify all variables are set for **Production** environment
3. Redeploy:
   ```bash
   vercel --prod
   ```

### Issue 4: 404 on Routes

**Error:**
```
404 - Page not found
```

**Solution:**

1. Check `vercel.json` exists and is correct
2. Verify routes are configured:
   ```json
   {
     "routes": [
       { "src": "/api/(.*)", "dest": "server/index.ts" },
       { "src": "/(.*)", "dest": "dist/public/$1" }
     ]
   }
   ```
3. Redeploy

### Issue 5: Admin Login Not Working

**Error:**
```
Incorrect email or password
```

**Solution:**

1. Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in Vercel match your login
2. Check no extra spaces in environment variables
3. Try resetting in Vercel dashboard

### Issue 6: Slow Response Times

**Solution:**

1. Upgrade to Vercel Pro (if on free tier)
2. Check database location (use same region as Vercel deployment)
3. Optimize images
4. Enable Vercel Edge Network

---

## 📊 Vercel Dashboard Features

### Analytics

- Go to **Analytics** tab
- View page views, unique visitors, top pages
- Track performance metrics

### Logs

- Go to **Deployments** → Select deployment → **Logs**
- View real-time server logs
- Debug production issues

### Deployment History

- View all deployments
- Rollback to previous version if needed
- Compare deployment differences

### Performance Monitoring

- Check Core Web Vitals
- Monitor response times
- Track errors

---

## 🔄 Continuous Deployment

After initial setup, every push to `main` branch automatically deploys!

```bash
# Make changes locally
git add .
git commit -m "Update homepage content"
git push origin main

# Vercel automatically deploys! 🚀
```

**Preview Deployments:**
- Every PR/branch gets a preview URL
- Test before merging to production

---

## 💰 Vercel Pricing

**Free Tier (Hobby):**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Perfect for this project!

**Pro Tier ($20/month):**
- Analytics
- Team collaboration
- Password protection
- 1TB bandwidth

---

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Supabase Docs**: https://supabase.com/docs

---

## ✅ Deployment Success Checklist

After deployment:

- [ ] Project builds successfully
- [ ] All environment variables set
- [ ] Homepage loads at production URL
- [ ] All 8 platform pages accessible
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Database connection working
- [ ] Sitemap accessible
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic)
- [ ] SEO meta tags visible in page source

---

**🎉 Congratulations! Your Service Digital Marketing platform is now live on Vercel!**

**Next Steps:**
1. Submit sitemap to Google Search Console
2. Test all forms thoroughly
3. Monitor analytics
4. Update DNS for custom domain

---

**Need Help?** Check Vercel Support: https://vercel.com/support
