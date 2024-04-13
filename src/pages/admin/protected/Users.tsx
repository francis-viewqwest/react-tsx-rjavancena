import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import Users from "@/features/admin/users/Users";
import { useTableContext } from "@/hooks/TableContext";

const Internal: React.FC = () => {
  const { setPage } = useTableContext();
  const dispatch = useDispatch();

  useEffect(() => {
    setPage("Users");
    dispatch(setTitle("Users"));
  }, []);

  return (
    <>
      <Users />
    </>
  );
};

export default Internal;
