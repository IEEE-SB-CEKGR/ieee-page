'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from 'react-icons/fa';

export default function MemberCard({ member }: { member: any }) {
  const [isHovered, setIsHovered] = useState(false);

  // Extract usernames from social media URLs
  const getLinkedInUsername = (url: string) => {
    if (!url) return '';
    const match = url.match(/linkedin\.com\/in\/([^\/]+)/);
    return match ? `@${match[1]}` : '';
  };

  const getTwitterUsername = (url: string) => {
    if (!url) return '';
    const match = url.match(/(?:twitter|x)\.com\/([^\/]+)/);
    return match ? `@${match[1]}` : '';
  };

  const linkedinHandle = getLinkedInUsername(member.linkedin || '');
  const twitterHandle = getTwitterUsername(member.twitter || '');
  const emailShort = member.email ? member.email.split('@')[0] : '';
  
  return (
    <motion.div
      className="group relative w-72 h-96 rounded-xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Card border glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl border border-white/10 z-10 overflow-hidden"
        animate={{
          boxShadow: isHovered 
            ? '0 0 25px rgba(64, 150, 255, 0.4)' 
            : '0 0 0px rgba(64, 150, 255, 0)'
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Image container */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: isHovered ? 1.08 : 1
        }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Image
          src={member.image_url || "/placeholder-person.jpg"}
          alt={member.name}
          fill
          sizes="300px"
          className="object-cover"
          priority
        />
      </motion.div>
      
      {/* Overlay gradients with advanced animation */}
      <motion.div 
        className="absolute inset-0 z-10"
        initial={{ opacity: 0.6 }}
        animate={{ 
          background: isHovered 
            ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 80%)' 
            : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)',
          opacity: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Role badge */}
      <motion.div
        className="absolute top-6 right-6 z-20 px-3 py-1 bg-accent/90 backdrop-blur-sm rounded-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0.9,
          y: 0,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs font-semibold text-primary">{member.role}</span>
      </motion.div>
      
      {/* Content container */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 p-6"
        animate={{
          y: isHovered ? 0 : 5
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Member info */}
        <motion.div>
          <motion.div 
            className="w-12 h-0.5 bg-accent mb-3 rounded"
            animate={{ width: isHovered ? 48 : 12 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.h3 
            className="text-2xl font-bold text-white mb-1"
            animate={{ y: isHovered ? 0 : 5, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {member.name}
          </motion.h3>
          
          <motion.p 
            className="text-cyan-300 font-medium opacity-90 mb-5"
            animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 0.9 : 0.7 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {member.position}
          </motion.p>
        </motion.div>
        
        {/* Social media links */}
        <motion.div
          className="flex space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                <FaLinkedin size={18} className="text-blue-400" />
              </div>
            </motion.a>
          )}
          
          {member.twitter && (
            <motion.a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                <FaTwitter size={18} className="text-blue-400" />
              </div>
            </motion.a>
          )}
          
          {member.email && (
            <motion.a
              href={`mailto:${member.email}`}
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                <FaEnvelope size={18} className="text-blue-400" />
              </div>
            </motion.a>
          )}
          
          {member.instagram && (
            <motion.a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                <FaInstagram size={18} className="text-pink-400" />
              </div>
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}