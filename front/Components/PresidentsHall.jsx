'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { zamalekPresidents } from '@/utils/data';
import { History, Shield, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
const PresidentsHall = () => {
    // Take a selection of notable presidents/legends
    const items = zamalekPresidents.slice(0, 6);

    return (
        <section className="py-32 bg-secondary text-foreground overflow-hidden relative" dir="rtl">
            {/* Artistic background element */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black italic select-none">
                    1911
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-b border-foreground/5 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <History size={20} />
                            <span className="text-sm font-black uppercase tracking-[0.4em]">سجل الخالدين</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black font-heading tracking-tighter">رؤساء <span className="text-primary italic">تاريخيون</span></h2>
                    </div>
                    <p className="max-w-md text-foreground/40 font-bold text-lg leading-relaxed">
                        من ميرزباخ إلى لبيب، تاريخ سطرته شخصيات عظيمة قادت سفينة الملكي عبر العصور لتظل راية الزمالك عالية.
                    </p>
                </div>

                {/* Horizontal Scroll / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((president, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-[32rem] rounded-[2.5rem] overflow-hidden border border-foreground/10"
                        >
                            <Image
                                src={president.img}
                                alt={president.name}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                            {/* Content */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <div className="space-y-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-2 text-primary">
                                        <Shield size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{president.term}</span>
                                    </div>
                                    <h3 className="text-3xl font-black font-heading leading-tight">{president.name}</h3>
                                    <p className="text-sm font-bold text-foreground/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500">
                                        {president.description}
                                    </p>
                                    <div className="pt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                        <div className="flex items-center gap-2">
                                            <Award size={16} className="text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">تاريخ الرئاسة</span>
                                        </div>
                                        <button className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                                            <ChevronLeft size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-foreground text-background font-black text-sm hover:bg-primary hover:text-foreground transition-all shadow-2xl shadow-black/20">
                        <Link href="/Pages/Presidents" className="flex items-center gap-6">
                            <span>إحصائيات رؤساء النادي (114 عام)</span>
                            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                                <ChevronLeft size={16} />
                            </div>
                        </Link>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PresidentsHall;
