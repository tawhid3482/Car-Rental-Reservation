import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import { useGetUserPaymentQuery } from "../../../redux/features/payment/paymentApi";
import { TPayment } from "../../../types/payment";


const PaymentHistory = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetUserPaymentQuery(user?.email || "");
  const mockPayments = data?.data || [];
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <h2 className="text-4xl font-bold text-center text-[#A20023] mb-8">
        Payment History
      </h2>

      {mockPayments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No payment history found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md border border-[#A20023]">
            <thead>
              <tr className="bg-[#A20023] text-white text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment:TPayment) => (
                <tr key={payment._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{payment.userId.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {payment._id}
                  </td>
                  <td className="py-3 px-4">{payment.paymentMethod}</td>
                  <td className="py-3 px-4 text-[#3DEEB7] font-semibold">
                    ${payment.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${
                        payment.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(payment.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
