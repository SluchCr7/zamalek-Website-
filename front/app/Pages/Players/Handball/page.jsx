'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Star, Shield, ArrowRight, Zap, Target, Bookmark, Download, MapPin, Calendar, Clock, ChevronRight, Activity, HandMetal, Crosshair } from 'lucide-react';
import { zamalekHandballFinal2025 } from '@/utils/data';

const achievements = [
    { title: "الدوري المصري المحترف", count: 19, years: ["1977", "1979", "1981", "1983", "1984", "1985", "1990", "1991", "1995", "1996", "1999", "2001", "2005", "2009", "2010", "2016", "2019", "2020", "2021", "2022"] },
    { title: "كأس مصر لكرة اليد", count: 16, years: ["1979", "1980", "1981", "1982", "1983", "1986", "1991", "1992", "1994", "1999", "2001", "2002", "2004", "2006", "2008", "2016"] },
    { title: "دوري أبطال أفريقيا", count: 12, years: ["1979", "1980", "1981", "1986", "1991", "2001", "2002", "2011", "2015", "2017", "2018", "2019"] },
    { title: "كأس السوبر الأفريقي", count: 7, years: ["2002", "2010", "2011", "2012", "2018", "2019", "2021"] },
    { title: "أبطال الكؤوس الأفريقية", count: 7, years: ["1985", "1987", "2009", "2010", "2011", "2016", "2022"] },
];

export default function HandballPage() {
    const [activeTab, setActiveTab] = useState('Roster');
    const teams = zamalekHandballFinal2025.roster;
    const staff = zamalekHandballFinal2025.coachingStaff;

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">

            {/* Cinematic Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/squads/handball-min.png"
                        alt="كرة اليد نادي الزمالك"
                        fill
                        className="object-cover opacity-30 contrast-125 saturate-150 brightness-75 grayscale-[0.3]"
                        priority
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-emerald-500)_0%,_transparent_70%)] opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <div className="relative z-10 text-center space-y-8 px-4 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                    >
                        <Crosshair size={14} fill="currentColor" />
                        <span>The Commandos - Military Grade Handball 25/26</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl font-black font-heading tracking-tighter leading-none italic uppercase">
                        فـريـق <span className="text-emerald-500">الـكـومـانـدوز</span>
                    </h1>

                    <div className="flex flex-wrap justify-center gap-12 pt-12">
                        <div className="text-center">
                            <div className="text-5xl font-black font-heading text-emerald-500 italic">19</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Pro Leagues</div>
                        </div>
                        <div className="w-px h-12 bg-border hidden md:block" />
                        <div className="text-center">
                            <div className="text-5xl font-black font-heading text-emerald-500 italic">12</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">CL Africa</div>
                        </div>
                        <div className="w-px h-12 bg-border hidden md:block" />
                        <div className="text-center">
                            <div className="text-5xl font-black font-heading text-emerald-500 italic">16</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Cup Glory</div>
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
                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-emerald-600 text-foreground shadow-xl shadow-emerald-500/20' : 'hover:bg-muted opacity-40 hover:opacity-100'
                                }`}
                        >
                            {tab === 'Roster' ? 'قائمة المحاربين' : tab === 'Coaching' ? 'الجهاز الفني' : 'قاعة البطولات'}
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
                                    <header className="flex items-end justify-between border-b border-border pb-8">
                                        <div className="space-y-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">Unit Strategic Wing {idx + 1}</span>
                                            <h2 className="text-4xl md:text-5xl font-black font-heading italic uppercase">{
                                                pos === 'goalkeepers' ? 'حراس العرين (Goalkeepers)' :
                                                    pos === 'leftBacks' ? 'الساعد الأيسر (Left Backs)' :
                                                        pos === 'centerBacks' ? 'قادة اللعب (Center Backs)' :
                                                            pos === 'rightBacks' ? 'الساعد الأيمن (Right Backs)' :
                                                                pos === 'leftWings' ? 'الجناح الأيسر (Left Wings)' :
                                                                    pos === 'rightWings' ? 'الجناح الأيمن (Right Wings)' : 'لاعبي الدائرة (Pivots)'
                                            }</h2>
                                        </div>
                                    </header>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {players.map((player, pIdx) => (
                                            <div key={pIdx} className="group relative">
                                                <div className="absolute inset-0 bg-emerald-500/10 rounded-[3rem] blur-[30px] opacity-0 group-hover:opacity-100 transition-all border border-emerald-500/20" />
                                                <div className="relative bg-card border border-border rounded-[3rem] p-10 shadow-2xl space-y-8 hover:border-emerald-500 transition-all overflow-hidden group">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-3">
                                                            <h3 className="text-2xl font-black font-heading italic uppercase">{player.name}</h3>
                                                            <div className="flex flex-wrap gap-4">
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{player.status}</div>
                                                            </div>
                                                        </div>
                                                        <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center font-black text-xl text-emerald-500/40">#{pIdx + 1}</div>
                                                    </div>
                                                    {player.note && (
                                                        <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-[11px] font-bold opacity-60 leading-relaxed italic border-r-4 border-r-emerald-500 pr-6">
                                                            {player.note}
                                                        </div>
                                                    )}
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
                            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                        >
                            <div className="md:col-span-2 p-20 bg-card border border-border rounded-[4rem] text-center space-y-10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all" />
                                <div className="w-24 h-24 bg-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl mb-6 scale-110">
                                    <Crosshair className="text-foreground" size={32} />
                                </div>
                                <div className="space-y-4">
                                    <div className="text-emerald-500 font-black text-xs uppercase tracking-[0.5em]">Supreme Military Commander</div>
                                    <h2 className="text-5xl font-black font-heading italic">{staff.headCoach}</h2>
                                    <p className="text-lg font-bold opacity-40 italic">Leading the commandos strategy on the continental stage.</p>
                                </div>
                            </div>

                            <InfoCard label="Strategic Assistant" value={staff.assistantCoach} icon={<Activity />} color="text-emerald-500" />
                            <InfoCard label="Logistic Manager" value={staff.teamManager} icon={<Shield />} color="text-emerald-500" />
                            <InfoCard label="Medical Officer" value={staff.doctor} icon={<Star />} color="text-emerald-500" />
                        </motion.div>
                    )}

                    {activeTab === 'History' && (
                        <motion.div
                            key="history"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid lg:grid-cols-2 gap-12"
                        >
                            {achievements.map((ach, idx) => (
                                <div key={idx} className="bg-card border border-border rounded-[4rem] p-16 shadow-2xl space-y-12 group hover:border-emerald-500 transition-all relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-full translate-x-20 -translate-y-20 group-hover:scale-125 transition-transform" />
                                    <header className="flex justify-between items-start relative z-10">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black font-heading italic leading-tight uppercase">{ach.title}</h3>
                                            <div className="h-2 w-20 bg-emerald-500 rounded-full" />
                                        </div>
                                        <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-foreground transition-all">
                                            <Trophy size={40} />
                                        </div>
                                    </header>
                                    <div className="space-y-8 relative z-10">
                                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                                            <span className="flex items-center gap-2 px-3 py-1 bg-muted rounded-lg">Operational History</span>
                                            <span className="text-emerald-500">{ach.count} Missions Completed</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {ach.years.map(y => (
                                                <span key={y} className="px-5 py-2.5 bg-muted/60 rounded-2xl text-[10px] font-black border border-border group-hover:bg-emerald-600/10 group-hover:border-emerald-600/30 transition-all shadow-sm">{y}</span>
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

function InfoCard({ label, value, icon, color }) {
    return (
        <div className="p-12 bg-card border border-border rounded-[3rem] shadow-xl flex items-center gap-8 group hover:border-emerald-600 transition-all overflow-hidden relative">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all" />
            <div className={`relative z-10 w-16 h-16 rounded-2xl bg-muted flex items-center justify-center ${color} group-hover:bg-emerald-600 group-hover:text-foreground transition-all`}>
                {icon}
            </div>
            <div className="relative z-10">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">{label}</div>
                <div className="text-xl font-black italic uppercase tracking-tight">{value}</div>
            </div>
        </div>
    );
}
