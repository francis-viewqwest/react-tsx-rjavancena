import { useAuth } from "../app/AuthProvider";
import Home from "../pages/user/public/Home";
import Shop from "../pages/user/public/Shop";
import About from "../pages/user/public/About";
import SignIn from "../pages/user/public/SignIn";
import SignUp from "../pages/user/public/SignUp";
import ForgotPassword from "../pages/user/public/ForgotPassword";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../containers/Layout";
import PublicLayout from "../pages/user/PublicLayout";
import VerifyEmail from "../pages/user/protected/VerifyEmail";
import UpdatePassword from "../pages/user/protected/UpdatePassword";

const Routes: React.FC = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
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
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
      ],
    },
  ];

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

  const authUserRoutes = [
    {
      path: "user/*",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "about",
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
    ...registerAuthUser,
    ...authUserRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
