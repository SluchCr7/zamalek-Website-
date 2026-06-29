'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Star, Shield, ArrowRight, Zap, Target, Bookmark, Download, MapPin, Calendar, Clock, ChevronRight, Activity } from 'lucide-react';
import { zamalekBasketballDec2025 } from '@/utils/data';

const achievements = [
    { title: "الدوري المصري الممتاز", count: 13, years: ["1970", "1974", "1975", "1976", "1977", "1978", "1980", "1981", "1991", "1997", "1998", "2003", "2007", "2019", "2021"] },
    { title: "كأس مصر", count: 12, years: ["1979", "1980", "1981", "1991", "1992", "1997", "1998", "2000", "2001", "2002", "2003", "2006"] },
    { title: "دوري أبطال أفريقيا (BAL)", count: 1, years: ["2021"] },
    { title: "أبطال الكؤوس الأفريقية", count: 1, years: ["1998"] },
];

export default function BasketballPage() {
    const [activeTab, setActiveTab] = useState('Roster');
    const teams = zamalekBasketballDec2025.roster;

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">

            {/* Cinematic Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/squads/basket-min.png"
                        alt="كرة السلة نادي الزمالك"
                        fill
                        className="object-cover opacity-30 contrast-125 saturate-150"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center space-y-8 px-4 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                    >
                        <Star size={14} fill="currentColor" />
                        <span>The Basketball Kings - Season 25/26</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl font-black font-heading tracking-tighter leading-none italic uppercase">
                        مـلـوك <span className="text-orange-500">الـسـلـة</span>
                    </h1>

                    <div className="flex flex-wrap justify-center gap-12 pt-12">
                        <div className="text-center">
                            <div className="text-5xl font-black font-heading text-orange-500 italic">13</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">League Titles</div>
                        </div>
                        <div className="w-px h-12 bg-border hidden md:block" />
                        <div className="text-center">
                            <div className="text-5xl font-black font-heading text-orange-500 italic">BAL</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">2021 Champions</div>
                        </div>
                        <div className="w-px h-12 bg-border hidden md:block" />
                        <div className="text-center">
                            <div className="text-5xl font-black font-heading text-orange-500 italic">12</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Cup Records</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Filter */}
            <section className="sticky top-20 z-[50] bg-background/80 backdrop-blur-3xl border-b border-border py-6">
                <div className="container mx-auto px-4 flex justify-center gap-6">
                    {['Roster', 'Coaching', 'History'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-orange-500 text-foreground shadow-xl shadow-orange-500/20' : 'hover:bg-muted opacity-40 hover:opacity-100'
                                }`}
                        >
                            {tab === 'Roster' ? 'قائمة الفريق' : tab === 'Coaching' ? 'الجهاز الفني' : 'سجل البطولات'}
                        </button>
                    ))}
                </div>
            </section>

            <div className="container mx-auto px-4 py-32">
                <AnimatePresence mode="wait">
                    {activeTab === 'Roster' && (
                        <motion.div
                            key="roster"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-32"
                        >
                            {Object.entries(teams).map(([pos, players], idx) => (
                                <section key={pos} className="space-y-12">
                                    <header className="flex items-end justify-between">
                                        <div className="space-y-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 italic">Unit Group Order {idx + 1}</span>
                                            <h2 className="text-4xl md:text-5xl font-black font-heading italic">{
                                                pos === 'pointGuards' ? 'صناع اللعب (Point Guards)' :
                                                    pos === 'shootingGuards' ? 'المصوبون (Shooting Guards)' :
                                                        pos === 'smallForwards' ? 'الأجنحة (Small Forwards)' :
                                                            pos === 'powerForwards' ? 'اللاعبون المرتكزون (Power Forwards)' : 'العمالقة (Centers)'
                                            }</h2>
                                        </div>
                                        <div className="text-4xl font-black font-heading opacity-5 italic">0{idx + 1}</div>
                                    </header>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {players.map((player, pIdx) => (
                                            <div key={pIdx} className="group relative">
                                                <div className="absolute inset-0 bg-orange-500/10 rounded-[3rem] blur-[30px] opacity-0 group-hover:opacity-100 transition-all" />
                                                <div className="relative bg-card border border-border rounded-[3rem] p-10 shadow-2xl space-y-8 hover:border-orange-500 transition-all overflow-hidden group">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-[3rem] group-hover:bg-orange-500 transition-all flex items-center justify-center translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0">
                                                        <div className="text-foreground opacity-0 group-hover:opacity-100 scale-150"><Zap size={24} fill="currentColor" /></div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="text-orange-500 font-black text-xs uppercase tracking-widest">{player.type}</div>
                                                        <h3 className="text-2xl font-black font-heading italic">{player.name}</h3>
                                                        <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{player.role}</div>
                                                    </div>
                                                    {player.note && (
                                                        <div className="p-4 bg-muted/50 rounded-2xl border border-border text-[10px] font-bold opacity-60 leading-relaxed italic">
                                                            {player.note}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-20">{player.status || 'Active Roster'}</span>
                                                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-black text-xs">#{pIdx + 1}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
                            className="max-w-4xl mx-auto space-y-12"
                        >
                            <div className="p-20 bg-card border border-border rounded-[4rem] text-center space-y-8 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-all" />
                                <div className="w-32 h-32 bg-orange-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/20 mb-8">
                                    <Users size={48} className="text-foreground" />
                                </div>
                                <div className="space-y-3">
                                    <div className="text-orange-500 font-black text-xs uppercase tracking-[0.4em]">Head Coach</div>
                                    <h2 className="text-5xl font-black font-heading italic">{zamalekBasketballDec2025.headCoach}</h2>
                                    <p className="text-lg font-bold opacity-40">قيادة فنية خبيرة لقيادة مدرسة السلة للقمة العالمية.</p>
                                </div>
                            </div>
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
                            {achievements.map((ach, idx) => (
                                <div key={idx} className="bg-card border border-border rounded-[4rem] p-16 shadow-2xl space-y-12 group hover:border-orange-500 transition-all">
                                    <header className="flex justify-between items-start">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black font-heading italic">{ach.title}</h3>
                                            <div className="h-1.5 w-16 bg-orange-500 rounded-full" />
                                        </div>
                                        <Trophy className="text-orange-500" size={40} />
                                    </header>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                                            <span>سجل السنوات</span>
                                            <span>{ach.count} ألقاب</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-right">
                                            {ach.years.map(y => (
                                                <span key={y} className="px-4 py-2 bg-muted rounded-xl text-xs font-bold border border-border group-hover:bg-orange-500/10 group-hover:border-orange-500 transition-all">{y}</span>
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
