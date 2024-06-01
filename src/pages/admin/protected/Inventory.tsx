import Inventory from "@/features/admin/inventory/Inventory";
import React from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import { useEffect } from "react";
import { useTableContext } from "@/hooks/TableContext";
import { getInventoryData } from "@/app/slice/inventorySlice";

interface Props {
  routeData: { path_key: string | any };
}

const Internal: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { setPage } = useTableContext();

  useEffect(() => {
    setPage("Inventory");
    dispatch(setTitle("Inventory"));
    dispatch(getInventoryData({ url: props.routeData.path_key }));
  }, []);

  return (
    <>
      <Inventory props={props} />
    </>
  );
};

export default Internal;
