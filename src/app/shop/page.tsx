"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconShoppingCart, IconTree, IconSearch, IconFilter, IconLeaf } from "@tabler/icons-react";
import { encoreFetch } from "@/lib/encore";
import { Container } from "@/components/Container";

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface Product {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    description: string | null;
    price_cents: number;
    stock_quantity: number;
    image_url: string | null;
}

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchShopData = async () => {
            setIsLoading(true);
            try {
                // Fetch both concurrently
                const [prodRes, catRes] = await Promise.all([
                    encoreFetch("/products"),
                    encoreFetch("/categories")
                ]);

                if (prodRes && prodRes.products) setProducts(prodRes.products);
                if (catRes && catRes.categories) setCategories(catRes.categories);
            } catch (error) {
                console.error("Error fetching shop data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShopData();
    }, []);

    const formatPrice = (cents: number) => {
        return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(cents / 100);
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === null || product.category_id === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Container>
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="bg-green-100 text-[var(--primary)] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block shadow-sm ring-1 ring-green-600/10">
                            Our Products
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
                            <span className="text-[var(--primary)]">Top Cut</span> Store
                        </h1>
                        <p className="text-lg text-gray-600">
                            Browse our selection of premium wood, compost, and gardening supplies. High-quality materials for your landscaping needs.
                        </p>
                    </motion.div>
                </div>

                {/* Filters and Search Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === null
                                ? "bg-[var(--primary)] text-white shadow-md transform scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            All Products
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === category.id
                                    ? "bg-[var(--primary)] text-white shadow-md transform scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <IconSearch size={20} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-shadow"
                        />
                    </div>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--primary)]"></div>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Product Image */}
                                <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                                    {product.image_url ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={product.image_url}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                unoptimized
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full h-full text-gray-300">
                                            <IconLeaf size={48} className="mb-2 opacity-50" />
                                            <span className="text-sm font-medium">No image</span>
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-[var(--primary-dark)] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                            {categories.find(c => c.id === product.category_id)?.name || 'Product'}
                                        </span>
                                    </div>

                                    {/* Stock Status */}
                                    {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                                Only {product.stock_quantity} left
                                            </span>
                                        </div>
                                    )}
                                    {product.stock_quantity === 0 && (
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                                Out of stock
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                                        {product.name}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">
                                        {product.description || "Premium quality product from Top Cut."}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <span className="text-2xl font-extrabold text-[var(--primary-dark)]">
                                            {formatPrice(product.price_cents)}
                                        </span>

                                        <button
                                            disabled={product.stock_quantity === 0}
                                            className={`flex items-center justify-center p-3 rounded-xl transition-all ${product.stock_quantity > 0
                                                ? "bg-[var(--accent)] text-white hover:bg-[#d97d02] hover:shadow-md transform hover:scale-105"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                }`}
                                            aria-label="Add to quote"
                                        >
                                            <IconShoppingCart size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <IconTree size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500">
                            We couldn&apos;t find any products matching your search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory(null);
                                setSearchQuery("");
                            }}
                            className="mt-6 text-[var(--primary)] font-bold hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </Container>
        </main>
    );
}
