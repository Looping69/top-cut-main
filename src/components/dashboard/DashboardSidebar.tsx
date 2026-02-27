"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    IconLayoutDashboard,
    IconShoppingCart,
    IconCalendarEvent,
    IconSettings,
    IconArrowLeft,
    IconX,
    IconLogout,
    IconReceipt2
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const menuItems = [
        { href: "/dashboard", label: "Overview", icon: IconLayoutDashboard },
        { href: "/dashboard/shop", label: "Shop Manager", icon: IconShoppingCart },
        { href: "/dashboard/bookings", label: "Appointments", icon: IconCalendarEvent },
        { href: "/dashboard/financials", label: "Financials & Orders", icon: IconReceipt2 },
    ];

    const sidebarContent = (
        <div className="flex flex-col h-full">
            <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center font-bold text-xl">
                        TC
                    </div>
                    <span className="font-bold text-xl tracking-tight">Admin Dash</span>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <IconX size={24} />
                </button>
            </div>

            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => onClose()}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                                ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}

                <div className="pt-10 border-t border-gray-800 mt-10 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                    >
                        <IconArrowLeft size={20} />
                        <span>Back to Website</span>
                    </Link>

                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 transition-colors text-red-400 hover:text-red-300"
                    >
                        <IconLogout size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </div >
    );

    return (
        <>
            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 bg-gray-900 text-white p-6 z-[70] lg:hidden shadow-2xl"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 bg-gray-900 text-white min-h-screen p-6 border-r border-gray-800">
                {sidebarContent}
            </aside>
        </>
    );
}
