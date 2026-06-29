'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
const PartnershipAd = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-32 group">
            {/* Background with Parallax Scale */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/zamalekNikePartnership.jpg"
                    alt="Zamalek X Nike Partnership"
                    fill
                    className="object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-[3000ms]"
                    priority
                />
                {/* Advanced Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/20" />
            </motion.div>

            {/* Decorative Brand Lines */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

            {/* Main Content Container */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-12">

                    {/* Partnership Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-xl text-foreground text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl"
                    >
                        <ShieldCheck size={16} className="text-secondary" />
                        <span>The Official 2025 Era</span>
                    </motion.div>

                    {/* Typography Masterpiece */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-6"
                        >
                            <h2 className="text-5xl md:text-9xl font-black font-heading tracking-tighter leading-none italic uppercase text-foreground">
                                ZAMALEK <span className="text-primary italic">X</span> NIKE
                            </h2>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-lg md:text-3xl font-bold text-foreground/40 tracking-[0.3em] uppercase italic"
                        >
                            Unity • Strength • Heritage
                        </motion.p>
                    </div>

                    {/* Logo Fusion Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-12 md:gap-24"
                    >
                        <div className="relative w-24 h-24 md:w-32 md:h-32 group-hover:scale-110 transition-transform duration-700">
                            <Image src="/zsc.png" alt="Zamalek" fill className="object-contain" />
                        </div>
                        <div className="h-20 w-px bg-foreground/10 rotate-[20deg]" />
                        <div className="relative w-32 h-16 md:w-48 md:h-24 group-hover:scale-110 transition-transform duration-700">
                            <Image src="/nike.png" alt="Nike" fill className="object-contain brightness-0 invert" />
                        </div>
                    </motion.div>

                    {/* Call to Action Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center gap-12 pt-12"
                    >
                        <Link href="/Pages/Store" className="flex flex-col items-center gap-4 text-center group/btn focus-visible:outline-none">
                            <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/20 hover:scale-110 group-focus-within/btn:scale-110 group-focus-within/btn:ring-2 group-focus-within/btn:ring-primary transition-transform cursor-pointer">
                                <ShoppingBag size={24} />
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-black uppercase tracking-widest text-foreground italic group-hover/btn:text-primary transition-colors">Shop the Collection</div>
                                <div className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest leading-none">Official 2025 Kits Available</div>
                            </div>
                        </Link>

                        <Link href="/Pages/Store" className="flex flex-col items-center gap-4 text-center group/btn focus-visible:outline-none">
                            <div className="w-16 h-16 rounded-3xl bg-secondary text-foreground flex items-center justify-center shadow-2xl shadow-secondary/20 hover:scale-110 group-focus-within/btn:scale-110 group-focus-within/btn:ring-2 group-focus-within/btn:ring-white transition-transform cursor-pointer">
                                <Zap size={24} />
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-black uppercase tracking-widest text-foreground italic group-hover/btn:text-primary transition-colors">Athletic Tech</div>
                                <div className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest leading-none">Engineered for Flight</div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Decorative Bottom Tag */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        viewport={{ once: true }}
                        className="pt-24 opacity-20 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] text-foreground"
                    >
                        <Star size={12} fill="currentColor" />
                        <span>Zamalek Sporting Club Official Global Partner</span>
                        <Star size={12} fill="currentColor" />
                    </motion.div>
                </div>
            </div>

            {/* Background Glare Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
        </section >
    );
};

export default PartnershipAd;
