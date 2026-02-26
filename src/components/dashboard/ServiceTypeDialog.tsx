"use client";
import React, { useState, useEffect } from "react";
import { IconX, IconLoader2 } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceType {
    id?: number;
    name: string;
    duration_minutes: number;
    price_cents: number;
}

interface ServiceTypeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    serviceType: ServiceType | null;
    onSave: (serviceType: any) => Promise<void>;
}

export function ServiceTypeDialog({ isOpen, onClose, serviceType, onSave }: ServiceTypeDialogProps) {
    const [formData, setFormData] = useState<Partial<ServiceType>>({
        name: "",
        duration_minutes: 30,
        price_cents: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (serviceType) {
            setFormData(serviceType);
        } else {
            setFormData({
                name: "",
                duration_minutes: 30,
                price_cents: 0,
            });
        }
    }, [serviceType]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Failed to save service type:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl no-scrollbar"
                >
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">
                            {serviceType ? "Edit Service" : "New Service"}
                        </h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <IconX size={20} className="text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Service Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                placeholder="e.g. Haircut & Beard"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Duration (min)</label>
                                <input
                                    type="number"
                                    value={formData.duration_minutes}
                                    onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                />
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
                                {isSubmitting ? <IconLoader2 className="animate-spin" /> : "Save Service"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
