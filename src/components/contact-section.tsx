'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Instagram } from 'lucide-react';
import { Badge } from './ui/badge';
import ContactForm from './contact-form';

const socialMedia = [
  {
    name: 'Whatsapp',
    href: 'http://wa.me/+923082275587',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
  { name: 'Facebook', href: 'https://www.facebook.com/bccikhar/', icon: <Facebook className="h-6 w-6" /> },
  { name: 'Instagram', href: 'https://www.instagram.com/bcci_khar/', icon: <Instagram className="h-6 w-6" /> },
  { name: 'Location', href: 'https://maps.app.goo.gl/82hQdwoCeyAgj5iu5', icon: <MapPin className="h-6 w-6" /> },
];

const ContactSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            Contact Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-4 mb-6">
            Get In Touch
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            We'd love to hear from you. Whether you have a question about our services, membership, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between animate-slide-in-left">
              <div>
                <h3 className="text-2xl font-bold font-headline mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <a href="tel:+923082275587" className="flex items-start gap-4 text-muted-foreground hover:text-primary transition-colors group">
                    <div className="bg-primary/10 p-3 rounded-full mt-1 group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Phone</h4>
                      <p>+92 308 2275587</p>
                    </div>
                  </a>
                  <a href="mailto:info@bajaurchamber.org.pk" className="flex items-start gap-4 text-muted-foreground hover:text-primary transition-colors group">
                    <div className="bg-primary/10 p-3 rounded-full mt-1 group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Email Address</h4>
                      <p>info@bajaurchamber.org.pk</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 text-muted-foreground">
                    <div className="bg-primary/10 p-3 rounded-full mt-1">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Address</h4>
                      <p>Khar, District Bajaur</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-headline mt-12 mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialMedia.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground bg-primary/10 p-3 rounded-full hover:text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
