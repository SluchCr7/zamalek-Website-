"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zamalekTable, zamalekAfrica, zamalekTopGoalsLiveSeasson, zamalekAssistsLiveSeasson } from "@/utils/data";
import Image from "next/image";
import { ListFilter, Trophy, ArrowUpRight, Zap, Target, Star, Users, Loader2 } from "lucide-react";
import Link from "next/link";
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

const Table = () => {
  const { data: standings, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACK_URL}/api/standings`, fetcher);
  const [activeTab, setActiveTab] = useState("league");

  const tabs = [
    { id: "league", label: "الدوري المصري", icon: <Trophy size={14} /> },
    { id: "africa", label: "البطولة الإفريقية", icon: <Star size={14} /> },
    { id: "stats", label: "أرقام اللاعبين", icon: <Target size={14} /> },
  ];

  if (error) return <div className="py-24 text-center text-red-500 font-bold">فشل تحميل جدول الترتيب</div>;

  const topFiveLeague = standings ? [...standings].sort((a, b) => b.points - a.points).slice(0, 5) : [];

  return (
    <section className="py-32 relative overflow-hidden bg-background" aria-label="ترتيب الدوري وإحصائيات الفريق">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Zap size={14} fill="currentColor" />
            <span>إحصائيات المـوسم المباشرة</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black font-heading tracking-tighter mb-8 leading-none">
            التـرتيب <span className="text-primary italic">&</span> الأرقـام
          </h2>

          {/* Tabs Navigation */}
          <div 
            className="flex flex-wrap items-center justify-center gap-2 p-2 bg-card border border-border rounded-3xl shadow-2xl"
            role="tablist"
            aria-label="قائمة الإحصائيات"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-xl shadow-primary/20"
                    : "hover:bg-muted opacity-40 hover:opacity-100"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-[3.5rem] overflow-hidden shadow-2xl relative min-h-[400px] flex flex-col"
            >
              {isLoading ? (
                <div className="flex-1 flex items-center justify-center py-24">
                  <Loader2 size={48} className="text-primary animate-spin" />
                </div>
              ) : (
                <>
                  {activeTab === "league" && (
                    <CompetitionTable data={topFiveLeague} type="league" />
                  )}
                  {activeTab === "africa" && (
                    <CompetitionTable data={zamalekAfrica} type="africa" />
                  )}
                  {activeTab === "stats" && (
                    <PlayerStatsSection goals={zamalekTopGoalsLiveSeasson} assists={zamalekAssistsLiveSeasson} />
                  )}
                </>
              )}

              {/* Dynamic Footer Link */}
              <Link
                href="/Pages/Table"
                className="flex items-center justify-center gap-4 p-8 bg-muted/30 hover:bg-primary hover:text-white transition-all group border-t border-border mt-auto focus-visible:outline-none focus-visible:bg-primary focus-visible:text-white"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">انتقل إلى المركز الإحصائي الكامل</span>
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const CompetitionTable = ({ data, type }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-right" dir="rtl" aria-label="جدول ترتيب المسابقة">
      <thead className="bg-muted/50 text-[10px] font-black uppercase tracking-widest opacity-40">
        <tr>
          <th className="px-10 py-6">المركز</th>
          <th className="px-6 py-6">الفريق</th>
          <th className="px-6 py-6 text-center">لعب</th>
          <th className="px-6 py-6 text-center">فوز</th>
          <th className="px-6 py-6 text-center">تعادل</th>
          <th className="px-6 py-6 text-center">فارق</th>
          <th className="px-10 py-6 text-center">نقاط</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/50">
        {data.map((team, idx) => {
          const isZamalek = team.team.id === 1040;
          return (
            <motion.tr
              key={team.team.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`group transition-all hover:bg-primary/[0.02] ${isZamalek ? "bg-primary/[0.04]" : ""}`}
            >
              <td className="px-10 py-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black font-heading ${team.rank === 1 ? "bg-yellow-500 text-foreground" : isZamalek ? "bg-primary text-white" : "bg-muted text-foreground/40"}`}>
                  {team.rank}
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-2xl bg-white border border-border p-2 group-hover:scale-110 transition-transform shadow-sm">
                    <Image src={team.team.logo} alt={team.team.name} fill className="object-contain p-1.5" />
                  </div>
                  <span className={`text-xl font-black font-heading italic ${isZamalek ? "text-primary" : ""}`}>
                    {team.team.name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-6 text-center font-bold opacity-60">{team.all.played}</td>
              <td className="px-6 py-6 text-center font-bold opacity-60">{team.all.win}</td>
              <td className="px-6 py-6 text-center font-bold opacity-60">{team.all.draw}</td>
              <td className="px-6 py-6 text-center font-black">{team.goalsDiff > 0 ? `+${team.goalsDiff}` : team.goalsDiff}</td>
              <td className="px-10 py-6 text-center">
                <div className={`inline-flex items-center justify-center w-14 h-12 rounded-2xl font-black font-heading text-xl ${isZamalek ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-muted border border-border"}`}>
                  {team.points}
                </div>
              </td>
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  </div>

);

const PlayerStatsSection = ({ goals, assists }) => {
  const maxGoals = useMemo(() => {
    return Math.max(...goals.slice(0, 4).map(p => p.goals || 1));
  }, [goals]);

  const maxAssists = useMemo(() => {
    return Math.max(...assists.slice(0, 4).map(p => p.assets || 1));
  }, [assists]);

  return (
    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-border" dir="rtl">
      {/* Goals Column */}
      <div className="p-8 md:p-12 space-y-10">
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Target size={24} />
          </div>
          <h3 className="text-2xl font-black font-heading italic">هدافي <span className="text-primary italic">الفريق</span></h3>
        </div>
        <div className="space-y-6">
          {goals.slice(0, 4).map((player, idx) => (
            <PlayerStatRow 
              key={idx} 
              player={player} 
              statKey="goals" 
              unit="أهداف" 
              index={idx} 
              maxStat={maxGoals}
            />
          ))}
        </div>
      </div>

      {/* Assists Column */}
      <div className="p-8 md:p-12 space-y-10">
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
            <Users size={24} />
          </div>
          <h3 className="text-2xl font-black font-heading italic">صـنــاع <span className="text-secondary italic">اللعب</span></h3>
        </div>
        <div className="space-y-6">
          {assists.slice(0, 4).map((player, idx) => (
            <PlayerStatRow 
              key={idx} 
              player={player} 
              statKey="assets" 
              unit="أسيست" 
              index={idx} 
              maxStat={maxAssists}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlayerStatRow = ({ player, statKey, unit, index, maxStat }) => {
  const percentage = useMemo(() => {
    const value = player[statKey] || 0;
    return Math.max(5, (value / maxStat) * 100);
  }, [player, statKey, maxStat]);

  return (
    <div className="flex items-center gap-6 group">
      <div className="relative shrink-0">
        <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black text-white z-10 shadow-lg ${index === 0 ? "bg-yellow-500" : "bg-primary"}`}>
          {index + 1}
        </div>
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-border bg-muted group-hover:scale-105 transition-transform">
          <Image src={player.img || '/zsc.png'} alt={player.name} fill className="object-cover" />
        </div>
      </div>
      <div className="flex-1 min-w-0 py-2">
        <h4 className="text-lg font-black font-heading truncate mb-1">{player.name}</h4>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-primary h-full rounded-full"
          />
        </div>
      </div>
      <div className="text-left py-2 shrink-0">
        <div className="text-2xl font-black font-heading text-primary leading-none mb-1">{player[statKey]}</div>
        <div className="text-[10px] font-black uppercase opacity-40">{unit}</div>
      </div>
    </div>
  );
};

export default Table;


