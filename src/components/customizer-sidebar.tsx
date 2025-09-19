'use client';
import type { Dispatch, SetStateAction } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SidebarHeader, SidebarContent } from '@/components/ui/sidebar';
import type { CardNavConfig, MenuItem } from '@/hooks/use-card-nav-config';
import {
  Paintbrush,
  AppWindow,
  List,
  Download,
  Sparkles,
  Trash2,
  GripVertical,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ColorPicker from './color-picker';
import StyleSuggestions from './style-suggestions';
import CodeGenerator from './code-generator';
import { ScrollArea } from './ui/scroll-area';
import * as LucideIcons from 'lucide-react';

interface CustomizerSidebarProps {
  config: CardNavConfig;
  setConfig: Dispatch<SetStateAction<CardNavConfig>>;
}

export default function CustomizerSidebar({
  config,
  setConfig,
}: CustomizerSidebarProps) {
  const handleThemeChange = (key: keyof CardNavConfig['theme'], value: string) => {
    setConfig(prev => ({ ...prev, theme: { ...prev.theme, [key]: value } }));
  };

  const handleLogoChange = (key: keyof CardNavConfig['logo'], value: any) => {
    setConfig(prev => ({ ...prev, logo: { ...prev.logo, [key]: value } }));
  };

  const handleAnimationChange = (
    key: keyof CardNavConfig['animation'],
    value: string
  ) => {
    setConfig(prev => ({
      ...prev,
      animation: { ...prev.animation, [key]: value },
    }));
  };

  const handleMenuItemChange = (
    id: string,
    field: keyof MenuItem,
    value: string
  ) => {
    setConfig(prev => ({
      ...prev,
      menuItems: prev.menuItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addMenuItem = () => {
    const newId = (Math.max(...config.menuItems.map(i => parseInt(i.id))) + 1).toString();
    setConfig(prev => ({
      ...prev,
      menuItems: [
        ...prev.menuItems,
        { id: newId, label: 'New Item', href: '#', icon: 'Link' },
      ],
    }));
  };

  const removeMenuItem = (id: string) => {
    setConfig(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter(item => item.id !== id),
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleLogoChange('src', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const iconNames = Object.keys(LucideIcons).filter(key => key !== 'createLucideIcon' && key !== 'LucideIcon' && key !== 'icons');

  return (
    <>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Customize</h2>
      </SidebarHeader>
      <ScrollArea className="flex-1">
        <SidebarContent>
          <Accordion type="multiple" defaultValue={['ai-suggestions']} className="w-full">
            <AccordionItem value="ai-suggestions">
              <AccordionTrigger className="px-2 text-base font-medium">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Suggestions
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <StyleSuggestions setConfig={setConfig} currentLogo={config.logo.src} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="appearance">
              <AccordionTrigger className="px-2 text-base font-medium">
                <div className="flex items-center gap-2">
                  <Paintbrush className="h-5 w-5" />
                  Appearance
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 p-2">
                <div className="space-y-4 rounded-md border p-4">
                  <h3 className="font-medium">Logo</h3>
                  <div className="space-y-2">
                    <Label htmlFor="logo-upload">Logo Image</Label>
                    <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="text-xs"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-alt">Alt Text</Label>
                    <Input
                      id="logo-alt"
                      value={config.logo.alt}
                      onChange={e => handleLogoChange('alt', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Size: {config.logo.size}px</Label>
                    <Slider
                      value={[config.logo.size]}
                      onValueChange={([v]) => handleLogoChange('size', v)}
                      min={24}
                      max={96}
                      step={1}
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-md border p-4">
                  <h3 className="font-medium">Theme Colors</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <ColorPicker
                      label="Card Base"
                      value={config.theme.baseColor}
                      onChange={v => handleThemeChange('baseColor', v)}
                    />
                    <ColorPicker
                      label="Menu"
                      value={config.theme.menuColor}
                      onChange={v => handleThemeChange('menuColor', v)}
                    />
                    <ColorPicker
                      label="Button"
                      value={config.theme.buttonBgColor}
                      onChange={v => handleThemeChange('buttonBgColor', v)}
                    />
                    <ColorPicker
                      label="Button Icon"
                      value={config.theme.buttonTextColor}
                      onChange={v => handleThemeChange('buttonTextColor', v)}
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-md border p-4">
                  <h3 className="font-medium">Animation</h3>
                  <div className="space-y-2">
                    <Label htmlFor="anim-easing">Easing</Label>
                    <Select
                      value={config.animation.easing}
                      onValueChange={v => handleAnimationChange('easing', v)}
                    >
                      <SelectTrigger id="anim-easing">
                        <SelectValue placeholder="Select easing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ease-linear">Linear</SelectItem>
                        <SelectItem value="ease-in">Ease In</SelectItem>
                        <SelectItem value="ease-out">Ease Out</SelectItem>
                        <SelectItem value="ease-in-out">Ease In-Out</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="menu-items">
              <AccordionTrigger className="px-2 text-base font-medium">
                <div className="flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Menu Items
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-2 space-y-4">
                {config.menuItems.map(item => (
                  <div key={item.id} className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                       <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => removeMenuItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-label-${item.id}`}>Label</Label>
                      <Input
                        id={`item-label-${item.id}`}
                        value={item.label}
                        onChange={e =>
                          handleMenuItemChange(item.id, 'label', e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-href-${item.id}`}>Link (href)</Label>
                      <Input
                        id={`item-href-${item.id}`}
                        value={item.href}
                        onChange={e =>
                          handleMenuItemChange(item.id, 'href', e.target.value)
                        }
                      />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor={`item-icon-${item.id}`}>Icon</Label>
                       <Select
                        value={item.icon}
                        onValueChange={v => handleMenuItemChange(item.id, 'icon', v)}
                       >
                         <SelectTrigger id={`item-icon-${item.id}`}>
                           <SelectValue placeholder="Select icon" />
                         </SelectTrigger>
                         <SelectContent>
                           {iconNames.map(iconName => (
                            <SelectItem key={iconName} value={iconName}>{iconName}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                    </div>
                  </div>
                ))}
                <Button onClick={addMenuItem} className="w-full">
                  Add Menu Item
                </Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="export">
              <AccordionTrigger className="px-2 text-base font-medium">
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <CodeGenerator config={config} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarContent>
      </ScrollArea>
    </>
  );
}
