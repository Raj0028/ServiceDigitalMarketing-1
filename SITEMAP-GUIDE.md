# 🗺️ Sitemap Management Guide

## Overview

Your sitemap is now **automatically generated** using a custom script that keeps it in sync with your website's pages.

---

## 📍 Current Sitemap

**Location:** `client/public/sitemap.xml`
**Domain:** https://servicedigitalmarketing.com
**Total Pages:** 11 public pages

### Pages Included:

1. ✅ **Homepage** (`/`) - Priority: 1.0
2. ✅ **Facebook Ads** (`/facebook-ads`) - Priority: 0.9
3. ✅ **Instagram Ads** (`/instagram-ads`) - Priority: 0.9
4. ✅ **Reddit Ads** (`/reddit-ads`) - Priority: 0.9
5. ✅ **YouTube Ads** (`/youtube-ads`) - Priority: 0.9
6. ✅ **Google Ads** (`/google-ads`) - Priority: 0.9
7. ✅ **LinkedIn Ads** (`/linkedin-ads`) - Priority: 0.9
8. ✅ **TikTok Ads** (`/tiktok-ads`) - Priority: 0.9
9. ✅ **Snapchat Ads** (`/snapchat-ads`) - Priority: 0.9
10. ✅ **Yash Saxena Profile** (`/yash-saxena`) - Priority: 0.95
11. ✅ **Contact** (`/contact`) - Priority: 0.8

### Pages Excluded (Not in Sitemap):

- ❌ `/admin` - Admin dashboard (noindex)
- ❌ `/login` - Login page (noindex)
- ❌ All thank-you pages (`/*-thank-you`) - Noindex per SEO best practices

---

## 🚀 How to Update Sitemap

### **When You Add a New Page:**

**Step 1:** Add the route to `client/src/App.tsx`
```tsx
import NewPage from "@/pages/new-page.tsx";

// Inside Router component:
<Route path="/new-page" component={NewPage} />
```

**Step 2:** Add the page to sitemap generator
Open `scripts/generate-sitemap.ts` and add your new page to the `publicPages` array:

```typescript
const publicPages: SitemapUrl[] = [
  // ... existing pages ...
  {
    loc: '/new-page',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',  // or 'daily', 'weekly', 'yearly'
    priority: '0.8'         // 0.0 to 1.0 (1.0 is highest)
  }
];
```

**Step 3:** Run the sitemap generator
```bash
tsx scripts/generate-sitemap.ts
```

**That's it!** Your sitemap is now updated. ✅

---

## 🎯 Priority Guidelines

Use these priorities when adding new pages:

| Priority | Use For | Examples |
|----------|---------|----------|
| **1.0** | Homepage only | `/` |
| **0.95** | VIP/Profile pages | `/yash-saxena` |
| **0.9** | Main service pages | `/facebook-ads`, `/instagram-ads` |
| **0.8** | Secondary pages | `/contact`, `/about` |
| **0.7** | Blog posts/articles | `/blog/post-name` |
| **0.5** | Archive/category pages | `/blog`, `/resources` |

---

## 📅 Change Frequency Guidelines

| Frequency | Use For | Examples |
|-----------|---------|----------|
| **daily** | Frequently updated content | News, blog homepage |
| **weekly** | Homepage, active pages | `/` |
| **monthly** | Service pages, static content | `/facebook-ads`, `/contact` |
| **yearly** | Rarely changing pages | `/terms`, `/privacy` |

---

## 🔧 Technical Details

### **Sitemap Generator Script:**
- **Location:** `scripts/generate-sitemap.ts`
- **Output:** `client/public/sitemap.xml`
- **Format:** XML (Sitemap Protocol 0.9)
- **Encoding:** UTF-8

### **Features:**
- ✅ Automatic date stamping (lastmod)
- ✅ Configurable priority and change frequency
- ✅ Validates against sitemap protocol
- ✅ Excludes admin/private pages
- ✅ Uses correct domain (servicedigitalmarketing.com)

### **How to Run:**
```bash
# Generate sitemap manually
tsx scripts/generate-sitemap.ts

# Output will show:
# ✅ Sitemap generated successfully
# 📄 Total URLs: 11
# 🔗 Pages included: [list of all pages]
```

---

## 📋 Quick Reference Checklist

**When adding a new PUBLIC page:**
1. [ ] Create page component in `client/src/pages/`
2. [ ] Add route to `client/src/App.tsx`
3. [ ] Add page to `scripts/generate-sitemap.ts`
4. [ ] Run `tsx scripts/generate-sitemap.ts`
5. [ ] Verify sitemap at `client/public/sitemap.xml`
6. [ ] (Optional) Submit to Google Search Console

**When adding a PRIVATE page (admin, thank-you):**
1. [ ] Create page component
2. [ ] Add route to `client/src/App.tsx`
3. [ ] **DO NOT** add to sitemap
4. [ ] Add `noindex` meta tag in page component

---

## 🔍 Sitemap Validation

After generating, validate your sitemap:

1. **Check XML formatting:**
   ```bash
   cat client/public/sitemap.xml
   ```

2. **Test in browser:**
   - Visit: https://servicedigitalmarketing.com/sitemap.xml
   - Should display XML with all URLs

3. **Google Search Console:**
   - Go to Sitemaps section
   - Submit: `https://servicedigitalmarketing.com/sitemap.xml`
   - Check for errors

4. **Online Validators:**
   - https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Paste your sitemap URL

---

## 🌍 Global SEO Integration

Your sitemap is integrated with global SEO:

- ✅ Referenced in `robots.txt`
- ✅ Includes all hreflang-targeted pages
- ✅ Matches canonical URLs
- ✅ Accessible to all search engines
- ✅ AI bots can crawl all listed pages

---

## 💡 Best Practices

1. **Update sitemap after adding pages** - Run the generator script
2. **Keep priorities realistic** - Not everything can be 1.0
3. **Use accurate change frequencies** - Helps search engines crawl efficiently
4. **Exclude thank-you pages** - Already configured (noindex)
5. **Submit to Search Console** - After major updates
6. **Check for errors** - Google Search Console will report issues

---

## 🆘 Troubleshooting

### **Sitemap not updating?**
```bash
# Regenerate manually
tsx scripts/generate-sitemap.ts

# Check the file
cat client/public/sitemap.xml
```

### **Page not appearing in search?**
1. Check if page is in sitemap
2. Verify page is public (not /admin or /*-thank-you)
3. Ensure no `noindex` meta tag
4. Submit sitemap to Google Search Console
5. Wait 1-2 weeks for indexing

### **Script not running?**
```bash
# Make sure tsx is available
npx tsx scripts/generate-sitemap.ts

# Check script exists
ls -la scripts/generate-sitemap.ts
```

---

## 📈 Next Steps

After adding new pages:

1. **Regenerate sitemap** → `tsx scripts/generate-sitemap.ts`
2. **Submit to Google** → Search Console → Sitemaps
3. **Monitor indexing** → Check "Coverage" in Search Console
4. **Update SEO tags** → Use `useSEO()` hook in new pages
5. **Add structured data** → If applicable (Service, Article, etc.)

---

## 🎯 Example: Adding a Blog Page

```typescript
// 1. Create client/src/pages/blog.tsx
import { useSEO } from '@/hooks/use-seo';

export default function Blog() {
  useSEO({
    title: 'Digital Marketing Blog - Service Digital Marketing',
    description: 'Latest insights and tips on digital marketing...',
    canonical: 'https://servicedigitalmarketing.com/blog',
  });
  
  return <div>Blog content...</div>;
}

// 2. Add to client/src/App.tsx
import Blog from "@/pages/blog.tsx";
<Route path="/blog" component={Blog} />

// 3. Add to scripts/generate-sitemap.ts
{
  loc: '/blog',
  lastmod: new Date().toISOString().split('T')[0],
  changefreq: 'weekly',
  priority: '0.8'
}

// 4. Run generator
tsx scripts/generate-sitemap.ts
```

✅ **Done!** Your blog is now in the sitemap.

---

## 📝 Notes

- Sitemap supports up to 50,000 URLs (you have 11 currently)
- File size limit: 50MB (your sitemap is <10KB)
- Lastmod automatically updates when you regenerate
- All URLs use HTTPS protocol
- Domain is hardcoded to servicedigitalmarketing.com

---

**Questions? Check the script at:** `scripts/generate-sitemap.ts`
