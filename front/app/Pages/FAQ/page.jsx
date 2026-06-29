'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, HelpCircle, Search, Mail, Phone, ExternalLink } from 'lucide-react';
import { sections } from '@/utils/data';
import TitleSection from '@/Components/TitleSection';

export default function FAQPage() {
  const [active, setActive] = useState({ section: 0, question: null });
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (sectionIndex, questionIndex) => {
    if (active.section === sectionIndex && active.question === questionIndex) {
      setActive({ ...active, question: null });
    } else {
      setActive({ section: sectionIndex, question: questionIndex });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground" dir="rtl">

      {/* Hero: Support Center Style */}
      <section className="relative pt-32 pb-24 px-4 bg-muted/20 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center space-y-12">
          <header className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest"
            >
              <HelpCircle size={14} />
              <span>مركز المساعدة والدعم</span>
            </motion.div>
            <TitleSection
              title="كيف يمكننا مساعدتك؟"
              subtitle="إليك الإجابات على الأسئلة الأكثر شيوعاً حول العضوية، التذاكر، والخدمات الرقمية."
            />
          </header>

          {/* Premium Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none text-primary">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="ابحث عن سؤالك هنا (مثال: تجديد العضوية)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-18 pr-20 pl-8 rounded-[2rem] bg-card border-2 border-border focus:border-primary focus:outline-none transition-all font-bold shadow-xl text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="container mx-auto max-w-6xl px-4 py-32">
        <div className="grid lg:grid-cols-[280px_1fr] gap-16">

          {/* Sidebar Navigation */}
          <aside className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-8 px-6">الأقسام الرئيسية</h3>
            <nav className="space-y-2">
              {sections.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive({ section: idx, question: null })}
                  className={`w-full text-right px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-between group ${active.section === idx ? 'bg-primary text-foreground shadow-xl shadow-primary/20' : 'hover:bg-card border border-transparent hover:border-border'
                    }`}
                >
                  <span>{section.title}</span>
                  <ChevronDown size={16} className={`-rotate-90 group-hover:translate-x-1 transition-transform ${active.section === idx ? 'opacity-100' : 'opacity-20'}`} />
                </button>
              ))}
            </nav>

            <div className="mt-12 p-8 bg-muted/50 rounded-[2.5rem] border border-border space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <h4 className="font-black">لم تجد إجابتك؟</h4>
              <p className="text-xs font-bold opacity-60 leading-relaxed">فريق الدعم الفني متاح دائماً لمساعدتك في أي استفسار.</p>
              <button className="w-full py-4 bg-primary text-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">تواصل معنا</button>
            </div>
          </aside>

          {/* Accordion Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-3xl font-black font-heading tracking-tight">{sections[active.section].title}</h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-4">
              {sections[active.section].questions.map((item, qIdx) => {
                const isOpen = active.question === qIdx;
                return (
                  <div
                    key={qIdx}
                    className={`group rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${isOpen ? 'bg-card border-primary shadow-2xl' : 'bg-transparent border-border hover:border-primary/40'
                      }`}
                  >
                    <button
                      onClick={() => toggle(active.section, qIdx)}
                      className="w-full text-right p-8 flex items-center justify-between gap-6"
                    >
                      <span className={`text-lg font-black font-heading transition-colors ${isOpen ? 'text-primary' : 'group-hover:text-primary'}`}>
                        {item.q}
                      </span>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isOpen ? 'bg-primary text-foreground rotate-180' : 'bg-muted text-foreground opacity-40'
                        }`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "circOut" }}
                        >
                          <div className="p-8 pt-0 text-lg font-bold opacity-60 leading-relaxed max-w-3xl">
                            {item.a}
                            <div className="mt-8 flex gap-6">
                              <button className="flex items-center gap-2 text-[10px] font-black uppercase text-primary hover:underline">
                                <ExternalLink size={14} />
                                <span>رابط مباشر للموضوع</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Footer Contact Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-32 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8">
          <ContactMethod icon={<Mail />} title="البريد الإلكتروني" value="info@zamalek.sc" />
          <ContactMethod icon={<Phone />} title="الخط الساخن" value="19111" />
          <ContactMethod icon={<MessageSquare />} title="واتساب" value="+20 123 456 789" />
        </div>
      </section>

    </div>
  );
}

function ContactMethod({ icon, title, value }) {
  return (
    <div className="p-10 bg-card border border-border rounded-[3rem] group hover:border-primary transition-all text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-muted text-foreground flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-foreground transition-all">
        {icon}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{title}</div>
      <div className="text-xl font-black font-heading">{value}</div>
    </div>
  );
}
