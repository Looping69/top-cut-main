"use client";
import React, { useState, useEffect } from "react";
import {
    IconPlus,
    IconSearch,
    IconCalendar,
    IconSettings,
    IconDotsVertical,
    IconEdit,
    IconTrash,
    IconClock,
    IconUser
} from "@tabler/icons-react";
import { encoreFetch } from "@/lib/encore";
import { AppointmentDialog } from "@/components/dashboard/AppointmentDialog";
import { ServiceTypeDialog } from "@/components/dashboard/ServiceTypeDialog";
import { ServiceTypeList } from "@/components/dashboard/ServiceTypeList";

interface ServiceType {
    id: number;
    name: string;
    duration_minutes: number;
    price_cents: number;
}

interface Appointment {
    id: number;
    service_type_id: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    start_time: string;
    end_time: string;
    status: string;
    notes: string | null;
}

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState<"appointments" | "services">("appointments");
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Dialog states
    const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [apptsData, typesData] = await Promise.all([
                encoreFetch("/appointments"),
                encoreFetch("/service-types")
            ]);
            setAppointments(apptsData.appointments);
            setServiceTypes(typesData.serviceTypes);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSaveAppointment = async (data: any) => {
        if (selectedAppointment) {
            await encoreFetch(`/appointments/${selectedAppointment.id}`, {
                method: "PUT",
                body: JSON.stringify(data),
            });
        } else {
            await encoreFetch("/appointments", {
                method: "POST",
                body: JSON.stringify(data),
            });
        }
        fetchData();
    };

    const handleDeleteAppointment = async (id: number) => {
        if (confirm("Are you sure you want to cancel this appointment?")) {
            await encoreFetch(`/appointments/${id}`, { method: "DELETE" });
            fetchData();
        }
    };

    const handleSaveService = async (data: any) => {
        if (selectedService) {
            await encoreFetch(`/service-types/${selectedService.id}`, {
                method: "PUT",
                body: JSON.stringify(data),
            });
        } else {
            await encoreFetch("/service-types", {
                method: "POST",
                body: JSON.stringify(data),
            });
        }
        fetchData();
    };

    const handleDeleteService = async (id: number) => {
        if (confirm("Are you sure you want to delete this service type?")) {
            await encoreFetch(`/service-types/${id}`, { method: "DELETE" });
            fetchData();
        }
    };

    const getServiceType = (id: number) => serviceTypes.find(s => s.id === id)?.name || "Unknown Service";

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            case 'completed': return 'bg-gray-100 text-gray-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
                    <p className="text-gray-500 mt-1">Manage your customer bookings and services.</p>
                </div>
                <button
                    onClick={() => {
                        setSelectedAppointment(null);
                        setIsAppointmentOpen(true);
                    }}
                    className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                    <IconPlus size={20} />
                    <span>New Booking</span>
                </button>
            </div>

            <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab("appointments")}
                    className={`px-8 py-4 font-bold text-sm transition-all relative whitespace-nowrap ${activeTab === "appointments" ? "text-[var(--primary)]" : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <IconCalendar size={18} />
                        Upcoming Bookings
                    </div>
                    {activeTab === "appointments" && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] rounded-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("services")}
                    className={`px-8 py-4 font-bold text-sm transition-all relative whitespace-nowrap ${activeTab === "services" ? "text-[var(--primary)]" : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <IconSettings size={18} />
                        Service Types
                    </div>
                    {activeTab === "services" && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] rounded-full" />
                    )}
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {activeTab === "appointments" ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Schedule</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {appointments.map((appt) => (
                                    <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <IconUser size={20} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{appt.customer_name}</div>
                                                    <div className="text-sm text-gray-500">{appt.customer_email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-700">{getServiceType(appt.service_type_id)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <IconClock size={16} className="text-gray-400" />
                                                {new Date(appt.start_time).toLocaleString('en-ZA', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(appt.status)}`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedAppointment(appt);
                                                        setIsAppointmentOpen(true);
                                                    }}
                                                    className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                                                >
                                                    <IconEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAppointment(appt.id)}
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                >
                                                    <IconTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {appointments.length === 0 && !loading && (
                            <div className="py-20 text-center">
                                <IconCalendar className="mx-auto text-gray-300 mb-4" size={48} />
                                <p className="text-gray-500 font-medium">No appointments found</p>
                                <button
                                    onClick={() => setIsAppointmentOpen(true)}
                                    className="mt-4 text-[var(--primary)] font-bold hover:underline"
                                >
                                    Schedule first booking
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6 px-6">
                            <h2 className="text-xl font-bold text-gray-900">Manage Services</h2>
                            <button
                                onClick={() => {
                                    setSelectedService(null);
                                    setIsServiceOpen(true);
                                }}
                                className="btn-primary flex items-center gap-2"
                            >
                                <IconPlus size={18} />
                                Add Service
                            </button>
                        </div>
                        <ServiceTypeList
                            serviceTypes={serviceTypes}
                            onEdit={(s) => {
                                setSelectedService(s);
                                setIsServiceOpen(true);
                            }}
                            onDelete={handleDeleteService}
                        />
                    </div>
                )}
            </div>

            <AppointmentDialog
                isOpen={isAppointmentOpen}
                onClose={() => setIsAppointmentOpen(false)}
                appointment={selectedAppointment}
                serviceTypes={serviceTypes}
                onSave={handleSaveAppointment}
            />

            <ServiceTypeDialog
                isOpen={isServiceOpen}
                onClose={() => setIsServiceOpen(false)}
                serviceType={selectedService}
                onSave={handleSaveService}
            />
        </div>
    );
}
