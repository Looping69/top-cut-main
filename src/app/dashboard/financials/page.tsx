"use client";
import React, { useEffect, useState } from "react";
import { encoreFetch } from "@/lib/encore";
import {
    IconReceipt2,
    IconCurrencyDollar,
    IconSearch,
    IconRefresh,
    IconChevronRight,
    IconX,
    IconCheck,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price_cents: number;
    product_name?: string;
}

interface ShopOrder {
    id: number;
    customer_name: string;
    customer_email: string;
    total_amount_cents: number;
    status: string;
    created_at: string;
    items?: OrderItem[];
}

export default function FinancialsPage() {
    const [orders, setOrders] = useState<ShopOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<ShopOrder | null>(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await encoreFetch("/orders");
            setOrders(res.orders || []);
        } catch (e: any) {
            setError(e.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const viewOrderDetails = async (id: number) => {
        setLoadingDetails(true);
        try {
            const orderWithItems = await encoreFetch(`/orders/${id}`);
            setSelectedOrder(orderWithItems);
        } catch (e: any) {
            alert("Failed to load order details: " + e.message);
        } finally {
            setLoadingDetails(false);
        }
    };

    const updateStatus = async (status: string) => {
        if (!selectedOrder) return;
        setUpdatingStatus(true);
        try {
            await encoreFetch(`/orders/${selectedOrder.id}/status`, {
                method: "PUT",
                body: JSON.stringify({ status })
            });
            // Update local state cleanly
            setSelectedOrder({ ...selectedOrder, status });
            setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status } : o));
        } catch (e: any) {
            alert("Failed to update status: " + e.message);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const formatRand = (cents: number) =>
        `R ${(cents / 100).toLocaleString("en-ZA", { minimumFractionDigits: 0 })}`;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid": return "bg-green-100 text-green-700";
            case "shipped": return "bg-blue-100 text-blue-700";
            case "delivered": return "bg-teal-100 text-teal-700";
            case "cancelled": return "bg-red-100 text-red-700";
            case "refunded": return "bg-orange-100 text-orange-700";
            default: return "bg-gray-100 text-gray-700"; // pending
        }
    };

    const filteredOrders = orders.filter(o =>
        o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.id.toString().includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Financials & Orders</h1>
                    <p className="text-gray-500 mt-1">Manage shop orders and track revenue.</p>
                </div>
                <button
                    onClick={loadOrders}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                >
                    <IconRefresh size={20} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="relative w-full max-w-md">
                        <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders by ID, name, or email..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-shadow text-sm"
                        />
                    </div>
                </div>

                {error ? (
                    <div className="p-8 text-center text-red-500">
                        <p className="font-medium">{error}</p>
                        <button onClick={loadOrders} className="mt-4 underline hover:text-red-600">Try again</button>
                    </div>
                ) : loading ? (
                    <div className="p-8 text-center text-gray-400 animate-pulse">
                        <IconReceipt2 size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-medium">Loading orders...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-16 text-center text-gray-400 flex-1 flex flex-col justify-center">
                        <IconReceipt2 size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-medium text-lg text-gray-600">No orders found</p>
                        <p className="mt-1">Try adjusting your search or wait for new customers.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Order ID</th>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Customer</th>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Date</th>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Total</th>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                                    <th className="px-6 py-4 font-medium whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {filteredOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                            #{order.id.toString().padStart(4, "0")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="font-medium text-gray-900">{order.customer_name}</p>
                                            <p className="text-gray-500 text-xs">{order.customer_email}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString("en-ZA", {
                                                day: "numeric", month: "short", year: "numeric"
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                                            {formatRand(order.total_amount_cents)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button
                                                onClick={() => viewOrderDetails(order.id)}
                                                className="inline-flex items-center gap-1 text-[var(--primary)] font-bold hover:underline"
                                            >
                                                Details <IconChevronRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                            onClick={() => setSelectedOrder(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Order #{selectedOrder.id.toString().padStart(4, "0")}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {new Date(selectedOrder.created_at).toLocaleString("en-ZA")}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <IconX size={24} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto flex-1">
                                {loadingDetails ? (
                                    <div className="py-12 flex justify-center text-[var(--primary)]">
                                        <IconRefresh size={32} className="animate-spin" />
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {/* Customer Info */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Customer Details</p>
                                                <p className="font-medium text-gray-900">{selectedOrder.customer_name}</p>
                                                <p className="text-sm text-gray-500">{selectedOrder.customer_email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Current Status</p>
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase mt-1 ${getStatusColor(selectedOrder.status)}`}>
                                                    {selectedOrder.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Order Items</p>
                                            <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden text-sm">
                                                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                                    <div className="divide-y divide-gray-100">
                                                        {selectedOrder.items.map(item => (
                                                            <div key={item.id} className="p-4 flex items-center justify-between">
                                                                <div>
                                                                    <p className="font-medium text-gray-900">{item.product_name || `Product #${item.product_id}`}</p>
                                                                    <p className="text-gray-500">Qty: {item.quantity}</p>
                                                                </div>
                                                                <p className="font-bold text-gray-900">
                                                                    {formatRand(item.price_cents * item.quantity)}
                                                                </p>
                                                            </div>
                                                        ))}
                                                        <div className="p-4 bg-white flex justify-between items-center border-t-2 border-dashed border-gray-200">
                                                            <p className="font-bold text-gray-900">Total Paid</p>
                                                            <p className="font-black text-lg text-gray-900">
                                                                {formatRand(selectedOrder.total_amount_cents)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="p-4 text-gray-500 italic">No items found for this order.</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer (Actions) */}
                            {!loadingDetails && (
                                <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3">
                                    <p className="w-full text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Update Status</p>
                                    {["pending", "paid", "shipped", "delivered", "cancelled", "refunded"].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => updateStatus(status)}
                                            disabled={updatingStatus || selectedOrder.status === status}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all border
                                                ${selectedOrder.status === status
                                                    ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm cursor-default"
                                                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                                                }
                                                disabled:opacity-50 disabled:hover:bg-white disabled:hover:border-gray-200
                                            `}
                                        >
                                            {selectedOrder.status === status && <IconCheck size={16} className="inline mr-1 -mt-0.5" />}
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
