'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, CreditCard, User, Users, Calendar, Upload, X, Shield, Star, Crown, Zap, Mail, Phone, Fingerprint } from 'lucide-react';
import { PLANS } from '@/utils/data';
import TitleSection from '@/Components/TitleSection';

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1].id);
  const [form, setForm] = useState({ fullName: '', nationalId: '', phone: '', email: '', plan: selectedPlan, paymentMethod: 'full', files: null });
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'الاسم الكامل مطلوب';
    if (!form.nationalId.trim()) e.nationalId = 'الرقم القومي مطلوب';
    if (!/^\d{10,15}$/.test(form.phone)) e.phone = 'رقم هاتف صحيح مطلوب';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'بريد إلكتروني صحيح مطلوب';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccessOpen(true);
      setForm({ fullName: '', nationalId: '', phone: '', email: '', plan: selectedPlan, paymentMethod: 'full', files: null });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">

      {/* Hero: Elite Status Intro */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1577416416141-7c833947808d?q=80&w=2070&auto=format&fit=crop"
            alt="Elite Club"
            fill
            className="object-cover opacity-20 grayscale brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-12 px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.3em] mb-4"
          >
            <Crown size={16} fill="currentColor" />
            <span>بطاقة النخبة في القلعة البيضاء</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black font-heading tracking-tight leading-none italic"
            >
              انتمِ إلى <span className="text-primary">الـمـلـوك</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-3xl font-bold opacity-40 leading-relaxed"
            >
              عضوية نادي الزمالك ليست مجرد اشتراك، بل هي انتماء تاريخي وحق أصيل في إدارة وبناء صرح القلعة البيضاء.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Experience Layout */}
      <section className="container mx-auto px-4 py-32 -mt-32 relative z-20">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Plans & Benefits View (8 Cols) */}
          <div className="lg:col-span-8 space-y-32">

            {/* Pricing Cards */}
            <section className="space-y-12">
              <header className="flex items-end justify-between border-b border-border pb-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Choose Your Plan</span>
                  <h2 className="text-4xl font-black font-heading italic">باقات الاشتراك</h2>
                </div>
              </header>

              <div className="grid md:grid-cols-3 gap-8">
                {PLANS.map((plan, idx) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    selected={selectedPlan === plan.id}
                    onClick={() => { setSelectedPlan(plan.id); setForm({ ...form, plan: plan.id }); }}
                  />
                ))}
              </div>
            </section>

            {/* Benefits Experience */}
            <section className="space-y-16">
              <header className="text-center md:text-right space-y-4">
                <h3 className="text-3xl font-black font-heading tracking-tight">امتيازات حصرية لحاملي البطاقة</h3>
                <p className="text-lg font-bold opacity-40 max-w-2xl">بصفتك عضواً في نادي الزمالك، تفتح لك الأبواب لمجموعة لا متناهية من الخدمات والامتيازات الاستثنائية.</p>
              </header>

              <div className="grid sm:grid-cols-2 gap-8">
                <BenefitItem icon={<Users />} title="دخول كافة فروع النادي" desc="تمتع بدخول كافة المقرات والمرافق الرياضية والترفيهية للنادي في ميت عقبة وأكتوبر." />
                <BenefitItem icon={<Zap />} title="حق التصويت والانتخاب" desc="كن شريكاً في صناعة القرار والمشاركة في الجمعيات العمومية ورسم مستبقل النادي." />
                <BenefitItem icon={<Star />} title="خصومات للمتاجر الرسمية" desc="خصومات حصرية تصل لـ 20% على منتجات المتجر الرسمي وكافة الرعاة المعتمدين." />
                <BenefitItem icon={<CreditCard />} title="تسهيلات بنكية وحلول دفع" desc="إمكانية تقسيط العضويات من خلال بروتوكولات تعاون مع كبرى البنوك المصرية." />
              </div>
            </section>

          </div>

          {/* Application Form (4 Cols) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-card border border-border rounded-[4rem] p-10 shadow-[0_32px_128px_rgba(0,0,0,0.3)] space-y-12"
              >
                <header className="space-y-2">
                  <h3 className="text-3xl font-black font-heading italic">طلب التحاق</h3>
                  <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Submit Member Application</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <InputField label="الاسم الكامل" icon={<User size={16} />} value={form.fullName} error={errors.fullName} onChange={(val) => setForm({ ...form, fullName: val })} />
                    <InputField label="الرقم القومي (14 رقم)" icon={<Fingerprint size={16} />} value={form.nationalId} error={errors.nationalId} onChange={(val) => setForm({ ...form, nationalId: val })} />
                    <InputField label="رقم الهاتف" icon={<Phone size={16} />} value={form.phone} error={errors.phone} onChange={(val) => setForm({ ...form, phone: val })} />
                    <InputField label="البريد الإلكتروني" icon={<Mail size={16} />} value={form.email} error={errors.email} onChange={(val) => setForm({ ...form, email: val })} />

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mr-4">رفع الوثائق (ID/Photo)</label>
                      <div className="relative group">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <div className="h-16 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-4 group-hover:border-primary transition-all">
                          <Upload size={18} className="text-primary" />
                          <span className="text-xs font-bold opacity-60">Choose Files</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-20 bg-primary text-foreground rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 hover:-translate-y-1 transition-all disabled:opacity-50"
                  >
                    {submitting ? 'PROCESSING...' : 'SEND APPLICATION'}
                    <Zap size={18} />
                  </button>
                </form>

                <p className="text-[9px] font-bold opacity-20 text-center leading-relaxed">بإرسالك لهذا الطلب، أنت توافق على كافة الشروط والأحكام الخاصة بنادي الزمالك وسياسة الخصوصية المعمول بها.</p>
              </motion.div>
            </div>
          </aside>

        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {successOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSuccessOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-card border border-border rounded-[4rem] p-16 max-w-lg w-full text-center space-y-8">
              <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle size={48} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black font-heading">تم استلام طلبك!</h3>
                <p className="text-lg font-bold opacity-60">سيتواصل معك أحد ممثلي إدارة العضويات لإتمام إجراءات التعاقد واستلام البطاقات.</p>
              </div>
              <button onClick={() => setSuccessOpen(false)} className="w-full h-16 bg-muted rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-foreground transition-all">CLOSE</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function PlanCard({ plan, selected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`relative p-10 rounded-[3rem] border-2 transition-all cursor-pointer flex flex-col h-full overflow-hidden ${selected ? 'bg-primary border-primary text-foreground shadow-2xl shadow-primary/30' : 'bg-card border-border hover:border-primary/40'
        }`}
    >
      <div className="relative z-10 space-y-8">
        <div className="space-y-2">
          <div className={`text-[10px] font-black uppercase tracking-widest ${selected ? 'text-foreground/60' : 'text-primary'}`}>{plan.short}</div>
          <h4 className="text-3xl font-black font-heading italic">{plan.name}</h4>
        </div>

        <div className="space-y-1">
          <div className="text-4xl font-black font-heading">{plan.price}</div>
          <div className={`text-[10px] font-black uppercase tracking-widest ${selected ? 'text-foreground/40' : 'opacity-20'}`}>EGP / ANNUAL FEE</div>
        </div>

        <div className="w-full h-px bg-current opacity-10" />

        <ul className="space-y-4">
          {plan.perks.map((perk, i) => (
            <li key={i} className="flex items-center gap-3 text-xs font-bold">
              <CheckCircle size={14} className={selected ? 'text-foreground' : 'text-primary'} />
              <span className={selected ? 'text-foreground/80' : 'opacity-60'}>{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {plan.popular && (
        <div className="absolute top-8 left-8 rotate-[-90deg] origin-top-left -translate-x-full">
          <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${selected ? 'bg-foreground text-primary' : 'bg-primary text-foreground'}`}>MOST POPULAR</span>
        </div>
      )}

      {selected && <Shield size={150} className="absolute bottom-[-50px] left-[-50px] text-foreground/5 -rotate-12" />}
    </motion.div>
  );
}

function BenefitItem({ icon, title, desc }) {
  return (
    <div className="p-10 bg-card border border-border rounded-[3rem] group hover:border-primary transition-all flex items-start gap-8">
      <div className="w-16 h-16 rounded-2xl bg-muted text-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-foreground transition-all shrink-0">
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-xl font-black font-heading">{title}</h4>
        <p className="text-sm font-bold opacity-60 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function InputField({ label, icon, value, error, onChange }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mr-4">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 right-6 flex items-center opacity-40 group-focus-within:opacity-100 transition-opacity">
          {icon}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-16 bg-muted/30 border-2 rounded-2xl pr-14 pl-6 focus:outline-none transition-all font-bold ${error ? 'border-primary' : 'border-border focus:border-primary focus:bg-card'
            }`}
        />
      </div>
      {error && <p className="text-[9px] font-black text-primary px-4">{error}</p>}
    </div>
  );
}
