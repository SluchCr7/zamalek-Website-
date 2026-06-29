'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Tv, Youtube, Play, Users, Calendar, Radio, ExternalLink, Info, Clock, Heart,
    ChevronLeft, ChevronRight, ShieldCheck, Signal, Satellite, TvMinimal, Sparkles,
    Mic2, Award, History, Building2, Loader2
} from 'lucide-react'
import { zamalekChannelData } from '@/utils/data'

export default function ZamalekTVPage() {
    const [activeVideo, setActiveVideo] = useState(null);
    const [selectedPresenter, setSelectedPresenter] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch YouTube videos
    useEffect(() => {
        const fetchYouTubeVideos = async () => {
            try {
                setLoading(true);
                // Extract channel ID from YouTube URL
                const channelUsername = '@ZamalekTV';

                // For demo purposes, using static video IDs
                // In production, you would use YouTube Data API v3
                const demoVideos = [
                    { id: 'vDREgA7C_6Y', title: 'أهداف الزمالك في السوبر الإفريقي 2024' },
                    { id: 'Lg2eBfM2Lw4', title: 'احتفالات جماهير الزمالك التاريخية' },
                    { id: 'j57C74b_C_w', title: 'أجمل أهداف شيكابالا في القمة' },
                    { id: 'dQw4w9WgXcQ', title: 'نشيد نادي الزمالك الرسمي' },
                    { id: 'vDREgA7C_6Y', title: 'تحليل مباراة الزمالك الأخيرة' },
                    { id: 'Lg2eBfM2Lw4', title: 'كواليس تدريبات الفريق الأول' },
                ];

                setVideos(demoVideos);
                setActiveVideo(demoVideos[0]);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchYouTubeVideos();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div dir="rtl" className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden w-full">

            {/* Premium Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[200px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/5 rounded-full blur-[180px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.03]" />
            </div>

            <main className="relative z-10">

                {/* HERO SECTION - Enhanced */}
                <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-border">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-80" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-12">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/20"
                        >
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary shadow-[0_0_20px_var(--color-primary)]"></span>
                            </span>
                            <span className="text-primary font-black tracking-[0.3em] text-sm uppercase">ON AIR LIVE</span>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none"
                            >
                                {zamalekChannelData.name}
                            </motion.h1>

                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl md:text-4xl text-muted-foreground max-w-4xl mx-auto font-bold"
                            >
                                {zamalekChannelData.identity.slogan}
                            </motion.p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
                            <Link href={zamalekChannelData.link} target="_blank">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(227,27,35,0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-5 rounded-3xl bg-gradient-to-r from-primary to-red-600 text-foreground font-black flex items-center gap-4 shadow-2xl shadow-primary/30 transition-all group overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/20 to-foreground/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                    <Youtube className="w-6 h-6 relative z-10" />
                                    <span className="text-xl relative z-10">مشاهدة القناة</span>
                                </motion.button>
                            </Link>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 rounded-3xl bg-muted/50 backdrop-blur-xl border border-border text-foreground font-black flex items-center gap-4 transition-all hover:border-primary/50"
                            >
                                <Satellite className="w-6 h-6" />
                                <span className="text-xl">تفاصيل البث</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Broadcast Info Ticker */}
                    <div className="absolute bottom-0 left-0 w-full bg-primary/95 backdrop-blur-xl py-6 overflow-hidden border-t border-foreground/10 shadow-2xl">
                        <div className="flex whitespace-nowrap animate-scroll items-center gap-20 text-foreground font-black text-xs uppercase tracking-[0.2em]">
                            {[...Array(10)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <span className="flex items-center gap-3"><Satellite size={16} /> {zamalekChannelData.broadcastDetails.satellite}</span>
                                    <span className="flex items-center gap-3 opacity-60"><Signal size={16} /> {zamalekChannelData.broadcastDetails.frequency} {zamalekChannelData.broadcastDetails.polarization}</span>
                                    <span className="flex items-center gap-3"><ShieldCheck size={16} /> {zamalekChannelData.broadcastDetails.quality}</span>
                                    <span className="flex items-center gap-3 opacity-60"><Heart size={16} /> صوت القلعة البيضاء</span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Channel Identity & History */}
                <section className="py-32 max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-3 text-primary font-black mb-6 text-xs tracking-[0.4em] uppercase py-3 px-6 bg-primary/5 rounded-full border border-primary/10">
                                <History className="w-4 h-4" />
                                CHANNEL HISTORY
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
                                تاريخ <span className="text-primary">القناة</span>
                            </h2>

                            <div className="space-y-6">
                                <div className="p-6 rounded-3xl bg-muted/50 border border-border">
                                    <h4 className="text-sm font-black text-primary uppercase tracking-wider mb-2">الانطلاق التجريبي</h4>
                                    <p className="text-2xl font-black">{zamalekChannelData.history.experimentalLaunch}</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-muted/50 border border-border">
                                    <h4 className="text-sm font-black text-primary uppercase tracking-wider mb-2">الانطلاق الرسمي</h4>
                                    <p className="text-2xl font-black">{zamalekChannelData.history.officialLaunch}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6">
                                <h4 className="text-lg font-black text-muted-foreground uppercase tracking-wider">المحطات الرئيسية</h4>
                                {zamalekChannelData.history.keyMilestones.map((milestone, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ x: -20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p className="text-lg font-medium text-muted-foreground">{milestone}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="p-10 rounded-[4rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 backdrop-blur-xl">
                                <Building2 className="w-16 h-16 text-primary mb-6" />
                                <h3 className="text-3xl font-black mb-4">المالك والمشغل</h3>
                                <p className="text-xl text-muted-foreground leading-relaxed">{zamalekChannelData.identity.owner}</p>
                            </div>

                            <div className="p-10 rounded-[4rem] bg-gradient-to-br from-muted/50 to-transparent border border-border backdrop-blur-xl">
                                <Sparkles className="w-16 h-16 text-primary mb-6" />
                                <h3 className="text-3xl font-black mb-4">المقر الرئيسي</h3>
                                <p className="text-xl text-muted-foreground leading-relaxed">{zamalekChannelData.identity.headquarters}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 text-center">
                                    <Satellite className="w-10 h-10 text-primary mx-auto mb-3" />
                                    <p className="text-sm font-black text-muted-foreground mb-1">التردد</p>
                                    <p className="text-2xl font-black">{zamalekChannelData.broadcastDetails.frequency}</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 text-center">
                                    <Signal className="w-10 h-10 text-primary mx-auto mb-3" />
                                    <p className="text-sm font-black text-muted-foreground mb-1">معدل الترميز</p>
                                    <p className="text-2xl font-black">{zamalekChannelData.broadcastDetails.symbolRate}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Video Gallery - YouTube Integration */}
                <section className="py-32 bg-muted/30 border-y border-border relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                            <div className="space-y-4">
                                <h2 className="text-6xl font-black tracking-tighter flex items-center gap-6">
                                    <Youtube size={64} className="text-[#FF0000]" />
                                    أحدث الفيديوهات
                                </h2>
                                <p className="text-2xl text-muted-foreground font-medium opacity-60">من القناة الرسمية على يوتيوب</p>
                            </div>
                            <Link href={zamalekChannelData.link} target="_blank" className="px-10 py-4 rounded-2xl bg-primary text-foreground font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/30 transition-all">
                                مشاهدة المزيد
                            </Link>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-32">
                                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {/* Featured Player */}
                                <div className="lg:col-span-2 space-y-8 group">
                                    {activeVideo && (
                                        <>
                                            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-black border border-border transition-transform duration-700 group-hover:scale-[1.01]">
                                                <iframe
                                                    className="w-full h-full"
                                                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&modestbranding=1&rel=0`}
                                                    title={activeVideo.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <div className="p-10 rounded-[3rem] bg-card border border-border shadow-xl">
                                                <h3 className="text-3xl font-black mb-4">{activeVideo.title}</h3>
                                                <div className="flex items-center gap-8 text-muted-foreground font-bold">
                                                    <span className="flex items-center gap-3"><Play size={18} className="text-primary" /> Zamalek TV</span>
                                                    <span className="flex items-center gap-3"><Clock size={18} className="text-primary" /> ديسمبر 2025</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Playlist */}
                                <div className="space-y-6">
                                    <h4 className="text-xs font-black uppercase tracking-[0.5em] text-primary opacity-60 px-4">قائمة التشغيل</h4>
                                    <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                                        {videos.map((vid) => (
                                            <div
                                                key={vid.id}
                                                onClick={() => setActiveVideo(vid)}
                                                className={`p-5 rounded-2xl cursor-pointer transition-all duration-500 border ${activeVideo?.id === vid.id ? 'bg-primary/10 border-primary shadow-xl shadow-primary/10' : 'bg-card border-transparent hover:border-primary/40'}`}
                                            >
                                                <div className="flex gap-4">
                                                    <div className="relative w-28 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                                                        <Image
                                                            src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`}
                                                            alt={vid.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className={`absolute inset-0 bg-primary/20 transition-opacity duration-500 ${activeVideo?.id === vid.id ? 'opacity-100' : 'opacity-0'}`} />
                                                    </div>
                                                    <div className="flex flex-col justify-center gap-2">
                                                        <h5 className={`font-black text-sm line-clamp-2 leading-tight ${activeVideo?.id === vid.id ? 'text-primary' : ''}`}>{vid.title}</h5>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Zamalek TV</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Programs Section - Updated */}
                <section className="py-32 max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-6 mb-20">
                        <div className="w-20 h-20 rounded-3xl bg-primary text-foreground flex items-center justify-center shadow-2xl shadow-primary/30">
                            <TvMinimal className="w-10 h-10" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                            خريطة <span className="text-primary">البرامج</span> الحالية
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {zamalekChannelData.programming_Update_Dec_2025.mainPrograms.map((program, idx) => (
                            <motion.div
                                key={program.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="p-10 rounded-[3.5rem] bg-card border border-border shadow-xl hover:border-primary/40 transition-all relative overflow-hidden group"
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-3xl font-black">{program.title}</h3>
                                        {program.timing && (
                                            <div className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-black whitespace-nowrap">
                                                {program.timing}
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {program.description}
                                    </p>

                                    <div className="pt-4 border-t border-border">
                                        <p className="text-sm font-black text-muted-foreground mb-3">المقدمون:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {program.presenters.map((presenter, i) => (
                                                <span key={i} className="px-4 py-2 rounded-full bg-muted text-sm font-bold">
                                                    {presenter}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Retired Presenters */}
                    <div className="mt-16 p-8 rounded-3xl bg-muted/50 border border-border">
                        <h4 className="text-lg font-black text-muted-foreground mb-4 flex items-center gap-3">
                            <Award className="w-5 h-5" />
                            مقدمون سابقون وأساطير القناة
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {zamalekChannelData.programming_Update_Dec_2025.retiredOrOldPresenters.map((presenter, i) => (
                                <span key={i} className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium">
                                    {presenter}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-32 px-6 flex justify-center">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-6xl w-full p-20 md:p-32 rounded-[6rem] bg-gradient-to-br from-primary to-red-600 text-foreground text-center relative overflow-hidden shadow-[0_60px_120px_rgba(227,27,35,0.3)]"
                    >
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />
                        <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] bg-foreground/10 rounded-full blur-[180px]" />

                        <div className="relative z-10 space-y-12">
                            <Youtube className="w-24 h-24 mx-auto mb-10 animate-pulse" />
                            <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-none">
                                انضم لملايين <br /> <span className="opacity-80">المشتركين</span>
                            </h2>
                            <p className="text-2xl md:text-3xl opacity-80 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                                كن أول من يشاهد الكواليس الحصرية وتدريبات الفريق الأول عبر اشتراكك في قناتنا الرسمية.
                            </p>
                            <Link
                                href={zamalekChannelData.link}
                                target="_blank"
                                className="inline-flex items-center gap-6 px-16 py-8 rounded-[3rem] bg-foreground text-primary font-black text-2xl hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] transition-all hover:-translate-y-2 active:scale-95 shadow-2xl"
                            >
                                اشترك الآن في القناة
                                <ExternalLink size={28} />
                            </Link>
                        </div>
                    </motion.div>
                </section>

            </main>

            <style jsx global>{`
                @keyframes scroll {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(227, 27, 35, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(227, 27, 35, 0.6);
                }
            `}</style>
        </div>
    )
}
