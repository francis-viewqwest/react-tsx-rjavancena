import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const Navbar: React.FC<{ token: string }> = () => {
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
            <Link to="/" className="font-black text-md uppercase">
              RJ AVANCENA
            </Link>
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
