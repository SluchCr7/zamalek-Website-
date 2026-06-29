'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, MapPin, Tv, Clock, Timer, Users, Target, Activity, Check, ArrowRight } from 'lucide-react';
import TitleSection from '@/Components/TitleSection';
import { zamalekMatches } from '@/utils/data';

// Lineup players for tactical field
const zamalekLineup = [
  { name: 'محمد عواد', number: 1, pos: 'GK', x: '50%', y: '85%' },
  { name: 'عمر جابر', number: 4, pos: 'RB', x: '15%', y: '65%' },
  { name: 'ح. المثلوثي', number: 24, pos: 'CB', x: '38%', y: '70%' },
  { name: 'حسام عبد المجيد', number: 2, pos: 'CB', x: '62%', y: '70%' },
  { name: 'أحمد فتوح', number: 13, pos: 'LB', x: '85%', y: '65%' },
  { name: 'ن. عماد دونجا', number: 8, pos: 'DM', x: '50%', y: '48%' },
  { name: 'عبد الله السعيد', number: 19, pos: 'CM', x: '30%', y: '38%' },
  { name: 'ناصر ماهر', number: 22, pos: 'CM', x: '70%', y: '38%' },
  { name: 'أحمد سيد زيزو', number: 25, pos: 'RW', x: '20%', y: '18%' },
  { name: 'سيف الجزيري', number: 30, pos: 'ST', x: '50%', y: '12%' },
  { name: 'مصطفى شلبي', number: 11, pos: 'LW', x: '80%', y: '18%' },
];

export default function LiveCenterPage() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [matchMinute, setMatchMinute] = useState(74);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedPlayer, setVotedPlayer] = useState('');
  const [votes, setVotes] = useState({
    'أحمد سيد زيزو': 52,
    'عبد الله السعيد': 28,
    'ناصر ماهر': 20
  });

  // Simulated live match minute progression
  useEffect(() => {
    const interval = setInterval(() => {
      setMatchMinute(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 1;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = (player) => {
    if (hasVoted) return;
    setVotes(prev => ({
      ...prev,
      [player]: prev[player] + 1
    }));
    setVotedPlayer(player);
    setHasVoted(true);
  };

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  // Filter finished and upcoming matches
  const finishedMatches = zamalekMatches.filter(m => m.status === 'Finished');
  const upcomingMatches = zamalekMatches.filter(m => m.status === 'Upcoming');

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 w-full" dir="rtl">
      
      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 border-b border-border overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto">
          <TitleSection
            title="المركز المـباشر للمباريات"
            subtitle="شاهد كواليس ومباريات مدرسة الفن والهندسة مباشرة لحظة بلحظة مع تغطية شاملة للإحصائيات والتشكيلة والتصويت"
          />
        </div>
      </section>

      {/* Live Match Showcase Board */}
      <section className="container mx-auto px-4 md:px-8 py-12">
        <div className="bg-card/50 backdrop-blur-xl rounded-[3.5rem] border border-border shadow-2xl overflow-hidden relative p-8 md:p-12 mb-12">
          
          {/* Animated red light overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Header Badge */}
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-5 py-2 rounded-full text-xs font-black mb-10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span>مباشر الآن • الدوري المصري الممتاز</span>
            </div>

            {/* Scoreboard Info */}
            <div className="w-full flex flex-col md:grid md:grid-cols-3 items-center justify-between gap-8 mb-10">
              
              {/* Home Team (Zamalek) */}
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-4 shadow-xl flex items-center justify-center border border-border">
                  <Image src="/teams/zamalek.png" alt="Zamalek" fill className="object-contain p-4" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-heading">الزمالك</h3>
                <span className="text-xs font-bold text-muted-foreground">صاحب الأرض</span>
              </div>

              {/* Match Score & Time */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-6">
                  <span className="text-6xl md:text-8xl font-black font-heading tracking-tight">2</span>
                  <span className="text-4xl font-bold opacity-30">:</span>
                  <span className="text-6xl md:text-8xl font-black font-heading tracking-tight">1</span>
                </div>
                <div className="mt-6 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-black font-heading text-sm md:text-base tracking-wide flex items-center gap-2">
                  <Timer className="animate-spin duration-1000" size={16} />
                  <span>الدقيقة {matchMinute}'</span>
                </div>
              </div>

              {/* Away Team (Pyramids) */}
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-4 shadow-xl flex items-center justify-center border border-border">
                  <Image src="/teams/pyramids.png" alt="Pyramids" fill className="object-contain p-4" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-heading">بيراميدز FC</h3>
                <span className="text-xs font-bold text-muted-foreground">الضيف</span>
              </div>
            </div>

            {/* Stadium & Referee Info */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground border-t border-border/60 pt-6 w-full max-w-2xl">
              <div className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> <span>ستاد القاهرة الدولي (75,000 متفرج)</span></div>
              <div className="w-1.5 h-1.5 rounded-full bg-border" />
              <div className="flex items-center gap-2"><Tv size={16} /> <span>أون تايم سبورتس 1HD (معلق: مدحت شلبي)</span></div>
            </div>
          </div>
        </div>

        {/* Tactical Tabs Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-3 p-2 bg-card border border-border rounded-3xl w-fit mx-auto mb-12 shadow-2xl">
          {[
            { id: 'timeline', label: 'الخط الزمني للمباراة', icon: <Activity size={14} /> },
            { id: 'stats', label: 'إحصائيات المواجهة', icon: <Target size={14} /> },
            { id: 'lineup', label: 'تشكيلة الفريقين', icon: <Users size={14} /> },
            { id: 'poll', label: 'تصويت رجل المباراة', icon: <Trophy size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTab === tab.id
                ? 'bg-primary text-white shadow-xl shadow-primary/20'
                : 'hover:bg-muted opacity-60 hover:opacity-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-[3rem] p-8 md:p-12 shadow-2xl"
            >
              
              {/* TIMELINE TAB */}
              {activeTab === 'timeline' && (
                <div className="space-y-12 py-4 relative">
                  {/* Vertical Center Line */}
                  <div className="absolute top-0 bottom-0 right-[40px] md:right-1/2 w-0.5 bg-border -translate-x-1/2 z-0" />
                  
                  {/* Goal Event */}
                  <TimelineEvent
                    minute="12'"
                    title="⚽ هدف التقدم للملكي!"
                    desc="تمريرة سحرية من عبد الله السعيد يسكنها أحمد سيد زيزو بلمسة رائعة في الشباك."
                    isZamalek={true}
                  />

                  {/* Opponent Yellow Card */}
                  <TimelineEvent
                    minute="34'"
                    title="🟨 بطاقة صفراء"
                    desc="عرقلة عنيفة من مدافع بيراميدز للاعب ناصر ماهر في منتصف الملعب."
                    isZamalek={false}
                  />

                  {/* Half Time */}
                  <div className="relative flex justify-center items-center z-10 my-8">
                    <span className="bg-muted px-5 py-2.5 rounded-full border border-border text-xs font-black text-muted-foreground uppercase tracking-widest shadow-md">
                      ⏱️ نهاية الشوط الأول (1-0)
                    </span>
                  </div>

                  {/* Opponent Goal */}
                  <TimelineEvent
                    minute="52'"
                    title="⚽ هدف التعادل لبيراميدز"
                    desc="تسديدة قوية من فيستون ماييلي تصطدم بالدفاع وتخادع الحارس محمد عواد."
                    isZamalek={false}
                  />

                  {/* Zamalek Goal */}
                  <TimelineEvent
                    minute="68'"
                    title="⚽ هدف الثااااني للملكي!"
                    desc="عرضية متقنة من أحمد فتوح يرتقي لها ناصر ماهر برأسية مركزة تسكن أقصى الزاوية اليمنى."
                    isZamalek={true}
                  />

                  {/* Substitution */}
                  <TimelineEvent
                    minute="72'"
                    title="🔄 تبديل في صفوف الأبيض"
                    desc="خروج سيف الجزيري ودخول مصطفى شلبي لتعزيز الأطراف الهجومية للزمالك."
                    isZamalek={true}
                  />

                  {/* Dynamic current minute indicator */}
                  {matchMinute > 74 && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative flex justify-center items-center z-10 mt-8"
                    >
                      <span className="bg-primary/20 text-primary border border-primary/30 px-5 py-2 rounded-full text-xs font-black animate-pulse flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        المباراة جارية الآن... د {matchMinute}'
                      </span>
                    </motion.div>
                  )}
                </div>
              )}

              {/* STATS TAB */}
              {activeTab === 'stats' && (
                <div className="space-y-8">
                  <StatBar label="الاستحواذ" homeVal={58} awayVal={42} suffix="%" />
                  <StatBar label="التسديدات الكلية" homeVal={14} awayVal={8} />
                  <StatBar label="التسديدات على المرمى" homeVal={6} awayVal={3} />
                  <StatBar label="الركنيات" homeVal={5} awayVal={2} />
                  <StatBar label="التمريرات الناجحة" homeVal={480} awayVal={320} />
                  <StatBar label="الأخطاء المرتكبة" homeVal={11} awayVal={14} />
                  <StatBar label="البطاقات الصفراء" homeVal={1} awayVal={3} />
                </div>
              )}

              {/* LINEUP TAB */}
              {activeTab === 'lineup' && (
                <div className="space-y-10">
                  <h4 className="text-center font-black font-heading text-lg mb-6">التشكيل التكتيكي للزمالك (4-3-3)</h4>
                  
                  {/* Tactical Green Pitch */}
                  <div className="relative aspect-[3/4] md:aspect-[4/3] w-full rounded-[2.5rem] bg-gradient-to-b from-emerald-800 to-emerald-950 border border-emerald-700/50 overflow-hidden shadow-2xl p-4 flex items-center justify-center">
                    
                    {/* Pitch markings */}
                    <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none" />
                    <div className="absolute inset-y-4 left-1/2 w-px bg-white/20 pointer-events-none -translate-x-1/2" />
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/20 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                    
                    {/* Home Penalty Box */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-20 border border-white/25 bg-emerald-900/10 pointer-events-none" />
                    {/* Goal Box */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-8 border border-white/30 pointer-events-none" />
                    
                    {/* Away Penalty Box */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-20 border border-white/25 bg-emerald-900/10 pointer-events-none" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-8 border border-white/30 pointer-events-none" />

                    {/* Nodes representing players */}
                    {zamalekLineup.map(p => (
                      <motion.div
                        key={p.number}
                        whileHover={{ scale: 1.15 }}
                        className="absolute flex flex-col items-center cursor-pointer group"
                        style={{ right: p.x, bottom: p.y }}
                      >
                        <div className="w-10 h-10 rounded-full bg-white text-primary border-2 border-primary font-black font-heading flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:text-white transition-colors relative z-10 text-sm">
                          {p.number}
                        </div>
                        <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full mt-1.5 backdrop-blur-sm tracking-tighter whitespace-nowrap shadow border border-white/5">
                          {p.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Lineup bench */}
                  <div className="border-t border-border pt-8">
                    <h5 className="font-black text-sm text-primary mb-4">قائمة البدلاء</h5>
                    <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                      محمد صبحي (GK) • محمود حمدي الونش • زياد كمال • سيف فاروق جعفر • أحمد زكي • ناصر منسي • مهاب ياسر • سامسون أكينيولا • محمد شحاتة
                    </p>
                  </div>
                </div>
              )}

              {/* POLL TAB */}
              {activeTab === 'poll' && (
                <div className="space-y-8 text-center max-w-xl mx-auto">
                  <header className="space-y-3 mb-8">
                    <h4 className="text-2xl font-black font-heading">صوّت لرجل المباراة</h4>
                    <p className="text-sm font-bold text-muted-foreground">شارك برأيك واختر النجم الذي يستحق لقب رجل المباراة اليوم ضد بيراميدز</p>
                  </header>

                  <div className="space-y-4">
                    {Object.keys(votes).map(player => {
                      const voteCount = votes[player];
                      const pct = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                      const isVotedThis = votedPlayer === player;

                      return (
                        <button
                          key={player}
                          disabled={hasVoted}
                          onClick={() => handleVote(player)}
                          className={`w-full p-6 border rounded-[2rem] flex flex-col text-right relative overflow-hidden transition-all duration-500 group ${
                            hasVoted 
                              ? isVotedThis 
                                ? 'border-primary bg-primary/[0.02]'
                                : 'border-border opacity-70 cursor-default'
                              : 'border-border hover:border-primary bg-muted/20 hover:bg-primary/[0.01]'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full z-10 mb-2">
                            <span className="font-black text-lg flex items-center gap-3">
                              {player}
                              {isVotedThis && <span className="p-1 rounded-full bg-primary text-white text-[9px]"><Check size={10} /></span>}
                            </span>
                            <span className="font-heading font-black text-xl text-primary">{hasVoted ? `${pct}%` : 'تصويت'}</span>
                          </div>

                          {/* Percentage progress bar */}
                          {hasVoted && (
                            <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden mt-2 z-10">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="bg-primary h-full rounded-full"
                              />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {hasVoted && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-bold text-primary mt-6"
                    >
                      شكرًا لتصويتك! تم تسجيل صوتك بنجاح.
                    </motion.p>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Finished and Upcoming matches list */}
      <section className="container mx-auto px-4 md:px-8 py-12 border-t border-border mt-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Upcoming Matches */}
          <div className="space-y-6">
            <h4 className="text-xl font-black font-heading flex items-center gap-3"><Calendar size={20} className="text-primary" /> مواجهات قادمة للفريق</h4>
            <div className="space-y-4">
              {upcomingMatches.slice(0, 2).map((m, idx) => (
                <div key={idx} className="bg-card border border-border rounded-3xl p-6 flex justify-between items-center group hover:border-primary/40 transition-all">
                  <div className="space-y-1">
                    <h5 className="font-black text-base">ضد {m.opponent}</h5>
                    <p className="text-xs text-muted-foreground">{m.competition} • {m.stadium}</p>
                  </div>
                  <div className="text-left space-y-1">
                    <div className="font-black font-heading text-primary">{m.time}</div>
                    <div className="text-[10px] font-bold opacity-40">{m.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past/Finished Matches */}
          <div className="space-y-6">
            <h4 className="text-xl font-black font-heading flex items-center gap-3"><Trophy size={20} className="text-primary" /> نتائج المباريات السابقة</h4>
            <div className="space-y-4">
              {finishedMatches.slice(0, 2).map((m, idx) => (
                <div key={idx} className="bg-card border border-border rounded-3xl p-6 flex justify-between items-center group hover:border-primary/40 transition-all">
                  <div className="space-y-1">
                    <h5 className="font-black text-base">ضد {m.opponent}</h5>
                    <p className="text-xs text-muted-foreground">{m.competition} • {m.stadium}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-muted rounded-xl font-black font-heading text-lg tracking-wider text-center">{m.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

// Sub-component for Timeline Event
function TimelineEvent({ minute, title, desc, isZamalek }) {
  return (
    <div className={`flex items-start gap-6 relative z-10 ${isZamalek ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Time Dot Indicator */}
      <div className="absolute right-[22px] md:left-1/2 md:right-auto md:-translate-x-1/2 top-1.5 w-9 h-9 rounded-full bg-card border-2 border-primary flex items-center justify-center font-heading font-black text-xs text-primary shadow">
        {minute}
      </div>

      {/* Spacer for two-column desktop align */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card Content */}
      <div className="w-full md:w-1/2 mr-16 md:mr-0 md:px-8">
        <div className="bg-muted/40 border border-border/80 rounded-[2rem] p-6 shadow-md hover:border-primary/20 transition-all text-right">
          <h5 className="font-black text-lg mb-2">{title}</h5>
          <p className="text-sm font-bold text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Side-by-Side Stat Bar
function StatBar({ label, homeVal, awayVal, suffix = '' }) {
  const total = homeVal + awayVal;
  const homePct = total > 0 ? (homeVal / total) * 100 : 50;
  const awayPct = total > 0 ? (awayVal / total) * 100 : 50;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center font-black text-sm">
        <span className="font-heading text-base text-primary">{homeVal}{suffix}</span>
        <span className="opacity-70">{label}</span>
        <span className="font-heading text-base text-muted-foreground">{awayVal}{suffix}</span>
      </div>

      <div className="w-full h-3 bg-muted rounded-full flex overflow-hidden border border-border/10 shadow-inner">
        {/* Home value fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${homePct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary h-full"
        />
        {/* Away value fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${awayPct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-muted-foreground/30 h-full"
        />
      </div>
    </div>
  );
}
