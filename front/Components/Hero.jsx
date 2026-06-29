'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Trophy, Sparkles, Star, ArrowLeft, ChevronLeft, Award } from 'lucide-react';
import CountUp from 'react-countup';

const Hero = () => {
  return (
    <section 
      className="relative w-full min-h-screen overflow-hidden bg-zinc-950 text-white flex items-center pt-24 pb-16" 
      aria-label="مقدمة نادي الزمالك"
    >
      {/* Immersive Background Image with Dark Gradient Layer */}
      <Image 
        src="/naserHead.jpg" 
        alt="خلفية استاد نادي الزمالك وجماهيره" 
        fill 
        className="object-cover opacity-40 mix-blend-luminosity scale-105 animate-pulse" 
        priority 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/60 z-0" />
      <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/70 to-zinc-950 z-0 pointer-events-none" />

      {/* Royal Ambient Glow Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Content (Right in RTL) */}
          <div className="lg:col-span-7 space-y-8 text-right">
            
            {/* Top Official Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary backdrop-blur-md"
            >
              <Shield size={15} className="text-primary animate-pulse" />
              <span>الموقع الرسمي لنادي الزمالك للألعاب الرياضية</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-black leading-[1.15] tracking-tight font-heading"
            >
              مدرسة الفن والهندسة
              <span className="block text-transparent bg-clip-text bg-gradient-to-l from-primary via-red-500 to-white mt-2">
                قلعة البطولات العريقة
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-300 font-medium"
            >
              الفارس الأبيض العريق الذي يسطر التاريخ منذ عام 1911 بأمجاد لا تنتهي وطموحات تعانق السماء. نادٍ بني بأقدام الموهوبين وعشق الملايين الأوفياء عبر أجيال المتعاقبة.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link
                href="/Pages/News"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-primary hover:bg-primary-hover text-white px-8 py-4 text-sm font-black tracking-wide transition-all hover:scale-105 shadow-xl shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
              >
                <span>تصفح آخر الأخبار</span>
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/Pages/Store"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white px-8 py-4 text-sm font-black tracking-wide transition-all hover:scale-105 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>زيارة المتجر الرسمي</span>
              </Link>
            </motion.div>

            {/* Clean Modern Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10"
            >
              <StatCard value={1911} label="عام التأسيس" />
              <StatCard value={14} label="دوري مصري" />
              <StatCard value={28} label="كأس مصر" />
              <StatCard value={5} label="دوري أبطال إفريقيا" />
            </motion.div>
          </div>

          {/* Right Spotlight Visual Frame (Clean, Elegant & Impressive) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full max-w-md aspect-square rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-8 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center text-center group"
            >
              {/* Corner Accent Glows */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Central Zamalek Crest Spotlight */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-6 drop-shadow-[0_15px_35px_rgba(227,27,35,0.4)] transition-transform duration-700 group-hover:scale-110">
                <Image 
                  src="/zsc.png" 
                  alt="شعار الزمالك الملكي" 
                  fill 
                  className="object-contain"
                />
              </div>

              {/* Spotlight Content */}
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-primary uppercase tracking-widest">
                  <Award size={16} />
                  <span>القلعة البيضاء الملكية</span>
                </div>
                <h3 className="text-2xl font-black text-white">رمز الفن والهندسة</h3>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-xs mx-auto">
                  أعرق الأندية الرياضية في الشرق الأوسط وإفريقيا بحضور جماهيري لا ينطفئ وشغف ممتد عبر العصور.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* Modern Clean Stat Card Component */
const StatCard = ({ value, label }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md hover:border-primary/40 transition-colors">
    <div className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-0.5 font-heading">
      <CountUp end={value} duration={2.5} enableScrollSpy scrollSpyDelay={100} />
    </div>
    <p className="mt-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{label}</p>
  </div>
);

export default Hero;
