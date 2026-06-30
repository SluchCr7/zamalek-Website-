'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import axios from 'axios'
import { ChevronLeft, ChevronRight, Loader2, Calendar, MapPin, Award } from 'lucide-react'
import Link from 'next/link'
import Match from './Match'

const fetcher = url => axios.get(url).then(res => res.data)

export default function MatchesSlider() {
  const { data: fixtures, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACK_URL}/api/fixtures`, fetcher)
  const [current, setCurrent] = useState(0)

  const displayFixtures = useMemo(() => fixtures?.slice(0, 8) || [], [fixtures])
  const total = displayFixtures.length
  const activeMatch = displayFixtures[current]

  const nextSlide = () => {
    if (!total) return
    setCurrent((prev) => (prev + 1) % total)
  }

  const prevSlide = () => {
    if (!total) return
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1))
  }

  if (error) return <div className="py-16 text-center text-red-500 font-medium">فشل تحميل المباريات. يرجى المحاولة لاحقاً.</div>
  
  if (isLoading || !total) return (
    <div className="py-24 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  )

  // تنسيق التاريخ والوقت للمباراة الحالية
  const matchDate = activeMatch ? new Date(activeMatch.fixture.date).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'short' }) : ''
  const matchTime = activeMatch ? new Date(activeMatch.fixture.date).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : ''

  return (
    <section className="py-16 bg-[#0B0B0C] text-white overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl relative">
        
        {/* الهيدر أو عنوان القسم */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-white/5 pb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full inline-block" />
              مباريات <span className="text-primary">الزمالك</span>
            </h2>
            <p className="text-xs text-white/50 mt-1">تابع آخر وأحدث مواجهات الفارس الأبيض أولاً بأول</p>
          </div>
          
          {/* عداد السلايدر والتحكم */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <span className="text-xs font-mono text-white/40">
              <strong className="text-white text-sm">{current + 1}</strong> / {total}
            </span>
            <div className="flex gap-1.5">
              <button 
                onClick={prevSlide}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-primary transition-colors duration-200"
                aria-label="المباراة السابقة"
              >
                <ChevronRight size={18} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-primary transition-colors duration-200"
                aria-label="المباراة التالية"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* عرض السلايدر الاحترافي البسيط */}
        <div className="relative min-h-[380px] md:min-h-[320px] flex flex-col justify-between gap-6 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur-md">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 w-full"
            >
              {/* المكون الفرعي لعرض الفريقين والنتيجة */}
              <div className="md:col-span-3 flex justify-center py-2">
                <div className="w-full max-w-[500px]">
                  <Match match={activeMatch} />
                </div>
              </div>

              {/* تفاصيل إضافية سريعة ومبسطة أسفل كرت المباراة */}
              <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.05] text-xs text-white/70">
                <div className="flex items-center gap-2 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                  <Calendar size={15} className="text-primary shrink-0" />
                  <span className="truncate">{matchDate} - {matchTime}</span>
                </div>
                
                <div className="flex items-center gap-2 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                  <MapPin size={15} className="text-primary shrink-0" />
                  <span className="truncate">{activeMatch?.fixture?.venue?.name || 'ملعب المباراة'}</span>
                </div>

                <div className="flex items-center gap-2 col-span-2 sm:col-span-1 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                  <Award size={15} className="text-primary shrink-0" />
                  <span className="truncate">{activeMatch?.league?.name || 'بطولة رسمية'}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* زر الانتقال لجميع المباريات بلمسة أنيقة */}
        <div className="mt-8 text-center">
          <Link 
            href="/Pages/Fixtures" 
            className="inline-flex items-center justify-center text-xs font-semibold text-white/60 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-full px-6 py-2.5 transition-all duration-200"
          >
            عرض جدول المباريات بالكامل
          </Link>
        </div>

      </div>
    </section>
  )
}