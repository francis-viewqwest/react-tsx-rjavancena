import React from "react";
import Layout from "../Layout";
import Navbar from "../Navbar";
import Home from "../../pages/user/Home";
import Footer from "../Footer";

const CustomerLayout: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <h1>Customer</h1>
      <Home />
      <Footer />
    </Layout>
  );
};

export default CustomerLayout;
