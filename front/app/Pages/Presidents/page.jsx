'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { History, Shield, Award, Users, Search, Filter } from 'lucide-react';
import { zamalekPresidents } from '@/utils/data';
import TitleSection from '@/Components/TitleSection';

export default function PresidentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">

      {/* Hero: Royal Gallery Intro */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
            alt="Historical Hall"
            fill
            className="object-cover opacity-10 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 md:w-32 md:h-32 relative mx-auto p-4 bg-foreground rounded-3xl shadow-2xl rotate-3"
          >
            <Image src="/teams/zamalek.png" alt="Zamalek SC" fill className="object-contain p-4" />
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-black font-heading tracking-tighter"
            >
              سجل <span className="text-primary italic">الرؤساء</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-2xl font-bold opacity-40 max-w-3xl mx-auto"
            >
              رجال سطروا بمداد من ذهب تاريخ أحد أعظم أندية العالم.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section className="container mx-auto px-4 py-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {zamalekPresidents.map((president, idx) => (
            <PresidentCard key={idx} president={president} index={idx} />
          ))}
        </div>
      </section>

    </div>
  );
}

function PresidentCard({ president, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.1 }}
      className="group relative"
    >
      {/* Decorative Frame */}
      <div className="absolute inset-x-[-10px] inset-y-[-10px] bg-primary/5 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 blur-xl" />

      {/* Card Content */}
      <div className="relative bg-card border border-border rounded-[3.5rem] overflow-hidden flex flex-col h-full shadow-2xl transition-all duration-500 hover:border-primary/30">

        {/* Profile Image & Term Overlay */}
        <div className="relative h-[450px] w-full overflow-hidden">
          <Image
            src={president.img.replace("../public", "")}
            alt={president.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-100" />

          {/* Term Badge */}
          <div className="absolute top-8 right-8 px-6 py-2 rounded-2xl bg-foreground/10 backdrop-blur-xl border border-foreground/20 text-foreground text-[10px] font-black uppercase tracking-widest">
            {president.term}
          </div>

          {/* Floating Index */}
          <div className="absolute bottom-8 left-8 text-foreground/20 text-6xl font-black font-heading italic">
            #{index + 1}
          </div>
        </div>

        {/* Info Area */}
        <div className="p-10 flex flex-col flex-1 relative bg-card">
          <div className="absolute top-0 right-10 w-12 h-1 bg-primary rounded-full -translate-y-1/2" />

          <h3 className="text-2xl font-black font-heading leading-tight mb-4 group-hover:text-primary transition-colors">
            {president.name}
          </h3>

          <p className="text-sm font-bold opacity-60 leading-relaxed line-clamp-4">
            {president.description || "أحد القادة التاريخيين الذين ساهموا في بناء صرح نادي الزمالك العريق وقيادته نحو منصات التتويج في مختلف المجالات الرياضية والإنشائية."}
          </p>

          <div className="mt-auto pt-8 flex items-center justify-between border-t border-border/50">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">رئيس مجلس الإدارة</span>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-foreground transition-all">
              <History size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
