
const SSLCommerz = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-[#A20023] mb-6">
          SSLCommerz Payment
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Secure your payment with SSLCommerz. Click the button below to proceed with payment.
        </p>
        <div className="flex justify-center mb-6">
          <button
            className="bg-[#A20023] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#8e001f] transition duration-300"
            onClick={() => alert("Proceeding to SSLCommerz...")}
          >
            Pay Now
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src="https://sslcommerz.com/assets/img/logo.svg"
            alt="SSLCommerz"
            className="w-28 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default SSLCommerz;
