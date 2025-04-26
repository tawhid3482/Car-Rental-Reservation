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
      { path: "/dashboard/updateProfile", element: <UpdateProfile /> }
    
    ],
  },
]);

export default AppRouter;
