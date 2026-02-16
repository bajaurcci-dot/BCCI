'use client';

import { Headphones, Clock, MessageSquare, Shield } from 'lucide-react';

const features = [
    {
        icon: Clock,
        title: '24/7 Availability',
        description: 'Our digital systems are online round the clock to accept your applications and verification requests.'
    },
    {
        icon: Headphones,
        title: 'Dedicated Support Team',
        description: 'Expert officers available during business hours to resolve complex queries.'
    },
    {
        icon: MessageSquare,
        title: 'Live Chat Assistance',
        description: 'Get instant answers for common problems through our automated assistant.'
    },
    {
        icon: Shield,
        title: 'Secure Processing',
        description: 'All your data and documents are processed with enterprise-grade security.'
    }
];

const SupportServicesSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
                        24/7 Support Services
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We are committed to providing uninterrupted support to our members to ensure business continuity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 text-center"
                        >
                            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6 text-primary">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SupportServicesSection;
