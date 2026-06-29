'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ZamalekStoreBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-r from-red-700 to-red-500 text-foreground py-6 px-4 flex items-center justify-center md:justify-between gap-4"
    >
      {/* شعار النادي */}
      <div className="flex items-center gap-3">
        <Image
          src="/zsc.png"
          alt="Zamalek Logo"
          width={60}
          height={60}
          className="drop-shadow-lg"
        />
        <span className="hidden md:block font-bold text-lg tracking-wide">
          Zamalek SC
        </span>
      </div>

      {/* النص */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-extrabold text-center"
      >
        🛒 Zamalek Club Store <span className="text-yellow-300">Coming Soon</span>
      </motion.h2>

      {/* زر اختياري */}
      <div className="hidden md:block">
        <button className="bg-foreground text-red-700 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
          Learn More
        </button>
      </div>
    </motion.div>
  )
}
