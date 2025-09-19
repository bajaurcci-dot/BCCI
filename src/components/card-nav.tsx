'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, type LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { CardNavConfig, MenuItem } from '@/hooks/use-card-nav-config';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface CardNavProps {
  config: CardNavConfig;
}

export default function CardNav({ config }: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { logo, menuItems, theme, animation } = config;

  const animationClass = useMemo(() => {
    const easingClasses: { [key: string]: string } = {
      'ease-linear': 'ease-linear',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    };
    return easingClasses[animation.easing] || 'ease-in-out';
  }, [animation.easing]);

  const cssVariables = {
    '--base-color': theme.baseColor,
    '--menu-color': theme.menuColor,
    '--button-bg-color': theme.buttonBgColor,
    '--button-text-color': theme.buttonTextColor,
  } as React.CSSProperties;
  
  const Icon = ({ name, ...props }: { name: string } & React.ComponentProps<LucideIcon>) => {
    const LucideIcon = (LucideIcons as any)[name];
    if (!LucideIcon) {
        return <LucideIcons.HelpCircle {...props} />;
    }
    return <LucideIcon {...props} />;
};


  if (!isMounted) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <Button size="icon" className="rounded-full w-14 h-14 shadow-lg" style={{ backgroundColor: theme.buttonBgColor }}>
          <Menu style={{ color: theme.buttonTextColor }} />
        </Button>
      </div>
    );
  }

  return (
    <div style={cssVariables} className="font-body">
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[--button-bg-color] text-[--button-text-color] shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative h-6 w-6">
            <Menu
              className={cn(
                'absolute transition-all duration-300',
                animationClass,
                isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              )}
            />
            <X
              className={cn(
                'absolute transition-all duration-300',
                animationClass,
                isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              )}
            />
          </div>
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300',
          animationClass,
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          'fixed bottom-24 right-5 z-40 w-[300px] origin-bottom-right rounded-xl bg-[--base-color] p-4 shadow-2xl transition-all duration-500',
          animationClass,
          isOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-90 pointer-events-none'
        )}
      >
        <div className="flex items-center border-b pb-4 mb-4" style={{ justifyContent: logo.position }}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.size}
            height={logo.size}
            className="rounded-md"
            style={{ width: `${logo.size}px`, height: `${logo.size}px` }}
          />
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg p-3 text-base font-medium text-foreground transition-colors hover:bg-[--menu-color]"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon name={item.icon} className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
