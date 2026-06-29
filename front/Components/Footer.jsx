'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { socialLinks, sponsers } from '@/utils/data';
import Link from 'next/link';
import { ArrowUpRight, Send, Copyright, Star, ShieldAlert, Hexagon, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // Mock subscription logic
    alert('تم الاشتراك بنجاح في النشرة البيضاء!');
    setEmail('');
  };

  return (
    <footer className="relative bg-background text-foreground overflow-hidden w-full" dir="rtl" aria-label="تذييل الصفحة">
      {/* Structural Decor & Top Borders */}
      <div className="absolute top-0 left-0 w-full h-3 flex flex-col gap-[3px] z-20">
        <div className="h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-90 shadow-[0_0_15px_rgba(227,27,35,0.8)] w-full" />
        <div className="h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-90 shadow-[0_0_15px_rgba(227,27,35,0.8)] w-full" />
      </div>

      {/* Cinematic Background Lighting */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none mix-blend-overlay z-0" />
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Hero-Style Newsletter Banner */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-24 pb-16">
        <div className="bg-gradient-to-tr from-card to-background border border-foreground/5 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,1)]">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                <ShieldAlert size={14} className="animate-pulse" />
                <span>البيت الملكي</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tighter leading-tight italic">
                اشترك في النشرة <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-red-800">البيضاء</span>
              </h2>
              <p className="text-sm md:text-base font-bold opacity-50 max-w-lg leading-loose">
                كن أول من يعلم بصفقات نادي الزمالك، ومواعيد المباريات، والأخبار الرسمية، والمنتجات الحصرية مباشرة في صندوق الوارد الخاص بك.
              </p>
            </div>
            
            <div className="w-full lg:w-[450px]">
              <form onSubmit={handleSubscribe} className="relative group/input flex bg-foreground/5 border border-foreground/10 p-2 rounded-[2rem] backdrop-blur-xl transition-all focus-within:border-primary/50 focus-within:shadow-[0_0_30px_rgba(227,27,35,0.2)]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  aria-label="البريد الإلكتروني للنشرة الإخبارية"
                  required
                  className="flex-1 bg-transparent border-none py-5 px-6 outline-none text-foreground font-bold placeholder:text-foreground/30"
                />
                <button 
                  type="submit" 
                  className="px-8 bg-primary rounded-3xl text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-lg shadow-primary/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>اشترك</span>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 py-16 border-t border-foreground/5">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-flex items-end gap-6 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl" aria-label="الرئيسية لنادي الزمالك">
              <div className="relative w-24 h-24 bg-gradient-to-br from-foreground/10 to-transparent backdrop-blur-md rounded-3xl p-4 border border-foreground/10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Image src="/zsc.png" alt="Zamalek SC شعار" fill className="object-contain p-2 relative z-10" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="pb-1">
                <h3 className="text-3xl lg:text-4xl font-black font-heading tracking-tighter leading-none italic drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">ZAMALEK <span className="text-primary italic">SC</span></h3>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/30 mt-2">White Knights • 1911</p>
              </div>
            </Link>
            
            <p className="text-sm font-bold opacity-40 leading-relaxed max-w-sm italic border-r-2 border-primary/30 pr-4">
              "الزمالك ليس مجرد نادي، هو مدرسة الفن والهندسة.. هو تاريخ مرصع بالذهب، وهوية تتناقلها الأجيال لتظل الفرسان البيضاء هي رمز الوفاء."
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`تابعنا على وسائل التواصل الاجتماعي`}
                  className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/5 flex items-center justify-center text-foreground/50 hover:bg-primary hover:border-primary hover:text-white hover:scale-110 hover:-translate-y-2 transition-all duration-500 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="scale-125">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
            <FooterNavGroup
              title="النادي الملكي"
              links={[
                { name: 'عن الزمالك', href: '/Pages/About' },
                { name: 'مجلس الإدارة', href: '/Pages/Directors' },
                { name: 'عضوية النادي', href: '/Pages/Membership' },
                { name: 'شبكة الكشافين', href: '/Pages/Scouting' },
                { name: 'تواصل معنا', href: '/Pages/CallUs' },
              ]}
            />
            <FooterNavGroup
              title="الفرق الرياضية"
              links={[
                { name: 'كرة القدم رجال', href: '/Pages/Players/Football' },
                { name: 'كرة السلة', href: '/Pages/Players/Basketball' },
                { name: 'كرة اليد', href: '/Pages/Players/Handball' },
                { name: 'الكرة الطائرة', href: '/Pages/Players/Volleyball' },
                { name: 'الفرق النسائية', href: '/Pages/Players/Women' },
              ]}
            />
            <FooterNavGroup
              title="تغطية إعلامية"
              links={[
                { name: 'أحدث الأخبار', href: '/Pages/News' },
                { name: 'معرض الصور', href: '/Pages/Photos' },
                { name: 'قناة الزمالك', href: '/Pages/ZamalekTV' },
                { name: 'المركز الإعلامي', href: '/Pages/MediaCenter' },
                { name: 'منطقة الجماهير', href: '/Pages/FanZone' },
              ]}
            />
            <FooterNavGroup
              title="المتجر الرسمي"
              links={[
                { name: 'أطقم المباريات', href: '/Pages/Store' },
                { name: 'ملابس التمرين', href: '/Pages/Store' },
                { name: 'إكسسوارات', href: '/Pages/Store' },
                { name: 'تخفيضات', href: '/Pages/Store' },
              ]}
            />
          </div>
        </div>

        {/* Global Partners */}
        <div className="py-16 mt-8 border-y border-foreground/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none hidden md:block" />
          
          <div className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[1em] text-foreground/40 bg-foreground/5 px-6 py-2 rounded-full border border-foreground/10 backdrop-blur-sm shadow-inner">
              <Hexagon size={12} className="text-primary" />
              <span>Official Global Partners</span>
              <Hexagon size={12} className="text-primary" />
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 w-full max-w-5xl">
              {sponsers.map((sponsor, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center justify-center w-36 h-20 md:w-48 md:h-24 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <div className="relative w-full h-full p-2">
                     {typeof sponsor === 'string' ? (
                        <Image src={sponsor} alt="شريك رسمي" fill className="object-contain drop-shadow-md dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] dark:brightness-110" sizes="192px" />
                      ) : (
                        <>
                          <Image src={sponsor.light} alt="شريك رسمي" fill className="object-contain dark:hidden drop-shadow-sm" sizes="192px" />
                          <Image src={sponsor.dark} alt="شريك رسمي" fill className="object-contain hidden dark:block drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] brightness-110" sizes="192px" />
                        </>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Absolute Bottom Signature Bar */}
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
          <div className="flex items-center gap-3 text-xs font-bold text-foreground/80">
            <Copyright size={14} className="text-primary" />
            <span>{new Date().getFullYear()} نادي الزمالك المصري. جميع الحقوق محفوظة.</span>
          </div>

          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
            <Link href="/Pages/Privacy" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline">Privacy Policy</Link>
            <Link href="/Pages/Terms" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline">Terms of Service</Link>
            <Link href="/Pages/Cookies" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline">Cookie Settings</Link>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-black tracking-widest italic">
            <span className="opacity-40 uppercase">Developed by</span>
            <div className="flex items-center gap-2 bg-foreground/5 border border-foreground/10 px-4 py-2 rounded-xl group hover:bg-foreground/10 transition-colors">
              <Star size={12} className="text-primary group-hover:animate-spin-slow" />
              <span className="text-foreground">PRO DESIGN HUB</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterNavGroup = ({ title, links }) => (
  <div className="space-y-8">
    <h4 className="text-[12px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
      {title}
    </h4>
    <nav className="flex flex-col gap-5">
      {links.map((link, idx) => (
        <Link
          key={idx}
          href={link.href}
          className="text-[15px] font-bold text-foreground/40 hover:text-foreground transition-all hover:translate-x-[-10px] flex items-center justify-between group focus-visible:outline-none focus-visible:text-primary focus-visible:ring-1 focus-visible:ring-primary rounded-lg px-2 py-1"
        >
          <span>{link.name}</span>
          <ChevronLeft size={16} className="opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all -translate-x-4 group-hover:translate-x-0" />
        </Link>
      ))}
    </nav>
  </div>
);

export default Footer;

