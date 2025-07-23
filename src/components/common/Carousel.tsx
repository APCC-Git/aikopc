'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface Slide {
  content: React.ReactNode;
  style?: React.CSSProperties;
}

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function CarouselPlugin({ slides, className }: { slides: Slide[]; className?: string }) {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel plugins={[plugin.current]} className={`${className}`}>
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className={''}>
            <div className="border border-amber-400 min-h-[500px]">
              <CardContent className="">{slide.content}</CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
