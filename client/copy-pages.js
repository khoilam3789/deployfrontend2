import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = __dirname;
const distDir = path.join(clientDir, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Copy top-level HTML subpages
const files = fs.readdirSync(clientDir);
for (const file of files) {
  if (file.endsWith('.html') && file !== 'index.html' && !file.includes('original') && !file.includes('react')) {
    const src = path.join(clientDir, file);
    const dst = path.join(distDir, file);
    fs.copyFileSync(src, dst);
    console.log(`Copied: ${file} -> dist/`);
  }
}

// 2. Copy subdirectories with HTML files
const subdirs = ['danh-muc', 'san-pham'];
for (const sub of subdirs) {
  const srcSub = path.join(clientDir, sub);
  const dstSub = path.join(distDir, sub);
  if (fs.existsSync(srcSub)) {
    fs.cpSync(srcSub, dstSub, { recursive: true });
    console.log(`Copied directory: ${sub} -> dist/${sub}`);
  }
}

console.log('Static pages copied to dist successfully!');
