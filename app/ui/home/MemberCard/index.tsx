'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function MemberCard({ member }: { member: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-72 h-96 overflow-hidden rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-purple-600/30 backdrop-blur-sm z-0" />
      
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={member.image_url || "/placeholder-person.jpg"}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover"
          priority
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      
      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 z-10"
        animate={{
          y: isHovered ? -10 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3 
          className="text-xl font-bold text-white mb-0.5"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        >
          {member.name}
        </motion.h3>
        <p className="text-cyan-300 font-medium mb-3">{member.position}</p>
        
        {/* Social links */}
        <motion.div 
          className="flex space-x-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {member.linkedin && (
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          )}
          {member.twitter && (
            <a 
              href={member.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
            >
              <FaTwitter size={20} />
            </a>
          )}
          {member.email && (
            <a 
              href={`mailto:${member.email}`}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <FaEnvelope size={20} />
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}