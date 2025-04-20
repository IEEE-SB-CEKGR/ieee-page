'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
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
    <div className="relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <motion.div 
              key={index} 
              className="relative flex-[0_0_100%] min-w-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="pt-[56.25%] relative">
                <Image
                  src={src}
                  alt={`IEEE event ${index + 1}`}
                  fill
                  className="absolute inset-0 object-cover rounded-lg"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0">
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