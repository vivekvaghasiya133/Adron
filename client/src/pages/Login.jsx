import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Login() {
  const [email, setEmail] = useState('demo@adron.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useShop();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        loginUser(data.user);
        navigate('/');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      // Mock login fallback
      loginUser({ id: '1', name: 'Vivek Patel', email });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">Welcome Back</span>
        <h1 className="font-serif text-3xl font-bold text-[#153323]">Sign In to Adron</h1>
        <p className="text-xs text-gray-500">
          Access your clean beauty order history and exclusive member discounts.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-[#153323]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-gray-700 font-semibold">Password</label>
              <span className="text-[11px] text-[#799A70] hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-[#153323]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#153323] hover:bg-[#204b34] text-white text-sm font-semibold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-500 border-t border-gray-100">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-[#153323] font-bold underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
