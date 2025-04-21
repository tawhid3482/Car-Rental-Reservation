import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <main className="min-h-screen px-4 py-6">
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
