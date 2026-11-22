import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load data
const productsFilePath = path.join(__dirname, 'data', 'products.json');
const ingredientsFilePath = path.join(__dirname, 'data', 'ingredients.json');

const getProducts = () => JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
const saveProducts = (list) => fs.writeFileSync(productsFilePath, JSON.stringify(list, null, 2), 'utf8');

const getIngredients = () => JSON.parse(fs.readFileSync(ingredientsFilePath, 'utf8'));

// Initial seed orders
let orders = [
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
  },
  {
    orderId: 'ADR-718293',
    date: '2026-11-22T08:30:00.000Z',
    status: 'Processing',
    customer: { name: 'Rahul Mehta', email: 'rahul.m@example.com', phone: '+91 99090 33445' },
    shippingAddress: { address: '404 Titanium City Center', city: 'Surat', state: 'Gujarat', pincode: '395007' },
    paymentMethod: 'Card',
    items: [
      { productId: 'okra-serum', name: 'Okra Glow Serum (Niacinamide + Vit C)', price: 36, quantity: 1, size: '30ml' },
      { productId: 'okra-facewash', name: 'Gentle Foaming Okra Face Wash', price: 22, quantity: 1, size: '150ml' }
    ],
    totals: { subtotal: 58, shipping: 0, tax: 4.64, total: 62.64 }
  }
];

let users = [
  { id: '1', name: 'Vivek Patel', email: 'demo@adron.com', password: 'password123', role: 'admin' }
];

let reviews = [
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
app.get('/api/products', (req, res) => {
  let list = getProducts();
  const { category, search, sort, bestseller } = req.query;

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

  res.json({ success: true, count: list.length, products: list });
});

app.get('/api/products/:id', (req, res) => {
  const list = getProducts();
  const product = list.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const productReviews = reviews.filter(r => r.productId === product.id);
  res.json({ success: true, product: { ...product, reviews: productReviews } });
});

// ADMIN: Add New Product
app.post('/api/products', (req, res) => {
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

  const list = getProducts();
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

  list.unshift(newProduct);
  saveProducts(list);

  res.status(201).json({
    success: true,
    message: 'Product added successfully to catalog!',
    product: newProduct
  });
});

// ADMIN: Update Existing Product
app.put('/api/products/:id', (req, res) => {
  const list = getProducts();
  const index = list.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const existing = list[index];
  const updated = {
    ...existing,
    ...req.body,
    price: req.body.price !== undefined ? Number(req.body.price) : existing.price,
    originalPrice: req.body.originalPrice !== undefined ? Number(req.body.originalPrice) : existing.originalPrice
  };

  list[index] = updated;
  saveProducts(list);

  res.json({
    success: true,
    message: 'Product updated successfully!',
    product: updated
  });
});

// ADMIN: Delete Product
app.delete('/api/products/:id', (req, res) => {
  let list = getProducts();
  const initialLength = list.length;
  list = list.filter(p => p.id !== req.params.id);

  if (list.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  saveProducts(list);
  res.json({ success: true, message: 'Product removed from catalog!' });
});

// ADMIN: Get Dashboard Stats
app.get('/api/admin/stats', (req, res) => {
  const products = getProducts();
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
  const categories = [...new Set(products.map(p => p.category))];

  res.json({
    success: true,
    stats: {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: +totalRevenue.toFixed(2),
      categoriesCount: categories.length,
      totalReviews: reviews.length
    }
  });
});

// ADMIN: Get All Orders
app.get('/api/orders', (req, res) => {
  res.json({ success: true, count: orders.length, orders });
});

// ADMIN: Update Order Status
app.patch('/api/orders/:orderId/status', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.orderId === req.params.orderId);
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
app.get('/api/reviews/:productId', (req, res) => {
  const productReviews = reviews.filter(r => r.productId === req.params.productId);
  res.json({ success: true, reviews: productReviews });
});

app.post('/api/reviews', (req, res) => {
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

  reviews.unshift(newReview);
  res.status(201).json({ success: true, review: newReview });
});

// Cart validation & calculation
app.post('/api/cart/calculate', (req, res) => {
  const { items, couponCode } = req.body;
  const products = getProducts();

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
app.post('/api/checkout', (req, res) => {
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

  orders.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order: newOrder
  });
});

app.get('/api/orders/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, order });
});

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const newUser = { id: String(Date.now()), name, email, password, role: 'customer' };
  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: 'customer' },
    token: 'jwt-mock-token-' + newUser.id
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

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

app.listen(PORT, () => {
  console.log(`Adron backend running on http://localhost:${PORT}`);
});
