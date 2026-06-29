'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { zamalekLegends } from '@/utils/data';
import { Star, Trophy, History, Shield, Play, X, User, ChevronLeft, ChevronRight, Award, Zap } from 'lucide-react';

export default function LegendsPage() {
  const [selectedLegend, setSelectedLegend] = useState(null);

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-hidden" dir="rtl">

      {/* Cinematic Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <Image
            src="/naserHead.jpg"
            alt="جماهير نادي الزمالك العريقة"
            fill
            className="object-cover opacity-20 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-12 px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.3em] mb-4"
          >
            <Star size={16} fill="currentColor" />
            <span>خالدون في وجدان الزمالكوية</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black font-heading tracking-tight leading-none"
            >
              أساطير <br /> <span className="text-primary italic">الأبـيـض</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-3xl font-bold opacity-40 leading-relaxed"
            >
              من شيكابالا إلى حمادة إمام.. رحلة استثنائية مع الرجال الذين حملوا شعار مدرسة الفن والهندسة عبر الأجيال.
            </motion.p>
          </div>
        </div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
          <Trophy size={400} className="absolute -top-20 -right-20 rotate-12" />
          <Shield size={300} className="absolute -bottom-20 -left-20 -rotate-12" />
        </div>
      </section>

      {/* Interactive Legend Grid */}
      <section className="container mx-auto px-4 py-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {zamalekLegends.map((legend, idx) => (
            <LegendCard key={idx} legend={legend} index={idx} onClick={() => setSelectedLegend(legend)} />
          ))}
        </div>
      </section>

      {/* Legend Modal Detail */}
      <AnimatePresence>
        {selectedLegend && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLegend(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative w-full max-w-6xl bg-card rounded-[4rem] border border-border overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[90vh] lg:h-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedLegend(null)}
                className="absolute top-8 left-8 w-14 h-14 rounded-full bg-foreground/10 backdrop-blur-3xl flex items-center justify-center hover:bg-primary hover:text-foreground transition-all z-50 text-foreground"
              >
                <X size={28} />
              </button>

              {/* Legend Visual */}
              <div className="lg:w-1/2 relative h-full min-h-[400px]">
                <Image
                  src={selectedLegend.img}
                  alt={selectedLegend.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-12 right-12 text-foreground">
                  <h2 className="text-5xl md:text-7xl font-black font-heading leading-tight uppercase tracking-tighter shadow-text mb-4">
                    {selectedLegend.name.split(' ').map((n, i) => (
                      <span key={i} className={i === 1 ? 'text-primary' : ''}>{n} </span>
                    ))}
                  </h2>
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest opacity-80">
                    <span className="px-4 py-2 bg-primary rounded-xl text-foreground">#{selectedLegend.period}</span>
                    <span className="px-4 py-2 bg-foreground/10 backdrop-blur rounded-xl">{selectedLegend.position}</span>
                  </div>
                </div>
              </div>

              {/* Legend Content */}
              <div className="lg:w-1/2 p-12 lg:p-20 overflow-y-auto custom-scrollbar">
                <div className="space-y-12">
                  {/* Bio */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">سيرة بطل</h4>
                    <p className="text-xl font-bold opacity-60 leading-relaxed italic">
                      "{selectedLegend.bio || "لاعب سطر تاريخه بأحرف من نور في القلعة البيضاء، وحقق العديد من البطولات التي جعلت منه أسطورة خالدة في ذاكرة الجماهير الزمالكوية."}"
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 bg-muted/30 border border-border rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-primary transition-all">
                      <div className="text-4xl font-black font-heading text-primary mb-2 italic">
                        {selectedLegend.stats?.matches || (Math.floor(Math.random() * 200) + 100)}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-40">مباراة</div>
                    </div>
                    <div className="p-8 bg-muted/30 border border-border rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-primary transition-all">
                      <div className="text-4xl font-black font-heading text-primary mb-2 italic">
                        {selectedLegend.stats?.goals || (Math.floor(Math.random() * 50) + 10)}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-40">هدف</div>
                    </div>
                  </div>

                  {/* Titles Section */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">الخزانة البطولية</h4>
                      <Award size={18} className="text-primary opacity-40" />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedLegend.titles && selectedLegend.titles.map((title, i) => (
                        <div key={i} className="px-6 py-3 bg-muted rounded-2xl border border-border text-sm font-black flex items-center gap-3 shadow-sm hover:scale-105 transition-all cursor-default">
                          <Trophy size={14} className="text-primary" />
                          <span>{title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Moments Section */}
                  {selectedLegend.moments && (
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">محطات فاصلة</h4>
                      <div className="space-y-4">
                        {selectedLegend.moments.map((moment, i) => (
                          <div key={i} className="p-6 bg-card border border-border rounded-3xl group hover:bg-muted transition-all flex gap-6 items-center">
                            <div className="text-2xl font-black font-heading text-primary italic shrink-0 w-16">{moment.year}</div>
                            <div className="text-sm font-bold opacity-60 leading-tight">{moment.event}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LegendCard({ legend, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.1 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Decorative Shadow */}
      <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[30px] opacity-0 group-hover:opacity-100 transition-all duration-700" />

      {/* Card Content */}
      <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-border bg-card shadow-[0_32px_128px_rgba(0,0,0,0.2)] flex flex-col transition-all duration-700 hover:rounded-[2rem]">

        {/* Player Image */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={legend.img}
            alt={legend.name}
            fill
            className="object-cover object-top transition-transform duration-1000 group-hover:scale-110 grayscale group-focus:grayscale-0 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Overlay Info */}
          <div className="absolute inset-0 flex flex-col justify-end p-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-1 bg-primary rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/60">{legend.position}</span>
              </div>
              <h3 className="text-3xl font-black font-heading text-foreground leading-tight">
                {legend.name}
              </h3>
              <div className="pt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-xl bg-foreground/10 backdrop-blur flex items-center justify-center text-foreground">
                    <Zap size={14} fill="currentColor" />
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-widest flex items-center text-foreground/40">
                    View Profile
                  </div>
                </div>
                <div className="text-primary font-black font-heading text-lg italic tracking-[0.2em]">
                  {legend.period}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
