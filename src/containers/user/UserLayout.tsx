import React from "react";
import Layout from "../Layout";
import Navbar from "../Navbar";
import Home from "../../pages/user/public/Home";
import Footer from "../Footer";

const CustomerLayout: React.FC = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default CustomerLayout;
