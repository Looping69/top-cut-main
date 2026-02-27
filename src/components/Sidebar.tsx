"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX, IconLayoutDashboard } from "@tabler/icons-react";
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
  { name: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) return null;

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
                title={item.name}
                className={`font-semibold text-base transition-colors duration-200 hover:text-[var(--primary)] relative ${pathname === item.href
                  ? "text-[var(--primary)] font-bold border-b-2 border-[var(--accent)] pb-1"
                  : "text-gray-700 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300"
                  }`}
              >
                {item.icon ? <item.icon size={22} /> : item.name}
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
              <div className="flex justify-between items-center mb-4 border-b border-green-100 pb-3">
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="relative h-9 w-9 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] rounded-full p-1 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                    <Image
                      src="/topcut.png"
                      alt="Top Cut Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-base font-extrabold tracking-tight">
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

              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-semibold py-1.5 transition-colors duration-200 ${pathname === item.href
                      ? "text-[var(--primary)] font-bold border-l-4 border-[var(--accent)] pl-3 bg-green-50 rounded-r-lg"
                      : "text-gray-700 hover:text-[var(--primary)] hover:bg-green-50 hover:border-l-4 hover:border-[var(--accent)] pl-3 rounded-r-lg"
                      }`}
                    onClick={toggleSidebar}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/quote"
                  className="btn-primary text-center text-sm mt-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={toggleSidebar}
                >
                  Get a Free Quote
                </Link>
              </nav>

              <div className="absolute bottom-4 left-5 right-5">
                <a
                  href="tel:+27788747327"
                  className="flex items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg px-3 py-2 hover:bg-[var(--accent)]/20 transition-colors"
                >
                  <div className="bg-[var(--accent)] p-1.5 rounded-md flex-shrink-0">
                    <FaPhoneAlt className="text-white" size={12} />
                  </div>
                  <span className="text-sm font-bold text-[var(--primary-dark)]">+27 78 874 7327</span>
                  <span className="text-xs text-gray-500 ml-auto">24/7</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
