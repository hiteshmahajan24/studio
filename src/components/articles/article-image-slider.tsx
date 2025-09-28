
'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

type ArticleImageSliderProps = {
  images: ImagePlaceholder[];
};

export function ArticleImageSlider({ images }: ArticleImageSliderProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="overflow-hidden">
              <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  data-ai-hint={image.imageHint}
                  fill
                  className="object-cover"
                />
                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-semibold">{image.description}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
