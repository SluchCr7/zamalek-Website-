'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Trophy, History, Shield, Users, ArrowRight, X, PlayCircle } from 'lucide-react';
import { zamalekHistory } from '@/utils/data';
import TitleSection from '@/Components/TitleSection';

export default function AboutPage() {
  const containerRef = useRef(null);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
    
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const timelineData = [
    { year: 1911, title: 'التأسيس', desc: 'تأسس النادي تحت اسم "قصر النيل" على يد البلجيكي جورج مرزباخ لتكون بداية أعظم قلاع الرياضة في الشرق الأوسط.', icon: <Shield size={24} /> },
    { year: 1941, title: 'الملك فاروق', desc: 'تم تغيير اسم النادي إلى "نادي فاروق الأول" بعد التتويج بلقب كأس الملك، وشهدت هذه الحقبة طفرة إنشائية ورياضية كبرى.', icon: <Users size={24} /> },
    { year: 1952, title: 'نادي الزمالك', desc: 'مع قيام الثورة، استقر اسم النادي على "الزمالك" نسبة إلى الحي العريق الذي احتضن النادي في بداياته.', icon: <History size={24} /> },
    { year: 1984, title: 'المجد القاري', desc: 'بداية حقبة السيطرة الإفريقية والتتويج بأول ألقاب دوري أبطال إفريقيا، لتبدأ رحلة الزمالك نحو العالمية.', icon: <Trophy size={24} /> },
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground" dir="rtl" ref={containerRef}>

      {/* Immersive Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2076&auto=format&fit=crop"
          alt="Zamalek Scenary"
          fill
          className="object-cover grayscale opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Scroll Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-right z-[100]"
        />

        <div className="relative z-10 text-center space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 md:w-48 md:h-48 relative mx-auto p-6 bg-foreground rounded-full shadow-[0_32px_128px_rgba(227,27,35,0.2)]"
          >
            <Image src="/teams/zamalek.png" alt="Zamalek SC" fill className="object-contain p-6" />
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black font-heading tracking-tighter"
            >
              مدرسة الفن <span className="text-primary">&</span> الهندسة
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-3xl font-bold opacity-40 max-w-3xl mx-auto"
            >
              أكثر من مائة عام من المجد، الفخر، والوفاء لأعظم قلاع الرياضة في القارة السمراء.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="pt-12 animate-bounce"
          >
            <div className="w-1 h-20 rounded-full bg-gradient-to-b from-primary to-transparent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Modern Timeline Section */}
      <section className="container mx-auto px-4 md:px-8 py-32">
        <TitleSection
          title="محطات خالدة"
          subtitle="رحلة عبر الزمان ترصد أهم التحولات في تاريخ مائة عام من الأبيض"
        />

        <div className="relative mt-24 space-y-24">
          {/* Central Line */}
          <div className="absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-0.5 bg-border hidden md:block" />

          {timelineData.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
            >
              {/* Year Bubble */}
              <div className="absolute right-1/2 translate-x-1/2 w-20 h-20 rounded-full border-4 border-background bg-primary text-foreground flex items-center justify-center font-black text-xl z-20 shadow-xl shadow-primary/20 hidden md:flex">
                {item.year}
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 bg-card p-12 rounded-[3rem] border border-border shadow-2xl relative group hover:border-primary/30 transition-all ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'
                }`}>
                <div className={`flex items-center gap-4 mb-6 ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                  }`}>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-black font-heading">{item.title}</h3>
                </div>
                <p className="text-lg font-bold opacity-60 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-8 text-primary font-black text-4xl opacity-10 font-heading md:hidden">
                  {item.year}
                </div>
              </div>

              {/* Decorative Spacer */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Moments of Glory Showcase */}
      <section className="bg-muted/30 py-32 border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <header className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight">لحظات لا تنسى</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zamalekHistory.slice(0, 6).map((moment, idx) => (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedHighlight(moment)}
                className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-card border border-border aspect-[4/5] shadow-xl"
              >
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <div className="w-12 h-12 rounded-2xl bg-foreground/10 backdrop-blur-xl border border-foreground/20 flex items-center justify-center text-foreground mb-6">
                    <PlayCircle size={24} />
                  </div>
                  <h3 className="text-2xl font-black font-heading text-foreground mb-2 leading-tight">
                    {moment.title}
                  </h3>
                  <p className="text-foreground/60 font-bold text-sm">
                    {moment.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Modal */}
      <AnimatePresence>
        {selectedHighlight && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHighlight(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-card rounded-[3.5rem] border border-border overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedHighlight(null)}
                className="absolute top-8 left-8 w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-foreground transition-all z-10"
              >
                <X size={24} />
              </button>

              <div className="grid md:grid-cols-2 h-full">
                <div className="relative aspect-square md:aspect-auto">
                  <Image src={selectedHighlight.image} alt={selectedHighlight.title} fill className="object-cover" />
                </div>
                <div className="p-12 md:p-16 flex flex-col justify-center">
                  <div className="text-primary font-black font-heading text-4xl mb-4 italic">{selectedHighlight.year}</div>
                  <h2 className="text-3xl md:text-5xl font-black font-heading mb-8 leading-tight">{selectedHighlight.title}</h2>
                  <p className="text-lg font-bold opacity-60 leading-relaxed mb-12">
                    {selectedHighlight.description || "هذه اللحظة تعد علامة فارقة في تاريخ النادي، حيث سطر فيها لاعبو الزمالك ملحمة كروية ستبقى محفورة في ذاكرة كل من ينتمي للقلعة البيضاء."}
                  </p>
                  <button className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest hover:gap-5 transition-all">
                    <span>عرض التوثيق الكامل</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
