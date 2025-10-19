'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fetchUpcomingEventsAction } from '@/app/lib/actions';
import EventModal from '@/app/ui/home/EventModal';
import { UpcomingEventsSkeleton } from '@/app/ui/skeletons';
import PageTransition from '@/app/ui/home/PageTransition';
import TiltCard from '@/app/ui/home/TiltCard';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Tag,
  ArrowRight,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import EventCard from '@/app/ui/events/EventCard';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
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
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {},
  );
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Refs for scroll animations
  const eventsGridRef = useRef(null);
  const isEventsGridInView = useInView(eventsGridRef, {
    once: true,
    amount: 0.1,
  });

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
        console.error('Error fetching events:', error);
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
    setVisibleCount((prev) => prev + 6);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const filters = [
    { id: 'all', label: 'All Events', icon: Users },
    { id: 'online', label: 'Online', icon: Calendar },
    { id: 'offline', label: 'Offline', icon: MapPin },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      (event.mode && event.mode.toLowerCase() === selectedFilter);
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Split into upcoming and past events
  const now = new Date();
  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.date) >= now,
  );
  const pastEvents = filteredEvents.filter(
    (event) => new Date(event.date) < now,
  );

  // Sort each group by date according to the selected sort order
  const sortedUpcoming = [...upcomingEvents].sort((a, b) => {
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    return sortOrder === 'asc' ? ta - tb : tb - ta;
  });

  const sortedPast = [...pastEvents].sort((a, b) => {
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    return sortOrder === 'asc' ? ta - tb : tb - ta;
  });

  const visibleUpcoming = sortedUpcoming.slice(0, visibleCount);
  const visiblePast = sortedPast.slice(0, visibleCount);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-[#040D21] to-[#0A1A3A]">
        {/* Header Section - Search only */}
        <div className="relative mt-16 border-b border-white/5 py-8 backdrop-blur-sm">
          <motion.div
            className="container mx-auto flex items-center justify-center px-4 sm:px-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Enhanced search bar - centered and responsive */}
            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="absolute left-4 top-3 h-5 w-5 text-white/50" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-12 pr-12 text-white transition-colors focus:border-accent/50 focus:outline-none"
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
                className="absolute h-1 w-1 rounded-full bg-accent/30"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <div className="border-b border-white/5 py-4">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <motion.div
                className="mb-3 flex w-full flex-wrap justify-center gap-2 sm:mb-0 sm:w-auto sm:justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium transition-all sm:gap-2 sm:px-4 sm:text-sm ${
                      selectedFilter === filter.id
                        ? 'bg-accent text-primary'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <filter.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    {filter.label}
                    {filter.id !== 'all' && categoryCounts[filter.id] && (
                      <span
                        className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                          selectedFilter === filter.id
                            ? 'bg-primary/20 text-primary'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {categoryCounts[filter.id]}
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>

              <motion.button
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/80 transition-colors hover:bg-white/10 sm:w-auto sm:justify-start sm:text-sm"
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
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Upcoming Events Section */}
            <motion.h2
              className="mb-6 text-xl text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Upcoming Events
            </motion.h2>
            <motion.div
              className="mx-auto grid max-w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate={isEventsGridInView ? 'visible' : 'hidden'}
            >
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    className="w-full max-w-sm"
                  >
                    <UpcomingEventsSkeleton />
                  </motion.div>
                ))
              ) : (
                <AnimatePresence>
                  {visibleUpcoming.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      onClick={() => handleEventClick(event)}
                    />
                  ))}
                </AnimatePresence>
              )}
            </motion.div>

            {/* Past Events Section */}
            {visiblePast.length > 0 && (
              <>
                <motion.h2
                  className="mb-6 mt-12 text-xl text-white/90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Past Events
                </motion.h2>
                <motion.div
                  className="mx-auto grid max-w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3"
                  variants={staggerContainer}
                  initial="hidden"
                  animate={isEventsGridInView ? 'visible' : 'hidden'}
                >
                  <AnimatePresence>
                    {visiblePast.map((event, index) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        index={index}
                        onClick={() => handleEventClick(event)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            )}

            {/* Load more button with enhanced animation */}
            {!isLoading && visibleCount < filteredEvents.length && (
              <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={handleLoadMore}
                  className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 px-8 py-3 text-white transition-all duration-300 hover:bg-accent hover:text-primary"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(138, 180, 248, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Events
                  <motion.span
                    animate={{
                      y: [0, 5, 0],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </motion.button>
              </motion.div>
            )}

            {/* Enhanced empty state */}
            {!isLoading && filteredEvents.length === 0 && (
              <motion.div
                className="mx-auto max-w-lg py-20 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full border border-accent/20 bg-accent/5 text-accent"
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 5 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Search className="h-12 w-12" />
                </motion.div>
                <h3 className="mb-3 text-2xl font-semibold text-white">
                  No events found
                </h3>
                <p className="mb-8 text-white/60">
                  We couldn&apos;t find any events matching your current
                  filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedFilter('all');
                  }}
                  className="rounded-lg bg-accent px-6 py-3 text-primary transition-colors hover:bg-accent/90"
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
        <div className="border-t border-white/10 bg-accent/5 py-6 sm:py-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
              <div className="text-center sm:text-left">
                <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">
                  Want to join our upcoming events?
                </h3>
                <p className="text-sm text-white/60 sm:text-base">
                  Become an IEEE member for exclusive access
                </p>
              </div>
              <Link href="https://www.ieee.org/membership/join">
                <motion.button
                  className="w-full rounded-lg bg-accent px-6 py-3 font-medium text-primary transition-all duration-300 hover:bg-accent/90 sm:w-auto"
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
