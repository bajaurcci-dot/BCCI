'use client';

import { Trophy, Award } from 'lucide-react';
import CustomAnimatedAward from '@/components/custom-animated-award';

const GrowthSection = () => {
    return (
        <section className="py-6 md:py-8 bg-stone-50 overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">

                {/* The Authority Card */}
                <div className="relative rounded-[1.5rem] overflow-hidden max-w-5xl mx-auto shadow-xl">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-950 to-black" />

                    {/* Decorative Gold Borders/Accents */}
                    <div className="absolute inset-0 border-[4px] border-amber-500/20 rounded-[1.5rem] pointer-events-none" />
                    <div className="absolute inset-3 border border-amber-500/10 rounded-[1.2rem] pointer-events-none" />

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 lg:gap-8 p-6 sm:p-8 md:p-8 lg:p-10 items-center">

                        {/* Left Column: Mission & Identity */}
                        <div className="flex flex-col space-y-4">
                            <div className="inline-flex items-center gap-2">
                                <div className="h-px w-6 bg-amber-500/50"></div>
                                <span className="text-amber-400 font-bold uppercase tracking-[0.2em] text-[10px]">Est. 1985</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-white tracking-tight leading-[1.1]">
                                A Voice for <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 font-bold drop-shadow-sm">
                                    Business Growth
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base text-emerald-100/80 leading-snug max-w-md border-l-2 border-amber-500/30 pl-3">
                                BCCI actively represents the trade, industry, and services sectors, ensuring policy reforms and fostering a thriving business environment.
                            </p>

                            {/* Big Stat Row */}
                            <div className="pt-2">
                                <div className="relative inline-block">
                                    <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white/5 absolute -top-4 -left-4 sm:-top-6 sm:-left-6 select-none -z-10">40</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tighter">40</span>
                                        <span className="text-xl sm:text-2xl text-amber-400 font-light">+</span>
                                    </div>
                                    <p className="text-emerald-200 font-medium tracking-wide uppercase text-[9px] sm:text-[10px] mt-0.5">Years of Excellence</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: The Award Seal */}
                        <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-4">

                            {/* Award Visual Container */}
                            <div className="relative group perspective-1000 scale-[0.8] sm:scale-90 origin-center lg:origin-right">
                                {/* Glow behind award */}
                                <div className="absolute inset-0 bg-amber-400/20 blur-[30px] sm:blur-[40px] rounded-full scale-110 animate-pulse-slow" />

                                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-gradient-to-tr from-white/10 to-transparent backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center shadow-xl transform transition-transform duration-700 hover:rotate-y-12">
                                    <div className="absolute inset-2 border border-amber-500/30 rounded-full border-dashed animate-spin-slow" />

                                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40">
                                        <CustomAnimatedAward />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1 max-w-xs mx-auto lg:mx-0 bg-black/20 p-3 rounded-md border border-white/5 backdrop-blur-sm">
                                <div className="flex items-center justify-center lg:justify-end gap-1.5 text-amber-400 mb-0.5">
                                    <Award className="h-3.5 w-3.5" />
                                    <span className="font-bold uppercase tracking-widest text-[9px]">National Recognition</span>
                                </div>
                                <h3 className="text-lg font-serif text-white">Awards & Accolades</h3>
                                <p className="text-emerald-100/70 text-[10px] leading-tight">
                                    Honored for tremendous efforts in promoting entrepreneurship culture.
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default GrowthSection;
