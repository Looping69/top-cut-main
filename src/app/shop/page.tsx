"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconShoppingCart,
    IconTree,
    IconSearch,
    IconLeaf,
    IconX,
    IconPlus,
    IconMinus,
    IconTrash,
    IconCheck,
    IconPackage,
} from "@tabler/icons-react";
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

interface CartItem {
    product: Product;
    quantity: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(cents / 100);

// ─── Product Modal ─────────────────────────────────────────────────────────────
function ProductModal({
    product,
    category,
    onClose,
    onAddToCart,
}: {
    product: Product;
    category?: Category;
    onClose: () => void;
    onAddToCart: (product: Product, qty: number) => void;
}) {
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAddToCart(product, qty);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            onClose();
        }, 900);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            >
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 60 }}
                    transition={{ type: "spring", damping: 28, stiffness: 260 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl"
                >
                    {/* Image */}
                    <div className="relative h-56 sm:h-64 w-full bg-gray-100">
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full text-gray-300">
                                <IconLeaf size={56} className="opacity-40" />
                            </div>
                        )}
                        {/* Badges */}
                        {category && (
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[var(--primary-dark)] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                {category.name}
                            </span>
                        )}
                        {product.stock_quantity === 0 && (
                            <span className="absolute top-4 right-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                Out of stock
                            </span>
                        )}
                        {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                            <span className="absolute top-4 right-4 bg-orange-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                Only {product.stock_quantity} left
                            </span>
                        )}
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                            style={{ right: product.stock_quantity <= 5 ? "auto" : "1rem", left: product.stock_quantity <= 5 ? "auto" : "auto" }}
                        >
                            <IconX size={16} className="text-gray-700" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <h2 className="text-xl font-extrabold text-gray-900 leading-tight">{product.name}</h2>
                            <button onClick={onClose} className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <IconX size={16} className="text-gray-600" />
                            </button>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                            {product.description || "Premium quality product from Top Cut. Ideal for your landscaping and gardening needs."}
                        </p>

                        {/* Stock info */}
                        <div className="flex items-center gap-2 mb-5 text-sm">
                            <IconPackage size={16} className="text-gray-400" />
                            <span className={product.stock_quantity > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            {/* Price */}
                            <span className="text-2xl font-extrabold text-[var(--primary-dark)]">
                                {formatPrice(product.price_cents)}
                            </span>

                            {/* Qty + Add */}
                            {product.stock_quantity > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-xl px-2 py-1">
                                        <button
                                            onClick={() => setQty(q => Math.max(1, q - 1))}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-700"
                                        >
                                            <IconMinus size={14} />
                                        </button>
                                        <span className="w-6 text-center text-sm font-bold text-gray-900">{qty}</span>
                                        <button
                                            onClick={() => setQty(q => Math.min(product.stock_quantity, q + 1))}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-700"
                                        >
                                            <IconPlus size={14} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleAdd}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${added
                                            ? "bg-green-500 text-white"
                                            : "bg-[var(--accent)] text-white hover:bg-[#d97d02] hover:shadow-md active:scale-95"
                                            }`}
                                    >
                                        {added ? <IconCheck size={16} /> : <IconShoppingCart size={16} />}
                                        {added ? "Added!" : "Add to Cart"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ─── Cart Sidebar ──────────────────────────────────────────────────────────────
function CartSidebar({
    cart,
    onClose,
    onUpdateQty,
    onRemove,
}: {
    cart: CartItem[];
    onClose: () => void;
    onUpdateQty: (productId: number, qty: number) => void;
    onRemove: (productId: number) => void;
}) {
    const subtotal = cart.reduce((s, item) => s + item.product.price_cents * item.quantity, 0);
    const totalItems = cart.reduce((s, item) => s + item.quantity, 0);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[var(--accent)] rounded-xl flex items-center justify-center">
                            <IconShoppingCart size={18} className="text-white" />
                        </div>
                        <div>
                            <h2 className="font-extrabold text-gray-900 text-base">Your Cart</h2>
                            <p className="text-xs text-gray-500">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <IconX size={18} className="text-gray-600" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-20">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                                <IconShoppingCart size={28} className="text-gray-300" />
                            </div>
                            <p className="font-bold text-gray-700 text-lg">Cart is empty</p>
                            <p className="text-sm text-gray-400 mt-1">Add products to get started</p>
                        </div>
                    ) : (
                        cart.map(({ product, quantity }) => (
                            <div key={product.id} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-3">
                                {/* Thumb */}
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                                    {product.image_url ? (
                                        <Image src={product.image_url} alt={product.name} fill className="object-cover" unoptimized />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <IconLeaf size={24} className="text-gray-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</p>
                                    <p className="text-xs text-[var(--primary)] font-semibold mt-0.5">
                                        {formatPrice(product.price_cents)}
                                    </p>
                                    {/* Qty controls */}
                                    <div className="flex items-center gap-1 mt-2 bg-white rounded-lg px-1 py-0.5 w-fit border border-gray-200">
                                        <button
                                            onClick={() => quantity <= 1 ? onRemove(product.id) : onUpdateQty(product.id, quantity - 1)}
                                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-gray-600"
                                        >
                                            <IconMinus size={12} />
                                        </button>
                                        <span className="w-5 text-center text-xs font-bold text-gray-900">{quantity}</span>
                                        <button
                                            onClick={() => onUpdateQty(product.id, quantity + 1)}
                                            disabled={quantity >= product.stock_quantity}
                                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-40"
                                        >
                                            <IconPlus size={12} />
                                        </button>
                                    </div>
                                </div>

                                {/* Line total + remove */}
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <p className="text-sm font-extrabold text-gray-900">
                                        {formatPrice(product.price_cents * quantity)}
                                    </p>
                                    <button
                                        onClick={() => onRemove(product.id)}
                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                        <IconTrash size={15} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 font-medium">Subtotal</span>
                            <span className="text-xl font-extrabold text-gray-900">{formatPrice(subtotal)}</span>
                        </div>
                        <a
                            href="/quote"
                            className="block w-full text-center bg-[var(--primary)] hover:opacity-90 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] text-sm"
                        >
                            Request a Quote →
                        </a>
                        <button
                            onClick={onClose}
                            className="block w-full text-center text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors py-1"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </motion.aside>
        </AnimatePresence>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchShopData = async () => {
            setIsLoading(true);
            try {
                const [prodRes, catRes] = await Promise.all([
                    encoreFetch("/products"),
                    encoreFetch("/categories"),
                ]);
                if (prodRes?.products) setProducts(prodRes.products);
                if (catRes?.categories) setCategories(catRes.categories);
            } catch (err) {
                console.error("Error fetching shop data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchShopData();
    }, []);

    const filteredProducts = products.filter((p) => {
        const matchesCat = selectedCategory === null || p.category_id === selectedCategory;
        const matchesSearch =
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const addToCart = useCallback((product: Product, qty: number) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.product.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.product.id === product.id
                        ? { ...i, quantity: Math.min(product.stock_quantity, i.quantity + qty) }
                        : i
                );
            }
            return [...prev, { product, quantity: qty }];
        });
        setCartOpen(true);
    }, []);

    const updateQty = useCallback((productId: number, qty: number) => {
        setCart((prev) =>
            prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
        );
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCart((prev) => prev.filter((i) => i.product.id !== productId));
    }, []);

    const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0);

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Container>
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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

                {/* Filters + Search + Cart button */}
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
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.id
                                    ? "bg-[var(--primary)] text-white shadow-md transform scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
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
                        {/* Cart toggle */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative flex-shrink-0 w-12 h-12 bg-[var(--accent)] hover:bg-[#d97d02] text-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                            aria-label="Open cart"
                        >
                            <IconShoppingCart size={20} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--primary)] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--primary)]" />
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.07 }}
                                onClick={() => setSelectedProduct(product)}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                                    {product.image_url ? (
                                        <Image
                                            src={product.image_url}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            unoptimized
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full h-full text-gray-300">
                                            <IconLeaf size={48} className="mb-2 opacity-50" />
                                            <span className="text-sm font-medium">No image</span>
                                        </div>
                                    )}
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-[var(--primary-dark)] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                            {categories.find((c) => c.id === product.category_id)?.name || "Product"}
                                        </span>
                                    </div>
                                    {/* Stock badges */}
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

                                {/* Details */}
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (product.stock_quantity > 0) addToCart(product, 1);
                                            }}
                                            disabled={product.stock_quantity === 0}
                                            className={`flex items-center justify-center p-3 rounded-xl transition-all ${product.stock_quantity > 0
                                                ? "bg-[var(--accent)] text-white hover:bg-[#d97d02] hover:shadow-md transform hover:scale-105"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                }`}
                                            aria-label="Add to cart"
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
                        <p className="text-gray-500">We couldn&apos;t find any products matching your search criteria.</p>
                        <button
                            onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
                            className="mt-6 text-[var(--primary)] font-bold hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </Container>

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    category={categories.find((c) => c.id === selectedProduct.category_id)}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={(p, q) => { addToCart(p, q); setSelectedProduct(null); }}
                />
            )}

            {/* Cart Sidebar */}
            {cartOpen && (
                <CartSidebar
                    cart={cart}
                    onClose={() => setCartOpen(false)}
                    onUpdateQty={updateQty}
                    onRemove={removeFromCart}
                />
            )}
        </main>
    );
}
