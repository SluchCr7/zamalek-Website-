'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa6';
import { MessageCircle, Heart, Share2, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SocialWall = () => {
    const posts = [
        {
            platform: <FaInstagram size={20} />,
            color: "from-[#f09433] to-[#bc1888]",
            user: "@ZamalekSC",
            content: "استعدادات الفريق لموقعة القمة القادمة في ستاد القاهرة... القادم أفضل بجمهورنا العظيم ⚪🔴",
            image: "/Players/omar gaber.jpg", // Fixed missing image path
            likes: "128K",
            comments: "2,400"
        },
        {
            platform: <FaTwitter size={20} />,
            color: "from-blue-400 to-blue-600",
            user: "@ZamalekSC",
            content: "رسمياً: نادي الزمالك يعلن عن تجديد عقد قائد الفريق شيكابالا حتى عام 2027. الملك يظل ملكاً! 🏹👑 #ZamalekSC",
            likes: "45K",
            comments: "8,200",
            type: "tweet"
        },
        {
            platform: <FaTiktok size={20} />,
            color: "from-black to-zinc-800",
            user: "zamaleksc_official",
            content: "أفضل المهارات والأهداف في تدريبات اليوم... مدرسة الفن والهندسة كالعادة ✨⚽",
            image: "/history/zamalek3.jpg",
            likes: "500K",
            comments: "15K",
            type: "video"
        },
        {
            platform: <FaYoutube size={20} />,
            color: "from-red-600 to-red-800",
            user: "Zamalek TV",
            content: "بث مباشر: المؤتمر الصحفي للمدير الفني الجديد للفريق يانيك فيريرا والحديث عن مستقبل الفريق.",
            image: "/history/zamalek5.jpeg",
            likes: "90K",
            comments: "1,100",
            type: "live"
        }
    ];

    return (
        <section className="py-32 bg-background relative overflow-hidden" dir="rtl">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm mb-4"
                    >
                        <MessageCircle size={16} />
                        <span>منـصات المـيـديا</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter">حيـث ينبض <span className="text-primary italic">الزمالك</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border rounded-[2rem] overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary"
                        >
                            {/* Platform Header */}
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${post.color} flex items-center justify-center text-white shadow-lg`}>
                                        {post.platform}
                                    </div>
                                    <span className="font-black text-xs tracking-tight">{post.user}</span>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            </div>

                            {/* Main Content */}
                            {post.image ? (
                                <div className="relative aspect-square mx-4 rounded-2xl overflow-hidden bg-muted">
                                    <Image src={post.image} alt="صورة المنشور" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    {post.type === "video" && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-foreground/20 backdrop-blur-xl border border-foreground/30 flex items-center justify-center text-white">
                                                <Play size={24} fill="currentColor" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1 p-8 flex items-center">
                                    <p className="text-xl font-bold leading-relaxed italic opacity-80">"{post.content}"</p>
                                </div>
                            )}

                            {post.image && (
                                <div className="p-6">
                                    <p className="text-sm font-bold opacity-60 line-clamp-2">{post.content}</p>
                                </div>
                            )}

                            {/* Stats Footer */}
                            <div className="p-6 mt-auto border-t border-border/50 flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5 text-xs font-black">
                                        <Heart size={14} className="text-primary" />
                                        <span>{post.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-black opacity-40">
                                        <MessageCircle size={14} />
                                        <span>{post.comments}</span>
                                    </div>
                                </div>
                                <button 
                                  className="p-1 text-foreground opacity-20 group-hover:opacity-100 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" 
                                  aria-label="مشاركة المنشور"
                                >
                                  <Share2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Engagement Section */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
                    <p className="text-lg font-bold opacity-40 italic">انضم لأكثر من 20 مليون متابع عبر منصاتنا الرسمية</p>
                    <div className="h-px w-20 bg-border hidden md:block" />
                    <Link 
                      href="/Pages/Videos" 
                      className="px-10 py-4 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      استكشف المزيد من الميديا
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SocialWall;
