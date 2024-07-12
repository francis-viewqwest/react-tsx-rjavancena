import React from "react";
import Navbar from "../../components/user/navbar/components/Navbar";
import Footer from "../../components/user/footer/Components/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default PublicLayout;
