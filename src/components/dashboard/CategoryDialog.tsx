"use client";
import React, { useState, useEffect } from "react";
import { IconX, IconLoader2 } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
    id?: number;
    name: string;
    slug: string;
    description: string | null;
}

interface CategoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category | null;
    onSave: (category: any) => Promise<void>;
}

export function CategoryDialog({ isOpen, onClose, category, onSave }: CategoryDialogProps) {
    const [formData, setFormData] = useState<Partial<Category>>({
        name: "",
        slug: "",
        description: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (category) {
            setFormData(category);
        } else {
            setFormData({
                name: "",
                slug: "",
                description: "",
            });
        }
    }, [category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Failed to save category:", error);
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
                    className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl no-scrollbar"
                >
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">
                            {category ? "Edit Category" : "Add New Category"}
                        </h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <IconX size={20} className="text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Category Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                required
                                placeholder="e.g. Tree Care, Firewood"
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
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <textarea
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none h-24 resize-none"
                                placeholder="Brief description of the category..."
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-2 rounded-lg transition-colors font-semibold flex items-center justify-center min-w-[120px]"
                            >
                                {isSubmitting ? <IconLoader2 className="animate-spin" /> : "Save Category"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
