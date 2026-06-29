'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TitleSection = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-right'}`} dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <span className="w-12 h-1 bg-primary rounded-full mb-6" />
        <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tighter mb-4 text-foreground transition-colors">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-lg font-bold opacity-60 max-w-2xl leading-relaxed text-foreground transition-colors">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default TitleSection;