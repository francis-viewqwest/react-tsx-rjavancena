import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import usersJSON from "@/data/users.json";
import { UsersType } from "@/interface/InterfaceType";
import { ColumnsUsers } from "@/components/ui/columns";
import useColumnsProduct from "@/components/ui/columns";
import {
  loadingStatus,
  usersData,
  getUsersData,
} from "@/app/slice/usersManagementSlice";
import { useDispatch, useSelector } from "react-redux";

const Users: React.FC = ({ path_key }) => {
  // const [usersData, setUsersData] = useState<UsersType[]>([]);
  const columnsProduct = useColumnsProduct("users");
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const usersLoading = useSelector(loadingStatus);
  const usersParentData = useSelector(usersData);

  // useEffect(() => {
  //   setUsersData(usersJSON);
  // }, []);

  useEffect(() => {
    if (usersLoading === "getUsersData/success") {
      setData(usersParentData?.data?.account);
    }

    if (usersLoading === "addUser/success") {
      dispatch(getUsersData({ url: path_key, method: "GET" }));
    }

    if (usersLoading === "editUser/success") {
      dispatch(getUsersData({ url: path_key, method: "GET" }));
    }

    if (usersLoading === "deleteUser/success") {
      dispatch(getUsersData({ url: path_key, method: "GET" }));
    }
  }, [usersParentData, usersLoading]);

  return (
    <>
      <DataTable title="Users" columns={columnsProduct} data={data} />
    </>
  );
};

export default Users;
