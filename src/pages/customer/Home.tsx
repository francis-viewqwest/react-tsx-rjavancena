import React from "react";
import Hero from "../../features/customer/hero/components/Hero";
import Featured from "../../features/customer/featured/components/Featured";
import ShopCategory from "../../features/customer/category/components/ShopCategory";
import ShopProduct from "../../features/customer/shop/components/ShopProduct";
import Section from "../../features/customer/section/components/Section";

const ExternalPage: React.FC = () => {
  return (
    <>
      <Hero />
      <Featured />
      <ShopCategory />
      <ShopProduct />
      <Section />
    </>
  );
};

export default ExternalPage;
