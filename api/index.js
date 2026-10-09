import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const readJson = (fileName) => {
  const localPath = path.join(__dirname, 'data', fileName);
  if (fs.existsSync(localPath)) {
    try {
      return JSON.parse(fs.readFileSync(localPath, 'utf-8'));
    } catch (e) {
      console.error(`Error reading ${localPath}:`, e);
    }
  }
  const serverPath = path.join(process.cwd(), 'server', 'data', fileName);
  if (fs.existsSync(serverPath)) {
    try {
      return JSON.parse(fs.readFileSync(serverPath, 'utf-8'));
    } catch (e) {
      console.error(`Error reading ${serverPath}:`, e);
    }
  }
  return [];
};

app.get('/api/products', (req, res) => {
  const products = readJson('products.json');
  res.json({ success: true, count: products.length, data: products });
});

app.get('/api/products/:slug', (req, res) => {
  const products = readJson('products.json');
  const found = products.find((p) => p.slug === req.params.slug);
  if (found) {
    res.json({ success: true, data: found });
  } else {
    res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
  }
});

app.get('/api/categories', (req, res) => {
  const products = readJson('products.json');
  const catMap = new Map();
  products.forEach((p) => {
    if (p.categoryId && !catMap.has(p.categoryId)) {
      catMap.set(p.categoryId, { id: p.categoryId, name: p.category || p.categoryId });
    }
  });
  res.json({ success: true, data: Array.from(catMap.values()) });
});

app.get('/api/posts', (req, res) => {
  const posts = readJson('posts.json');
  res.json({ success: true, count: posts.length, data: posts });
});

app.get('/api/posts/:slug', (req, res) => {
  const posts = readJson('posts.json');
  const found = posts.find((p) => p.slug === req.params.slug);
  if (found) {
    res.json({ success: true, data: found });
  } else {
    res.status(404).json({ success: false, message: 'Bài viết không tồn tại' });
  }
});

app.get('/api/banners', (req, res) => {
  const banners = readJson('banners.json');
  res.json({ success: true, data: banners });
});

app.get('/api/settings', (req, res) => {
  const settings = readJson('settings.json');
  res.json({ success: true, data: settings });
});

app.post('/api/quote', (req, res) => {
  res.json({
    success: true,
    message: 'Cảm ơn quý khách! Yêu cầu báo giá đã được ghi nhận thành công.'
  });
});

export default app;
