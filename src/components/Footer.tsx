"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconMail, IconMapPin, IconPhone, IconLeaf, IconCertificate, IconClock } from "@tabler/icons-react";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Ensure footer reflects latest link name (Reviews)
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-earth-gradient text-white">
      {/* Wave Divider at Top */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto transform rotate-180">
          <path
            fill="var(--background-light)"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>

      {/* Newsletter Signup */}
      <div className="container-custom -mt-6 mb-12">
        <div className="bg-[var(--primary)] rounded-xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-100">Subscribe to our newsletter for tree care tips and exclusive offers.</p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-gray-800"
                  required
                />
                <button type="submit" className="btn-secondary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative h-14 w-14 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] rounded-full p-1.5 shadow-md">
                <Image
                  src="/topcut.png"
                  alt="Top Cut Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">
                <span className="text-[var(--accent)]">Top</span> <span className="text-white">Cut</span>
              </span>
            </div>
            <p className="text-gray-200 mb-6">
              Professional tree services with the owner always on-site. Serving South Africa with pride for over 4 years.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center bg-white bg-opacity-10 px-3 py-1 rounded-full">
                <IconCertificate className="text-[var(--accent)] w-4 h-4 mr-1" />
                <span className="text-white text-xs">Licensed</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-10 px-3 py-1 rounded-full">
                <IconLeaf className="text-[var(--accent)] w-4 h-4 mr-1" />
                <span className="text-white text-xs">Eco-Friendly</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mt-2 sm:mt-0">
                <IconClock size={16} className="text-[var(--accent)]" />
                <span className="text-white text-xs">4+ Years</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <IconBrandFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <IconBrandInstagram size={24} />
              </a>
              <a href="https://wa.me/27788747327" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <IconBrandWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-[var(--accent)] pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Reviews
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Contact
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-[var(--accent)] pb-2 inline-block">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/treefelling" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Tree Felling
                </Link>
              </li>
              <li>
                <Link href="/services/greenhouse" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Greenhouse
                </Link>
              </li>
              <li>
                <Link href="/services/composting" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Composting
                </Link>
              </li>
              <li>
                <Link href="/services/chips-bark" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Chips & Bark
                </Link>
              </li>
              <li>
                <Link href="/services/wood" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Wood
                </Link>
              </li>
              <li>
                <Link href="/services/pest-weed-control" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="text-[var(--accent)] mr-2">›</span> Pest & Weed Control
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-[var(--accent)] pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <IconPhone size={20} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">Call Us</p>
                  <a href="tel:+27788747327" className="text-gray-300 hover:text-white transition-colors">
                    +27 78 874 7327
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <IconMail size={20} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">Email Us</p>
                  <a href="mailto:jhr@topcuttreefelling.co.za" className="text-gray-300 hover:text-white transition-colors">
                    jhr@topcuttreefelling.co.za
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <IconMapPin size={20} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">Our Location</p>
                  <p className="text-gray-300">
                    12 Celiers Street, Kuruman, South Africa
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>© {currentYear} Top Cut. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
