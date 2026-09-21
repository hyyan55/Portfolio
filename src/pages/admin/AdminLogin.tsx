import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(username, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center p-4 selection:bg-sky-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Security Header Monogram */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl mb-4 text-sky-400">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-white mb-1">
            لوحة إدارة الموقع | Hayyan Mohamed
          </h1>
          <p className="text-xs text-zinc-400 tracking-wide">
            يرجى تسجيل الدخول للوصول إلى لوحة التحكم والتعديل
          </p>
        </div>

        {/* Login Box */}
        <div className="p-8 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-semibold text-sky-400 bg-sky-950/40 border border-sky-900/40 px-3 py-2 rounded-xl mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>تسجيل دخول محمي • Secure Admin</span>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                اسم المستخدم / Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="hyyan55"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                كلمة المرور / Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm shadow-md shadow-sky-500/20 transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              <span>{loading ? 'جارٍ التحقق...' : 'تسجيل الدخول إلى لوحة التحكم'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Back to public link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← العودة إلى الموقع الرئيسي (Public Site)
          </a>
        </div>
      </div>
    </div>
  );
};
