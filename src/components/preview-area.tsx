'use client';

import type { CardNavConfig } from '@/hooks/use-card-nav-config';
import { Card } from '@/components/ui/card';
import CardNav from './card-nav';

interface PreviewAreaProps {
  config: CardNavConfig;
}

export default function PreviewArea({ config }: PreviewAreaProps) {
  return (
    <Card className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-muted/40">
      <div
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      ></div>
      <div className="relative">
        <CardNav config={config} />
      </div>
      <div className="absolute bottom-4 text-sm text-muted-foreground">
        <p>This is a live preview. Interact with the component.</p>
      </div>
    </Card>
  );
}
