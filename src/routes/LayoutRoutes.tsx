import Menu from "../pages/admin/protected/Menu";
import Dashboard from "../pages/admin/protected/Dashboard";
import Inventory from "../pages/admin/protected/Inventory";

const routes = [
  {
    path: "/menu",
    title: "Menu",
    component: Menu,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/inventory",
    title: "Inventory",
    component: Inventory,
  },
];

export default routes;
