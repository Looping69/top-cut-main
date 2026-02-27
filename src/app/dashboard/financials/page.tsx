"use client";
import React, { useEffect, useState, useCallback } from "react";
import { encoreFetch } from "@/lib/encore";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconLayoutDashboard,
    IconReceipt2,
    IconFileInvoice,
    IconFileText,
    IconCoin,
    IconPlus,
    IconX,
    IconCheck,
    IconSearch,
    IconRefresh,
    IconChevronRight,
    IconTrendingUp,
    IconTrendingDown,
    IconAlertTriangle,
    IconFileCheck,
    IconTrash,
    IconEdit,
    IconArrowRight,
    IconCurrencyDollar,
    IconClock,
} from "@tabler/icons-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface LineItem { description: string; qty: number; unit_price_cents: number; }

interface Invoice {
    id: number; invoice_number: string; customer_name: string; customer_email: string;
    customer_address?: string; line_items: LineItem[]; subtotal_cents: number;
    tax_rate_percent: number; total_cents: number; status: string;
    due_date?: string; notes?: string; created_at: string;
}

interface Quotation {
    id: number; quote_number: string; customer_name: string; customer_email: string;
    customer_address?: string; line_items: LineItem[]; subtotal_cents: number;
    tax_rate_percent: number; total_cents: number; status: string;
    valid_until?: string; notes?: string; converted_invoice_id?: number; created_at: string;
}

interface ShopOrder {
    id: number; customer_name: string; customer_email: string;
    total_amount_cents: number; status: string; created_at: string;
    items?: { id: number; product_id: number; quantity: number; price_cents: number; product_name?: string; }[];
}

interface Expense {
    id: number; category: string; description: string;
    amount_cents: number; date: string; created_at: string;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmtR = (c: number) => `R ${(c / 100).toLocaleString("en-ZA", { minimumFractionDigits: 0 })}`;
const fmtDate = (d?: string) => d ? new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "—";

function statusBadge(s: string) {
    const map: Record<string, string> = {
        paid: "bg-green-100 text-green-700", sent: "bg-blue-100 text-blue-700",
        accepted: "bg-emerald-100 text-emerald-700", delivered: "bg-teal-100 text-teal-700",
        overdue: "bg-red-100 text-red-700", cancelled: "bg-gray-200 text-gray-600",
        refunded: "bg-orange-100 text-orange-700", declined: "bg-red-100 text-red-700",
        expired: "bg-orange-100 text-orange-700", converted: "bg-purple-100 text-purple-700",
        shipped: "bg-blue-100 text-blue-700", pending: "bg-yellow-100 text-yellow-700",
    };
    return map[s] ?? "bg-gray-100 text-gray-600";
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
function KpiCard({ icon: Icon, label, value, sub, color, loading }: {
    icon: React.ElementType; label: string; value: string | number; sub?: string; color: string; loading?: boolean;
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={20} className="text-white" />
            </div>
            <div className="min-w-0">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{label}</p>
                {loading ? <div className="h-7 w-20 bg-gray-100 animate-pulse rounded mt-1" /> : (
                    <p className="text-2xl font-black text-gray-900 mt-0.5 tabular-nums">{value}</p>
                )}
                {sub && !loading && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

// ─── DOCUMENT MODAL (Invoice & Quotation) ─────────────────────────────────────
type DocType = "invoice" | "quotation";
const EMPTY_LINE: LineItem = { description: "", qty: 1, unit_price_cents: 0 };

function DocModal({ type, doc, onClose, onSave, onConvert, onStatusChange }: {
    type: DocType;
    doc: Invoice | Quotation | null;
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
    onConvert?: (id: number) => Promise<void>;
    onStatusChange?: (id: number, status: string) => Promise<void>;
}) {
    const isInvoice = type === "invoice";
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        customer_name: doc?.customer_name ?? "",
        customer_email: doc?.customer_email ?? "",
        customer_address: doc?.customer_address ?? "",
        tax_rate_percent: doc?.tax_rate_percent ?? 15,
        due_date: (doc as Invoice)?.due_date ?? "",
        valid_until: (doc as Quotation)?.valid_until ?? "",
        notes: doc?.notes ?? "",
    });
    const [items, setItems] = useState<LineItem[]>(doc?.line_items?.length ? doc.line_items : [{ ...EMPTY_LINE }]);

    const subtotal = items.reduce((s, li) => s + li.qty * li.unit_price_cents, 0);
    const tax = Math.round(subtotal * (form.tax_rate_percent / 100));
    const total = subtotal + tax;

    const setItem = (i: number, field: keyof LineItem, val: string | number) =>
        setItems(prev => prev.map((it, idx) => idx === i ? { ...it, [field]: field === "description" ? val : Number(val) } : it));

    const submit = async () => {
        setSaving(true);
        try {
            await onSave({
                ...form,
                line_items: items,
                ...(doc ? { id: doc.id } : {}),
            });
        } finally { setSaving(false); }
    };

    const invoiceStatuses = ["draft", "sent", "paid", "overdue", "cancelled"];
    const quoteStatuses = ["draft", "sent", "accepted", "declined", "expired"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
            <motion.div initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 16 }}
                className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
                    <div>
                        <h2 className="font-black text-lg text-gray-900">
                            {doc ? `Edit ${isInvoice ? (doc as Invoice).invoice_number : (doc as Quotation).quote_number}`
                                : `New ${isInvoice ? "Invoice" : "Quotation"}`}
                        </h2>
                        {doc && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusBadge(doc.status)}`}>{doc.status}</span>}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-700 transition-colors">
                        <IconX size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                    {/* Customer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: "Customer Name", field: "customer_name", type: "text" },
                            { label: "Email", field: "customer_email", type: "email" },
                        ].map(({ label, field, type }) => (
                            <div key={field}>
                                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">{label}</label>
                                <input type={type} value={(form as any)[field]}
                                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" />
                            </div>
                        ))}
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Address</label>
                            <input type="text" value={form.customer_address}
                                onChange={e => setForm(f => ({ ...f, customer_address: e.target.value }))}
                                placeholder="Optional billing address"
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" />
                        </div>
                    </div>

                    {/* Line Items */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Line Items</label>
                            <button onClick={() => setItems(i => [...i, { ...EMPTY_LINE }])}
                                className="flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:underline">
                                <IconPlus size={14} /> Add row
                            </button>
                        </div>
                        <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                            <div className="grid grid-cols-12 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                <span className="col-span-6">Description</span>
                                <span className="col-span-2 text-center">Qty</span>
                                <span className="col-span-3 text-right">Unit Price</span>
                                <span className="col-span-1" />
                            </div>
                            {items.map((li, i) => (
                                <div key={i} className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-gray-100 last:border-0 items-center">
                                    <input className="col-span-6 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                                        placeholder="Service description" value={li.description}
                                        onChange={e => setItem(i, "description", e.target.value)} />
                                    <input type="number" min={1} className="col-span-2 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-center focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                                        value={li.qty} onChange={e => setItem(i, "qty", e.target.value)} />
                                    <input type="number" min={0} className="col-span-3 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-right focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                                        placeholder="cents" value={li.unit_price_cents}
                                        onChange={e => setItem(i, "unit_price_cents", e.target.value)} />
                                    <button onClick={() => setItems(items.filter((_, idx) => idx !== i))}
                                        className="col-span-1 flex justify-center text-gray-300 hover:text-red-400 transition-colors">
                                        <IconX size={16} />
                                    </button>
                                </div>
                            ))}
                            <div className="px-4 py-3 bg-white border-t-2 border-dashed border-gray-200 text-sm text-right space-y-0.5">
                                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{fmtR(subtotal)}</span></div>
                                <div className="flex justify-between text-gray-500 items-center gap-2">
                                    <span>VAT <input type="number" value={form.tax_rate_percent} onChange={e => setForm(f => ({ ...f, tax_rate_percent: Number(e.target.value) }))}
                                        className="w-12 text-center border border-gray-200 rounded px-1 text-xs" />%</span>
                                    <span>{fmtR(tax)}</span>
                                </div>
                                <div className="flex justify-between font-black text-gray-900 text-base pt-1 border-t border-gray-100 mt-1">
                                    <span>Total</span><span>{fmtR(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dates & Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                                {isInvoice ? "Due Date" : "Valid Until"}
                            </label>
                            <input type="date"
                                value={isInvoice ? form.due_date : form.valid_until}
                                onChange={e => setForm(f => isInvoice ? { ...f, due_date: e.target.value } : { ...f, valid_until: e.target.value })}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Notes</label>
                            <input type="text" value={form.notes}
                                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                                placeholder="Optional internal note"
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" />
                        </div>
                    </div>

                    {/* Status change (edit mode only) */}
                    {doc && onStatusChange && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Change Status</label>
                            <div className="flex flex-wrap gap-2">
                                {(isInvoice ? invoiceStatuses : quoteStatuses).map(s => (
                                    <button key={s} onClick={() => onStatusChange(doc.id, s)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize border transition-all
                                            ${doc.status === s ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
                                        {doc.status === s && <IconCheck size={12} className="inline mr-1" />}{s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl flex items-center justify-between gap-3">
                    <div className="flex gap-2">
                        {!isInvoice && doc && doc.status !== "converted" && onConvert && (
                            <button onClick={() => onConvert(doc.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-colors">
                                <IconArrowRight size={16} /> Convert to Invoice
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2 ml-auto">
                        <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button onClick={submit} disabled={saving}
                            className="px-5 py-2 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2">
                            {saving && <IconRefresh size={14} className="animate-spin" />}
                            {doc ? "Save Changes" : `Create ${isInvoice ? "Invoice" : "Quotation"}`}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// ─── DOCUMENT TABLE ───────────────────────────────────────────────────────────
function DocTable<T extends Invoice | Quotation>({ items, type, onOpen, loading }: {
    items: T[];
    type: DocType;
    onOpen: (doc: T) => void;
    loading: boolean;
}) {
    const isInvoice = type === "invoice";
    const num = (d: T) => isInvoice ? (d as Invoice).invoice_number : (d as Quotation).quote_number;
    const exp = (d: T) => isInvoice ? (d as Invoice).due_date : (d as Quotation).valid_until;

    if (loading) return (
        <div className="p-12 text-center text-gray-400 animate-pulse">
            <IconRefresh size={36} className="mx-auto mb-3 opacity-30 animate-spin" />
            <p>Loading…</p>
        </div>
    );
    if (!items.length) return (
        <div className="p-16 text-center text-gray-400">
            <IconFileText size={48} className="mx-auto mb-3 opacity-20" />
            <p className="font-medium">No {isInvoice ? "invoices" : "quotations"} yet.</p>
        </div>
    );

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">{isInvoice ? "Due" : "Valid Until"}</th>
                        <th className="px-6 py-3">Total</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {items.map(d => (
                        <tr key={d.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="px-6 py-3.5 font-bold text-gray-700">{num(d)}</td>
                            <td className="px-6 py-3.5">
                                <p className="font-medium text-gray-900">{d.customer_name}</p>
                                <p className="text-gray-400 text-xs">{d.customer_email}</p>
                            </td>
                            <td className="px-6 py-3.5 text-gray-500">{fmtDate(d.created_at)}</td>
                            <td className="px-6 py-3.5 text-gray-500">{fmtDate(exp(d))}</td>
                            <td className="px-6 py-3.5 font-black text-gray-900">{fmtR(d.total_cents)}</td>
                            <td className="px-6 py-3.5">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusBadge(d.status)}`}>{d.status}</span>
                            </td>
                            <td className="px-6 py-3.5 text-right">
                                <button onClick={() => onOpen(d)} className="inline-flex items-center gap-1 text-[var(--primary)] font-bold hover:underline text-sm">
                                    <IconEdit size={14} /> Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── EXPENSES TAB ─────────────────────────────────────────────────────────────
const EXPENSE_CATS = ["fuel", "labour", "equipment", "marketing", "office", "other"];
const expCatColor: Record<string, string> = {
    fuel: "bg-orange-100 text-orange-700", labour: "bg-blue-100 text-blue-700",
    equipment: "bg-indigo-100 text-indigo-700", marketing: "bg-pink-100 text-pink-700",
    office: "bg-gray-100 text-gray-600", other: "bg-yellow-100 text-yellow-700",
};

function ExpensesTab({ expenses, loading, onAdd, onDelete }: {
    expenses: Expense[]; loading: boolean;
    onAdd: (e: Omit<Expense, "id" | "created_at">) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}) {
    const [form, setForm] = useState({ category: "fuel", description: "", amount_cents: 0, date: new Date().toISOString().slice(0, 10) });
    const [saving, setSaving] = useState(false);

    const submit = async () => {
        if (!form.description || form.amount_cents <= 0) return;
        setSaving(true);
        try { await onAdd(form); setForm(f => ({ ...f, description: "", amount_cents: 0 })); }
        finally { setSaving(false); }
    };

    const totalExpenses = expenses.reduce((s, e) => s + e.amount_cents, 0);

    return (
        <div className="space-y-6">
            {/* Quick add */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Log New Expense</p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] capitalize">
                        {EXPENSE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input type="text" placeholder="Description" value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        className="sm:col-span-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">R</span>
                        <input type="number" min={0} placeholder="Amount (cents)" value={form.amount_cents || ""}
                            onChange={e => setForm(f => ({ ...f, amount_cents: Number(e.target.value) }))}
                            className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                    </div>
                    <div className="flex gap-2">
                        <input type="date" value={form.date}
                            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                        <button onClick={submit} disabled={saving}
                            className="px-4 py-2.5 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50">
                            {saving ? <IconRefresh size={16} className="animate-spin" /> : <IconPlus size={16} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <IconTrendingDown size={20} className="text-red-500" />
                    <p className="font-semibold text-red-800">Total Expenses Logged</p>
                </div>
                <p className="text-xl font-black text-red-700">{fmtR(totalExpenses)}</p>
            </div>

            {/* Table */}
            {loading ? (
                <div className="p-12 text-center text-gray-400 animate-pulse">
                    <IconRefresh size={32} className="mx-auto mb-3 opacity-30 animate-spin" />
                </div>
            ) : !expenses.length ? (
                <div className="p-16 text-center text-gray-400">
                    <IconCoin size={48} className="mx-auto mb-3 opacity-20" />
                    <p className="font-medium">No expenses logged yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                                <th className="px-6 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {expenses.map(e => (
                                <tr key={e.id} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${expCatColor[e.category] ?? expCatColor.other}`}>{e.category}</span>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-800">{e.description}</td>
                                    <td className="px-6 py-3.5 text-gray-500">{fmtDate(e.date)}</td>
                                    <td className="px-6 py-3.5 text-right font-bold text-gray-900">{fmtR(e.amount_cents)}</td>
                                    <td className="px-6 py-3.5 text-center">
                                        <button onClick={() => onDelete(e.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors">
                                            <IconTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// ─── ORDERS TAB ───────────────────────────────────────────────────────────────
function OrdersTab({ orders, loading }: { orders: ShopOrder[]; loading: boolean }) {
    const [selected, setSelected] = useState<ShopOrder | null>(null);
    const [search, setSearch] = useState("");

    const filtered = orders.filter(o =>
        o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        o.customer_email.toLowerCase().includes(search.toLowerCase()) ||
        String(o.id).includes(search)
    );

    return (
        <div className="space-y-4">
            <div className="relative max-w-md">
                <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search orders…" value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400 animate-pulse">
                        <IconRefresh size={32} className="mx-auto mb-3 opacity-30 animate-spin" /></div>
                ) : !filtered.length ? (
                    <div className="p-16 text-center text-gray-400">
                        <IconReceipt2 size={48} className="mx-auto mb-3 opacity-20" />
                        <p>No orders found.</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
                                <th className="px-6 py-3">Order</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(o => (
                                <tr key={o.id} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="px-6 py-3.5 font-bold text-gray-700">#{String(o.id).padStart(4, "0")}</td>
                                    <td className="px-6 py-3.5">
                                        <p className="font-medium text-gray-900">{o.customer_name}</p>
                                        <p className="text-gray-400 text-xs">{o.customer_email}</p>
                                    </td>
                                    <td className="px-6 py-3.5 text-gray-500">{fmtDate(o.created_at)}</td>
                                    <td className="px-6 py-3.5 font-black text-gray-900">{fmtR(o.total_amount_cents)}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusBadge(o.status)}`}>{o.status}</span>
                                    </td>
                                    <td className="px-6 py-3.5 text-right">
                                        <button onClick={() => setSelected(o)} className="inline-flex items-center gap-1 text-[var(--primary)] font-bold hover:underline text-sm">
                                            View <IconChevronRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <AnimatePresence>
                {selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97, y: 16 }}
                            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="font-black text-lg">Order #{String(selected.id).padStart(4, "0")}</h2>
                                <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><IconX size={20} /></button>
                            </div>
                            <div className="p-6 overflow-y-auto">
                                <p className="text-sm text-gray-500 mb-4">{selected.customer_name} · {selected.customer_email}</p>
                                <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100 text-sm overflow-hidden">
                                    {selected.items?.map(it => (
                                        <div key={it.id} className="px-4 py-3 flex justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{it.product_name ?? `Product #${it.product_id}`}</p>
                                                <p className="text-gray-400">Qty: {it.quantity}</p>
                                            </div>
                                            <p className="font-bold text-gray-900">{fmtR(it.price_cents * it.quantity)}</p>
                                        </div>
                                    )) ?? <div className="px-4 py-3 text-gray-400 italic">No item details loaded.</div>}
                                    <div className="px-4 py-3 bg-white flex justify-between font-black text-base">
                                        <span>Total</span><span>{fmtR(selected.total_amount_cents)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
type TabId = "overview" | "orders" | "invoices" | "quotations" | "expenses";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: IconLayoutDashboard },
    { id: "invoices", label: "Invoices", icon: IconFileInvoice },
    { id: "quotations", label: "Quotations", icon: IconFileText },
    { id: "orders", label: "Orders", icon: IconReceipt2 },
    { id: "expenses", label: "Expenses", icon: IconCoin },
];

export default function FinancialsPage() {
    const [tab, setTab] = useState<TabId>("overview");

    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [orders, setOrders] = useState<ShopOrder[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const [loadingInv, setLoadingInv] = useState(true);
    const [loadingQuot, setLoadingQuot] = useState(true);
    const [loadingOrd, setLoadingOrd] = useState(true);
    const [loadingExp, setLoadingExp] = useState(true);

    const [docModal, setDocModal] = useState<{ type: DocType; doc: Invoice | Quotation | null } | null>(null);

    // ── Fetch all ──────────────────────────────────────────────────────────
    const fetchAll = useCallback(async () => {
        setLoadingInv(true); setLoadingQuot(true); setLoadingOrd(true); setLoadingExp(true);
        await Promise.allSettled([
            encoreFetch("/invoices").then(r => { setInvoices(r.invoices ?? []); setLoadingInv(false); }).catch(() => setLoadingInv(false)),
            encoreFetch("/quotations").then(r => { setQuotations(r.quotations ?? []); setLoadingQuot(false); }).catch(() => setLoadingQuot(false)),
            encoreFetch("/orders").then(r => { setOrders(r.orders ?? []); setLoadingOrd(false); }).catch(() => setLoadingOrd(false)),
            encoreFetch("/expenses").then(r => { setExpenses(r.expenses ?? []); setLoadingExp(false); }).catch(() => setLoadingExp(false)),
        ]);
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    // ── Invoice actions ────────────────────────────────────────────────────
    const saveInvoice = async (data: any) => {
        if (data.id) {
            const updated = await encoreFetch(`/invoices/${data.id}`, { method: "PUT", body: JSON.stringify(data) });
            setInvoices(prev => prev.map(i => i.id === data.id ? updated : i));
        } else {
            const created = await encoreFetch("/invoices", { method: "POST", body: JSON.stringify(data) });
            setInvoices(prev => [created, ...prev]);
        }
        setDocModal(null);
    };

    const changeInvoiceStatus = async (id: number, status: string) => {
        const updated = await encoreFetch(`/invoices/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
        setInvoices(prev => prev.map(i => i.id === id ? updated : i));
        setDocModal(d => d ? { ...d, doc: updated } : null);
    };

    // ── Quotation actions ──────────────────────────────────────────────────
    const saveQuotation = async (data: any) => {
        if (data.id) {
            const updated = await encoreFetch(`/quotations/${data.id}`, { method: "PUT", body: JSON.stringify(data) });
            setQuotations(prev => prev.map(q => q.id === data.id ? updated : q));
        } else {
            const created = await encoreFetch("/quotations", { method: "POST", body: JSON.stringify(data) });
            setQuotations(prev => [created, ...prev]);
        }
        setDocModal(null);
    };

    const changeQuotStatus = async (id: number, status: string) => {
        const updated = await encoreFetch(`/quotations/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
        setQuotations(prev => prev.map(q => q.id === id ? updated : q));
        setDocModal(d => d ? { ...d, doc: updated } : null);
    };

    const convertToInvoice = async (id: number) => {
        const newInvoice = await encoreFetch(`/quotations/${id}/convert`, { method: "POST" });
        setInvoices(prev => [newInvoice, ...prev]);
        setQuotations(prev => prev.map(q => q.id === id ? { ...q, status: "converted", converted_invoice_id: newInvoice.id } : q));
        setDocModal(null);
        setTab("invoices");
    };

    // ── Expense actions ────────────────────────────────────────────────────
    const addExpense = async (data: any) => {
        const created = await encoreFetch("/expenses", { method: "POST", body: JSON.stringify(data) });
        setExpenses(prev => [created, ...prev]);
    };

    const deleteExpense = async (id: number) => {
        await encoreFetch(`/expenses/${id}`, { method: "DELETE" });
        setExpenses(prev => prev.filter(e => e.id !== id));
    };

    // ── Revenue maths ──────────────────────────────────────────────────────
    const invoiceRevenue = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.total_cents, 0);
    const ordersRevenue = orders.filter(o => ["paid", "shipped", "delivered"].includes(o.status)).reduce((s, o) => s + o.total_amount_cents, 0);
    const totalRevenue = invoiceRevenue + ordersRevenue;
    const totalExpenses = expenses.reduce((s, e) => s + e.amount_cents, 0);
    const netProfit = totalRevenue - totalExpenses;
    const overdueInvs = invoices.filter(i => i.status === "overdue");
    const pendingQuots = quotations.filter(q => q.status === "sent");

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Financial Hub</h1>
                    <p className="text-gray-500 mt-0.5 text-sm">Invoices · Quotations · Orders · Expenses</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchAll} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 font-medium text-sm transition-colors">
                        <IconRefresh size={16} /> Refresh
                    </button>
                    {tab === "invoices" && (
                        <button onClick={() => setDocModal({ type: "invoice", doc: null })}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl font-bold text-sm transition-all shadow-sm">
                            <IconPlus size={16} /> New Invoice
                        </button>
                    )}
                    {tab === "quotations" && (
                        <button onClick={() => setDocModal({ type: "quotation", doc: null })}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl font-bold text-sm transition-all shadow-sm">
                            <IconPlus size={16} /> New Quote
                        </button>
                    )}
                </div>
            </div>

            {/* Tab bar */}
            <div className="flex gap-1 bg-gray-100 rounded-2xl p-1.5 overflow-x-auto">
                {TABS.map(t => {
                    const Icon = t.icon;
                    return (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex-1 justify-center
                                ${tab === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                            <Icon size={16} /> {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>

                    {/* OVERVIEW */}
                    {tab === "overview" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <KpiCard icon={IconTrendingUp} label="Total Revenue" value={fmtR(totalRevenue)} sub="paid invoices + shop orders" color="bg-green-500" loading={loadingInv || loadingOrd} />
                                <KpiCard icon={IconTrendingDown} label="Total Expenses" value={fmtR(totalExpenses)} sub="all logged expenses" color="bg-red-400" loading={loadingExp} />
                                <KpiCard icon={netProfit >= 0 ? IconCurrencyDollar : IconTrendingDown}
                                    label="Net Profit" value={fmtR(Math.abs(netProfit))} sub={netProfit >= 0 ? "in the black 🟢" : "running deficit 🔴"} color={netProfit >= 0 ? "bg-[var(--primary)]" : "bg-orange-500"} loading={loadingInv || loadingOrd || loadingExp} />
                                <KpiCard icon={IconClock} label="Pending Quotes" value={pendingQuots.length} sub="awaiting client decision" color="bg-blue-500" loading={loadingQuot} />
                            </div>

                            {/* Overdue invoices alert */}
                            {overdueInvs.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center gap-3">
                                    <IconAlertTriangle size={20} className="text-red-500 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-bold text-red-800">{overdueInvs.length} overdue invoice{overdueInvs.length > 1 ? "s" : ""}</p>
                                        <p className="text-sm text-red-600">{overdueInvs.map(i => i.invoice_number).join(", ")} — {fmtR(overdueInvs.reduce((s, i) => s + i.total_cents, 0))} outstanding</p>
                                    </div>
                                    <button onClick={() => setTab("invoices")} className="text-red-600 font-bold text-sm hover:underline flex items-center gap-1">
                                        View <IconArrowRight size={14} />
                                    </button>
                                </div>
                            )}

                            {/* Summary cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Invoice Summary</p>
                                    {[{ status: "paid", label: "Paid" }, { status: "sent", label: "Sent / Awaiting" }, { status: "overdue", label: "Overdue" }, { status: "draft", label: "Drafts" }]
                                        .map(({ status, label }) => {
                                            const group = invoices.filter(i => i.status === status);
                                            return (
                                                <div key={status} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-sm">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusBadge(status)}`}>{label}</span>
                                                    <span className="font-bold text-gray-800">{fmtR(group.reduce((s, i) => s + i.total_cents, 0))} ({group.length})</span>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Expenses by Category</p>
                                    {EXPENSE_CATS.map(cat => {
                                        const total = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount_cents, 0);
                                        if (!total) return null;
                                        return (
                                            <div key={cat} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-sm">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${expCatColor[cat]}`}>{cat}</span>
                                                <span className="font-bold text-gray-800">{fmtR(total)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quotation Pipeline</p>
                                    {[{ status: "draft", label: "Drafts" }, { status: "sent", label: "Sent" }, { status: "accepted", label: "Accepted" }, { status: "converted", label: "Converted" }, { status: "declined", label: "Declined" }]
                                        .map(({ status, label }) => {
                                            const group = quotations.filter(q => q.status === status);
                                            if (!group.length) return null;
                                            return (
                                                <div key={status} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-sm">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusBadge(status)}`}>{label}</span>
                                                    <span className="font-bold text-gray-800">{fmtR(group.reduce((s, q) => s + q.total_cents, 0))} ({group.length})</span>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INVOICES */}
                    {tab === "invoices" && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <DocTable items={invoices} type="invoice" loading={loadingInv}
                                onOpen={doc => setDocModal({ type: "invoice", doc })} />
                        </div>
                    )}

                    {/* QUOTATIONS */}
                    {tab === "quotations" && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <DocTable items={quotations} type="quotation" loading={loadingQuot}
                                onOpen={doc => setDocModal({ type: "quotation", doc })} />
                        </div>
                    )}

                    {/* ORDERS */}
                    {tab === "orders" && <OrdersTab orders={orders} loading={loadingOrd} />}

                    {/* EXPENSES */}
                    {tab === "expenses" && (
                        <ExpensesTab expenses={expenses} loading={loadingExp}
                            onAdd={addExpense} onDelete={deleteExpense} />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Document Modal (Invoice / Quotation) */}
            <AnimatePresence>
                {docModal && (
                    <DocModal
                        type={docModal.type}
                        doc={docModal.doc}
                        onClose={() => setDocModal(null)}
                        onSave={docModal.type === "invoice" ? saveInvoice : saveQuotation}
                        onConvert={docModal.type === "quotation" ? convertToInvoice : undefined}
                        onStatusChange={docModal.type === "invoice" ? changeInvoiceStatus : changeQuotStatus}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
