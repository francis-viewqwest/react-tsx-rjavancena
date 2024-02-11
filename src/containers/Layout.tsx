import React from "react";
import { useAuth } from "../app/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/user/navbar/components/Navbar";
import Home from "../pages/user/Home";
import Footer from "../components/user/footer/Components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  token: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar token={token} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
