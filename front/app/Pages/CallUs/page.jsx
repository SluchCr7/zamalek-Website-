'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, Youtube, MessageSquare, Globe } from 'lucide-react';
import TitleSection from '@/Components/TitleSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">

      {/* Hero Section: Majestic Intro */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Club Headquarters"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 relative mx-auto p-4 bg-foreground rounded-3xl shadow-2xl"
          >
            <Image src="/teams/zamalek.png" alt="Zamalek SC" fill className="object-contain p-2" />
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black font-heading tracking-tighter"
            >
              تواصل <span className="text-primary italic">معنا</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl font-bold opacity-40 max-w-3xl mx-auto"
            >
              فريقنا متاح للرد على كافة استفساراتكم المتعلقة بالعضويات، التذاكر، والاقتراحات.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="container mx-auto px-4 py-32 -mt-32 relative z-20">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <ContactInfoCard
              icon={<Phone size={24} />}
              title="الخط الساخن"
              value="19111"
              subtitle="متاح 24/7 لخدمتكم"
            />
            <ContactInfoCard
              icon={<Mail size={24} />}
              title="البريد الإلكتروني"
              value="info@zamalek.sc"
              subtitle="الرد خلال 24 ساعة عمل"
            />
            <ContactInfoCard
              icon={<MapPin size={24} />}
              title="المقر الرئيسي"
              value="ميت عقبة، المهندسين"
              subtitle="محافظة الجيزة، مصر"
            />

            {/* Social Icons Card */}
            <div className="p-10 bg-card border border-border rounded-[3.5rem] shadow-2xl space-y-8">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-40">تابعنا على المنصات</h3>
              <div className="flex flex-wrap gap-4">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-muted text-foreground flex items-center justify-center hover:bg-primary hover:text-foreground transition-all hover:-translate-y-1">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border-4 border-border rounded-[4rem] p-8 md:p-16 shadow-[0_32px_128px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10 space-y-12">
                <header className="space-y-4">
                  <h2 className="text-4xl font-black font-heading italic">إرسال رسالة</h2>
                  <div className="w-16 h-1 bg-primary rounded-full" />
                </header>

                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mr-4">الاسم بالكامل</label>
                      <input type="text" placeholder="أحمد محمد" className="w-full h-16 bg-muted/30 border-2 border-border rounded-2xl px-8 focus:border-primary focus:outline-none focus:bg-card transition-all font-bold" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mr-4">البريد الإلكتروني</label>
                      <input type="email" placeholder="example@gmail.com" className="w-full h-16 bg-muted/30 border-2 border-border rounded-2xl px-8 focus:border-primary focus:outline-none focus:bg-card transition-all font-bold" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mr-4">الموضوع</label>
                    <select className="w-full h-16 bg-muted/30 border-2 border-border rounded-2xl px-8 focus:border-primary focus:outline-none focus:bg-card transition-all font-bold appearance-none">
                      <option>استفسار عن العضويات</option>
                      <option>حجز التذاكر</option>
                      <option>اقتراحات وشكاوى</option>
                      <option>أخرى</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mr-4">الرسالة</label>
                    <textarea rows="6" placeholder="اكتب استفسارك هنا بالتفصيل..." className="w-full bg-muted/30 border-2 border-border rounded-[2.5rem] p-8 focus:border-primary focus:outline-none focus:bg-card transition-all font-bold" />
                  </div>

                  <button className="w-full h-20 bg-primary text-foreground rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 hover:-translate-y-1 transition-all group">
                    <span>إرسال الطلب</span>
                    <Send size={18} className="group-hover:translate-x-[-10px] transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Map Section: Dynamic Experience */}
      <section className="h-[60vh] relative grayscale hover:grayscale-0 transition-all duration-1000 border-t border-border mt-32">
        {/* Placeholder for Map - In a real app use Google Maps / Leaflet */}
        <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
          <div className="text-center space-y-4">
            <MapPin size={48} className="text-primary mx-auto animate-bounce" />
            <p className="font-black font-heading text-2xl">ZSC HEADQUARTERS</p>
            <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Met Okba, Mohandessin, Giza</p>
          </div>
        </div>
      </section>

    </div>
  );
}

function ContactInfoCard({ icon, title, value, subtitle }) {
  return (
    <div className="p-10 bg-card border border-border rounded-[3.5rem] shadow-2xl group hover:border-primary transition-all flex items-center gap-8">
      <div className="w-16 h-16 rounded-[2rem] bg-muted text-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-foreground transition-all shadow-inner">
        {icon}
      </div>
      <div className="space-y-1 text-right">
        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{title}</div>
        <div className="text-2xl font-black font-heading">{value}</div>
        <div className="text-xs font-bold opacity-20">{subtitle}</div>
      </div>
    </div>
  );
}
