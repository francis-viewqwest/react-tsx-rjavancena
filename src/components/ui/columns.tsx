import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import {
  RowInventoryActions,
  RowPackOrdersAction,
  RowTransactionActions,
  RowReturnOrderAction,
  RowShippingAction,
  RowFailedDeliverAction,
  RowCancelledDeliverAction,
  RowHandoverAction,
  RowUsersActions,
  RowCustomerTransactionActions,
} from "./data-table-actions-row";
import { Icon } from "@iconify/react";
import {
  TransactionType,
  UsersType,
  CustomerOrderType,
  PackOrderType,
  HandOverType,
  ShipmentOrderType,
  ShippingType,
  DeliveredType,
  FailedDeliverType,
  ReturnOrderType,
  CancelledDeliverType,
} from "@/interface/InterfaceType";
import _ from "lodash";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { inventoryData } from "@/app/slice/inventorySlice";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { usersData } from "@/app/slice/usersManagementSlice";
import { dashboardData } from "@/app/slice/dashboardSlice";
import { useAppSelector } from "@/app/hooks";

const useColumnsProduct = (
  dataSource: "inventory" | "users" | "transaction" | "customer" | "logs"
) => {
  const inventoryChild = useSelector(inventoryData);
  const usersParent = useSelector(usersData);
  const dashboardTransaction = useSelector(dashboardData);
  const customerCashierData = useAppSelector(
    (state) => state.customer?.customerCashierData
  );
  const logsData = useAppSelector((state) => state.logs?.logsData);

  // console.log(logsData);

  const baseColumns: ColumnDef<any>[] = [];

  const dynamicColumns = useMemo(() => {
    const getColumns = () => {
      switch (dataSource) {
        case "inventory":
          return inventoryChild;
        case "users":
          return usersParent;
        case "transaction":
          return dashboardTransaction;
        case "customer":
          return customerCashierData;
        case "logs":
          return logsData;
        default:
          break;
      }
    };

    const currentData = getColumns();

    return (
      currentData?.data?.columns?.map((column: string) => {
        const accessorKey = column.trim().toLowerCase().replace(/\s+/g, "_");

        return {
          accessorKey: accessorKey,
          header: ({ column }) => {
            const columnHeader = column.id;
            return (
              <h1
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                {_.startCase(columnHeader)}
                <Icon icon="radix-icons:caret-sort" />
              </h1>
            );
          },
          cell: ({ row }: { row: any }) => {
            const columnHeader = _.lowerCase(column);

            if (columnHeader.includes("retailprice")) {
              const value = parseFloat(row.getValue(accessorKey));
              const formatted = new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(value);
              return <div className="text-right font-medium">{formatted}</div>;
            }
            if (columnHeader.includes("image")) {
              const imageUrl = row.getValue(accessorKey);

              return (
                <>
                  {_.isEmpty(imageUrl) ? (
                    <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />
                  ) : (
                    <img
                      className="h-11 w-11 bg-cover bg-no-repeat"
                      src={imageUrl}
                      alt=""
                    />
                  )}
                </>
              );
            }
            if (columnHeader.includes("status_color")) {
              console.log(row);

              return <Badge>{row.getValue(accessorKey)}</Badge>;
            }
            if (columnHeader.includes("status")) {
              console.log(row.getValue(accessorKey));

              const badgeColor = (row: string) => {
                switch (row) {
                  case "Activate":
                    return "successStatus";
                  case "Done":
                    return "successStatus";
                  case "Paid":
                    return "successStatus";
                  case "Not Paid":
                    return "destructiveStatus";
                  case "Incative":
                    return "dimmedStatus";
                  case "Pending":
                    return "warning";
                  case "Banned":
                    return "destructiveStatus";
                  case "Restricted":
                    return "destructiveStatus";

                  default:
                    break;
                }
                console.log(row);
              };

              const statusColor = row.getValue(accessorKey);

              return (
                <Badge variant={badgeColor(statusColor)}>
                  {row.getValue(accessorKey)}
                </Badge>
              );
            }
            if (columnHeader.includes("user id")) {
              return <>{row.getValue(accessorKey)}</>;
            }
            if (columnHeader.includes("total amount")) {
              const value = parseFloat(row.getValue(accessorKey));
              const formatted = new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(value);
              return <>{formatted}</>;
            }
            if (columnHeader.includes("actions")) {
              switch (dataSource) {
                case "inventory":
                  return <RowInventoryActions row={row} />;
                case "users":
                  return <RowUsersActions row={row} />;
                case "transaction":
                  return <RowTransactionActions row={row} />;
                case "customer":
                  return <RowCustomerTransactionActions row={row} />;
                default:
                  return null;
              }
            }
            return <>{row.getValue(accessorKey)}</>;
          },
        };
      }) || []
    );
  }, [dataSource, inventoryChild, usersParent, dashboardTransaction]);

  // Combine base columns and dynamic columns
  const columns = useMemo(
    () => [...baseColumns, ...dynamicColumns],
    [baseColumns, dynamicColumns]
  );

  return columns;
};

export default useColumnsProduct;

export const ColumnsTransac: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "transactId",
    header: "Transact ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerId",
    header: "Customer ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
    cell: ({ row }) => {
      return row.original.status === "Success" ? (
        <Badge variant="successOutline">{row.original.status}</Badge>
      ) : (
        <Badge variant="destructiveOutline">{row.original.status}</Badge>
      );
    },
  },
];

export const ColumnsUsers: ColumnDef<UsersType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customerName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
    cell: ({ row }) => {
      return row.original.status === "Active" ? (
        <Badge variant="successStatus">{row.original.status}</Badge>
      ) : row.original.status === "Inactive" ? (
        <Badge variant="dimmedStatus">{row.original.status}</Badge>
      ) : (
        <Badge variant="destructiveStatus">{row.original.status}</Badge>
      );
    },
  },
  {
    accessorKey: "totalReturn",
    header: "Return",
  },
  {
    id: "action",
    cell: ({ row }) => <RowUsersAction row={row} />,
  },
];

export const ColumnsCustomerOrder: ColumnDef<CustomerOrderType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "datePlaced",
    header: "Date Placed",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
];

export const ColumnsPacksOrder: ColumnDef<PackOrderType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "totalOrders",
    header: "Total Orders",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "datePlaced",
    header: "Date Placed",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="successStatus">{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <RowPackOrdersAction row={row} />,
  },
];

export const ColumnsShipmentOrder: ColumnDef<ShipmentOrderType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "totalOrders",
    header: "Total Orders",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "datePlaced",
    header: "Date Placed",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="successStatus">{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <RowPackOrdersAction row={row} />,
  },
];

export const ColumnsHandover: ColumnDef<HandOverType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "totalOrders",
    header: "Total Orders",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "datePlaced",
    header: "Date Placed",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="successStatus">{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <RowHandoverAction row={row} />,
  },
];

export const ColumnsShipping: ColumnDef<ShippingType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
  },
  {
    accessorKey: "totalItems",
    header: "Total Items",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="progressStatus">{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <RowShippingAction row={row} />,
  },
];

export const ColumnsDelivered: ColumnDef<DeliveredType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
  },
  {
    accessorKey: "totalItems",
    header: "Total Items",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="successStatus">{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <RowShippingAction row={row} />,
  },
];

export const ColumnsFailedDeliver: ColumnDef<FailedDeliverType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "reasonFailure",
    header: "Reason for Failure",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <RowFailedDeliverAction row={row} />,
  },
];
export const ColumnsCancelledDeliver: ColumnDef<CancelledDeliverType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "reasonCancel",
    header: "Reason for Cancel",
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <RowCancelledDeliverAction row={row} />,
  },
];

export const ColumnsReturnOrder: ColumnDef<ReturnOrderType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerName",
    header: "Name",
  },
  {
    accessorKey: "returnReason",
    header: "Reason",
  },
  {
    accessorKey: "returnStatus",
    header: "Status",
  },
  {
    accessorKey: "returnDate",
    header: "Requested On",
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <RowReturnOrderAction row={row} />,
  },
];
