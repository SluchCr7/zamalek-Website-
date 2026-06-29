'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Bell, ArrowRight, Instagram, Twitter, Facebook, Sparkles, Zap, Shield, Star, Crown, ChevronRight, ChevronLeft } from 'lucide-react';

const products = [
  { id: 1, name: 'Premium Home Jersey 24/25', price: 'EGP 2,400', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop', category: 'Official Kits' },
  { id: 2, name: 'Training Jacket Elite', price: 'EGP 3,200', img: 'https://images.unsplash.com/photo-1511741454602-59015b7dbdef?q=80&w=2070&auto=format&fit=crop', category: 'Lifestyle' },
  { id: 3, name: 'Supporter Scarf Heritage', price: 'EGP 600', img: 'https://images.unsplash.com/photo-1518091043644-c1d445eb9519?q=80&w=2013&auto=format&fit=crop', category: 'Accessories' },
];

const avatars = [
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&h=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop"
];

export default function StoreComingSoon() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">

      {/* Immersive Hero Video/Image Header */}
      <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1511741454602-59015b7dbdef?q=80&w=2070&auto=format&fit=crop"
            alt="Store Hero"
            fill
            className="object-cover opacity-30 grayscale brightness-50 contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10" />
        </div>

        <div className="relative z-10 text-center space-y-16 px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-10 py-4 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.4em] mb-4"
          >
            <Crown size={18} fill="currentColor" />
            <span>The Royal Collection 2024</span>
          </motion.div>

          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-[12rem] font-black font-heading tracking-tighter leading-none italic uppercase"
            >
              مـتـجـر <br /> <span className="text-primary italic">الـمـلـوك</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-4xl font-bold opacity-40 leading-relaxed max-w-3xl mx-auto italic"
            >
              أزياء وعتاد القلعة البيضاء القادم.. مصمم ليليق بملوك الفن والهندسة.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pb-20 pt-8">
            <div className="flex -space-x-4">
              {avatars.map((url, i) => (
                <div key={i} className="w-16 h-16 rounded-full border-4 border-background overflow-hidden relative shadow-lg">
                  <Image
                    src={url}
                    alt={`User ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-16 h-16 rounded-full border-4 border-background bg-primary text-foreground flex items-center justify-center font-black text-xs z-10 shadow-lg">
                +15K
              </div>
            </div>
            <p className="text-sm font-bold opacity-60">مشجع ينتظرون الإطلاق الرسمي</p>
          </div>
        </div>
      </section>

      {/* Product Teaser Carousel */}
      <section className="container mx-auto px-4 py-32 space-y-24">
        <header className="flex flex-col md:flex-row justify-between items-end gap-12 px-4">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Limited Drops</span>
            <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter italic uppercase">تـسـريـبـات <span className="text-primary italic">الـمـوسـم</span></h2>
          </div>
          <div className="flex gap-4">
            <button className="w-16 h-16 rounded-2xl border border-border flex items-center justify-center hover:bg-primary transition-all"><ChevronRight size={24} /></button>
            <button className="w-16 h-16 rounded-2xl border border-border flex items-center justify-center hover:bg-primary transition-all"><ChevronLeft size={24} /></button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* Newsletter & Countdown Experience */}
      <section className="container mx-auto max-w-6xl px-4 py-32">
        <div className="bg-card border border-border rounded-[5rem] overflow-hidden relative p-12 md:p-32 text-center space-y-16 shadow-[0_32px_128px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-1/4 h-full bg-primary/2 rounded-tr-full" />

          <div className="relative z-10 space-y-12">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-7xl font-black font-heading tracking-tight leading-none italic uppercase">كن أول <span className="text-primary">مـن يـعـلم</span></h3>
              <p className="text-xl md:text-2xl font-bold opacity-40 max-w-2xl mx-auto italic leading-relaxed">سجل بريدك الإلكتروني الآن لتحصل على دعوة حصرية لحفل إطلاق المتجر وخصم 15% على أول طلب.</p>
            </div>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="relative max-w-2xl mx-auto group">
                <div className="p-4 bg-muted/30 border-2 border-border rounded-[2.5rem] flex flex-col md:flex-row gap-4 focus-within:border-primary transition-all shadow-inner">
                  <input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني هنا.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-16 px-10 bg-transparent outline-none font-bold text-lg text-center md:text-right"
                  />
                  <button
                    type="submit"
                    className="h-16 px-12 bg-primary text-foreground rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-4"
                  >
                    <span>تفعيل الاشتراك</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-12 bg-primary/10 border-2 border-primary rounded-[3rem] text-primary font-black text-2xl"
              >
                تم التسجيل بنجاح! انتظر مفاجآتنا قريباً.
              </motion.div>
            )}

            <div className="flex items-center justify-center gap-12 pt-8 opacity-40">
              <div className="flex items-center gap-3"><Shield size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Safe Payments</span></div>
              <div className="flex items-center gap-3"><Star size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Official Goods</span></div>
              <div className="flex items-center gap-3"><Zap size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Express Delivery</span></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative cursor-wait"
    >
      <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[40px] opacity-0 group-hover:opacity-100 transition-all duration-700" />

      <div className="relative bg-card border border-border rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col h-full transform transition-all duration-700 group-hover:-translate-y-4">
        <div className="relative aspect-square overflow-hidden bg-muted/20">
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute top-10 right-10 flex gap-2">
            <div className="px-6 py-2 bg-black/40 backdrop-blur-3xl border border-foreground/20 rounded-xl text-foreground text-[8px] font-black uppercase tracking-widest">
              COMING SOON
            </div>
          </div>
        </div>

        <div className="p-10 space-y-6 text-center">
          <div className="space-y-2">
            <div className="text-primary font-black text-[9px] uppercase tracking-widest">{product.category}</div>
            <h3 className="text-2xl font-black font-heading leading-tight">{product.name}</h3>
          </div>

          <div className="w-full h-px bg-border group-hover:bg-primary/20 transition-colors" />

          <div className="flex items-center justify-center gap-4">
            <div className="text-3xl font-black font-heading opacity-40 italic">{product.price}</div>
            <div className="w-12 h-12 rounded-2xl bg-muted text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
              <ShoppingBag size={18} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
