'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import Image from 'next/image';

type HeroCarouselProps = {
  images: string[];
  options?: EmblaOptionsType;
};

export default function HeroCarousel({ images, options }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    
    // Auto-play functionality
    const autoplayInterval = setInterval(() => {
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0);
      } else {
        emblaApi.scrollNext();
      }
    }, 5000);
    
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoplayInterval);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full h-full">
      <div className="embla w-full h-full">
        <div className="embla__viewport w-full h-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {images.map((src, index) => (
              <div className="embla__slide min-w-full relative" key={index}>
                <div className="embla__slide__inner relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-xl"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <div className="flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${selectedIndex === index ? 'bg-accent' : 'bg-white/30'}`}
              onClick={() => scrollTo(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}