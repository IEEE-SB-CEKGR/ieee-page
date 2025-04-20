'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fetchUpcomingEventsAction } from '@/app/lib/actions';
import EventModal from '@/app/ui/home/EventModal';
import { UpcomingEventsSkeleton } from '@/app/ui/skeletons';
import PageTransition from '@/app/ui/home/PageTransition';
import AnimatedSection from '@/app/ui/home/AnimatedSection';
import TiltCard from '@/app/ui/home/TiltCard';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Users, Tag, ArrowRight, Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardHover: Variants = {
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

interface Event {
  id: string;
  name: string;
  date: string;
  image_url: string;
  email: string;
  amount: string;
  mode: string;
  venue: string;
  fee: string;
  description: string;
  link: string;
  time: string;
  status?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Refs for scroll animations
  const eventsGridRef = useRef(null);
  const isEventsGridInView = useInView(eventsGridRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchUpcomingEventsAction();
        setEvents(data || []);
        
        // Count events by category
        const counts = data?.reduce<Record<string, number>>((acc, event) => {
          const mode = event.mode?.toLowerCase() || 'unknown';
          acc[mode] = (acc[mode] || 0) + 1;
          return acc;
        }, {});
        setCategoryCounts(counts || {});
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const filters = [
    { id: 'all', label: 'All Events', icon: Users },
    { id: 'online', label: 'Online', icon: Calendar },
    { id: 'offline', label: 'Offline', icon: MapPin },
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = selectedFilter === 'all' || 
      (event.mode && event.mode.toLowerCase() === selectedFilter);
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const visibleEvents = sortedEvents.slice(0, visibleCount);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-[#040D21] to-[#0A1A3A]">
        {/* Header Section - Search only */}
        <div className="relative border-b border-white/5 backdrop-blur-sm py-8 mt-16">
          <motion.div 
            className="container mx-auto px-4 flex justify-center items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Enhanced search bar - centered */}
            <motion.div 
              className="relative w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="absolute top-3 left-4 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-white/5 border border-white/10 text-white rounded-full py-3 pl-12 pr-12 focus:outline-none focus:border-accent/50 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-3 text-white/50 hover:text-white"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Background particles */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-accent/30 rounded-full"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <div className="py-4 border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedFilter === filter.id 
                        ? 'bg-accent text-primary' 
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <filter.icon className="w-4 h-4" />
                    {filter.label}
                    {filter.id !== 'all' && categoryCounts[filter.id] && (
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                        selectedFilter === filter.id 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-white/10 text-white/70'
                      }`}>
                        {categoryCounts[filter.id]}
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>

              <motion.button 
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white/80 text-sm transition-colors"
                onClick={toggleSortOrder}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sort by Date 
                {sortOrder === 'desc' ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronUp size={16} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Events Grid - Main Focus */}
        <section ref={eventsGridRef} className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-xl text-white/90 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isLoading ? "Discovering events..." : (
                filteredEvents.length > 0 
                  ? <span>Showing <span className="text-accent font-bold">{visibleEvents.length}</span> of <span className="text-accent font-bold">{filteredEvents.length}</span> events</span>
                  : "No events match your search"
              )}
            </motion.h2>
            
            {/* Enhanced Event Grid with Masonry-like layout */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={isEventsGridInView ? "visible" : "hidden"}
            >
              {isLoading ? (
                // Enhanced skeleton loading with staggered animations
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                  >
                    <UpcomingEventsSkeleton />
                  </motion.div>
                ))
              ) : (
                // Enhanced events display with advanced animations
                <AnimatePresence>
                  {visibleEvents.map((event, index) => (
                    <motion.div 
                      key={event.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.9 }}
                      variants={fadeInUp}
                      onClick={() => handleEventClick(event)}
                      className="cursor-pointer"
                      layout
                    >
                      <TiltCard className="h-full" glareEffect={true}>
                        <motion.div 
                          className="h-full rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300"
                          variants={cardHover}
                          initial="rest"
                          whileHover="hover"
                        >
                          <div className="relative h-52 overflow-hidden">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.8 }}
                              className="h-full w-full"
                            >
                              <Image 
                                src={event.image_url || '/events/default-event.jpg'} 
                                alt={event.name}
                                fill
                                className="object-cover"
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
                          
                          <div className="p-5">
                            <div className="space-y-3 mb-4">
                              <div className="flex items-center text-white/80 gap-2">
                                <Calendar className="w-4 h-4 text-accent" /> 
                                <span className="text-sm">{event.date}</span>
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
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
            
            {/* Load more button with enhanced animation */}
            {!isLoading && visibleCount < filteredEvents.length && (
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-accent/10 border border-accent/30 text-white rounded-lg hover:bg-accent hover:text-primary transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 180, 248, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Events
                  <motion.span
                    animate={{ 
                      y: [0, 5, 0],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
            
            {/* Enhanced empty state */}
            {!isLoading && filteredEvents.length === 0 && (
              <motion.div 
                className="text-center py-20 max-w-lg mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div 
                  className="mb-8 inline-flex justify-center items-center w-24 h-24 rounded-full bg-accent/5 text-accent border border-accent/20"
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 5 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  <Search className="w-12 h-12" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-white mb-3">No events found</h3>
                <p className="text-white/60 mb-8">We couldn't find any events matching your current filters.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('all');
                  }}
                  className="px-6 py-3 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Event modal */}
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={handleCloseModal} />
        )}
        
        {/* Compact CTA section */}
        <div className="border-t border-white/10 py-10 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">
                  Want to join our upcoming events?
                </h3>
                <p className="text-white/60">
                  Become an IEEE member for exclusive access
                </p>
              </div>
              <Link href="/join">
                <motion.button 
                  className="px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join IEEE Today
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
