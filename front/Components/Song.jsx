'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX, Volume2 } from 'lucide-react';

export default function ZamalekSongButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="fixed bottom-10 left-32 z-[100]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio
        ref={audioRef}
        src="/zamaleksong.mp3"
        preload="auto"
        loop
      />

      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all duration-500 ${isPlaying
            ? 'bg-primary text-foreground shadow-primary/40'
            : 'bg-card text-foreground border border-border shadow-black/10'
          }`}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              className="relative"
            >
              <Volume2 size={24} />
              {/* Sound Waves Animation */}
              <div className="absolute -top-1 -right-1 flex gap-0.5">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-0.5 bg-foreground rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
            >
              <VolumeX size={24} className="opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Label */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute right-full mr-4 px-4 py-2 rounded-xl bg-foreground text-background text-[10px] font-black uppercase tracking-widest whitespace-nowrap pointer-events-none"
            >
              {isPlaying ? 'إيقاف النشيد' : 'تشغيل نشيد النادي'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
