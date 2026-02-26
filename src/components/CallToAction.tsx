"use client";

import Link from "next/link";
import { Container } from "./Container";
import { motion } from "framer-motion";

export function CallToAction() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/cta-bg.jpg')",
          filter: "brightness(0.3)"
        }}
      />

      {/* Green Gradient Overlay */}
      <div className="absolute inset-0 bg-green-gradient opacity-90 z-10" />

      <Container className="relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Property?
          </motion.h2>

          <motion.p
            className="text-lg text-white opacity-90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Whether you need tree felling, garden maintenance, wood sales, or pest control, our team of professionals is ready to help. Contact us today for a free, no-obligation quote.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/quote" className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow-md hover:shadow-lg">
              Get a Free Quote
            </Link>
            <Link href="/contact" className="bg-transparent hover:bg-white hover:bg-opacity-10 text-white border-2 border-white font-bold py-3 px-8 rounded-md transition-all duration-300">
              Contact Us
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white">Free Estimates</span>
            </div>
            <div className="hidden sm:block h-6 border-r border-white border-opacity-30"></div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white">Quick Response</span>
            </div>
            <div className="hidden sm:block h-6 border-r border-white border-opacity-30"></div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white">Satisfaction Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 