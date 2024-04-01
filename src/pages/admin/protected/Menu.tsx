import Menu from "@/features/admin/Menu";
import React from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import { useEffect } from "react";

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
