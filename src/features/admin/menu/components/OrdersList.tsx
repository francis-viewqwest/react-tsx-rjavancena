import React, { useState } from "react";
import {
  MinusIcon,
  PlusIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  decrementQty,
  editCustomerName,
  incrementQty,
} from "@/app/slice/menuSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import _ from "lodash";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Label } from "@/components/ui/label";

interface AddCartItem {
  productName: string;
  category: string;
  price: number;
}

const OrdersList: React.FC = ({ customerId, dataCustomer }) => {
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});
  // const [countQty, setCountQty] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  console.log(quantities);

  const customer = dataCustomer.find(
    (customer: any) => customer.customer_id === customerId
  );

  if (!customer) {
    return <div>No customer found for {customerId}</div>;
  }

  const handleIncrementQty = (
    purchaseId,
    quantity,
    stocks,
    purchaseGroupId,
    userId,
    inventoryId,
    invProductId
  ) => {
    console.log(stocks);
    const newQuantity = (quantities[quantity] || quantity) + 1;

    if (stocks === 0) {
      return;
    }

    const payload = {
      purchase_id: purchaseId,
      quantity: newQuantity,
      purchase_group_id: purchaseGroupId,
      user_id_customer: userId,
      inventory_id: inventoryId,
      inventory_product_id: invProductId,
      eu_device: Cookies.get("eu"),
    };

    setQuantities((prev) => ({
      ...prev,
      [quantity]: newQuantity,
    }));

    dispatch(
      incrementQty({
        url: "purchase/add-qty",
        method: "POST",
        data: payload,
      })
    );
  };

  const handleDecrementQty = (
    purchaseId,
    quantity,
    purchaseGroupId,
    userId,
    inventoryId,
    invProductId
  ) => {
    // const newQuantity = Math.max((quantities[quantity] || quantity) - 1, 0);

    // const newQuantity = (quantities[quantity] || quantity) - 1;
    const newQuantity = (quantities[quantity] || quantity) - 1;

    if (newQuantity === 0) {
      return;
    }

    if (newQuantity >= 0) {
      const payload = {
        purchase_id: purchaseId,
        quantity: newQuantity,
        purchase_group_id: purchaseGroupId,
        user_id_customer: userId,
        inventory_id: inventoryId,
        inventory_product_id: invProductId,
        eu_device: Cookies.get("eu"),
      };

      setQuantities((prev) => ({
        ...prev,
        [quantity]: newQuantity,
      }));

      dispatch(
        decrementQty({
          url: "purchase/minus-qty",
          method: "POST",
          data: payload,
        })
      );
    }
  };

  const [customerName, setCustomerName] = useState(
    customer.customer_name ? customer.customer_name : customer.customer_id
  );

  const handleSaveName = (purchaseGroupId, userId) => {
    setIsEdit(false);

    const payload = {
      purchase_group_id: purchaseGroupId,
      user_id_customer: userId,
      customer_name: customerName,
      purchase_group_id: purchaseGroupId,
      eu_device: Cookies.get("eu"),
    };
    dispatch(
      editCustomerName({
        url: "purchase/update-name",
        method: "POST",
        data: payload,
      })
    );
  };

  const handleEditName = (e: any) => {
    setCustomerName(e.target.value);
  };
  return (
    <>
      <h1 className="font-bold flex items-center gap-2">
        Orders
        <div className="bg-primary rounded-full w-6 h-6 text-white flex items-center">
          <span className="m-auto text-xs">{customer.total_orders}</span>
        </div>
      </h1>
      <div className="text-muted-foreground py-8 items-center flex gap-3 relative">
        <Input
          className="absolute text-md"
          value={_.startCase(_.replace(customerName, "-", " "))}
          onChange={handleEditName}
          disabled={!isEdit}
        />
        {isEdit ? (
          <Label
            onClick={() =>
              handleSaveName(
                customer.purchase_group_id,
                customer.user_id_customer
              )
            }
            className="z-20 flex right-4 absolute"
          >
            Save
          </Label>
        ) : (
          <Icon
            onClick={() => setIsEdit(true)}
            fontSize={20}
            className="z-20 flex right-4 absolute cursor-pointer"
            color="black"
            icon="radix-icons:pencil-2"
          />
        )}
      </div>
      <div>
        <ScrollArea className="h-[400px] rounded-md border p-2">
          <div className=" flex flex-col gap-4">
            {customer.items.map((item, index) => (
              <Card key={index} className="p-2">
                <div className="flex gap-2">
                  <Skeleton className="max-w-full max-h-full p-8" />
                  <CardContent className="w-full relative px-1">
                    <div>
                      <div className="flex w-full items-center justify-between">
                        <h1 className="text-xs font-bold text-primary">
                          {item.name}
                        </h1>
                        <h1 className="text-xs font-bold text-primary">
                          ₱{item.retail_price}
                        </h1>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex w-full h-full items-center justify-between">
                      <div className="flex items-center  ">
                        <Button
                          onClick={() =>
                            handleDecrementQty(
                              item.purchase_id,
                              item.count,
                              item.purchase_group_id,
                              item.user_id_customer,
                              item.inventory_id,
                              item.inventory_product_id
                            )
                          }
                          className="rounded-r-none"
                          size="sm"
                        >
                          <MinusIcon />
                        </Button>
                        <div className="bg-white p-0.5 px-3">
                          {quantities[item.count] || item.count || 0}
                          {/* {item.count} */}
                        </div>
                        <Button
                          onClick={() =>
                            handleIncrementQty(
                              item.purchase_id,
                              item.count,
                              item.stocks,
                              item.purchase_group_id,
                              item.user_id_customer,
                              item.inventory_id,
                              item.inventory_product_id
                            )
                          }
                          className="rounded-l-none"
                          size="sm"
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                      <div>
                        <Icon
                          fontSize={20}
                          color="red"
                          icon="radix-icons:trash"
                        />
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default OrdersList;
