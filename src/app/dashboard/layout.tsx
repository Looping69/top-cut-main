"use client";
import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { IconMenu2 } from "@tabler/icons-react";
import { ProtectedRoute } from "@/lib/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-50">
                {/* Mobile Header */}
                <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-6 z-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[var(--accent)] rounded flex items-center justify-center font-bold">
                            TC
                        </div>
                        <span className="font-bold tracking-tight">Admin</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <IconMenu2 size={24} />
                    </button>
                </header>

                <DashboardSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="flex-1 lg:pl-0 pt-16 lg:pt-0 overflow-y-auto">
                    <div className="p-4 md:p-10 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
