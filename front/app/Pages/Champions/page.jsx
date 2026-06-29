'use client';

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { zamalekTitles } from "@/utils/data";
import { Trophy, Award, Globe, Flag, X, Star } from "lucide-react";

const COLORS = ["#E31B23", "#D4AF37", "#1E3A8A"]; // Red, Gold, Deep Blue

export default function ChampionsPage() {
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState(null);

  const filteredTitles = useMemo(() => {
    if (tab === "all") return zamalekTitles;
    return zamalekTitles.filter((t) => t.category === tab);
  }, [tab]);

  const summary = useMemo(() => {
    const local = zamalekTitles.filter((i) => i.category === "local").reduce((s, x) => s + x.num, 0);
    const continental = zamalekTitles.filter((i) => i.category === "continental").reduce((s, x) => s + x.num, 0);
    const regional = zamalekTitles.filter((i) => i.category === "regional").reduce((s, x) => s + x.num, 0);
    return { 
      local, continental, regional, 
      total: local + continental + regional 
    };
  }, []);

  const chartData = [
    { name: "محلية", value: summary.local },
    { name: "قارية", value: summary.continental },
    { name: "إقليمية", value: summary.regional },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      
      {/* Hero Section: Majestic Hall */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2073&auto=format&fit=crop" 
            alt="Hall of Fame" 
            fill 
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-8 px-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4"
           >
             <Star size={14} fill="currentColor" />
             <span>قاعة كبار ومشاهير القلعة البيضاء</span>
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-8xl font-black font-heading tracking-tighter"
           >
             خزانة <span className="text-primary italic">البطولات</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-xl md:text-2xl font-bold opacity-40 max-w-3xl mx-auto"
           >
             استعرض التاريخ المجيد لنادي الزمالك من خلال سجل حافل بالألقاب المحلية، القارية، والإقليمية.
           </motion.p>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard icon={<Trophy size={20}/>} label="إجمالي الألقاب" value={summary.total} color="primary" />
          <StatCard icon={<Award size={20}/>} label="بطولات محلية" value={summary.local} color="muted" />
          <StatCard icon={<Globe size={20}/>} label="بطولات قارية" value={summary.continental} color="muted" />
          <StatCard icon={<Flag size={20}/>} label="بطولات إقليمية" value={summary.regional} color="muted" />
        </div>
      </section>

      {/* Main Gallery */}
      <section className="container mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-black font-heading tracking-tight">سجل التتويج</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full" />
          </div>

          <div className="flex bg-card p-2 rounded-2xl border border-border shadow-xl">
             {['all', 'local', 'continental', 'regional'].map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    tab === key ? 'bg-primary text-foreground shadow-lg' : 'hover:bg-muted opacity-60'
                  }`}
                >
                  {key === 'all' ? 'الكل' : key === 'local' ? 'محلية' : key === 'continental' ? 'قارية' : 'إقليمية'}
                </button>
             ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTitles.map((title, idx) => (
              <motion.div
                key={title.Title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelected(title)}
                className="group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-[30px] opacity-0 group-hover:opacity-100 transition-all" />
                
                <div className="relative bg-card border border-border rounded-[2.5rem] p-8 h-full flex flex-col items-center text-center shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
                  
                  <div className="relative w-32 h-32 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                     <Image 
                       src={title.img} 
                       alt={title.Title} 
                       fill 
                       className="object-contain"
                     />
                  </div>

                  <h3 className="text-xl font-black font-heading mb-4 px-4 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                    {title.Title}
                  </h3>

                  <div className="mt-auto w-full space-y-6">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest opacity-40">
                       <span>مرات الفوز</span>
                       <span>الفئة</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <div className="text-4xl font-black font-heading text-primary italic">
                         <CountUp end={title.num} />
                       </div>
                       <div className="px-3 py-1 bg-muted rounded-lg text-[8px] font-black uppercase tracking-widest">
                         {title.category}
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Visual Analytics Section */}
      <section className="bg-muted/30 py-32 border-y border-border">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tight leading-tight">
              تحليل <br /> <span className="text-primary italic">السيطرة</span> التاريخية
            </h2>
            <p className="text-lg font-bold opacity-60 leading-relaxed max-w-xl">
              يوضح الرسم البياني توزيع البطولات عبر العقود والمستويات المختلفة. يظهر تفوق النادي في البطولات المحلية مع سجل قاري استثنائي وضعه بين كبار إفريقيا.
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div className="p-8 bg-card border border-border rounded-[2rem]">
                  <div className="text-3xl font-black font-heading text-primary mb-2">100%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40">ألقاب رسمية</div>
               </div>
               <div className="p-8 bg-card border border-border rounded-[2rem]">
                  <div className="text-3xl font-black font-heading text-primary mb-2">24/7</div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40">تاريخ خالد</div>
               </div>
            </div>
          </div>

          <div className="h-[400px] w-full rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={chartData}
                   cx="50%"
                   cy="50%"
                   innerRadius={80}
                   outerRadius={120}
                   paddingAngle={10}
                   dataKey="value"
                   stroke="none"
                 >
                   {chartData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '1rem', color: '#fff' }}
                   itemStyle={{ color: '#fff' }}
                 />
                 <Legend verticalAlign="bottom" height={36}/>
               </PieChart>
             </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Details Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            {/* الخلفية المظلمة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* النافذة المنبثقة (Modal) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              // التعديل هنا: إضافة max-h-full و overflow-y-auto
              className="relative w-full max-w-3xl max-h-[90vh] bg-card rounded-[2rem] md:rounded-[3.5rem] border border-border overflow-y-auto shadow-2xl flex flex-col md:flex-row scrollbar-hide"
            >
              {/* زر الإغلاق - جعلته ثابت (sticky) ليبقى ظاهراً أثناء التمرير */}
              <button
                onClick={() => setSelected(null)}
                className="sticky md:absolute top-4 left-4 md:top-8 md:left-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted/80 backdrop-blur flex items-center justify-center hover:bg-primary hover:text-foreground transition-all z-20 shadow-lg"
              >
                <X size={20} />
              </button>

              {/* قسم الصورة */}
              <div className="w-full md:w-5/12 aspect-square md:aspect-auto relative p-8 md:p-12 bg-muted/30 flex-shrink-0">
                <Image
                  src={selected.img}
                  alt={selected.Title}
                  fill
                  className="object-contain p-8 md:p-12"
                />
              </div>

              {/* قسم المحتوى */}
              <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
                <div className="text-primary font-black font-heading text-3xl md:text-4xl mb-2 md:mb-4 italic">#{selected.num}</div>
                <h2 className="text-2xl md:text-5xl font-black font-heading mb-6 md:mb-8 leading-tight">{selected.Title}</h2>

                <div className="space-y-4 md:y-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">سنوات التتويج</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.years && selected.years.map((year, i) => (
                      <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-muted rounded-xl text-[10px] md:text-xs font-black shadow-sm border border-border">
                        {year}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-6 md:mt-8 text-base md:text-lg font-bold opacity-60 leading-relaxed">
                  {selected.description || "تعد هذه البطولة من الألقاب العزيزة على جماهير القلعة البيضاء، حيث تم تحقيقها بعد نضال رياضي كبير وأداء فني رفيع يجسد مدرسة الفن والهندسة."}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card border border-border rounded-[2rem] p-8 flex items-center gap-6 shadow-2xl group overflow-hidden relative`}
    >
      <div className={`w-14 h-14 rounded-2xl ${color === 'primary' ? 'bg-primary text-foreground' : 'bg-muted'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{label}</div>
        <div className="text-3xl font-black font-heading italic">
          <CountUp end={value} duration={2} />
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/5 rounded-full" />
    </motion.div>
  );
}
