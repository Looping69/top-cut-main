"use client";

import { useState, useEffect } from 'react';
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const phoneNumber = "27788747327"; // Updated with correct phone number
  const message = "Hi! I'm interested in your tree services."; // Pre-filled message
  
  useEffect(() => {
    // Show button after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsTooltipVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  // Leaf animation variants
  const leafVariants = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      rotate: [0, i % 2 === 0 ? 10 : -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: i * 0.2,
      },
    }),
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-center"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Animated leaves */}
          <div className="absolute -top-12 -left-4 w-full h-full pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ 
                  left: `${i * 15}px`, 
                  top: `${i * 5}px` 
                }}
                custom={i}
                variants={leafVariants}
                animate="animate"
              >
                <Image 
                  src="/images/leaf2.png" 
                  alt="Leaf" 
                  width={20} 
                  height={20} 
                  className="opacity-80"
                />
              </motion.div>
            ))}
          </div>
          
          {/* Tooltip */}
          <AnimatePresence>
            {isTooltipVisible && (
              <motion.div
                className="absolute right-16 bg-white text-gray-800 p-3 rounded-lg shadow-lg max-w-[200px] text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="font-bold mb-1">Need help with trees?</div>
                <div>Chat with us on WhatsApp for quick assistance!</div>
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* WhatsApp button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full shadow-lg flex items-center justify-center w-16 h-16"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
            onClick={() => setIsTooltipVisible(false)}
          >
            <IconBrandWhatsapp size={32} stroke={3} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 