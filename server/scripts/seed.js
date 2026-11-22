import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../models/Product.js';
import { Review } from '../models/Review.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

const initialReviews = [
  {
    id: 'rev-1',
    productId: 'okra-shampoo',
    author: 'Aanya S.',
    rating: 5,
    title: 'Transformed my dry curly hair!',
    comment: 'The slip on this shampoo is unlike anything I have ever used. Most natural shampoos dry out my scalp, but the Okra extract keeps it so soft and shiny!',
    date: '2026-11-10',
    verified: true
  },
  {
    id: 'rev-2',
    productId: 'okra-shampoo',
    author: 'Priya M.',
    rating: 5,
    title: 'Zero frizz even in high humidity',
    comment: 'I live in a humid coastal city, and this shampoo genuinely tamed my frizz without making my fine hair greasy.',
    date: '2026-11-15',
    verified: true
  },
  {
    id: 'rev-3',
    productId: 'okra-serum',
    author: 'Rhea D.',
    rating: 5,
    title: 'Glass skin in a bottle',
    comment: 'Within two weeks my acne spots started fading and my skin has this fresh, bouncy dewy glow.',
    date: '2026-11-05',
    verified: true
  }
];

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.error('❌ MONGODB_URI is not defined in server/.env!');
    console.log('👉 Please add your MongoDB Atlas connection string in server/.env file and run again.');
    process.exit(1);
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas!');

    console.log('🧹 Clearing old products and reviews...');
    await Product.deleteMany({});
    await Review.deleteMany({});

    console.log(`📦 Inserting ${products.length} products...`);
    await Product.insertMany(products);

    console.log(`💬 Inserting ${initialReviews.length} reviews...`);
    await Review.insertMany(initialReviews);

    console.log('🎉 Database seeding completed successfully! All Figma products are now in your MongoDB Atlas cluster.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
