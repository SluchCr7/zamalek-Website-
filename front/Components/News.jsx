'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Newspaper, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useNews } from '@/app/hooks/useNews';
import { useAuth } from '@/app/hooks/useAuth';
import { newsList } from '@/utils/data';

const News = () => {
  const { news: backendNews, deleteNews, loading } = useNews();
  const { user } = useAuth();
  const news = backendNews?.length > 0 ? backendNews : newsList;
  const featuredNews = news[0] || {};
  const regularNews = news.slice(1, 4);

  if (loading && news.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-500 font-bold">جاري تحميل الأخبار...</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-16" dir="rtl">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Newspaper size={18} />
            <span className="text-sm font-black uppercase tracking-widest">التغطية الحصرية</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tighter">أخبار <span className="text-primary italic">القلعة البيضاء</span></h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-2xl shadow-black/5 mb-12"
          dir="rtl"
        >
          <div className="relative aspect-video lg:aspect-auto group overflow-hidden">
            <Image
              src={featuredNews.image?.url || featuredNews.image || '/new.jpg'}
              alt={featuredNews.title || 'أحدث الأخبار'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-tighter">
              {featuredNews.category || 'أخبار الفريق'}
            </div>
            {user?.isAdmin && featuredNews._id && (
              <div className="absolute top-6 left-6 flex gap-2">
                <button
                  onClick={() => deleteNews(featuredNews._id)}
                  className="p-2 bg-red-600/80 backdrop-blur-md rounded-full text-white hover:bg-red-700 transition-colors shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center items-start">
            <div className="flex items-center gap-2 text-primary font-black text-xs mb-4 uppercase tracking-[0.2em]">آخر خبر</div>
            <h3 className="text-3xl md:text-4xl font-black font-heading mb-6 tracking-tight leading-tight group-hover:text-primary transition-colors">
              {featuredNews.title || 'الزمالك يواصل استعداداته لمرحلة الحسم'}
            </h3>
            <p className="text-lg font-bold opacity-60 leading-relaxed mb-8">
              {featuredNews.content || featuredNews.description || 'خاض الفريق الأول لكرة القدم بنادي الزمالك تدريباً قوياً استعداداً لمباراته المقبلة.'}
            </p>

            <div className="flex items-center justify-between w-full mt-auto pt-8 border-t border-border">
              <div className="flex items-center gap-3 opacity-40">
                <Calendar size={16} className="text-primary" />
                <span className="text-xs font-black">{featuredNews.date || '27 ديسمبر 2025'}</span>
              </div>

              <Link
                href={`/Pages/News/${featuredNews._id || featuredNews.id || ''}`}
                className="flex items-center gap-2 text-sm font-black text-primary hover:gap-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
              >
                اقرأ الخبر كاملاً
                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir="rtl">
          {regularNews.map((item, index) => {
            const itemTitle = item.title || 'خبر الزمالك القادم';
            const itemImg = item.image?.url || item.image || '/new.jpg';
            const itemDate = item.date || 'اليوم';
            const itemCategory = item.category || 'الزمالك';
            const itemId = item._id || item.id || index;

            return (
              <motion.div
                key={itemId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card rounded-[2rem] border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-primary/50 focus-within:border-primary/50"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={itemImg}
                    alt={itemTitle}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-[2px] bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-primary">{itemCategory}</span>
                  </div>
                  <h4 className="text-xl font-black font-heading mb-6 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {itemTitle}
                  </h4>
                  <p className="text-sm font-bold opacity-60 leading-relaxed mb-8 line-clamp-3">
                    {item.summary || item.description || 'تابع معنا أحدث أخبار الفريق ومواعيد المباريات.'}
                  </p>

                  <div className="flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <span className="text-[10px] font-bold">{itemDate}</span>
                    </div>
                    <Link
                      href={`/Pages/News/${itemId}`}
                      className="p-2 rounded-full hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label={`اقرأ الخبر: ${itemTitle}`}
                    >
                      <ArrowLeft size={16} className="text-primary" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/Pages/News"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border font-black text-sm hover:bg-primary hover:text-white hover:border-primary transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span>عرض كافة الأخبار</span>
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
