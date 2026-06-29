'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Trophy, Image as ImageIcon, Shirt, Users, FileText, Medal, ArrowRight, Sparkles, History } from 'lucide-react'
import { mesaumSections } from '@/utils/data'

const iconMap = {
  "خزانه الكوؤس": <Trophy className="w-6 h-6" />,
  "الصور التاريخية": <ImageIcon className="w-6 h-6" />,
  "القمصان التاريخية": <Shirt className="w-6 h-6" />,
  "قاعة الأساطير": <Users className="w-6 h-6" />,
  "الوثائق التاريخية": <FileText className="w-6 h-6" />,
  "الميداليات الذهبية": <Medal className="w-6 h-6" />,
};

export default function MuseumPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 dark:bg-[#080808] text-foreground transition-colors duration-500 overflow-hidden w-full">

      {/* Royal Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-red-600/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">

        {/* Header / Hero Section */}
        <section className="text-center mb-32 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-foreground dark:bg-foreground/5 border border-primary/20 shadow-xl shadow-primary/5 text-primary mb-8"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span className="text-xs font-black tracking-[0.2em] uppercase">The Royal Digital Archive</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-none"
          >
            متحف <span className="text-primary italic">الزمالك</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium italic"
          >
            استكشف إرث مدرسة الفن والهندسة عبر قرن من الزمان، حيث تجتمع الأرقام القياسية بالقطع التاريخية النادرة في تجربة بصرية فريدة.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-12 rounded-full opacity-50"
          />
        </section>

        {/* Dynamic Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {[
            { label: "بطولة قارية", value: "13", icon: <Trophy />, color: "text-amber-500" },
            { label: "درع دوري", value: "14", icon: <History />, color: "text-blue-500" },
            { label: "كأس مصر", value: "28", icon: <Medal />, color: "text-emerald-500" },
            { label: "عام من العراقة", value: "114", icon: <Sparkles />, color: "text-primary" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-10 rounded-[3rem] bg-foreground dark:bg-[#121212] border border-border flex flex-col items-center justify-center text-center group hover:border-primary/40 transition-all duration-500 shadow-2xl shadow-black/5"
            >
              <div className={`w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
                {React.cloneElement(stat.icon, { size: 32 })}
              </div>
              <span className="text-5xl font-black mb-2 tracking-tighter">{stat.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>

              <div className="absolute inset-0 rounded-[3rem] border-2 border-primary/0 group-hover:border-primary/10 transition-all" />
            </motion.div>
          ))}
        </section>

        {/* Categories Grid - Enhanced View */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-40"
        >
          {mesaumSections.map((section, i) => (
            <motion.div
              key={section.name}
              variants={itemVariants}
              whileHover={{ y: -15 }}
              className="relative group aspect-[4/5]"
            >
              <Link href={section.open ? section.link : "#"} className={!section.open ? "cursor-not-allowed" : "block h-full"}>
                <div className="relative h-full rounded-[3.5rem] overflow-hidden border border-border bg-foreground dark:bg-[#121212] shadow-2xl transition-all duration-700">

                  {/* Image Background with Pro Overlays */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={section.img}
                      alt={section.name}
                      fill
                      className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${!section.open ? 'grayscale blur-md opacity-30 shadow-inner' : 'opacity-80 group-hover:opacity-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
                  </div>

                  {/* Content Overlay - Pro Layout */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-10">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-primary/20 backdrop-blur-2xl flex items-center justify-center text-foreground border border-foreground/20 group-hover:bg-primary transition-colors duration-500">
                          {iconMap[section.name] || <Sparkles />}
                        </div>
                        {!section.open && (
                          <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-foreground/10 text-foreground/50 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Lock size={12} />
                            قريباً
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-3xl font-black text-foreground italic tracking-tight">
                          {section.name}
                        </h2>
                        <p className="text-foreground/50 text-xs font-medium leading-relaxed line-clamp-2 italic">
                          {section.bio}
                        </p>
                      </div>

                      {section.open && (
                        <div className="flex items-center gap-3 text-foreground font-black text-[10px] tracking-widest uppercase py-4 border-t border-foreground/10 mt-4 group-hover:text-primary transition-colors">
                          <span>دخول المعرض</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-[-5px] transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Elegant Hover Frame */}
                  <div className="absolute inset-4 border border-foreground/0 group-hover:border-foreground/10 transition-all duration-700 rounded-[2.5rem] pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Exhibit Section - Re-styled for Pro look */}
        <section className="mb-40">
          <div className="flex flex-col lg:flex-row items-center gap-20 p-12 md:p-24 rounded-[4rem] bg-foreground dark:bg-[#121212] border border-border relative overflow-hidden shadow-2xl shadow-primary/5">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

            <div className="flex-1 relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] italic">
                <History className="w-4 h-4" />
                Highlight Reveal
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-black leading-none italic">
                  أول دوري عام <br /> <span className="text-primary tracking-tighter">1960</span>
                </h2>
                <div className="h-2 w-24 bg-primary rounded-full" />
              </div>

              <p className="text-muted-foreground text-xl leading-relaxed italic font-medium">
                شاهد الوثائق السرية واللحظات العفوية لجيل "حمادة إمام" و "نبيـل نصير" وهم يتوجون بأول درع دوري دخل خزائن الملكي.
              </p>

              <Link href="/Pages/Photos">
                <button className="px-12 py-6 rounded-[2rem] bg-foreground text-background font-black text-lg hover:bg-primary hover:text-foreground transition-all duration-500 flex items-center gap-4 group shadow-2xl">
                  استكشف الأرشيف
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-[-8px] transition-transform" />
                </button>
              </Link>
            </div>

            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl opacity-20 animate-pulse" />
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-foreground dark:border-foreground/5 rotate-3 transform transition-transform hover:rotate-0 duration-700 group hover:scale-[1.02]">
                <Image
                  src="/history/Captain_Hanafi_Nassar_in_the_midst_of_his_team_of_young_Zamalek_players_in_1960s..jpg"
                  alt="Highlight Exhibit"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 right-8 text-foreground">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Archive ID: ZSC-1960</div>
                  <div className="text-xl font-bold italic">أبطال ميت عقبة التاريخيين</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Contribution CTA - Luxury styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-20 rounded-[5rem] bg-foreground text-background text-center overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)]"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />

          <div className="relative z-10 space-y-10">
            <History className="w-20 h-20 mx-auto text-primary mb-6 animate-bounce" />
            <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight italic">كن جزءاً من تـاريخنـا</h3>
            <p className="text-xl opacity-60 max-w-2xl mx-auto italic font-medium leading-relaxed">
              تراث الزمالك ملك لجماهيره. إذا كنت تمتلك أي مقتنى تاريخي ترغب في تخليده رقمياً، بادر بالاتصال بخبراء الأرشيف لدينا.
            </p>
            <Link href="/Pages/CallUs">
              <button className="px-14 py-7 rounded-[2.5rem] bg-primary text-foreground font-black text-xl hover:shadow-[0_0_50px_rgba(227,27,35,0.4)] transition-all hover:-translate-y-2 active:scale-95">
                تواصل مع لجنة التوثيق
              </button>
            </Link>
          </div>
        </motion.div>
      </main>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

