'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, FileText, Link2, Scale, UserCheck, Building2, Mail, Globe, Download, ScrollText, Info, History, Shield, Bookmark } from 'lucide-react';

const sections = [
  { id: 'ownership', title: '1) الملكية الفكرية', icon: <ShieldAlert />, content: `جميع الحقوق محفوظة لنادي الزمالك الرياضي بما في ذلك الشعار، الهوية البصرية، النصوص، الصور، التصاميم، الفيديوهات، والمواد السمعية والبصرية المنشورة عبر الموقع. لا يجوز إعادة إنتاج أو توزيع أو تعديل أي جزء من المحتوى بدون تصريح كتابي مسبق من إدارة النادي.` },
  { id: 'use', title: '2) استخدام الموقع', icon: <UserCheck />, content: `يلتزم المستخدم باستخدام الموقع لأغراض قانونية وشخصية فقط، والامتناع عن أي نشاط يسيء لسمعة النادي أو جماهيره، أو ينتهك القوانين المحلية والدولية، أو يعرّض أمن الموقع للخطر بما في ذلك محاولات الاختراق أو تعطيل الخدمات.` },
  { id: 'content', title: '3) دقة المحتوى والأخبار', icon: <FileText />, content: `نحرص على نشر معلومات دقيقة وآنية، ومع ذلك قد تحتوي بعض المواد على أخطاء غير مقصودة أو تحديثات لاحقة. يحتفظ النادي بالحق في تعديل أو تصحيح أو تحديث المحتوى دون إشعار مسبق.` },
  { id: 'liability', title: '4) حدود المسؤولية', icon: <Scale />, content: `لا يتحمل النادي المسؤولية عن أي أضرار مباشرة أو غير مباشرة تنتج عن استخدام الموقع أو عدم القدرة على استخدامه، بما في ذلك فقدان البيانات أو توقف الخدمة أو أخطاء تقنية خارجة عن إرادتنا.` },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">

      {/* Legal Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-5" />
        </div>

        <div className="relative z-10 text-center space-y-6 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest"
          >
            <Shield size={14} />
            <span>الوثائق القانونية الرسمية</span>
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black font-heading tracking-tight italic uppercase">
            الـشـروط <span className="text-primary italic">والأحـكـام</span>
          </h1>
          <p className="text-sm font-bold opacity-40 uppercase tracking-[0.2em]">Last Updated: August 2024</p>
        </div>
      </section>

      {/* Content Layout */}
      <section className="container mx-auto max-w-7xl px-4 py-32">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-32 p-10 bg-card border border-border rounded-[3rem] shadow-2xl space-y-10">
              <header className="space-y-4">
                <h3 className="text-xl font-black font-heading italic">فهرس المحتويات</h3>
                <div className="h-1 w-12 bg-primary rounded-full" />
              </header>
              <nav className="space-y-4">
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className="flex items-center gap-4 text-sm font-bold opacity-40 hover:opacity-100 hover:text-primary transition-all group">
                    <Bookmark size={16} className="group-hover:fill-current" />
                    <span>{s.title}</span>
                  </a>
                ))}
              </nav>
              <button className="w-full h-16 bg-muted rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-foreground transition-all">
                <Download size={18} />
                <span>Download PDF</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {sections.map((s, idx) => (
              <motion.section
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-12 md:p-20 bg-card border border-border rounded-[4rem] group shadow-2xl hover:border-primary transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] group-hover:bg-primary transition-all translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 flex items-center justify-center p-8">
                  <div className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {s.icon}
                  </div>
                </div>

                <div className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <div className="text-primary font-black text-[10px] uppercase tracking-widest opacity-40">Article {idx + 1}</div>
                    <h2 className="text-3xl font-black font-heading italic">{s.title}</h2>
                  </div>
                  <p className="text-lg font-bold opacity-60 leading-relaxed text-right">
                    {s.content}
                  </p>
                </div>
              </motion.section>
            ))}

            <footer className="p-12 text-center space-y-4 opacity-20 font-black text-[10px] uppercase tracking-widest italic">
              <p>© 2024 Zamalek Sporting Club - Legal Department</p>
              <p>All Rights Reserved.</p>
            </footer>
          </div>

        </div>
      </section>

    </div>
  );
}
