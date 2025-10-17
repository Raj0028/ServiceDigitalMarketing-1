import { watch } from 'fs';
import { resolve } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const APP_PATH = resolve(process.cwd(), 'client/src/App.tsx');
let isGenerating = false;
let pendingGeneration = false;

async function regenerateSitemap() {
  if (isGenerating) {
    pendingGeneration = true;
    return;
  }

  isGenerating = true;
  
  try {
    console.log('\n🔄 App.tsx changed - Regenerating sitemap...');
    const { stdout, stderr } = await execAsync('tsx scripts/generate-sitemap.ts');
    
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    
  } catch (error) {
    console.error('❌ Error regenerating sitemap:', error);
  } finally {
    isGenerating = false;
    
    // If there was a pending generation request, run it now
    if (pendingGeneration) {
      pendingGeneration = false;
      setTimeout(() => regenerateSitemap(), 100);
    }
  }
}

console.log('👀 Watching App.tsx for route changes...');
console.log(`📍 Monitoring: ${APP_PATH}`);
console.log('🔄 Sitemap will auto-regenerate when routes are added/removed\n');

// Generate sitemap on startup
regenerateSitemap();

// Watch for changes
watch(APP_PATH, (eventType) => {
  if (eventType === 'change') {
    regenerateSitemap();
  }
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopped watching App.tsx');
  process.exit(0);
});
