'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const CustomAnimatedAward = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">

            {/* 1. Outer Orbit Ring */}
            <motion.div
                className="absolute inset-0 rounded-full border border-amber-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                {/* Orbital dots */}
                <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)] transform -translate-y-1/2" />
                <div className="absolute top-1/2 -left-1.5 w-2 h-2 bg-amber-600/60 rounded-full transform -translate-y-1/2" />
                <div className="absolute -bottom-1.5 left-1/2 w-2 h-2 bg-amber-500/50 rounded-full transform -translate-x-1/2" />
            </motion.div>

            {/* 2. Inner Dashed Ring */}
            <motion.div
                className="absolute inset-4 rounded-full border border-dashed border-amber-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            {/* 3. The Gold Seal Body */}
            <div className="relative w-[75%] h-[75%] z-10">

                {/* Main Gold Gradient Background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-600 shadow-2xl flex items-center justify-center border-[3px] border-amber-200">

                    {/* Inner Inset Shadow/Detail */}
                    <div className="absolute inset-2 rounded-full border border-amber-600/50 bg-gradient-to-tr from-amber-500 to-amber-400" />

                    {/* Content Container */}
                    <div className="relative w-full h-full flex items-center justify-center">

                        {/* Text: EXCELLENCE */}
                        <div className="absolute w-full h-full animate-spin-slow-reverse" style={{ animationDuration: '30s' }}>
                            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                                <defs>
                                    <path id="curveTop" d="M 16, 50 a 34,34 0 1,1 68,0" fill="transparent" />
                                </defs>
                                <text className="text-[11px] font-bold uppercase fill-white/90 tracking-[0.15em]" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                                    <textPath href="#curveTop" startOffset="50%" textAnchor="middle">
                                        Excellence
                                    </textPath>
                                </text>
                            </svg>
                        </div>

                        {/* Text: BEST CHAMBER */}
                        <div className="absolute w-full h-full animate-spin-slow-reverse" style={{ animationDuration: '30s' }}>
                            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 rotate-180">
                                <defs>
                                    <path id="curveBottom" d="M 18, 50 a 32,32 0 1,1 64,0" fill="transparent" />
                                </defs>
                                <text className="text-[9px] font-bold uppercase fill-amber-900/60 tracking-[0.1em]">
                                    <textPath href="#curveBottom" startOffset="50%" textAnchor="middle">
                                        Best Chamber
                                    </textPath>
                                </text>
                            </svg>
                        </div>

                        {/* Central Star Icon */}
                        <div className="relative z-20 bg-white rounded-full p-2 shadow-inner">
                            <Star className="w-8 h-8 text-amber-500 fill-amber-400 drop-shadow-md" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Glossy Shine Effect Overlay */}
            <div className="absolute inset-[15%] z-20 rounded-full overflow-hidden pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-80" style={{ transform: 'skewX(-20deg) translateX(-30%)' }} />
            </div>

        </div>
    );
};

export default CustomAnimatedAward;
