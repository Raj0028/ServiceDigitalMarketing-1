import { writeFileSync } from 'fs';
import { resolve } from 'path';

const DOMAIN = 'https://servicedigitalmarketing.com';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

// Define all public pages (exclude admin, login, and thank-you pages)
const publicPages: SitemapUrl[] = [
  {
    loc: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    loc: '/facebook-ads',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/instagram-ads',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/reddit-ads',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/youtube-ads',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/google-ads',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/linkedin-ads',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/tiktok-ads',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/snapchat-ads',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/yash-saxena',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.95'
  },
  {
    loc: '/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  }
];

function generateSitemap(): string {
  const urls = publicPages.map(page => {
    return `  <url>
    <loc>${DOMAIN}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

// Generate and save sitemap
const sitemap = generateSitemap();
const sitemapPath = resolve(process.cwd(), 'client/public/sitemap.xml');

try {
  writeFileSync(sitemapPath, sitemap, 'utf-8');
  console.log('✅ Sitemap generated successfully at:', sitemapPath);
  console.log(`📄 Total URLs: ${publicPages.length}`);
  console.log('🔗 Pages included:');
  publicPages.forEach(page => {
    console.log(`   - ${DOMAIN}${page.loc} (priority: ${page.priority})`);
  });
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
