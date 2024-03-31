import React from "react";
import { useAuth } from "../app/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/user/navbar/components/Navbar";
import Footer from "../components/user/footer/Components/Footer";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
    <div className="yflex yflex-1 yoverflow-hidden yw-screen yh-screen yrelative ybg-slate-100">
      {/* <Navbar token={token} />
      <Outlet />
      <Footer /> */}
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>

      <div className="yw-full yoverflow-y-auto">
        <PageContent />
      </div>
    </div>
  );
};

export default Layout;
