# Adron — Okra + Science Naturally Nourishing Beauty

A complete, pixel-perfect Full-Stack E-Commerce web application built using **React (Vite)** and **Node.js (Express)**, accurately crafted from the Figma design boards for **Adron**.

---

## 🌿 Overview & Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React Icons, React Router v7
- **Backend:** Node.js, Express REST API, CORS
- **Design Aesthetic:** Premium botanical luxury (Forest green, soft sage, ivory cream, Playfair Display typography)
- **State Management:** Reactive Cart & Wishlist context with localStorage persistence
- **Features:** 100% responsive for desktop, tablet, and mobile screens

---

## 🎨 Pages & Features Implemented (Matching Figma 1:1)

1. **Header & Announcement Bar:**
   - Free shipping progress alert with promo code `ADRON15` (15% off)
   - Adron brand signature botanical emblem & logo
   - Quick navigation links, expandable search bar, Wishlist badge, Cart drawer toggle, and User Profile.

2. **Home Page (`/`):**
   - **Hero Section:** "OKRA + SCIENCE — Powered by Naturally Nourishing Beauty" with product showcase and quick actions.
   - **4 Botanical Value Badges:** 500x Moisture Lock, 100% Vegan, Dermatologist Approved, Visible Radiance.
   - **Best Sellers Grid:** Product cards with ratings, dynamic pricing, and quick Add to Cart.
   - **"Why Okra?" Science Section:** Clinical comparison graphs and botanical mucilage explanation.
   - **Real Customer Results:** Verified customer review cards with star ratings.
   - **Community / Instagram Feed:** Visual grid of clean beauty rituals.

3. **Product Detail Pages (`/product/:id`):**
   - **Smooth & Shine Okra Shampoo** (`/product/okra-shampoo`)
   - **Gentle Foaming Okra Face Wash** (`/product/okra-facewash`)
   - **Okra Glow Serum** (`/product/okra-serum`)
   - **Deep Moisture Okra Hair Mask** (`/product/okra-hair-mask`)
   - Interactive multi-image gallery thumbnails
   - Size selectors (`250ml`, `500ml`)
   - Quantity counter, Add to Bag, and Instant Buy Now
   - Tabbed sections: Product Details, Ritual/How to Use, Full INCI Ingredients, and Live Customer Reviews with a review submission form.

4. **Shop Catalog (`/shop`):**
   - Filter sidebar (Hair Care, Skin Care, Serums, Body Care)
   - Price range slider ($15 - $50)
   - Rating filter (4.8★ & above)
   - Sort dropdown (Featured, Price Low to High, Price High to Low, Rating)

5. **Ingredients Encyclopedia (`/ingredients`):**
   - "Goodness Begins With Ingredients"
   - Deep-dive into Okra Mucilage, Biotin, Niacinamide, Aloe Vera, Argan Oil, and Hyaluronic Acid.

6. **Shopping Bag & Cart Drawer (`/cart`):**
   - Interactive slide-over cart drawer & full cart page
   - Quantity +/- adjustments, item removal, and subtotal calculation
   - Promo code field (supports `ADRON15` for 15% discount and `FIRST10` for 10% discount)
   - Free shipping threshold indicator

7. **Checkout & Payment (`/checkout`):**
   - Shipping details form (Name, Address, City, State, PIN)
   - Delivery speed selection (Eco Standard vs. Priority Express)
   - Payment method selection (UPI/QR, Credit/Debit Card, Net Banking, Cash on Delivery)
   - Live Order confirmation receipt with unique Order ID (e.g. `ADR-839201`)

8. **Curated Wishlist / Favorites (`/favorites`):**
   - Instant wishlisting from any product card with one-click transfer to cart.

9. **Live Search (`/search`):**
   - Instant search across product titles, descriptions, and botanical ingredients.

10. **Authentication (`/login` & `/register`):**
    - Clean user sign-in and account registration.

---

## 🚀 How to Run

### Option 1: Start Both Frontend & Backend Together (Recommended)
From the root directory (`d:\Adron`):
```bash
node start-dev.js
```

### Option 2: Run Separately

**1. Backend Server (Node.js/Express):**
```bash
cd server
npm run dev
# Running on http://localhost:5000
```

**2. Frontend Client (React/Vite):**
```bash
cd client
npm run dev
# Running on http://localhost:5173
```

---

## 📁 Directory Structure
```
d:\Adron\
├── client\                  # React + Vite Frontend
│   ├── src\
│   │   ├── components\      # Navbar, Footer, ProductCard, CartDrawer
│   │   ├── context\         # ShopContext (Cart, Wishlist, Auth)
│   │   ├── pages\           # Home, Shop, ProductDetail, Ingredients, Cart, Checkout, Favorites, etc.
│   │   ├── App.jsx          # Routes & layout setup
│   │   ├── index.css        # Tailwind CSS & theme definitions
│   │   └── main.jsx
│   ├── vite.config.js       # Vite + Tailwind plugin + API Proxy
│   └── package.json
├── server\                  # Node.js + Express Backend
│   ├── data\
│   │   ├── products.json    # Products dataset matching Figma
│   │   └── ingredients.json # Ingredients encyclopedia data
│   ├── server.js            # REST APIs (Products, Ingredients, Cart, Checkout, Auth, Newsletter)
│   └── package.json
├── start-dev.js             # One-command dual launcher
└── package.json
```
