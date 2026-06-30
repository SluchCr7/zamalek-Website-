'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu, X, ChevronDown, Search, Moon, Sun, User, ShoppingBag,
  Calendar, Trophy, Users, Building2, History, TvMinimal, Award,
  Dumbbell, Volleyball, Target, Sparkles, Activity, ArrowLeftRight,
  ExternalLink, Ticket, Radio, ChevronLeft, Flame
} from 'lucide-react';
import { CiBasketball } from "react-icons/ci";
import { AnimatePresence, motion } from 'framer-motion';
import { MdEdit } from "react-icons/md";
import { useAuth } from '@/app/hooks/useAuth';
import { useTheme } from '@/app/hooks/useThemeHook';

const LINKS = [
  { id: 1, title: 'الرئيسية', url: '/', icon: Sparkles },
  { id: 2, title: 'الأخبار', url: '/Pages/News', icon: Award },
  {
    id: 3,
    title: 'الفرق الرياضية',
    url: '#',
    icon: Users,
    sublinks: [
      { id: 31, title: 'الفريق الأول لكرة القدم', url: '/players', icon: Dumbbell, desc: "أبطال القارة والفارس الأبيض الأول." },
      { id: 32, title: 'فريق كرة السلة', url: '/Pages/Players/Basketball', icon: CiBasketball, desc: "عمالقة السلة وملوك الصالات." },
      { id: 33, title: 'فريق الكرة الطائرة', url: '/Pages/Players/Volleyball', icon: Volleyball, desc: "أسياد الشبكة محلياً وقارياً." },
      { id: 34, title: 'فريق كرة اليد', url: '/Pages/Players/Handball', icon: Target, desc: "الكوماندوز ملوك إفريقيا." },
      { id: 35, title: 'قطاع فرق السيدات', url: '/Pages/Players/Women', icon: Users, desc: "بطلات الزمالك في كافة الألعاب." },
    ],
    featured: {
      title: "قائمة الفرسان البيضاء",
      desc: "استعرض نجوم وتشكيلة نادي الزمالك للموسم الحالي.",
      url: "/players",
      tag: "تشكيلة 2026"
    }
  },
  {
    id: 4,
    title: 'عن النادي',
    url: '#',
    icon: Building2,
    sublinks: [
      { id: 41, title: 'تاريخ القلعة البيضاء', url: '/Pages/About', icon: History, desc: "مسيرة عريقة بدأت منذ عام 1911." },
      { id: 42, title: 'سجل البطولات الذهبي', url: '/Pages/Champions', icon: Trophy, desc: "خزينة الألقاب الكروية والقارية." },
      { id: 43, title: 'مجلس الإدارة', url: '/Pages/Directors', icon: Building2, desc: "قيادة نادي الزمالك للألعاب الرياضية." },
      { id: 44, title: 'رؤساء النادي التاريخيون', url: '/Pages/Presidents', icon: Award, desc: "السجل الإداري العريق عبر العصور." },
      { id: 45, title: 'المتحف الملكي', url: '/Pages/Measum', icon: Building2, desc: "معرض الكؤوس والمقتنيات النادرة." },
      { id: 46, title: 'بث قناة الزمالك', url: '/Pages/ZamalekTV', icon: TvMinimal, desc: "المنبر والصوت الرسمي للقلعة البيضاء." },
    ],
    featured: {
      title: "متحف البطولات الملكي",
      desc: "جولة افتراضية في تاريخ 115 عاماً من الأمجاد.",
      url: "/Pages/Measum",
      tag: "تاريخ 1911"
    }
  },
  { id: 5, title: 'المباريات', url: '/Pages/Fixtures', icon: Calendar },
  { id: 6, title: 'جدول الترتيب', url: '/Pages/Table', icon: Trophy },
  { id: 7, title: 'المركز المباشر', url: '/Pages/LiveCenter', icon: Activity, isLive: true },
  { id: 8, title: 'الانتقالات', url: '/Pages/Transfers', icon: ArrowLeftRight },
];

const SEARCH_TAGS = [
  'الصفقات الجديدة', 'الفريق الأول', 'جدول الدوري', 'قميص الزمالك 2026', 'كرة اليد', 'قناة الزمالك', 'تذاكر المباراة'
];

export default function Nav({ openModalAll, setOpenModalAll }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setIsOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => { searchInputRef.current.focus(); }, 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (isOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, searchOpen]);

  return (
    <>
      {/* Dynamic Top Announcement Bar */}
      <div 
        dir="rtl" 
        className={`fixed top-0 left-0 right-0 z-[101] bg-zinc-950 text-white text-xs py-2.5 px-4 border-b border-white/10 transition-transform duration-500 font-heading h-9 ${
          scrolled ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40 text-[11px] font-black shrink-0">
              <Flame size={12} className="animate-pulse" />
              تنويه هام
            </span>
            <p className="truncate font-semibold text-white/80 text-[11px] sm:text-xs">
              🏆 المباراة القادمة: <span className="text-white font-bold">الزمالك vs الأهلي</span> - الجمعة 8:00 مساءً | استاد القاهرة الدولي
            </p>
          </div>

          <div className="hidden md:flex items-center gap-5 text-white/70 font-medium text-[11px] shrink-0">
            <Link href="/Pages/ZamalekTV" className="hover:text-primary transition-colors flex items-center gap-1">
              <Radio size={13} className="text-primary" />
              <span>البث المباشر للقناة</span>
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a href="https://tazkarti.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
              <Ticket size={13} className="text-amber-400" />
              <span>حجز التذاكر</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/Pages/Store" className="hover:text-primary transition-colors flex items-center gap-1">
              <ShoppingBag size={13} className="text-emerald-400" />
              <span>المتجر الرسمي</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav
        dir="rtl"
        aria-label="الملاحة الرئيسية"
        className={`fixed w-full left-0 right-0 z-[100] transition-all duration-500 font-heading ${
          scrolled
            ? 'top-0 py-3 bg-background/90 backdrop-blur-md border-b border-border shadow-lg'
            : 'top-9 py-4 bg-background/40 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        {/* Zamalek Royal Red Accent Glow Lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] flex pointer-events-none">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-primary shadow-[0_0_12px_rgba(227,27,35,1)]" />
          <div className="h-full w-1/2 bg-gradient-to-l from-transparent via-primary to-primary shadow-[0_0_12px_rgba(227,27,35,1)]" />
        </div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between w-full relative">
            
            {/* Brand Logo & Title */}
            <Link href="/" className="flex items-center gap-3.5 group relative z-10 focus-visible:outline-none" aria-label="الصفحة الرئيسية لنادي الزمالك">
              <div className="relative w-12 h-12 md:w-14 md:h-14 transition-all duration-500 group-hover:scale-105 drop-shadow-xl">
                <Image src="/zsc.png" alt="شعار نادي الزمالك" fill className="object-contain" priority />
                <div className="absolute inset-0 bg-primary/25 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex flex-col relative justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-xl font-black leading-none tracking-tight text-foreground group-hover:text-primary transition-colors">
                    ZAMALEK SC
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
                    1911
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-3 h-px bg-primary" />
                  <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.25em] text-foreground/60">
                    نادي القرن الحقيقي
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Center Menu Links */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2" role="menubar">
              {LINKS.map((link) => {
                const isHovered = activeDropdown === link.id;
                return (
                  <div
                    key={link.id}
                    className="relative group py-1"
                    role="none"
                    onMouseEnter={() => setActiveDropdown(link.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.url}
                      role="menuitem"
                      aria-haspopup={link.sublinks ? 'true' : 'false'}
                      aria-expanded={isHovered}
                      className={`px-3 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isHovered ? 'text-primary' : 'text-foreground/90 hover:text-foreground'
                      }`}
                    >
                      {isHovered && (
                        <motion.div
                          layoutId="navHoverPill"
                          className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5 tracking-wide">
                        {link.title}
                        {link.isLive && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                          </span>
                        )}
                      </span>
                      {link.sublinks && (
                        <ChevronDown 
                          size={13} 
                          className={`relative z-10 transition-transform duration-300 ${isHovered ? 'rotate-180 text-primary' : 'text-foreground/40'}`} 
                        />
                      )}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {link.sublinks && isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="absolute top-full right-1/2 translate-x-1/2 mt-3 w-[620px] bg-background/95 backdrop-blur-3xl border border-border rounded-3xl shadow-2xl overflow-hidden"
                          role="menu"
                        >
                          <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                          <div className="p-6 grid grid-cols-12 gap-6">
                            <div className="col-span-7 grid grid-cols-1 gap-1.5">
                              {link.sublinks.map((sublink, idx) => {
                                const SubIcon = sublink.icon;
                                return (
                                  <motion.div
                                    key={sublink.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.04 }}
                                    role="none"
                                  >
                                    <Link
                                      href={sublink.url}
                                      role="menuitem"
                                      className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all group/item focus-visible:outline-none"
                                    >
                                      <div className="w-9 h-9 shrink-0 rounded-xl bg-foreground/5 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all text-foreground/70">
                                        {SubIcon && <SubIcon size={18} />}
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors">
                                          {sublink.title}
                                        </span>
                                        <span className="text-[11px] text-foreground/50 font-medium leading-snug">{sublink.desc}</span>
                                      </div>
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>

                            {link.featured && (
                              <div className="col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-background border border-primary/20 relative overflow-hidden group/feat">
                                <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover/feat:scale-150 transition-transform duration-700" />
                                <div>
                                  <span className="inline-block px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase mb-3">
                                    {link.featured.tag}
                                  </span>
                                  <h4 className="text-sm font-black text-foreground mb-1 group-hover/feat:text-primary transition-colors">
                                    {link.featured.title}
                                  </h4>
                                  <p className="text-xs text-foreground/60 leading-relaxed font-semibold">
                                    {link.featured.desc}
                                  </p>
                                </div>
                                <Link
                                  href={link.featured.url}
                                  className="mt-4 inline-flex items-center gap-2 text-xs font-black text-primary hover:underline group-hover/feat:translate-x-[-4px] transition-transform"
                                >
                                  <span>استكشف المزيد</span>
                                  <ChevronLeft size={14} />
                                </Link>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Desktop Action Controls */}
            <div className="flex items-center gap-2 z-10">
              {/* Store Button */}
              <Link
                href="/Pages/Store"
                className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-black transition-all hover:scale-105 shadow-md shadow-primary/20"
              >
                <ShoppingBag size={14} />
                <span>المتجر الرسمي</span>
              </Link>
              
              {/* Search Trigger */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground text-xs font-bold cursor-pointer"
              >
                <Search size={14} />
                <span className="hidden md:inline text-foreground/60">بحث...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-foreground/10 text-foreground/50">
                  Ctrl+K
                </kbd>
              </motion.button>

              {/* Theme Switcher */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <Sun size={15} className="text-amber-400 drop-shadow-sm" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Moon size={15} className="text-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Avatar */}
              {user ? (
                <div className="flex items-center gap-2">
                  <Link href="/Pages/Profile" className="relative block rounded-full p-0.5 border-2 border-primary/50 hover:border-primary transition-all">
                    <Image
                      src={user?.profilePhoto?.url || '/zsc.png'}
                      alt='الملف الشخصي'
                      width={32}
                      height={32}
                      className='rounded-full object-cover aspect-square'
                    />
                  </Link>
                  {user?.isAdmin && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setOpenModalAll(true)}
                      className="p-2 text-red-500 bg-red-500/10 hover:bg-primary hover:text-white rounded-full transition-all cursor-pointer"
                    >
                      <MdEdit size={14} />
                    </motion.button>
                  )}
                </div>
              ) : (
                <Link href="/Pages/Login" className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground">
                  <User size={15} />
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 rounded-full bg-primary text-white shadow-md cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 z-[105] bg-black/70 backdrop-blur-md lg:hidden" />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-[110] w-full max-w-[85%] sm:max-w-md bg-background border-l border-border shadow-2xl lg:hidden flex flex-col"
              dir="rtl"
            >
              <div className="p-5 flex items-center justify-between border-b border-border bg-foreground/5">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <div className="relative w-9 h-9">
                    <Image src="/zsc.png" alt="ZSC شعار" fill className="object-contain" />
                  </div>
                  <div>
                    <div className="text-base font-black text-foreground">ZAMALEK SC</div>
                    <div className="text-[10px] font-bold text-primary">القلعة البيضاء</div>
                  </div>
                </Link>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-foreground/10 text-foreground hover:bg-primary hover:text-white transition-all">
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {LINKS.map((link) => {
                  const isExpanded = mobileExpanded === link.id;
                  return (
                    <div key={link.id} className="rounded-xl border border-border bg-card/50 overflow-hidden">
                      <div className="flex items-center justify-between p-3">
                        <Link
                          href={link.url}
                          onClick={() => !link.sublinks && setIsOpen(false)}
                          className="flex items-center gap-2.5 text-foreground font-black text-xs hover:text-primary transition-colors flex-1"
                        >
                          {link.icon && <link.icon size={16} className="text-primary" />}
                          <span>{link.title}</span>
                          {link.isLive && (
                            <span className="flex h-1.5 w-1.5 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                            </span>
                          )}
                        </Link>
                        {link.sublinks && (
                          <button onClick={() => setMobileExpanded(isExpanded ? null : link.id)} className="p-1.5 text-foreground/60 rounded-lg">
                            <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                          </button>
                        )}
                      </div>

                      {link.sublinks && isExpanded && (
                        <div className="px-3 pb-3 pt-1 border-t border-border/50 space-y-2 bg-foreground/5">
                          {link.sublinks.map((sub) => (
                            <Link key={sub.id} href={sub.url} onClick={() => setIsOpen(false)} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-background transition-all">
                              <div className="w-7 h-7 shrink-0 flex items-center justify-center rounded-md bg-primary/10 text-primary mt-0.5">
                                {sub.icon && <sub.icon size={14} />}
                              </div>
                              <div>
                                <div className="font-bold text-xs text-foreground">{sub.title}</div>
                                <p className="text-[10px] text-foreground/50 leading-tight mt-0.5">{sub.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-border bg-gradient-to-t from-primary/5 to-transparent space-y-2">
                <Link href="/Pages/Fixtures" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-2 justify-center py-2.5 rounded-xl bg-foreground text-background font-black text-xs">
                  <Calendar size={14} /> جدول المباريات
                </Link>
                <Link href="/Pages/Store" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-2 justify-center py-2.5 rounded-xl bg-primary text-white font-black text-xs shadow-md">
                  <ShoppingBag size={14} /> زيارة المتجر الرسمي
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSearchOpen(false)} className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-[125] w-full max-w-xl px-4"
              dir="rtl"
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Search size={18} className="text-primary shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن لاعبين، أخبار، بطولات..."
                    className="flex-1 bg-transparent text-sm font-bold text-foreground outline-none placeholder:text-foreground/40"
                  />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="text-xs text-foreground/40 hover:text-foreground px-1">مسح</button>}
                  <button onClick={() => setSearchOpen(false)} className="p-1.5 text-foreground/50 hover:text-foreground rounded-full bg-foreground/5">
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-3">
                  <p className="text-[11px] font-extrabold text-foreground/50 mb-2">الكلمات الأكثر بحثاً:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SEARCH_TAGS.map((tag, index) => (
                      <button key={index} onClick={() => setSearchQuery(tag)} className="px-2.5 py-1 rounded-full bg-foreground/5 hover:bg-primary/20 hover:text-primary text-xs font-bold text-foreground/80 transition-all">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}