"use client";
import React, { useState, useEffect } from "react";
import { IconX, IconLoader2 } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface Appointment {
    id?: number;
    service_type_id: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    start_time: string;
    status: string;
    notes: string | null;
}

interface ServiceType {
    id: number;
    name: string;
}

interface AppointmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: Appointment | null;
    serviceTypes: ServiceType[];
    onSave: (appointment: any) => Promise<void>;
}

export function AppointmentDialog({ isOpen, onClose, appointment, serviceTypes, onSave }: AppointmentDialogProps) {
    const [formData, setFormData] = useState<Partial<Appointment>>({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        service_type_id: serviceTypes[0]?.id || 0,
        start_time: new Date().toISOString().slice(0, 16),
        status: "confirmed",
        notes: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (appointment) {
            // Ensure start_time is in YYYY-MM-DDTHH:mm format for input
            const date = new Date(appointment.start_time);
            const formattedDate = date.toISOString().slice(0, 16);
            setFormData({ ...appointment, start_time: formattedDate });
        } else {
            setFormData({
                customer_name: "",
                customer_email: "",
                customer_phone: "",
                service_type_id: serviceTypes[0]?.id || 0,
                start_time: new Date().toISOString().slice(0, 16),
                status: "confirmed",
                notes: "",
            });
        }
    }, [appointment, serviceTypes]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error("Failed to save appointment:", error);
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
                    className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl no-scrollbar"
                >
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">
                            {appointment ? "Edit Appointment" : "New Booking"}
                        </h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <IconX size={20} className="text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Customer Name</label>
                                <input
                                    type="text"
                                    value={formData.customer_name}
                                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Service Type</label>
                                <select
                                    value={formData.service_type_id}
                                    onChange={(e) => setFormData({ ...formData, service_type_id: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                >
                                    {serviceTypes.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={formData.customer_email}
                                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.customer_phone}
                                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Start Time</label>
                                <input
                                    type="datetime-local"
                                    value={formData.start_time}
                                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                                >
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Notes (Optional)</label>
                            <textarea
                                value={formData.notes || ""}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none h-24 resize-none"
                                placeholder="Any special instructions or details..."
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
                                {isSubmitting ? <IconLoader2 className="animate-spin" /> : "Save Booking"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
