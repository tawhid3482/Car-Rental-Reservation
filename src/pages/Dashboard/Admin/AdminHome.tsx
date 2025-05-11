/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAdminStatsQuery } from "../../../redux/features/admin/adminApi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { TUser } from "../../../redux/features/auth/authSlice";

// Registering chart components with Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const AdminHome = () => {
  // Fetching admin stats from API using redux query hook
  const { data, isLoading } = useGetAdminStatsQuery("");
  const info = data?.data || {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const lineChartData = {
    labels: info?.salesOverview ? Object.keys(info.salesOverview) : [],
    datasets: [
      {
        label: "Bookings per Day",
        data: info?.salesOverview ? Object.values(info.salesOverview) : [],
        fill: false,
        borderColor: "#3DEEB7",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
          callback: function (tickValue: string | number): string {
            return typeof tickValue === "number"
              ? tickValue.toLocaleString()
              : tickValue;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h4 className="text-gray-600 text-sm">Total Revenue</h4>
          <p className="text-2xl font-bold mt-2">${info?.totalRevenue || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h4 className="text-gray-600 text-sm">Total Booking</h4>
          <p className="text-2xl font-bold mt-2">{info?.totalBookings || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h4 className="text-gray-600 text-sm">Total Customers</h4>
          <p className="text-2xl font-bold mt-2">{info?.totalCustomers || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h4 className="text-gray-600 text-sm">Total Cars</h4>
          <p className="text-2xl font-bold mt-2">{info?.totalCars || 0}</p>
        </div>
      </div>

      {/* Booking Overview and Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow xl:col-span-2">
          <h4 className="text-lg font-semibold mb-4">Booking Overview</h4>
          <div className="h-64">
            {/* Booking Overview Chart */}
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
          <div className="h-64 flex flex-col justify-center text-gray-600 space-y-2">
            <p>Last 30 Days: {info?.bookingSummary?.last30Days || 0}</p>
            <p>Running Cars: {info?.bookingSummary?.running || 0}</p>
            <p>Returned Cars: {info?.bookingSummary?.return || 0}</p>
          </div>
        </div>
      </div>

      {/* Top Selling Products and New Customers */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="text-lg font-semibold mb-4">Top Booking Cars</h4>
          <div className="text-gray-600 space-y-2">
            {info?.topBookingCars?.length ? (
              info.topBookingCars.map(
                ({ car, count }: { car: any; count: any }) => (
                  <div key={car._id} className="border-b pb-2">
                    <div className="flex items-center gap-5">
                      <img src={car?.image[0]} alt="" className="w-12" />
                      <p className="font-semibold">{car?.name}</p>
                    </div>
                    <p className="text-sm">Booked: {count} times</p>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-400 text-center">Booking List</p>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="text-lg font-semibold mb-4">New Customers</h4>
          <div className="text-gray-600 space-y-2">
            {info?.newCustomers?.length ? (
              info.newCustomers.map((customer: TUser) => (
                <div
                  key={customer._id}
                  className="flex items-center gap-3 border-b pb-2"
                >
                  <img
                    src={customer.image}
                    alt={customer.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-sm">{customer.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">New Customers List</p>
            )}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h4 className="text-lg font-semibold mb-4">Activity Timeline</h4>
        <div className="text-gray-600 space-y-2">
          {info?.activityTimeline?.length ? (
            info.activityTimeline.map((item: any) => (
              <div key={item.bookingId} className="border-b pb-2">
                <p>
                  <strong>{item.car}</strong> booked on{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Timeline Events</p>
          )}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h4 className="text-lg font-semibold mb-4">Recent Booking</h4>
        <div className="text-gray-600 space-y-2">
          {info?.recentBookings?.length ? (
            info.recentBookings.map((order: any) => (
              <div key={order._id} className="border-b pb-2">
                <div className="flex items-center gap-5">
                  <img src={order?.car?.image[0]} alt="" className="w-12" />
                  <p className="font-semibold">{order.car?.name}</p>
                </div>
                <p className="text-sm">
                  Date: {order.date} | Cost: ${order.totalCost}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Orders Table</p>
          )}
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h4 className="text-lg font-semibold mb-4">Transactions History</h4>
        <div className="text-gray-600 space-y-2">
          {info?.transactionsHistory?.length ? (
            info.transactionsHistory.map((txn: any) => (
              <div key={txn._id} className="border-b pb-2">
                <p className="font-semibold">
                  {txn.paymentMethod.toUpperCase()} -{" "}
                  {txn.currency.toUpperCase()}
                </p>
                <p className="text-sm">Amount: ${txn.amount}</p>
                <p className="text-sm">
                  Date: {new Date(txn.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Transactions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
