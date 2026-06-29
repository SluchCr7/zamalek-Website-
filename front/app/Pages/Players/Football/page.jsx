'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Star, Users, ArrowRight, Zap, Target, Search, Filter, Activity, Trophy } from 'lucide-react';
import { zamalekPlayers, zamalekCoachingStaff, zamalekPlayersWithId } from '@/utils/data';

const positions = ["All", "Goalkeeper", "Defender", "Midfielder", "Forward", "Staff"];

export default function PlayersPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = activeFilter === "All"
    ? zamalekPlayersWithId
    : activeFilter === "Staff"
      ? zamalekCoachingStaff
      : zamalekPlayersWithId.filter(p => p.mainPosition === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">

      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/squads/football-min.png"
            alt="كرة القدم نادي الزمالك"
            fill
            className="object-cover opacity-30 grayscale brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 relative mx-auto p-4 bg-foreground rounded-3xl shadow-2xl rotate-3"
          >
            <Image src="/teams/zamalek.png" alt="Zamalek SC" fill className="object-contain p-2" />
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black font-heading tracking-tighter italic uppercase"
            >
              كـتـيـبـة <span className="text-primary">الـفـارس</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl font-bold opacity-40 max-w-3xl mx-auto italic"
            >
              تعرف على القائمة الرسمية للفريق الأول لكرة القدم بنادي الزمالك والجهاز الفني.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Squad Navigation & Stats */}
      <section className="container mx-auto px-4 -mt-3 relative z-20">
        <div className="bg-card p-4 rounded-[3.5rem] border border-border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto backdrop-blur-3xl">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => setActiveFilter(pos)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === pos ? 'bg-primary text-foreground shadow-xl shadow-primary/20' : 'hover:bg-muted opacity-60'
                  }`}
              >
                {pos === "All" ? "الكل" :
                  pos === "Goalkeeper" ? "حراس المرمى" :
                    pos === "Defender" ? "الدفاع" :
                      pos === "Midfielder" ? "الوسط" :
                        pos === "Forward" ? "الهجوم" : "الجهاز الفني"}
              </button>
            ))}
          </div>

          {/* Squad Stats Mini */}
          <div className="flex items-center gap-12 px-8 border-r border-border hidden lg:flex">
            <div className="text-center">
              <div className="text-2xl font-black font-heading italic text-primary">{zamalekPlayersWithId.length}</div>
              <div className="text-[8px] font-black uppercase tracking-widest opacity-40">Total Players</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black font-heading italic text-primary">24.5</div>
              <div className="text-[8px] font-black uppercase tracking-widest opacity-40">Avg. Age</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black font-heading italic text-primary">12</div>
              <div className="text-[8px] font-black uppercase tracking-widest opacity-40">National Stars</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Squad Grid */}
      <section className="container mx-auto px-4 py-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <PlayerCard
                key={item.id || item.name}
                item={item}
                index={idx}
                isStaff={activeFilter === "Staff"}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24 space-y-6">
            <Users size={64} className="mx-auto opacity-10" />
            <h3 className="text-2xl font-bold opacity-40 italic">لا يوجد لاعبين متاحين في هذا القسم حالياً</h3>
          </div>
        )}
      </section>

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
      className="group relative"
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
        <div className="p-10 bg-card border-t border-border flex flex-col items-center text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1.5 bg-primary rounded-full" />

          <h3 className="text-2xl font-black font-heading leading-tight mb-2 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest italic">
            {isStaff ? (item.role || "Technical Staff") : (item.mainPosition || item.position)}
          </p>

          <div className="mt-8 pt-6 border-t border-border/50 w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
            <span className="text-[9px] font-black uppercase tracking-widest text-primary">View Statistics</span>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-foreground transition-all">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
