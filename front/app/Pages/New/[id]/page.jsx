'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Share2, Bookmark, ArrowRight, MessageSquare, Clock, Shield, Newspaper, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useNews } from '@/app/hooks/useNews';

export default function NewsDetailPage({ params }) {
  const { id } = params;
  const { news } = useNews();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const selected = news.find((n) => n._id === id || n.id === Number(id)) || news[0];
    setArticle(selected);
  }, [id, news]);

  if (!article) return null;

  const relatedNews = news.filter((n) => (n._id || n.id) !== (article._id || article.id)).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">

      {/* Immersive Article Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <Image
            src={article.image || "/new.jpg"}
            alt={article.title}
            fill
            className="object-cover brightness-[0.3] contrast-125 grayscale-[0.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-end relative z-10 pb-20">
          <div className="max-w-5xl space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="px-5 py-1.5 bg-primary rounded-xl text-foreground text-[10px] font-black uppercase tracking-widest">
                Hot News
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-60">
                <div className="flex items-center gap-2"><Calendar size={14} /> <span>{article.date}</span></div>
                <div className="flex items-center gap-2"><Clock size={14} /> <span>5 MIN READ</span></div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-black font-heading tracking-tighter leading-tight italic uppercase"
            >
              {article.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="w-14 h-14 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
                <Image src="/zsc.png" alt="Admin" width={56} height={56} className="object-cover" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest italic">{article.author || "ZSC MEDIA CENTRE"}</div>
                <div className="text-[10px] font-bold opacity-40">Official Club Correspondent</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Editorial Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-32">
        <div className="grid lg:grid-cols-12 gap-24">

          {/* Social Sharing Sidebar (Sticky) */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div className="text-[9px] font-black uppercase tracking-widest rotate-90 origin-left opacity-20 whitespace-nowrap mb-24">Share Article</div>
              <div className="flex flex-col gap-4">
                {[Share2, Bookmark, MessageSquare].map((Icon, idx) => (
                  <button key={idx} className="w-16 h-16 rounded-2xl border border-border flex items-center justify-center hover:bg-primary hover:text-foreground hover:border-primary transition-all shadow-xl group">
                    <Icon size={20} className="opacity-40 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Article Content Area */}
          <article className="lg:col-span-7 space-y-16">

            <div className="space-y-12">
              <div className="text-3xl font-bold opacity-80 leading-relaxed italic border-r-8 border-primary/20 pr-12">
                "{article.description || article.title}"
              </div>

              <div className="prose prose-invert prose-xl max-w-none space-y-8">
                <p className="text-xl font-bold opacity-60 leading-relaxed text-right md:text-justify">
                  {article.content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                </p>

                <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-border shadow-2xl">
                  <Image
                    src={article.image || "/new.jpg"}
                    alt="In-article visual"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                </div>

                <p className="text-xl font-bold opacity-60 leading-relaxed text-right md:text-justify">
                  يُذكر أن نادي الزمالك يواصل استعداداته المكثفة للمباريات المقبلة، وسط إشادة كبيرة من الجهاز الفني بالروح القتالية للاعبين في التدريبات الأخيرة بملعب عبد اللطيف أبو رجيلة. وتسعى الإدارة لتوفير كافة سبل الدعم للفريق لتحقيق تطلعات الجماهير الوفية في حصد المزيد من البطولات المحلية والقارية.
                </p>
              </div>
            </div>

            {/* Tags & Footnote */}
            <div className="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-wrap gap-2">
                {["#الزمالك", "#الدوري_المصري", "#ملوك_الفن"].map(tag => (
                  <span key={tag} className="px-6 py-2 bg-muted rounded-xl text-xs font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all cursor-pointer">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest opacity-20">
                <Shield size={16} />
                <span>Verified Official News</span>
              </div>
            </div>

          </article>

          {/* Sidebar: Recommended & Ticker */}
          <aside className="lg:col-span-4 space-y-16">

            {/* Related Grid */}
            <section className="space-y-10">
              <header className="flex justify-between items-center">
                <h3 className="text-xl font-black font-heading italic">أخبار ذات صلة</h3>
                <div className="h-px flex-1 mx-6 bg-border" />
              </header>

              <div className="space-y-6">
                {relatedNews.map((news, idx) => (
                  <Link key={news.id} href={`/Pages/New/${news.id}`} className="group block p-6 bg-card border border-border rounded-[3rem] hover:border-primary transition-all shadow-xl">
                    <div className="flex gap-6 items-center">
                      <div className="w-24 h-24 relative rounded-[1.5rem] overflow-hidden shrink-0">
                        <Image src={news.image} alt={news.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-[8px] font-black uppercase tracking-widest text-primary">{news.category || "LATEST UPDATE"}</div>
                        <h4 className="text-sm font-black italic line-clamp-2 leading-tight group-hover:text-primary transition-colors">{news.title}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Newsletter Sidebar */}
            <div className="p-10 bg-primary/2 rounded-[4rem] border border-primary/10 shadow-2xl space-y-8 text-center">
              <div className="w-16 h-16 bg-primary text-foreground rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-primary/20">
                <Newspaper size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black font-heading italic">اشترك في النشرة</h4>
                <p className="text-xs font-bold opacity-40">احصل على أهم الأخبار مباشرة عبر بريدك</p>
              </div>
              <form className="space-y-3">
                <input type="email" placeholder="بريدك الإلكتروني" className="w-full h-14 bg-background border border-border rounded-2xl px-6 text-xs font-bold outline-none focus:border-primary transition-all text-center" />
                <button className="w-full h-14 bg-primary text-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">JOIN THE JOURNEY</button>
              </form>
            </div>

          </aside>

        </div>
      </section>

    </div>
  );
}
