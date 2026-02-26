"use client";

import { useState } from "react";
import { Container } from "./Container";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";

const galleryImages = [
  {
    src: "/images/three removal service.png",
    alt: "Professional tree removal service",
    category: "Tree Removal"
  },
  {
    src: "/images/Expert tree trimming service.png",
    alt: "Expert tree trimming",
    category: "Tree Trimming"
  },
  {
    src: "/images/stump grinding service.png",
    alt: "Stump grinding service",
    category: "Stump Grinding"
  },
  {
    src: "/images/emergency tree saivice.png",
    alt: "Emergency tree service",
    category: "Emergency Services"
  },
  {
    src: "/images/LArge tree removal service.png",
    alt: "Large tree removal project",
    category: "Tree Removal"
  },
  {
    src: "/images/Precision tree trimming service.png",
    alt: "Precision tree trimming",
    category: "Tree Trimming"
  },
  {
    src: "/images/land clearing service .png",
    alt: "Land clearing project",
    category: "Land Clearing"
  },
  {
    src: "/images/tree health assessment.png",
    alt: "Tree health assessment",
    category: "Tree Health"
  }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(galleryImages.map(img => img.category)));
  
  const filteredImages = selectedCategory 
    ? galleryImages.filter(img => img.category === selectedCategory)
    : galleryImages;
  
  return (
    <section className="section bg-white">
      <Container>
        <div className="text-center mb-12">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <span className="bg-[var(--primary)] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Our Work</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-[var(--primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Project Gallery
          </motion.h2>
          
          <motion.p 
            className="text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse through our portfolio of completed tree services projects across South Africa.
          </motion.p>
        </div>
        
        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null 
                ? 'bg-[var(--primary)] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-[var(--primary)] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer hover-grow"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image 
                src={image.src} 
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
                  <span className="text-sm font-medium">{image.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button 
                className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
                onClick={() => setSelectedImage(null)}
              >
                <IconX size={24} />
              </button>
              <div className="relative aspect-video">
                <Image 
                  src={selectedImage} 
                  alt="Gallery image"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
} 