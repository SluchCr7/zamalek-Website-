'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, LabelList, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { zamalekStats } from '@/utils/data';
import Image from 'next/image';
import { Trophy, Target, Users, Zap, Calendar, TrendingUp, Award, Activity, Globe, Flame, Star, History } from 'lucide-react';

export default function ZamalekStatsPage() {
  const { topScorersAllTime, topAssistPlayer, topPlayMatches, derbyRecord, topScorerSeason, fastestGoal, firstHatrick, mostHatrickScore, highWin, mostYoungPlayersScore, mostCountriesPlayInZamalek, mostMatchesAttendance } = zamalekStats;

  const seasonData = topScorerSeason.map((s) => ({ season: s.season, goals: s.goals, player: s.player }));
  const topScorersChart = topScorersAllTime.map((p) => ({ name: p.player, goals: p.goals }));
  
  const pointsOverSeasons = [
    { season: '2019/20', points: 71, rank: 2 },
    { season: '2020/21', points: 80, rank: 1 },
    { season: '2021/22', points: 77, rank: 1 },
    { season: '2022/23', points: 60, rank: 3 },
    { season: '2023/24', points: 56, rank: 3 },
    { season: '2024/25', points: 76, rank: 2 },
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground" dir="rtl">

      {/* Hero: Data Intelligence Style */}
      <section className="relative pt-32 pb-24 px-4 bg-muted/20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Activity size={500} className="absolute -top-40 -right-40 text-primary/5 rotate-12" />
          <TrendingUp size={400} className="absolute -bottom-20 -left-20 text-primary/5 -rotate-12" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center space-y-12">
          <header className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest"
            >
              <Zap size={14} />
              <span>مركز التحليل الإحصائي الرسمي</span>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter italic">
              بـيـانـات <span className="text-primary">الـبـطـولات</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold opacity-40 max-w-3xl mx-auto italic">
              تاريخ نادي الزمالك بلغة الأرقام.. من الهدافين التاريخيين إلى أكبر الانتصارات المسجلة.
            </p>
          </header>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-card border border-border rounded-[3rem] shadow-2xl">
            <QuickStat icon={<Target />} label="أكبر فوز" value={highWin.score} sub={`ضد ${highWin.team}`} />
            <QuickStat icon={<History />} label="أسرع هدف" value={fastestGoal.time} sub={fastestGoal.player} />
            <QuickStat icon={<Flame />} label="أكبر دربي" value={derbyRecord.largestWinVsAhly} sub="vs الأهلي" />
            <QuickStat icon={<Users />} label="أكبر حضور" value="100K+" sub="استاد القاهرة" />
          </div>
        </div>
      </section>

      {/* Main Stats Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-32">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Sidebar: Goal Machines */}
          <div className="space-y-12">
            {/* Top Scorers All Time */}
            <section className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <div className="flex items-center gap-4 mb-10">
                <Award size={24} className="text-primary" />
                <h3 className="text-2xl font-black font-heading">الهدافون التاريخيون</h3>
              </div>

              <div className="space-y-8">
                {topScorersAllTime.map((p, i) => (
                  <div key={i} className="group relative">
                    <div className="flex justify-between items-end mb-3">
                      <div className="space-y-1">
                        <div className="text-xs font-black text-primary opacity-40">#{i + 1} RANKING</div>
                        <div className="text-xl font-black font-heading">{p.player}</div>
                      </div>
                      <div className="text-2xl font-black font-heading text-primary italic">{p.goals}</div>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(p.goals / topScorersAllTime[0].goals) * 100}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Assists Kings */}
            <section className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <Zap size={24} className="text-primary" />
                <h3 className="text-2xl font-black font-heading">صناع الأهداف</h3>
              </div>
              <div className="space-y-6">
                {topAssistPlayer.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-muted/30 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                    <div className="font-bold">{a.name}</div>
                    <div className="text-xl font-black font-heading text-primary">{a.num}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Main Charts & Records */}
          <div className="lg:col-span-2 space-y-12">
            {/* Season Goals Analytics */}
            <section className="bg-card border border-border rounded-[4rem] p-12 shadow-2xl">
              <header className="flex items-center justify-between mb-16">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Performance Trend</span>
                  <h3 className="text-3xl font-black font-heading italic">تحليل مواسم الهدافين</h3>
                </div>
                <TrendingUp className="text-primary/20" size={40} />
              </header>
              <div className="h-[400px] w-full rtl-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={seasonData}>
                    <defs>
                      <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E31B23" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#E31B23" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                    <XAxis dataKey="season" axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 900 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 900 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '1rem' }} />
                    <Area type="monotone" dataKey="goals" stroke="#E31B23" strokeWidth={4} fillOpacity={1} fill="url(#colorGoals)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* League Points Trend Over Seasons */}
            <section className="bg-card border border-border rounded-[4rem] p-12 shadow-2xl">
              <header className="flex items-center justify-between mb-16">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Points Progress</span>
                  <h3 className="text-3xl font-black font-heading italic">منحنى نقاط الدوري في المواسم الأخيرة</h3>
                </div>
                <Award className="text-primary/20" size={40} />
              </header>
              <div className="h-[400px] w-full rtl-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pointsOverSeasons}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                    <XAxis dataKey="season" axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 900 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 900 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '1rem' }} />
                    <Line type="monotone" dataKey="points" stroke="#E31B23" strokeWidth={4} dot={{ r: 6, fill: '#E31B23', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Young Guns Showcase */}
            <section className="space-y-12">
              <h3 className="text-3xl font-black font-heading italic px-4">أصغر هدافي الأبيض التاريخيين</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {mostYoungPlayersScore.map((p, i) => (
                  <div key={i} className="group p-8 bg-card border border-border rounded-[3rem] hover:border-primary transition-all text-center space-y-6">
                    <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-muted group-hover:border-primary transition-all">
                      <Image src={p.img || "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1974&auto=format&fit=crop"} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="text-xl font-black font-heading">{p.name}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary pt-2">{p.age} YEARS OLD</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* International Reach & Attendance */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Countries Chart */}
              <section className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl">
                <h4 className="text-xl font-black font-heading mb-10 flex items-center gap-4"><Globe size={20} className="text-primary" /> المحترفون حسب الجنسية</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mostCountriesPlayInZamalek} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="country" type="category" axisLine={false} tickLine={false} tick={{ fill: '#ffffff60', fontSize: 8, fontWeight: 900 }} width={60} />
                      <Tooltip />
                      <Bar dataKey="num" fill="#E31B23" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* Attendance Records */}
              <section className="bg-primary rounded-[3rem] p-10 text-foreground shadow-2xl shadow-primary/30 relative overflow-hidden">
                <Users size={150} className="absolute -bottom-10 -left-10 opacity-10" />
                <h4 className="text-xl font-black font-heading mb-10 relative z-10 italic">أرقام الحضور الجماهيري</h4>
                <div className="space-y-6 relative z-10">
                  {mostMatchesAttendance.slice(0, 3).map((m, i) => (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-foreground/10 last:border-0">
                      <div>
                        <div className="font-black italic">vs {m.against}</div>
                        <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">SEASON {m.year}</div>
                      </div>
                      <div className="text-2xl font-black font-heading italic">{m.num}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

function QuickStat({ icon, label, value, sub }) {
  return (
    <div className="p-8 text-center space-y-2 group">
      <div className="w-12 h-12 rounded-2xl bg-muted text-foreground flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-foreground transition-all">
        {icon}
      </div>
      <div className="text-[9px] font-black uppercase tracking-widest opacity-40 pt-2">{label}</div>
      <div className="text-3xl font-black font-heading italic">{value}</div>
      <div className="text-[10px] font-bold opacity-20 truncate">{sub}</div>
    </div>
  );
}
