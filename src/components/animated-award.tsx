'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AnimatedAward = () => {
    return (
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            {/* Rotating Background Glow - "Sun rays" effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-amber-300/30 via-yellow-500/10 to-transparent rounded-full blur-xl"
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
            />

            {/* The Award Image - Floating & Pulsing */}
            <motion.div
                className="relative z-10 w-full h-full"
                animate={{
                    y: [-5, 5, -5],
                    filter: [
                        'drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))',
                        'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))',
                        'drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))',
                    ],
                }}
                transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                <Image
                    src="/images/Award.svg"
                    alt="Award Emblem"
                    fill
                    className="object-contain"
                />

                {/* Shimmer Effect Overlay */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                        initial={{ x: '-150%' }}
                        animate={{ x: '150%' }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            repeatDelay: 1, // Pause between shimmers
                            ease: "linear",
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default AnimatedAward;
