import React from "react";
import { Link } from "react-router-dom";
import {
  IconMenu2,
  IconShoppingCart,
  IconShoppingBag,
  IconSearch,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Navbar: React.FC<{ token: string }> = ({ token }) => {
  const navRoutes = [
    {
      menu: "Home",
      path: "/",
    },
    {
      menu: "Shop",
      path: "/shop",
    },
    {
      menu: "About Us",
      path: "/shop",
    },
    {
      menu: "Contact Us",
      path: "/shop",
    },
  ];

  return (
    <>
      <Drawer direction="left">
        <div className="flex items-center justify-between p-4 sticky top-0 z-50 bg-white border-b-[1px]">
          <div className="flex items-center gap-20">
            <h1 className="font-black text-md uppercase">RJ Avancena</h1>
            <div className="flex gap-12 text-neutral-500">
              {navRoutes.map((nav, index) => (
                <Link
                  className="text-md hidden font-medium lg:block lg:hover:text-black lg:hover:font-medium ease-in-out"
                  key={index}
                  to={nav.path}
                >
                  {nav.menu}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Input
              className="w-auto hidden md:block"
              placeholder="Search product"
            />
            <Button variant="outline" className="rounded-full" size="icon">
              <IconShoppingBag size={22} />
            </Button>
            <div className="hidden lg:gap-5 lg:flex lg:items-center">
              <Button>
                <Link className="text-md" to="/signin">
                  Sign in
                </Link>
              </Button>
              <Link className="text-md" to="/signup">
                Sign up
              </Link>
            </div>
            <DrawerTrigger
              className="lg:hidden rounded-none shadow-none"
              asChild
            >
              <Button className="rounded-sm right-0 w-14" asChild>
                <IconMenu2 size={34} />
              </Button>
            </DrawerTrigger>
          </div>
        </div>
        <DrawerContent className="p-4 w-3/4">
          <DrawerHeader className="p-0 mb-20">
            <DrawerTitle className="justify-start flex left-0 font-black">
              RJ AVANCENA
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4">
            {navRoutes.map((nav, index) => (
              <Link className="uppercase text-2xl" key={index} to={nav.path}>
                {nav.menu}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 absolute bottom-0">
            <Link className="uppercase text-2xl" to="/signin">
              Sign in
            </Link>
            <Link className="uppercase text-2xl" to="/signup">
              Sign up
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
