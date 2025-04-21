'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import TiltCard from '@/app/ui/home/TiltCard';

const cardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    y: -5,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 17 
    } 
  }
};

interface EventCardProps {
  event: any;
  index: number;
  onClick: () => void;
}

export default function EventCard({ event, index, onClick }: EventCardProps) {
  // Use a more direct approach to handle image source
  const [imgError, setImgError] = useState(false);
  
  // Define image source without trying to manipulate URLs
  const imageSource = imgError || !event.image_url 
    ? '/events/default-event.jpg' 
    : event.image_url;

  return (
    <motion.div 
      custom={index}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.08,
            duration: 0.5,
            ease: "easeOut"
          }
        })
      }}
      onClick={onClick}
      className="cursor-pointer w-full max-w-sm"
      layout
    >
      <TiltCard className="h-full">
        <motion.div 
          className="h-full rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300"
          variants={cardHover}
          initial="rest"
          whileHover="hover"
        >
          <div className="relative h-40 sm:h-52 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="h-full w-full"
            >
              <Image 
                src={imageSource}
                alt={event.name || "Event"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
                onError={() => setImgError(true)}
              />
            </motion.div>
            
            {/* Enhanced badges with animations */}
            <motion.div 
              className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              {event.mode}
            </motion.div>
            
            {Number(event.fee) > 0 ? (
              <motion.div 
                className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                ₹{event.fee}
              </motion.div>
            ) : (
              <motion.div 
                className="absolute top-4 left-4 bg-green-500/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                Free
              </motion.div>
            )}
            
            {/* Date badge for quick reference */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <motion.h3 
                className="text-lg font-bold text-white truncate"
                exit={{ opacity: 0 }}
              >
                {event.name}
              </motion.h3>
            </motion.div>
          </div>
          
          <div className="p-3 sm:p-5">
            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
              <div className="flex items-center text-white/80 gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-accent" /> 
                <span className="text-xs sm:text-sm">{event.date}</span>
              </div>
              <div className="flex items-center text-white/80 gap-2">
                <MapPin className="w-4 h-4 text-accent" /> 
                <span className="text-sm truncate">{event.venue}</span>
              </div>
              <div className="flex items-center text-white/80 gap-2">
                <Clock className="w-4 h-4 text-accent" /> 
                <span className="text-sm">{event.time || "TBA"}</span>
              </div>
            </div>
            
            <motion.button 
              className="w-full py-2.5 text-center rounded-lg bg-white/10 hover:bg-accent hover:text-primary transition-all duration-300 text-white group flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Details
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  repeatType: "loop" 
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}