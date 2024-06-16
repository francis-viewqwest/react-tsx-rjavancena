import React from "react";
import { useAuth } from "../app/AuthProvider";
import { Navigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import PageContent from "./PageContent";
import { SidebarProvider } from "../hooks/SidebarContext";
import useRefreshToken from "@/hooks/useRefreshToken";

interface LayoutProps {
  token: string;
}

const Layout: React.FC<LayoutProps> = () => {
  // const { authentication } = useAuth();

  // const refresh = useRefreshToken();

  // if (!authentication.accessToken) {
  //   refresh();
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="flex flex-1 overflow-hidden w-screen h-screen relative">
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>

      <div className="w-full overflow-y-auto">
        <PageContent />
      </div>
    </div>
  );
};

export default Layout;
