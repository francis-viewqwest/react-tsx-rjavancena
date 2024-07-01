import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import usersJSON from "@/data/users.json";
import { UsersType } from "@/interface/InterfaceType";
import { ColumnsUsers } from "@/components/ui/columns";
import useColumnsProduct from "@/components/ui/columns";
import { loadingStatus, usersData } from "@/app/slice/usersManagementSlice";
import { useSelector } from "react-redux";

const Users: React.FC = () => {
  // const [usersData, setUsersData] = useState<UsersType[]>([]);
  const columnsProduct = useColumnsProduct("users");

  const [data, setData] = useState([]);
  const usersLoading = useSelector(loadingStatus);
  const usersParentData = useSelector(usersData);

  // useEffect(() => {
  //   setUsersData(usersJSON);
  // }, []);

  useEffect(() => {
    if (usersLoading === "getInventoryData/success") {
      setData(usersParentData?.data?.account);
    }
  }, [usersParentData, usersLoading]);

  return (
    <>
      <DataTable title="Users" columns={columnsProduct} data={data} />
    </>
  );
};

export default Users;
