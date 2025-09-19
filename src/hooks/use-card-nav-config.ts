import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface CardNavConfig {
  logo: {
    src: string;
    alt: string;
    size: number;
    position: 'left' | 'center' | 'right';
  };
  menuItems: MenuItem[];
  theme: {
    baseColor: string;
    menuColor: string;
    buttonBgColor: string;
    buttonTextColor: string;
  };
  animation: {
    easing: string;
  };
}

const defaultLogo = PlaceHolderImages.find(img => img.id === 'logo');

const defaultConfig: CardNavConfig = {
  logo: {
    src: defaultLogo?.imageUrl || 'https://picsum.photos/seed/1/100/100',
    alt: 'Company Logo',
    size: 48,
    position: 'left',
  },
  menuItems: [
    { id: '1', label: 'Home', href: '#', icon: 'Home' },
    { id: '2', label: 'About', href: '#', icon: 'Info' },
    { id: '3', label: 'Services', href: '#', icon: 'Briefcase' },
    { id: '4', label: 'Contact', href: '#', icon: 'Mail' },
  ],
  theme: {
    baseColor: '#ffffff',
    menuColor: '#f5f3f4',
    buttonBgColor: '#9D4EDD',
    buttonTextColor: '#ffffff',
  },
  animation: {
    easing: 'ease-in-out',
  },
};

const useCardNavConfig = (): [
  CardNavConfig,
  Dispatch<SetStateAction<CardNavConfig>>,
] => {
  const [config, setConfig] = useState<CardNavConfig>(defaultConfig);
  return [config, setConfig];
};

export default useCardNavConfig;
