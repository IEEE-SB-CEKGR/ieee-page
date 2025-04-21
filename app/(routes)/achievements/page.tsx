'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAllAchievements } from '@/app/lib/actions';
import type { Achievement as BaseAchievement } from '@/app/lib/actions';

// Extend the Achievement type to include the year property
interface Achievement extends BaseAchievement {
  year?: string;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeYear, setActiveYear] = useState<string>('all');
  
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
      return '/images/placeholders/default-achievement.jpg';
    }
  };

  // Fetch all achievements
  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setError('Failed to load achievements');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAchievements();
  }, []);
  
  // Extract unique achievement types and years for filters
  const achievementTypes = useMemo(() => {
    const types = new Set<string>(achievements.map(a => a.type || 'Other'));
    return ['all', ...Array.from(types)];
  }, [achievements]);
  
  const achievementYears = useMemo(() => {
    const years = new Set<string>(achievements.map(a => a.year || 'Unknown'));
    return ['all', ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [achievements]);
  
  // Filter achievements based on selected filters
  const filteredAchievements = useMemo(() => {
    return achievements.filter(achievement => {
      const typeMatch = activeFilter === 'all' || achievement.type === activeFilter;
      const yearMatch = activeYear === 'all' || achievement.year === activeYear;
      return typeMatch && yearMatch;
    });
  }, [achievements, activeFilter, activeYear]);
  
  // Group achievements by year for the memory grid
  const achievementsByYear = useMemo(() => {
    const groupedByYear: Record<string, Achievement[]> = {};
    
    filteredAchievements.forEach(achievement => {
      const year = achievement.year || 'Unknown';
      if (!groupedByYear[year]) {
        groupedByYear[year] = [];
      }
      groupedByYear[year].push(achievement);
    });
    
    return groupedByYear;
  }, [filteredAchievements]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-slate-900"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center mb-6"
          >
            Our Achievements
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-white/80">
              Explore our journey through the years. Each achievement represents a milestone in our chapter's history.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-12"
        >
          {/* Filter by Type */}
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Filter by Type</label>
              <div className="flex flex-wrap gap-2">
                {achievementTypes.map(type => (
                  <button
                    key={`type-${type}`}
                    onClick={() => setActiveFilter(type)}
                    className={`px-4 py-2 text-sm rounded-full transition-all ${
                      activeFilter === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-900/30 text-white/70 hover:bg-blue-800/40'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Filter by Year */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Filter by Year</label>
              <div className="flex flex-wrap gap-2">
                {achievementYears.map(year => (
                  <button
                    key={`year-${year}`}
                    onClick={() => setActiveYear(year)}
                    className={`px-4 py-2 text-sm rounded-full transition-all ${
                      activeYear === year
                        ? 'bg-cyan-500 text-white'
                        : 'bg-blue-900/30 text-white/70 hover:bg-blue-800/40'
                    }`}
                  >
                    {year === 'all' ? 'All Years' : year}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="text-white/60 text-sm">
            {filteredAchievements.length} {filteredAchievements.length === 1 ? 'achievement' : 'achievements'} found
          </div>
        </motion.div>

        {/* Achievement Grid - Masonry Layout */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={`skeleton-${i}`} 
                className="bg-blue-900/20 rounded-xl h-64 animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-white/70 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(achievementsByYear).map(([year, yearAchievements]) => (
              <motion.div 
                key={year}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <div className="relative">
                  <h2 className="text-4xl font-bold text-white/90 mb-8">{year}</h2>
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 via-cyan-400/50 to-transparent"></div>
                </div>
                
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {yearAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      variants={fadeIn}
                      className={`group relative ${
                        index % 5 === 0 ? 'sm:col-span-2' : ''
                      } ${
                        index % 7 === 0 ? 'row-span-2' : ''
                      }`}
                    >
                      <Link href={`/achievements/${achievement.id}`} passHref>
                        <div className="block h-full">
                          {/* Achievement Card */}
                          <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-500/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-blue-500/20 group-hover:shadow-xl h-full">
                            {/* Image with gradient overlay */}
                            <div className="relative h-52 md:h-64 w-full overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent opacity-60 z-10"></div>
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
                              
                              {/* Type badge */}
                              <div className="absolute top-3 right-3 z-20">
                                <div className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                                  {achievement.type || "Achievement"}
                                </div>
                              </div>
                              
                              {/* Title */}
                              <div className="absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-blue-900 to-transparent">
                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                                  {achievement.name}
                                </h3>
                              </div>
                            </div>
                            
                            {/* Preview of description */}
                            <div className="p-4">
                              <p className="text-white/70 text-sm line-clamp-2">
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
        
        {filteredAchievements.length === 0 && !isLoading && !error && (
          <div className="py-20 text-center">
            <div className="inline-block p-6 bg-blue-900/30 rounded-full mb-6">
              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No achievements found</h3>
            <p className="text-white/60">Try changing your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}