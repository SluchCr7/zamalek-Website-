'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/app/hooks/useAuth';
import {
    User,
    Mail,
    MapPin,
    Calendar,
    Twitter,
    Facebook,
    Instagram,
    Youtube,
    Trophy,
    Shield,
    Camera,
    Settings,
    LogOut,
    Edit3,
    CheckCircle,
    Smartphone,
    ChevronLeft
} from 'lucide-react';

export default function ProfilePage() {
    const { user, Logout, updateProfile, updatePhoto } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                username: user.username || '',
                bio: user.bio || '',
                location: user.location || { country: 'Egypt', city: '' },
                socialLinks: user.socialLinks || { twitter: '', facebook: '', instagram: '', youtube: '' },
                favoritePlayer: user.favoritePlayer || '',
            });
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-full" />
                    <div className="h-4 w-48 bg-muted rounded" />
                </div>
            </div>
        );
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const success = await updateProfile(formData);
        if (success) setIsEditing(false);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) updatePhoto(file);
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground pb-20" dir="rtl">

            {/* Header / Cover Section */}
            <section className="relative h-[300px] md:h-[400px] overflow-hidden">
                <Image
                    src={user.coverPhoto?.url || "/coverProfile.jpg"}
                    alt="Cover"
                    fill
                    className="object-cover brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 py-8 px-4 md:px-12 container mx-auto">
                    <div className="flex flex-col md:flex-row items-end gap-6">
                        {/* Profile Photo */}
                        <div className="relative group">
                            <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] border-4 border-background overflow-hidden bg-card shadow-2xl relative">
                                <Image
                                    src={user.profilePhoto?.url}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <label className="absolute bottom-2 right-2 p-3 bg-primary text-foreground rounded-2xl cursor-pointer shadow-xl hover:scale-110 transition-transform">
                                <Camera size={20} />
                                <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                            </label>
                        </div>

                        {/* Identity Info */}
                        <div className="flex-1 space-y-2 mb-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight italic">{user.name}</h1>
                                {user.isVerified && <CheckCircle size={24} className="text-blue-500 fill-blue-500/20" />}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-bold opacity-60 italic">
                                <span className="flex items-center gap-1.5 uppercase tracking-widest"><AtSign size={14} /> {user.Name}</span>
                                <span className="flex items-center gap-1.5 uppercase tracking-widest"><MapPin size={14} /> {user.location?.city || 'Cairo'}, {user.location?.country || 'Egypt'}</span>
                                <span className="flex items-center gap-1.5 uppercase tracking-widest"><Calendar size={14} /> انضم في {new Date(user.createdAt).getFullYear()}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mb-2">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-6 h-14 rounded-2xl bg-card border border-border flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-muted transition-all"
                            >
                                <Edit3 size={16} />
                                <span>تعديل الملف</span>
                            </button>
                            <button
                                onClick={Logout}
                                className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-foreground transition-all shadow-lg shadow-primary/5"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <section className="container mx-auto px-4 md:px-12 mt-12">
                <div className="flex items-center gap-2 p-2 bg-card border border-border rounded-3xl w-fit">
                    <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="نظرة عامة" icon={<Shield size={16} />} />
                    <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="البيانات الشخصية" icon={<Settings size={16} />} />
                    <TabButton active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} label="الإنجازات" icon={<Trophy size={16} />} />
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 md:px-12 mt-12 grid lg:grid-cols-3 gap-12">

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Bio Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6"
                    >
                        <h3 className="text-xl font-black font-heading italic uppercase tracking-tighter">عني</h3>
                        <p className="font-bold opacity-60 leading-relaxed">{user.bio || 'لا يوجد وصف متاح لهذا المشجع الملكي.'}</p>

                        <div className="pt-6 border-t border-border grid grid-cols-2 gap-6">
                            <div>
                                <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-1">المركز المفضل</span>
                                <span className="font-black italic text-primary uppercase">MEMBER</span>
                            </div>
                            <div>
                                <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-1">نقاط الولاء</span>
                                <span className="font-black italic text-primary">{user.loyaltyPoints || 0} PTS</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6"
                    >
                        <h3 className="text-xl font-black font-heading italic uppercase tracking-tighter">تواصل معي</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <SocialLink href={user.socialLinks?.twitter} icon={<Twitter size={18} />} label="Twitter" />
                            <SocialLink href={user.socialLinks?.facebook} icon={<Facebook size={18} />} label="Facebook" />
                            <SocialLink href={user.socialLinks?.instagram} icon={<Instagram size={18} />} label="Instagram" />
                            <SocialLink href={user.socialLinks?.youtube} icon={<Youtube size={18} />} label="YouTube" />
                        </div>
                    </motion.div>
                </div>

                {/* Dynamic Center Content */}
                <div className="lg:col-span-2 space-y-8">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                {/* Favorite Player Card */}
                                <div className="relative h-64 rounded-[3rem] overflow-hidden group">
                                    <Image
                                        src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                        alt="Zamalek Fan"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
                                    <div className="relative h-full flex flex-col justify-center p-12 text-foreground">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">اللاعب المفضل</span>
                                        <h2 className="text-5xl font-black font-heading italic tracking-tighter mt-2">{user.favoritePlayer || 'لم يتم التحديد'}</h2>
                                        <button className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
                                            Explore Stats <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <BigStatCard title="عضوية النادي" value={user.membershipStatus?.toUpperCase() || 'FAN'} accent="primary" />
                                    <BigStatCard title="رقم العضوية" value={user.membershipID || '#N/A'} accent="foreground" />
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-card border border-border rounded-[2.5rem] p-10"
                            >
                                <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6 md:col-span-2">
                                        <h3 className="text-2xl font-black font-heading italic">المعلومات الأساسية</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormInput label="الاسم الكامل" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
                                            <FormInput label="اسم المستخدم" value={formData.username} onChange={(v) => setFormData({ ...formData, username: v })} />
                                        </div>
                                        <FormInput label="نبذة تعريفية" value={formData.bio} onChange={(v) => setFormData({ ...formData, bio: v })} isTextArea />
                                    </div>

                                    <div className="space-y-6 md:col-span-2 pt-8 border-t border-border">
                                        <h3 className="text-2xl font-black font-heading italic">روابط التواصل</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormInput label="تويتر" value={formData.socialLinks?.twitter} onChange={(v) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: v } })} />
                                            <FormInput label="إنستجرام" value={formData.socialLinks?.instagram} onChange={(v) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: v } })} />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 pt-8">
                                        <button className="w-full h-20 bg-primary text-foreground rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all">
                                            حفظ التغييرات
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

        </div>
    );
}

function TabButton({ active, onClick, label, icon }) {
    return (
        <button
            onClick={onClick}
            className={`px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-primary text-foreground shadow-xl shadow-primary/20' : 'hover:bg-muted opacity-40'
                }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}

function SocialLink({ href, icon, label }) {
    return (
        <a
            href={href || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border group hover:border-primary transition-all"
        >
            <div className="text-primary group-hover:scale-110 transition-transform">{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                {label}
            </span>
        </a>
    );
}

function BigStatCard({ title, value, accent }) {
    return (
        <div className={`p-10 rounded-[2.5rem] bg-card border border-border space-y-4`}>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">{title}</span>
            <div className={`text-4xl font-black font-heading italic ${accent === 'primary' ? 'text-primary' : 'text-foreground'}`}>
                {value}
            </div>
        </div>
    );
}

function FormInput({ label, value, onChange, isTextArea }) {
    return (
        <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mr-4 italic">{label}</label>
            {isTextArea ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-muted/30 border-2 border-border rounded-3xl p-6 min-h-[120px] focus:outline-none focus:border-primary transition-all font-bold"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-16 bg-muted/30 border-2 border-border rounded-2xl px-6 focus:outline-none focus:border-primary transition-all font-bold"
                />
            )}
        </div>
    );
}

function AtSign({ size, className }) {
    return <span className={className}>@</span>
}
