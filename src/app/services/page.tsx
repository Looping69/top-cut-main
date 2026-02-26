"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import { servicesData } from "@/constants/services";

export default function ServicesPage() {
  return (
    <div className="bg-background-light">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="/topcut.png"
            alt="Top Cut Background"
            fill
            className="object-contain"
            priority
          />
        </div>
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Our <span className="text-[var(--primary)]">Professional</span> Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 mb-8"
            >
              From tree felling to garden maintenance and organic products,
              Top Cut provides specialized solutions for all your outdoor needs.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[var(--primary)] transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-5 transition-transform group-hover:scale-110 duration-500`}>
                  <category.icon size={128} />
                </div>

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white ${category.color} shadow-lg shadow-green-900/10`}>
                  <category.icon size={28} />
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--primary)] transition-colors">
                  {category.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {category.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {category.subservices.slice(0, 3).map((sub) => (
                    <li key={sub.slug} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2 flex-shrink-0" />
                      {sub.title}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${category.slug}`}
                  className="flex items-center font-bold text-[var(--primary)] hover:gap-2 transition-all duration-300"
                >
                  Explore Category
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us / Trust Badges */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">Owner On-Site</div>
              <p className="text-gray-600">Direct supervision on every project for guaranteed quality.</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">4+ Years</div>
              <p className="text-gray-600">Established reputation for reliability and professionalism.</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">Fully Licensed</div>
              <p className="text-gray-600">We prioritize safety and follow all industry regulations.</p>
            </div>
          </div>
        </Container>
      </section>

      <CallToAction />
    </div>
  );
}