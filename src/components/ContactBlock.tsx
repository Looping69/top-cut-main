"use client";

import { motion } from "framer-motion";
import { IconBrandWhatsapp, IconPhone, IconMapPin, IconMail, IconClock } from "@tabler/icons-react";
import Link from "next/link";
import { LocationMap } from './GoogleMap';

export function ContactBlock() {
  return (
    <section className="py-12 bg-gradient-to-r from-[var(--primary-light)] to-green-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2">
            {/* Contact Information */}
            <div className="p-8 md:p-10 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)]">
              <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
              <p className="text-green-50 mb-8">
                We&apos;re here to help with all your tree service needs. Reach out to us through any of these channels for quick assistance.
              </p>
              
              <div className="space-y-6">
                {/* Phone */}
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <IconPhone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Call Us</h3>
                    <a 
                      href="tel:+27788747327" 
                      className="text-green-50 hover:text-white transition-colors text-lg"
                    >
                      +27 78 874 7327
                    </a>
                    <p className="text-green-100 text-sm mt-1">Available 7 days a week, 7am-7pm</p>
                  </div>
                </motion.div>
                
                {/* WhatsApp */}
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-[#25D366] p-3 rounded-full">
                    <IconBrandWhatsapp size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">WhatsApp Us</h3>
                    <a 
                      href="https://wa.me/27788747327" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-50 hover:text-white transition-colors text-lg"
                    >
                      +27 78 874 7327
                    </a>
                    <p className="text-green-100 text-sm mt-1">Fastest response time - message us anytime!</p>
                  </div>
                </motion.div>
                
                {/* Address */}
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <IconMapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Our Location</h3>
                    <p className="text-green-50">
                      12 Celiers Street, Kuruman<br />
                      South Africa
                    </p>
                  </div>
                </motion.div>
                
                {/* Email */}
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <IconMail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Email Us</h3>
                    <a 
                      href="mailto:jhr@topcuttreefelling.co.za" 
                      className="text-green-50 hover:text-white transition-colors"
                    >
                      jhr@topcuttreefelling.co.za
                    </a>
                  </div>
                </motion.div>
                
                {/* Hours */}
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <IconClock size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Business Hours</h3>
                    <p className="text-green-50">
                      Monday - Friday: 7am - 7pm<br />
                      Saturday: 8am - 5pm<br />
                      Sunday: 9am - 3pm
                    </p>
                    <p className="text-[var(--accent)] font-bold text-sm mt-2">24/7 Emergency Service Available</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Google Map */}
            <div className="p-0 relative h-full">
              <LocationMap />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 