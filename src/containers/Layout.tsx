import React from "react";
import { useAuth } from "../app/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/user/navbar/components/Navbar";
import Footer from "../components/user/footer/Components/Footer";
import Sidebar from "./Sidebar";
import PageContent from "./PageContent";
import { SidebarProvider } from "@/hooks/SidebarContext";

interface LayoutProps {
  token: string;
}

const Layout: React.FC<LayoutProps> = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="yflex yflex-1">
      {/* <Navbar token={token} />
      <Outlet />
      <Footer /> */}

      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
      <PageContent />
    </div>
  );
};

export default Layout;
