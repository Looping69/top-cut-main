"use client";

import { Container } from "./Container";
import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { servicesData } from "@/constants/services";

export function Services() {
  return (
    <section className="section-earth" id="services">
      <Container>
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <span className="bg-[var(--primary)] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Our Solutions</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[var(--primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Comprehensive Outdoor Services
          </motion.h2>

          <motion.p
            className="text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Top Cut is your trusted partner for professional tree care, greenhouse cultivation,
            organic garden products, and environmental maintenance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((category, index) => (
            <motion.div
              key={category.slug}
              className="card hover-grow flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`${category.color} p-6 flex justify-center items-center`}>
                <category.icon className="h-16 w-16 text-white" stroke={1.5} />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-[var(--primary-dark)]">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>

                {/* Subservices Preview */}
                <ul className="mb-6 space-y-2 flex-grow">
                  {category.subservices.slice(0, 3).map((sub, i) => (
                    <li key={i} className="flex items-start">
                      <IconCheck className="h-5 w-5 text-[var(--success)] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{sub.title}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${category.slug}`}
                  className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium inline-flex items-center focus-visible mt-auto"
                >
                  Explore Category
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/services" className="btn-primary">
            Browse All Services
          </Link>
          <p className="mt-4 text-sm text-gray-600">Free consultation and professional assessments available</p>
        </motion.div>
      </Container>
    </section>
  );
}
