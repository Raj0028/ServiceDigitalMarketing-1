import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

const DOMAIN = 'https://servicedigitalmarketing.com';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

// Routes to exclude from sitemap (admin, login, thank-you pages)
const EXCLUDED_PATTERNS = [
  '/admin',
  '/login',
  '-thank-you'
];

// Auto-assign priorities based on route patterns
function getPriority(route: string): string {
  if (route === '/') return '1.0';
  if (route === '/yash-saxena') return '0.95';
  if (route.includes('-ads')) return '0.9';
  if (route === '/contact') return '0.8';
  return '0.8'; // Default for other pages
}

// Auto-assign change frequency based on route patterns
function getChangeFreq(route: string): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  if (route === '/') return 'weekly';
  if (route.includes('blog')) return 'weekly';
  return 'monthly';
}

// Check if route should be excluded from sitemap
function shouldExclude(route: string): boolean {
  return EXCLUDED_PATTERNS.some(pattern => route.includes(pattern));
}

// Extract routes from App.tsx automatically
function extractRoutesFromApp(): string[] {
  const appPath = resolve(process.cwd(), 'client/src/App.tsx');
  const appContent = readFileSync(appPath, 'utf-8');
  
  // Regex to match: <Route path="/some-path" component={...} />
  const routeRegex = /<Route\s+path="([^"]+)"\s+component=\{[^}]+\}\s*\/>/g;
  const routes: string[] = [];
  
  let match;
  while ((match = routeRegex.exec(appContent)) !== null) {
    const path = match[1];
    
    // Skip excluded routes (admin, login, thank-you pages)
    if (!shouldExclude(path)) {
      routes.push(path);
    }
  }
  
  return routes.sort(); // Sort alphabetically for consistent ordering
}

function generateSitemap(): string {
  console.log('🔍 Scanning App.tsx for routes...');
  const routes = extractRoutesFromApp();
  
  console.log(`✅ Found ${routes.length} public routes`);
  
  const today = new Date().toISOString().split('T')[0];
  
  const sitemapUrls: SitemapUrl[] = routes.map(route => ({
    loc: route,
    lastmod: today,
    changefreq: getChangeFreq(route),
    priority: getPriority(route)
  }));
  
  const urls = sitemapUrls.map(page => {
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
try {
  console.log('📝 Generating sitemap...');
  const sitemap = generateSitemap();
  const sitemapPath = resolve(process.cwd(), 'client/public/sitemap.xml');
  
  writeFileSync(sitemapPath, sitemap, 'utf-8');
  
  console.log('✅ Sitemap generated successfully!');
  console.log(`📍 Location: ${sitemapPath}`);
  
  // Re-read routes to display summary
  const routes = extractRoutesFromApp();
  console.log(`📄 Total URLs: ${routes.length}`);
  console.log('🔗 Pages included:');
  routes.forEach(route => {
    const priority = getPriority(route);
    console.log(`   - ${DOMAIN}${route} (priority: ${priority})`);
  });
  
  console.log('\n💡 Tip: Run this script after adding/removing routes in App.tsx');
  console.log('   Command: tsx scripts/generate-sitemap.ts\n');
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
