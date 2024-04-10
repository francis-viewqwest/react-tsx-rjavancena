import Menu from "@/features/admin/menu/Menu";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";

const Internal: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Menu"));
  }, []);
  return (
    <>
      <Menu />
    </>
  );
};

export default Internal;
