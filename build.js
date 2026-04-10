const fs = require('fs');
const path = require('path');

try { require('dotenv').config(); } catch {}

const API_URL = process.env.API_URL;

if (!API_URL) {
  console.error('ERROR: API_URL must be set.');
  console.error('Create a .env file based on .env.example or set it as an environment variable.');
  process.exit(1);
}

fs.mkdirSync('dist', { recursive: true });

// Inject API URL into index.html
let html = fs.readFileSync('src/index.html', 'utf8');
html = html.replace('__API_URL__', API_URL);
fs.writeFileSync('dist/index.html', html);

// Copy remaining static assets
['sw.js', 'manifest.json', 'icon-192.jpg', 'icon-512.jpg'].forEach(file => {
  const src = path.join('src', file);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join('dist', file));
});

console.log('Build complete → dist/');
