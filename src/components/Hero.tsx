"use client";

import Link from "next/link";
import { Container } from "./Container";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLeaf, FaPhoneAlt } from 'react-icons/fa';
import Image from "next/image";
import { useEffect, useState } from "react";

export function Hero() {
  const [jobCount, setJobCount] = useState(895);

  useEffect(() => {
    // Get the job counter from localStorage
    const storedCount = parseInt(localStorage.getItem('jobCounter') || '895');
    setJobCount(storedCount);

    // Listen for changes to localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'jobCounter') {
        setJobCount(parseInt(e.newValue || '895'));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          filter: "brightness(0.4)"
        }}
      />

      {/* Enhanced Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] via-transparent to-[var(--earth-dark)] z-10 opacity-60"
      />

      <Container className="relative z-20 py-28 md:py-40">
        <div className="max-w-3xl">
          {/* Premium Badge */}
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-[var(--accent)] px-6 py-2 rounded-full text-white font-bold shadow-lg inline-flex items-center gap-2">
              <FaShieldAlt className="text-white" />
              Professional & Insured Outdoor Services
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Premium Outdoor Services{" "}
            <span className="text-[var(--accent)] block mt-2">You Can Trust</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Tree Care, Greenhouse & Organic Products
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Professional lifestyle and garden services with the owner always on-site.
            Serving South Africa with pride for over 4 years.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/quote"
              className="btn-primary text-center sm:text-left hover:scale-105 transform transition-transform duration-200"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="btn-outline text-center sm:text-left hover:scale-105 transform transition-transform duration-200"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-[var(--accent)] transition-colors duration-300">
              <span className="text-[var(--accent)] text-4xl font-bold block mb-1">4+</span>
              <span className="text-gray-200">Years Experience</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-[var(--accent)] transition-colors duration-300">
              <span className="text-[var(--accent)] text-4xl font-bold block mb-1">{jobCount}+</span>
              <span className="text-gray-200">Projects Completed</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-[var(--accent)] transition-colors duration-300">
              <span className="text-[var(--accent)] text-4xl font-bold block mb-1">100%</span>
              <span className="text-gray-200">Customer Satisfaction</span>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-8 flex flex-wrap justify-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <FaShieldAlt className="text-[var(--success)] mr-2" />
              <span className="text-white text-sm font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <FaLeaf className="text-[var(--success)] mr-2" />
              <span className="text-white text-sm font-medium">Eco-Friendly</span>
            </div>
            <div className="flex items-center bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <FaPhoneAlt className="text-[var(--accent)] mr-2" />
              <span className="text-white text-sm font-medium">24/7 Emergency Service</span>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Enhanced Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="var(--background-light)"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
} 