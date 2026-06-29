'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, ShieldCheck, ChevronUp, ChevronDown, Sliders, Info, Zap, TrendingUp, ChevronRight, Loader2 } from 'lucide-react';
import useSWR from 'swr';
import axios from 'axios';
import TitleSection from '@/Components/TitleSection';

const fetcher = url => axios.get(url).then(res => res.data);

const ICONS = {
  goals: <Trophy size={18} className="text-yellow-500" />,
  assists: <Award size={18} className="text-blue-500" />,
  cleans: <ShieldCheck size={18} className="text-emerald-500" />,
};

export default function LeagueTablePage() {
  const { data: standings, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACK_URL}/api/standings`, fetcher);
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' });

  const sortedTable = useMemo(() => {
    if (!standings) return [];
    return [...standings].sort((a, b) => {
      let valA, valB;
      if (sortConfig.key === 'points') {
        valA = a.points;
        valB = b.points;
      } else {
        valA = a[sortConfig.key];
        valB = b[sortConfig.key];
      }
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [standings, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Failed to load standings</div>;
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  const statCards = [
    { title: 'هداف الفريق', icon: ICONS.goals, data: zamalekTopGoalsLiveSeasson, key: 'goals', unit: 'هدف' },
    { title: 'صناع الأهداف', icon: ICONS.assists, data: zamalekAssistsLiveSeasson, key: 'assets', unit: 'أسيست' },
    { title: 'نظافة الشباك', icon: ICONS.cleans, data: cleanSheatsLiveSeasson, key: 'cleanSheats', unit: 'مباراة' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 w-full" dir="rtl">
      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 border-b border-border overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto">
          <TitleSection
            title="جدول الترتيب"
            subtitle="متابعة دقيقة لموقف الزمالك في صدارة الدوري المصري الممتاز والإحصائيات الفردية للاعبين"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Table Area */}
          <div className="lg:col-span-2">
            <div className="bg-card/50 backdrop-blur-xl rounded-[2.5rem] border border-border shadow-2xl overflow-hidden">

              {/* Table Toolbar */}
              <div className="p-8 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="text-xl font-black font-heading">ترتيب الدوري المصري</h3>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-[10px] font-black uppercase tracking-widest opacity-60">
                  <Zap size={12} className="text-yellow-500" />
                  <span>تحديث مباشر</span>
                </div>
              </div>

              {/* Enhanced Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="p-6 text-right text-[10px] font-black uppercase tracking-widest opacity-40">الترتيب</th>
                      <th className="p-6 text-right text-[10px] font-black uppercase tracking-widest opacity-40">الفريق</th>
                      {['لعب', 'فاز', 'تعادل', 'خسر', 'له', 'عليه', 'الفرق', 'النقاط'].map((label, idx) => (
                        <th key={idx} className="p-6 text-center text-[10px] font-black uppercase tracking-widest opacity-40">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sortedTable.map((team, idx) => {
                      const isZamalek = team.team.id === 1040;
                      const position = team.rank;

                      return (
                        <motion.tr
                          key={team.team.id}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          className={`group transition-colors ${isZamalek ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/50'}`}
                        >
                          <td className="p-6 text-right font-black font-heading">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${position <= 4 ? 'bg-primary/20 text-primary' : 'bg-muted opacity-40'
                              }`}>
                               {position}
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="relative w-10 h-10 rounded-full border border-border bg-foreground shadow-sm transition-transform group-hover:scale-110">
                                <Image src={team.team.logo} alt={team.team.name} fill className="object-contain p-2" />
                              </div>
                              <span className={`font-black ${isZamalek ? 'text-primary' : ''}`}>{team.team.name}</span>
                            </div>
                          </td>
                          <td className="p-6 text-center font-bold opacity-60">{team.all.played}</td>
                          <td className="p-6 text-center font-bold opacity-60">{team.all.win}</td>
                          <td className="p-6 text-center font-bold opacity-60">{team.all.draw}</td>
                          <td className="p-6 text-center font-bold opacity-60">{team.all.lose}</td>
                          <td className="p-6 text-center font-bold opacity-40">{team.all.goals.for}</td>
                          <td className="p-6 text-center font-bold opacity-40">{team.all.goals.against}</td>
                          <td className="p-6 text-center font-black">{team.goalsDiff}</td>
                          <td className="p-6 text-center">
                            <div className={`inline-flex items-center justify-center w-12 h-10 rounded-xl font-black font-heading text-lg ${isZamalek ? 'bg-primary text-foreground shadow-lg shadow-primary/30' : 'bg-card border border-border'
                              }`}>
                              {team.points}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 flex items-center gap-8 px-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">المربع الذهبي / دوري الأبطال</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-muted shadow-inner" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">فرق المنطقة الدافئة</span>
              </div>
            </div>
          </div>

          {/* Sidebar Stats Area */}
          <aside className="space-y-12">

            {statCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card rounded-[2.5rem] border border-border p-8 shadow-xl"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-muted flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-black font-heading">{card.title}</h3>
                  </div>
                  <button className="text-[10px] font-black uppercase opacity-40 hover:opacity-100 hover:text-primary transition-all">كل القائمة</button>
                </div>

                <div className="space-y-6">
                  {card.data.slice(0, 3).map((player, pIdx) => (
                    <div key={pIdx} className="group flex items-center gap-4">
                      <div className="relative">
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black text-foreground z-10 ${pIdx === 0 ? 'bg-yellow-500' : 'bg-primary'
                          }`}>
                          {pIdx + 1}
                        </div>
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-border bg-muted">
                          <Image src={player.img} alt={player.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-sm mb-1 truncate">{player.name}</h4>
                        <div className="w-full bg-muted rounded-full h-1">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '70%' }}
                            viewport={{ once: true }}
                            className="bg-primary h-1 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black font-heading text-primary">{player[card.key]}</div>
                        <div className="text-[10px] font-black uppercase opacity-40">{card.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Info Box */}
            <div className="rounded-[2.5rem] bg-foreground text-background p-8">
              <Info className="mb-6 opacity-40" />
              <h3 className="text-xl font-black font-heading mb-4">معايير الترتيب</h3>
              <p className="text-sm font-bold opacity-60 leading-relaxed mb-6">
                يتم احتساب المراكز بناءً على عدد النقاط، وفي حال التساوي يتم اللجوء للمواجهات المباشرة ثم فارق الأهداف.
              </p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase hover:gap-4 transition-all">
                <span>عرض لائحة المسابقات</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </aside>

        </div>
      </section>
    </div>
  );
}
