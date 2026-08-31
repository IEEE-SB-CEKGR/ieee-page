'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

interface EventWebsiteEmbedProps {
  name: string;
  slug: string;
  url: string;
}

export default function EventWebsiteEmbed({
  name,
  slug,
  url,
}: EventWebsiteEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-minimize the floating bar after 5 seconds
    const timer = setTimeout(() => {
      setIsMinimized(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] w-screen h-screen bg-[#040D21] overflow-hidden">
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#040D21] z-10 transition-opacity duration-300">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
          </div>
          <p className="text-white/90 text-sm font-medium tracking-wider uppercase">
            Loading {name || 'Event Website'}...
          </p>
        </div>
      )}

      {/* Full-Screen Embedded Application */}
      <iframe
        src={url}
        title={name || slug}
        onLoad={() => setIsLoading(false)}
        className="w-full h-full border-0 bg-[#040D21]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; camera; microphone"
        allowFullScreen
      />

      {/* Floating IEEE Nav Bar */}
      {mounted && (
        <div
          className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
            isMinimized ? 'translate-y-[-10px]' : 'translate-y-0'
          }`}
        >
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2 bg-[#0A1A3A]/90 hover:bg-[#0A1A3A] text-white px-3 py-1.5 rounded-full shadow-2xl border border-white/10 backdrop-blur-md text-xs transition-all hover:scale-105"
              title="Expand Controls"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium text-white/90 truncate max-w-[120px]">
                {name || slug}
              </span>
              <ChevronDownIcon className="w-3.5 h-3.5 text-white/70" />
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-[#0A1A3A]/95 text-white p-2 pl-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl transition-all">
              <div className="flex items-center gap-2 pr-2 border-r border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-xs tracking-wide text-white">
                  {name || slug}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  href="/"
                  className="flex items-center gap-1 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                  title="Return to Main IEEE CEK Website"
                >
                  <ArrowLeftIcon className="w-3 h-3" />
                  <span>Main Site</span>
                </Link>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                  title="Open directly in a new tab"
                >
                  <span>Open New Tab</span>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize"
                >
                  <ChevronUpIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
