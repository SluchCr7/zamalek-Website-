'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { zamalekTitles } from '@/utils/data';
import { X, Trophy, History, Calendar, ChevronLeft } from 'lucide-react';
import Link from "next/link"
export default function ZamalekAchievements() {
  const [selected, setSelected] = useState(null);

  // Take top items for the home page showcase
  const items = [...zamalekTitles].sort((a, b) => b.num - a.num).slice(0, 3);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Text */}
      <div className="absolute top-0 right-0 text-[15rem] font-black text-primary/5 select-none pointer-events-none translate-x-1/4 -translate-y-1/4 italic leading-none">
        TITLES
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm mb-4"
          >
            <Trophy size={16} />
            <span>خزائن البطولات</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter">قاعة <span className="text-primary italic">الأمجاد</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((title, index) => (
            <motion.div
              key={title.Title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelected(title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(title);
                }
              }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`تاريخ بطولات ${title.Title}`}
              className="group relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[2.5rem]"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] transform group-hover:scale-95 transition-transform duration-500" />
              <div className="relative bg-card border border-border rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Trophy Showcase */}
                <div className="relative w-40 h-40 mb-8 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-50 group-hover:scale-100 transition-transform" />
                  <Image
                    src={title.img}
                    alt={title.Title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Info */}
                <h3 className="text-2xl font-black font-heading mb-4 leading-tight">{title.Title}</h3>

                <div className="flex items-center gap-4">
                  <div className="text-5xl font-black text-primary italic">
                    <CountUp end={title.num} enableScrollSpy />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase opacity-40">مرات</div>
                    <div className="text-sm font-bold">التتويج</div>
                  </div>
                </div>

                {/* Action Decor */}
                <div className="mt-8 pt-8 border-t border-border w-full flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-black uppercase tracking-widest">عرض سجل البطولات</span>
                  <ChevronLeft size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Action */}
        <div className="mt-20 text-center w-full justify-center flex items-center">
          <Link 
            href="/Pages/Champions"
            className="inline-flex items-center gap-4 px-10 py-5 rounded-full border border-border font-black text-sm hover:bg-primary hover:text-white hover:border-primary transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <History size={18} />
            <span>استكشف السجل الكامل للبطولات (114 عام)</span>
          </Link>
        </div>
      </div>

      {/* Modal Hall of Fame */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-[3rem] border border-border flex flex-col md:flex-row overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 left-6 z-10 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="إغلاق النافذة"
              >
                <X size={24} />
              </button>

              {/* Visual Side */}
              <div className="md:w-2/5 p-12 bg-muted/50 flex flex-col items-center justify-center text-center">
                <div className="relative w-full aspect-square mb-8">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                  <Image
                    src={selected.img}
                    alt={selected.Title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">عدد الألقاب</h4>
                <div className="text-7xl font-black italic text-primary leading-none mb-4">
                  {selected.num}
                </div>
              </div>

              {/* Details Side */}
              <div
                className="md:w-3/5 p-8 md:p-16 flex flex-col items-start text-right overflow-y-auto"
                dir="rtl"
              >
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                  <History size={14} />
                  <span>تاريخ البطولات</span>
                </div>

                <h2 id="modal-title" className="text-4xl md:text-5xl font-black font-heading mb-8 leading-tight">{selected.Title}</h2>

                <div className="space-y-8 w-full">
                  <div>
                    <span className="text-[10px] font-black uppercase opacity-40 mb-4 block">سنوات التتويج</span>
                    <div className="flex flex-wrap gap-2">
                      {selected.years.map((year, i) => (
                        <div key={i} className="px-4 py-2 rounded-xl bg-muted border border-border text-sm font-black flex items-center gap-2">
                          <Calendar size={12} className="text-primary" />
                          {year}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-sm font-bold leading-relaxed opacity-60">
                      يُعتبر نادي الزمالك أحد أكثر الأندية تحقيقاً لهذه البطولة تاريخياً، حيث سطر الفرسان ملاحم كروية خالدة في ذاكرة الجماهير البيضاء عبر العصور.
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex gap-4 w-full">
                  <Link href="/Pages/Photos" className="flex-1 py-4 rounded-2xl bg-foreground text-background font-black text-center text-sm hover:scale-[1.02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    عرض معرض الصور
                  </Link>
                  <button onClick={() => setSelected(null)} className="flex-1 py-4 rounded-2xl bg-muted border border-border font-black text-sm hover:bg-border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    رجوع
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
