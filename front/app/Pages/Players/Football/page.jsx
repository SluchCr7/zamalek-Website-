'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, ArrowLeft, Target, Activity, Trophy } from 'lucide-react';
import { zamalekCoachingStaff, zamalekPlayersWithId, zamalekTitles } from '@/utils/data';

export default function PlayersPage() {
  const [activeTab, setActiveTab] = useState('Roster');

  // Filter Roster by position categories
  const goalkeepers = zamalekPlayersWithId.filter(p => p.mainPosition === 'Goalkeeper');
  const defenders = zamalekPlayersWithId.filter(p => p.mainPosition === 'Defender');
  const midfielders = zamalekPlayersWithId.filter(p => p.mainPosition === 'Midfielder');
  const forwards = zamalekPlayersWithId.filter(p => p.mainPosition === 'Forward');

  const rosterGroups = [
    { title: "حراس المرمى (Goalkeepers)", key: "gk", data: goalkeepers },
    { title: "خط الدفاع (Defenders)", key: "df", data: defenders },
    { title: "خط الوسط (Midfielders)", key: "mf", data: midfielders },
    { title: "خط الهجوم (Forwards)", key: "fw", data: forwards },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">

      {/* Cinematic Hero */}
      <section className="relative pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden border-b border-border bg-neutral-950">
        {/* Simple elegant grid overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] opacity-30"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 relative mx-auto"
          >
            <Image src="/teams/zamalek.png" alt="Zamalek SC" fill className="object-contain" />
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black tracking-tight uppercase"
            >
              كتيبة <span className="text-primary font-heading italic">كرة القدم</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto"
            >
              قائمة لاعبي الفريق الأول لكرة القدم بنادي الزمالك العريق والجهاز الفني والإداري.
            </motion.p>
          </div>

          {/* Simple elegant stats cards row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 pt-8"
          >
            <div className="text-center bg-card/30 backdrop-blur-sm border border-border/50 px-6 py-3 rounded-2xl">
              <div className="text-2xl md:text-3xl font-black font-heading text-primary">14</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">الدوري المصري</div>
            </div>
            <div className="text-center bg-card/30 backdrop-blur-sm border border-border/50 px-6 py-3 rounded-2xl">
              <div className="text-2xl md:text-3xl font-black font-heading text-primary">29</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">كأس مصر</div>
            </div>
            <div className="text-center bg-card/30 backdrop-blur-sm border border-border/50 px-6 py-3 rounded-2xl">
              <div className="text-2xl md:text-3xl font-black font-heading text-primary">5</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">أبطال أفريقيا</div>
            </div>
            <div className="text-center bg-card/30 backdrop-blur-sm border border-border/50 px-6 py-3 rounded-2xl">
              <div className="text-2xl md:text-3xl font-black font-heading text-primary">2</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">الكونفدرالية</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Navigation Tabs */}
      <section className="sticky top-20 z-[50] bg-background/80 backdrop-blur-3xl border-b border-border py-4">
        <div className="container mx-auto px-4 flex justify-center gap-4 md:gap-6">
          {[
            { id: 'Roster', label: 'قائمة اللاعبين' },
            { id: 'Coaching', label: 'الجهاز الفني' },
            { id: 'History', label: 'تاريخ البطولات' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-primary text-foreground shadow-lg shadow-primary/20 scale-105' 
                  : 'hover:bg-muted opacity-60 hover:opacity-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-20">
        <AnimatePresence mode="wait">
          {activeTab === 'Roster' && (
            <motion.div
              key="roster"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-24"
            >
              {rosterGroups.map((group, groupIdx) => (
                <section key={group.key} className="space-y-10">
                  <header className="flex items-end justify-between border-b border-border pb-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">المجموعة الفرعية 0{groupIdx + 1}</span>
                      <h2 className="text-3xl md:text-4xl font-black font-heading">{group.title}</h2>
                    </div>
                    <div className="text-5xl font-black font-heading opacity-5 italic">0{groupIdx + 1}</div>
                  </header>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {group.data.map((player, idx) => (
                      <PlayerCard
                        key={player.id || player.name}
                        item={player}
                        index={idx}
                        isStaff={false}
                      />
                    ))}
                  </div>

                  {group.data.length === 0 && (
                    <div className="text-center py-12 space-y-4">
                      <Users size={48} className="mx-auto opacity-10" />
                      <p className="text-sm font-bold opacity-40 italic">لا يوجد لاعبين في هذا المركز حالياً</p>
                    </div>
                  )}
                </section>
              ))}
            </motion.div>
          )}

          {activeTab === 'Coaching' && (
            <motion.div
              key="coaching"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {zamalekCoachingStaff.map((staff, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-[30px] opacity-0 group-hover:opacity-100 transition-all" />
                  <div className="relative bg-card border border-border rounded-[3rem] p-8 shadow-2xl flex flex-col items-center text-center space-y-6 hover:border-primary transition-all overflow-hidden h-full">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-all bg-muted">
                      <Image
                        src={staff.img || "/no_img.jpg"}
                        alt={staff.name}
                        fill
                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black font-heading">{staff.name}</h3>
                      <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest inline-block">{staff.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'History' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {zamalekTitles.map((title, idx) => (
                <div key={idx} className="bg-card border border-border rounded-[3.5rem] p-10 shadow-2xl space-y-8 group hover:border-primary transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[3rem] group-hover:bg-primary transition-all flex items-center justify-center translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 duration-500">
                    <div className="text-foreground opacity-0 group-hover:opacity-100 scale-150 transition-all duration-300">
                      <Trophy size={24} />
                    </div>
                  </div>
                  <header className="flex justify-between items-start gap-4">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black font-heading text-right">{title.Title === "Egyptian Premier League" ? "الدوري المصري الممتاز" : 
                                                                                    title.Title === "Egypt Cup" ? "كأس مصر" : 
                                                                                    title.Title === "Egyptian Super Cup" ? "كأس السوبر المصري" :
                                                                                    title.Title === "CAF Champions League" ? "دوري أبطال أفريقيا" :
                                                                                    title.Title === "CAF Confederation Cup" ? "كأس الكونفيدرالية الأفريقية" :
                                                                                    title.Title === "CAF Super Cup" ? "كأس السوبر الأفريقي" :
                                                                                    title.Title === "African Cup Winners' Cup" ? "كأس الكؤوس الأفريقية" :
                                                                                    title.Title === "Afro-Asian Club Championship" ? "الكأس الأفروآسيوية للأندية" :
                                                                                    title.Title === "Arab Champions Cup" ? "البطولة العربية للأندية" :
                                                                                    title.Title === "Sultan Hussein Cup" ? "كأس السلطان حسين" : "دوري القاهرة"}</h3>
                      <div className="h-1 w-12 bg-primary rounded-full" />
                    </div>
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image src={title.img || "/awardes/award-1.png"} alt={title.Title} fill className="object-contain" />
                    </div>
                  </header>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                      <span>سجل السنوات</span>
                      <span>{title.num} ألقاب</span>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-start" dir="ltr">
                      {title.years.map(y => (
                        <span key={y} className="px-3 py-1.5 bg-muted rounded-xl text-[10px] font-bold border border-border group-hover:bg-primary/10 group-hover:border-primary transition-all">{y}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

function PlayerCard({ item, index, isStaff }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: (index % 4) * 0.1 }}
      className="group relative h-full"
    >
      {/* Visual Frame */}
      <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[30px] opacity-0 group-hover:opacity-100 transition-all duration-700" />

      <div className="relative bg-card border border-border rounded-[3.5rem] overflow-hidden flex flex-col h-full shadow-[0_32px_128px_rgba(0,0,0,0.2)] transition-all duration-700 hover:rounded-[2.5rem]">

        <Link href={isStaff ? "#" : `/Pages/Player/${item.id}`} className="relative aspect-[3/4.5] overflow-hidden block">
          <Image
            src={item.img || "/no_img.jpg"}
            alt={item.name}
            fill
            className="object-cover object-top transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Number Overlay */}
          {!isStaff && item.number && (
            <div className="absolute top-10 left-10 text-foreground/10 group-hover:text-primary/20 text-9xl font-black font-heading italic transition-all duration-700">
              {item.number}
            </div>
          )}

          {/* Badge Indicator */}
          <div className="absolute top-10 right-10">
            <div className="w-14 h-14 rounded-2xl bg-foreground/10 backdrop-blur-xl border border-foreground/20 flex items-center justify-center text-foreground scale-0 group-hover:scale-100 transition-all duration-500">
              {isStaff ? <Shield size={24} /> : <Target size={24} />}
            </div>
          </div>

          {/* Info Overlay Bottom */}
          <div className="absolute bottom-10 inset-x-10">
            <div className="space-y-4 translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
              <div className="flex gap-4">
                {isStaff ? (
                  <div className="px-4 py-1.5 bg-primary rounded-xl text-foreground text-[8px] font-black uppercase tracking-widest">{item.role}</div>
                ) : (
                  <>
                    <div className="px-4 py-1.5 bg-primary rounded-xl text-foreground text-[8px] font-black uppercase tracking-widest">{item.position}</div>
                    <div className="px-4 py-1.5 bg-foreground/10 backdrop-blur border border-foreground/20 rounded-xl text-foreground text-[8px] font-black uppercase tracking-widest">{item.nationality}</div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between text-foreground/60 text-[9px] font-bold">
                {!isStaff && <span>Market Value: {item.marketValue || "N/A"}</span>}
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-primary" />
                  <span>Ready for Battle</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Permanent Label Section */}
        <div className="p-10 bg-card border-t border-border flex flex-col items-center text-center relative mt-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1.5 bg-primary rounded-full" />

          <h3 className="text-2xl font-black font-heading leading-tight mb-2 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest italic">
            {isStaff ? (item.role || "Technical Staff") : (item.mainPosition || item.position)}
          </p>

          <div className="mt-8 pt-6 border-t border-border/50 w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
            <span className="text-[9px] font-black uppercase tracking-widest text-primary">عرض الإحصائيات</span>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-foreground transition-all">
              <ArrowLeft size={14} className="scale-x-[-1]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
