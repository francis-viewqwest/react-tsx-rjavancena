import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { Columns } from "./Columns";
import DataJson from "@/data/productData.json";

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
      <h1 className="ytext-sm yfont-bold">Product in 2B ACRYLON 4 </h1>
      <div className="ypy-9">
        <DataTable columns={Columns} data={data} />
      </div>
    </>
  );
};

export default ProductList;
