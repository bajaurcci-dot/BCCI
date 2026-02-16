'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

type GalleryItem = {
  id: string;
  image_url: string;
  title: string | null;
  sort_order: number | null;
};

const GallerySection = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('about_gallery')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 animate-fade-in">
          <Badge
            variant="outline"
            className="py-1 px-4 self-center border-primary/50 text-primary font-semibold mb-4"
          >
            Our Gallery
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-headline mt-4 mb-6">
            Moments and Milestones
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            A glimpse into our journey, events, and the community we serve.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((item, index) => (
              <div
                key={item.id}
                className="relative aspect-square rounded-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={item.image_url}
                  alt={item.title || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-[10px] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No moments captured yet. Stay tuned!
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
