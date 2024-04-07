import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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

const Sidebar: React.FC = () => {
  const { open, setOpen, handleExpandSidebar } = useSidebar();
  const location = useLocation();

  const menus = [
    {
      title: "Menu",
      path: "/app/menu",
      icon: "heroicons-outline:view-grid",
    },
    {
      title: "Dashboard",
      path: "/app/dashboard",
      icon: "heroicons-outline:chart-pie",
    },
    {
      title: "Inventory",
      path: "/app/inventory",
      icon: "heroicons-outline:cube",
    },
    {
      title: "Users",
      path: "/app/users",
      icon: "heroicons-outline:user-group",
    },
    {
      title: "Orders",
      icon: "heroicons-outline:clipboard-list",
      submenus: [
        {
          title: "Customer Order",
          path: "/app/customer-order",
          icon: "heroicons-outline:user-group",
        },
        {
          title: "Return Order",
          path: "/app/return-order",
          icon: "heroicons-outline:user-group",
        },
        {
          title: "Failed Delivery",
          path: "/app/failed-delivery",
          icon: "heroicons-outline:user-group",
        },
        {
          title: "Cancellation",
          path: "/app/cancellation",
          icon: "heroicons-outline:user-group",
        },
      ],
    },
  ];

  return (
    <>
      <Drawer direction="left">
        <DrawerTrigger
          className="lg:yhidden yrounded-none yshadow-none"
          asChild
        >
          <Button className="ymx-4 ymt-3 yrounded-sm yabsolute yz-50">
            <Icon fontSize={24} icon="heroicons:bars-3-16-solid" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="yw-64 yh-full">
            <DrawerHeader>
              <DrawerTitle className="font-semibold">RJ AVANCENA</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0 ypx-3">
              <div className="yflex yflex-col ygap-2">
                {menus.map((menu, index) => (
                  <React.Fragment key={index}>
                    {menu.submenus ? (
                      <Accordion type="single" collapsible>
                        <AccordionItem
                          className="yborder-b-0"
                          value={`${index}`}
                        >
                          <AccordionTrigger
                            onClick={() => handleExpandSidebar(true, true)}
                            className={cn(
                              buttonVariants({
                                size: "sm",
                                variant: "ghost",
                              }),
                              "justify-between yw-0 hover:yno-underline yfont-medium ytext-neutral-600"
                            )}
                          >
                            <div className="yflex yitems-center ygap-3 ytext-neutral-600">
                              <Icon fontSize={22} icon={menu.icon} />
                              <span
                                className={`${
                                  !open
                                    ? "yscale-0 yease-in-out ytransition-all"
                                    : "yease-in-out yscale-100 ytransition-all"
                                }`}
                              >
                                {menu.title}
                              </span>
                            </div>
                          </AccordionTrigger>

                          {menu.submenus.map((submenu, index) => (
                            <AccordionContent
                              className="ypb-2 ypt-2"
                              key={index}
                            >
                              {open ? (
                                <div className="yw-full yflex yflex-col">
                                  <Link
                                    className={cn(
                                      buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                      }),
                                      "yjustify-between yml-7 ytext-neutral-600 yflex ygap-10"
                                    )}
                                    to={submenu.path}
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
                          "yjustify-between yfont-medium"
                        )}
                        to={menu.path}
                      >
                        <div
                          className={`yflex yitems-center ygap-3 ytext-start ytext-neutral-600`}
                        >
                          <Icon fontSize={22} icon={menu.icon} />
                          <span
                            className={`${
                              !open
                                ? "yscale-0 yease-in-out ytransition-all"
                                : "yease-in-out yscale-100 ytransition-all"
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
        className={`ymin-h-screen yhidden yborder-r yp-2 lg:yflex yflex-col ybg-white ytransition-all relative ${
          open ? "yw-48" : "yw-14"
        }`}
      >
        <div className="yflex yitems-center yjustify-between">
          <img
            className={`${
              open ? "yw-24" : "yw-0 ytransition-all yease-in-out"
            }`}
            src={logo}
            alt=""
          />
          <Button variant="ghost" onClick={() => setOpen(!open)}>
            <Icon icon="heroicons-outline:chevron-double-right" />
          </Button>
        </div>
        <nav className="ygap-2 yflex yflex-col ypt-10 yease-in-out ytransition-all">
          {menus.map((menu, index) => (
            <React.Fragment key={index}>
              {menu.submenus ? (
                <Accordion type="single" collapsible>
                  <AccordionItem className="yborder-b-0" value={`${index}`}>
                    <AccordionTrigger
                      onClick={() => handleExpandSidebar(true, true)}
                      className={cn(
                        buttonVariants({
                          size: "sm",
                          variant: "ghost",
                        }),
                        "justify-between yw-0 hover:yno-underline yfont-medium ytext-neutral-600"
                      )}
                    >
                      <div
                        className={`yflex yitems-center ygap-3 ytext-neutral-600`}
                      >
                        <Icon fontSize={17} icon={menu.icon} />
                        <span
                          className={`${
                            !open
                              ? "yscale-0 yhidden yease-in-out ytransition-all"
                              : "yease-in-out yscale-100 ytransition-all"
                          }`}
                        >
                          {menu.title}
                        </span>
                      </div>
                    </AccordionTrigger>

                    {menu.submenus.map((submenu, index) => (
                      <AccordionContent className="ypb-1" key={index}>
                        {open ? (
                          <div className="yw-full yflex yflex-col">
                            <Link
                              className={cn(
                                buttonVariants({
                                  size: "sm",
                                  variant: "ghost",
                                }),
                                `yjustify-between yml-7 ytext-neutral-600 yflex ygap-10  ${
                                  location.pathname === submenu.path &&
                                  "ybg-primary ytext-white hover:ybg-primary/90 hover:ytext-white"
                                }`
                              )}
                              to={submenu.path}
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
                    `yjustify-between yfont-medium ytext-neutral-600 ${
                      location.pathname === menu.path &&
                      "ybg-primary ytext-white hover:ybg-primary/90 hover:ytext-white"
                    }`
                  )}
                  to={menu.path}
                >
                  <div className={`yflex yitems-center ygap-3 ytext-start`}>
                    <Icon fontSize={17} icon={menu.icon} />
                    <span
                      className={`${
                        !open
                          ? "yscale-0 yhidden yease-in-out ytransition-all"
                          : "yease-in-out yscale-100 ytransition-all"
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
