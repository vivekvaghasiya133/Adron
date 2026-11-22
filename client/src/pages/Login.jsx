import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import AdronLogo from '../components/AdronLogo';

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
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8 bg-[#FAF8F5]">
      <div className="flex flex-col items-center text-center space-y-3">
        <AdronLogo showTagline={true} />
        <h1 className="font-serif text-3xl font-bold text-[#153323] pt-2">Sign In to Your Account</h1>
        <p className="text-xs text-gray-500 max-w-xs">
          Access your clean beauty order history and exclusive member discounts.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-2xl border border-red-200">
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
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-full outline-none focus:border-[#153323]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-gray-700 font-semibold">Password</label>
              <span className="text-[11px] text-[#5B7E52] hover:underline cursor-pointer">
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
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-full outline-none focus:border-[#153323]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input type="checkbox" id="remember" className="accent-[#153323] rounded" />
            <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer">
              Remember my device
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#153323] hover:bg-[#204b34] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-full shadow-lg transition active:scale-95"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-600 border-t border-gray-100">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-[#5B7E52] font-bold hover:underline">
            Create One
          </Link>
        </div>
      </div>
    </div>
  );
}
