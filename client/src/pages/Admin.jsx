import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  X, 
  ExternalLink,
  Search,
  Lock,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { products, showToast } = useShop();

  // Admin Auth Gate (Persisted in sessionStorage so admin stays logged in during session)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('adron_admin_auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('admin@adron.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('products');
  const [stats, setStats] = useState({
    totalProducts: 6,
    totalOrders: 2,
    totalRevenue: 123.12,
    categoriesCount: 4
  });

  const [productList, setProductList] = useState(products);
  const [ordersList, setOrdersList] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    category: 'Hair Care',
    price: '',
    originalPrice: '',
    badge: 'New Arrival',
    sizes: '250ml, 500ml',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    description: '',
    benefits: 'Cold-pressed Okra mucilage, 100% Vegan & Silicone-free, 72-hour moisture lock',
    ingredients: 'Abelmoschus Esculentus (Okra) Fruit Extract, Aqua, Aloe Barbadensis Leaf Juice, Biotin, Tocopherol.',
    howToUse: 'Apply gently to clean hair/skin. Massage in circular motions.'
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchStatsAndOrders = () => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.stats) setStats(data.stats);
      })
      .catch(() => {});

    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.orders) setOrdersList(data.orders);
      })
      .catch(() => {});

    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.products) setProductList(data.products);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchStatsAndOrders();
    }
  }, [isAdminAuthenticated]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminEmail === 'admin@adron.com' && adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('adron_admin_auth', 'true');
      setAuthError('');
      showToast('Welcome to Adron Merchant Console');
    } else {
      setAuthError('Invalid credentials. Use admin@adron.com / admin123');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('adron_admin_auth');
    showToast('Admin logged out');
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setIsEditing(true);
    setCurrentEditId(p.id);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || '',
      badge: p.badge || '',
      sizes: p.sizes ? p.sizes.join(', ') : '250ml',
      image: p.image,
      description: p.description,
      benefits: p.benefits ? p.benefits.join(', ') : '',
      ingredients: p.ingredients || '',
      howToUse: p.howToUse || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from store catalog?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(`Product "${name}" removed from catalog`);
        setProductList(prev => prev.filter(p => p.id !== id));
        fetchStatsAndOrders();
      }
    } catch {
      setProductList(prev => prev.filter(p => p.id !== id));
      showToast(`Product deleted`);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Order ${orderId} status set to ${newStatus}`);
        setOrdersList(prev =>
          prev.map(o => (o.orderId === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch {
      setOrdersList(prev =>
        prev.map(o => (o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      badge: formData.badge,
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
      image: formData.image,
      description: formData.description,
      benefits: formData.benefits.split(',').map(b => b.trim()).filter(Boolean),
      ingredients: formData.ingredients,
      howToUse: formData.howToUse
    };

    if (isEditing) {
      try {
        const res = await fetch(`/api/products/${currentEditId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast(`"${formData.name}" updated!`);
          setIsModalOpen(false);
          fetchStatsAndOrders();
        }
      } catch {
        showToast('Updated locally');
        setIsModalOpen(false);
      }
    } else {
      try {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast(`"${formData.name}" added to catalog!`);
          setIsModalOpen(false);
          fetchStatsAndOrders();
        }
      } catch {
        showToast('Product added locally');
        setIsModalOpen(false);
      }
    }
  };

  // IF NOT AUTHENTICATED: Display Isolated Admin Login Gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F1E16] text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#162B20] border border-[#234433] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#799A70] text-[#12241A] flex items-center justify-center font-bold text-xl shadow-lg">
              A
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-wider text-white">
              Adron Merchant Portal
            </h1>
            <p className="text-xs text-[#9DBA95]">
              Authorized Store Personnel Only
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-900/40 border border-red-500/50 text-red-200 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle size={15} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#D0E2CE] font-semibold mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-[#102018] border border-[#284C39] text-white px-3.5 py-3 rounded-xl outline-none focus:border-[#799A70]"
              />
            </div>

            <div>
              <label className="block text-[#D0E2CE] font-semibold mb-1.5">Passcode</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-[#102018] border border-[#284C39] text-white px-3.5 py-3 rounded-xl outline-none focus:border-[#799A70]"
              />
            </div>

            <div className="text-[11px] text-[#799A70] bg-[#102018] p-3 rounded-xl border border-[#203D2D]">
              Demo Credentials: <strong>admin@adron.com</strong> / <strong>admin123</strong>
            </div>

            <button
              type="submit"
              className="w-full bg-[#799A70] hover:bg-[#8FB385] text-[#102018] font-bold text-xs py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              <Lock size={15} /> Unlock Admin Console
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link to="/" className="text-xs text-[#9DBA95] hover:text-white flex items-center justify-center gap-1.5 transition">
              <ArrowLeft size={14} /> Back to Customer Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = productList.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCat && matchSearch;
  });

  // FULL STANDALONE ADMIN WORKSPACE (No Customer Navbar or Customer Footer)
  return (
    <div className="min-h-screen bg-[#F4F2EC] flex flex-col md:flex-row text-gray-800">
      {/* LEFT ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#12241A] text-white p-6 flex flex-col justify-between shrink-0 border-r border-[#1C3627]">
        <div className="space-y-8">
          {/* Admin Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#799A70] flex items-center justify-center text-[#12241A] font-bold">
              A
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase text-white block">
                Adron CMS
              </span>
              <span className="text-[10px] text-[#9DBA95] tracking-widest uppercase font-semibold">
                Store Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition text-left ${
                activeTab === 'products'
                  ? 'bg-[#1D3B2A] text-white border-l-4 border-[#799A70]'
                  : 'text-[#B0C7AD] hover:bg-[#183023] hover:text-white'
              }`}
            >
              <Package size={17} />
              <span>Products Catalog ({productList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition text-left ${
                activeTab === 'orders'
                  ? 'bg-[#1D3B2A] text-white border-l-4 border-[#799A70]'
                  : 'text-[#B0C7AD] hover:bg-[#183023] hover:text-white'
              }`}
            >
              <ShoppingBag size={17} />
              <span>Customer Orders ({ordersList.length})</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition text-left text-[#B0C7AD] hover:bg-[#183023] hover:text-white"
            >
              <ExternalLink size={17} />
              <span>View Customer Store ↗</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#1C3627] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1F3E2C] text-[#9DBA95] flex items-center justify-center text-xs font-bold">
              VP
            </div>
            <div className="text-xs">
              <span className="font-bold text-white block">Vivek (Admin)</span>
              <span className="text-[10px] text-[#799A70]">Store Owner</span>
            </div>
          </div>

          <button
            onClick={handleAdminLogout}
            className="w-full bg-[#183023] hover:bg-red-950/60 text-gray-300 hover:text-red-200 text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            <LogOut size={14} /> Exit Console
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-[#E8E4DA] px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#153323]">
              {activeTab === 'products' ? 'Product Catalog Management' : 'Customer Orders & Shipments'}
            </h2>
            <p className="text-xs text-gray-400">
              Manage inventory, prices, product descriptions, and shipping fulfillment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="bg-[#153323] hover:bg-[#204b34] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5"
            >
              <Plus size={16} /> Add New Formulation
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {/* 4 Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
                <Package size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Products</span>
                <h3 className="font-serif text-2xl font-bold text-[#153323]">{stats.totalProducts}</h3>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
                <ShoppingBag size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Orders</span>
                <h3 className="font-serif text-2xl font-bold text-[#153323]">{ordersList.length || stats.totalOrders}</h3>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
                <DollarSign size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Sales</span>
                <h3 className="font-serif text-2xl font-bold text-[#153323]">${stats.totalRevenue.toFixed(2)}</h3>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#EAF1E8] flex items-center justify-center text-[#153323]">
                <Layers size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Categories</span>
                <h3 className="font-serif text-2xl font-bold text-[#153323]">{stats.categoriesCount}</h3>
              </div>
            </div>
          </div>

          {/* TAB 1: PRODUCTS TABLE */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E4DA] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-1 max-w-md bg-[#FAF8F5] border border-gray-200 px-3 py-2 rounded-xl">
                  <Search size={16} className="text-gray-400" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search formulations by title..."
                    className="w-full text-xs bg-transparent outline-none text-gray-800"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 font-medium">Category:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-[#FAF8F5] border border-gray-200 text-xs rounded-xl px-3 py-2 outline-none text-[#153323] font-medium"
                  >
                    <option value="All">All Categories</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Serums">Serums</option>
                    <option value="Body Care">Body Care</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-[#E8E4DA] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-700">
                    <thead className="bg-[#FAF8F5] border-b border-[#E8E4DA] uppercase tracking-wider text-[10px] text-gray-500 font-bold">
                      <tr>
                        <th className="py-4 px-6">Product Formulation</th>
                        <th className="py-4 px-4">Category</th>
                        <th className="py-4 px-4">Price</th>
                        <th className="py-4 px-4">Badge</th>
                        <th className="py-4 px-4">Sizes</th>
                        <th className="py-4 px-4">Rating</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 object-cover rounded-xl bg-gray-100 border border-gray-200"
                              />
                              <div>
                                <Link to={`/product/${p.id}`} target="_blank" className="font-bold text-[#153323] hover:underline block">
                                  {p.name}
                                </Link>
                                <span className="text-[10px] text-gray-400 font-mono">ID: {p.id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="bg-[#EAF1E8] text-[#153323] font-semibold px-2.5 py-1 rounded-full text-[10px]">
                              {p.category}
                            </span>
                          </td>

                          <td className="py-3 px-4 font-bold text-[#153323]">
                            ${Number(p.price).toFixed(2)}
                            {p.originalPrice && (
                              <span className="text-[10px] text-gray-400 line-through block font-normal">
                                ${Number(p.originalPrice).toFixed(2)}
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            {p.badge ? (
                              <span className="bg-[#153323] text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded-full">
                                {p.badge}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-gray-500">
                            {p.sizes ? p.sizes.join(', ') : 'Standard'}
                          </td>

                          <td className="py-3 px-4 font-medium text-gray-800">
                            ★ {p.rating} ({p.reviewsCount || 0})
                          </td>

                          <td className="py-3 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEdit(p)}
                                className="p-1.5 text-gray-500 hover:text-[#153323] hover:bg-gray-100 rounded-lg transition"
                                title="Edit Product"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Delete Product"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS TABLE */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-[#E8E4DA] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-[#FAF8F5] border-b border-[#E8E4DA] uppercase tracking-wider text-[10px] text-gray-500 font-bold">
                    <tr>
                      <th className="py-4 px-6">Order ID & Date</th>
                      <th className="py-4 px-4">Customer Details</th>
                      <th className="py-4 px-4">Items</th>
                      <th className="py-4 px-4">Total Amount</th>
                      <th className="py-4 px-4">Payment</th>
                      <th className="py-4 px-6">Fulfillment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {ordersList.map((o) => (
                      <tr key={o.orderId} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-bold text-[#153323] block">{o.orderId}</span>
                          <span className="text-[10px] text-gray-400">
                            {new Date(o.date).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-semibold text-gray-800 block">{o.customer?.name}</span>
                          <span className="text-[11px] text-gray-500">{o.customer?.email}</span>
                          <span className="text-[10px] text-gray-400 block">{o.shippingAddress?.city}, {o.shippingAddress?.state}</span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            {o.items?.map((item, idx) => (
                              <div key={idx} className="text-[11px]">
                                • {item.name} <strong className="text-[#153323]">x{item.quantity}</strong> ({item.size})
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-4 px-4 font-bold text-base text-[#153323]">
                          ${o.totals?.total?.toFixed(2) || '0.00'}
                        </td>

                        <td className="py-4 px-4 uppercase text-[11px] font-semibold text-gray-600">
                          {o.paymentMethod || 'Card'}
                        </td>

                        <td className="py-4 px-6">
                          <select
                            value={o.status}
                            onChange={(e) => handleStatusChange(o.orderId, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none ${
                              o.status === 'Delivered'
                                ? 'bg-[#EAF1E8] text-[#153323] border-[#799A70]'
                                : o.status === 'Shipped'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADD / EDIT FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8E4DA] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#799A70]">Catalog Editor</span>
                <h3 className="font-serif text-xl font-bold text-[#153323]">
                  {isEditing ? `Edit Formulation (${formData.name})` : 'Add New Okra Formulation'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Product Formulation Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Okra Hydrating Hair Conditioner"
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  >
                    <option value="Hair Care">Hair Care</option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Serums">Serums</option>
                    <option value="Body Care">Body Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Product Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Best Seller / New / Award Winner"
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Selling Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="28.00"
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="34.00"
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Available Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="250ml, 500ml"
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Product Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Description *</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Write about the botanical formulation benefits and texture..."
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Key Benefits (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    placeholder="Seals cuticles, Controls frizz, 100% Vegan"
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Full Ingredients (INCI List)</label>
                  <input
                    type="text"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    placeholder="Abelmoschus Esculentus Extract, Aqua, Biotin..."
                    className="w-full bg-[#FAF8F5] border border-gray-200 p-2.5 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#153323] hover:bg-[#204b34] text-white px-6 py-2.5 rounded-xl font-semibold shadow-md"
                >
                  {isEditing ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
