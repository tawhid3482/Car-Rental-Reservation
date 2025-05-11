import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/ui/Layout/MainLayout";
import ErrorPage from "../pages/Error/Error";
import Home from "../pages/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Booking from "../pages/Booking/Booking";
import CarDetails from "../pages/Cars/CarDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Dashboard/User/Profile";
import UpdateProfile from "../pages/Dashboard/User/UpdateProfile";
import HomeForUser from "../pages/Dashboard/User/HomeForUser";
import MyBooking from "../pages/Dashboard/User/MyBooking";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import Messaging from "../pages/Dashboard/User/Messaging";
import AdminMessage from "../pages/Dashboard/Admin/AdminMessage";
import Tes from "../pages/Dashboard/User/tes";
import Payment from "../pages/Dashboard/User/Payment/Payment";
import Paypal from "../pages/Dashboard/User/Payment/Paypal";
import SSLCommerz from "../pages/Dashboard/User/Payment/SSLCommerz";
import StripeWrapper from "../pages/Dashboard/User/Payment/StripeWrapper";
import PaymentSuccess from "../pages/Dashboard/User/Payment/PaymentSuccess";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import AllBooking from "../pages/Dashboard/Admin/AllBooking";
import AddCar from "../pages/Dashboard/Admin/AddCar";
import ManageCars from "../pages/Dashboard/Admin/ManageCars";
import UpdateCar from "../pages/Dashboard/Admin/UpdateCar";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/booking", element: <Booking /> },
      { path: "/cars/:id", element: <CarDetails /> },
      { path: "/booking/cars/:id", element: <CarDetails /> },
      { path: "/success-payment", element: <PaymentSuccess /> },

      // { path: "/reservation", element: <Reservation /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/dashboard/home", element: <HomeForUser /> },
      { path: "/dashboard/profile", element: <Profile /> },
      { path: "/dashboard/updateProfile", element: <UpdateProfile /> },
      { path: "/dashboard/my-booking", element: <MyBooking /> },
      { path: "/dashboard/payment-history", element: <PaymentHistory /> },
      { path: "/dashboard/messaging", element: <Messaging /> },
      { path: "/dashboard/admin-messaging", element: <AdminMessage /> },
      { path: "/dashboard/payment/:id", element: <Payment /> },
      { path: "/dashboard/payment/paypal", element: <Paypal /> },
      { path: "/dashboard/payment/stripe", element: <StripeWrapper /> },
      { path: "/dashboard/payment/sslCommerz", element: <SSLCommerz /> },
      { path: "/dashboard/admin-home", element: <AdminHome /> },
      { path: "/dashboard/all-booking", element: <AllBooking /> },
      { path: "/dashboard/add-cars", element: <AddCar /> },
      { path: "/dashboard/manage-cars", element: <ManageCars /> },
      { path: "/dashboard/manage-cars/update/:id", element: <UpdateCar /> },
    ],
  },
  { path: "/test", element: <Tes /> },
]);

export default AppRouter;
