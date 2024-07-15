import React, { useEffect } from "react";
import Header from "./Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Menu from "../pages/admin/protected/Menu";
import Dashboard from "../pages/admin/protected/Dashboard";
import Inventory from "../pages/admin/protected/Inventory";
import ProductList from "../pages/admin/protected/ProductList";
import Users from "../pages/admin/protected/Users";
import Profile from "../pages/admin/protected/Profile";
import { setNavbar } from "@/app/slice/userSlice";
import { RouteType } from "@/interface/InterfaceType";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

//* SKELETON PAGES
import {
  MenuSkeleton,
  DashboardSkeleton,
  InventorySkeleton,
  UsersManagementSkeleton,
} from "../pages/admin/skeleton/SkeletonPage";

const PageContent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.user.data.nav_links);
  const pageLoading = useAppSelector((state) => state.user.loading);
  const errorNavbar = useAppSelector((state) => state.user.errorNavbar);

  console.log(errorNavbar);

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
      case "profile":
        return <Profile />;
      default:
        return console.log("404");
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
          {pageLoading && <InventorySkeleton />}
          {pageLoading && <UsersManagementSkeleton />}
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
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default PageContent;
