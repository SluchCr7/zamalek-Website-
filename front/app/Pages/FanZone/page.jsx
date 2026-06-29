'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Heart, Share2, Camera, Download, Music, MessageCircle, Star, Award, Zap, Smile, Trophy, Play } from 'lucide-react';
export default function FanZonePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden" dir="rtl">

      {/* Hero: Explosive Celebration */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2076&auto=format&fit=crop"
            alt="Zamalek Fans"
            fill
            className="object-cover opacity-30 grayscale brightness-50 contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-12 px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.3em] mb-4"
          >
            <Heart size={16} fill="currentColor" />
            <span>الركن الخاص بجمهور القلعة البيضاء</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black font-heading tracking-tight leading-none italic"
            >
              مـنـطـقـة <br /> <span className="text-primary">الـجـمـاهـيـر</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-3xl font-bold opacity-40 leading-relaxed"
            >
              عالمك الخاص للتفاعل، التحميل، ومشاركة حب الزمالك مع الملايين حول العالم.
            </motion.p>
          </div>
        </div>

        {/* Floating Emblems */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-10 w-24 h-24 bg-foreground/5 rounded-3xl backdrop-blur-3xl hidden xl:flex items-center justify-center border border-foreground/10"
        >
          <Smile size={40} className="text-primary opacity-40" />
        </motion.div>
      </section>

      {/* Interactive Zones */}
      <section className="container mx-auto px-4 py-32 space-y-48">

        {/* Downloads & Wallpapers */}
        <div className="space-y-16">
          <header className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-black font-heading tracking-tight italic">خلفيات <span className="text-primary">الـمـلوك</span></h2>
              <p className="text-xl font-bold opacity-40 max-w-xl">زين هاتفك وجهازك بأجمل تصاميم وخلفيات نادي الزمالك الحصرية بجودة عالية.</p>
            </div>
            <button className="h-16 px-10 border-2 border-primary text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-foreground transition-all flex items-center gap-4">
              <span>View Full Gallery</span>
              <Camera size={18} />
            </button>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <WallpaperCard src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1973&auto=format&fit=crop" title="White Castle Stadium" />
            <WallpaperCard src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2076&auto=format&fit=crop" title="Historical Logo Gold" />
            <WallpaperCard src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop" title="Fans Night" />
            <WallpaperCard src="https://images.unsplash.com/photo-1518091043644-c1d445eb9519?q=80&w=2013&auto=format&fit=crop" title="Training Grounds" />
          </div>
        </div>

        {/* Chants & Music Section */}
        <div className="bg-card rounded-[5rem] border border-border p-12 md:p-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-bl-full" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Fan Anthems</span>
                <h2 className="text-6xl font-black font-heading leading-tight italic">أناشيد <br /> <span className="text-primary italic"> الوفاء</span></h2>
                <p className="text-xl font-bold opacity-40 leading-relaxed">استمع وحمّل هتافات وأغاني جمهور الزمالك التاريخية. صوت القلعة البيضاء في كل مكان.</p>
              </div>

              <div className="space-y-6">
                <ChantItem title="يا زمالك يا هندسة" duration="3:45" />
                <ChantItem title="أبيض في أبيض" duration="4:20" />
                <ChantItem title="ملوك الفن" duration="2:55" />
              </div>
            </div>

            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse scale-90" />
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse scale-110" />
              <div className="relative h-full w-full rounded-full overflow-hidden border-8 border-card shadow-2xl">
                <Image src="/teams/zamalek.png" alt="Zamalek" fill className="object-contain p-20" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border-4 border-dashed border-primary/20 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Community & Stickers */}
        <div className="grid lg:grid-cols-3 gap-12">
          <InteractiveFeature
            icon={<MessageCircle size={32} />}
            title="ملصقات الواتساب"
            desc="أرسل مشاعرك بملصقات (Stickers) لاعبيك المفضلين في كافة المحادثات."
            action="Download Pack"
          />
          <InteractiveFeature
            icon={<Award size={32} />}
            title="اختبارات الزمالك"
            desc="هل أنت زمالكاوي حقيقي؟ اختبر معلوماتك التاريخية واجمع النقاط."
            action="Start Quiz"
          />
          <InteractiveFeature
            icon={<Users size={32} />}
            title="صور الجماهير"
            desc="شاركنا صورك من المدرج أو أثناء التشجيع لتظهر في المعرض الرسمي."
            action="Submit Photo"
          />
        </div>

      </section>

    </div>
  );
}

function WallpaperCard({ src, title }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-border bg-card shadow-2xl"
    >
      <Image src={src} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-100" />

      <div className="absolute bottom-8 right-8 left-8 space-y-4">
        <h4 className="text-xl font-black font-heading text-foreground">{title}</h4>
        <button className="w-full h-14 bg-foreground/10 backdrop-blur-xl border border-foreground/20 rounded-2xl flex items-center justify-center text-foreground hover:bg-primary hover:border-primary transition-all">
          <Download size={18} />
        </button>
      </div>
    </motion.div>
  );
}

function ChantItem({ title, duration }) {
  return (
    <div className="flex items-center justify-between p-6 bg-muted/50 rounded-3xl border border-border group hover:bg-primary hover:border-primary transition-all cursor-pointer">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-foreground/20 group-hover:text-foreground">
          <Music size={20} />
        </div>
        <div className="space-y-1">
          <div className="font-black group-hover:text-foreground transition-colors">{title}</div>
          <div className="text-[10px] font-bold opacity-40 group-hover:text-foreground/40 tracking-widest uppercase mb-1">{duration}</div>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:text-foreground opacity-20 group-hover:opacity-100 transition-all">
        <Play size={14} fill="currentColor" />
      </div>
    </div>
  );
}

function InteractiveFeature({ icon, title, desc, action }) {
  return (
    <div className="p-12 bg-card border border-border rounded-[4rem] group hover:border-primary transition-all flex flex-col h-full shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary transition-all translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0" />
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-20 h-20 rounded-3xl bg-muted text-foreground flex items-center justify-center mb-10 group-hover:bg-foreground group-hover:text-primary transition-all">
          {icon}
        </div>
        <h3 className="text-3xl font-black font-heading mb-6 italic">{title}</h3>
        <p className="text-lg font-bold opacity-40 mb-12 flex-1">{desc}</p>
        <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:text-foreground transition-colors font-body mt-auto">
          <span>{action}</span>
          <Zap size={16} />
        </button>
      </div>
    </div>
  );
}