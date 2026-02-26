"use client";
import React, { useEffect, useState } from "react";
import { encoreFetch } from "@/lib/encore";
import {
    IconCalendar,
    IconCalendarCheck,
    IconCalendarX,
    IconClock,
    IconUser,
    IconTrendingUp,
    IconTools,
    IconAlertCircle,
    IconChevronRight,
} from "@tabler/icons-react";
import Link from "next/link";

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

interface ServiceType {
    id: number;
    name: string;
    duration_minutes: number;
    price_cents: number;
}

function StatCard({
    icon: Icon,
    label,
    value,
    sub,
    color,
    loading,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    sub?: string;
    color: string;
    loading?: boolean;
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={22} className="text-white" />
            </div>
            <div className="min-w-0">
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                {loading ? (
                    <div className="h-8 w-16 bg-gray-100 animate-pulse rounded-lg mt-1" />
                ) : (
                    <p className="text-3xl font-bold text-gray-900 mt-0.5">{value}</p>
                )}
                {sub && !loading && (
                    <p className="text-xs text-gray-400 mt-1">{sub}</p>
                )}
            </div>
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case "confirmed": return "bg-green-100 text-green-700";
        case "cancelled": return "bg-red-100 text-red-700";
        case "completed": return "bg-gray-100 text-gray-700";
        default: return "bg-blue-100 text-blue-700";
    }
}

export default function DashboardPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const [apptsData, typesData] = await Promise.all([
                    encoreFetch("/appointments"),
                    encoreFetch("/service-types"),
                ]);
                setAppointments(apptsData.appointments ?? []);
                setServiceTypes(typesData.serviceTypes ?? []);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const now = new Date();
    const todayStr = now.toDateString();

    const confirmed = appointments.filter(a => a.status === "confirmed");
    const cancelled = appointments.filter(a => a.status === "cancelled");
    const completed = appointments.filter(a => a.status === "completed");
    const todayAppts = confirmed.filter(a => new Date(a.start_time).toDateString() === todayStr);
    const upcoming = confirmed
        .filter(a => new Date(a.start_time) > now)
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
        .slice(0, 5);

    // Revenue estimate from completed appts (service price lookup)
    const serviceMap = Object.fromEntries(serviceTypes.map(s => [s.id, s]));
    const revenueEstimate = completed.reduce((sum, a) => {
        const svc = serviceMap[a.service_type_id];
        return sum + (svc?.price_cents ?? 0);
    }, 0);

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleString("en-ZA", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        });

    const formatRand = (cents: number) =>
        `R ${(cents / 100).toLocaleString("en-ZA", { minimumFractionDigits: 0 })}`;

    if (error) {
        return (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
                <IconAlertCircle size={24} />
                <div>
                    <p className="font-bold">Failed to load dashboard data</p>
                    <p className="text-sm opacity-80">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
                    <p className="text-gray-500 mt-1">
                        {now.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                </div>
                <Link
                    href="/dashboard/bookings"
                    className="bg-[var(--primary)] hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-sm"
                >
                    <IconCalendar size={18} />
                    Manage Bookings
                </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    icon={IconCalendarCheck}
                    label="Confirmed Bookings"
                    value={confirmed.length}
                    sub={`${todayAppts.length} today`}
                    color="bg-green-500"
                    loading={loading}
                />
                <StatCard
                    icon={IconClock}
                    label="Upcoming Appointments"
                    value={upcoming.length}
                    sub="next 5 scheduled"
                    color="bg-blue-500"
                    loading={loading}
                />
                <StatCard
                    icon={IconCalendarX}
                    label="Cancelled"
                    value={cancelled.length}
                    sub="all time"
                    color="bg-red-400"
                    loading={loading}
                />
                <StatCard
                    icon={IconTrendingUp}
                    label="Est. Revenue"
                    value={formatRand(revenueEstimate)}
                    sub={`from ${completed.length} completed`}
                    color="bg-[var(--primary)]"
                    loading={loading}
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Upcoming Appointments */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
                        <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            <IconCalendar size={20} className="text-[var(--primary)]" />
                            Upcoming Appointments
                        </h2>
                        <Link href="/dashboard/bookings" className="text-sm text-[var(--primary)] font-bold hover:underline flex items-center gap-1">
                            View all <IconChevronRight size={16} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="divide-y divide-gray-50">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="px-6 py-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-100 animate-pulse rounded w-1/3" />
                                        <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : upcoming.length === 0 ? (
                        <div className="py-12 text-center text-gray-400">
                            <IconCalendar size={40} className="mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No upcoming appointments</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {upcoming.map(appt => (
                                <div key={appt.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                                        <IconUser size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 truncate">{appt.customer_name}</p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {serviceMap[appt.service_type_id]?.name ?? "Unknown Service"}
                                        </p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-medium text-gray-700">{formatTime(appt.start_time)}</p>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(appt.status)}`}>
                                            {appt.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Service Types Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
                        <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            <IconTools size={20} className="text-[var(--primary)]" />
                            Services
                        </h2>
                        <Link href="/dashboard/bookings" className="text-sm text-[var(--primary)] font-bold hover:underline flex items-center gap-1">
                            Manage <IconChevronRight size={16} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="divide-y divide-gray-50">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="px-6 py-4 space-y-2">
                                    <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3" />
                                    <div className="h-3 bg-gray-100 animate-pulse rounded w-1/3" />
                                </div>
                            ))}
                        </div>
                    ) : serviceTypes.length === 0 ? (
                        <div className="py-12 text-center text-gray-400">
                            <IconTools size={40} className="mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No services yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {serviceTypes.map(svc => {
                                const bookingCount = appointments.filter(a => a.service_type_id === svc.id).length;
                                return (
                                    <div key={svc.id} className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-gray-900 truncate">{svc.name}</p>
                                            <span className="text-sm font-bold text-[var(--primary)]">
                                                {formatRand(svc.price_cents)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-xs text-gray-400">{svc.duration_minutes} min</p>
                                            <p className="text-xs text-gray-400">{bookingCount} booking{bookingCount !== 1 ? "s" : ""}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Today's Schedule */}
            {todayAppts.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                        <h2 className="font-bold text-gray-900 text-lg">Today's Schedule</h2>
                        <span className="text-sm text-gray-400 font-medium">({todayAppts.length} appointment{todayAppts.length !== 1 ? "s" : ""})</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {todayAppts
                                    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
                                    .map(appt => (
                                        <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-900">{appt.customer_name}</td>
                                            <td className="px-6 py-4 text-gray-600">{serviceMap[appt.service_type_id]?.name ?? "—"}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {new Date(appt.start_time).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}
                                                {" – "}
                                                {new Date(appt.end_time).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{appt.customer_phone}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
