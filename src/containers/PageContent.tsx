import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Menu from "../pages/admin/protected/Menu";
import Dashboard from "../pages/admin/protected/Dashboard";
import Inventory from "../pages/admin/protected/Inventory";
import ProductList from "../pages/admin/protected/ProductList";
import Users from "../pages/admin/protected/Users";
import { setNavbar } from "@/app/slice/userSlice";
import { useDispatch } from "react-redux";
import useAxiosClient from "@/axios-client";
import { RouteType } from "@/interface/InterfaceType";

const PageContent: React.FC = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const axiosClient = useAxiosClient();

  const requestRoutes = async () => {
    try {
      const res = await axiosClient.get("/role-nav-links");

      setRoutes(res.data.nav_links);
      dispatch(setNavbar(res.data.nav_links));
    } catch (error) {
      navigate("/");
    }
  };

  const routeComponent = (key: string, routeData: RouteType) => {
    switch (key) {
      case "parent-Menu":
        return <Menu {...routeData} />;
      case "parent-Dashboard":
        return <Dashboard routeData={routeData} />;
      case "parent-Inventory":
        return <Inventory {...routeData} />;
      case "child-Inventory":
        return <ProductList />;
      case "parent-Users":
        return <Users routeData={routeData} />;
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
            {routes.map(
              (route: RouteType, index: number) =>
                route && (
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
