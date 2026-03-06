"use client";

import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import Image from "next/image";
import { motion } from "framer-motion";

// In a real implementation, these would be actual project images
const projects = [
  {
    id: 1,
    title: "High Risk Tree Felling",
    description: "Simultaneous removal of multiple high-risk trees in challenging locations.",
    category: "High Risk Felling",
    imagePath: "/images/gallery/project-1.jpg",
  },
  {
    id: 2,
    title: "Palm Tree Maintenance",
    description: "Cleaning and trimming of palm trees for a commercial property.",
    category: "Palm Tree Maintenance",
    imagePath: "/images/gallery/project-2.jpg",
  },
  {
    id: 3,
    title: "Storm Damage Cleanup",
    description: "Emergency response to clear fallen trees after a severe storm.",
    category: "Emergency Services",
    imagePath: "/images/gallery/project-3.jpg",
  },
  {
    id: 4,
    title: "Hedge Trimming",
    description: "Precision trimming and shaping of extensive garden hedges.",
    category: "Tree Trimming",
    imagePath: "/images/gallery/project-4.jpg",
  },
  {
    id: 5,
    title: "Composting",
    description: "Turning tree and garden waste into nutrient-rich compost for sustainable landscaping.",
    category: "Eco-Friendly",
    imagePath: "/images/gallery/project-5.jpg",
  },
  {
    id: 6,
    title: "Tree Crown Reduction",
    description: "Careful reduction of a tree crown to prevent property damage.",
    category: "Tree Trimming",
    imagePath: "/images/gallery/project-6.jpg",
  },
  {
    id: 7,
    title: "Dangerous Tree Removal",
    description: "Removal of a hazardous tree leaning towards a residential building.",
    category: "Tree Felling",
    imagePath: "/images/gallery/project-7.jpg",
  },
  {
    id: 8,
    title: "Commercial Property Clearing",
    description: "Clearing of multiple trees for a new commercial development.",
    category: "Tree Felling",
    imagePath: "/images/gallery/project-8.jpg",
  },
  {
    id: 9,
    title: "Fruit Tree Pruning",
    description: "Specialized pruning to improve fruit production and tree health.",
    category: "Tree Trimming",
    imagePath: "/images/gallery/project-9.jpg",
  },
];

// Colors for overlay
const placeholderColors = [
  "bg-[var(--primary-dark)]",
  "bg-[var(--primary)]",
  "bg-[var(--primary-light)]",
  "bg-[var(--accent)]",
  "bg-[var(--accent-light)]",
  "bg-[var(--primary-dark)]",
  "bg-[var(--primary)]",
  "bg-[var(--primary-light)]",
  "bg-[var(--accent)]",
];

// Function to get the appropriate image for each project
const getProjectImage = (index: number): string => {
  switch (index) {
    case 0: // High Risk Tree Felling
      return "/images/three removal service.png";
    case 1: // Palm Tree Maintenance
      return "/images/Expert tree trimming service.png";
    case 2: // Storm Damage Cleanup
      return "/images/emergency tree saivice.png";
    case 3: // Hedge Trimming
      return "/images/Precision tree trimming service.png";
    case 4: // Composting
      return "/images/leaf2.png";
    case 5: // Tree Crown Reduction
      return "/images/Expert tree trimming service.png";
    case 6: // Dangerous Tree Removal
      return "/images/three removal service.png";
    case 7: // Commercial Property Clearing
      return "/images/land clearing service .png";
    case 8: // Fruit Tree Pruning
      return "/images/tree health assessment.png";
    default:
      return "/images/leaf2.png";
  }
};

export default function GalleryPage() {
  return (
    <>
      <div className="py-16 md:py-24">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Project Gallery</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse through our portfolio of completed outdoor service projects. These showcase our expertise, attention to detail, and commitment to quality across our specialized garden and lifestyle solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-64 relative overflow-hidden group">
                    {/* Project image */}
                    <Image
                      src={getProjectImage(index)}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 3}
                    />

                    {/* Colored overlay with text */}
                    <div className={`${placeholderColors[index]} absolute inset-0 bg-opacity-70 flex items-center justify-center`}>
                      <div className="text-white text-lg font-bold px-4 text-center">
                        {project.title}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-green-light p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Need Professional Outdoor Services?</h2>
              <p className="text-gray-600 mb-6">
                Our team of specialists is ready to help with your garden and lifestyle needs. Contact us today for a free quote.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/quote" className="btn-primary">
                  Get a Free Quote
                </a>
                <a href="/contact" className="btn-secondary">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <CallToAction />
    </>
  );
} 