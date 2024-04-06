import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import Users from "@/features/admin/Users";

const Internal: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Users"));
  }, []);

  return (
    <>
      <Users />
    </>
  );
};

export default Internal;
