"use client"

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

export default function Match({ match }) {
  const [timeLeft, setTimeLeft] = useState('')

  const matchDate = useMemo(() => new Date(match.fixture.date), [match.fixture.date])
  const isFinished = ['FT', 'AET', 'PEN'].includes(match.fixture.status.short)
  const isLive = ['1H', '2H', 'HT', 'ET', 'P'].includes(match.fixture.status.short)
  const isUpcoming = match.fixture.status.short === 'NS'

  // التحقق من أن الزمالك هو صاحب الأرض
  const isHome = useMemo(() => {
    return match.teams.home.id === 1040 || 
           match.teams.home.name?.toLowerCase().includes('zamalek') || 
           match.teams.home.name?.includes('الزمالك')
  }, [match.teams.home])

  // حساب وقت العد التنازلي
  useEffect(() => {
    if (!isUpcoming) return

    const updateCountdown = () => {
      const now = new Date()
      const diff = matchDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft('بدأت الآن')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)

      setTimeLeft(`${days > 0 ? days + ' يوم و ' : ''}${hours}س : ${minutes}د`)
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 60000)
    return () => clearInterval(timer)
  }, [isUpcoming, matchDate])

  // حالة المباراة والشارة العلوية
  const statusBadge = useMemo(() => {
    if (isLive) return { text: 'مباشر الآن', bg: 'bg-red-500/10 text-red-400 border-red-500/20' }
    if (isFinished) return { text: 'انتهت', bg: 'bg-white/5 text-white/60 border-white/10' }
    return { text: 'مباراة قادمة', bg: 'bg-primary/10 text-primary border-primary/20' }
  }, [isLive, isFinished])

  return (
    <div className="w-full flex flex-col items-center justify-center text-white" dir="rtl">
      
      {/* شارة حالة المباراة العلوية */}
      <div className={`mb-6 rounded-full border px-4 py-1 text-[11px] font-bold tracking-wide ${statusBadge.bg}`}>
        {statusBadge.text}
      </div>

      {/* منطقة التنافس الرئيسية */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-8 w-full max-w-[480px]">
        
        {/* الفريق صاحب الأرض */}
        <TeamDisplay team={match.teams.home} isZamalek={isHome} />

        {/* سكور النتيجة أو التوقيت المنتصف */}
        <div className="flex flex-col items-center justify-center min-w-[90px] text-center">
          {isUpcoming ? (
            <span className="text-2xl font-black text-white/30 tracking-widest">VS</span>
          ) : (
            <div className="flex items-center gap-2 text-3xl font-black font-mono tracking-tight" dir="ltr">
              <span className={isHome ? "text-primary" : "text-white"}>{match.goals.home}</span>
              <span className="text-white/20">-</span>
              <span className={!isHome ? "text-primary" : "text-white"}>{match.goals.away}</span>
            </div>
          )}
          
          {/* تفاصيل متممة صغيرة أسفل النتيجة */}
          <span className="text-[10px] text-white/40 mt-2 font-medium">
            {match.fixture.status.short === 'HT' ? 'استراحة' : match.fixture.status.long}
          </span>
        </div>

        {/* الفريق الضيف */}
        <TeamDisplay team={match.teams.away} isZamalek={!isHome} />
        
      </div>

      {/* شريط العداد التنازلي البسيط بالأسفل في حال كانت مواجهة قادمة */}
      {isUpcoming && timeLeft && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-xs text-white/50 font-medium bg-white/[0.02] border border-white/[0.05] rounded-full px-4 py-1.5 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>تنطلق خلال: <strong>{timeLeft}</strong></span>
        </motion.div>
      )}

    </div>
  )
}

// مكون فرعي مرن لعرض شعار واسم كل فريق
const TeamDisplay = ({ team, isZamalek }) => (
  <div className="flex flex-col items-center gap-3 text-center flex-1">
    <div className={`relative h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border transition-all duration-300 p-2.5 flex items-center justify-center ${isZamalek ? 'border-primary/40 bg-primary/[0.02] shadow-lg shadow-primary/5' : 'border-white/5'}`}>
      <div className="relative w-full h-full">
        <Image 
          src={team.logo || '/zsc.png'} 
          alt={team.name} 
          fill 
          sizes="(max-w-768px) 64px, 80px"
          className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]" 
        />
      </div>
    </div>
    <span className={`text-xs md:text-sm font-bold leading-tight max-w-[120px] line-clamp-2 ${isZamalek ? 'text-primary font-black' : 'text-white/80'}`}>
      {team.name}
    </span>
  </div>
)