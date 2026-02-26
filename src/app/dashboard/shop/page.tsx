"use client";
import React, { useState, useEffect } from "react";
import { IconSearch, IconPlus, IconEdit, IconTrash, IconLoader2, IconLayoutGrid, IconPackage } from "@tabler/icons-react";
import { encoreFetch } from "@/lib/encore";
import { ProductDialog } from "@/components/dashboard/ProductDialog";
import { CategoryList } from "@/components/dashboard/CategoryList";

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

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

export default function ShopManagerPage() {
    const [activeTab, setActiveTab] = useState<"products" | "categories">("products");
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (activeTab === "products") {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [prodData, catData] = await Promise.all([
                encoreFetch(`/products?search=${searchQuery}`),
                encoreFetch("/categories")
            ]);
            setProducts(prodData.products);
            setCategories(catData.categories);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData();
    };

    const handleSaveProduct = async (formData: any) => {
        try {
            if (editingProduct) {
                await encoreFetch(`/products/${editingProduct.id}`, {
                    method: "PUT",
                    body: JSON.stringify(formData)
                });
            } else {
                await encoreFetch("/products", {
                    method: "POST",
                    body: JSON.stringify(formData)
                });
            }
            fetchData();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save product:", error);
            alert("Failed to save product.");
        }
    };

    const handleDeleteProduct = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await encoreFetch(`/products/${id}`, { method: "DELETE" });
            fetchData();
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const formatPrice = (cents: number) => {
        return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(cents / 100);
    };

    const getCategoryName = (id: number) => {
        return categories.find(c => c.id === id)?.name || "Unknown";
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Shop Manager</h1>
                    <p className="text-gray-500 mt-1">Manage your inventory, categories, and stock levels.</p>
                </div>
                {activeTab === "products" && (
                    <button
                        onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                        className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 font-bold"
                    >
                        <IconPlus size={20} />
                        <span>Add Product</span>
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar gap-8">
                <button
                    onClick={() => setActiveTab("products")}
                    className={`pb-4 px-2 flex items-center gap-2 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === "products"
                        ? "border-[var(--primary)] text-gray-900"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                        }`}
                >
                    <IconPackage size={18} />
                    Products
                </button>
                <button
                    onClick={() => setActiveTab("categories")}
                    className={`pb-4 px-2 flex items-center gap-2 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === "categories"
                        ? "border-[var(--primary)] text-gray-900"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                        }`}
                >
                    <IconLayoutGrid size={18} />
                    Categories
                </button>
            </div>

            {activeTab === "products" ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-semibold text-gray-900">Product Inventory</h2>
                        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                            <div className="relative flex-grow">
                                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                                />
                            </div>
                            <button type="submit" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold transition-colors">
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                <IconLoader2 className="animate-spin text-[var(--primary)]" size={40} />
                                <p className="text-gray-500 font-medium">Loading inventory...</p>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-20 text-center text-gray-500">
                                                No products found. Start by adding one!
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {product.image_url ? (
                                                            <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                                                <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                                                            </div>
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 text-xs font-bold">
                                                                IMG
                                                            </div>
                                                        )}
                                                        <span className="font-semibold text-gray-900">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 text-sm">{getCategoryName(product.category_id)}</td>
                                                <td className="px-6 py-4 text-gray-900 font-bold">{formatPrice(product.price_cents)}</td>
                                                <td className="px-6 py-4">
                                                    {product.stock_quantity > 10 ? (
                                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ring-green-600/20">
                                                            {product.stock_quantity} In Stock
                                                        </span>
                                                    ) : product.stock_quantity > 0 ? (
                                                        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ring-amber-600/20">
                                                            {product.stock_quantity} Low Stock
                                                        </span>
                                                    ) : (
                                                        <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ring-red-600/20">
                                                            Out of Stock
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                                                            className="p-2 text-gray-400 hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 rounded-lg transition-all"
                                                            title="Edit Product"
                                                        >
                                                            <IconEdit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(product.id)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                            title="Delete Product"
                                                        >
                                                            <IconTrash size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            ) : (
                <CategoryList />
            )}

            <ProductDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={editingProduct}
                categories={categories}
                onSave={handleSaveProduct}
            />
        </div>
    );
}
