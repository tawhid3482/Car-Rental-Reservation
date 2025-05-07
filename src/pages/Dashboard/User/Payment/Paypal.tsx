
const Paypal = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-[#3DEEB7] mb-6">
          Pay with PayPal
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Use PayPal for secure and fast payments. Click the button below to
          proceed.
        </p>
        <div className="flex justify-center mb-6">
          <button
            className="bg-[#3DEEB7] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#33c493] transition duration-300"
            onClick={() => alert("Proceeding to PayPal...")}
          >
            Pay Now
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a3/PayPal_logo_2014.png"
            alt="PayPal"
            className="w-28 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Paypal;
