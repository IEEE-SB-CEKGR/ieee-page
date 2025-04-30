'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Social from '@/app/ui/home/Social';
import '@/app/ui/global.css';
import HeroCarousel from './ui/home/HeroCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Calendar, Users, Award, BookOpen, ArrowRight, MapPin } from 'lucide-react';
import AnimatedSection from '@/app/ui/home/AnimatedSection';
import TextReveal from '@/app/ui/home/TextReveal';
import TiltCard from '@/app/ui/home/TiltCard';
import CountUp from '@/app/ui/home/CountUp';
import Image from 'next/image';
import TypewriterReveal from '@/app/ui/home/TypewriterReveal';
import CircuitText from '@/app/ui/home/CircuitText';
import { fetchAchievements, fetchTopEvents, fetchStats } from '@/app/lib/actions';
import type { Event, Stats } from '@/app/lib/actions';

// Define the Achievement type
export type Achievement = {
  id: string;
  name: string;
  type: string;
  date: string;
  description: string;
  image_url: string;
  link?: string | undefined;
};

const images = [
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1920&auto=format&fit=crop'
];

const OPTIONS: EmblaOptionsType = { 
  loop: true,
  dragFree: true,
  containScroll: 'trimSnaps'
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export default function Page() {
  const statsRef = useRef(null);
  const eventsRef = useRef(null);
  const aboutRef = useRef(null);
  const achievementsRef = useRef(null);
  
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isEventsInView = useInView(eventsRef, { once: true, amount: 0.2 });
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 });
  const isAchievementsInView = useInView(achievementsRef, { once: true, amount: 0.2 });
  
  const heroRef = useRef(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Add state for achievements data, loading, and errors
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(true);
  const [achievementsError, setAchievementsError] = useState<string | null>(null);

  // Add state for events data
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Add state for stats data
  const [statsData, setStatsData] = useState<Stats>({ members: 0, events: 0, awards: 0, years: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Use the server action to fetch achievements
  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setIsLoadingAchievements(true);
        const data = await fetchAchievements();

        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setAchievementsError('Failed to load achievements data');
      } finally {
        setIsLoadingAchievements(false);
      }
    };
    
    loadAchievements();
  }, []);

  // Use the server action to fetch events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const data = await fetchTopEvents(3);

        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEventsError('Failed to load events data');
      } finally {
        setIsLoadingEvents(false);
      }
    };
    
    loadEvents();
  }, []);

  // Add this useEffect to fetch stats data
  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoadingStats(true);
        const data = await fetchStats();

        setStatsData(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStatsError('Failed to load stats data');
      } finally {
        setIsLoadingStats(false);
      }
    };
    
    loadStats();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  // Format date for events in a human-readable way
  const formatEventDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#040D21] to-[#0A1A3A]">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center w-full pt-20"
      >
        {/* Enhanced animated gradient background */}
        <motion.div 
          className="absolute inset-0 -z-10" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* More vibrant, larger gradients */}
          <div className="absolute top-0 -left-4 w-[40vw] h-[40vw] bg-accent/25 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] bg-blue-700/20 rounded-full blur-[150px] animate-pulse-slow-delay" />
          <div className="absolute top-1/3 right-1/4 w-[25vw] h-[25vw] bg-purple-700/10 rounded-full blur-[100px] animate-float" />
          
          {/* Enhanced animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Particles with more variety */}
            <div className="particles-container">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${i % 2 === 0 ? 'w-1 h-1' : 'w-2 h-2'} ${i % 3 === 0 ? 'bg-white/30' : 'bg-accent/30'} rounded-full`}
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    scale: Math.random() * 0.5 + 0.5,
                    opacity: Math.random() * 0.6 + 0.2
                  }}
                  animate={{
                    y: [
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%"
                    ],
                    x: i % 4 === 0 ? [
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%"
                    ] : undefined,
                    opacity: [
                      Math.random() * 0.6 + 0.2,
                      Math.random() * 0.6 + 0.2,
                      Math.random() * 0.6 + 0.2
                    ]
                  }}
                  transition={{
                    duration: Math.random() * 20 + 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
            
            {/* Floating shapes with improved variety */}
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className="absolute opacity-20"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: Math.random() * 0.5 + 0.5,
                  rotate: Math.random() * 360
                }}
                animate={{
                  x: [
                    `${Math.random() * 100}%`, 
                    `${Math.random() * 100}%`, 
                    `${Math.random() * 100}%`
                  ],
                  y: [
                    `${Math.random() * 100}%`, 
                    `${Math.random() * 100}%`, 
                    `${Math.random() * 100}%`
                  ],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: Math.random() * 50 + 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div 
                  className={`
                    ${i % 3 === 0 ? 'w-32 h-32' : i % 2 === 0 ? 'w-48 h-48' : 'w-24 h-24'}
                    ${i % 4 === 0 ? 'bg-blue-500/10' : i % 3 === 0 ? 'bg-purple-500/10' : 'bg-accent/10'} 
                    ${i % 2 === 0 ? 'rounded-full' : 'rounded-3xl'} blur-lg
                  `}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-10 md:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Content Column */}
            <motion.div 
              className="text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
              style={{ y, opacity }}
            >
              <motion.div 
                className="inline-block mb-6 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium backdrop-blur-sm border border-accent/20"
                variants={fadeInUp}
                custom={0}
              >
                <TypewriterReveal 
                  text="Advancing Technology for Humanity" 
                  delay={0.5} 
                  showCursor={false}
                />
              </motion.div>

              {/* Circuit-style animated title */}
              <div className="mb-6">
                <CircuitText 
                  text="COLLEGE OF ENGINEERING KIDANGOOR" 
                  className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tighter"
                  delay={0.8}
                />
                <motion.div
                  className="mt-4 inline-flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                >
                  <div className="h-6 w-[3px] bg-accent"></div>
                  <TypewriterReveal 
                    text="IEEE SB CE KGR"
                    className="text-accent text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter"
                    delay={1.4}
                    cursorColor="#ffffff"
                  />
                </motion.div>
              </div>

              {/* Additional tech-inspired element to add after the title */}
              <motion.div
                className="hidden lg:block absolute -right-4 -top-4 z-0 opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                  <motion.path
                    d="M50 10 L50 90 M10 50 L90 50"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-accent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 2.2, duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M20 20 L80 80 M20 80 L80 20"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-accent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 2.4, duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>

              <motion.div 
                className="mt-8 mb-12 max-w-[600px] mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                {/* Decorative element */}
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9, duration: 0.6 }}
                >
                  <div className="h-[2px] w-8 bg-accent"/>
                  <span className="text-accent text-xs uppercase tracking-widest font-medium">Our Mission</span>
                </motion.div>
                
                {/* Main description with enhanced typography */}
                <motion.p
                  className="text-white/90 text-xl font-light leading-relaxed mb-4 tracking-wide"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0, duration: 0.7 }}
                >
                  <span className="text-accent font-normal">Empowering</span> engineering students through technical innovation and professional development.
                </motion.p>
                
                {/* Secondary description with professional styling */}
                <motion.div
                  className="relative pl-4 border-l-2 border-accent/30 ml-1"
                  initial={{ opacity: 0, y: 15, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                >
                  <p className="text-white/70 leading-relaxed font-light">
                    Join us in building technology for a better tomorrow through collaboration, innovation, and excellence in engineering practices.
                  </p>
                  
                  {/* Animated dot indicator */}
                  <motion.div 
                    className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-accent"
                    animate={{ 
                      y: [0, 40, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
                variants={fadeInUp}
                custom={3}
              >
                <Link href="/join" className="group">
                  <motion.button 
                    className="group-hover:shadow-lg group-hover:shadow-accent/20 px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    JOIN IEEE
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatDelay: 1,
                        ease: "easeInOut" 
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                </Link>
                <Link href="/events">
                  <motion.button 
                    className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    EXPLORE EVENTS
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                custom={4}
              >
                <Social 
                  containerStyles="flex gap-6 justify-center lg:justify-start"
                  iconsStyles="w-10 h-10 border border-accent/50 rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300"
                />
              </motion.div>
            </motion.div>

            {/* Image Column with Tilt Effect */}
            <motion.div 
              className="order-first lg:order-last h-full flex items-center justify-center w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]), scale }}
            >
              <TiltCard className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl w-full">
                <div className="w-full">
                  {/* Explicitly set height with aspect ratio */}
                  <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
                    <HeroCarousel images={images} options={OPTIONS} />
                  </div>
                  
                  {/* Floating badges */}
                  <motion.div
                    className="absolute top-5 right-5 bg-black/50 backdrop-blur-md px-3 py-2 rounded-full text-white text-xs font-medium border border-white/10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    Est. 2010
                  </motion.div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.span 
              className="text-white/50 text-sm mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Scroll to explore
            </motion.span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-6 h-6 text-white/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with CountUp */}
      <AnimatedSection 
        ref={statsRef}
        className="py-16 md:py-24 bg-accent/5 rounded-t-[40px] backdrop-blur-sm border-t border-white/10"
        delay={0.1}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={isStatsInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Our Impact in Numbers
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-accent mx-auto"
              initial={{ width: 0 }}
              animate={isStatsInView ? { width: 80 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>
          
          {/* Stats cards with CountUp */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            {isLoadingStats ? (
              // Loading state - show skeleton cards
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="mb-4 p-3 rounded-full bg-accent/10">
                    <div className="w-6 h-6 bg-accent/30 rounded-full animate-pulse" />
                  </div>
                  <div className="h-8 bg-white/10 rounded w-1/2 mb-2 animate-pulse" />
                  <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
                </motion.div>
              ))
            ) : statsError ? (
              // Error state (full width across all columns)
              <div className="col-span-4 text-center py-12">
                <p className="text-white/70">{statsError}</p>
                <button 
                  className="mt-4 px-6 py-2 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : (
              // Data loaded successfully - Map the stats to components with icons
              [
                { icon: Users, value: statsData.members, label: "Members", suffix: "+" },
                { icon: Calendar, value: statsData.events, label: "Events", suffix: "+" },
                { icon: Award, value: statsData.awards, label: "Awards", suffix: "+" },
                { icon: BookOpen, value: statsData.years, label: "Years", suffix: "+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    delay: 0.2 + index * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="mb-4 p-3 rounded-full bg-accent/10"
                    initial={{ scale: 0.8 }}
                    animate={isStatsInView ? { scale: 1 } : {}}
                    transition={{ 
                      delay: 0.3 + index * 0.1,
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <stat.icon className="w-6 h-6 text-accent" />
                  </motion.div>
                  <div className="text-4xl sm:text-5xl font-bold text-accent mb-2 flex items-center">
                    <CountUp end={stat.value} duration={2000} />
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-white/70 text-center font-medium">{stat.label}</div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </AnimatedSection>
      
      {/* Add Featured Events Section */}
      <AnimatedSection 
        ref={eventsRef}
        className="py-16 md:py-24 relative overflow-hidden"
        delay={0.2}
      >
        {/* Background decorations */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-accent/5 -skew-x-12 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
            <div>
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isEventsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                Featured Events
              </motion.h2>
              <motion.div 
                className="w-20 h-1 bg-accent"
                initial={{ width: 0 }}
                animate={isEventsInView ? { width: 80 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </div>
            
            <Link href="/events">
              <motion.button 
                className="mt-6 md:mt-0 px-6 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-primary transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={isEventsInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                View All Events
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
          
          {/* Event cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoadingEvents ? (
              // Loading state - show skeleton cards
              Array.from({ length: 3 }).map((_, index) => (
                <TiltCard key={`skeleton-${index}`} className="h-full">
                  <div className="h-full rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <div className="h-48 bg-white/5 animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-6 bg-white/10 rounded w-3/4 mb-4 animate-pulse"></div>
                      <div className="h-4 bg-white/5 rounded w-1/2 mb-6 animate-pulse"></div>
                      <div className="h-8 bg-white/5 rounded w-full animate-pulse"></div>
                    </div>
                  </div>
                </TiltCard>
              ))
            ) : eventsError ? (
              // Error state
              <div className="col-span-3 text-center py-12">
                <p className="text-white/70">{eventsError}</p>
                <button 
                  className="mt-4 px-6 py-2 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : events.length > 0 ? (
              // Data loaded successfully
              events.map((event, index) => (
                <TiltCard key={event.id} className="h-full">
                  <motion.div 
                    className="h-full rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isEventsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={
                          event.image_url 
                            ? `${(process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')}/${event.image_url.replace(/^\/+/, '')}`
                            : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1920&auto=format&fit=crop"
                        } 
                        alt={event.name || `Event`}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-accent/90 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        {event.mode} {/* Using mode instead of type */}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-white/70 flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> {formatEventDate(event.date)}
                        </p>
                        <p className="text-white/70 flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4" /> {event.venue}
                        </p>
                      </div>
                      <Link href={event.link || `/events/${event.id}`}>
                        <motion.button 
                          className="w-full py-2 text-center rounded bg-white/10 hover:bg-accent hover:text-primary transition-all duration-300 text-white"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Learn More
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </TiltCard>
              ))
            ) : (
              // No events found
              <div className="col-span-3 text-center py-12">
                <p className="text-white/70">No upcoming events found</p>
                <Link href="/events">
                  <button 
                    className="mt-4 px-6 py-2 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20"
                  >
                    View Past Events
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Achievements Section */}
      <AnimatedSection 
        ref={achievementsRef}
        className="py-16 md:py-28 relative overflow-hidden bg-gradient-to-b from-transparent to-[#081630]"
        delay={0.2}
      >
        {/* Background Decorative Elements */}
        <motion.div 
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-blue-900/10 -skew-x-12 -z-10 blur-3xl" 
        />
        
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <motion.h2 
              className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={isAchievementsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Our Notable Achievements
            </motion.h2>
            
            <motion.div 
              className="w-20 h-1 bg-accent mx-auto mb-6"
              initial={{ width: 0 }}
              animate={isAchievementsInView ? { width: 80 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            
            <motion.p
              className="text-white/70 text-lg"
              initial={{ opacity: 0 }}
              animate={isAchievementsInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              Celebrating excellence and innovation throughout our journey
            </motion.p>
          </div>
          
          {/* Achievement Cards with Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line - made thinner and adjusted z-index */}
            <motion.div 
              className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/70 via-accent/40 to-accent/10 hidden md:block z-0"
              initial={{ height: 0 }}
              animate={isAchievementsInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            <div className="space-y-16 md:space-y-32">
              {isLoadingAchievements ? (
                // Loading state - show skeleton cards
                Array.from({ length: 3 }).map((_, index) => (
                  <motion.div 
                    key={`skeleton-${index}`}
                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {/* Timeline Node */}
                    <div className="hidden md:block absolute left-[50%] w-6 h-6 -ml-3 rounded-full border-2 border-accent/30 bg-[#081630] z-10" />
                    
                    {/* Image Skeleton */}
                    <div className="w-full md:w-[45%]">
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 h-60 animate-pulse" />
                    </div>
                    
                    {/* Content Skeleton */}
                    <div className="w-full md:w-[45%] text-center md:text-left">
                      <div className="p-6 md:p-0 md:px-4">
                        <div className="h-8 bg-white/10 rounded w-3/4 mb-4 animate-pulse" />
                        <div className="h-4 bg-white/5 rounded w-full mb-2 animate-pulse" />
                        <div className="h-4 bg-white/5 rounded w-5/6 mb-2 animate-pulse" />
                        <div className="h-4 bg-white/5 rounded w-4/6 mb-6 animate-pulse" />
                        <div className="h-6 bg-accent/10 rounded w-32 animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : achievementsError ? (
                // Error state
                <div className="text-center py-12">
                  <p className="text-white/70">{achievementsError}</p>
                  <button 
                    className="mt-4 px-6 py-2 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                // Data loaded successfully
                achievements.slice(0, 3).map((achievement, index) => (
                  <motion.div 
                    key={achievement.id}
                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isAchievementsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.2, duration: 0.7 }}
                  >
                    {/* Timeline Node */}
                    <div className="hidden md:block absolute left-[50%] w-6 h-6 -ml-3 rounded-full border-2 border-accent bg-[#081630] z-10" />
                    
                    {/* Image Side */}
                    <div className="w-full md:w-[45%]">
                      <TiltCard className="overflow-hidden rounded-xl border border-white/10 shadow-xl">
                        <div className="relative h-60 w-full overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#081630] to-transparent opacity-60 z-10" />
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full"
                          >
                            <Image 
                              src={
                                achievement.image_url 
                                  ? `${(process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')}/${achievement.image_url.replace(/^\/+/, '')}`
                                  : "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1920&auto=format&fit=crop"
                              } 
                              alt={achievement.name}
                              fill
                              className="object-cover"
                              priority={index === 0}  // Prioritize loading the first image
                              sizes="(max-width: 768px) 100vw, 45vw"  // Help browser optimize loading
                            />
                          </motion.div>
                          <div className="absolute top-4 left-4 z-20">
                            <span className="px-4 py-1 bg-accent text-primary text-sm font-medium rounded-full">
                              {formatDate(achievement.date)}
                            </span>
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                    
                    {/* Content Side */}
                    <div className="w-full md:w-[45%] text-center md:text-left">
                      <motion.div 
                        className="p-6 md:p-0 md:px-4"
                        whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h3 className="text-2xl font-bold text-white mb-4">{achievement.name}</h3>
                        <p className="text-white/70 leading-relaxed">{achievement.description}</p>
                        
                        <motion.div 
                          className="mt-6 inline-block"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link 
                            href={achievement.link || "/about"} 
                            className="text-accent font-medium flex items-center gap-2 group"
                          >
                            Read More 
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                repeatDelay: 1 
                              }}
                            >
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.span>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
          
          {/* View All Button */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isAchievementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <Link href="/about">
              <motion.button
                className="px-8 py-3 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent hover:text-primary transition-all duration-300 flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View All Achievements
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    </main>
  );
}
