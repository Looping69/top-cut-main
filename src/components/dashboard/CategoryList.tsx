"use client";
import React, { useState, useEffect } from "react";
import { IconEdit, IconTrash, IconLoader2, IconPlus } from "@tabler/icons-react";
import { encoreFetch } from "@/lib/encore";
import { CategoryDialog } from "./CategoryDialog";

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

export function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const data = await encoreFetch("/categories");
            setCategories(data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveCategory = async (formData: any) => {
        try {
            if (editingCategory) {
                await encoreFetch(`/categories/${editingCategory.id}`, {
                    method: "PUT",
                    body: JSON.stringify(formData)
                });
            } else {
                await encoreFetch("/categories", {
                    method: "POST",
                    body: JSON.stringify(formData)
                });
            }
            fetchCategories();
        } catch (error) {
            console.error("Failed to save category:", error);
            alert("Failed to save category.");
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (!confirm("Are you sure? This might affect products in this category.")) return;
        try {
            await encoreFetch(`/categories/${id}`, { method: "DELETE" });
            fetchCategories();
        } catch (error) {
            console.error("Failed to delete category:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Product Categories</h2>
                <button
                    onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold"
                >
                    <IconPlus size={16} />
                    Add Category
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <IconLoader2 className="animate-spin text-gray-400" size={32} />
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Slug</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 font-semibold text-gray-900">{category.name}</td>
                                    <td className="px-6 py-4 text-gray-500 font-mono text-sm">{category.slug}</td>
                                    <td className="px-6 py-4 text-gray-500 text-sm max-w-md truncate">
                                        {category.description || "-"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setEditingCategory(category); setIsModalOpen(true); }}
                                                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <IconEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <CategoryDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={editingCategory}
                onSave={handleSaveCategory}
            />
        </div>
    );
}
