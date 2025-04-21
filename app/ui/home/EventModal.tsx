'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Tag, X, ExternalLink, ImageIcon } from 'lucide-react';

interface EventModalProps {
  event: any;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [imgError, setImgError] = useState(false);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    // Prevent scrolling of background content
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { delay: 0.2, duration: 0.3 }
    }
  };
  
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: 10,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 200
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={backdropVariants}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60" />
        
        <motion.div
          className="relative w-full max-w-xl bg-gradient-to-b from-[#151f38] to-[#0d1526] rounded-xl overflow-hidden shadow-2xl border border-white/10 z-10"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button with hover effect */}
          <motion.button
            className="absolute right-3 top-3 z-20 bg-black/40 backdrop-blur-md rounded-full p-1.5 border border-white/10 text-white/80 hover:text-white"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={18} />
          </motion.button>

          {/* Image section with gradient overlay */}
          <div className="relative h-52 md:h-64 w-full">
            {imgError ? (
              <div className="h-full w-full bg-gradient-to-r from-blue-900/50 to-purple-900/50 flex flex-col items-center justify-center">
                <ImageIcon className="w-16 h-16 text-white/30 mb-3" />
                <p className="text-white/60">Image not available</p>
              </div>
            ) : (
              <Image
                src={event.image_url || '/events/default-event.jpg'}
                alt={event.name}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#151f38]" />
            
            {/* Event mode badge */}
            <motion.div 
              className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {event.mode}
            </motion.div>
          </div>

          <motion.div 
            className="p-5 md:p-7"
            variants={contentVariants}
          >
            {/* Title with animation */}
            <motion.h2 
              className="mb-6 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
              variants={itemVariants}
            >
              {event.name}
            </motion.h2>

            {/* Event details with icons */}
            <motion.div 
              className="space-y-4 mb-6"
              variants={contentVariants}
            >
              <motion.div className="flex items-center gap-3" variants={itemVariants}>
                <div className="p-2 bg-white/5 rounded-full">
                  <Calendar size={16} className="text-accent" />
                </div>
                <span className="text-white/80">{event.date}</span>
              </motion.div>
              
              <motion.div className="flex items-center gap-3" variants={itemVariants}>
                <div className="p-2 bg-white/5 rounded-full">
                  <Clock size={16} className="text-accent" />
                </div>
                <span className="text-white/80">{event.time || "TBA"}</span>
              </motion.div>
              
              <motion.div className="flex items-center gap-3" variants={itemVariants}>
                <div className="p-2 bg-white/5 rounded-full">
                  <MapPin size={16} className="text-accent" />
                </div>
                <span className="text-white/80">{event.venue}</span>
              </motion.div>
              
              <motion.div className="flex items-center gap-3" variants={itemVariants}>
                <div className="p-2 bg-white/5 rounded-full">
                  <Tag size={16} className="text-accent" />
                </div>
                <span className="text-white/80">
                  {Number(event.fee) > 0 ? `₹${event.fee}` : "Free Entry"}
                </span>
              </motion.div>
            </motion.div>

            {/* Event description */}
            <motion.div 
              className="mb-7 bg-white/5 border border-white/10 rounded-lg p-4"
              variants={itemVariants}
            >
              <h3 className="text-white/90 font-medium mb-2">Description</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {event.description || "No description available for this event."}
              </p>
            </motion.div>

            {/* Registration button with animation */}
            <motion.div variants={itemVariants}>
              <motion.a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 px-6 bg-accent text-primary font-medium rounded-lg flex items-center justify-center gap-2 group"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Register for Event
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    repeatType: "loop" 
                  }}
                >
                  <ExternalLink size={16} />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
