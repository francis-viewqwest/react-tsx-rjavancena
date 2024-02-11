import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  return (
    <>
      <div className="w-full top-0 fixed z-10 bg-white py-4">
        <div className="drawer z-10 max-w-[1200px] w-full m-auto bg-white">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="w-full navbar gap-1 md:gap-10">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="font-black">RJ AVANCENA</div>
              <ul className="hidden md:flex flex-row gap-4">
                {/* Navbar menu content here */}
                <li className="text-sm">
                  <Link to="/">Home</Link>
                </li>
                <li className="text-sm">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="text-sm">
                  <Link to="/about">About</Link>
                </li>
              </ul>
              <div className="flex-1 lg:block"></div>
              <div className="flex-none hidden lg:block">
                <ul className="flex flex-row gap-4 items-center">
                  {/* Navbar menu content here */}
                  <div className="flex items-center relative">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="input input-bordered input-md w-60 px-10"
                    />

                    <ShoppingBagIcon className="h-7 w-7 absolute border-l-[1px] pl-2 right-4" />
                  </div>
                  <li className="text-sm font-bold">
                    <Link to="/signin">Sign In</Link>
                  </li>
                  <li className="text-sm font-bold">
                    <button className="btn btn-md bg-btnprimary text-white">
                      <Link to="/signup">Sign Up</Link>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-white p-4 w-64 min-h-full text-black">
              {/* Sidebar content here */}
              <li className="text-sm">
                <Link to="/">Home</Link>
              </li>
              <li className="text-sm">
                <Link to="/">Shop</Link>
              </li>
              <li className="text-sm">
                <Link to="/">About</Link>
              </li>
              <li className="text-sm">
                <Link to="/">Sign In</Link>
              </li>
              <li className="text-sm">
                <Link to="/">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
