'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShieldCheck, Zap, Github, Chrome, AtSign } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const { registerNewUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, username, email, password } = formData;
    if (!name || !username || !email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      registerNewUser(username, name, email, password);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden" dir="rtl">

      {/* Visual Identity Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-1/2 relative hidden lg:flex flex-col items-center justify-center p-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop"
            alt="Zamalek Heritage"
            fill
            className="object-cover opacity-20 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-12 max-w-xl">
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-40 h-40 relative mx-auto p-4 bg-foreground rounded-[2.5rem] shadow-2xl"
          >
            <Image src="/zsc.png" alt="Zamalek Logo" fill className="object-contain p-4" />
          </motion.div>

          <div className="space-y-6">
            <h1 className="text-6xl font-black font-heading tracking-tighter leading-none italic uppercase">
              انضم إلى <br /> <span className="text-primary italic">عـائـلـة</span> الـمـلـوك
            </h1>
            <p className="text-xl font-bold opacity-40 leading-relaxed italic">
              كن جزءاً من أعرق كيان رياضي في الشرق الأوسط. ابدأ رحلتك الآن في عالم ملوك الفن والهندسة.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-12">
            <StatBox value="1911" label="FOUNDED" />
            <StatBox value="80+" label="TROPHIES" />
            <StatBox value="MILLIONS" label="OF FANS" />
          </div>
        </div>
      </motion.div>

      {/* Auth Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg space-y-10 py-12"
        >
          <div className="space-y-4 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} />
              <span>تسجيل آمن للمشجعين</span>
            </div>
            <h2 className="text-5xl font-black font-heading tracking-tight italic">أنشئ حساباً <br className="lg:hidden" /> <span className="text-primary">جـديـداً</span></h2>
            <p className="text-lg font-bold opacity-40">كن جزءاً من القلعة البيضاء الآن.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="الاسم بالكامل"
                icon={<User size={18} />}
                type="text"
                placeholder="Ahmed Abu Bakr"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <InputField
                label="اسم المستخدم"
                icon={<AtSign size={18} />}
                type="text"
                placeholder="ahmed8k"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <InputField
              label="البريد الإلكتروني"
              icon={<Mail size={18} />}
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div className="relative">
              <InputField
                label="كلمة المرور"
                icon={<Lock size={18} />}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-6 top-14 text-foreground/20 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full h-20 bg-primary text-foreground rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-foreground/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>أنشئ حسابي الآن</span>
                  <Zap size={18} fill="currentColor" />
                </>
              )}
            </motion.button>
          </form>

          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest italic">
                <span className="bg-background px-4 opacity-40">أو سجل عبر</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="h-16 rounded-3xl border border-border bg-card flex items-center justify-center gap-3 font-bold text-sm hover:border-primary transition-all">
                <Chrome size={18} className="text-primary" />
                <span>Google</span>
              </button>
              <button className="h-16 rounded-3xl border border-border bg-card flex items-center justify-center gap-3 font-bold text-sm hover:border-primary transition-all">
                <Github size={18} />
                <span>GitHub</span>
              </button>
            </div>

            <p className="text-center font-bold text-sm opacity-40">
              لديك حساب بالفعل؟ <Link href="/Pages/Login" className="text-primary hover:underline underline-offset-8">سجل دخولك من هنا</Link>
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div className="text-center space-y-2">
      <div className="text-2xl font-black font-heading text-primary italic">{value}</div>
      <div className="text-[8px] font-black uppercase tracking-widest opacity-40 italic">{label}</div>
    </div>
  );
}

function InputField({ label, icon, type, placeholder, value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mr-4 italic">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 right-6 flex items-center opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full h-16 bg-muted/30 border-2 border-border rounded-2xl pr-14 pl-6 focus:outline-none focus:border-primary focus:bg-card transition-all font-bold placeholder:opacity-20 placeholder:font-black placeholder:text-xs"
          required
        />
      </div>
    </div>
  );
}

