import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, HeartHandshake, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setEmail('admin@wisehospital.com');
    setPassword('AdminPass123!');
    showToast('Demo admin credentials prefilled!', 'info');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      login(data.token, data.user);
      showToast('Admin authentication successful!', 'success');
      navigate('/admin');
    } catch (err: any) {
      showToast(err.message || 'Invalid credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-8 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-hospital-500 to-teal-400 text-white flex items-center justify-center font-bold shadow-lg">
              <HeartHandshake className="w-6 h-6" />
            </div>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white">St. Jude Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Sign in with authorized administrator credentials.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block text-slate-400 font-semibold">Admin Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="admin@wisehospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-slate-400 font-semibold">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-hospital-500 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-hospital-600 to-teal-600 hover:from-hospital-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-hospital-600/30 flex items-center justify-center gap-2 transition-all mt-4"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            <span>Sign In to Admin Portal</span>
          </button>
        </form>

        {/* Demo Prefill Helper */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-left text-[11px] text-slate-400 space-y-1">
            <p className="font-bold text-slate-300">🔑 Demo Administrator Credentials:</p>
            <p><span className="text-slate-500">Email:</span> admin@wisehospital.com</p>
            <p><span className="text-slate-500">Password:</span> AdminPass123!</p>
          </div>

          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs font-bold text-hospital-400 hover:text-hospital-300 underline"
          >
            Auto-fill Demo Credentials
          </button>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-400 flex items-center justify-center gap-1">
            <span>Return to Hospital Public Website</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
