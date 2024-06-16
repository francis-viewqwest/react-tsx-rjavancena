import Menu from "@/features/admin/menu/Menu";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import { getMenuData } from "@/app/slice/menuSlice";

interface Props {
  routeData: { path_key: string | any };
}

const Internal: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Menu"));
    dispatch(getMenuData({ url: props.routeData.path_key }));
  }, []);
  return (
    <>
      <Menu props={props} />
    </>
  );
};

export default Internal;
