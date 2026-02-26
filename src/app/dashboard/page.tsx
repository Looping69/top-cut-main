export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Active Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">8</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Revenue (MoM)</p>
                    <p className="text-3xl font-bold text-gray-900">R 4,500</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Activity</h2>
                <p className="text-gray-600 italic">No recent activity found. Start managing your shop or bookings!</p>
            </div>
        </div>
    );
}
