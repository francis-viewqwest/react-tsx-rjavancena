import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { Columns } from "./Columns";
import DataJson from "@/data/productData.json";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

interface DataProduct {
  productId: number;
  img: any;
  productName: string;
  retail: number;
  discPrice: number;
  sells: number;
  returnProduct: number;
  stocks: number;
  supplier: string;
}

const ProductList: React.FC = () => {
  const [data, setData] = useState<DataProduct[]>([]);

  useEffect(() => {
    setData(DataJson.data);
  }, []);

  return (
    <>
        <Link
          to="/app/inventory"
          className="yflex ygap-2 yitems-center ymb-6 ytext-xs yw-32"
        >
          <ArrowLeftIcon className="yw-3 yh-3" />
          Back to inventory
        </Link>
      <div>
        <DataTable columns={Columns} data={data} />
      </div>
    </>
  );
};

export default ProductList;
