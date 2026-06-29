'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Award, Users, ArrowRight, Instagram, Twitter, Linkedin } from 'lucide-react';
import { zamalekDirectors } from '@/utils/data';
import TitleSection from '@/Components/TitleSection';

export default function DirectorsPage() {
  const president = zamalekDirectors[0];
  const vicePresident = zamalekDirectors[1];
  const treasurer = zamalekDirectors[2];
  const members = zamalekDirectors.slice(3);

  return (
    <div className="min-h-screen w-full bg-background text-foreground py-24 px-4 overflow-hidden" dir="rtl">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-[100vh] bg-primary/5 pointer-events-none skew-y-12 origin-top-right scale-150" />

      <div className="container mx-auto space-y-32 relative z-10">

        <header className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-4"
          >
            <Shield size={14} />
            <span>مجلس الإدارة المنتخب</span>
          </motion.div>
          <TitleSection
            title="قيادة القلعة البيضاء"
            subtitle="نخبة من الكفاءات المصرية تقود مسيرة التطوير والنجاح لنادي الزمالك نحو آفاق عالمية."
          />
        </header>

        {/* President Section */}
        <section className="flex w-full items-center justify-center">
          <DirectorCard director={president} size="xl" featured />
        </section>

        {/* Vice & Treasurer Section */}
        <section className="flex w-full gap-12 items-center justify-center">
          <DirectorCard director={vicePresident} size="lg" />
          <DirectorCard director={treasurer} size="lg" />
        </section>

        {/* Board Members Grid */}
        <section className="space-y-16">
          <div className="flex items-center gap-8">
            <h2 className="text-3xl font-black font-heading shrink-0">أعضاء المجلس</h2>
            <div className="h-px w-full bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member, idx) => (
              <DirectorCard key={member.id} director={member} size="md" index={idx} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

function DirectorCard({ director, size = 'md', featured = false, index = 0 }) {
  const config = {
    xl: { w: 'md:w-96', h: 'h-[500px]', text: 'text-3xl' },
    lg: { w: 'w-full max-w-sm', h: 'h-[400px]', text: 'text-2xl' },
    md: { w: 'w-full', h: 'h-[350px]', text: 'text-xl' }
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative flex flex-col items-center text-center ${config.w}`}
    >
      {/* Visual Frame */}
      <div className={`relative ${config.h} w-full rounded-[3rem] overflow-hidden border-2 border-border bg-card shadow-2xl transition-all duration-700 group-hover:border-primary group-hover:rounded-[1.5rem]`}>
        <Image
          src={director.img}
          alt={director.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-100" />

        {/* Social Hover */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-4">
          {[Instagram, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 rounded-xl bg-primary text-foreground flex items-center justify-center hover:scale-110 transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Badge */}
        {featured && (
          <div className="absolute top-6 right-6 p-4 rounded-2xl bg-primary/90 text-foreground shadow-2xl shadow-primary/40">
            <Award size={24} />
          </div>
        )}
      </div>

      {/* Text Info */}
      <div className="mt-8 space-y-2 px-4 translate-y-2 group-hover:translate-y-0 transition-all">
        <h3 className={`${config.text} font-black font-heading leading-tight`}>{director.name}</h3>
        <p className="text-sm font-bold text-primary uppercase tracking-widest">{director.position}</p>
        <div className="w-8 h-1 bg-border mx-auto rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
      </div>
    </motion.div>
  );
}
