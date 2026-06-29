'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Share2, Info, Calendar, Clock, Film, PlayCircle, TrendingUp, Flame, ChevronRight, ChevronLeft } from 'lucide-react';

const allVideos = [
  { id: 1, title: 'ملخص مباراة الزمالك و الأهلي 🔥', thumbnail: '/new.jpg', src: '/videos/video1.mp4', category: 'ملخصات', isFeatured: true, duration: '12:45', views: '2.5M' },
  { id: 2, title: 'تدريبات الفريق قبل اللقاء القادم 💪', thumbnail: '/new.jpg', src: '/videos/video1.mp4', category: 'تدريبات', duration: '08:20', views: '850K' },
  { id: 3, title: 'أهداف الزمالك في البطولة العربية ⚽', thumbnail: '/new.jpg', src: '/videos/video1.mp4', category: 'ملخصات', duration: '15:10', views: '1.2M' },
  { id: 4, title: 'اللقطات الأجمل من تاريخ القلعة البيضاء 🏛️', thumbnail: '/new.jpg', src: '/videos/video1.mp4', category: 'أرشيف', duration: '20:00', views: '3M' },
  { id: 5, title: 'هدف شيكابالا التاريخي', thumbnail: '/new.jpg', src: '/videos/video1.mp4', category: 'أرشيف', duration: '02:30', views: '5M' },
  { id: 6, title: 'تصريحات المدير الفني الجديدة', thumbnail: '/new.jpg', src: '/videos/video1.mp4', category: 'لقاءات', duration: '10:15', views: '400K' },
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const featured = allVideos.find(v => v.isFeatured) || allVideos[0];
  const categories = [...new Set(allVideos.map(v => v.category))];

  return (
    <div className="min-h-screen w-full bg-background text-foreground" dir="rtl">

      {/* Cinematic Spotlight (Hero) */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={featured.thumbnail}
            alt={featured.title}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-transparent to-transparent hidden lg:block" />
        </div>

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl space-y-8"
          >
            <div className="flex items-center gap-4 text-primary font-black text-xs uppercase tracking-[0.3em]">
              <Flame size={16} fill="currentColor" />
              <span>Trending Now</span>
              <span className="w-12 h-px bg-primary" />
              <span className="text-foreground/60">Season 2024</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black font-heading leading-tight italic">
              {featured.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest opacity-60">
              <div className="flex items-center gap-2"><Clock size={14} /> <span>{featured.duration}</span></div>
              <div className="flex items-center gap-2"><TrendingUp size={14} /> <span>{featured.views} Views</span></div>
              <div className="flex items-center gap-2 text-primary"><span>HD 4K</span></div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setSelectedVideo(featured)}
                className="h-16 px-10 bg-primary text-foreground rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-4 shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all"
              >
                <Play size={20} fill="currentColor" />
                <span>Watch Now</span>
              </button>
              <button className="h-16 w-16 bg-foreground/10 backdrop-blur-xl border border-foreground/20 text-foreground rounded-2xl flex items-center justify-center hover:bg-foreground hover:text-background transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Categories Bar */}
        <div className="absolute bottom-12 left-0 w-full overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar no-scrollbar">
              {categories.map((cat, i) => (
                <button key={i} className="px-8 py-3 bg-foreground/5 backdrop-blur-3xl border border-foreground/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-foreground hover:bg-primary hover:border-primary transition-all whitespace-nowrap">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Content Grid */}
      <section className="container mx-auto px-4 py-32 space-y-32">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-12">
            <header className="flex items-end justify-between border-b border-border pb-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Category Showcase</span>
                <h2 className="text-4xl font-black font-heading tracking-tight italic">{cat}</h2>
              </div>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-foreground transition-all"><ChevronRight size={20} /></button>
                <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-foreground transition-all"><ChevronLeft size={20} /></button>
              </div>
            </header>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allVideos.filter(v => v.category === cat).map((video, vIdx) => (
                <VideoThumbnail key={vIdx} video={video} onClick={() => setSelectedVideo(video)} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden border border-foreground/10 shadow-[0_32px_128px_rgba(227,27,35,0.2)] bg-black"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-8 left-8 w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-3xl flex items-center justify-center hover:bg-primary transition-all z-50"
              >
                <X size={24} className="text-foreground" />
              </button>

              {/* In a real app use dynamic URL */}
              <div className="w-full h-full flex flex-col items-center justify-center space-y-8 p-12 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                  <Film size={48} className="text-primary" />
                </div>
                <h2 className="text-3xl font-black font-heading">{selectedVideo.title}</h2>
                <p className="text-lg font-bold opacity-40">Loading Cinematic Stream...</p>
                <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function VideoThumbnail({ video, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group cursor-pointer space-y-6"
    >
      <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-border shadow-xl">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/90 text-foreground flex items-center justify-center scale-75 group-hover:scale-100 transition-transform shadow-2xl">
            <Play size={32} fill="currentColor" className="mr-[-4px]" />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
          <span className="px-4 py-1.5 bg-black/60 backdrop-blur rounded-lg text-[8px] font-black text-foreground">{video.duration}</span>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground/10 backdrop-blur border border-foreground/20 flex items-center justify-center text-foreground"><Share2 size={12} /></div>
            <div className="w-8 h-8 rounded-lg bg-foreground/10 backdrop-blur border border-foreground/20 flex items-center justify-center text-foreground"><Info size={12} /></div>
          </div>
        </div>
      </div>

      <div className="space-y-2 px-2">
        <div className="flex items-center gap-2 text-primary font-black text-[8px] uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>{video.category}</span>
        </div>
        <h3 className="text-xl font-black font-heading leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center gap-4 text-[10px] font-bold opacity-20">
          <span>2.4K Views</span>
          <div className="w-1 h-1 rounded-full bg-border" />
          <span>2 Days ago</span>
        </div>
      </div>
    </motion.div>
  );
}