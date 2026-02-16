'use client';

import { Button } from '@/components/ui/button';
import { Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ContactCTAProps {
    title?: string;
    description?: string;
}

const ContactCTA = ({
    title = "For More Information Contact Us Now",
    description = "Our dedicated team is here to assist you with any queries or support you may need."
}: ContactCTAProps) => {
    return (
        <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold font-headline mb-6 animate-fade-in-up">
                    {title}
                </h2>
                <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-100">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
                    <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="w-full sm:w-auto text-primary font-bold hover:scale-105 transition-transform"
                    >
                        <Link href="/contact">
                            <Phone className="mr-2 h-5 w-5" />
                            Contact Support
                        </Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white font-bold backdrop-blur-sm hover:scale-105 transition-transform"
                    >
                        <Link href="mailto:info@bcci.org.pk">
                            <Mail className="mr-2 h-5 w-5" />
                            Email Us
                        </Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white font-bold backdrop-blur-sm hover:scale-105 transition-transform"
                    >
                        <Link href="/contact">
                            <Calendar className="mr-2 h-5 w-5" />
                            Schedule Meeting
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
