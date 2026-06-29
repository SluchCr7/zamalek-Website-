"use client";

import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, User, MapPin, Activity, Calendar, Award } from 'lucide-react';
import { useParams } from 'next/navigation';

const fetcher = url => axios.get(url).then(res => res.data);

export default function PlayerDetailsPage() {
    const params = useParams();
    const id = params?.id;

    // Fallback if no ID yet
    const { data, error, isLoading } = useSWR(id ? `http://localhost:5000/api/players/${id}?season=2024` : null, fetcher);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
                <h2 className="text-3xl font-bold text-red-500 mb-4">Player Not Found</h2>
                <Link href="/players" className="text-foreground bg-red-600 px-6 py-2 rounded-xl hover:bg-red-700 transition">
                    Back to Squad
                </Link>
            </div>
        );
    }

    const { player, statistics } = data;
    const stats = statistics?.[0] || {};

    return (
        <div className="min-h-screen w-full bg-neutral-950 text-foreground font-sans selection:bg-red-600 selection:text-foreground pb-20">
            {/* Header/Nav */}
            <div className="pt-8 px-4 max-w-7xl mx-auto">
                <Link href="/players" className="inline-flex items-center gap-2 text-gray-400 hover:text-foreground transition group bg-neutral-900 px-4 py-2 rounded-full border border-neutral-800">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Squad
                </Link>
            </div>

            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column - Visual Profile */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <div className="bg-neutral-900 rounded-[2rem] overflow-hidden border border-neutral-800 relative group">
                            {/* Decorative Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-neutral-900 z-0"></div>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 blur-[50px] rounded-full"></div>

                            <img
                                src={player.photo}
                                alt={player.name}
                                className="w-full aspect-[4/5] object-contain relative z-10 drop-shadow-2xl pt-10 group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="absolute top-6 left-6 z-20">
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-gray-500 opacity-50">
                                    {stats.games?.number || ''}
                                </div>
                            </div>
                        </div>

                        {/* Personal Info Card */}
                        <div className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground border-b border-neutral-800 pb-4">
                                <User className="text-red-500" size={20} /> Personal Data
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Full Name</span>
                                    <span className="font-semibold text-right">{player.firstname} {player.lastname}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Age</span>
                                    <span className="font-semibold">{player.age} Years</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Birth Date</span>
                                    <span className="font-semibold">{player.birth?.date}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Nationality</span>
                                    <span className="font-semibold">{player.nationality}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Height / Weight</span>
                                    <span className="font-semibold">{player.height} / {player.weight}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Stats Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-8 space-y-6"
                    >
                        {/* Header Details */}
                        <div className="bg-gradient-to-r from-red-600 to-red-900 rounded-3xl p-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.zamalek.tv/images/pattern.png')] opacity-10 mix-blend-overlay"></div>
                            <div className="relative z-10">
                                <p className="text-red-100 font-medium mb-1 tracking-widest uppercase">{stats.games?.position}</p>
                                <h1 className="text-4xl sm:text-6xl font-black mb-4">{player.name}</h1>
                                <p className="text-xl text-red-50/80 max-w-xl">
                                    Current season statistics and performance metrics for the {stats.games?.position?.toLowerCase()} across all competitions.
                                </p>
                            </div>
                        </div>

                        {/* Top Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Appearances', value: stats.games?.appearences || 0, icon: <Activity className="text-red-500" size={20} /> },
                                { label: 'Minutes Played', value: stats.games?.minutes || 0, icon: <Calendar className="text-red-500" size={20} /> },
                                { label: 'Total Goals', value: stats.goals?.total || 0, icon: <Award className="text-red-500" size={20} /> },
                                { label: 'Assists', value: stats.goals?.assists || stats.passes?.accuracy || 0, icon: <User className="text-red-500" size={20} /> },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 flex flex-col items-start hover:border-red-600/30 transition-colors">
                                    <div className="bg-neutral-950 p-3 rounded-full mb-4">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-black leading-none mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Detailed Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Attacking Metrics */}
                            <div className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800">
                                <h3 className="text-xl font-bold mb-6 text-foreground border-b border-neutral-800 pb-4">Attacking Influence</h3>
                                <div className="space-y-5">
                                    <div>
                                        <div className="flex justify-between mb-1 text-sm">
                                            <span className="text-gray-400">Shots on Target</span>
                                            <span className="font-bold">{stats.shots?.on || 0} / {stats.shots?.total || 0}</span>
                                        </div>
                                        <div className="w-full bg-neutral-800 rounded-full h-2">
                                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(((stats.shots?.on || 0) / (stats.shots?.total || 1)) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-neutral-950 p-4 rounded-xl text-center">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Key Passes</p>
                                            <p className="text-xl font-bold">{stats.passes?.key || 0}</p>
                                        </div>
                                        <div className="bg-neutral-950 p-4 rounded-xl text-center">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dribbles</p>
                                            <p className="text-xl font-bold">{stats.dribbles?.success || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Discipline & Defense */}
                            <div className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800">
                                <h3 className="text-xl font-bold mb-6 text-foreground border-b border-neutral-800 pb-4">Discipline & Defense</h3>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-3 bg-neutral-950 p-4 rounded-xl">
                                        <div className="w-4 h-6 bg-yellow-400 rounded-sm"></div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Yellow Cards</p>
                                            <p className="text-xl font-bold">{stats.cards?.yellow || 0}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-neutral-950 p-4 rounded-xl">
                                        <div className="w-4 h-6 bg-red-600 rounded-sm"></div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Red Cards</p>
                                            <p className="text-xl font-bold">{stats.cards?.red || 0}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-neutral-950 p-4 rounded-xl text-center">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tackles</p>
                                        <p className="text-xl font-bold">{stats.tackles?.total || 0}</p>
                                    </div>
                                    <div className="bg-neutral-950 p-4 rounded-xl text-center">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Interceptions</p>
                                        <p className="text-xl font-bold">{stats.tackles?.interceptions || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </main>
        </div>
    );
}
