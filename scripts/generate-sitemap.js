const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Your website domain
const domain = 'https://topcut.co.za';

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Function to generate sitemap
async function generateSitemap() {
  // Get all page paths from the app directory
  const pages = glob.sync('src/app/**/page.tsx')
    .map(page => {
      // Convert file path to URL path
      let urlPath = page
        .replace('src/app', '')
        .replace('/page.tsx', '')
        .replace(/\/\(/g, '/')
        .replace(/\)/g, '');
      
      // Handle root page
      if (urlPath === '') {
        return '/';
      }
      
      return urlPath;
    })
    .filter(path => {
      // Filter out any dynamic routes or special pages
      return !path.includes('[') && !path.includes('api/');
    });

  // Add the root path if it's not already included
  if (!pages.includes('/')) {
    pages.unshift('/');
  }

  // Sort pages alphabetically
  pages.sort();

  // Create sitemap XML content
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add each page to the sitemap
  pages.forEach(page => {
    const url = `${domain}${page}`;
    const priority = page === '/' ? '1.0' : 
                    page.includes('contact') || page.includes('quote') ? '0.9' : 
                    page.includes('services') ? '0.8' : '0.7';
    
    sitemap += '  <url>\n';
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += `    <priority>${priority}</priority>\n`;
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';

  // Write sitemap to public directory
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  
  console.log('Sitemap generated successfully!');
}

// Run the function
generateSitemap().catch(err => {
  console.error('Error generating sitemap:', err);
  process.exit(1);
}); 