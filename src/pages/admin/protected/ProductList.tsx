import React, { useEffect } from "react";
import ProductList from "@/features/admin/inventory/components/ProductList";
import { useDispatch } from "react-redux";
import { setTitle } from "@/common/appSlice";

const Internal: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Product List"));
  }, []);

  return (
    <>
      <ProductList />
    </>
  );
};

export default Internal;
