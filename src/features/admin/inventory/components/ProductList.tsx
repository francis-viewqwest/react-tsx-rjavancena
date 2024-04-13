import React, { useEffect, useState } from "react";
import { columnsProduct } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import DataJson from "@/data/productData.json";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { ProductType } from "@/interface/InterfaceType";

const ProductList: React.FC = () => {
  const [data, setData] = useState<ProductType[]>([]);

  useEffect(() => {
    setData(DataJson.data);
  }, []);

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
