import { useAuth } from "../app/AuthProvider";
import Home from "../pages/user/public/Home";
import Shop from "../pages/user/public/Shop";
import ShopCategory from "@/pages/user/public/ShopCategory";
import About from "../pages/user/public/About";
import SignIn from "../pages/user/public/SignIn";
import SignUp from "../pages/user/public/SignUp";
import ForgotPassword from "../pages/user/public/ForgotPassword";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../containers/Layout";
import PublicLayout from "../pages/user/PublicLayout";
import VerifyEmail from "../pages/user/protected/VerifyEmail";
import UpdatePassword from "../pages/user/protected/UpdatePassword";

//* Admin Pages Element
import Menu from "../pages/admin/protected/Menu";
import Dashboard from "../pages/admin/protected/Dashboard";
import Inventory from "../pages/admin/protected/Inventory";
import Users from "../pages/admin/protected/Users";
import Orders from "../pages/admin/protected/Orders";
import ProductList from "../pages/admin/protected/ProductList";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Routes: React.FC = () => {
  const { token } = useAuth();

  const fetchEudevice = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "eu-device");

      Cookies.set("eu", res.data.eu);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEudevice();
  }, []);

  //* Public Routes
  const publicRoutes = [
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          path: "/",
          element: <SignIn />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/shop/:category",
          element: <ShopCategory />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
  ];

  //* Register Auth Routes
  const registerAuthUser = [
    {
      path: "/signup/verify-email",
      element: <VerifyEmail />,
    },
    {
      path: "/update-password",
      element: <UpdatePassword />,
    },
  ];

  //* Authenticated User Routes
  // const authUserRoutes = [
  //   {
  //     path: "user/*",
  //     element: <Layout />,
  //     children: [
  //       {
  //         path: "home",
  //         element: <Home />,
  //       },
  //       {
  //         path: "shop",
  //         element: <Shop />,
  //       },
  //       {
  //         path: "about",
  //         element: <About />,
  //       },
  //     ],
  //   },
  // ];

  //* Authenticated Admin Routes
  const authAdmin = [
    {
      path: "/app/*",
      element: <Layout />,
      // children: [
      //   {
      //     path: "menu",
      //     element: <Menu />,
      //   },
      //   {
      //     path: "dashboard",
      //     element: <Dashboard />,
      //   },
      //   {
      //     path: "inventory",
      //     element: <Inventory />,
      //   },
      //   {
      //     path: "product-list",
      //     element: <ProductList />,
      //   },
      //   {
      //     path: "users",
      //     element: <Users />,
      //   },
      //   {
      //     path: "customer",
      //     element: "/customer",
      //   },
      //   {
      //     path: "orders",
      //     element: <Orders />,
      //   },
      // ],
    },
  ];

  const noAuthUserRoutes = [
    {
      path: "/signin",
      element: <SignIn />,
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!token ? noAuthUserRoutes : []),
    ...authAdmin,
    ...registerAuthUser,
    // ...authUserRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
