'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fetchTimeline, fetchTopAchievements } from '@/app/lib/actions';
import type { Timeline, Achievement } from '@/app/lib/actions';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Special title animation that appears to come from navbar
const titleAnimation = {
  hidden: { opacity: 0, y: -100 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15, 
      delay: 0.2,
      duration: 0.8
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

export default function AboutPage() {
  // Add state for timeline data
  const [timelineData, setTimelineData] = useState<Timeline[]>([]);
  const [isLoadingTimeline, setIsLoadingTimeline] = useState(true);
  const [timelineError, setTimelineError] = useState<string | null>(null);
  
  // New state for achievements
  const [achievementsData, setAchievementsData] = useState<Achievement[]>([]);
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(true);
  const [achievementsError, setAchievementsError] = useState<string | null>(null);
  
  // Fetch timeline data on component mount
  useEffect(() => {
    const loadTimelineData = async () => {
      try {
        setIsLoadingTimeline(true);
        const data = await fetchTimeline();
        console.log('Timeline data:', data);
        setTimelineData(data);
      } catch (error) {
        console.error('Error fetching timeline:', error);
        setTimelineError('Failed to load timeline data');
      } finally {
        setIsLoadingTimeline(false);
      }
    };
    
    loadTimelineData();
  }, []);

  // Add new effect to fetch achievements data
  useEffect(() => {
    const loadAchievementsData = async () => {
      try {
        setIsLoadingAchievements(true);
        const data = await fetchTopAchievements(3);
        console.log('Achievements data:', data);
        setAchievementsData(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setAchievementsError('Failed to load achievements data');
      } finally {
        setIsLoadingAchievements(false);
      }
    };
    
    loadAchievementsData(); // Make sure this function is called
  }, []);

  // Helper function for image URLs
  const processImageUrl = (url: string) => {
    if (!url) return '/images/placeholders/default-achievement.jpg';
    
    try {
      if (/^https?:\/\//i.test(url)) return url;
      if (url.startsWith('data:')) return url;
      
      const baseUrl = process.env.NEXT_PUBLIC_IMG_URL || '';
      if (!baseUrl) return url;
      
      const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
      const cleanImagePath = url.replace(/^\/+/, '');
      
      return `${cleanBaseUrl}/${cleanImagePath}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return '/images/placeholders/default-achievement.jpg';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mb-20"
      >
        <motion.div 
          variants={titleAnimation} 
          className="text-center mb-12 origin-top mt-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
            About IEEE Student Chapter
          </h1>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 1, duration: 0.8 }}
          ></motion.div>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <motion.div 
            className="space-y-6 text-white mt-4"
            whileInView={{ 
              opacity: [0, 1],
              x: [-20, 0] 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-blue-900/30 p-6 rounded-lg border-l-4 border-blue-500 backdrop-blur-sm">
              <p className="text-lg leading-relaxed">
                The <span className="text-blue-300 font-semibold">IEEE Student Branch</span> at our university serves as a hub for innovation, learning, and professional development in electrical engineering, electronics, and computer science. Established in 2015, our chapter has grown to become one of the most active technical communities on campus.
              </p>
            </div>
            
            <div className="bg-blue-900/30 p-6 rounded-lg border-l-4 border-cyan-400 backdrop-blur-sm">
              <p className="text-lg leading-relaxed">
                We are dedicated to fostering <span className="text-cyan-300 font-semibold">technical excellence</span> and providing our members with opportunities to connect with industry professionals, participate in cutting-edge projects, and develop leadership skills that prepare them for successful careers.
              </p>
            </div>
            
            <motion.div 
              className="flex items-center gap-3 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-white">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                </svg>
              </div>
              <span className="text-white font-medium">Joined by 200+ active student members</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-xl"
            initial={{ clipPath: "circle(5% at 50% 50%)" }}
            whileInView={{ clipPath: "circle(75% at 50% 50%)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            whileHover={{ scale: 1.03, filter: "brightness(1.1)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="IEEE Team" 
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-4 z-20"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-white font-medium text-sm">
                IEEE Student Chapter members at the annual technical conference, 2023
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-20 py-16 bg-blue-900/20 backdrop-blur-sm rounded-2xl px-8 overflow-hidden relative"
      >
        {/* Background decorative elements */}
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />

        <motion.h2 
          variants={fadeIn}
          className="relative text-3xl font-bold text-white mb-4 text-center"
        >
          Our Mission & Vision
        </motion.h2>
        
        <motion.div 
          variants={fadeIn}
          className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-12 rounded-full"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <motion.div 
            variants={fadeIn}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/60 to-blue-700/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-blue-500/30"
            whileHover={{ 
              y: -8, 
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.35)",
              transition: { duration: 0.3 } 
            }}
          >
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="m12 14 4-4"></path>
                  <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                  <polyline points="7 19 12 14 17 19"></polyline>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-blue-300 pt-1">Our Mission</h3>
            </div>
            <p className="text-white/90 leading-relaxed pl-12">
              To foster technological innovation and excellence for the benefit of humanity by organizing workshops, technical events, and providing a platform for students to enhance their technical and soft skills.
            </p>
            
            <motion.div 
              className="w-full border-t border-blue-500/20 mt-6 pt-4 pl-12"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.div 
                className="flex items-center gap-2 text-blue-300"
                whileHover={{ x: 5 }}
              >
                <span className="text-sm font-medium">Learn more about our mission</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/60 to-cyan-700/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-cyan-500/30"
            whileHover={{ 
              y: -8, 
              boxShadow: "0 25px 50px -12px rgba(8, 145, 178, 0.35)",
              transition: { duration: 0.3 } 
            }}
          >
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 rounded-lg shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m16 12-4 4-4-4"></path>
                  <path d="M12 8v7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-cyan-300 pt-1">Our Vision</h3>
            </div>
            <p className="text-white/90 leading-relaxed pl-12">
              To be the premier technical organization that empowers students to develop career opportunities, enhance professional growth, and make a positive impact on society through technology.
            </p>
            
            <motion.div 
              className="w-full border-t border-cyan-500/20 mt-6 pt-4 pl-12"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              <motion.div 
                className="flex items-center gap-2 text-cyan-300"
                whileHover={{ x: 5 }}
              >
                <span className="text-sm font-medium">Discover our vision</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Connecting element */}
        <motion.div 
          className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full z-10"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="absolute inset-1 bg-blue-900 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-cyan-400">
              <path fillRule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
            </svg>
          </div>
        </motion.div>
      </motion.section>

      {/* Memory Lane */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-20 relative overflow-hidden"
      >
        {/* Background decoration */}
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.h2 
          variants={fadeIn}
          className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-6 text-center"
        >
          Memory Lane
        </motion.h2>
        
        <motion.div
          variants={fadeIn}
          className="relative w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        <motion.p 
          variants={fadeIn}
          className="text-white/80 text-center max-w-3xl mx-auto mb-12 px-4"
        >
          Journey through our chapter&apos;s memorable events, achievements, and milestones over the years.
        </motion.p>
        
        {/* Timeline */}
        <div className="relative py-8">
          {/* Vertical Line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-cyan-400"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Timeline Items - Dynamic from server data */}
          <div className="space-y-24 md:space-y-32 relative">
            {isLoadingTimeline ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div 
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center relative"
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10 bg-blue-500/50 rounded-full h-14 w-14"></div>
                  <div className={`w-full flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} md:px-0 px-4`}>
                    <div className={`md:w-5/12 w-full bg-blue-900/30 p-6 rounded-lg h-48 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}></div>
                  </div>
                </motion.div>
              ))
            ) : timelineError ? (
              // Error state
              <div className="text-center py-12">
                <p className="text-white/70 mb-4">{timelineError}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20"
                >
                  Retry
                </button>
              </div>
            ) : timelineData.length > 0 ? (
              // Data loaded successfully
              timelineData.map((item, index) => (
                <TimelineItem 
                  key={item.id}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  imageSrc={item.image_url}
                  isLeft={item.is_left}
                  delay={0.2 + index * 0.1}
                />
              ))
            ) : (
              // No data found
              <div className="text-center py-12">
                <p className="text-white/70">No timeline records found</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>
      
      {/* Achievements Gallery */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-20 relative overflow-hidden py-8 md:py-16"
      >
        {/* Background decoration */}
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.h2 
          variants={fadeIn}
          className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-6 text-center"
        >
          Our Achievements
        </motion.h2>
        
        <motion.div
          variants={fadeIn}
          className="relative w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-8 md:mb-12"
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10 px-4 md:px-0"
        >
          {achievementsData && achievementsData.length > 0 ? (
            // Data loaded successfully
            achievementsData.map((achievement, index) => (
              <motion.div
                key={achievement.id || index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="group relative rounded-xl overflow-hidden h-full"
              >
                {/* Achievement Card with complete content - increased height */}
                <div className="bg-blue-900/30 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-blue-500/20 group-hover:shadow-2xl h-full flex flex-col">
                  
                  {/* Badge showing achievement type - enhanced style */}
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg border border-white/10"
                      whileHover={{ scale: 1.05 }}
                    >
                      {achievement.type || "Achievement"}
                    </motion.div>
                  </div>
                  
                  {/* Image Container - increased height */}
                  <div className="relative h-56 md:h-64 w-full overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent opacity-60 z-10 group-hover:opacity-40 transition-opacity duration-300"
                      whileHover={{ opacity: 0.3 }}
                    />
                    <motion.div 
                      className="h-full w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image 
                        src={processImageUrl(achievement.image_url)}
                        alt={achievement.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholders/default-achievement.jpg';
                        }}
                      />
                    </motion.div>
                    
                    {/* Enhanced title overlay with gradient */}
                    <motion.div 
                      className="absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-blue-900/90 to-transparent pt-12"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {achievement.name}
                      </h3>
                    </motion.div>
                  </div>
                  
                  {/* Content - improved spacing and typography */}
                  <div className="p-5 md:p-7 flex-grow flex flex-col">
                    <p className="text-white/80 flex-grow text-sm md:text-base leading-relaxed">
                      {achievement.description}
                    </p>
                    
                    {/* Enhanced call to action */}
                    <div className="mt-6 pt-4 border-t border-blue-500/20">
                      <motion.div
                        className="flex items-center gap-2 text-cyan-300 group-hover:text-cyan-400 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm font-medium">Read full story</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // No data found
            <div className="col-span-3 text-center py-12">
              <p className="text-white/70">No achievements found</p>
            </div>
          )}
        </motion.div>
        
        <motion.div
          variants={fadeIn}
          className="mt-10 md:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-white text-sm md:text-base font-medium shadow-lg shadow-blue-500/20"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            View All Achievements
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
}

// Timeline Item Component
function TimelineItem({ year, title, description, imageSrc, isLeft, delay }: {
  year: string;
  title: string;
  description: string;
  imageSrc: string;
  isLeft: boolean;
  delay: number;
}) {
  const [imgError, setImgError] = useState(false);
  
  // More robust image source processing
  const processedImageSrc = useMemo(() => {
    // Handle empty image source
    if (!imageSrc) return '/images/placeholders/default-event.jpg';
    
    try {
      // If it already starts with http(s), it's an absolute URL
      if (/^https?:\/\//i.test(imageSrc)) {
        return imageSrc;
      }
      
      // If it's a data URL
      if (imageSrc.startsWith('data:')) {
        return imageSrc;
      }
      
      // For all paths (including those starting with /), prepend the base URL
      // This handles images hosted on external servers properly
      const baseUrl = process.env.NEXT_PUBLIC_IMG_URL || '';
      if (!baseUrl) {
        // If no base URL is configured, use the path as-is from the public directory
        return imageSrc;
      }
      
      // Clean up both the base URL and image path to ensure no double slashes
      const cleanBaseUrl = baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
      const cleanImagePath = imageSrc.replace(/^\/+/, ''); // Remove leading slashes
      
      return `${cleanBaseUrl}/${cleanImagePath}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return '/images/placeholders/default-event.jpg';
    }
  }, [imageSrc]);

  console.log('Timeline image source:', { original: imageSrc, processed: processedImageSrc });

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      className="flex items-center relative"
    >
      {/* Year Marker */}
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 z-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full h-14 w-14 flex items-center justify-center font-bold shadow-lg"
        whileHover={{ scale: 1.2, rotate: 5 }}
      >
        {year}
      </motion.div>
      
      {/* Content */}
      <div className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'} md:px-0 px-4`}>
        <motion.div 
          className={`md:w-5/12 w-full bg-blue-900/30 p-4 md:p-6 rounded-lg shadow-lg border border-blue-500/30 backdrop-blur-sm ${isLeft ? 'mr-auto' : 'ml-auto'}`}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, delay }}
        >
          <h3 className="text-xl font-semibold text-blue-300 mb-2">{title}</h3>
          <p className="text-white/80 mb-4 text-sm md:text-base">{description}</p>
          
          {/* Enhanced image container with better error handling */}
          <div className="relative h-36 md:h-48 rounded-md overflow-hidden bg-blue-900/50">
            {imgError ? (
              <div className="flex flex-col items-center justify-center h-full text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Image not available
              </div>
            ) : (
              <Image 
                src={processedImageSrc} 
                alt={title} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                onError={() => setImgError(true)}
                loading="lazy"
              />
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
