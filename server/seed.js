import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://khoilam3789_db_user:3nr2wMwcXrHX9tkL@cluster0.e9xn3gz.mongodb.net/cuahangvaithun?retryWrites=true&w=majority";

// Product Schema
const productSchema = new mongoose.Schema({
  id: Number,
  slug: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  category: String,
  price: String,
  main_image: String,
  gallery: [String],
  description: String,
  createdAt: { type: Date, default: Date.now }
});

// Post Schema
const postSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  url: String,
  summary: String,
  content_html: String,
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const Post = mongoose.model('Post', postSchema);

async function seedDatabase() {
  try {
    console.log("Đang kết nối tới MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI, { dbName: 'cuahangvaithun' });
    console.log("Kết nối MongoDB Atlas thành công!");

    // Load local json
    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/products.json'), 'utf-8'));
    const postsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/posts.json'), 'utf-8'));

    // Clear and insert
    await Product.deleteMany({});
    await Product.insertMany(productsData);
    console.log(`Đã nạp ${productsData.length} sản phẩm vải thun vào MongoDB Atlas!`);

    await Post.deleteMany({});
    await Post.insertMany(postsData);
    console.log(`Đã nạp ${postsData.length} bài viết vào MongoDB Atlas!`);

    process.exit(0);
  } catch (error) {
    console.error("Lỗi khi kết nối hoặc seed MongoDB:", error);
    process.exit(1);
  }
}

seedDatabase();
