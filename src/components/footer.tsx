'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, MapPin, Phone, Facebook, Instagram, AtSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const legalPages = [
  { name: 'About Us', href: '#' },
  { name: 'Contact Us', href: '#' },
  { name: 'Disclaimer', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms & Uses', href: '#' },
  { name: 'Cookies Policy', href: '#' },
];

const quickLinks = [
  { name: 'Services', href: '#' },
  { name: 'Membership', href: '#' },
  { name: 'Gallery', href: '#' },
  { name: 'Compliances', href: '#' },
  { name: 'Download', href: '#' },
];

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

const Footer = () => {
  const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');
  const newsletterIllustration = PlaceHolderImages.find((img) => img.id === 'newsletter-illustration');

  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 md:px-6 relative z-10 -mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary rounded-2xl p-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex justify-center md:justify-start">
                      {newsletterIllustration && (
                          <Image
                          src={newsletterIllustration.imageUrl}
                          alt={newsletterIllustration.description}
                          width={200}
                          height={200}
                          className="w-48"
                          data-ai-hint={newsletterIllustration.imageHint}
                          />
                      )}
                  </div>
                  <div className="text-primary-foreground text-center md:text-left">
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to our newsletter for the latest updates and insights.</h2>
                      <p className="mb-6 text-primary-foreground/80">Stay ahead with the latest updates, insights, and events from Bajaur Chamber of Commerce.</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-grow">
                          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
                          <Input type="email" placeholder="Enter your email" className="pl-10 w-full bg-primary/80 border-primary/50 text-primary-foreground placeholder:text-primary-foreground/70" />
                        </div>
                          <Button variant="secondary" className="bg-white text-primary hover:bg-gray-200">
                            Subscribe
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card pt-32 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col space-y-4 md:col-span-2 lg:col-span-1">
                {logoImage && (
                  <Link href="#">
                    <Image
                      src={logoImage.imageUrl}
                      alt={logoImage.description}
                      width={144}
                      height={144}
                      data-ai-hint={logoImage.imageHint}
                    />
                  </Link>
                )}
                 <p className="text-muted-foreground">
                  The Bajaur Chamber of Commerce & Industry supports economic growth in Bajaur District by advocating for local businesses, enhancing trade, and fostering a thriving business environment.
                 </p>
              </div>

              <div>
                <h3 className="text-lg font-bold font-headline mb-4">Legal Pages</h3>
                <ul className="space-y-2">
                  {legalPages.map((page) => (
                    <li key={page.name}>
                      <Link href={page.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold font-headline mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold font-headline mb-4">Contact</h3>
                 <div className="space-y-3">
                    <a href="tel:+923082275587" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>+92 308 2275587</span>
                    </a>
                    <a href="mailto:contact@bajaurcci.com.pk" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>contact@bajaurcci.com.pk</span>
                    </a>
                    <p className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Khar, District Bajaur</span>
                    </p>
                </div>
                <div className="flex space-x-4 pt-4">
                  {socialMedia.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
