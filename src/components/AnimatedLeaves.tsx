"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Leaf {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export function AnimatedLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Generate random leaves on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      // Responsive number of leaves
      const leafCount = window.innerWidth < 768 ? 6 : 12;
      
      const newLeaves = Array.from({ length: leafCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100, // Random horizontal position (0-100%)
        delay: Math.random() * 2, // Random delay (0-2s)
        duration: 15 + Math.random() * 20, // Random duration (15-35s)
        size: 20 + Math.random() * 30, // Random size (20-50px)
        rotation: Math.random() * 360, // Random initial rotation
      }));
      
      setLeaves(newLeaves);
      
      // Update window width on resize
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute top-0"
          style={{ 
            left: `${leaf.x}%`,
            width: leaf.size,
            height: leaf.size,
          }}
          initial={{ 
            y: -100, 
            rotate: leaf.rotation,
            opacity: 0.8
          }}
          animate={{ 
            y: windowWidth < 768 ? window.innerHeight + 100 : window.innerHeight * 1.5,
            rotate: leaf.rotation + (Math.random() > 0.5 ? 360 : -360),
            x: [
              0,
              (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 200,
              (Math.random() - 0.5) * 100,
              0
            ]
          }}
          transition={{ 
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Image
            src="/images/leaf2.png"
            alt="Falling leaf"
            width={leaf.size}
            height={leaf.size}
            className="w-full h-full object-contain opacity-70"
          />
        </motion.div>
      ))}
    </div>
  );
} 