import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Menu from "../pages/admin/protected/Menu";
import Dashboard from "../pages/admin/protected/Dashboard";
import Inventory from "../pages/admin/protected/Inventory";
import ProductList from "../pages/admin/protected/ProductList";
import Users from "../pages/admin/protected/Users";
import { setNavbar } from "@/app/slice/userSlice";
import { RouteType } from "@/interface/InterfaceType";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

//* SKELETON PAGES
import {
  MenuSkeleton,
  DashboardSkeleton,
} from "../pages/admin/skeleton/SkeletonPage";

const PageContent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.user.data.nav_links);
  const pageLoading = useAppSelector((state) => state.user.loading);
  const location = useLocation();

  const requestRoutes = async () => {
    try {
      await dispatch(
        setNavbar({
          url: "/role-nav-links",
          method: "GET",
        })
      );
    } catch (error) {
      navigate("/");
    }
  };

  const routeComponent = (key: string, routeData: RouteType) => {
    switch (key) {
      case "parent-Menu":
        return <Menu {...routeData} />;
      case "parent-Dashboard":
        return <Dashboard {...routeData} />;
      case "parent-Inventory":
        return <Inventory {...routeData} />;
      case "child-Inventory":
        return <ProductList />;
      case "parent-Users":
        return <Users {...routeData} />;
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
          {pageLoading && <MenuSkeleton />}
          {pageLoading && <DashboardSkeleton />}
          <Routes>
            {routes &&
              routes.map(
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
                          element={routeComponent(
                            `child-${route.title}`,
                            route
                          )}
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
