'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowLeftRight, TrendingUp, ShieldCheck, Flame, Info, DollarSign, Calendar, Landmark, HelpCircle, Trophy } from 'lucide-react';
import TitleSection from '@/Components/TitleSection';

// Static transfer data
const incomings = [
  { id: 1, name: 'محمود صابر', pos: 'وسط هجومي', from: 'بيراميدز FC', fee: '€1.20m', value: '€1.00m', age: 24, contract: '4 سنوات', img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'شيكو بينزا', pos: 'مهاجم صريح', from: 'بترو أتليتيكو', fee: '€1.50m', value: '€1.40m', age: 26, contract: '3 سنوات', img: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'أحمد كالوشا', pos: 'مدافع محوري', from: 'إنبي', fee: '€800K', value: '€750K', age: 27, contract: '4 سنوات', img: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=200&auto=format&fit=crop' },
];

const outgoings = [
  { id: 1, name: 'سامسون أكينيولا', pos: 'مهاجم', to: 'البنك الأهلي', fee: 'انتقال حر', value: '€350K', age: 25 },
  { id: 2, name: 'إبراهيما نداي', pos: 'جناح أيسر', to: 'نادي لوزيرن السويسري', fee: 'انتقال حر', value: '€600K', age: 27 },
];

const rumors = [
  { id: 1, name: 'رمضان صبحي', pos: 'جناح أيسر', currentClub: 'بيراميدز FC', probability: 75, feeEstimate: '€2.50m', details: 'مفاوضات متقدمة مع اللاعب وإدارة ناديه للحصول على خدماته في الميركاتو الصيفي.' },
  { id: 2, name: 'جوناثان نغويم', pos: 'ظهير أيسر', currentClub: 'مودرن سبورت', probability: 60, feeEstimate: '€800K', details: 'طلب رسمي مقدم من الزمالك لتدعيم مركز الظهير الأيسر كبديل استراتيجي لفتوح.' },
  { id: 3, name: 'مابولولو', pos: 'مهاجم صريح', currentClub: 'الاتحاد السكندري', probability: 45, feeEstimate: '€1.80m', details: 'رغبة مشتركة ولكن المطالب المالية الكبيرة لزعيم الثغر تعيق تسريع المفاوضات.' },
];

const marketValueData = [
  { position: 'حراسة المرمى', value: 1.8, color: '#E31B23' },
  { position: 'الدفاع', value: 6.5, color: '#E31B23' },
  { position: 'الوسط', value: 8.2, color: '#000000' },
  { position: 'الهجوم', value: 10.4, color: '#E31B23' },
];

export default function TransfersPage() {
  const [activeSubTab, setActiveSubTab] = useState('in');

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 w-full" dir="rtl">
      
      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 border-b border-border overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto">
          <TitleSection
            title="سوق الانتقالات الملكي"
            subtitle="متابعة مستمرة للصفقات الرسمية (الوافدون والراحلون) وشائعات الانتقالات والقيم السوقية للاعبي القلعة البيضاء"
          />
        </div>
      </section>

      {/* Main Grid: official activity & chart */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Official Signings Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-card/50 backdrop-blur-xl rounded-[2.5rem] border border-border shadow-2xl overflow-hidden">
              
              {/* Header Tab Selector */}
              <div className="p-8 border-b border-border flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <ArrowLeftRight size={20} />
                  </div>
                  <h3 className="text-xl font-black font-heading">الحركات الرسمية بالميركاتو</h3>
                </div>

                <div className="flex bg-muted rounded-2xl p-1 shadow-inner border border-border/10">
                  <button
                    onClick={() => setActiveSubTab('in')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                      activeSubTab === 'in' ? 'bg-primary text-white shadow' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    الوافدون الجدد ({incomings.length})
                  </button>
                  <button
                    onClick={() => setActiveSubTab('out')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                      activeSubTab === 'out' ? 'bg-primary text-white shadow' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    الراحلون عن الفريق ({outgoings.length})
                  </button>
                </div>
              </div>

              {/* Transactions List */}
              <div className="p-8">
                {activeSubTab === 'in' ? (
                  <div className="space-y-6">
                    {incomings.map((p, idx) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-muted/20 border border-border/60 hover:border-primary/20 rounded-[2rem] transition-all"
                      >
                        <div className="flex items-center gap-5 w-full md:w-auto">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-border/80 bg-muted">
                            <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <div className="text-right space-y-1">
                            <h4 className="text-lg font-black font-heading leading-none">{p.name}</h4>
                            <p className="text-xs text-muted-foreground font-bold">{p.pos} • {p.age} سنة</p>
                          </div>
                        </div>

                        {/* Middle info */}
                        <div className="grid grid-cols-2 md:flex md:items-center gap-6 text-center md:text-right w-full md:w-auto justify-around border-t border-b md:border-0 border-border/40 py-4 md:py-0">
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider">نادي سابق</div>
                            <div className="font-black text-sm flex items-center gap-1"><Landmark size={12} className="text-primary" /> {p.from}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider">العقد</div>
                            <div className="font-bold text-sm">{p.contract}</div>
                          </div>
                        </div>

                        {/* Market value */}
                        <div className="text-left w-full md:w-auto flex justify-between md:block">
                          <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider md:text-left">قيمة الصفقة</div>
                          <div className="text-xl font-black font-heading text-primary">{p.fee}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {outgoings.map((p, idx) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-muted/20 border border-border/60 hover:border-primary/20 rounded-[2rem] transition-all"
                      >
                        <div className="flex items-center gap-5 w-full md:w-auto">
                          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center border border-border/80 text-primary">
                            <ArrowLeftRight size={24} />
                          </div>
                          <div className="text-right space-y-1">
                            <h4 className="text-lg font-black font-heading leading-none">{p.name}</h4>
                            <p className="text-xs text-muted-foreground font-bold">{p.pos} • {p.age} سنة</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:flex md:items-center gap-6 text-center md:text-right w-full md:w-auto justify-around border-t border-b md:border-0 border-border/40 py-4 md:py-0">
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider">الوجهة القادمة</div>
                            <div className="font-black text-sm">{p.to}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider">القيمة السوقية</div>
                            <div className="font-bold text-sm">{p.value}</div>
                          </div>
                        </div>

                        <div className="text-left w-full md:w-auto flex justify-between md:block">
                          <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider md:text-left">نوع الرحيل</div>
                          <div className="text-xl font-black font-heading text-primary">{p.fee}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Squad Value Analysis Chart */}
            <div className="bg-card/50 backdrop-blur-xl rounded-[2.5rem] border border-border shadow-2xl p-8 md:p-12">
              <header className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                  <span className="text-[10px] text-primary uppercase tracking-[0.25em] font-black">Squad Analysis</span>
                  <h3 className="text-2xl font-black font-heading">توزيع القيمة السوقية حسب المراكز</h3>
                </div>
                <TrendingUp size={24} className="opacity-30" />
              </header>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketValueData}>
                    <XAxis dataKey="position" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 'bold' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 'bold' }} unit="M" />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem' }} />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                      {marketValueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs font-bold text-muted-foreground text-center mt-6">القيمة السوقية معبر عنها بملايين اليورو (€m) حسب إحصائيات Transfermarkt للربع الأول لعام 2026.</p>
            </div>
          </div>

          {/* Right Sidebar Column: Rumors & Probability (1 Col) */}
          <aside className="space-y-12">
            <div className="bg-card/50 backdrop-blur-xl rounded-[2.5rem] border border-border p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              
              <div className="flex items-center gap-3 mb-10">
                <Flame size={22} className="text-primary animate-pulse" />
                <h3 className="text-xl font-black font-heading">شائعات الميركاتو</h3>
              </div>

              <div className="space-y-8">
                {rumors.map((r, idx) => (
                  <div key={r.id} className="pb-6 border-b border-border/50 last:border-0 last:pb-0 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-black text-base">{r.name}</h4>
                        <p className="text-xs text-muted-foreground font-bold">{r.pos} • {r.currentClub}</p>
                      </div>
                      
                      {/* Probability badge */}
                      <div className="flex flex-col items-end">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black text-white ${
                          r.probability >= 70 ? 'bg-emerald-600' : r.probability >= 50 ? 'bg-yellow-500' : 'bg-primary'
                        }`}>
                          {r.probability}%
                        </span>
                        <span className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-1">احتمالية</span>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-muted-foreground leading-relaxed bg-muted/20 border border-border/40 rounded-2xl p-4">
                      {r.details}
                    </p>

                    <div className="flex justify-between items-center text-[10px]">
                      <span className="flex items-center gap-1.5 opacity-60"><Calendar size={12} /> تحديث اليوم</span>
                      <span className="flex items-center gap-1 font-black text-primary"><DollarSign size={12} /> القيمة المقدرة: {r.feeEstimate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium transfer policy info */}
            <div className="rounded-[2.5rem] bg-foreground text-background p-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <Info className="mb-6 opacity-30 text-primary" size={28} />
              <h3 className="text-xl font-black font-heading mb-4">فلسفة التعاقدات</h3>
              <p className="text-sm font-bold opacity-70 leading-relaxed mb-6">
                يسعى نادي الزمالك لتعزيز صفوفه بلاعبين واعدين في الميركاتو، مع إعطاء الأولوية للاعبين الشباب من قطاع الناشئين والحفاظ على قوام الفريق الأساسي لصناعة المجد والألقاب.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-red-400 transition-colors cursor-pointer">
                <span>استكشف بطولات النادي</span>
                <Trophy size={14} />
              </div>
            </div>
          </aside>

        </div>
      </section>

    </div>
  );
}
