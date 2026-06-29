"use client"

import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Plane, Home, Timer, Trophy, Clock3 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

export default function Match({ match }) {
  const [timeLeft, setTimeLeft] = useState('')

  const matchDate = useMemo(() => new Date(match.fixture.date), [match.fixture.date])
  const isFinished = ['FT', 'AET', 'PEN'].includes(match.fixture.status.short)
  const isLive = ['1H', '2H', 'HT', 'ET', 'P'].includes(match.fixture.status.short)
  const isUpcoming = match.fixture.status.short === 'NS'

  const isHome = useMemo(() => {
    return match.teams.home.id === 1040 || 
           match.teams.home.name?.toLowerCase().includes('zamalek') || 
           match.teams.home.name?.includes('الزمالك')
  }, [match.teams.home])

  const opponent = useMemo(() => {
    return isHome ? match.teams.away : match.teams.home
  }, [isHome, match.teams])

  useEffect(() => {
    if (!isUpcoming) return

    const updateCountdown = () => {
      const now = new Date()
      const diff = matchDate - now

      if (diff <= 0) {
        setTimeLeft('قريباً...')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)

      setTimeLeft(`${days > 0 ? days + 'ي ' : ''}${hours}س ${minutes}د`)
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 60000)
    return () => clearInterval(timer)
  }, [isUpcoming, matchDate])

  const highlightText = isLive ? 'الآن مباشرة' : isFinished ? 'النتيجة النهائية' : 'المباراة القادمة'
  const scoreText = isUpcoming ? 'VS' : `${match.goals.home}-${match.goals.away}`

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:border-primary/70 focus-within:border-primary/70"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/15 to-transparent" />
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <Trophy size={18} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">{match.league.name}</p>
              <p className="mt-1 text-xs text-white/50">{match.fixture.status.long}</p>
            </div>
          </div>
          <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
            {highlightText}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_120px_1fr] items-center gap-4">
          <TeamColumn team={match.teams.home} isHome={isHome && match.teams.home.id === 1040} />
          <div className="flex flex-col items-center gap-3">
            <span className="text-4xl font-black tracking-tight text-white">{scoreText}</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/50">{new Intl.DateTimeFormat('ar-EG', { weekday: 'short', day: 'numeric', month: 'short' }).format(matchDate)}</span>
          </div>
          <TeamColumn team={match.teams.away} isHome={!isHome && match.teams.away.id === 1040} />
        </div>

        <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-black/20 p-4 text-sm text-white/80">
          <DetailRow icon={<MapPin size={14} />} label="الملعب" value={match.fixture.venue.name || match.venue || 'غير محدد'} />
          <DetailRow icon={<Clock3 size={14} />} label="التوقيت" value={new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit' }).format(matchDate)} />
          <DetailRow icon={<CalendarDays size={14} />} label="التاريخ" value={new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'short', year: 'numeric' }).format(matchDate)} />
          <DetailRow icon={<Plane size={14} />} label="المكان" value={isHome ? 'داخل الديار' : 'خارج الديار'} />
          <DetailRow icon={<Home size={14} />} label="المنافس" value={opponent.name} />
          {isUpcoming && (
            <DetailRow icon={<Timer size={14} />} label="العد التنازلي" value={timeLeft} />
          )}
        </div>
      </div>
    </motion.div>
  )
}

const TeamColumn = ({ team, isHome }) => (
  <div className="flex flex-col items-center gap-3 text-center">
    <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border border-white/10 bg-white/5">
      <Image src={team.logo || '/zsc.png'} alt={team.name} fill className="object-contain p-2" />
    </div>
    <span className={`max-w-[110px] text-[12px] font-black leading-tight ${isHome ? 'text-primary font-extrabold' : 'text-white/80'}`}>{team.name}</span>
  </div>
)

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-3 text-sm">
    <div className="flex items-center gap-2 text-white/50">{icon}<span>{label}</span></div>
    <span className="font-black text-white/90 text-right">{value}</span>
  </div>
)

