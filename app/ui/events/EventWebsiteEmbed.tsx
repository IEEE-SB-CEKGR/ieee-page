'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

interface EventWebsiteEmbedProps {
  name: string;
  slug: string;
  url: string;
  subPath?: string;
}

export default function EventWebsiteEmbed({
  name,
  slug,
  url,
  subPath = '',
}: EventWebsiteEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
    // Auto-minimize the floating badge after 4 seconds
    const timer = setTimeout(() => {
      setIsMinimized(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] w-screen h-screen bg-[#040D21] overflow-hidden select-none">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#040D21] z-20 transition-opacity duration-300">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
          </div>
          <p className="text-white/90 text-sm font-medium tracking-wider uppercase">
            Loading {name || 'Event Website'}...
          </p>
          {subPath && (
            <p className="text-white/40 text-xs mt-1 font-mono">
              /{slug}/{subPath}
            </p>
          )}
        </div>
      )}

      {/* Full-Screen Iframe Application */}
      <iframe
        ref={iframeRef}
        src={url}
        title={name || slug}
        onLoad={() => setIsLoading(false)}
        className="w-full h-full border-0 bg-[#040D21]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; camera; microphone; geolocation"
        allowFullScreen
      />

      {/* Floating Control Pill */}
      {mounted && (
        <div
          className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
            isMinimized ? 'translate-y-[-8px]' : 'translate-y-0'
          }`}
        >
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2 bg-[#0A1A3A]/90 hover:bg-[#0A1A3A] text-white px-3.5 py-1.5 rounded-full shadow-2xl border border-white/15 backdrop-blur-md text-xs transition-all hover:scale-105 group"
              title="Click to expand IEEE controls"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white/90 truncate max-w-[140px]">
                {name || slug}
              </span>
              <ChevronDownIcon className="w-3.5 h-3.5 text-white/70 group-hover:text-white" />
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-[#0A1A3A]/95 text-white p-2 pl-3.5 rounded-2xl shadow-2xl border border-white/15 backdrop-blur-xl transition-all">
              <div className="flex items-center gap-2 pr-2 border-r border-white/15">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <div>
                  <div className="font-semibold text-xs text-white leading-none">
                    {name || slug}
                  </div>
                  <div className="text-[10px] text-white/50 font-mono mt-0.5">
                    ieee.ce-kgr.org/{slug}{subPath ? `/${subPath}` : ''}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReload}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  title="Reload event website"
                >
                  <ArrowPathIcon className="w-3.5 h-3.5" />
                </button>

                <Link
                  href="/"
                  className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white/90 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  title="Return to Main IEEE CEK Website"
                >
                  <ArrowLeftIcon className="w-3 h-3" />
                  <span>Main Site</span>
                </Link>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  title="Open directly in a new tab"
                >
                  <span>Open Tab</span>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize bar"
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
