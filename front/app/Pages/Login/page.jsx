'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ShieldCheck, Github, Chrome, ArrowRight, User } from 'lucide-react';
import { useAuth } from '@/app/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      login(formData.email, formData.password);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden" dir="rtl">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none blur-[120px]" />

      {/* Visual Side (Heritage) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex relative w-1/2 flex-col justify-end p-20"
      >
        <Image
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2076&auto=format&fit=crop"
          alt="Zamalek Heritage"
          fill
          className="object-cover grayscale opacity-40 transition-transform duration-[20s] hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-24 h-24 relative p-4 bg-foreground rounded-3xl shadow-2xl"
          >
            <Image src="/zsc.png" alt="Zamalek SC" fill className="object-contain p-2" />
          </motion.div>
          <h1 className="text-6xl font-black font-heading leading-tight italic">
            أهلاً بك في <br />
            <span className="text-primary not-italic">بيت الأبطال</span>
          </h1>
          <p className="text-xl font-bold opacity-60 max-w-md">
            سجل دخولك لتتمتع بكافة مميزات العضوية الرقمية، متابعة فريقك المفضل، والحصول على تجربة مشجع استثنائية.
          </p>
        </div>
      </motion.div>

      {/* Form Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 relative z-10"
      >
        <div className="w-full max-w-md space-y-12">

          {/* Mobile Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-primary transition-all lg:hidden">
            <ArrowRight size={14} />
            <span>العودة للرئيسية</span>
          </Link>

          <header className="space-y-4 text-center md:text-right">
            <div className="inline-flex md:hidden mb-6">
              <Image src="/zsc.png" alt="Zamalek Logo" width={80} height={80} />
            </div>
            <h2 className="text-5xl font-black font-heading tracking-tight italic">تسجيل <span className="text-primary">الدخول</span></h2>
            <p className="text-lg font-bold opacity-40">أدخل بياناتك للوصول إلى حسابك الشخصي</p>
          </header>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-60 px-4 italic">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 transition-all font-bold" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-card border-2 border-border rounded-3xl py-6 pr-14 pl-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">كلمة المرور</label>
                <Link href="/Pages/ForgetPassword" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline italic">نسيت كلمة المرور؟</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 transition-all font-bold" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-card border-2 border-border rounded-3xl py-6 pr-14 pl-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-20 bg-primary text-foreground rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4"
            >
              <span>تسجيل الدخول</span>
              <ShieldCheck size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase italic">
              <span className="bg-background px-4 opacity-40 tracking-[0.2em]">أو استمر عبر</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 h-16 rounded-22xl bg-card border border-border font-black text-[10px] uppercase hover:bg-muted transition-all rounded-3xl">
              <Chrome size={18} className="text-primary" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 h-16 rounded-22xl bg-card border border-border font-black text-[10px] uppercase hover:bg-muted transition-all rounded-3xl">
              <Github size={18} />
              <span>GitHub</span>
            </button>
          </div>

          <footer className="text-center pt-8">
            <p className="font-bold opacity-40 text-sm">
              ليس لديك حساب؟{' '}
              <Link href="/Pages/Register" className="text-primary hover:underline ml-1 underline-offset-8">إنشاء حساب جديد</Link>
            </p>
          </footer>

        </div>
      </motion.div>

    </div>
  );
}

