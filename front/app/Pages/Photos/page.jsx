'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, Share2, Info, X, ChevronRight, ChevronLeft, Download, Filter, Star, History, Image as ImageIcon } from 'lucide-react';
import { zamalekHistory } from '@/utils/data';

const currentImages = [
  { id: 101, src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2076&auto=format&fit=crop', title: 'صيحات الجماهير', category: 'Matchday' },
  { id: 102, src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop', title: 'الملعب ليلاً', category: 'Stadium' },
  { id: 103, src: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1974&auto=format&fit=crop', title: 'فرحة الهدف', category: 'Moments' },
  { id: 104, src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop', title: 'تدريبات ميت عقبة', category: 'Training' },
];

export default function PhotosPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Matchday', 'Archive', 'Training', 'Stadium'];

  return (
    <div className="min-h-screen w-full bg-background text-foreground" dir="rtl">

      {/* Editorial Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop"
            alt="Gallery Background"
            fill
            className="object-cover opacity-20 grayscale brightness-50 contrast-125 scale-110"
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
            <Camera size={16} fill="currentColor" />
            <span>الأرشيف البصري للقلعة البيضاء</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black font-heading tracking-tighter leading-none italic uppercase"
            >
              مـعـرض <br /> <span className="text-primary italic">الـذكـريـات</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-3xl font-bold opacity-40 leading-relaxed italic"
            >
              رحلة بصرية عبر الزمان والمكان، توثق لحظات المجد والوفاء في تاريخ ملوك الفن والهندسة.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery Interaction Bar */}
      <section className="container mx-auto px-4 -mt-3 relative z-20">
        <div className="bg-card p-4 rounded-[3.5rem] border border-border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto backdrop-blur-3xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-primary text-foreground shadow-xl shadow-primary/20' : 'hover:bg-muted opacity-60'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-4 px-8 border-r border-border hidden md:flex">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary">
              <ImageIcon size={20} />
            </div>
            <div className="text-right">
              <div className="text-xl font-black font-heading leading-tight">1,240+</div>
              <div className="text-[8px] font-black uppercase tracking-widest opacity-40">Captures Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Masonry-style Grid */}
      <section className="container mx-auto px-4 py-32 space-y-32">

        {/* Live Moments Section */}
        <div className="space-y-16">
          <header className="flex flex-col md:flex-row justify-between items-end gap-12 px-4">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">High Fidelity Captures</span>
              <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter italic uppercase">لـقـطـات <span className="text-primary italic">الـحـاضـر</span></h2>
            </div>
            <p className="text-lg font-bold opacity-40 max-w-xl leading-relaxed">توثيق مباشر لأهم اللحظات من الملاعب وتدريبات الفريق الأول في ميت عقبة.</p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentImages.map((img, idx) => (
              <PhotoCard key={img.id} img={img} index={idx} onClick={() => setSelectedImage(img)} />
            ))}
          </div>
        </div>

        {/* Historical Archives Section */}
        <div className="space-y-16 py-32 -mx-full px-full">
          <div className="container mx-auto max-w-7xl px-4 space-y-16">
            <header className="flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Vintage Collection</span>
                <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter italic uppercase">أرشـيـف <span className="text-primary italic">الـمـلـوك</span></h2>
              </div>
              <div className="flex gap-4">
                <button className="w-16 h-16 rounded-2xl border border-border flex items-center justify-center hover:bg-primary transition-all"><ChevronRight size={24} /></button>
                <button className="w-16 h-16 rounded-2xl border border-border flex items-center justify-center hover:bg-primary transition-all"><ChevronLeft size={24} /></button>
              </div>
            </header>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
              {zamalekHistory.map((g, idx) => (
                <PhotoCard key={idx} img={g} index={idx} onClick={() => setSelectedImage(g)} isArchive />
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            />

            <motion.div
              layoutId={selectedImage.id || selectedImage.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-7xl h-full flex flex-col pointer-events-none"
            >
              <div className="flex-1 relative flex items-center justify-center pointer-events-auto">
                <Image
                  src={selectedImage.src || selectedImage.img}
                  alt={selectedImage.title}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-[80vh] object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
                />
              </div>

              <div className="h-48 flex items-center justify-between px-12 pointer-events-auto">
                <div className="space-y-2">
                  <div className="text-primary font-black text-xs uppercase tracking-[0.3em]">
                    {selectedImage.category || selectedImage.year || 'Zamalek Heritage'}
                  </div>
                  <h3 className="text-4xl font-black font-heading uppercase italic tracking-tighter">{selectedImage.title}</h3>
                </div>

                <div className="flex gap-4">
                  <button className="h-16 w-16 bg-foreground/10 backdrop-blur-3xl border border-foreground/20 text-foreground rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl">
                    <Download size={20} />
                  </button>
                  <button className="h-16 w-16 bg-foreground/10 backdrop-blur-3xl border border-foreground/20 text-foreground rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl">
                    <Share2 size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="h-16 px-10 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-foreground transition-all shadow-xl"
                  >
                    CLOSE ARCHIVE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function PhotoCard({ img, index, onClick, isArchive }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: (index % 5) * 0.05 }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden ${isArchive ? 'aspect-square rounded-[2rem]' : 'aspect-square rounded-[3.5rem]'} bg-card border border-border shadow-2xl`}
    >
      <Image
        src={img.src || img.img}
        alt={img.title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <div className="absolute bottom-10 inset-x-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <div className="space-y-1">
          <div className="text-foreground font-black font-heading text-lg uppercase tracking-tight italic">{img.title}</div>
          <div className="text-[8px] font-black uppercase text-foreground/60 tracking-widest">{img.year || img.category}</div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-primary text-foreground flex items-center justify-center shadow-lg">
          <Maximize2 size={18} />
        </div>
      </div>

      <div className="absolute top-10 right-10">
        <div className="w-10 h-10 rounded-xl bg-foreground/10 backdrop-blur-3xl border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary">
          <Info size={16} className="text-foreground" />
        </div>
      </div>
    </motion.div>
  );
}
