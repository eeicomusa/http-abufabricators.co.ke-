import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, X, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAdmin, cmsData } = useCms();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isLoginModalOpen) {
      setErrorMsg('');
      setPassword('');
    }
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(email, password);
    if (!ok) {
      setErrorMsg('Invalid email address or password. Please verify your admin credentials.');
      return;
    }
    setEmail('');
    setPassword('');
    setErrorMsg('');
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
    >
      <div className="w-full max-w-md bg-[#0f172a] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="px-6 py-4 bg-[#161f33] border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#ff6200] text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#ff6200] font-bold">
                {cmsData.siteIdentity.shortName} CMS
              </div>
              <h2 id="admin-login-title" className="text-base font-heading font-bold uppercase">
                Administrator Login
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            aria-label="Close login modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Sign in with your administrator email and password to access the WordPress &amp; Elementor
            CMS Studio, upload media, and edit website sections.
          </p>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="cms-admin-email" className="block text-[11px] font-mono uppercase text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="cms-admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="admin@abufabricators.co.ke"
                className="w-full pl-9 pr-3 py-2.5 bg-[#0b1120] border border-[#334155] focus:border-[#ff6200] focus:outline-none rounded-md text-sm text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="cms-admin-password" className="block text-[11px] font-mono uppercase text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="cms-admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter password"
                className="w-full pl-9 pr-10 py-2.5 bg-[#0b1120] border border-[#334155] focus:border-[#ff6200] focus:outline-none rounded-md text-sm text-white placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="px-4 py-2 rounded-md border border-[#334155] text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#ff6200] hover:bg-[#e05600] text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors"
            >
              Sign In to CMS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
