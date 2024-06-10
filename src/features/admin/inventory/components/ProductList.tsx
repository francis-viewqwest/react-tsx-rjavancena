import React, { useEffect, useState } from "react";
// import { columnsProduct } from "@/components/ui/columns";
import useColumnsProduct from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import DataJson from "@/data/productData.json";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "react-router-dom";
import { ProductType } from "@/interface/InterfaceType";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventoryDataChild,
  inventoryData,
  loadingStatus,
} from "@/app/slice/inventorySlice";

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const inventoryChild = useSelector(inventoryData);
  const inventoryLoading = useSelector(loadingStatus);
  const [data, setData] = useState<ProductType[]>([]);
  const { id } = useParams();
  const columnsProduct = useColumnsProduct();

  useEffect(() => {
    dispatch(getInventoryDataChild({ url: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (inventoryLoading === "getInventoryDataChild/success") {
      setData(inventoryChild.data);
    }
  }, [inventoryChild, inventoryLoading]);

  return (
    <>
      <Link
        to="/app/inventory"
        className="flex gap-2 items-center mb-6 text-xs w-32"
      >
        <ArrowLeftIcon className="w-3 h-3" />
        Back to inventory
      </Link>

      <div>
        <DataTable title="Product in " columns={columnsProduct} data={data} />
      </div>
    </>
  );
};

export default ProductList;
