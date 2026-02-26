"use client";
import React, { useState, useEffect } from "react";
import { IconX, IconLoader2 } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
    id?: number;
    category_id: number;
    name: string;
    slug: string;
    description: string | null;
    price_cents: number;
    stock_quantity: number;
    image_url: string | null;
}

interface Category {
    id: number;
    name: string;
}

interface ProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    categories: Category[];
    onSave: (product: any) => Promise<void>;
}

export function ProductDialog({ isOpen, onClose, product, categories, onSave }: ProductDialogProps) {
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        slug: "",
        category_id: categories[0]?.id || 0,
        price_cents: 0,
        stock_quantity: 0,
        description: "",
        image_url: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({
                name: "",
                slug: "",
                category_id: categories[0]?.id || 0,
                price_cents: 0,
                stock_quantity: 0,
                description: "",
                image_url: "",
            });
        }
    }, [product, categories]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Failed to save product:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNameChange = (name: string) => {
        const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        setFormData({ ...formData, name, slug });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl no-scrollbar"
                >
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">
                            {product ? "Edit Product" : "Add New Product"}
                        </h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <IconX size={20} className="text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    readOnly
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Category</label>
                                <select
                                    value={formData.category_id}
                                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                >
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Price (Cents)</label>
                                <input
                                    type="number"
                                    value={formData.price_cents}
                                    onChange={(e) => setFormData({ ...formData, price_cents: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Initial Stock</label>
                                <input
                                    type="number"
                                    value={formData.stock_quantity}
                                    onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image_url || ""}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <textarea
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none h-24 resize-none"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-2 rounded-lg transition-colors font-semibold shadow-md flex items-center justify-center min-w-[120px]"
                            >
                                {isSubmitting ? <IconLoader2 className="animate-spin" /> : "Save Product"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
