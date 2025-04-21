import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/ui/Layout/MainLayout";
import ErrorPage from "../pages/Error/Error";
import Home from "../pages/Home";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "/cars", element: <Cars /> },
      // { path: "/cars/:id", element: <CarDetails /> },
      // { path: "/reservation", element: <Reservation /> },
    ],
  },
  //     { path: "/login", element: <Login /> },
  //   { path: "/register", element: <Register /> },
]);

export default AppRouter;
