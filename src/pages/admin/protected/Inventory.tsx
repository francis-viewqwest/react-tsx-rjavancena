import Inventory from "@/features/admin/inventory/Inventory";
import React from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import { useEffect } from "react";
import { useTableContext } from "@/hooks/TableContext";

const Internal: React.FC = () => {
  const dispatch = useDispatch();
  const { setPage } = useTableContext();

  useEffect(() => {
    setPage("Inventory");
    dispatch(setTitle("Inventory"));
  }, []);

  return (
    <>
      <Inventory />
    </>
  );
};

export default Internal;
