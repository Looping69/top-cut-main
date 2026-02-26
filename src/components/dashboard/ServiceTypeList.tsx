"use client";
import React from "react";
import { IconEdit, IconTrash, IconClock, IconCurrencyDollar } from "@tabler/icons-react";

interface ServiceType {
    id: number;
    name: string;
    duration_minutes: number;
    price_cents: number;
}

interface ServiceTypeListProps {
    serviceTypes: ServiceType[];
    onEdit: (service: ServiceType) => void;
    onDelete: (id: number) => void;
}

export function ServiceTypeList({ serviceTypes, onEdit, onDelete }: ServiceTypeListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {serviceTypes.map((service) => (
                <div key={service.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(service)}
                                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                title="Edit"
                            >
                                <IconEdit size={18} />
                            </button>
                            <button
                                onClick={() => onDelete(service.id)}
                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <IconTrash size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <IconClock size={16} className="text-gray-400" />
                            <span>{service.duration_minutes} minutes</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <IconCurrencyDollar size={16} className="text-gray-400" />
                            <span>{(service.price_cents / 100).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Service #ST-{service.id}</span>
                    </div>
                </div>
            ))}

            {serviceTypes.length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-500 space-y-2">
                    <p className="font-medium text-lg">No services found</p>
                    <p className="text-sm">Create your first service to start accepting bookings.</p>
                </div>
            )}
        </div>
    );
}
