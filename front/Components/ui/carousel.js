"use client";

import { useState, useRef, useId, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, LayoutGrid } from "lucide-react";

const Slide = ({ slide, index, current, handleSlideClick }) => {
  const slideRef = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const { src, title, category } = slide;
  const isActive = current === index;

  return (
    <motion.li
      ref={slideRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: isActive ? 1 : 0.9,
        rotateY: isActive ? 0 : index < current ? 15 : -15
      }}
      className="flex-none w-[300px] md:w-[450px] relative aspect-[16/10] group cursor-pointer transition-all duration-700 ease-out preserve-3d"
      onClick={() => handleSlideClick(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-border shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transform: isActive ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)" : "none",
          }}
        >
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-black/40 transition-colors" />
        </div>

        {/* Slide Info */}
        <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500" dir="rtl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="text-primary font-black text-[10px] uppercase tracking-tighter">{category || "فريق"}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-foreground font-heading leading-tight">{title}</h3>
        </div>
      </div>
    </motion.li>
  );
};

export function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const [step, setStep] = useState(474); // Default step for md+ screens

  useEffect(() => {
    const handleResize = () => {
      const width = trackRef.current?.offsetWidth || 0;
      if (window.innerWidth < 768) {
        setStep(316); // 300px width + 16px gap
      } else {
        setStep(474); // 450px width + 24px gap
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMove = (dir) => {
    if (dir === 'next') {
      setCurrent(prev => (prev + 1) % slides.length);
    } else {
      setCurrent(prev => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
    }
  };

  return (
    <div className="relative w-full py-12">
      <div className="overflow-visible md:overflow-hidden px-4 md:px-0">
        <motion.ul
          ref={trackRef}
          animate={{ x: -current * step }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="flex gap-4 md:gap-6"
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={setCurrent}
            />
          ))}
        </motion.ul>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-8 mt-16">
        <button
          onClick={() => handleMove('prev')}
          className="w-14 h-14 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-foreground transition-all shadow-xl"
        >
          <ChevronRight size={24} />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? "w-12 bg-primary" : "w-1.5 bg-border"
                }`}
            />
          ))}
        </div>

        <button
          onClick={() => handleMove('next')}
          className="w-14 h-14 rounded-full border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-foreground transition-all shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
    </div>
  );
}
