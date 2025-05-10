'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAchievementById } from '@/app/lib/actions';
import type { Achievement } from '@/app/lib/actions';

// Add this new action to fetch a single achievement by ID
// Add to app/lib/actions.ts:
// 
// export async function fetchAchievementById(id: string): Promise<Achievement | null> {
//   try {
//     const data = await sql<Achievement>`
//       SELECT id, name, description, date, image_url, type
//       FROM achievements
//       WHERE id = ${id}
//     `;
//     
//     return data.rows[0] || null;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch achievement');
//   }
// }

export default function AchievementDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Helper function for image URLs (memoized to prevent re-renders)
  const processImageUrl = useMemo(() => {
    if (!achievement || !achievement.image_url) {
      return '/images/placeholders/default-achievement.jpg';
    }
    
    try {
      const url = achievement.image_url;
      
      // If it already starts with http(s), it's an absolute URL
      if (/^https?:\/\//i.test(url)) {
        return url;
      }
      
      // If it's a data URL
      if (url.startsWith('data:')) {
        return url;
      }
      
      // Use environment variable for external image server - this is the important part!
      const baseUrl = process.env.NEXT_PUBLIC_IMG_URL || '';
      if (baseUrl) {
        // Always combine base URL with image path regardless of whether image path starts with /
        const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
        const cleanImagePath = url.replace(/^\/+/, '');
        return `${cleanBaseUrl}/${cleanImagePath}`;
      }
      
      // Only use this as a fallback if no base URL is configured
      return url.startsWith('/') ? url : `/${url}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return '/images/placeholders/default-achievement.jpg';
    }
  }, [achievement]);


  
  useEffect(() => {
    const loadAchievement = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAchievementById(id);
        setAchievement(data);
      } catch (error) {
        console.error('Error fetching achievement:', error);
        setError('Failed to load achievement');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      loadAchievement();
    }
  }, [id]);

  // Format date nicely
  const formattedDate = achievement?.date 
    ? new Date(achievement.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
        <Link href="/achievements" passHref>
          <button className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to achievements
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-blue-900/50 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-blue-900/30 rounded w-1/4 mb-12"></div>
            <div className="h-96 bg-blue-900/20 rounded-lg mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-blue-900/30 rounded w-full"></div>
              <div className="h-4 bg-blue-900/30 rounded w-full"></div>
              <div className="h-4 bg-blue-900/30 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ) : error || !achievement ? (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <div className="py-12">
            <div className="text-cyan-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Achievement Not Found</h2>
            <p className="text-white/70 mb-6">{error || "We couldn't find the achievement you're looking for."}</p>
            <Link href="/achievements" passHref>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                View All Achievements
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                {achievement.name}
              </h1>
              <div className="flex items-center gap-4 text-white/70">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm px-3 py-1 rounded-full">
                  {achievement.type || "Achievement"}
                </div>
              </div>
            </div>

            <div className="relative h-96 w-full mb-12 rounded-xl overflow-hidden shadow-2xl">
              {achievement && (
                <Image
                  src={processImageUrl}  // This is correct, but we need to ensure we don't try to render before achievement exists
                  alt={achievement.name || "Achievement image"}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('default-achievement')) {

                      target.src = '/images/placeholders/default-achievement.jpg';
                    }
                  }}
                />
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <p className="text-white/80 leading-relaxed text-lg">
                {achievement.description}
              </p>
              {/* Add more rich content here if available in your schema */}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}