'use client';

import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  MapPin,
  Trophy,
  Clock,
  ChevronRight,
  ChevronLeft,
  X,
  Tv,
  Loader2
} from 'lucide-react';
import useSWR from 'swr';
import axios from 'axios';
import TitleSection from '@/Components/TitleSection';

dayjs.locale('ar');

const fetcher = url => axios.get(url).then(res => res.data);

const matchTypeColors = {
  Home: 'border-primary bg-primary/5 text-primary',
  Away: 'border-foreground bg-foreground/5 text-foreground',
  'Egyptian Cup': 'border-yellow-500 bg-yellow-500/5 text-yellow-600',
  'CAF Champions League': 'border-emerald-500 bg-emerald-500/5 text-emerald-600',
};

export default function FixturesPage() {
  const { data: fixtures, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACK_URL}/api/fixtures`, fetcher);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedMatch, setSelectedMatch] = useState(null);

  const startDay = currentMonth.startOf('month').startOf('week');
  const endDay = currentMonth.endOf('month').endOf('week');

  const days = [];
  let day = startDay;
  while (day.isBefore(endDay) || day.isSame(endDay, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const getMatchesForDate = (d) => {
    if (!fixtures) return [];
    return fixtures.filter((m) => dayjs(m.fixture.date).isSame(d, 'day'));
  };

  const isToday = (d) => dayjs().isSame(d, 'day');

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Failed to load fixtures</div>;
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-background text-foreground pb-24" dir="rtl">
      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 border-b border-border overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <TitleSection
            title="جدول المباريات"
            subtitle="مواعيد ونتائج كافة مواجهات مدرسة الفن والهندسة في جميع المسابقات"
          />

          <div className="flex items-center justify-center gap-6 mt-12 bg-card/50 backdrop-blur-xl border border-border p-2 rounded-2xl w-fit mx-auto shadow-2xl">
            <button
              onClick={() => setCurrentMonth(prev => prev.subtract(1, 'month'))}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted hover:bg-primary hover:text-foreground transition-all"
            >
              <ChevronRight size={20} />
            </button>
            <div className="text-xl font-black font-heading px-8 min-w-[200px] text-center">
              {currentMonth.format('MMMM YYYY')}
            </div>
            <button
              onClick={() => setCurrentMonth(prev => prev.add(1, 'month'))}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted hover:bg-primary hover:text-foreground transition-all"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="bg-card/30 backdrop-blur-md rounded-[3rem] border border-border shadow-2xl overflow-hidden">

          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-border bg-muted/30">
            {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((d) => (
              <div key={d} className="p-6 text-center text-xs font-black uppercase tracking-widest opacity-40">
                {d}
              </div>
            ))}
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7">
            {days.map((d, idx) => {
              const matches = getMatchesForDate(d);
              const inMonth = d.isSame(currentMonth, 'month');
              const cellIsToday = isToday(d);

              return (
                <div
                  key={idx}
                  className={`min-h-[160px] p-4 border-l border-b border-border relative group transition-colors ${!inMonth ? 'bg-muted/5 opacity-30 shadow-inner' : 'hover:bg-primary/[0.02]'
                    } ${idx % 7 === 6 ? 'border-l-0' : ''}`}
                >
                  <div className={`text-sm font-black mb-4 flex items-center justify-center w-8 h-8 rounded-full transition-all ${cellIsToday ? 'bg-primary text-foreground shadow-lg shadow-primary/20' : 'opacity-40'
                    }`}>
                    {d.format('D')}
                  </div>

                  <div className="space-y-2">
                    {matches.map((m, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMatch(m)}
                        className={`w-full p-2.5 rounded-xl border text-[10px] font-bold text-center transition-all shadow-sm ${m.teams.home.id === 1040 ? matchTypeColors.Home : matchTypeColors.Away
                          }`}
                      >
                        <div className="flex items-center justify-center gap-1.5 mb-1 opacity-60">
                          <Trophy size={10} />
                          {m.league.name}
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="truncate">{m.teams.home.id === 1040 ? m.teams.away.name : m.teams.home.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend Panel */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 bg-card rounded-[2rem] border border-border p-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">مباراة في ملعبنا</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-foreground" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">مباراة خارج أرضنا</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">كأس مصر</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">البطولات الإفريقية</span>
          </div>
        </div>
      </section>

      {/* Match Details Modal */}
      <AnimatePresence>
        {selectedMatch && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-8">
            {/* الخلفية المظلمة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMatch(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              layoutId={`match-modal-${selectedMatch.id}`}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              /* التعديلات هنا لضمان التمرير والاحتواء */
              className="relative w-full max-w-4xl bg-card rounded-[2.5rem] md:rounded-[3rem] border border-border shadow-[0_32px_128px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[95vh] scrollbar-hide"
            >
              {/* التدرج اللوني في الخلفية */}
              <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

              {/* زر الإغلاق - Sticky لسهولة الاستخدام */}
              <button
                onClick={() => setSelectedMatch(null)}
                className="sticky md:absolute top-6 left-6 w-12 h-12 rounded-full bg-muted/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-foreground transition-all z-50 shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="relative p-6 md:p-16">

                {/* شارة البطولة والوقت */}
                <div className="flex flex-col items-center mb-8 md:mb-12">
                  <div className="px-6 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4">
                    {selectedMatch.league.name}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-40">
                    <CalendarIcon size={14} />
                    <span>{dayjs(selectedMatch.fixture.date).format('dddd, D MMMM YYYY')}</span>
                  </div>
                </div>

                {/* شبكة النتيجة والفرق - جعلناها Flex-Col في الموبايل */}
                <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-8 mb-12 md:mb-16">

                  {/* الفريق 1 (الزمالك أو الخصم لو الزمالك ضيف) */}
                  <div className="flex flex-row md:flex-col items-center gap-4 md:gap-6 w-full md:w-auto justify-center">
                    <div className="relative w-20 h-20 md:w-40 md:h-40 p-3 rounded-full bg-foreground shadow-xl flex-shrink-0">
                      <Image src={selectedMatch.teams.home.logo} alt={selectedMatch.teams.home.name} fill className="object-contain p-4" />
                    </div>
                    <h3 className={`text-xl md:text-3xl font-black font-heading ${selectedMatch.teams.home.id === 1040 ? 'text-primary' : ''}`}>{selectedMatch.teams.home.name}</h3>
                  </div>

                  {/* VS Card / النتيجة */}
                  <div className="flex flex-col items-center order-first md:order-none mb-4 md:mb-0">
                    {['FT', 'AET', 'PEN'].includes(selectedMatch.fixture.status.short) ? (
                      <div className="flex items-center gap-4">
                        <span className="text-6xl md:text-8xl font-black font-heading tracking-tighter">
                          {selectedMatch.goals.home}
                        </span>
                        <span className="text-2xl font-black opacity-20">-</span>
                        <span className="text-6xl md:text-8xl font-black font-heading tracking-tighter">
                          {selectedMatch.goals.away}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2 md:mb-6">{selectedMatch.fixture.status.long}</div>
                        <div className="text-5xl md:text-7xl font-black font-heading tracking-tighter text-primary">
                          {dayjs(selectedMatch.fixture.date).format('HH:mm')}
                        </div>
                      </div>
                    )}

                    {['1H', '2H', 'HT', 'ET', 'P'].includes(selectedMatch.fixture.status.short) && (
                      <div className="mt-4 flex items-center gap-2 bg-red-600 px-4 py-1.5 rounded-full text-foreground text-[10px] font-black animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        مباشر الآن
                      </div>
                    )}
                  </div>

                  {/* الفريق 2 (الخصم أو الزمالك) */}
                  <div className="flex flex-row-reverse md:flex-col items-center gap-4 md:gap-6 w-full md:w-auto justify-center">
                    <div className="relative w-20 h-20 md:w-40 md:h-40 p-3 rounded-full bg-foreground shadow-xl flex-shrink-0">
                      <Image src={selectedMatch.teams.away.logo} alt={selectedMatch.teams.away.name} fill className="object-contain p-4" />
                    </div>
                    <h3 className={`text-xl md:text-3xl font-black font-heading text-center ${selectedMatch.teams.away.id === 1040 ? 'text-primary' : ''}`}>{selectedMatch.teams.away.name}</h3>
                  </div>
                </div>

                {/* شبكة معلومات المباراة - Grid Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-12 border-t border-border">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                    <MapPin size={20} className="text-primary flex-shrink-0" />
                    <div>
                      <div className="text-[9px] font-black uppercase opacity-40">الملعب</div>
                      <div className="font-bold text-sm md:text-base">{selectedMatch.fixture.venue.name || "ستاد القاهرة الدولي"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                    <Clock size={20} className="text-primary flex-shrink-0" />
                    <div>
                      <div className="text-[9px] font-black uppercase opacity-40">التوقيت</div>
                      <div className="font-bold text-sm">بتوقيت القاهرة</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                    <Tv size={20} className="text-primary flex-shrink-0" />
                    <div>
                      <div className="text-[9px] font-black uppercase opacity-40">القنوات الناقلة</div>
                      <div className="font-bold text-sm md:text-base">أون تايم سبورتس</div>
                    </div>
                  </div>
                </div>

                {/* Match Statistics - New Section */}
                {selectedMatch.fixture.status.short !== 'NS' && (
                  <div className="mt-12 pt-12 border-t border-border">
                    <h4 className="text-xl font-black font-heading mb-8 text-center italic">إحصائيات المباراة</h4>
                    <MatchStats fixtureId={selectedMatch.fixture.id} />
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MatchStats({ fixtureId }) {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACK_URL}/api/fixtures/stats/${fixtureId}`, fetcher);

  if (isLoading) return <div className="text-center py-4"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>;
  if (error || !data || data.length === 0) return <div className="text-center opacity-40 text-xs">لا تتوفر إحصائيات لهذه المباراة حالياً</div>;

  const homeStats = data[0]?.statistics || [];
  const awayStats = data[1]?.statistics || [];

  const statsToShow = [
    'Ball Possession',
    'Total Shots',
    'Shots on Goal',
    'Corner Kicks',
    'Offsides',
    'Fouls',
  ];

  return (
    <div className="space-y-6">
      {statsToShow.map((statName) => {
        const homeStat = homeStats.find(s => s.type === statName);
        const awayStat = awayStats.find(s => s.type === statName);

        if (!homeStat && !awayStat) return null;

        const homeVal = parseInt(homeStat?.value) || 0;
        const awayVal = parseInt(awayStat?.value) || 0;
        const total = homeVal + awayVal || 1;
        const homePerc = (homeVal / total) * 100;

        return (
          <div key={statName} className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest px-1">
              <span>{homeStat?.value || 0}</span>
              <span className="opacity-40">{statName === 'Ball Possession' ? 'الاستحواذ' : statName === 'Total Shots' ? 'إجمالي التسديدات' : statName === 'Shots on Goal' ? 'تسديدات على المرمى' : statName === 'Corner Kicks' ? 'ركنيات' : statName === 'Offsides' ? 'تسلل' : statName}</span>
              <span>{awayStat?.value || 0}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden flex">
              <div
                className="h-full bg-primary transition-all duration-1000 ease-out"
                style={{ width: `${homePerc}%` }}
              />
              <div
                className="h-full bg-foreground transition-all duration-1000 ease-out"
                style={{ width: `${100 - homePerc}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
