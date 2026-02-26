"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Shop", href: "/shop" },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Dashboard", href: "/dashboard" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className="bg-gradient-to-r from-white to-green-50 shadow-lg sticky top-0 z-50 border-b-2 border-[var(--accent)]">
        <div className="container-custom flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-14 w-14 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] rounded-full p-1.5 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
              <Image
                src="/topcut.png"
                alt="Top Cut Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-[var(--accent)]">Top</span> <span className="text-[var(--primary-dark)]">Cut</span>
              </span>
              <span className="block text-sm text-[var(--primary-dark)] mt-0.5">Tree Felling & Landscaping</span>
              <div className="h-1 w-0 group-hover:w-full bg-[var(--accent)] mt-1 transition-all duration-300"></div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-semibold text-base transition-colors duration-200 hover:text-[var(--primary)] relative ${pathname === item.href
                  ? "text-[var(--primary)] font-bold border-b-2 border-[var(--accent)] pb-1"
                  : "text-gray-700 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/quote" className="btn-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get a Free Quote
            </Link>
          </nav>

          <button
            className="md:hidden text-[var(--primary-dark)] hover:text-[var(--primary)] focus:outline-none focus-visible bg-green-50 p-2 rounded-md"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <IconMenu2 size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 md:hidden"
            onClick={toggleSidebar}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed right-0 top-0 h-full w-72 bg-gradient-to-b from-white to-green-50 shadow-2xl p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8 border-b border-green-100 pb-4">
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="relative h-12 w-12 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] rounded-full p-1 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                    <Image
                      src="/topcut.png"
                      alt="Top Cut Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xl font-extrabold tracking-tight">
                      <span className="text-[var(--accent)]">Top</span> <span className="text-[var(--primary-dark)]">Cut</span>
                    </span>
                    <span className="block text-sm text-[var(--primary-dark)] mt-0.5">Tree Felling & Landscaping</span>
                    <div className="h-0.5 w-0 group-hover:w-full bg-[var(--accent)] mt-0.5 transition-all duration-300"></div>
                  </div>
                </Link>
                <button
                  className="text-[var(--primary-dark)] hover:text-[var(--primary)] focus:outline-none focus-visible bg-green-50 p-2 rounded-md"
                  onClick={toggleSidebar}
                  aria-label="Close menu"
                >
                  <IconX size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-semibold py-2 transition-colors duration-200 ${pathname === item.href
                      ? "text-[var(--primary)] font-bold border-l-4 border-[var(--accent)] pl-4 bg-green-50 rounded-r-lg"
                      : "text-gray-700 hover:text-[var(--primary)] hover:bg-green-50 hover:border-l-4 hover:border-[var(--accent)] pl-4 rounded-r-lg"
                      }`}
                    onClick={toggleSidebar}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/quote"
                  className="btn-primary text-center mt-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={toggleSidebar}
                >
                  Get a Free Quote
                </Link>
              </nav>

              <div className="absolute bottom-8 left-5 right-5">
                <div className="bg-gradient-to-r from-green-light to-[var(--primary-light)] p-5 rounded-lg shadow-lg border border-[var(--accent)] transform hover:scale-102 transition-all duration-300">
                  <p className="text-sm text-[var(--primary-dark)] font-bold mb-2">EMERGENCY TREE SERVICE</p>
                  <a href="tel:+27788747327" className="text-[var(--primary)] font-bold block mt-1 flex items-center text-lg">
                    <div className="bg-[var(--accent)] p-2 rounded-full mr-3 shadow-md">
                      <FaPhoneAlt className="text-white" />
                    </div>
                    +27 78 874 7327
                  </a>
                  <p className="text-xs text-gray-600 mt-2">Available 24/7 for urgent tree hazards</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
