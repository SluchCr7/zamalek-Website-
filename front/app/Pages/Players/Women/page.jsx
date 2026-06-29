'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Star, Shield, ArrowRight, Zap, Target, Bookmark, Download, MapPin, Calendar, Clock, ChevronRight, Activity, Heart } from 'lucide-react';
import { zamalekVolleyballWomen2025 } from '@/utils/data';

const achievements = [
    { title: "الدوري المصري للكرة الطائرة (سيدات)", count: 5, years: ["2023", "2024", "1980", "1981", "1982"] },
    { title: "كأس مصر للكرة الطائرة (سيدات)", count: 4, years: ["2023", "2024", "1978", "1979"] },
    { title: "دوري أبطال أفريقيا (سيدات)", count: 2, years: ["2023", "2024"] },
];

export default function WomenVolleyballPage() {
    const [activeTab, setActiveTab] = useState('Roster');
    const teams = zamalekVolleyballWomen2025.roster;
    const staff = zamalekVolleyballWomen2025.coachingStaff;

    const themeColor = "purple"; // Using purple as the theme color

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">

            {/* Cinematic Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 scale-110">
                    <Image
                        src="/squads/volly-min.png"
                        alt="كرة الطائرة سيدات نادي الزمالك"
                        fill
                        className="object-cover opacity-30 brightness-75 contrast-125"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center space-y-8 px-4 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                    >
                        <Heart size={14} fill="currentColor" />
                        <span>The Queen's Unit - Royal Volleyball 25/26</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl font-black font-heading tracking-tighter leading-none italic uppercase">
                        فـريـق <span className="text-purple-500">الـبـطـلات</span>
                    </h1>

                    <div className="flex flex-wrap justify-center gap-12 pt-12">
                        <div className="text-center">
                            <div className="text-5xl font-black font-heading text-purple-500 italic">5</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">League Titles</div>
                        </div>
                        <div className="w-px h-12 bg-border hidden md:block" />
                        <div className="text-center">
                            <div className="text-5xl font-black font-heading text-purple-500 italic">2</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">African Elite</div>
                        </div>
                        <div className="w-px h-12 bg-border hidden md:block" />
                        <div className="text-center">
                            <div className="text-5xl font-black font-heading text-purple-500 italic">4</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Cup Victories</div>
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
                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-purple-500 text-foreground shadow-xl shadow-purple-500/20' : 'hover:bg-muted opacity-40 hover:opacity-100'
                                }`}
                        >
                            {tab === 'Roster' ? 'قائمة الفتيات' : tab === 'Coaching' ? 'الجهاز الفني' : 'سجل الألقاب'}
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
                                            <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 italic">Force Unit Order {idx + 1}</span>
                                            <h2 className="text-4xl md:text-5xl font-black font-heading italic">{
                                                pos === 'setters' ? 'المعدات (Setters)' :
                                                    pos === 'opposites' ? 'المهاجمات (Opposites)' :
                                                        pos === 'outsideHitters' ? 'ضاربات الجناح (Outside Hitters)' :
                                                            pos === 'middleBlockers' ? 'حائط الصد (Middle Blockers)' :
                                                                pos === 'liberos' ? 'الليبرو (Liberos)' : 'لاعبات جوكر (Utility)'
                                            }</h2>
                                        </div>
                                    </header>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {players.map((player, pIdx) => (
                                            <div key={pIdx} className="group relative">
                                                <div className="absolute inset-0 bg-purple-500/10 rounded-[3rem] blur-[30px] opacity-0 group-hover:opacity-100 transition-all" />
                                                <div className="relative bg-card border border-border rounded-[3.5rem] p-10 shadow-2xl space-y-8 hover:border-purple-500 transition-all overflow-hidden bg-gradient-to-br from-card to-card hover:to-purple-500/[0.02]">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-3">
                                                            <h3 className="text-2xl font-black font-heading italic">{player.name}</h3>
                                                            <div className="flex flex-wrap gap-3">
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-purple-500">{player.nationality || "مصريـة"}</div>
                                                                {player.captain && <div className="text-[10px] font-black uppercase tracking-widest text-primary italic">CAPTAIN</div>}
                                                            </div>
                                                        </div>
                                                        <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center font-black text-xl text-purple-500/40">#{pIdx + 1}</div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {player.status && (
                                                            <div className="px-6 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 text-[10px] font-black uppercase tracking-widest text-purple-500 w-fit">
                                                                {player.status}
                                                            </div>
                                                        )}
                                                        {player.note && (
                                                            <p className="text-sm font-bold opacity-40 italic">
                                                                "{player.note}"
                                                            </p>
                                                        )}
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
                            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                        >
                            <div className="md:col-span-2 p-16 bg-card border border-border rounded-[4rem] text-center space-y-8 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-all" />
                                <div className="w-24 h-24 bg-purple-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl mb-6">
                                    <Shield className="text-foreground" size={32} />
                                </div>
                                <div className="space-y-3">
                                    <div className="text-purple-500 font-black text-xs uppercase tracking-[0.4em]">Head Technical Director</div>
                                    <h2 className="text-4xl font-black font-heading italic">{staff.headCoach}</h2>
                                    <p className="text-sm font-bold opacity-40 font-italic italic">Leading the Royal Queens to more glory.</p>
                                </div>
                            </div>

                            <InfoCard label="Assistant Coach" value="سيتم التحديث" icon={<Users />} color="text-purple-500" />
                            <InfoCard label="Team Manager" value="نيرمين بدوي" icon={<Target />} color="text-purple-500" />
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
                                <div key={idx} className="bg-card border border-border rounded-[4rem] p-16 shadow-2xl space-y-12 group hover:border-purple-500 transition-all relative overflow-hidden">
                                    <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-500/5 rounded-full group-hover:scale-110 transition-transform" />
                                    <header className="flex justify-between items-start">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black font-heading italic leading-tight max-w-[80%]">{ach.title}</h3>
                                            <div className="h-1.5 w-16 bg-purple-500 rounded-full" />
                                        </div>
                                        <Trophy className="text-purple-500" size={40} />
                                    </header>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                                            <span>سجل التتويج</span>
                                            <span>{ach.count} ألقاب</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-right">
                                            {ach.years.map(y => (
                                                <span key={y} className="px-4 py-2 bg-muted rounded-xl text-xs font-bold border border-border group-hover:bg-purple-500/10 group-hover:border-purple-500 transition-all">{y}</span>
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
        <div className="p-12 bg-card border border-border rounded-[3rem] shadow-xl flex items-center gap-8 group hover:border-purple-500 transition-all">
            <div className={`w-16 h-16 rounded-2xl bg-muted flex items-center justify-center ${color} group-hover:bg-purple-500 group-hover:text-foreground transition-all`}>
                {icon}
            </div>
            <div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{label}</div>
                <div className="text-xl font-black italic">{value}</div>
            </div>
        </div>
    );
}
