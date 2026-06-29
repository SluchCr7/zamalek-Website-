'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Calendar, Globe, Target, Zap, Shield, Heart, Share2, Info, ChevronLeft, Activity, Trophy, Star, X } from 'lucide-react';
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

      {/* Pro Minimalist Hero Spotlight */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-neutral-950 border-b border-border">
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Player Metadata */}
            <div className="md:col-span-7 space-y-6 text-right order-2 md:order-1">
              <div className="flex items-center gap-4">
                <span className="text-4xl md:text-5xl font-black font-heading text-primary border border-primary/20 bg-primary/5 px-4 py-2 rounded-2xl">
                  {playerFromData.number || '99'}
                </span>
                <div>
                  <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                    <Star size={12} fill="currentColor" />
                    <span>نادي الزمالك العريق</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight italic uppercase tracking-tighter mt-1">
                    {playerFromData.name}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-bold opacity-60">
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl"><Globe size={14} /> <span>{playerFromData.nationality}</span></div>
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl"><Calendar size={14} /> <span>{playerFromData.age || '25'} سنة</span></div>
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl font-black"><span>{playerFromData.position}</span></div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="h-12 px-6 bg-card border border-border text-foreground hover:bg-muted rounded-xl text-xs font-bold flex items-center gap-2 transition-all">
                  <Heart size={16} className="text-primary" />
                  <span>المفضل لدى الجماهير</span>
                </button>
                <button className="h-12 w-12 bg-primary text-foreground rounded-xl flex items-center justify-center hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Right Column: Player Portrait (Clean frame) */}
            <div className="md:col-span-5 flex justify-center order-1 md:order-2">
              <div className="relative w-64 h-80 md:w-80 md:h-[400px] rounded-[2.5rem] border border-border bg-card overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
                <Image
                  src={playerFromData.img || "/no_img.jpg"}
                  alt={playerFromData.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Profile Grid */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 bg-card border border-border rounded-2xl text-center space-y-3 group hover:border-primary transition-all shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-foreground transition-all">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black font-heading italic">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Biography & Dynamic Radar Chart Grid */}
            <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-lg space-y-8">
              <header className="flex items-center gap-4">
                <h3 className="text-2xl font-black font-heading tracking-tight">القدرات والسمات الفنية</h3>
                <div className="h-px flex-1 bg-border" />
              </header>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Biography Text (7 Cols) */}
                <div className="md:col-span-7 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">تحليل الأداء الفني</span>
                  <p className="text-base font-bold opacity-60 leading-relaxed italic border-r-4 border-primary/30 pr-4">
                    {playerFromData.bio || "لاعب سطر تاريخه بأحرف من نور في القلعة البيضاء، وحقق العديد من البطولات التي جعلت منه أسطورة خالدة في ذاكرة الجماهير الزمالكوية. يتميز بالروح القتالية العالية والولاء المطلق للشعار."}
                  </p>
                  <div className="space-y-3 pt-3">
                    <h5 className="text-xs font-black uppercase text-muted-foreground">نقاط القوة التكتيكية</h5>
                    <div className="flex flex-wrap gap-2">
                      {playerFromData.position?.includes('حارس') 
                        ? ["سرعة البديهة", "التمركز الممتاز", "الكرات الهوائية"].map(tag => (
                          <span key={tag} className="px-3 py-1.5 bg-muted border border-border rounded-xl text-xs font-bold">{tag}</span>
                        ))
                        : ["السرعة الفائقة", "اللمسة الواحدة", "التمرير الدقيق", "صناعة اللعب"].map(tag => (
                          <span key={tag} className="px-3 py-1.5 bg-muted border border-border rounded-xl text-xs font-bold">{tag}</span>
                        ))
                      }
                    </div>
                  </div>
                </div>

                {/* Radar Chart (5 Cols) */}
                <div className="md:col-span-5 h-[260px] w-full flex items-center justify-center relative bg-muted/20 rounded-2xl border border-border p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" radius="70%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 'bold' }} />
                      <Radar name={playerFromData.name} dataKey="value" stroke="#E31B23" fill="#E31B23" fillOpacity={0.25} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Career Timeline */}
            <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-lg space-y-8">
              <h3 className="text-2xl font-black font-heading tracking-tight">المسيرة الكروية</h3>
              <div className="relative border-r border-border/80 mr-4 space-y-8">
                {[
                  { year: '2023 - الحاضر', club: 'نادي الزمالك', event: 'انتقال رسمي للفريق الأول وتألق في البطولات المحلية والقارية' },
                  { year: '2020 - 2023', club: 'الدرجة الأولى / الدوري الممتاز', event: 'انطلاقة قوية وتألق لافت للنظر أدى إلى لفت أنظار كشافي النادي' },
                  { year: '2015 - 2020', club: 'قطاع الناشئين والأكاديميات', event: 'البداية والتأسيس الرياضي وصقل الموهبة الكروية' },
                ].map((item, i) => (
                  <div key={i} className="relative pr-8 group">
                    {/* Timeline Node */}
                    <div className="absolute top-1.5 right-[-5px] w-2.5 h-2.5 rounded-full bg-border group-hover:bg-primary transition-colors border border-background z-10" />
                    
                    <div className="space-y-1">
                      <span className="text-xs font-black text-primary">{item.year}</span>
                      <h4 className="text-lg font-black">{item.club}</h4>
                      <p className="text-xs font-bold opacity-45">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar Column (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">

            {/* Player Details Card */}
            <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-lg space-y-6">
              <h4 className="text-lg font-black font-heading uppercase tracking-widest text-center border-b border-border pb-3">بيانات اللاعب</h4>
              <div className="space-y-4">
                <InfoRow label="العمر" value={`${playerFromData.age || '25'} سنة`} />
                <InfoRow label="الجنسية" value={playerFromData.nationality} />
                <InfoRow label="المركز" value={playerFromData.position} />
                <InfoRow label="الرقم" value={`# ${playerFromData.number}`} />
                <InfoRow label="القيمة السوقية" value={playerFromData.marketValue || '€1.50m'} color="text-primary font-black" />
                <InfoRow label="القدم المفضلة" value="اليمنى" />
              </div>
            </div>

            {/* Player Comparison Card Widget */}
            <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-lg space-y-4">
              <h4 className="text-lg font-black font-heading text-center">مقارنة اللاعب مع زميل</h4>
              <p className="text-xs font-bold text-muted-foreground text-center">اختر لاعباً آخر من الفريق لمقارنة الإحصائيات الفردية والمهارات والتقييم الفني.</p>
              
              <div className="space-y-3">
                <select
                  value={comparePlayerId}
                  onChange={(e) => setComparePlayerId(e.target.value)}
                  className="w-full bg-muted border border-border rounded-xl p-3 text-xs font-bold outline-none focus:border-primary transition-all"
                >
                  <option value="">اختر لاعباً للمقارنة...</option>
                  {otherPlayers.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (#{p.number} - {p.position})</option>
                  ))}
                </select>

                <button
                  onClick={handleStartComparison}
                  disabled={!comparePlayerId}
                  className="w-full h-12 bg-primary hover:bg-primary-hover text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-primary/10 transition-all cursor-pointer"
                >
                  <span>بدء المقارنة</span>
                  <Zap size={14} />
                </button>
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
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-card rounded-[2.5rem] border border-border shadow-2xl overflow-hidden z-10 p-6 md:p-8 text-right"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCompareModal(false)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl md:text-2xl font-black font-heading mb-8 text-center">مقارنة فنية ثنائية</h3>

              <div className="grid grid-cols-3 items-start gap-4 mb-8 text-center">
                {/* Player 1 (Current Profile) */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary shadow-md bg-muted">
                    <Image src={playerFromData.img || "/no_img.jpg"} alt={playerFromData.name} fill className="object-cover object-top" />
                  </div>
                  <h4 className="font-bold text-sm truncate max-w-full">{playerFromData.name}</h4>
                  <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">#{playerFromData.number}</span>
                </div>

                {/* VS Badge */}
                <div className="flex flex-col items-center justify-center h-full pt-6">
                  <span className="text-2xl md:text-3xl font-black italic text-muted opacity-30 font-heading">VS</span>
                </div>

                {/* Player 2 (Compare Player) */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-border shadow-md bg-muted">
                    <Image src={comparePlayer.img || "/no_img.jpg"} alt={comparePlayer.name} fill className="object-cover object-top" />
                  </div>
                  <h4 className="font-bold text-sm truncate max-w-full">{comparePlayer.name}</h4>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full font-bold">#{comparePlayer.number}</span>
                </div>
              </div>

              {/* Side-by-Side Comparison Table */}
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                <CompareStatRow label="المركز" val1={playerFromData.position} val2={comparePlayer.position} />
                <CompareStatRow label="العمر" val1={`${playerFromData.age || '25'} سنة`} val2={`${comparePlayer.age || '25'} سنة`} />
                <CompareStatRow label="الجنسية" val1={playerFromData.nationality} val2={comparePlayer.nationality} />
                <CompareStatRow label="القيمة السوقية" val1={playerFromData.marketValue || '€1.50m'} val2={comparePlayer.marketValue || '€1.50m'} isHighlighted={true} />
                <CompareStatRow label="الأهداف" val1={playerFromData.goals || '0'} val2={comparePlayer.goals || '0'} />
                <CompareStatRow label="التمريرات الحاسمة" val1={playerFromData.assists || '0'} val2={comparePlayer.assists || '0'} />
                <CompareStatRow label="المباريات" val1={playerFromData.matches || '24'} val2={comparePlayer.matches || '24'} />
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="px-6 py-2.5 bg-muted hover:bg-primary hover:text-white rounded-xl font-bold transition-all text-xs cursor-pointer"
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
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</span>
      <span className={`text-xs font-bold ${color || 'opacity-80'}`}>{value}</span>
    </div>
  );
}

function CompareStatRow({ label, val1, val2, isHighlighted = false }) {
  return (
    <div className={`grid grid-cols-3 py-3 border-b border-border/50 items-center text-center ${isHighlighted ? 'bg-primary/5 rounded-xl px-2' : ''}`}>
      <span className={`font-bold text-xs ${isHighlighted ? 'text-primary' : 'opacity-85'}`}>{val1}</span>
      <span className="text-[10px] font-bold text-muted-foreground">{label}</span>
      <span className="font-bold text-xs opacity-85">{val2}</span>
    </div>
  );
}
