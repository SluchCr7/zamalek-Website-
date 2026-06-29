'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowUpRight, Crown, ShieldAlert } from 'lucide-react';

const AdsComponent = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-foreground/5 border-b" dir="rtl">
      {/* Cinematic Glowing Backgrounds */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Ribbon */}
        <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.3em] text-xs mb-10 w-full justify-center opacity-60">
          <div className="h-px w-16 bg-foreground/10" />
          <ShieldAlert size={16} />
          <span>إعلانات النادي الرسمية</span>
          <div className="h-px w-16 bg-foreground/10" />        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Ad 1: Official Store */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/Pages/Store" 
              className="group relative block w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-[#0A0A0A] border border-foreground/5 hover:border-primary/50 transition-all duration-700 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(227,27,35,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src="/ads/ad_store.jpg" 
                  alt="إعلان متجر نادي الزمالك الرسمي" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100 saturate-150"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Complex Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all duration-700" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-primary/0 transition-all duration-700" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                {/* Top Badge */}
                <div className="self-end px-5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-foreground/20 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                  <ShoppingBag size={14} />
                  ZSC STORE
                </div>

                {/* Bottom Text */}
                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-5xl md:text-6xl font-black font-heading text-white italic tracking-tighter leading-[0.9] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                    قميص <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-red-500">البطـل</span>
                  </h3>
                  <p className="text-white/70 font-bold max-w-sm border-r-2 border-primary pr-4">
                    اكتشف التشكيلة الجديدة من أطقم المباريات وملابس التمرين الرسمية لنادي الزمالك.
                  </p>
                  
                  <div className="inline-flex items-center gap-3 pt-4 text-primary group-hover:text-white transition-colors font-black text-lg">
                    تسوق الآن 
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-all -rotate-45 group-hover:rotate-0">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Ad 2: VIP Membership */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link 
              href="/Pages/Membership" 
              className="group relative block w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-[#0A0A0A] border border-foreground/5 hover:border-yellow-500/50 transition-all duration-700 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(234,179,8,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
            >
              
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src="/naserHead.jpg" 
                  alt="إعلان العضوية الشرفية لنادي الزمالك" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 filter grayscale-[0.2] contrast-125 saturate-150"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Complex Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-background/30 transition-all duration-700" />
                <div className="absolute inset-0 bg-orange-900/40 mix-blend-color-burn group-hover:opacity-10 transition-all duration-700" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                {/* Top Badge */}
                <div className="self-end px-5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-foreground/20 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:bg-yellow-600 group-hover:border-yellow-500 transition-all duration-500">
                  <Crown size={14} />
                  MEMBERSHIP
                </div>

                {/* Bottom Text */}
                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-5xl md:text-6xl font-black font-heading text-white italic tracking-tighter leading-[0.9] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                    عضـويـة <span className="text-transparent bg-clip-text bg-gradient-to-l from-yellow-300 to-yellow-600">V.I.P</span>
                  </h3>
                  <p className="text-white/70 font-bold max-w-sm border-r-2 border-yellow-500 pr-4">
                    انضم لأسرة نادي الزمالك، بوابتك للعديد من المميزات الحصرية والمقاعد الشرفية في استاد القاهرة الدولى.
                  </p>
                  
                  <div className="inline-flex items-center gap-3 pt-4 text-yellow-500 group-hover:text-yellow-400 transition-colors font-black text-lg">
                    انضم الآن
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500 transition-all -rotate-45 group-hover:rotate-0">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
      </div>
    </section>
  );
};

export default AdsComponent;
