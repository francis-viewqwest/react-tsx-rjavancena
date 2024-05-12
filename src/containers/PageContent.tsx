import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Routes, Route, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";
import Menu from "../pages/admin/protected/Menu";
import Dashboard from "../pages/admin/protected/Dashboard";
import Inventory from "../pages/admin/protected/Inventory";
import ProductList from "../pages/admin/protected/ProductList";
import Users from "../pages/admin/protected/Users";
import CustomerOrder from "../pages/admin/protected/CustomerOrder";
import ReturnOrder from "../pages/admin/protected/ReturnOrder";
import FailedDelivery from "../pages/admin/protected/FailedDelivery";
import Cancellation from "../pages/admin/protected/Cancellation";
import { setNavbar } from "@/app/slice/UserSlice";
import { useDispatch } from "react-redux";

const PageContent: React.FC = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestRoutes = async () => {
    const newToken = Cookies.get("token");

    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "role-nav-links",
        { headers: { Authorization: `Bearer ${newToken}` } }
      );

      console.log(res);
      setRoutes(res.data.nav_links);
      dispatch(setNavbar(res.data.nav_links));
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    requestRoutes();
  }, []);

  interface RouteData {
    path_key: string;
  }

  const routeComponent = (key: string, routeData: RouteData) => {
    // console.log(routeData);

    switch (key) {
      case "Menu":
        return <Menu />;
      case "Dashboard":
        return <Dashboard />;
      case "Inventory":
        return <Inventory routeData={routeData} />;
      case "Product List":
        return <ProductList />;
      case "Users":
        return <Users />;
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
                />
              )
            )}
          </Routes>
        </main>
      </div>
    </>
  );
};

export default PageContent;
