'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, Share2, ArrowRight, Newspaper, Clock } from 'lucide-react';
import Link from 'next/link';
import Nav from '@/Components/Nav';
import Footer from '@/Components/Footer';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold">جاري تحميل الخبر...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-center px-4">
        <div>
          <h2 className="text-3xl font-black mb-4 text-primary">عذراً، الخبر غير موجود</h2>
          <Link href="/Pages/News" className="text-primary hover:underline font-bold">العودة لجميع الأخبار</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={news.Photo?.url || "/new.jpg"}
          alt={news.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto" dir="rtl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-primary text-foreground text-[10px] font-black uppercase tracking-tighter">
                  {news.category || "أخبار الفريق"}
                </span>
                <div className="flex items-center gap-2 text-foreground/60 text-xs font-bold">
                  <Calendar size={14} className="text-primary" />
                  {new Date(news.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight mb-8 text-foreground drop-shadow-lg">
                {news.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              <div className="flex items-center gap-4 p-6 rounded-3xl bg-card border border-border mb-12">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src={news.author?.profilePhoto?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt={news.author?.name || "Admin"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-foreground/40 font-bold">بواسطة</p>
                  <p className="text-sm font-black">{news.author?.name || "المكتب الإعلامي"}</p>
                </div>
                <div className="mr-auto flex gap-2">
                   <button className="p-3 rounded-2xl bg-muted hover:bg-primary/20 transition-colors">
                     <Share2 size={18} className="text-primary" />
                   </button>
                </div>
              </div>

              <div className="text-xl leading-relaxed text-foreground/80 font-bold whitespace-pre-wrap">
                {news.content}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
             {/* Related News or Side Card */}
             <div className="bg-card border border-border rounded-[2.5rem] p-8">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-primary rounded-full" />
                  معلومات الخبر
                </h3>
                
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary">
                        <Tag size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/40 font-bold">التصنيف</p>
                        <p className="text-sm font-black">{news.category || "أخبار الفريق"}</p>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/40 font-bold">وقت النشر</p>
                        <p className="text-sm font-black">
                           {new Date(news.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Newsletter or Ad */}
             <div className="relative rounded-[2.5rem] overflow-hidden bg-primary p-8 text-foreground group">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4">اشترك في النشرة الإخبارية</h3>
                  <p className="text-sm font-bold opacity-80 mb-6">احصل على آخر أخبار النادي حصرياً على بريدك الإلكتروني</p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="بريدك الإلكتروني" 
                      className="bg-foreground/10 border border-foreground/20 rounded-xl px-4 py-3 text-sm focus:outline-none w-full placeholder:text-foreground/40 font-bold"
                    />
                    <button className="bg-foreground text-primary px-6 py-3 rounded-xl font-black text-sm hover:scale-105 transition-transform">
                      اشترك
                    </button>
                  </div>
                </div>
                <Newspaper size={120} className="absolute -bottom-8 -left-8 text-foreground/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
             </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NewsDetail;
