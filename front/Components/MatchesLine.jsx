'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import axios from 'axios'
import Match from './Match'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

const fetcher = url => axios.get(url).then(res => res.data)

export default function MatchesSlider() {
  const { data: fixtures, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACK_URL}/api/fixtures`, fetcher)
  const [current, setCurrent] = useState(0)

  const displayFixtures = useMemo(() => fixtures?.slice(0, 8) || [], [fixtures])
  const total = displayFixtures.length
  const activeMatch = displayFixtures[current]

  const nextSlide = () => {
    if (!displayFixtures.length) return
    setCurrent((prev) => (prev + 1) % total)
  }

  const prevSlide = () => {
    if (!displayFixtures.length) return
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1))
  }

  if (error) return <div className="py-24 text-center text-red-500 font-bold">فشل تحميل المباريات</div>
  if (isLoading || !displayFixtures.length) return (
    <div className="py-24 flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  )

  return (
    <section className="relative py-24 overflow-hidden bg-[#070707] text-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-primary/10 blur-3xl" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" dir="rtl">
          <div>
            <div className="flex items-center gap-2 text-primary mb-3">
              <span className="h-1.5 w-12 rounded-full bg-primary" />
              <span className="text-sm font-black uppercase tracking-[0.2em]">ملخص المباريات</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">مباريات <span className="text-primary">الزمالك</span></h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70">عرض احترافي وسلس للمباريات المقبلة والماضية مع تفاصيل سريعة، حالة المباراة وتوقيت الانطلاق.</p>
          </div>

          <div className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-white/70">
            <span>{current + 1}</span>
            <span className="text-primary">/</span>
            <span>{total}</span>
            <span className="hidden sm:inline">مبارات مسجلة</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="relative z-10 h-[520px]">
              {displayFixtures.map((match, index) => {
                const offset = index - current
                let positionX = offset * 480
                if (current === 0 && index === total - 1) positionX = -480
                if (current === total - 1 && index === 0) positionX = 480

                const isVisible = Math.abs(offset) <= 2 || positionX === 0

                return (
                  <motion.div
                    key={match.fixture.id || index}
                    initial={false}
                    animate={{
                      x: positionX,
                      opacity: isVisible ? 1 : 0,
                      scale: offset === 0 ? 1 : 0.85,
                      filter: offset === 0 ? 'blur(0px)' : 'blur(2px)',
                    }}
                    transition={{ type: 'spring', damping: 22, stiffness: 120 }}
                    className="absolute inset-0 flex justify-center px-4"
                  >
                    <div className="w-full max-w-[460px]">
                      <Match match={match} />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="absolute inset-x-0 top-1/2 z-20 mx-auto flex w-full max-w-[calc(100%-2rem)] items-center justify-between px-4 pointer-events-none">
              <button
                onClick={prevSlide}
                aria-label="المباراة السابقة"
                className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition hover:bg-primary/90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronRight size={22} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="المباراة التالية"
                className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition hover:bg-primary/90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft size={22} />
              </button>
            </div>
          </div>

          <div className="space-y-6" aria-live="polite">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/50">تفاصيل المباراة الحالية</p>
                  <h3 className="mt-3 text-2xl font-black">{activeMatch?.league?.name || 'منافسة رسمية'}</h3>
                </div>
                <span className="rounded-full bg-primary/15 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-primary">{activeMatch?.fixture?.status?.long || 'قريباً'}</span>
              </div>

              <div className="grid gap-4">
                <DetailLine label="الملعب" value={activeMatch?.fixture?.venue?.name || activeMatch?.venue || 'غير معروف'} />
                <DetailLine label="المدينة" value={activeMatch?.fixture?.venue?.city || activeMatch?.city || 'غير معروف'} />
                <DetailLine label="التاريخ" value={activeMatch ? new Date(activeMatch.fixture.date).toLocaleDateString('ar-EG', { weekday: 'short', day: 'numeric', month: 'short' }) : '—'} />
                <DetailLine label="الوقت" value={activeMatch ? new Date(activeMatch.fixture.date).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) : '—'} />
                <DetailLine label="حكم المباراة" value={activeMatch?.referee || '—'} />
                <DetailLine label="نوع المباراة" value={activeMatch?.fixture?.referee ? (activeMatch?.fixture?.status?.short === 'NS' ? 'مباراة قادمة' : 'جارية / منتهية') : activeMatch?.matchType || '—'} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard label="النتيجة" value={activeMatch?.goals ? `${activeMatch.goals.home}-${activeMatch.goals.away}` : 'VS'} />
              <StatCard label="المباراة" value={activeMatch?.teams?.home?.name ? `${activeMatch.teams.home.name} ضد ${activeMatch.teams.away.name}` : '—'} />
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">انتقل لمعرفة المزيد</p>
              <Link href="/Pages/Fixtures" className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white hover:bg-primary-hover transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                عرض كافة المباريات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const DetailLine = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80">
    <span className="text-white/60">{label}</span>
    <span className="font-black text-white">{value}</span>
  </div>
)

const StatCard = ({ label, value }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
    <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">{label}</div>
    <div className="mt-3 text-3xl font-black text-white">{value}</div>
  </div>
)
