'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import CustomizerSidebar from '@/components/customizer-sidebar';
import PreviewArea from '@/components/preview-area';
import useCardNavConfig from '@/hooks/use-card-nav-config';
import { GalleryHorizontalEnd } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [config, setConfig] = useCardNavConfig();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="sidebar">
        <CustomizerSidebar config={config} setConfig={setConfig} />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-2 font-semibold">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <GalleryHorizontalEnd className="h-4 w-4" />
              <span className="sr-only">Bajaur Chamber of Commerce & Industry</span>
            </Button>
            <h1 className="text-lg font-headline">CardNav Customizer</h1>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <PreviewArea config={config} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
