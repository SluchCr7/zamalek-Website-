'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Trophy, Activity, ArrowUpRight, Dumbbell, Target, Hexagon } from 'lucide-react';
import { CiBasketball } from "react-icons/ci";
import { FaVolleyballBall } from "react-icons/fa";

const teams = [
  {
    id: 1,
    title: "كرة القدم",
    subtitle: "الفريق الأول (رجال)",
    img: "/squads/foot-min.png",
    category: "The Royals",
    link: "/Pages/Players/Football",
    icon: Dumbbell,
    color: "from-red-600 via-red-900 to-black"
  },
  {
    id: 3,
    title: "كرة السلة",
    subtitle: "ملوك الصالات",
    img: "/squads/basket-min.png",
    category: "Basketball",
    link: "/Pages/Players/Basketball",
    icon: CiBasketball,
    color: "from-orange-500 via-orange-800 to-black"
  },
  {
    id: 4,
    title: "الكرة الطائرة",
    subtitle: "أسياد الشبكة",
    img: "/squads/volly-min.png",
    category: "Volleyball",
    link: "/Pages/Players/Volleyball",
    icon: FaVolleyballBall,
    color: "from-blue-500 via-blue-900 to-black"
  },
  {
    id: 6,
    title: "كرة اليد",
    subtitle: "كوماندوز اليد",
    img: "/squads/hand-min.png",
    category: "Handball",
    link: "/Pages/Players/Handball",
    icon: Target,
    color: "from-purple-500 via-purple-900 to-black"
  },
  {
    id: 2,
    title: "سيدات القدم",
    subtitle: "فريق السيدات",
    img: "/squads/football-min.png",
    category: "Women's Team",
    link: "/Pages/Players/Women",
    icon: Users,
    color: "from-pink-500 via-pink-900 to-black"
  },
  {
    id: 5,
    title: "سيدات الطائرة",
    subtitle: "فتيات الذهب",
    img: "/squads/vollyzsc.png",
    category: "Women's Team",
    link: "/Pages/Players/Women",
    icon: FaVolleyballBall,
    color: "from-yellow-500 via-yellow-900 to-black"
  },
  {
    id: 7,
    title: "سيدات اليد",
    subtitle: "بطلات الصالات",
    img: "/squads/handball-min.png",
    category: "Women's Team",
    link: "/Pages/Players/Women",
    icon: Target,
    color: "from-teal-500 via-teal-900 to-black"
  },
];

export default function TeamsSlider() {
  // Default to the first team hovered
  const [hovered, setHovered] = useState(teams[0].id);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background" dir="rtl">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      {/* Zamalek decorative lines */}
      <div className="absolute left-0 top-0 w-2 h-full flex flex-row">
        <div className="h-full w-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        <div className="h-full w-1/2 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 max-w-2xl"
          >
            <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.3em] text-xs">
              <Hexagon size={14} className="animate-spin-slow" />
              <span>القطاع الرياضي</span>
              <div className="h-px w-12 bg-primary/50" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tighter italic leading-[1.1] text-foreground">
              أبطـال <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-red-500">الـتـاريـخ</span>
            </h2>
            <p className="text-lg text-foreground/50 font-bold max-w-xl border-r-4 border-primary pl-6 py-2 bg-gradient-to-l from-foreground/5 to-transparent">
              استكشف فرق النادي الملكي العريقة. أبطال يسطرون التاريخ في كل لعبة، وجمهور لا يقبل إلا بالمركز الأول ليكون الذهب هو خيارنا الوحيد.
            </p>
          </motion.div>

          {/* Decorative Stats */}
          <div className="hidden lg:flex items-center gap-12 text-foreground/30">
            <div className="text-center group hover:text-primary transition-colors">
              <div className="text-5xl font-black font-heading">7+</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold mt-1">Teams</div>
            </div>
            <div className="w-px h-16 bg-foreground/10" />
            <div className="text-center group hover:text-primary transition-colors">
              <div className="text-5xl font-black font-heading">150+</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold mt-1">Trophies</div>
            </div>
          </div>
        </div>

        {/* Accordion Layout Grid */}
        <div className="flex flex-col md:flex-row h-[700px] w-full gap-3 md:gap-4 overflow-hidden">
          {teams.map((team) => (
            <TeamAccordionCard
              key={team.id}
              team={team}
              isHovered={hovered === team.id}
              setHovered={setHovered}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function TeamAccordionCard({ team, isHovered, setHovered }) {
  const Icon = team.icon;

  return (
    <motion.div
      onHoverStart={() => setHovered(team.id)}
      onClick={() => setHovered(team.id)}
      animate={{
        flex: isHovered ? 5 : 1,
      }}
      transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
      className={`relative h-full rounded-3xl overflow-hidden cursor-pointer group bg-black border ${isHovered ? 'border-primary/50 shadow-[0_0_30px_rgba(227,27,35,0.2)]' : 'border-foreground/10'} focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary`}
    >
      <Link 
        href={team.link} 
        className="block w-full h-full focus-visible:outline-none"
        onFocus={() => setHovered(team.id)}
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 h-full w-[800px] md:w-full">
          <Image
            src={team.img}
            alt={team.title}
            fill
            className={`object-cover transition-all duration-[1.5s] ${isHovered ? 'scale-105 filter-none opacity-100' : 'scale-100 grayscale brightness-50 opacity-40'}`}
          />
          {/* Gradient Overlay based on Team Color */}
          <div className={`absolute inset-0 bg-gradient-to-t ${team.color} mix-blend-multiply transition-opacity duration-1000 ${isHovered ? 'opacity-80' : 'opacity-20'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
          
          <div className="relative w-full h-full flex flex-col justify-end">
            {/* Top Indicator / Category Badge (Shows when expanded) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-0 right-0"
                >
                  <div className="px-4 py-2 bg-foreground/10 backdrop-blur-xl border border-foreground/20 rounded-xl text-foreground text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <Icon size={14} className="text-primary" />
                    <span>{team.category}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-end justify-between w-full h-full">
              {/* Titles - Vertical when collapsed, Horizontal/Normal when expanded */}
              <div className={`h-full flex ${isHovered ? 'flex-col justify-end whitespace-normal' : 'flex-col justify-end items-center whitespace-nowrap'}`}>
                {/* Collapsed Vertical Title */}
                <span className={`block md:hidden sm:hidden absolute bottom-8 right-1/2 translate-x-1/2 text-2xl font-black text-foreground/50 -rotate-90 origin-bottom transition-all duration-500 ${isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                   {team.title}
                </span>
                
                <span className={`hidden md:block absolute bottom-12 right-1/2 translate-x-1/2 text-3xl font-black text-foreground/50 -rotate-90 origin-center tracking-widest transition-all duration-500 ${isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                   {team.title}
                </span>

                {/* Expanded Title */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ duration: 0.4 }}
                  className={`${isHovered ? 'block' : 'hidden'}`}
                >
                  <h3 className="text-4xl md:text-5xl font-black font-heading text-foreground italic tracking-tight leading-none mb-3 drop-shadow-xl w-[300px]">
                    {team.title}
                  </h3>
                  <p className="text-base text-foreground/70 font-bold border-r-2 border-primary pr-3">
                    {team.subtitle}
                  </p>
                </motion.div>
              </div>

              {/* Action Button */}
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`w-14 h-14 rounded-full bg-primary flex items-center justify-center text-foreground shrink-0 group-hover:scale-110 transition-transform ${isHovered ? 'block' : 'hidden md:hidden'}`}
              >
                <ArrowUpRight size={24} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

