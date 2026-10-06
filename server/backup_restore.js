import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://khoilam3789_db_user:3nr2wMwcXrHX9tkL@cluster0.e9xn3gz.mongodb.net/cuahangvaithun?retryWrites=true&w=majority";

const productSchema = new mongoose.Schema({}, { strict: false });
const postSchema = new mongoose.Schema({}, { strict: false });
const quoteSchema = new mongoose.Schema({}, { strict: false });
const bannerSchema = new mongoose.Schema({}, { strict: false });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');
const Post = mongoose.models.Post || mongoose.model('Post', postSchema, 'posts');
const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema, 'quotes');
const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema, 'banners');

async function backup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDir = path.join(__dirname, `../backups/backup-${timestamp}`);
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  console.log(`🚀 Bắt đầu sao lưu dữ liệu vào: ${backupDir}`);

  // Backup from JSON files first
  const serverDataDir = path.join(__dirname, 'data');
  const files = ['products.json', 'posts.json', 'banners.json', 'settings.json', 'quotes.json'];
  for (const f of files) {
    const src = path.join(serverDataDir, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(backupDir, f));
      console.log(`  ✓ Đã lưu file: ${f}`);
    }
  }

  // Backup from MongoDB Atlas if available
  try {
    console.log('Đang kết nối MongoDB Atlas để trích xuất...');
    await mongoose.connect(MONGODB_URI, { dbName: 'cuahangvaithun', serverSelectionTimeoutMS: 5000 });
    
    const products = await Product.find({}).lean();
    const posts = await Post.find({}).lean();
    const quotes = await Quote.find({}).lean();
    const banners = await Banner.find({}).lean();

    fs.writeFileSync(path.join(backupDir, 'mongo-products.json'), JSON.stringify(products, null, 2), 'utf-8');
    fs.writeFileSync(path.join(backupDir, 'mongo-posts.json'), JSON.stringify(posts, null, 2), 'utf-8');
    fs.writeFileSync(path.join(backupDir, 'mongo-quotes.json'), JSON.stringify(quotes, null, 2), 'utf-8');
    fs.writeFileSync(path.join(backupDir, 'mongo-banners.json'), JSON.stringify(banners, null, 2), 'utf-8');

    console.log(`  ✓ MongoDB: ${products.length} sản phẩm, ${posts.length} bài viết, ${quotes.length} báo giá, ${banners.length} banners.`);
    await mongoose.disconnect();
  } catch (err) {
    console.warn(`  ⚠️ Không thể kết nối MongoDB (${err.message}). Đã sao lưu dữ liệu từ JSON an toàn.`);
  }

  console.log(`\n🎉 Sao lưu hoàn tất! Thư mục lưu: ${backupDir}`);
}

async function restore(backupTargetDir) {
  if (!backupTargetDir || !fs.existsSync(backupTargetDir)) {
    console.error(`❌ Không tìm thấy thư mục sao lưu: ${backupTargetDir}`);
    process.exit(1);
  }

  console.log(`🔄 Bắt đầu khôi phục dữ liệu từ: ${backupTargetDir}`);
  const serverDataDir = path.join(__dirname, 'data');

  const files = ['products.json', 'posts.json', 'banners.json', 'settings.json', 'quotes.json'];
  for (const f of files) {
    const src = path.join(backupTargetDir, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(serverDataDir, f));
      console.log(`  ✓ Đã khôi phục file: ${f}`);
    }
  }

  // Restore to MongoDB if needed
  const mongoProdFile = path.join(backupTargetDir, 'mongo-products.json');
  if (fs.existsSync(mongoProdFile)) {
    try {
      console.log('Đang khôi phục vào MongoDB Atlas...');
      await mongoose.connect(MONGODB_URI, { dbName: 'cuahangvaithun', serverSelectionTimeoutMS: 5000 });
      const products = JSON.parse(fs.readFileSync(mongoProdFile, 'utf-8'));
      if (products.length > 0) {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log(`  ✓ Đã nạp lại ${products.length} sản phẩm lên MongoDB Atlas!`);
      }
      await mongoose.disconnect();
    } catch (err) {
      console.warn(`  ⚠️ Khôi phục MongoDB lỗi: ${err.message}`);
    }
  }

  console.log(`\n🎉 Khôi phục hoàn tất!`);
}

const args = process.argv.slice(2);
if (args[0] === '--restore') {
  restore(args[1]);
} else {
  backup();
}
