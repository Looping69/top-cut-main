"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CallToAction";
import { ContactBlock } from "@/components/ContactBlock";
import { servicesData } from "@/constants/services";
import { IconBrandWhatsapp, IconPhone } from "@tabler/icons-react";

export default function ServiceDetailPage() {
    const params = useParams();
    const categorySlug = params.category as string;
    const serviceSlug = params.service as string;

    const category = servicesData.find(c => c.slug === categorySlug);
    if (!category) notFound();

    const service = category.subservices.find(s => s.slug === serviceSlug);
    if (!service) notFound();

    return (
        <div className="bg-white min-h-screen">
            {/* Detail Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src={service.images[0] || "/images/hero-bg.jpg"} // Fallback to hero-bg if specific images not found
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <Container className="relative z-10 text-white text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link
                            href={`/services/${category.slug}`}
                            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {category.title}
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
                        <div className="flex justify-center flex-wrap gap-4 mt-8">
                            <a href="tel:+27788747327" className="btn-primary flex items-center gap-2">
                                <IconPhone size={20} />
                                Call Now
                            </a>
                            <a href="https://wa.me/27788747327" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center gap-2 transition-all">
                                <IconBrandWhatsapp size={20} />
                                WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Main Content */}
            <section className="py-20 lg:py-32">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left Column: Description & Gallery */}
                        <div className="lg:col-span-2">
                            <div className="prose prose-lg max-w-none text-gray-600">
                                <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-[var(--primary)] pl-6">
                                    Service Overview
                                </h2>
                                <p className="text-xl leading-relaxed mb-8 text-gray-700">
                                    {service.longDescription}
                                </p>
                                <p className="mb-12">
                                    {service.description}
                                </p>
                            </div>

                            {/* Benefits Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-16">
                                {service.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4 flex-shrink-0">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-gray-800">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Photo Gallery Placeholder */}
                            <div>
                                <h2 className="text-2xl font-bold mb-8">Service Gallery</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {service.images.map((img, idx) => (
                                        <div key={idx} className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                                            <Image
                                                src={img}
                                                alt={`${service.title} Gallery ${idx + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                    {service.images.length === 0 && (
                                        <div className="col-span-2 flex flex-col items-center justify-center py-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
                                            <category.icon size={48} className="mb-4 opacity-50" />
                                            <p>Photos for this service are coming soon.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-8">
                                {/* Contact Quick Link */}
                                <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
                                    <div className="absolute -right-10 -bottom-10 opacity-10">
                                        <category.icon size={200} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 relative z-10">Get Your Free Quote</h3>
                                    <p className="text-gray-300 mb-8 relative z-10">
                                        Our experts are ready to assist you with your {category.title} needs.
                                        Contact us today for a professional assessment.
                                    </p>
                                    <Link href="/quote" className="btn-primary w-full text-center relative z-10">
                                        Inquire Now
                                    </Link>
                                </div>

                                {/* Other Services in Category */}
                                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                                    <h3 className="text-xl font-bold mb-6">More in {category.title}</h3>
                                    <div className="space-y-4">
                                        {category.subservices.filter(s => s.slug !== service.slug).map(s => (
                                            <Link
                                                key={s.slug}
                                                href={`/services/${category.slug}/${s.slug}`}
                                                className="flex items-center p-3 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-[var(--primary)] mr-3 transition-transform group-hover:scale-150" />
                                                <span className="text-gray-700 font-medium">{s.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <ContactBlock />
            <CallToAction />
        </div>
    );
}
