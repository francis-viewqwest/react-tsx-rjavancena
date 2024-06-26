import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MenuList from "./components/MenuList";
import OrdersList from "./components/OrdersList";
import Payment from "./components/Payment";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  loadingStatus,
  menuError,
  menuData,
  getMenuData,
  getCustomerData,
} from "@/app/slice/menuSlice";

const Menu: React.FC = ({ props }) => {
  const dispatch = useDispatch();
  const [dataMenu, setDataMenu] = useState<any[]>([]);
  const [dataCustomer, setDataCustomer] = useState<any[]>([]);
  const [tabsMenu, setTabsMenu] = useState<any[]>([]);
  const [quantities, setQuantities] = useState({});
  const [activeTab, setActiveTab] = useState(null);

  const menuRes = useSelector(menuData);
  const customerRes = useSelector(menuData);
  const menuStatus = useSelector(loadingStatus);

  useEffect(() => {
    if (menuStatus === "menuData/success") {
      setDataMenu(menuRes?.data?.inventory_product);
      setTabsMenu(menuRes?.data?.filter_category);
      const initialQuantities = menuRes.data.inventory_product.reduce(
        (acc, item) => {
          acc[item.inventory_id] = 0;
          return acc;
        },
        {}
      );
      setQuantities(initialQuantities);
      dispatch(
        getCustomerData({
          url: "purchase/get-user-id-menu-costumer",
          method: "GET",
        })
      );
    }

    if (menuStatus === "menuAddCart/success") {
      dispatch(
        getMenuData({
          url: "inventory/product/index",
          method: "GET",
        })
      );

      dispatch(
        getCustomerData({
          url: "purchase/get-user-id-menu-costumer",
          method: "GET",
        })
      );
    }

    if (menuStatus === "customerData/success") {
      setDataCustomer(customerRes.data);
    }

    if (menuStatus === "incrementQty/success") {
      dispatch(
        getMenuData({
          url: "inventory/product/index",
          method: "GET",
        })
      );
      dispatch(
        getCustomerData({
          url: "purchase/get-user-id-menu-costumer",
          method: "GET",
        })
      );
    }

    if (menuStatus === "incrementQty/failed") {
      dispatch(
        getMenuData({
          url: "inventory/product/index",
          method: "GET",
        })
      );
      dispatch(
        getCustomerData({
          url: "purchase/get-user-id-menu-costumer",
          method: "GET",
        })
      );
    }

    if (menuStatus === "decrementQty/success") {
      dispatch(
        getMenuData({
          url: "inventory/product/index",
          method: "GET",
        })
      );
      dispatch(
        getCustomerData({
          url: "purchase/get-user-id-menu-costumer",
          method: "GET",
        })
      );
    }

    if (menuStatus === "editCustomerName/success") {
      dispatch(
        getMenuData({
          url: "inventory/product/index",
          method: "GET",
        })
      );
      dispatch(
        getCustomerData({
          url: "purchase/get-user-id-menu-costumer",
          method: "GET",
        })
      );
    }

    if (menuStatus === "removeCustomerName/success") {
      setDataCustomer(customerRes.data);
      dispatch(
        getMenuData({
          url: "inventory/product/index",
          method: "GET",
        })
      );
      dispatch(
        getCustomerData({
          url: "purchase/get-user-id-menu-costumer",
          method: "GET",
        })
      );
    }

    if (menuStatus === "deleteProduct/success") {
      dispatch(
        getMenuData({
          url: "inventory/product/index",
          method: "GET",
        })
      );
      dispatch(
        getCustomerData({
          url: "purchase/get-user-id-menu-costumer",
          method: "GET",
        })
      );
    }

    if (menuStatus === "placeOrder/success") {
      dispatch(
        getMenuData({
          url: "inventory/product/index",
          method: "GET",
        })
      );
      dispatch(
        getCustomerData({
          url: "purchase/get-user-id-menu-costumer",
          method: "GET",
        })
      );
    }
  }, [menuStatus, dispatch]);

  const handleTabChange = (value) => {
    setActiveTab((prevValue) => (prevValue === value ? null : value));
  };

  return (
    <>
      <div className="py-7 lg:grid lg:grid-cols-4 lg:grid-rows-4 lg:py-4 lg:gap-4">
        <div className="lg:col-span-3 lg:row-span-4">
          <div className="w-full relative flex items-center lg:w-96">
            <MagnifyingGlassIcon className="absolute ml-4 text-neutral-500 h-5 w-5" />
            <Input className="pl-12" placeholder="Search Product" />
          </div>
          <div className="py-4">
            {menuRes && (
              <MenuList
                dataMenu={dataMenu}
                customerId={activeTab}
                dataCustomer={dataCustomer}
                tabsMenu={tabsMenu}
                quantities={quantities}
                setQuantities={setQuantities}
              />
            )}
          </div>
        </div>
        <div className="py-4 lg:py-0 lg:row-span-4 lg:w-full lg:h-full lg:col-start-4">
          <Tabs defaultValue={activeTab} className="bg-white">
            <ScrollArea className="whitespace-nowrap rounded-md border">
              <TabsList className="bg-white h-12">
                {dataCustomer &&
                  dataCustomer?.map((customer, index) => (
                    <TabsTrigger
                      key={index}
                      className={`  text-xs ${
                        activeTab === customer.customer_id
                          ? "data-[state=active]:bg-primary data-[state=active]:text-white"
                          : "data-[state=active]:text-black"
                      }`}
                      value={customer.customer_id}
                      onClick={() => handleTabChange(customer.customer_id)}
                    >
                      {_.startCase(
                        _.replace(
                          customer.customer_name
                            ? customer.customer_name
                            : customer.customer_id,
                          "-",
                          " "
                        )
                      )}
                    </TabsTrigger>
                  ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {activeTab ? (
              <TabsContent value={activeTab}>
                <OrdersList
                  customerId={activeTab}
                  dataCustomer={dataCustomer}
                />
                <Payment
                  menuStatus={menuStatus}
                  customerId={activeTab}
                  dataCustomer={dataCustomer}
                />
              </TabsContent>
            ) : (
              <div className="p-4">Select a customer.</div>
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Menu;
