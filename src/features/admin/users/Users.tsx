import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import usersJSON from "@/data/users.json";
import { UsersType } from "@/interface/InterfaceType";
import { ColumnsUsers } from "@/components/ui/columns";

const Users: React.FC = () => {
  const [usersData, setUsersData] = useState<UsersType[]>([]);

  useEffect(() => {
    setUsersData(usersJSON);
  }, []);

  return (
    <>
      <DataTable title="Users" columns={ColumnsUsers} data={usersData} />
    </>
  );
};

export default Users;
