'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, Users, Zap, Star, Shield, ArrowRight, Activity, Flame, Heart } from 'lucide-react';

const sports = [
    {
        id: 'football',
        name: 'كرة القدم',
        title: 'Football',
        path: '/Pages/Players/Football',
        img: '/squads/football-min.png',
        icon: <Zap size={24} />,
        color: 'from-red-600 to-red-800',
        description: 'فريق كرة القدم الأول - ملوك الفن والهندسة.',
        stats: { players: '32', titles: '79' }
    },
    {
        id: 'basketball',
        name: 'كرة السلة',
        title: 'Basketball',
        path: '/Pages/Players/Basketball',
        img: '/squads/basket-min.png',
        icon: <Star size={24} />,
        color: 'from-orange-600 to-orange-800',
        description: 'فريق العمالقة - ملوك الصالات العالمية.',
        stats: { players: '16', titles: '45' }
    },
    {
        id: 'handball',
        name: 'كرة اليد',
        title: 'Handball',
        path: '/Pages/Players/Handball',
        img: '/squads/handball-min.png',
        icon: <Shield size={24} />,
        color: 'from-emerald-600 to-emerald-800',
        description: 'فريق الكوماندوز - أسياد القارة الأفريقية.',
        stats: { players: '22', titles: '65' }
    },
    {
        id: 'volleyball',
        name: 'الكرة الطائرة',
        title: 'Volleyball',
        path: '/Pages/Players/Volleyball',
        img: '/squads/vollyzsc.png',
        icon: <Activity size={24} />,
        color: 'from-blue-600 to-blue-800',
        description: 'فريق الأحلام - عودة ملوك الطائرة لمنصات التتويج.',
        stats: { players: '18', titles: '42' }
    },
    {
        id: 'women',
        name: 'كرة الطائرة (سيدات)',
        title: 'Women Volleyball',
        path: '/Pages/Players/Women',
        img: '/squads/volly-min.png',
        icon: <Heart size={24} />,
        color: 'from-purple-600 to-purple-800',
        description: 'فريق البطولات - صقور ميت عقبة في صالات القارة.',
        stats: { players: '15', titles: '11' }
    }
];

export default function SportsSelectionPage() {
    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">

            {/* Cinematic Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 scale-110">
                    <Image
                        src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop"
                        alt="خلفية الألعاب الرياضية"
                        fill
                        className="object-cover opacity-20 grayscale brightness-50 contrast-125"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.4em] mb-4"
                    >
                        <Flame size={16} fill="currentColor" />
                        <span>The Royal Sporting Units</span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-9xl font-black font-heading tracking-tighter leading-none italic uppercase"
                        >
                            فـرق <span className="text-primary italic">الـمـلـوك</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-3xl font-bold opacity-40 leading-relaxed max-w-3xl mx-auto italic"
                        >
                            اختر اللعبة الرياضية لتصفح القائمة الرسمية للاعبين، الأجهزة الفنية، وتاريخ البطولات.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Sports Grid */}
            <section className="container mx-auto px-4 py-32 -mt-32 relative z-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sports.map((sport, idx) => (
                        <motion.div
                            key={sport.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <Link href={sport.path} className="block focus-visible:outline-none rounded-[3.5rem] group-focus-within:ring-2 group-focus-within:ring-primary">
                                <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[30px] opacity-0 group-hover:opacity-100 transition-all duration-700" />

                                <div className="relative bg-card border border-border rounded-[3.5rem] overflow-hidden flex flex-col h-full shadow-2xl transition-all duration-700 group-hover:-translate-y-4">
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={sport.img}
                                            alt={sport.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                        {/* Mini Stat Badges */}
                                        <div className="absolute top-8 right-8 flex flex-col gap-3">
                                            <div className="p-4 bg-foreground/10 backdrop-blur-3xl border border-foreground/20 rounded-2xl text-white text-center">
                                                <div className="text-xl font-black">{sport.stats.titles}</div>
                                                <div className="text-[7px] font-black uppercase">Titles</div>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-8 inset-x-8">
                                            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                                                {sport.icon}
                                            </div>
                                            <h3 className="text-3xl font-black font-heading text-white italic mb-2">{sport.name}</h3>
                                            <p className="text-xs font-bold text-white/70 line-clamp-2">{sport.description}</p>
                                        </div>
                                    </div>

                                    <div className="p-10 border-t border-border bg-card flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest opacity-40">
                                            <Users size={14} className="text-primary" />
                                            <span>{sport.stats.players} Active Members</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                            <ArrowRight size={18} className="rotate-180" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Decorative Brand Section */}
            <section className="py-32 border-t border-border overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                        <div className="space-y-8 max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tight italic uppercase leading-none">
                                نـحـن <span className="text-primary">الـبـدايـة</span> <br /> والـريادة الـدائـمـة
                            </h2>
                            <p className="text-lg font-bold opacity-60 leading-relaxed italic">
                                أكثر من مجرد نادي كرة قدم، الزمالك هو مدرسة كبرى للألعاب الرياضية، حيث نحصد البطولات في كافة الصالات والميادين منذ أكثر من قرن.
                            </p>
                            <div className="flex gap-12">
                                <div className="space-y-1">
                                    <div className="text-3xl font-black font-heading text-primary">22+</div>
                                    <div className="text-[9px] font-black uppercase tracking-widest opacity-40 italic">Sport Disciplines</div>
                                </div>
                                <div className="space-y-1 border-r border-border pr-12">
                                    <div className="text-3xl font-black font-heading text-primary">1000+</div>
                                    <div className="text-[9px] font-black uppercase tracking-widest opacity-40 italic">Athlete Warriors</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative w-80 h-80 opacity-10">
                            <Image src="/zsc.png" alt="Zamalek" fill className="object-contain" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
