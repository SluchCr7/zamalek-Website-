'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 w-full">
      {/* bg-gradient-to-b from-foreground via-gray-100 to-gray-200 */}
      {/* شعار الزمالك */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/zsc.png" // ضع رابط أو مسار الشعار
          alt="Zamalek Logo"
          width={200}
          height={200}
          className="drop-shadow-lg"
        />
      </motion.div>

      {/* عبارة تعريفية */}
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 text-xl md:text-2xl font-semibold text-red-700"
      >
        أكبر قلعة رياضية في مصر
      </motion.h2>

      {/* رسالة الخطأ */}
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-5xl md:text-7xl font-extrabold text-red-600"
      >
        404
      </motion.h1>
      <p className="mt-2 text-lg md:text-xl text-gray-500">
        عذرًا، الصفحة التي تبحث عنها غير موجودة
      </p>

      {/* زر العودة */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="/"
          className="mt-6 inline-block bg-red-700 text-foreground px-6 py-3 rounded-full text-lg shadow-md hover:bg-red-800 transition duration-300"
        >
          العودة للصفحة الرئيسية
        </Link>
      </motion.div>

    </div>
  )
}
