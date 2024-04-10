import React, { useEffect, useState } from "react";
import { Columns } from "@/components/admin/DataTable/Columns";
import { DataTable } from "@/components/ui/data-table";
// import { DataTable } from "../components/DataTable";
import DataJson from "@/data/productData.json";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const ProductList: React.FC = () => {
  const [data, setData] = useState<DataProduct[]>([]);

  useEffect(() => {
    setData(DataJson.data);
  }, []);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,

    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

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
        <DataTable title="Product in 23" columns={Columns} data={data} />
        <div className="yflex-1 ytext-sm ytext-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </>
  );
};

export default ProductList;
