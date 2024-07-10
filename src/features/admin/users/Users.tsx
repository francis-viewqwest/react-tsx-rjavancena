import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import useColumnsProduct from "@/components/ui/columns";
import {
  loadingStatus,
  usersData,
  getUsersData,
} from "@/app/slice/usersManagementSlice";
import { RouteType } from "@/interface/InterfaceType";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const Users: React.FC<RouteType> = (props) => {
  const columnsProduct = useColumnsProduct("users");
  const dispatch = useAppDispatch();

  const [data, setData] = useState([]);
  const usersLoading = useAppSelector(loadingStatus);
  const usersParentData = useAppSelector(usersData);

  useEffect(() => {
    if (usersLoading === "getUsersData/success") {
      setData(usersParentData?.data?.account);
    }

    if (usersLoading === "addUser/success") {
      dispatch(getUsersData({ url: props.path_key, method: "GET" }));
    }

    if (usersLoading === "editUser/success") {
      dispatch(getUsersData({ url: props.path_key, method: "GET" }));
    }

    if (usersLoading === "deleteUser/success") {
      dispatch(getUsersData({ url: props.path_key, method: "GET" }));
    }
  }, [usersParentData, usersLoading]);

  return (
    <>
      <DataTable title="Users" columns={columnsProduct} data={data} />
    </>
  );
};

export default Users;
