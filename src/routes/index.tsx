import { useAuth } from "../app/AuthProvider";
import Home from "../pages/user/Home";
import Shop from "../pages/user/Shop";
import About from "../pages/user/About";
import SignIn from "../pages/user/SignIn";
import SignUp from "../pages/user/SignUp";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../containers/Layout";
import Navbar from "../../src/components/user/navbar/components/Navbar";

const Routes: React.FC = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/shop",
      element: <Shop />,
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
  ];

  const authUserRoutes = [
    {
      path: "/user",
      element: <Layout />,
      children: [
        {
          path: "/user/",
          element: <Home />,
        },
        {
          path: "/user/shop",
          element: <Shop />,
        },
        {
          path: "/user/about",
          element: <About />,
        },
      ],
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
    ...authUserRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
