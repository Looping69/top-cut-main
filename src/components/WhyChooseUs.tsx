"use client";

import { Container } from "./Container";
import { motion } from "framer-motion";
import { IconCertificate, IconUsers, IconClock, IconShieldCheck, IconLeaf, IconTrees, IconCheck } from "@tabler/icons-react";
import Image from "next/image";

const reasons = [
  {
    icon: IconCertificate,
    title: "Lifestyle Specialists",
    description: "Our team consists of certified specialists and garden care experts with a strong track record since 2021.",
    benefits: ["Qualified Specialists", "Ongoing training", "Expert knowledge"]
  },
  {
    icon: IconUsers,
    title: "Owner-Operated Business",
    description: "As an owner-operated business, we take personal pride in every project we undertake.",
    benefits: ["Personal attention", "Community focused", "Long-term relationships"]
  },
  {
    icon: IconClock,
    title: "Prompt & Reliable",
    description: "We arrive on time and complete projects efficiently without compromising on quality.",
    benefits: ["On-time arrival", "Efficient work", "Clear communication"]
  },
  {
    icon: IconShieldCheck,
    title: "Fully Insured",
    description: "We're fully insured, providing peace of mind for our clients during all tree operations.",
    benefits: ["Liability coverage", "Property protection", "Risk-free service"]
  },
  {
    icon: IconLeaf,
    title: "Eco-Friendly Practices",
    description: "We implement sustainable practices and proper disposal methods for all tree waste.",
    benefits: ["Waste recycling", "Minimal impact", "Sustainable methods"]
  },
  {
    icon: IconTrees,
    title: "Owner Always On-Site",
    description: "Our owner is present at every job to ensure the highest standards of service.",
    benefits: ["Direct supervision", "Quality assurance", "Immediate decisions"]
  },
];

export function WhyChooseUs() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/images/tree-pattern.png')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
          opacity: 0.1
        }}></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <span className="bg-[var(--earth-brown)] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Why Choose Us</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[var(--primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            The Top Cut Difference
          </motion.h2>

          <motion.p
            className="text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We combine expertise, reliability, and customer-focused service to deliver exceptional
            outdoor and garden solutions that exceed expectations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="card-earth hover-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-[var(--primary)] p-3 rounded-full mr-4 shadow-md">
                    <reason.icon className="h-6 w-6 text-white" stroke={2} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--primary-dark)]">{reason.title}</h3>
                </div>

                <p className="text-gray-700 mb-4">{reason.description}</p>

                {/* Benefits List */}
                <ul className="space-y-2 mb-2">
                  {reason.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <IconCheck className="h-5 w-5 text-[var(--success)] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div
          className="mt-16 bg-[var(--primary)] rounded-xl p-8 text-white shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Ready to experience the Top Cut difference?</h3>
              <p className="text-gray-100">Contact us today for a free, no-obligation quote.</p>
            </div>
            <a href="/contact" className="btn-secondary whitespace-nowrap">
              Get a Free Quote
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 