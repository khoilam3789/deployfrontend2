import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'tienphatdat_fabric_secret_key_2026';

app.use(cors());
app.use(express.json());

// Serve static assets
const clientPublicPath = path.join(__dirname, '../client/public');
app.use('/images', express.static(path.join(clientPublicPath, 'images')));

// File paths
const dataDir = path.join(__dirname, 'data');
const productsPath = path.join(dataDir, 'products.json');
const postsPath = path.join(dataDir, 'posts.json');
const quotesPath = path.join(dataDir, 'quotes.json');
const bannersPath = path.join(dataDir, 'banners.json');
const settingsPath = path.join(dataDir, 'settings.json');

// Multer storage for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(clientPublicPath, 'images/products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9-]/g, '-');
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({ storage });

// Mongoose Models
const productSchema = new mongoose.Schema({
  id: Number,
  slug: { type: String, unique: true },
  title: String,
  categoryId: String,
  category: String,
  price: String,
  main_image: String,
  gallery: [String],
  color_swatches: [String],
  description: String,
  specifications: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  id: Number,
  slug: { type: String, unique: true },
  title: String,
  thumbnail: String,
  summary: String,
  content_html: String,
  images: [String],
  date: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const quoteSchema = new mongoose.Schema({
  id: Number,
  name: String,
  phone: String,
  email: String,
  product: String,
  note: String,
  status: { type: String, default: 'new' }, // new, contacted, closed
  createdAt: { type: Date, default: Date.now }
});

const bannerSchema = new mongoose.Schema({
  id: Number,
  title: String,
  desc: String,
  image: String,
  btnText: String,
  btnLink: String
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);

let isMongoConnected = false;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://khoilam3789_db_user:3nr2wMwcXrHX9tkL@cluster0.e9xn3gz.mongodb.net/cuahangvaithun?retryWrites=true&w=majority";

async function initMongoDB() {
  try {
    console.log("Đang kết nối tới MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI, {
      dbName: 'cuahangvaithun',
      serverSelectionTimeoutMS: 5000
    });
    isMongoConnected = true;
    console.log("✓ Đã kết nối thành công tới MongoDB Atlas!");

    // Check & sync products
    const prodCount = await Product.countDocuments();
    if (prodCount === 0 && fs.existsSync(productsPath)) {
      const pData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      await Product.insertMany(pData);
      console.log(`✓ Đã nạp ${pData.length} sản phẩm lên MongoDB Atlas!`);
    }

    // Check & sync posts
    const postCount = await Post.countDocuments();
    if (postCount === 0 && fs.existsSync(postsPath)) {
      const pData = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
      await Post.insertMany(pData);
      console.log(`✓ Đã nạp ${pData.length} bài viết lên MongoDB Atlas!`);
    }
  } catch (error) {
    isMongoConnected = false;
    console.warn("⚠️ Chưa thể kết nối MongoDB Atlas:", error.message);
    console.warn("👉 Hệ thống tự động sử dụng cơ sở dữ liệu dự phòng JSON để đảm bảo web hoạt động 100%!");
  }
}
initMongoDB();

// Data helper functions
async function getProducts() {
  if (isMongoConnected) {
    try {
      const docs = await Product.find({}).lean();
      if (docs && docs.length > 0) return docs;
    } catch (e) {
      console.error("Lỗi đọc Product Mongo:", e.message);
    }
  }
  if (fs.existsSync(productsPath)) {
    return JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  }
  return [];
}

async function saveProducts(products) {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf-8');
  if (isMongoConnected) {
    try {
      await Product.deleteMany({});
      await Product.insertMany(products);
    } catch (e) {
      console.error("Lỗi ghi Product Mongo:", e.message);
    }
  }
}

async function getPosts() {
  if (isMongoConnected) {
    try {
      const docs = await Post.find({}).lean();
      if (docs && docs.length > 0) return docs;
    } catch (e) {
      console.error("Lỗi đọc Post Mongo:", e.message);
    }
  }
  if (fs.existsSync(postsPath)) {
    return JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
  }
  return [];
}

async function savePosts(posts) {
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), 'utf-8');
  if (isMongoConnected) {
    try {
      await Post.deleteMany({});
      await Post.insertMany(posts);
    } catch (e) {
      console.error("Lỗi ghi Post Mongo:", e.message);
    }
  }
}

function getBanners() {
  if (fs.existsSync(bannersPath)) {
    return JSON.parse(fs.readFileSync(bannersPath, 'utf-8'));
  }
  return [];
}

function saveBanners(banners) {
  fs.writeFileSync(bannersPath, JSON.stringify(banners, null, 2), 'utf-8');
}

function getSettings() {
  if (fs.existsSync(settingsPath)) {
    return JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
  }
  return {};
}

function saveSettings(settings) {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
}

async function getQuotes() {
  if (isMongoConnected) {
    try {
      const docs = await Quote.find({}).sort({ createdAt: -1 }).lean();
      if (docs && docs.length > 0) return docs;
    } catch (e) {
      console.error("Lỗi đọc Quote Mongo:", e.message);
    }
  }
  if (fs.existsSync(quotesPath)) {
    return JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));
  }
  return [];
}

// Auth Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Yêu cầu đăng nhập quản trị!' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Phiên đăng nhập hết hạn hoặc không hợp lệ!' });
  }
}

// ==========================================
// PUBLIC API ENDPOINTS
// ==========================================

// 1. GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    let products = await getProducts();
    const { category, search, limit } = req.query;

    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      products = products.filter(p => {
        if (p.categoryId === catLower) return true;
        const c = (p.category || '').toLowerCase();
        if (catLower === 'cotton') return c.includes('cotton') || c.includes('tici');
        if (catLower === 'ca-sau') return c.includes('cá sấu');
        if (catLower === 'the-thao') return c.includes('lạnh') || c.includes('poly') || c.includes('thể thao');
        if (catLower === 'me-luoi') return c.includes('mè') || c.includes('lưới');
        if (catLower === 'ni-da-ca') return c.includes('nỉ') || c.includes('da cá');
        return c.includes(catLower);
      });
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(p => 
        (p.title || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    }

    if (limit) {
      products = products.slice(0, parseInt(limit, 10));
    }

    function normalizeProduct(p) {
      const fixImg = (img) => {
        if (!img) return '/images/products/vải-cottton-2c.jpg';
        if (img.startsWith('http://') || img.startsWith('https://')) return img;
        if (img.startsWith('/')) return img;
        return '/' + img;
      };
      return {
        ...p,
        main_image: fixImg(p.main_image),
        image: fixImg(p.image || p.main_image),
        gallery: (p.gallery && p.gallery.length > 0) ? p.gallery.map(fixImg) : [fixImg(p.main_image)]
      };
    }

    const formatted = products.map(normalizeProduct);

    res.json({
      success: true,
      total: formatted.length,
      storage: isMongoConnected ? 'MongoDB Atlas' : 'Local JSON Fallback',
      data: formatted
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. GET /api/products/:slug
app.get('/api/products/:slug', async (req, res) => {
  try {
    const products = await getProducts();
    const product = products.find(p => p.slug === req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }

    function normalizeProduct(p) {
      const fixImg = (img) => {
        if (!img) return '/images/products/vải-cottton-2c.jpg';
        if (img.startsWith('http://') || img.startsWith('https://')) return img;
        if (img.startsWith('/')) return img;
        return '/' + img;
      };
      return {
        ...p,
        main_image: fixImg(p.main_image),
        image: fixImg(p.image || p.main_image),
        gallery: (p.gallery && p.gallery.length > 0) ? p.gallery.map(fixImg) : [fixImg(p.main_image)]
      };
    }

    // Related products in same category
    const related = products
      .filter(p => p.slug !== product.slug && (p.categoryId === product.categoryId || p.category === product.category))
      .slice(0, 4)
      .map(normalizeProduct);

    res.json({
      success: true,
      data: {
        ...normalizeProduct(product),
        related
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    const products = await getProducts();
    const categories = [
      { id: 'cotton', name: 'Vải Thun Cotton & Tici', image: '/images/products/screenshot_1705137401-450x450.png', count: 0 },
      { id: 'ca-sau', name: 'Vải Thun Cá Sấu', image: '/images/products/vải-thun-cá-sấu-pe-4c-450x450.jpg', count: 0 },
      { id: 'the-thao', name: 'Thun Lạnh & Thể Thao', image: '/images/products/vải-thun-poly-2da-4c-450x450.jpg', count: 0 },
      { id: 'me-luoi', name: 'Vải Mè & Lưới Nhún', image: '/images/products/x11-450x450.jpg', count: 0 },
      { id: 'ni-da-ca', name: 'Vải Nỉ & Da Cá', image: '/images/products/vải-thun-nỉ-pe-2c-cào-lông--450x450.jpg', count: 0 }
    ];

    products.forEach(p => {
      const catId = p.categoryId || '';
      const c = (p.category || '').toLowerCase();
      if (catId === 'ni-da-ca' || c.includes('nỉ') || c.includes('da cá')) categories[4].count++;
      else if (catId === 'ca-sau' || c.includes('cá sấu')) categories[1].count++;
      else if (catId === 'cotton' || c.includes('cotton') || c.includes('tici')) categories[0].count++;
      else if (catId === 'me-luoi' || c.includes('mè') || c.includes('lưới')) categories[3].count++;
      else categories[2].count++;
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. GET /api/posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json({ success: true, total: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. GET /api/posts/:slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const posts = await getPosts();
    const post = posts.find(p => p.slug === req.params.slug);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
    }
    const otherPosts = posts.filter(p => p.slug !== post.slug).slice(0, 3);
    res.json({ success: true, data: { ...post, otherPosts } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. GET /api/banners
app.get('/api/banners', (req, res) => {
  try {
    const banners = getBanners();
    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. GET /api/settings
app.get('/api/settings', (req, res) => {
  try {
    const settings = getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 8. POST /api/quote (Contact / Quote Submission)
app.post('/api/quote', async (req, res) => {
  try {
    const { name, phone, email, product, note } = req.body;
    if (!name || !name.trim() || !phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp Họ tên và Số điện thoại!' });
    }

    const newQuote = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      product: (product || '').trim(),
      note: (note || '').trim(),
      status: 'new',
      createdAt: new Date()
    };

    if (isMongoConnected) {
      try {
        await Quote.create(newQuote);
      } catch (e) {
        console.error("Lỗi lưu quote MongoDB:", e.message);
      }
    }

    // Append to local JSON backup
    let quotes = [];
    if (fs.existsSync(quotesPath)) {
      quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));
    }
    quotes.unshift(newQuote);
    fs.writeFileSync(quotesPath, JSON.stringify(quotes, null, 2), 'utf-8');

    console.log(`[BÁO GIÁ MỚI] Khách hàng: ${newQuote.name} - SĐT: ${newQuote.phone} - Email: ${newQuote.email}`);
    res.json({
      success: true,
      message: 'Cửa hàng vải thun Tiến Phát Đạt đã nhận được thông tin! Chúng tôi sẽ gọi điện/Zalo tư vấn cho quý khách trong ít phút.',
      data: newQuote
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại!' });
  }
});

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'TienPhatDat@2026';

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ tài khoản và mật khẩu!' });
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      success: true,
      token,
      admin: { username, role: 'admin' }
    });
  }

  return res.status(401).json({ success: false, message: 'Tài khoản hoặc mật khẩu không chính xác!' });
});

app.get('/api/admin/me', authMiddleware, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// ==========================================
// ADMIN CRUD: PRODUCTS
// ==========================================

app.post('/api/admin/products', authMiddleware, async (req, res) => {
  try {
    const products = await getProducts();
    const newProduct = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date()
    };
    if (!newProduct.slug) {
      newProduct.slug = (newProduct.title || '')
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }
    products.unshift(newProduct);
    await saveProducts(products);
    res.json({ success: true, message: 'Thêm sản phẩm thành công!', data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/products/:id', authMiddleware, async (req, res) => {
  try {
    const products = await getProducts();
    const id = parseInt(req.params.id, 10);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }
    products[index] = { ...products[index], ...req.body };
    await saveProducts(products);
    res.json({ success: true, message: 'Cập nhật sản phẩm thành công!', data: products[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/products/:id', authMiddleware, async (req, res) => {
  try {
    let products = await getProducts();
    const id = parseInt(req.params.id, 10);
    products = products.filter(p => p.id !== id);
    await saveProducts(products);
    res.json({ success: true, message: 'Đã xóa sản phẩm thành công!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// ADMIN CRUD: POSTS
// ==========================================

app.post('/api/admin/posts', authMiddleware, async (req, res) => {
  try {
    const posts = await getPosts();
    const newPost = {
      id: Date.now(),
      ...req.body,
      date: new Date().toISOString().split('T')[0],
      author: 'Tiến Phát Đạt'
    };
    if (!newPost.slug) {
      newPost.slug = (newPost.title || '')
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }
    posts.unshift(newPost);
    await savePosts(posts);
    res.json({ success: true, message: 'Thêm bài viết thành công!', data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/posts/:id', authMiddleware, async (req, res) => {
  try {
    const posts = await getPosts();
    const id = parseInt(req.params.id, 10);
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
    }
    posts[index] = { ...posts[index], ...req.body };
    await savePosts(posts);
    res.json({ success: true, message: 'Cập nhật bài viết thành công!', data: posts[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/posts/:id', authMiddleware, async (req, res) => {
  try {
    let posts = await getPosts();
    const id = parseInt(req.params.id, 10);
    posts = posts.filter(p => p.id !== id);
    await savePosts(posts);
    res.json({ success: true, message: 'Đã xóa bài viết thành công!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// ADMIN CRUD: BANNERS
// ==========================================

app.get('/api/admin/banners', authMiddleware, (req, res) => {
  res.json({ success: true, data: getBanners() });
});

app.post('/api/admin/banners', authMiddleware, (req, res) => {
  try {
    const banners = getBanners();
    const newBanner = { id: Date.now(), ...req.body };
    banners.push(newBanner);
    saveBanners(banners);
    res.json({ success: true, message: 'Thêm banner thành công!', data: newBanner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/banners/:id', authMiddleware, (req, res) => {
  try {
    const banners = getBanners();
    const id = parseInt(req.params.id, 10);
    const idx = banners.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Không tìm thấy banner' });
    banners[idx] = { ...banners[idx], ...req.body };
    saveBanners(banners);
    res.json({ success: true, message: 'Cập nhật banner thành công!', data: banners[idx] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/banners/:id', authMiddleware, (req, res) => {
  try {
    let banners = getBanners();
    const id = parseInt(req.params.id, 10);
    banners = banners.filter(b => b.id !== id);
    saveBanners(banners);
    res.json({ success: true, message: 'Đã xóa banner thành công!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// ADMIN CRUD: QUOTES / LEADS
// ==========================================

app.get('/api/admin/quotes', authMiddleware, async (req, res) => {
  try {
    const quotes = await getQuotes();
    res.json({ success: true, total: quotes.length, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.patch('/api/admin/quotes/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;
    let quotes = [];
    if (fs.existsSync(quotesPath)) {
      quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));
    }
    const idx = quotes.findIndex(q => q.id === id);
    if (idx !== -1) {
      quotes[idx].status = status;
      fs.writeFileSync(quotesPath, JSON.stringify(quotes, null, 2), 'utf-8');
    }
    if (isMongoConnected) {
      try {
        await Quote.updateOne({ id }, { status });
      } catch (e) {
        console.error("Lỗi cập nhật Quote Mongo:", e.message);
      }
    }
    res.json({ success: true, message: 'Đã cập nhật trạng thái liên hệ!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/quotes/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    let quotes = [];
    if (fs.existsSync(quotesPath)) {
      quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));
      quotes = quotes.filter(q => q.id !== id);
      fs.writeFileSync(quotesPath, JSON.stringify(quotes, null, 2), 'utf-8');
    }
    if (isMongoConnected) {
      try {
        await Quote.deleteOne({ id });
      } catch (e) {
        console.error("Lỗi xóa Quote Mongo:", e.message);
      }
    }
    res.json({ success: true, message: 'Đã xóa yêu cầu liên hệ!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// ADMIN CRUD: SETTINGS
// ==========================================

app.get('/api/admin/settings', authMiddleware, (req, res) => {
  res.json({ success: true, data: getSettings() });
});

app.put('/api/admin/settings', authMiddleware, (req, res) => {
  try {
    saveSettings(req.body);
    res.json({ success: true, message: 'Đã lưu cấu hình website thành công!', data: req.body });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// ADMIN: MEDIA UPLOAD
// ==========================================

app.post('/api/admin/upload', authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Không có tệp ảnh nào được tải lên!' });
    }
    const publicUrl = `/images/products/${req.file.filename}`;
    res.json({
      success: true,
      url: publicUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Express Backend Server đang chạy tại http://localhost:${PORT}`);
});
