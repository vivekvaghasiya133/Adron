import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useShop();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        loginUser(data.user);
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      loginUser({ id: String(Date.now()), name, email });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#799A70]">Join The Ritual</span>
        <h1 className="font-serif text-3xl font-bold text-[#153323]">Create Account</h1>
        <p className="text-xs text-gray-500">
          Sign up to enjoy 15% off your first order and track shipments easily.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vivek Patel"
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-[#153323]"
              />
            </div>
          </div>

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
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-[#153323]"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 text-[11px] text-gray-500">
            <input type="checkbox" required className="mt-0.5 accent-[#153323]" />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#153323] hover:bg-[#204b34] text-white text-sm font-semibold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-500 border-t border-gray-100">
          <span>Already have an account? </span>
          <Link to="/login" className="text-[#153323] font-bold underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
