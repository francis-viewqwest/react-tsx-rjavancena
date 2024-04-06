import Inventory from "@/features/admin/Inventory";
import React from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import { useEffect } from "react";

const Internal: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Inventory"));
  }, []);

  return (
    <>
      <Inventory />
    </>
  );
};

export default Internal;
