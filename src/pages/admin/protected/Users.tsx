import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import Users from "@/features/admin/users/Users";
import { useTableContext } from "@/hooks/TableContext";
import { getUsersData } from "@/app/slice/usersManagementSlice";

interface Props {
  routeData: { path_key: string | any };
}

const Internal: React.FC<Props> = (props) => {
  const { setPage } = useTableContext();
  const dispatch = useDispatch();

  useEffect(() => {
    setPage("Users");
    dispatch(setTitle("Users"));
    dispatch(getUsersData({ url: props.routeData.path_key, method: "GET" }));
  }, []);

  return (
    <>
      <Users />
    </>
  );
};

export default Internal;
