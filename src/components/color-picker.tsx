'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({
  label,
  value,
  onChange,
}: ColorPickerProps) {
  const id = `color-picker-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center justify-between">
        {label}
        <span className="text-xs font-mono uppercase text-muted-foreground">{value}</span>
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="pr-12"
        />
        <Input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10 p-1 cursor-pointer"
        />
      </div>
    </div>
  );
}
