import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import AdronLogo from '../components/AdronLogo';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useShop();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agree) {
      setError('Please agree to Terms & Conditions');
      return;
    }

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
      // Mock fallback
      loginUser({ id: '2', name, email });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8 bg-[#FAF8F5]">
      <div className="flex flex-col items-center text-center space-y-3">
        <AdronLogo showTagline={true} />
        <h1 className="font-serif text-3xl font-bold text-[#153323] pt-2">Create an Account</h1>
        <p className="text-xs text-gray-500 max-w-xs">
          Join the Adron clean botanical community for member perks and early access.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E8E4DA] shadow-sm space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-2xl border border-red-200">
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
                placeholder="Maya Sharma"
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-full outline-none focus:border-[#153323]"
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
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-full outline-none focus:border-[#153323]"
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
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-full outline-none focus:border-[#153323]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                className="w-full bg-[#FAF8F5] border border-gray-200 pl-10 pr-4 py-2.5 rounded-full outline-none focus:border-[#153323]"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="accent-[#153323] rounded mt-0.5"
            />
            <label htmlFor="agree" className="text-xs text-gray-600 cursor-pointer">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#153323] hover:bg-[#204b34] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-full shadow-lg transition active:scale-95"
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-600 border-t border-gray-100">
          <span>Already have an account? </span>
          <Link to="/login" className="text-[#5B7E52] font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
