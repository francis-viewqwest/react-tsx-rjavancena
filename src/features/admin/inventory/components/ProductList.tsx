import React, { useEffect, useState } from "react";
import useColumnsProduct from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "react-router-dom";
import { ProductType } from "@/interface/InterfaceType";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventoryDataChild,
  createInventoryChildData,
  inventoryData,
  loadingStatus,
  inventoryError,
} from "@/app/slice/inventorySlice";
import { TableProvider } from "@/hooks/TableContext";
import { toast } from "@/components/ui/use-toast";

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const inventoryChild = useSelector(inventoryData);
  const inventoryChildError = useSelector(inventoryError);
  const inventoryLoading = useSelector(loadingStatus);
  const [data, setData] = useState<ProductType[]>([]);
  const { id } = useParams();
  const columnsProduct = useColumnsProduct("inventory");

  useEffect(() => {
    dispatch(getInventoryDataChild({ url: id }));
  }, [id]);

  useEffect(() => {
    if (inventoryLoading === "getInventoryDataChild/success") {
      toast({ title: inventoryChild?.message || inventoryChild });
      setData(inventoryChild?.data?.inventory_product);
    }

    if (inventoryLoading === "createInventoryChild/success") {
      toast({ title: inventoryChild?.message || inventoryChild });
      dispatch(getInventoryDataChild({ url: id }));
    }

    if (inventoryLoading === "createInventoryChild/failed") {
      toast({
        variant: "destructive",
        title:
          (inventoryChildError?.message && inventoryChildError) ||
          "Uh oh! Something went wrong.",
      });
    }

    if (inventoryLoading === "updateInventoryChild/success") {
      toast({
        title: inventoryChildError?.message || inventoryChildError,
      });
      dispatch(getInventoryDataChild({ url: id }));
    }

    if (inventoryLoading === "updateInventoryChild/failed") {
      toast({
        variant: "destructive",
        title:
          (inventoryChildError?.message && inventoryChildError) ||
          "Uh oh! Something went wrong.",
      });
    }

    if (inventoryLoading === "deleteInventoryChildData/success") {
      toast({ title: inventoryChild.message || inventoryChild });
      dispatch(getInventoryDataChild({ url: id }));
    }
    if (inventoryLoading === "deleteInventoryChildData/failed") {
      toast({
        variant: "destructive",
        title:
          inventoryChildError ||
          inventoryChildError.message ||
          "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [inventoryChild, inventoryLoading]);

  return (
    <>
      <TableProvider page="Inventory" inventoryId={id}>
        <Link
          to="/app/inventory"
          className="flex gap-2 items-center mb-6 text-xs w-32"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          Back to inventory
        </Link>

        <div>
          <DataTable title={`Product in ${inventoryChild.data.parameter}`} columns={columnsProduct} data={data} />
        </div>
      </TableProvider>
    </>
  );
};

export default ProductList;
