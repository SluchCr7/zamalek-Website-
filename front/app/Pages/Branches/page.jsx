'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Shield, Building2, Construction, ArrowRight, Star, Globe, Navigation } from 'lucide-react';
import TitleSection from '@/Components/TitleSection';

const zamalekBuildings = [
  {
    name: "الفرع الرئيسي",
    address: "شارع جامعة الدول العربية، حي ميت عقبة، المهندسين، الجيزة، مصر",
    img: "/زمالك ميت عقبه.jpg",
    type: "Historic Headquarters",
    description:
      "مقر نادي الزمالك التاريخي في ميت عقبة بالمهندسين، يضم ملاعب كرة القدم، ملاعب بطولة مثل حلمي زامورا، ويُعد القلب النابض لجميع أنشطة النادي منذ عقود. يقع على شارع جامعة الدول العربية، ويتميز بتراثه العريق وكونه رمزاً معترفاً به لجماهير القلعة البيضاء.",
    features: ["تاريخ عريق", "مجمع حمامات سباحة", "صالات مغطاة", "مبنى اجتماعي"]
  },
  {
    name: "فرع 6 أكتوبر",
    address: "مدينة 6 أكتوبر، محافظة الجيزة، مصر",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop",
    status: "قيد الإنشاء",
    type: "Sports City",
    description:
      "فرع نادي الزمالك الجديد بمدينة 6 أكتوبر على مساحة حوالي 129 فدانًا، يتم تطويره ليصبح مدينة رياضية متكاملة تشمل ملاعب للناشئين والفريق الأول، ومناطق للألعاب الجماعية. المرحلة الأولى تهدف إلى إنشاء ملاعب خارجية ومستشفى رياضي ومول تجاري.",
    features: ["استاد دولي", "مول تجاري", "فنادق إقامة", "مستشفى رياضي"]
  },
];

export default function BranchesPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground" dir="rtl">

      {/* Hero: Architectural Elegance */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Zamalek Architecture"
            fill
            className="object-cover opacity-20 grayscale brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <Building2 size={14} />
            <span>منشآت وصروح القلعة البيضاء</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black font-heading tracking-tighter"
          >
            صروح <span className="text-primary italic">الزمالك</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-bold opacity-40 max-w-3xl mx-auto"
          >
            نستثمر في المستقبل لبناء بنية تحتية تليق بعظمة ومكانة نادي الزمالك العالمية.
          </motion.p>
        </div>
      </section>

      {/* Main Branches Showcase */}
      <section className="container mx-auto px-4 py-32 space-y-32">
        {zamalekBuildings.map((branch, idx) => (
          <BranchRow key={idx} branch={branch} index={idx} />
        ))}
      </section>

    </div>
  );
}

function BranchRow({ branch, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

      {/* Visual Side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-1/2 relative group"
      >
        <div className="absolute inset-x-[-20px] inset-y-[-20px] bg-primary/10 rounded-[4rem] group-hover:inset-x-[-10px] group-hover:inset-y-[-10px] transition-all -z-10" />

        <div className="relative h-[500px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl border border-border">
          <Image
            src={branch.img || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop"}
            alt={branch.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-10 right-10 flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-foreground/10 backdrop-blur-xl border border-foreground/20 flex items-center justify-center text-foreground cursor-pointer hover:bg-primary transition-all">
              <Navigation size={24} />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-foreground/10 backdrop-blur-xl border border-foreground/20 flex items-center justify-center text-foreground cursor-pointer hover:bg-primary transition-all">
              <Globe size={24} />
            </div>
          </div>

          {branch.status && (
            <div className="absolute top-10 right-10 flex items-center gap-3 px-6 py-2 bg-primary/90 text-foreground rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
              <Construction size={14} className="animate-pulse" />
              <span>{branch.status}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Content Side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:w-1/2 space-y-10"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-primary font-black text-xs uppercase tracking-widest">
            <Shield size={16} />
            <span>{branch.type}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-heading leading-tight">{branch.name}</h2>
          <div className="flex items-center gap-3 text-sm font-bold opacity-40">
            <MapPin size={18} className="text-primary" />
            <span>{branch.address}</span>
          </div>
        </div>

        <p className="text-lg font-bold opacity-60 leading-relaxed max-w-xl">
          {branch.description}
        </p>

        <div className="grid grid-cols-2 gap-6">
          {branch.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-4 group cursor-default">
              <div className="w-3 h-3 rounded-full bg-primary/20 group-hover:bg-primary transition-all" />
              <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all">{feature}</span>
            </div>
          ))}
        </div>

        <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-primary group pt-10">
          <span>Explore Project Details</span>
          <ArrowRight size={18} className="group-hover:translate-x-[-10px] transition-transform" />
        </button>
      </motion.div>

    </div>
  );
}
