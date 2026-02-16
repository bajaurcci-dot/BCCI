"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Youtube
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

function Footer() {
  // Footer link data
  const footerLinks = [
    {
      title: "Main Menu",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Vacancies", href: "/vacancies" },
        { label: "Downloads", href: "/downloads" },
        { label: "Compliances", href: "/compliances" },
      ],
    },
    {
      title: "Membership Center",
      links: [
        { label: "Membership Fee", href: "/membership" },
        { label: "Online Registration", href: "/membership/online-registration" },
        { label: "Member Verification", href: "/membership/member-verification" },
        { label: "Membership Services", href: "/services" },
      ],
    },
    {
      title: "Resources & Legal",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-conditions" },
      ],
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "https://www.facebook.com/bccikhar/" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/bcci_khar/" },
    { icon: <Youtube size={20} />, label: "Youtube", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Globe size={20} />, label: "Website", href: "/" },
  ];

  return (
    <footer className="bg-white relative h-fit rounded-[24px] sm:rounded-3xl overflow-hidden m-4 sm:m-8 border border-[#AFE1AF] shadow-sm mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto p-6 sm:p-8 md:p-14 z-40 relative pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12 pointer-events-auto">
          {/* Brand section */}
          <div className="flex flex-col space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <span className="text-foreground text-2xl sm:text-3xl font-bold font-headline">BCCI</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              The Bajaur Chamber of Commerce & Industry provides a comprehensive range of services designed to support local businesses, facilitate trade, and foster sustainable economic development in the region.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h4 className="text-foreground text-base sm:text-lg font-bold mb-4 sm:mb-6 font-headline">
                {section.title}
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-[#22c55e] transition-colors text-xs sm:text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Contact Info (Horizontal Row) */}
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-6 sm:gap-8 md:gap-16 py-8 border-t border-border/10 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="bg-[#AFE1AF]/20 p-1.5 sm:p-2 rounded-full">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#22c55e]" />
            </div>
            <span className="text-muted-foreground text-xs sm:text-sm font-medium">Khar, District Bajaur</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#AFE1AF]/20 p-1.5 sm:p-2 rounded-full">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#22c55e]" />
            </div>
            <a href="tel:+923082275587" className="text-muted-foreground hover:text-[#22c55e] transition-colors text-xs sm:text-sm font-medium">
              +92 308 2275587
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#AFE1AF]/20 p-1.5 sm:p-2 rounded-full">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#22c55e]" />
            </div>
            <a href="mailto:contact@bajaurcci.com.pk" className="text-muted-foreground hover:text-[#22c55e] transition-colors text-xs sm:text-sm font-medium">
              contact@bajaurcci.com.pk
            </a>
          </div>
        </div>

        <hr className="border-t border-border my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 pointer-events-auto">
          {/* Copyright */}
          <p className="text-center md:text-left text-muted-foreground">
            &copy; {new Date().getFullYear()} BCCI. All rights reserved.
          </p>

          {/* Developer Credits */}
          <p className="text-center md:text-right text-muted-foreground flex items-center gap-1">
            Developed by <a href="https://umarhashmi.dev" target="_blank" rel="noopener noreferrer" className="hover:text-[#22c55e] transition-colors font-medium">Umar Hashmi</a>
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[20rem] md:h-[30rem] -mt-32 md:-mt-32 -mb-24 md:-mb-36 select-none opacity-50 relative z-10 pointer-events-auto">
        <TextHoverEffect text="BCCI" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default Footer;
