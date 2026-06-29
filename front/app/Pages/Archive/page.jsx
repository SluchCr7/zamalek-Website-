'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, History, Shield, Filter, Maximize2, X, ChevronRight, Award, Trash2 } from 'lucide-react';
import { zamalekTshirts } from '@/utils/data';
import TitleSection from '@/Components/TitleSection';

export default function KitMuseumPage() {
  const [filter, setFilter] = useState('All');
  const [selectedKit, setSelectedKit] = useState(null);

  const providers = useMemo(() => ['All', ...new Set(zamalekTshirts.map(t => t.Provider))], []);

  const filteredKits = useMemo(() =>
    filter === 'All'
      ? zamalekTshirts
      : zamalekTshirts.filter(t => t.Provider === filter),
    [filter]
  );

  return (
    <div className="min-h-screen w-full bg-background text-foreground" dir="rtl">

      {/* Hero: Museum Atmosphere */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop"
            alt="Museum Hall"
            fill
            className="object-cover opacity-10 grayscale brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <History size={14} />
            <span>متحف القمصان التاريخية</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black font-heading tracking-tighter italic"
            >
              متحف <span className="text-primary">القميص</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-3xl font-bold opacity-40 max-w-3xl mx-auto leading-relaxed"
            >
              استعرض تاريخ القميص الأبيض عبر العقود، من الأساطير الأوائل إلى العصر الحديث.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-card p-4 rounded-[3rem] border border-border shadow-2xl flex flex-wrap gap-3 justify-center max-w-4xl mx-auto backdrop-blur-3xl">
          {providers.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === p ? 'bg-primary text-foreground shadow-xl shadow-primary/20' : 'hover:bg-muted opacity-60'
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Museum Grid Section */}
      <section className="container mx-auto px-4 py-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredKits.map((kit, idx) => (
              <KitCard key={kit.sesson + idx} kit={kit} index={idx} onClick={() => setSelectedKit(kit)} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Detailed Lightbox */}
      <AnimatePresence>
        {selectedKit && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4">
            {/* الخلفية */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedKit(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
              /* التعديل الجذري هنا: تحديد الارتفاع الأقصى وتفعيل التمرير العمودي */
              className="relative w-full max-w-5xl bg-card rounded-[2.5rem] lg:rounded-[4rem] border border-border overflow-y-auto max-h-[95vh] shadow-2xl flex flex-col lg:flex-row scrollbar-hide"
            >
              {/* زر الإغلاق - جعلته Sticky ليبقى متاحاً دائماً أثناء التمرير */}
              <button
                onClick={() => setSelectedKit(null)}
                className="sticky lg:absolute top-6 left-6 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-foreground/10 text-foreground flex items-center justify-center hover:bg-primary transition-all z-[60] shadow-xl backdrop-blur-md"
              >
                <X size={24} />
              </button>

              {/* Kit Visual - قسم الصورة */}
              <div className="w-full lg:w-1/2 relative min-h-[350px] sm:min-h-[450px] lg:h-auto bg-muted/20 flex-shrink-0">
                <Image
                  src={selectedKit.img.replace('../public', '')}
                  alt={selectedKit.sesson}
                  fill
                  className="object-contain p-8 sm:p-12 lg:p-24 drop-shadow-[0_32px_64px_rgba(0,0,0,0.4)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
              </div>

              {/* Kit Story - قسم المحتوى النصي */}
              <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-20 flex flex-col justify-center space-y-8 lg:space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-primary font-black text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                    <Star size={14} fill="currentColor" />
                    <span>Classic Heritage</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black font-heading tracking-tighter leading-none italic text-foreground">
                    {selectedKit.sesson}
                  </h2>
                </div>

                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-muted flex items-center justify-center group flex-shrink-0 border border-border">
                      <Shield size={20} className="opacity-40" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest opacity-40">المصنع الرسمي</div>
                      <div className="text-lg sm:text-xl font-black font-heading">{selectedKit.Provider}</div>
                    </div>
                  </div>

                  <p className="text-base sm:text-xl font-bold opacity-60 leading-relaxed italic border-r-4 border-primary/20 pr-4 sm:pr-8">
                    "هذا القميص ليس مجرد قطعة ثياب، بل هو رداء المعارك البطولية التي خاضها ملوك الفن والهندسة."
                  </p>

                  {/* الإحصائيات - تعديل لضمان عدم خروجها في الشاشات الصغيرة */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-4">
                    <div className="text-center p-4 sm:p-6 bg-muted border border-border rounded-2xl sm:rounded-3xl">
                      <div className="text-xl sm:text-2xl font-black font-heading text-primary">100%</div>
                      <div className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest opacity-40">Authentic Fabric</div>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-muted border border-border rounded-2xl sm:rounded-3xl">
                      <div className="text-xl sm:text-2xl font-black font-heading text-primary">HISTORIC</div>
                      <div className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest opacity-40">Collector Item</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function KitCard({ kit, index, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: (index % 4) * 0.05 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[30px] opacity-0 group-hover:opacity-100 transition-all duration-700" />

      <div className="relative aspect-[4/5] rounded-[3.5rem] bg-card border border-border shadow-2xl flex flex-col items-center justify-center p-8 transition-all duration-700 group-hover:-translate-y-4 group-hover:rounded-[2rem] overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />

        <div className="relative w-full h-full transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
          <Image
            src={kit.img.replace('../public', '')}
            alt={kit.sesson}
            fill
            className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_32px_64px_rgba(0,0,0,0.2)]"
          />
        </div>

        <div className="absolute bottom-10 inset-x-10 flex flex-col items-center text-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">{kit.Provider}</div>
          <h3 className="text-2xl font-black font-heading leading-tight whitespace-nowrap">{kit.sesson}</h3>
          <div className="mt-4 flex gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary text-foreground flex items-center justify-center">
              <Maximize2 size={16} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
