import React from "react";
import logo from "../assets/logo.svg";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "@/hooks/SidebarContext";
import { useSelector } from "react-redux";

const Sidebar: React.FC = () => {
  const { open, setOpen, handleExpandSidebar } = useSidebar();

  const location = useLocation();

  const sideNavRoutes = useSelector((state) => state.user.sidebar);

  // const menus = [
  //   {
  //     title: "Menu",
  //     path: "/app/menu",
  //     icon: "heroicons-outline:view-grid",
  //   },
  //   {
  //     title: "Dashboard",
  //     path: "/app/dashboard",
  //     icon: "heroicons-outline:chart-pie",
  //   },
  //   {
  //     title: "Inventory",
  //     path: "/app/inventory",
  //     icon: "heroicons-outline:cube",
  //   },
  //   {
  //     title: "Users",
  //     path: "/app/users",
  //     icon: "heroicons-outline:user-group",
  //   },
  //   {
  //     title: "Orders",
  //     icon: "heroicons-outline:clipboard-list",
  //     submenus: [
  //       {
  //         title: "Customer Order",
  //         path: "/app/customer-order",
  //         icon: "heroicons-outline:user-group",
  //       },
  //       {
  //         title: "Return Order",
  //         path: "/app/return-order",
  //         icon: "heroicons-outline:user-group",
  //       },
  //       {
  //         title: "Failed Delivery",
  //         path: "/app/failed-delivery",
  //         icon: "heroicons-outline:user-group",
  //       },
  //       {
  //         title: "Cancellation",
  //         path: "/app/cancellation",
  //         icon: "heroicons-outline:user-group",
  //       },
  //     ],
  //   },
  // ];

  return (
    <>
      <Drawer direction="left">
        <DrawerTrigger className="lg:hidden rounded-none shadow-none" asChild>
          <Button className="mx-4 mt-3 rounded-sm absolute z-50">
            <Icon fontSize={24} icon="heroicons:bars-3-16-solid" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-64 h-full">
            <DrawerHeader>
              <DrawerTitle className="font-semibold">RJ AVANCENA</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0 px-3">
              <div className="flex flex-col gap-2">
                {sideNavRoutes.map((menu, index) => (
                  <React.Fragment key={index}>
                    {menu.submenus ? (
                      <Accordion type="single" collapsible>
                        <AccordionItem
                          className="border-b-0"
                          value={`${index}`}
                        >
                          <AccordionTrigger
                            onClick={() => handleExpandSidebar(true, true)}
                            className={cn(
                              buttonVariants({
                                size: "sm",
                                variant: "ghost",
                              }),
                              "justify-between w-0 hover:no-underline font-medium text-neutral-600"
                            )}
                          >
                            <div className="flex items-center gap-3 text-neutral-600">
                              <Icon fontSize={22} icon={menu.icon} />
                              <span
                                className={`${
                                  !open
                                    ? "scale-0 ease-in-out transition-all"
                                    : "ease-in-out scale-100 transition-all"
                                }`}
                              >
                                {menu.title}
                              </span>
                            </div>
                          </AccordionTrigger>

                          {menu.submenus.map((submenu, index) => (
                            <AccordionContent className="pb-2 pt-2" key={index}>
                              {open ? (
                                <div className="w-full flex flex-col">
                                  <Link
                                    className={cn(
                                      buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                      }),
                                      "justify-between ml-7 text-neutral-600 flex gap-10"
                                    )}
                                    to={`app${submenu.path}`}
                                  >
                                    {submenu.title}
                                  </Link>
                                </div>
                              ) : null}
                            </AccordionContent>
                          ))}
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Link
                        reloadDocument
                        className={cn(
                          buttonVariants({
                            size: "sm",
                            variant: "ghost",
                          }),
                          "justify-between font-medium"
                        )}
                        to={`/app${menu.path}`}
                      >
                        <div
                          className={`flex items-center gap-3 text-start text-neutral-600`}
                        >
                          <Icon fontSize={22} icon={menu.icon} />
                          <span
                            className={`${
                              !open
                                ? "scale-0 ease-in-out transition-all"
                                : "ease-in-out scale-100 transition-all"
                            }`}
                          >
                            {menu.title}
                          </span>
                        </div>
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <DrawerFooter></DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      <div
        className={`min-h-screen hidden border-r p-2 lg:flex flex-col bg-white transition-all relative ${
          open ? "w-48" : "w-14"
        }`}
      >
        <div className="flex items-center justify-between">
          <img
            className={`${open ? "w-24" : "w-0 transition-all ease-in-out"}`}
            src={logo}
            alt="RJ Avancena Logo"
          />
          <Button variant="ghost" onClick={() => setOpen(!open)}>
            <Icon icon="heroicons-outline:chevron-double-right" />
          </Button>
        </div>
        <nav className="gap-2 flex flex-col pt-10 ease-in-out transition-all">
          {sideNavRoutes.map((menu, index) => (
            <React.Fragment key={index}>
              {menu.submenus ? (
                <Accordion type="single" collapsible>
                  <AccordionItem className="border-b-0" value={`${index}`}>
                    <AccordionTrigger
                      open={open}
                      onClick={() => handleExpandSidebar(true, true)}
                      className={cn(
                        buttonVariants({
                          size: "sm",
                          variant: "ghost",
                        }),
                        "justify-between w-0 hover:no-underline font-medium text-neutral-600"
                      )}
                    >
                      <div
                        className={`flex items-center gap-3 text-neutral-600`}
                      >
                        <Icon fontSize={17} icon={menu.icon} />
                        <span
                          className={`${
                            !open
                              ? "scale-0 hidden ease-in-out transition-all"
                              : "ease-in-out scale-100 transition-all"
                          }`}
                        >
                          {menu.title}
                        </span>
                      </div>
                    </AccordionTrigger>

                    {menu.submenus.map((submenu, index) => (
                      <AccordionContent className="pb-1" key={index}>
                        {open ? (
                          <div className="w-full flex flex-col">
                            <Link
                              className={cn(
                                buttonVariants({
                                  size: "sm",
                                  variant: "ghost",
                                }),
                                `justify-between ml-7 text-neutral-600 flex gap-10  ${
                                  location.pathname === submenu.path &&
                                  "bg-primary text-white hover:bg-primary/90 hover:text-white"
                                }`
                              )}
                              to={`/app${submenu.path}`}
                            >
                              {submenu.title}
                            </Link>
                          </div>
                        ) : null}
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }),
                    `justify-between font-medium text-neutral-600 ${
                      location.pathname === menu.path &&
                      "bg-primary text-white hover:bg-primary/90 hover:text-white"
                    }`
                  )}
                  to={`/app${menu.path}`}
                >
                  <div className={`flex items-center gap-3 text-start`}>
                    <Icon fontSize={17} icon={menu.icon} />
                    <span
                      className={`${
                        !open
                          ? "scale-0 hidden ease-in-out transition-all"
                          : "ease-in-out scale-100 transition-all"
                      }`}
                    >
                      {menu.title}
                    </span>
                  </div>
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
