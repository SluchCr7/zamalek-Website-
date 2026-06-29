"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fetcher = url => axios.get(url).then(res => res.data);

export default function PlayersPage() {
    const { data: players, error, isLoading } = useSWR('http://localhost:5000/api/players?team=1040&season=2024', fetcher);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPosition, setFilterPosition] = useState('All');

    const filteredPlayers = players?.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPosition = filterPosition === 'All' || player.position === filterPosition;
        return matchesSearch && matchesPosition;
    });

    const positions = ['All', ...new Set(players?.map(p => p.position) || [])];

    return (
        <div className="min-h-screen w-full bg-neutral-950 text-foreground overflow-hidden pb-20">
            {/* Hero Section */}
            <div className="relative pt-32 w-full pb-20 px-4 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/40 to-neutral-950">
                <div className="absolute inset-0 bg-[url('https://www.zamalek.tv/images/pattern.png')] opacity-10 mix-blend-overlay"></div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="z-10 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-foreground to-red-500 uppercase">
                        First Team Squad
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Explore the warriors defending the Royal White Castle in the current season.
                    </p>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800 backdrop-blur-sm"
                >
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search players..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-neutral-800 text-foreground border border-neutral-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-600 transition-all"
                        />
                    </div>
                    <div className="w-full md:w-auto flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {positions.map(pos => (
                            <button
                                key={pos}
                                onClick={() => setFilterPosition(pos)}
                                className={`whitespace-nowrap px-6 py-2 rounded-xl text-sm font-semibold transition-all ${filterPosition === pos ? 'bg-red-600 text-foreground shadow-lg shadow-red-600/30' : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-foreground'}`}
                            >
                                {pos}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Content Display */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-neutral-900 rounded-3xl h-96 border border-neutral-800 overflow-hidden">
                                <div className="h-2/3 bg-neutral-800 w-full mb-4"></div>
                                <div className="px-6">
                                    <div className="h-6 bg-neutral-800 rounded w-3/4 mb-3"></div>
                                    <div className="h-4 bg-neutral-800 rounded w-1/2 mb-4"></div>
                                    <div className="flex justify-between">
                                        <div className="h-4 bg-neutral-800 rounded w-1/4"></div>
                                        <div className="h-4 bg-neutral-800 rounded w-1/4"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-3xl border border-red-500/20">
                        <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
                        <p>We could not fetch the players data right now. Please try again later.</p>
                    </div>
                ) : filteredPlayers?.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <h2 className="text-2xl font-bold mb-2">No Players Found</h2>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.05 }
                            }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                    >
                        {filteredPlayers.map(player => (
                            <motion.div
                                key={player.id}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                            >
                                <Link href={`/players/${player.id}`}>
                                    <div className="group relative bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 hover:border-red-600/50 transition-all duration-500 cursor-pointer h-full flex flex-col justify-between">
                                        {/* Player Image area */}
                                        <div className="relative h-64 overflow-hidden bg-gradient-to-t from-neutral-900 via-neutral-800 to-neutral-800 flex items-end justify-center">
                                            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600 via-transparent to-transparent"></div>
                                            <img
                                                src={player.photo}
                                                alt={player.name}
                                                className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-2xl"
                                                loading="lazy"
                                                onError={(e) => { e.target.src = 'https://media.api-sports.io/football/players/1.png' }}
                                            />
                                        </div>

                                        {/* Player Info */}
                                        <div className="p-6 relative z-20 bg-neutral-900">
                                            <div className="absolute top-0 right-6 -translate-y-1/2 bg-red-600 text-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                {player.position}
                                            </div>
                                            <h3 className="text-xl font-bold mb-1 truncate text-foreground group-hover:text-red-500 transition-colors">{player.name}</h3>
                                            <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                                                <span className="w-4 h-4 inline-block rounded-full bg-neutral-700 overflow-hidden relative">
                                                    {/* Ideally add country flag based on nationality */}
                                                </span>
                                                {player.nationality} &bull; Age {player.age}
                                            </p>

                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Goals</p>
                                                    <p className="font-semibold text-lg">{player.goals}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Assists</p>
                                                    <p className="font-semibold text-lg">{player.assists}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
