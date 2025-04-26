const AdminHome = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h4 className="text-gray-600 text-sm">Total Revenue</h4>
                    <p className="text-2xl font-bold mt-2">$25,890</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h4 className="text-gray-600 text-sm">Total Orders</h4>
                    <p className="text-2xl font-bold mt-2">20,705</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h4 className="text-gray-600 text-sm">Total Customers</h4>
                    <p className="text-2xl font-bold mt-2">84,127</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow">
                    <h4 className="text-gray-600 text-sm">Total Sales</h4>
                    <p className="text-2xl font-bold mt-2">9,586</p>
                </div>
            </div>

            {/* Graph Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow xl:col-span-2">
                    <h4 className="text-lg font-semibold mb-4">Sales Overview</h4>
                    {/* Sales Chart (Placeholder) */}
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        Sales Chart
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
                    {/* Pie Chart (Placeholder) */}
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        Pie Chart
                    </div>
                </div>
            </div>

            {/* Top Selling Products and New Customers */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h4 className="text-lg font-semibold mb-4">Top Selling Products</h4>
                    {/* Products List (Placeholder) */}
                    <div className="text-gray-400 text-center">
                        Products List
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h4 className="text-lg font-semibold mb-4">New Customers</h4>
                    {/* New Customers List (Placeholder) */}
                    <div className="text-gray-400 text-center">
                        New Customers List
                    </div>
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h4 className="text-lg font-semibold mb-4">Activity Timeline</h4>
                {/* Timeline (Placeholder) */}
                <div className="text-gray-400 text-center">
                    Timeline Events
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h4 className="text-lg font-semibold mb-4">Recent Orders</h4>
                {/* Orders Table (Placeholder) */}
                <div className="text-gray-400 text-center">
                    Orders Table
                </div>
            </div>

            {/* Transactions History */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h4 className="text-lg font-semibold mb-4">Transactions History</h4>
                {/* Transactions List (Placeholder) */}
                <div className="text-gray-400 text-center">
                    Transactions
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
