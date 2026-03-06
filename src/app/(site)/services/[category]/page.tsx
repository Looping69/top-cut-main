"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import { servicesData } from "@/constants/services";

export default function CategoryPage() {
    const params = useParams();
    const categorySlug = params.category as string;

    const category = servicesData.find(c => c.slug === categorySlug);

    if (!category) {
        notFound();
    }

    return (
        <div className="bg-background-light min-h-screen">
            {/* Category Hero */}
            <section className={`${category.color} py-20 text-white relative overflow-hidden`}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 translate-x-1/4">
                    <category.icon size={400} />
                </div>
                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <Link
                            href="/services"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to All Services
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{category.title}</h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            {category.description}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Subservices List */}
            <section className="py-20">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {category.subservices.map((sub, index) => (
                            <motion.div
                                key={sub.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--primary)] transition-colors">
                                        {sub.title}
                                    </h3>
                                    <p className="text-gray-600 mb-8 flex-grow">
                                        {sub.description}
                                    </p>

                                    <div className="mb-8">
                                        <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Key Benefits</h4>
                                        <ul className="space-y-2">
                                            {sub.benefits.slice(0, 3).map((benefit, i) => (
                                                <li key={i} className="flex items-center text-sm text-gray-700">
                                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link
                                        href={`/services/${category.slug}/${sub.slug}`}
                                        className="inline-flex items-center justify-center w-full py-4 px-6 rounded-xl font-bold text-white bg-slate-900 hover:bg-[var(--primary)] transition-all duration-300 group-hover:scale-[1.02]"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            <CallToAction />
        </div>
    );
}
