import { useAuth } from "../app/AuthProvider";
import Home from "../pages/customer/Home";
import About from "../pages/customer/About";
import Shop from "../pages/customer/Shop";
import SignIn from "../pages/customer/SignIn";
import SignUp from "../pages/customer/SignUp";

import Layout from "../containers/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Routes = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ];

  const authCustomerRoutes = [
    {
      path: "/",
      element: <Layout />,
    },
  ];

  const authAdminRoutes = [
    {
      path: "/",
      element: <Layout />,
    },
  ];

  const noAuthRoutes = [
    {
      path: "/signin",
      element: <SignIn />,
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(!token ? noAuthRoutes : []),
    ...authCustomerRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
