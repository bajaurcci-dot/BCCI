'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { BorderBeam } from '@/components/ui/border-beam';
import PageHeader from "@/components/page-header";
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

const TopNavBar = dynamic(() => import('@/components/top-nav-bar'), { ssr: false });

interface Section {
    id: string;
    title: string;
    icon: LucideIcon;
    content: React.ReactNode;
}

interface PolicyLayoutProps {
    title: string;
    description: string;
    sections: Section[];
    lastUpdated: string;
}

export default function PolicyLayout({ title, description, sections, lastUpdated }: PolicyLayoutProps) {
    return (
        <div className="relative w-full min-h-screen bg-gray-50/50">
            <div className="relative z-10 flex flex-col min-h-screen">
                <TopNavBar />

                <main className="flex-grow">
                    <PageHeader title={title} description={description} />

                    <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Sticky Table of Contents (Desktop) */}
                            <aside className="hidden lg:block lg:col-span-3">
                                <div className="sticky top-32 space-y-4">
                                    <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-emerald-100 shadow-sm">
                                        <h3 className="font-bold text-gray-900 mb-6 font-headline tracking-wide uppercase text-xs">Sections</h3>
                                        <nav className="space-y-2">
                                            {sections.map((section) => (
                                                <a
                                                    key={section.id}
                                                    href={`#${section.id}`}
                                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-300 group"
                                                >
                                                    <section.icon className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                                                    {section.title}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-emerald-900 text-white shadow-xl shadow-emerald-900/10 overflow-hidden relative group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-transparent opacity-50" />
                                        <div className="relative z-10">
                                            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Need Help?</p>
                                            <p className="text-sm text-emerald-100/80 mb-4">Have questions regarding our policies?</p>
                                            <a href="/contact" className="text-sm font-bold border-b border-emerald-400 hover:text-emerald-400 transition-colors">Contact Support</a>
                                        </div>
                                        <BorderBeam size={100} duration={10} colorFrom="#34d399" colorTo="#10b981" />
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content Area */}
                            <div className="lg:col-span-9 space-y-8">
                                {sections.map((section, index) => (
                                    <motion.section
                                        key={section.id}
                                        id={section.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="relative group"
                                    >
                                        <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1">
                                            <div className="flex items-start gap-6">
                                                <div className="hidden md:flex h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-inner">
                                                    <section.icon className="h-7 w-7" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="h-px w-8 bg-emerald-500/30 md:hidden" />
                                                        <h2 className="text-2xl md:text-3xl font-bold font-headline text-gray-900">
                                                            {section.title}
                                                        </h2>
                                                    </div>
                                                    <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed md:text-lg">
                                                        {section.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.section>
                                ))}

                                <div className="pt-12 pb-6 flex flex-col items-center justify-center text-gray-400">
                                    <div className="h-12 w-px bg-gradient-to-b from-gray-200 to-transparent mb-6" />
                                    <p className="text-sm italic font-medium">Last Updated: {lastUpdated}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
