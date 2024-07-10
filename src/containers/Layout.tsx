import React from "react";
import Sidebar from "./Sidebar";
import PageContent from "./PageContent";
import { SidebarProvider } from "../hooks/SidebarContext";


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
