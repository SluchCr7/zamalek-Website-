'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Calendar, Globe, Award, Target, Zap, Shield, Heart, Share2, Info, ChevronRight, ChevronLeft, MapPin, Activity, Trophy, Star, X } from 'lucide-react';
import { zamalekPlayersWithId } from '@/utils/data';

// Helper to generate dynamic radar attributes based on player position
const getAttributes = (pos) => {
  const isGK = pos?.includes('حارس') || pos?.includes('GK') || pos?.toLowerCase().includes('goalkeeper') || pos?.includes('مرمى');
  const isDF = pos?.includes('مدافع') || pos?.includes('CB') || pos?.includes('LB') || pos?.includes('RB') || pos?.includes('دفاع');
  const isMF = pos?.includes('وسط') || pos?.includes('CM') || pos?.includes('DM') || pos?.includes('AM') || pos?.includes('ألعاب');
  
  if (isGK) {
    return [
      { subject: 'الارتكاسات', value: 88 },
      { subject: 'الارتماء', value: 85 },
      { subject: 'الإمساك', value: 82 },
      { subject: 'الركل', value: 78 },
      { subject: 'التمركز', value: 86 },
      { subject: 'السرعة', value: 60 },
    ];
  }
  if (isDF) {
    return [
      { subject: 'السرعة', value: 74 },
      { subject: 'التسديد', value: 50 },
      { subject: 'التمرير', value: 70 },
      { subject: 'المراوغة', value: 65 },
      { subject: 'الدفاع', value: 88 },
      { subject: 'البدني', value: 86 },
    ];
  }
  if (isMF) {
    return [
      { subject: 'السرعة', value: 78 },
      { subject: 'التسديد', value: 75 },
      { subject: 'التمرير', value: 88 },
      { subject: 'المراوغة', value: 82 },
      { subject: 'الدفاع', value: 72 },
      { subject: 'البدني', value: 76 },
    ];
  }
  // Default Forward/Attacker
  return [
    { subject: 'السرعة', value: 88 },
    { subject: 'التسديد', value: 85 },
    { subject: 'التمرير', value: 78 },
    { subject: 'المراوغة', value: 86 },
    { subject: 'الدفاع', value: 42 },
    { subject: 'البدني', value: 78 },
  ];
};

export default function PlayerProfilePage() {
  const params = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  // Player comparison states
  const [comparePlayerId, setComparePlayerId] = useState('');
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [comparePlayer, setComparePlayer] = useState(null);

  const id = params?.id ? Number(params.id) : null;

  // Find player by ID
  const playerFromData = zamalekPlayersWithId.find(player => player.id === id);

  if (!playerFromData) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground gap-6">
        <div className="text-9xl font-black text-muted opacity-20">404</div>
        <h2 className="text-3xl font-bold">اللاعب غير موجود</h2>
        <Link href="/Pages/Players/Football" className="px-8 py-3 bg-primary text-foreground rounded-xl font-bold hover:bg-primary/80 transition-colors">
          عودة للقائمة
        </Link>
      </div>
    );
  }

  const stats = [
    { label: 'مباريات', value: playerFromData.matches || '24', icon: <Activity size={18} /> },
    { label: 'أهداف', value: playerFromData.goals || '0', icon: <Target size={18} /> },
    { label: 'تمريرات حاسمة', value: playerFromData.assists || '0', icon: <Zap size={18} /> },
    { label: 'دقائق اللعب', value: playerFromData.minutes || '1,840', icon: <Shield size={18} /> },
  ];

  const radarData = getAttributes(playerFromData.position);
  
  // List of other players in the squad for comparison
  const otherPlayers = zamalekPlayersWithId.filter(p => p.id !== id);

  const handleStartComparison = () => {
    if (!comparePlayerId) return;
    const targetPlayer = zamalekPlayersWithId.find(p => p.id === Number(comparePlayerId));
    if (targetPlayer) {
      setComparePlayer(targetPlayer);
      setShowCompareModal(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground pb-24" dir="rtl">

      {/* Immersive Header: Player Spotlight */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={playerFromData.img || "/no_img.jpg"}
            alt={playerFromData.name}
            fill
            className="object-cover object-top brightness-50 contrast-125 font-heading"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 h-full flex items-end relative z-10 pb-24">
          <div className="w-full flex flex-col md:flex-row items-end justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-foreground text-4xl font-black font-heading shadow-2xl">
                  {playerFromData.number || '99'}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em]">
                    <Star size={14} fill="currentColor" />
                    <span>فريق الفن والهندسة</span>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black font-heading leading-none italic uppercase tracking-tighter">
                    {playerFromData.name.split(' ').map((n, i) => (
                      <span key={i} className={i === 1 ? 'text-primary' : ''}>{n} </span>
                    ))}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-xs font-black uppercase tracking-widest opacity-60">
                <div className="flex items-center gap-3"><Globe size={14} /> <span>{playerFromData.nationality}</span></div>
                <div className="flex items-center gap-3"><Calendar size={14} /> <span>{playerFromData.age || '25'} سنة</span></div>
                <div className="flex items-center gap-3 text-primary"><span>{playerFromData.position}</span></div>
              </div>
            </motion.div>

            <div className="flex gap-4">
              <button className="h-16 px-10 bg-foreground/10 backdrop-blur-3xl border border-foreground/20 text-foreground rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-foreground hover:text-background transition-all">
                <Heart size={18} />
                <span>المفضل لدى الجماهير</span>
              </button>
              <button className="h-16 w-16 bg-primary text-foreground rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile Grid */}
      <section className="container mx-auto px-4 py-32 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Left Content Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-24">

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 bg-card border border-border rounded-[3rem] text-center space-y-4 group hover:border-primary transition-all shadow-2xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-muted text-foreground flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-foreground transition-all">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-black font-heading italic">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Biography & Dynamic Radar Chart Grid */}
            <section className="space-y-12">
              <header className="flex items-center gap-6">
                <h3 className="text-3xl font-black font-heading tracking-tight italic">القدرات والسمات الفنية</h3>
                <div className="h-px flex-1 bg-border" />
              </header>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-card border border-border rounded-[4rem] p-10 md:p-12 shadow-2xl relative overflow-hidden">
                <Shield size={300} className="absolute -bottom-20 -left-20 text-primary/5 -rotate-12 pointer-events-none" />
                
                {/* Biography Text (7 Cols) */}
                <div className="md:col-span-7 space-y-6 relative z-10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">نبذة وتحليل فني</h4>
                  <p className="text-xl font-bold opacity-60 leading-relaxed italic border-r-4 border-primary/20 pr-6">
                    {playerFromData.bio || "لاعب سطر تاريخه بأحرف من نور في القلعة البيضاء، وحقق العديد من البطولات التي جعلت منه أسطورة خالدة في ذاكرة الجماهير الزمالكوية. يتميز بالروح القتالية العالية والولاء المطلق للشعار."}
                  </p>
                  <div className="space-y-4 pt-4">
                    <h5 className="text-xs font-black uppercase text-white/50">نقاط القوة التكتيكية</h5>
                    <div className="flex flex-wrap gap-2">
                      {playerFromData.position?.includes('حارس') 
                        ? ["سرعة البديهة", "التمركز الممتاز", "الكرات الهوائية"].map(tag => (
                          <span key={tag} className="px-4 py-2 bg-muted border border-border rounded-xl text-xs font-bold">{tag}</span>
                        ))
                        : ["السرعة الفائقة", "اللمسة الواحدة", "التمرير الدقيق", "صناعة اللعب"].map(tag => (
                          <span key={tag} className="px-4 py-2 bg-muted border border-border rounded-xl text-xs font-bold">{tag}</span>
                        ))
                      }
                    </div>
                  </div>
                </div>

                {/* Radar Chart (5 Cols) */}
                <div className="md:col-span-5 h-[280px] w-full flex items-center justify-center relative z-10 bg-white/[0.01] rounded-[2.5rem] border border-white/5 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" radius="70%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.08)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 'bold' }} />
                      <Radar name={playerFromData.name} dataKey="value" stroke="#E31B23" fill="#E31B23" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Career Journey */}
            <section className="space-y-12">
              <h3 className="text-3xl font-black font-heading tracking-tight italic px-4">المسيرة الكروية</h3>
              <div className="space-y-4">
                {[
                  { year: '2023 - الحاضر', club: 'نادي الزمالك', event: 'انتقال رسمي للفريق الأول وتألق في البطولات المحلية والقارية' },
                  { year: '2020 - 2023', club: 'الدرجة الأولى / الدوري الممتاز', event: 'انطلاقة قوية وتألق لافت للنظر أدى إلى لفت أنظار كشافي النادي' },
                  { year: '2015 - 2020', club: 'قطاع الناشئين والأكاديميات', event: 'البداية والتأسيس الرياضي وصقل الموهبة الكروية' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center gap-8 p-8 bg-card border border-border rounded-[3rem] group hover:border-primary transition-all">
                    <div className="text-2xl font-black font-heading text-primary italic w-32 shrink-0">{item.year}</div>
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <Shield size={24} />
                    </div>
                    <div className="flex-1 space-y-1 text-center md:text-right">
                      <div className="text-xl font-black font-heading">{item.club}</div>
                      <div className="text-xs font-bold opacity-40">{item.event}</div>
                    </div>
                    <ChevronLeft className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 hidden md:block" />
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Sidebar Column (4 Cols) */}
          <aside className="lg:col-span-4 space-y-12">

            {/* Fixed Info Card */}
            <div className="bg-card border border-border rounded-[4rem] p-10 shadow-2xl space-y-10">
              <header className="text-center space-y-4">
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                <h4 className="text-xl font-black font-heading uppercase tracking-widest">بيانات اللاعب</h4>
              </header>

              <div className="space-y-3">
                <InfoRow label="العمر" value={`${playerFromData.age || '25'} سنة`} />
                <InfoRow label="الجنسية" value={playerFromData.nationality} />
                <InfoRow label="المركز" value={playerFromData.position} />
                <InfoRow label="الرقم" value={`# ${playerFromData.number}`} />
                <InfoRow label="القيمة السوقية" value={playerFromData.marketValue || '€1.50m'} color="text-primary font-black" />
                <InfoRow label="القدم المفضلة" value="اليمنى" />
              </div>
            </div>

            <button className="w-full h-20 bg-primary hover:bg-primary-hover text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 hover:-translate-y-1 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span>استكشف بطاقات اللاعب</span>
              <Zap size={18} />
            </button>
            {/* Player Comparison Card Widget */}
            <div className="bg-card border border-border rounded-[4rem] p-10 shadow-2xl space-y-8">
              <h4 className="text-lg font-black font-heading italic text-center">مقارنة اللاعب مع زميل</h4>
              <p className="text-xs font-bold text-muted-foreground text-center">اختر لاعباً آخر من الفريق لمقارنة الإحصائيات الفردية والمهارات والتقييم الفني.</p>
              
              <div className="space-y-4">
                <select
                  value={comparePlayerId}
                  onChange={(e) => setComparePlayerId(e.target.value)}
                  className="w-full bg-muted border border-border rounded-2xl p-4 text-xs font-bold outline-none focus:border-primary transition-all"
                >
                  <option value="">اختر لاعباً للمقارنة...</option>
                  {otherPlayers.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (#{p.number} - {p.position})</option>
                  ))}
                </select>

                <button
                  onClick={handleStartComparison}
                  disabled={!comparePlayerId}
                  className="w-full h-16 bg-primary hover:bg-primary-hover text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-black text-xs uppercase tracking-[0.1em] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all"
                >
                  <span>بدء المقارنة</span>
                  <Zap size={16} />
                </button>
              </div>
            </div>

            {/* Mini Gallery Preview */}
            <div className="bg-card border border-border rounded-[4rem] p-10 shadow-2xl space-y-8">
              <h4 className="text-lg font-black font-heading italic text-center">أبرز لقطات البطل</h4>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer">
                    <Image src={playerFromData.img || "/no_img.jpg"} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </section>

      {/* COMPARISON MODAL OVERLAY */}
      <AnimatePresence>
        {showCompareModal && comparePlayer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            
            {/* Dark blur background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompareModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-card rounded-[3rem] border border-border shadow-[0_32px_128px_rgba(0,0,0,0.5)] overflow-hidden z-10 p-8 md:p-12 text-right"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCompareModal(false)}
                className="absolute top-6 left-6 w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl md:text-3xl font-black font-heading mb-10 text-center">مقارنة فنية ثنائية</h3>

              <div className="grid grid-cols-3 items-start gap-8 mb-10 text-center">
                {/* Player 1 (Current Profile) */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary shadow-xl">
                    <Image src={playerFromData.img} alt={playerFromData.name} fill className="object-cover object-top" />
                  </div>
                  <h4 className="font-black font-heading text-lg">{playerFromData.name}</h4>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">#{playerFromData.number}</span>
                </div>

                {/* VS Badge */}
                <div className="flex flex-col items-center justify-center h-full pt-10">
                  <span className="text-4xl md:text-6xl font-black italic text-muted opacity-25 font-heading">VS</span>
                </div>

                {/* Player 2 (Compare Player) */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-muted shadow-xl">
                    <Image src={comparePlayer.img} alt={comparePlayer.name} fill className="object-cover object-top" />
                  </div>
                  <h4 className="font-black font-heading text-lg">{comparePlayer.name}</h4>
                  <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-bold">#{comparePlayer.number}</span>
                </div>
              </div>

              {/* Side-by-Side Comparison Table */}
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                <CompareStatRow label="المركز" val1={playerFromData.position} val2={comparePlayer.position} />
                <CompareStatRow label="العمر" val1={`${playerFromData.age || '25'} سنة`} val2={`${comparePlayer.age || '25'} سنة`} />
                <CompareStatRow label="الجنسية" val1={playerFromData.nationality} val2={comparePlayer.nationality} />
                <CompareStatRow label="القيمة السوقية" val1={playerFromData.marketValue || '€1.50m'} val2={comparePlayer.marketValue || '€1.50m'} isHighlighted={true} />
                <CompareStatRow label="الأهداف" val1={playerFromData.goals || '0'} val2={comparePlayer.goals || '0'} />
                <CompareStatRow label="التمريرات الحاسمة" val1={playerFromData.assists || '0'} val2={comparePlayer.assists || '0'} />
                <CompareStatRow label="المباريات" val1={playerFromData.matches || '24'} val2={comparePlayer.matches || '24'} />
              </div>

              <div className="text-center mt-10">
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="px-8 py-4 bg-muted hover:bg-primary hover:text-white rounded-2xl font-bold transition-all text-xs uppercase tracking-wider"
                >
                  إغلاق نافذة المقارنة
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function InfoRow({ label, value, color }) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-border/50 last:border-0 px-4">
      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</span>
      <span className={`text-sm font-black italic ${color || 'opacity-80'}`}>{value}</span>
    </div>
  );
}

function CompareStatRow({ label, val1, val2, isHighlighted = false }) {
  return (
    <div className={`grid grid-cols-3 py-4 border-b border-border/50 items-center text-center ${isHighlighted ? 'bg-primary/5 rounded-xl px-2' : ''}`}>
      <span className={`font-black text-sm ${isHighlighted ? 'text-primary' : 'opacity-80'}`}>{val1}</span>
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      <span className="font-black text-sm opacity-80">{val2}</span>
    </div>
  );
}
