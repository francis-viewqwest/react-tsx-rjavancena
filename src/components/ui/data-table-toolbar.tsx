import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options"

// import { priorities, statuses } from "../data/data"
// import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  search: any;
}

export function DataTableToolbar<TData>({
  table,
  search,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  let placeHolder: string | null = null;
  let columnName: string | null = null;

  switch (search) {
    case "inventory":
      placeHolder = "Search Product";
      columnName = "productName";
      break;
    case "transaction":
      placeHolder = "Search Transaction";
      columnName = "customerId";
      break;
    default:
      placeHolder = null;
      break;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 relative">
        <MagnifyingGlassIcon className="absolute ml-4 text-neutral-500 h-5 w-5" />
        <Input
          placeholder={placeHolder ?? ""}
          value={table.getColumn(columnName ?? "")?.getFilterValue() as string}
          onChange={(event) =>
            table
              .getColumn(columnName ?? "")
              ?.setFilterValue(event.target.value)
          }
          className="pl-9 lg:w-96"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
