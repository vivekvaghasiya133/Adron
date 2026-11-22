import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
import { Review } from './models/Review.js';
import { User } from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (if URI provided in .env)
connectDB();

// Local JSON File Fallbacks
const productsFilePath = path.join(__dirname, 'data', 'products.json');
const ingredientsFilePath = path.join(__dirname, 'data', 'ingredients.json');

const getLocalProducts = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
const saveLocalProducts = (list) => fs.writeFileSync(productsFilePath, JSON.stringify(list, null, 2), 'utf8');
const getIngredients = () => JSON.parse(fs.readFileSync(ingredientsFilePath, 'utf8'));

// Initial seed in-memory store
let localOrders = [
  {
    orderId: 'ADR-849201',
    date: '2026-11-21T10:14:00.000Z',
    status: 'Delivered',
    customer: { name: 'Aanya Sharma', email: 'aanya@example.com', phone: '+91 98250 11223' },
    shippingAddress: { address: 'B-12 Orchid Park', city: 'Ahmedabad', state: 'Gujarat', pincode: '380015' },
    paymentMethod: 'UPI',
    items: [
      { productId: 'okra-shampoo', name: 'Smooth & Shine Okra Shampoo', price: 28, quantity: 2, size: '250ml' }
    ],
    totals: { subtotal: 56, shipping: 0, tax: 4.48, total: 60.48 }
  }
];

let localUsers = [
  { id: '1', name: 'Vivek Patel', email: 'demo@adron.com', password: 'password123', role: 'admin' }
];

let localReviews = [
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

// Product endpoints
app.get('/api/products', async (req, res) => {
  const { category, search, sort, bestseller } = req.query;

  if (getDbStatus()) {
    try {
      let filter = {};
      if (category && category !== 'All') {
        filter.category = new RegExp(`^${category}$`, 'i');
      }
      if (bestseller === 'true') {
        filter.isBestseller = true;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'price-asc') sortOption = { price: 1 };
      else if (sort === 'price-desc') sortOption = { price: -1 };
      else if (sort === 'rating') sortOption = { rating: -1 };

      const products = await Product.find(filter).sort(sortOption);
      return res.json({ success: true, count: products.length, source: 'MongoDB Atlas', products });
    } catch (err) {
      console.error('Mongo query error, falling back to local:', err.message);
    }
  }

  // Local JSON Fallback
  let list = getLocalProducts();
  if (category && category !== 'All') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
  if (bestseller === 'true') {
    list = list.filter(p => p.isBestseller);
  }
  if (sort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  res.json({ success: true, count: list.length, source: 'Local JSON', products: list });
});

app.get('/api/products/:id', async (req, res) => {
  if (getDbStatus()) {
    try {
      const product = await Product.findOne({ id: req.params.id });
      if (product) {
        const prodReviews = await Review.find({ productId: product.id });
        return res.json({ success: true, product: { ...product.toObject(), reviews: prodReviews } });
      }
    } catch (err) {
      console.error('Mongo findOne error:', err.message);
    }
  }

  const list = getLocalProducts();
  const product = list.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const productReviews = localReviews.filter(r => r.productId === product.id);
  res.json({ success: true, product: { ...product, reviews: productReviews } });
});

// ADMIN: Add New Product
app.post('/api/products', async (req, res) => {
  const {
    name,
    category,
    price,
    originalPrice,
    badge,
    sizes,
    image,
    gallery,
    description,
    benefits,
    ingredients,
    howToUse,
    isBestseller
  } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ success: false, message: 'Name, price, and category are required' });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = `${slug}-${Date.now().toString().slice(-4)}`;

  const newProduct = {
    id,
    name,
    category,
    price: Number(price),
    originalPrice: originalPrice ? Number(originalPrice) : null,
    rating: 5.0,
    reviewsCount: 1,
    isBestseller: !!isBestseller,
    isNew: true,
    badge: badge || 'New Arrival',
    sizes: sizes && sizes.length > 0 ? sizes : ['Standard'],
    image: image || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: gallery && gallery.length > 0 ? gallery : [image],
    description: description || 'Natural Okra formulation crafted with organic botanicals for deep hydration and radiance.',
    benefits: Array.isArray(benefits) ? benefits : [
      'Infused with pure Okra mucilage extract',
      'Hydrates, protects, and strengthens naturally',
      '100% vegan, cruelty-free, and sulfate-free'
    ],
    ingredients: ingredients || 'Abelmoschus Esculentus (Okra) Fruit Extract, Aqua, Aloe Barbadensis Juice, Tocopherol.',
    howToUse: howToUse || 'Apply as directed. For best results, use daily as part of your clean beauty ritual.'
  };

  // Save to MongoDB if connected
  if (getDbStatus()) {
    try {
      await Product.create(newProduct);
    } catch (err) {
      console.error('MongoDB product create error:', err.message);
    }
  }

  // Also sync to local JSON
  const list = getLocalProducts();
  list.unshift(newProduct);
  saveLocalProducts(list);

  res.status(201).json({
    success: true,
    message: 'Product added successfully to catalog!',
    product: newProduct
  });
});

// ADMIN: Update Existing Product
app.put('/api/products/:id', async (req, res) => {
  const updateData = {
    ...req.body,
    price: req.body.price !== undefined ? Number(req.body.price) : undefined,
    originalPrice: req.body.originalPrice !== undefined ? Number(req.body.originalPrice) : undefined
  };

  if (getDbStatus()) {
    try {
      const updated = await Product.findOneAndUpdate({ id: req.params.id }, updateData, { new: true });
      if (updated) {
        return res.json({ success: true, message: 'Product updated in MongoDB Atlas!', product: updated });
      }
    } catch (err) {
      console.error('MongoDB update error:', err.message);
    }
  }

  const list = getLocalProducts();
  const index = list.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const updated = { ...list[index], ...updateData };
  list[index] = updated;
  saveLocalProducts(list);

  res.json({ success: true, message: 'Product updated successfully!', product: updated });
});

// ADMIN: Delete Product
app.delete('/api/products/:id', async (req, res) => {
  if (getDbStatus()) {
    try {
      await Product.findOneAndDelete({ id: req.params.id });
    } catch (err) {
      console.error('MongoDB delete error:', err.message);
    }
  }

  let list = getLocalProducts();
  const initialLength = list.length;
  list = list.filter(p => p.id !== req.params.id);
  if (list.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  saveLocalProducts(list);

  res.json({ success: true, message: 'Product removed from catalog!' });
});

// ADMIN: Get Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
  if (getDbStatus()) {
    try {
      const totalProducts = await Product.countDocuments();
      const allOrders = await Order.find();
      const totalRevenue = allOrders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
      const categories = await Product.distinct('category');
      const totalReviews = await Review.countDocuments();

      return res.json({
        success: true,
        stats: {
          totalProducts,
          totalOrders: allOrders.length,
          totalRevenue: +totalRevenue.toFixed(2),
          categoriesCount: categories.length,
          totalReviews
        }
      });
    } catch (err) {
      console.error('MongoDB stats error:', err.message);
    }
  }

  const products = getLocalProducts();
  const totalRevenue = localOrders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
  const categories = [...new Set(products.map(p => p.category))];

  res.json({
    success: true,
    stats: {
      totalProducts: products.length,
      totalOrders: localOrders.length,
      totalRevenue: +totalRevenue.toFixed(2),
      categoriesCount: categories.length,
      totalReviews: localReviews.length
    }
  });
});

// ADMIN: Get All Orders
app.get('/api/orders', async (req, res) => {
  if (getDbStatus()) {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, orders });
    } catch (err) {
      console.error('Mongo orders find error:', err.message);
    }
  }
  res.json({ success: true, count: localOrders.length, orders: localOrders });
});

// ADMIN: Update Order Status
app.patch('/api/orders/:orderId/status', async (req, res) => {
  const { status } = req.body;

  if (getDbStatus()) {
    try {
      const order = await Order.findOneAndUpdate(
        { orderId: req.params.orderId },
        { status },
        { new: true }
      );
      if (order) {
        return res.json({ success: true, message: `Order status updated to ${order.status}`, order });
      }
    } catch (err) {
      console.error('Mongo order update error:', err.message);
    }
  }

  const order = localOrders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  order.status = status || order.status;
  res.json({ success: true, message: `Order status updated to ${order.status}`, order });
});

// Ingredients encyclopedia
app.get('/api/ingredients', (req, res) => {
  const ingredients = getIngredients();
  res.json({ success: true, count: ingredients.length, ingredients });
});

// Reviews endpoints
app.get('/api/reviews/:productId', async (req, res) => {
  if (getDbStatus()) {
    try {
      const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
      return res.json({ success: true, reviews });
    } catch (err) {
      console.error('Mongo reviews error:', err.message);
    }
  }
  const productReviews = localReviews.filter(r => r.productId === req.params.productId);
  res.json({ success: true, reviews: productReviews });
});

app.post('/api/reviews', async (req, res) => {
  const { productId, author, rating, title, comment } = req.body;
  if (!productId || !author || !rating || !comment) {
    return res.status(400).json({ success: false, message: 'Missing required review fields' });
  }

  const newReview = {
    id: 'rev-' + Date.now(),
    productId,
    author,
    rating: Number(rating),
    title: title || 'Customer Review',
    comment,
    date: new Date().toISOString().split('T')[0],
    verified: true
  };

  if (getDbStatus()) {
    try {
      await Review.create(newReview);
    } catch (err) {
      console.error('Mongo review create error:', err.message);
    }
  }

  localReviews.unshift(newReview);
  res.status(201).json({ success: true, review: newReview });
});

// Cart validation & calculation
app.post('/api/cart/calculate', (req, res) => {
  const { items, couponCode } = req.body;
  const products = getLocalProducts();

  let subtotal = 0;
  const detailedItems = (items || []).map(item => {
    const prod = products.find(p => p.id === item.productId);
    const price = prod ? prod.price : item.price || 0;
    const lineTotal = price * (item.quantity || 1);
    subtotal += lineTotal;
    return {
      ...item,
      product: prod,
      price,
      lineTotal
    };
  });

  let discount = 0;
  if (couponCode && couponCode.toUpperCase() === 'ADRON15') {
    discount = +(subtotal * 0.15).toFixed(2);
  } else if (couponCode && couponCode.toUpperCase() === 'FIRST10') {
    discount = +(subtotal * 0.10).toFixed(2);
  }

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5.00;
  const tax = +((subtotal - discount) * 0.08).toFixed(2);
  const total = +(subtotal - discount + shipping + tax).toFixed(2);

  res.json({
    success: true,
    calculation: {
      subtotal: +subtotal.toFixed(2),
      discount,
      shipping,
      tax,
      total,
      freeShippingThreshold: 50,
      freeShippingRemaining: Math.max(0, +(50 - subtotal).toFixed(2)),
      items: detailedItems
    }
  });
});

// Checkout / Place order
app.post('/api/checkout', async (req, res) => {
  const { items, customer, shippingAddress, paymentMethod, totals } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  const orderId = 'ADR-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    orderId,
    date: new Date().toISOString(),
    status: 'Confirmed',
    customer: customer || { name: 'Valued Customer', email: 'guest@adron.com' },
    shippingAddress,
    paymentMethod: paymentMethod || 'Card',
    items,
    totals: totals || { total: 0 }
  };

  if (getDbStatus()) {
    try {
      await Order.create(newOrder);
    } catch (err) {
      console.error('Mongo order save error:', err.message);
    }
  }

  localOrders.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order: newOrder
  });
});

app.get('/api/orders/:orderId', async (req, res) => {
  if (getDbStatus()) {
    try {
      const order = await Order.findOne({ orderId: req.params.orderId });
      if (order) return res.json({ success: true, order });
    } catch (err) {
      console.error('Mongo order findOne error:', err.message);
    }
  }

  const order = localOrders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, order });
});

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (getDbStatus()) {
    try {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
      const newUser = await User.create({ name, email, password, role: 'customer' });
      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: 'customer' },
        token: 'jwt-mock-token-' + newUser._id
      });
    } catch (err) {
      console.error('Mongo register error:', err.message);
    }
  }

  if (localUsers.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const newUser = { id: String(Date.now()), name, email, password, role: 'customer' };
  localUsers.push(newUser);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: 'customer' },
    token: 'jwt-mock-token-' + newUser.id
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (getDbStatus()) {
    try {
      const user = await User.findOne({ email, password });
      if (user) {
        return res.json({
          success: true,
          message: 'Login successful',
          user: { id: user._id, name: user.name, email: user.email, role: user.role || 'customer' },
          token: 'jwt-mock-token-' + user._id
        });
      }
    } catch (err) {
      console.error('Mongo login error:', err.message);
    }
  }

  const user = localUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  res.json({
    success: true,
    message: 'Login successful',
    user: { id: user.id, name: user.name, email: user.email, role: user.role || 'customer' },
    token: 'jwt-mock-token-' + user.id
  });
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }
  res.json({
    success: true,
    message: 'Thank you for subscribing! Your 15% discount code is ADRON15'
  });
});

// Serve Frontend in Production
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Adron backend running on http://localhost:${PORT}`);
});
