'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Newspaper, TrendingUp, Clock, Filter, Share2, Bookmark, Flame, User, Loader2 } from 'lucide-react';
import { useNews } from '@/app/hooks/useNews';
import TitleSection from '@/Components/TitleSection';

const categories = ["الكل", "أخبار الفريق", "النادي", "انتقالات", "ألعاب أخرى", "الناشئين"];

export default function NewsPage() {
  const { news, loading } = useNews();
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filteredNews = activeCategory === "الكل"
    ? news
    : news.filter(item => item.category === activeCategory);

  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const gridNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];
  const sidebarNews = news.slice(0, 4); // Just for trending section

  if (loading && news.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-gray-500 font-black">جاري جلب آخر الأخبار...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground" dir="rtl">

      {/* Dynamic News Ticker */}
      <div className="bg-primary py-3 border-b border-foreground/10 hidden md:block overflow-hidden">
        <div className="relative w-full overflow-hidden">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="inline-flex gap-20 items-center text-foreground text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
          >
            {news.slice(0, 5).map((n, i) => (
              <div key={i} className="flex items-center gap-4">
                <Flame size={14} className="fill-current" />
                <span>{n.title}</span>
              </div>
            ))}
            {news.length === 0 && <span>لا توجد أخبار عاجلة حالياً</span>}
          </motion.div>
        </div>
      </div>

      {/* Hero Section: Editorial Focus */}
      <section className="relative py-24 px-4 md:px-8 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <header className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="space-y-6 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest"
              >
                <Newspaper size={14} />
                <span>المركز الإعلامي الرسمي</span>
              </motion.div>
              <TitleSection
                title="أخبار القلعة البيضاء"
                subtitle="التغطية الحصرية والأخبار الرسمية لنادي الزمالك لحظة بلحظة، من قلب الحدث."
              />
            </div>

            {/* Categories Navigation */}
            <nav className="flex flex-wrap gap-3 bg-card p-2 rounded-[2rem] border border-border shadow-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-primary text-foreground shadow-lg' : 'hover:bg-muted opacity-60'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </header>

          {/* Featured Section */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Headline */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {featuredNews ? (
                  <motion.div
                    key={featuredNews._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className="group relative bg-card rounded-[3.5rem] border border-border overflow-hidden shadow-2xl"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image 
                        src={featuredNews.Photo?.url || "/new.jpg"} 
                        alt={featuredNews.title} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                        priority 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute top-10 right-10 flex gap-3">
                        <div className="px-6 py-2 bg-primary rounded-full text-foreground text-[10px] font-black uppercase tracking-widest shadow-xl">مانشيت اليوم</div>
                        <div className="w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-xl border border-foreground/20 text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-all cursor-pointer">
                          <Share2 size={18} />
                        </div>
                      </div>

                      <div className="absolute bottom-12 right-12 left-12">
                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-foreground/60 mb-6">
                          <div className="flex items-center gap-2">
                            <Clock size={14} /> 
                            <span>{new Date(featuredNews.createdAt).toLocaleDateString('ar-EG')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-black">
                            <Filter size={14} /> 
                            <span>{featuredNews.category || "أخبار الفريق"}</span>
                          </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight text-foreground line-clamp-2">
                          {featuredNews.title}
                        </h2>
                      </div>
                    </div>

                    <div className="p-12 pb-16 flex justify-between items-center">
                      <p className="text-lg font-bold opacity-60 leading-relaxed max-w-xl line-clamp-2">
                        {featuredNews.content}
                      </p>
                      <Link href={`/Pages/News/${featuredNews._id}`} className="w-20 h-20 rounded-full border-2 border-primary text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-foreground transition-all overflow-hidden relative">
                        <ArrowRight size={32} className="relative z-10" />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-[500px] bg-card rounded-[3.5rem] border border-border border-dashed flex items-center justify-center">
                    <p className="text-gray-500 font-bold">لا توجد أخبار في هذا التصنيف حالياً</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar: Trending / Popular */}
            <div className="space-y-8">
              <div className="bg-card rounded-[3rem] border border-border p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                <div className="flex items-center gap-4 mb-10">
                  <TrendingUp size={24} className="text-primary" />
                  <h3 className="text-2xl font-black font-heading">الأكثر قراءة</h3>
                </div>

                <div className="space-y-10">
                  {sidebarNews.map((news, idx) => (
                    <Link key={news._id} href={`/Pages/News/${news._id}`} className="group flex gap-6 items-start">
                      <span className="text-4xl font-black font-heading text-border group-hover:text-primary transition-colors">0{idx + 1}</span>
                      <div className="space-y-2">
                        <h4 className="font-black leading-snug group-hover:text-primary transition-colors line-clamp-2">{news.title}</h4>
                        <div className="flex items-center gap-4 text-[8px] font-black uppercase tracking-widest opacity-40">
                          <div className="flex items-center gap-1"><Clock size={10} /> <span>{new Date(news.createdAt).toLocaleDateString('ar-EG')}</span></div>
                          <span>#خبر_عاجل</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {sidebarNews.length === 0 && <p className="text-center text-gray-500">لا توجد أخبار شائعة</p>}
                </div>
              </div>

              {/* Newsletter Mini */}
              <div className="bg-primary rounded-[3rem] p-10 text-foreground shadow-2xl shadow-primary/30 relative group overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-black font-heading uppercase tracking-tighter italic">Official Newsletter</h3>
                  <p className="text-sm font-bold opacity-80 leading-relaxed">اشترك لتصلك كواليس البيت الأبيض وأخبار الصفقات الجديدة حصرياً.</p>
                  <div className="relative">
                    <input type="email" placeholder="بريدك الإلكتروني" className="w-full bg-foreground/10 border border-foreground/20 rounded-2xl px-6 py-4 placeholder:text-foreground/40 focus:outline-none focus:bg-foreground/20 transition-all text-sm font-bold" />
                    <button className="absolute left-2 top-2 bottom-2 px-6 bg-foreground text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">OK</button>
                  </div>
                </div>
                <Newspaper size={120} className="absolute -bottom-10 -left-10 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: All News */}
      <section className="container mx-auto max-w-7xl px-4 py-32">
        <div className="flex items-center justify-between mb-16 px-4">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-black font-heading tracking-tight">آخر الأخبار</h2>
            <div className="h-px w-32 bg-border hidden md:block" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40">عرض {filteredNews.length} مقال</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {gridNews.map((news, idx) => (
            <motion.div
              key={news._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="group relative flex flex-col h-full bg-card rounded-[2.5rem] border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={news.Photo?.url || "/new.jpg"} alt={news.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 right-6">
                  <div className="px-4 py-1.5 bg-foreground/10 backdrop-blur-xl border border-foreground/20 text-foreground text-[8px] font-black uppercase tracking-widest rounded-lg">
                    {news.category || "أخبار النادي"}
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40">
                    <Calendar size={12} />
                    <span>{new Date(news.createdAt).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <Bookmark size={16} className="opacity-20 hover:text-primary hover:opacity-100 transition-all cursor-pointer" />
                </div>

                <h3 className="text-2xl font-black font-heading leading-tight mb-8 group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-8 border-t border-border/50">
                  <Link href={`/Pages/News/${news._id}`} className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-3">
                    اقرأ المزيد <ArrowRight size={14} />
                  </Link>
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center overflow-hidden">
                      <Image 
                        src={news.author?.profilePhoto?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        alt="author"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
