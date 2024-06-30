import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Routes, Route, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";
import Menu from "../pages/admin/protected/Menu";
import Dashboard from "../pages/admin/protected/Dashboard";
import Inventory from "../pages/admin/protected/Inventory";
import ProductList from "../pages/admin/protected/ProductList";
// import ProductList from "@/features/admin/inventory/components/ProductList";
import Users from "../pages/admin/protected/Users";
import CustomerOrder from "../pages/admin/protected/CustomerOrder";
import ReturnOrder from "../pages/admin/protected/ReturnOrder";
import FailedDelivery from "../pages/admin/protected/FailedDelivery";
import Cancellation from "../pages/admin/protected/Cancellation";
import { setNavbar } from "@/app/slice/UserSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "@/app/AuthProvider";
import useRefreshToken from "@/hooks/useRefreshToken";
import PersistLogin from "@/hooks/PersistLogin";
import useAxiosClient from "@/axios-client";

const PageContent: React.FC = () => {
  // const { token } = useAuth();
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const refresh = useRefreshToken();

  const axiosClient = useAxiosClient();

  const requestRoutes = async () => {
    // const token = Cookies.get("token");

    try {
      const res = await axiosClient.get("/role-nav-links");

      console.log(res);
      setRoutes(res.data.nav_links);
      dispatch(setNavbar(res.data.nav_links));
    } catch (error) {
      // refresh();
      navigate("/");
      // console.log
      // await refresh();
      // try {
      //   const res = await axiosClient.get("/role-nav-links");
      //   console.log(res);
      //   setRoutes(res.data.nav_links);
      //   dispatch(setNavbar(res.data.nav_links));
      // } catch (error) {
      //   console.error("Error after refreshing token:", error);
      //   // Handle error, navigate to login, etc.
      // }
    }
  };

  interface RouteData {
    path_key: string;
  }

  const routeComponent = (key: string, routeData: RouteData) => {
    console.log(routeData);

    switch (key) {
      case "parent-Menu":
        return <Menu routeData={routeData} />;
      case "parent-Dashboard":
        return <Dashboard />;
      case "parent-Inventory":
        return <Inventory routeData={routeData} />;
      case "child-Inventory":
        return <ProductList />;
      case "parent-Users":
        return <Users routeData={routeData} />;
      case "Customer Order":
        return <CustomerOrder />;
      case "Return Order":
        return <ReturnOrder />;
      case "Failed Delivery":
        return <FailedDelivery />;
      case "Cancellation":
        return <Cancellation />;

      default:
        return null;
    }
  };

  useEffect(() => {
    requestRoutes();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <Header />
        <main className="bg-white px-4 lg:px-3">
          <Routes>
            {routes.map((route, index) =>
              route.submenus ? (
                <>
                  {route.submenus.map((submenu, i) => (
                    <Route
                      key={i}
                      path={`${submenu.path}`}
                      element={routeComponent(submenu.title, route)}
                    />
                  ))}
                </>
              ) : (
                <Route
                  key={index}
                  path={`${route.path}`}
                  element={routeComponent(route.title, route)}
                >
                  <Route
                    index
                    element={routeComponent(`parent-${route.title}`, route)}
                  />
                  {route.title === "Inventory" && (
                    <Route
                      key={`${index}-child`}
                      path="inventory-child/:id"
                      element={routeComponent(`child-${route.title}`, route)}
                    />
                  )}
                </Route>
              )
            )}
          </Routes>
        </main>
      </div>
    </>
  );
};

export default PageContent;
