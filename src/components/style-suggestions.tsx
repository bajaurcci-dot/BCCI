'use client';
import { useState, useTransition } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getStyleSuggestions } from '@/app/actions';
import type { CardNavConfig } from '@/hooks/use-card-nav-config';
import { useToast } from '@/hooks/use-toast';
import type { SuggestComponentStylingOutput } from '@/ai/flows/suggest-component-styling';
import { Loader2 } from 'lucide-react';

interface StyleSuggestionsProps {
  setConfig: Dispatch<SetStateAction<CardNavConfig>>;
  currentLogo: string;
}

export default function StyleSuggestions({ setConfig, currentLogo }: StyleSuggestionsProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [brandingDesc, setBrandingDesc] = useState('Modern, sophisticated, and creative.');
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<SuggestComponentStylingOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    let logoDataUri = currentLogo;

    if (logoFile) {
        const reader = new FileReader();
        reader.readAsDataURL(logoFile);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                logoDataUri = reader.result;
                fetchSuggestions(logoDataUri);
            }
        };
        reader.onerror = () => {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not read file.' });
        }
    } else {
        fetchSuggestions(logoDataUri);
    }
  };

  const fetchSuggestions = (logoDataUri: string) => {
    startTransition(async () => {
      const result = await getStyleSuggestions({ logoDataUri, brandingDescription: brandingDesc });
      if (result.success) {
        setSuggestions(result.data);
      } else {
        toast({ variant: 'destructive', title: 'AI Error', description: result.error });
      }
    });
  }

  const applyColor = (color: string, target: 'buttonBgColor' | 'baseColor' | 'menuColor') => {
    setConfig(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [target]: color
      }
    }));
    toast({ title: 'Color Applied!', description: `${target} updated to ${color}`});
  };

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="p-0 pb-4">
        <CardDescription>
          Upload your logo and describe your brand to get AI-powered style suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logo-ai-upload">Logo</Label>
          <Input id="logo-ai-upload" type="file" onChange={handleFileChange} accept="image/*" className="text-xs" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="branding-desc">Branding Description</Label>
          <Textarea
            id="branding-desc"
            value={brandingDesc}
            onChange={(e) => setBrandingDesc(e.target.value)}
            placeholder="e.g., Playful and vibrant, for a young audience."
          />
        </div>
        <Button onClick={handleSubmit} disabled={isPending} className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Get Suggestions
        </Button>
      </CardContent>
      {suggestions && (
        <CardFooter className="p-0 pt-4 flex-col items-start gap-4">
          <div>
            <h4 className="font-semibold">Reasoning</h4>
            <p className="text-sm text-muted-foreground">{suggestions.reasoning}</p>
          </div>
          <div>
            <h4 className="font-semibold">Color Palette</h4>
            <div className="flex gap-2 mt-2">
              {suggestions.colorSuggestions.map((color, i) => (
                <div key={i} className="group relative">
                   <div
                    className="h-10 w-10 rounded-md border cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center w-max p-1 rounded-md bg-popover border text-popover-foreground shadow-lg text-xs">
                      <p className="font-mono">{color}</p>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-auto p-1" onClick={() => applyColor(color, 'buttonBgColor')}>Btn</Button>
                        <Button size="sm" variant="ghost" className="h-auto p-1" onClick={() => applyColor(color, 'baseColor')}>Card</Button>
                        <Button size="sm" variant="ghost" className="h-auto p-1" onClick={() => applyColor(color, 'menuColor')}>Menu</Button>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Font Suggestions</h4>
            <div className="flex gap-2 mt-2">
              {suggestions.fontSuggestions.map((font, i) => (
                <div key={i} className="rounded-md border bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                  {font}
                </div>
              ))}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
