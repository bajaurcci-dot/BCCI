'use client';

import {
    Globe,
    BadgeDollarSign,
    Megaphone,
    LineChart,
    Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'Trade & Facilitation',
        description:
            'A dedicated center supporting global trade, streamlining export documentation, and fostering powerful business networking opportunities.',
        icon: Globe,
        color: 'bg-blue-500/10 text-blue-500',
        border: 'hover:border-blue-500/50',
    },
    {
        title: 'Finance & Accounts',
        description:
            'Expert handling of financial transactions, budgeting strategies, and strict compliance ensures your operations run smoothly and efficiently.',
        icon: BadgeDollarSign,
        color: 'bg-emerald-500/10 text-emerald-500',
        border: 'hover:border-emerald-500/50',
    },
    {
        title: 'Media & PR',
        description:
            'We amplify your voice and promote BCCI’s initiatives through strategic media planning, public relations campaigns, and digital communication.',
        icon: Megaphone,
        color: 'bg-purple-500/10 text-purple-500',
        border: 'hover:border-purple-500/50',
    },
    {
        title: 'Business Development',
        description:
            'Gain a competitive edge with our business insights, deep market research, and timely updates designed to keep you informed and ahead.',
        icon: LineChart,
        color: 'bg-indigo-500/10 text-indigo-500',
        border: 'hover:border-indigo-500/50',
    },
    {
        title: 'Membership Support',
        description:
            'Our dedicated team manages seamless registrations, renewals, and ongoing support to ensure you get the most out of your membership.',
        icon: Users,
        color: 'bg-orange-500/10 text-orange-500',
        border: 'hover:border-orange-500/50',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-16 sm:py-24 bg-background relative" id="why-choose-us">
            <div className="container px-4 sm:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-24 space-y-4"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
                        Why Choose Us?
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground">
                        We are committed to excellence, providing the tools and services you need to accelerate your business growth.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto space-y-8 md:space-y-0 pb-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={cn(
                                "group sticky rounded-3xl p-6 sm:p-8 md:p-12 border bg-card transition-all duration-300 shadow-md sm:shadow-lg",
                                feature.border
                            )}
                            style={{
                                top: `${80 + index * 15}px`, // Reduced for smaller screens
                                marginBottom: `${index === features.length - 1 ? 0 : 20}px`, // Reduced for smaller screens
                                zIndex: index + 10,
                            }}
                        >
                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
                                <div
                                    className={cn(
                                        "flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                                        feature.color
                                    )}
                                >
                                    <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline mb-3 sm:mb-4 text-foreground leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
