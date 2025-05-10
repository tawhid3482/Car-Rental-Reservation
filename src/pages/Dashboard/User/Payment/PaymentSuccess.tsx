import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect") || "/dashboard/payment-history";
    navigate(redirect);
  }, [location, navigate]);

  return <p>Redirecting...</p>;
};

export default PaymentSuccess;
