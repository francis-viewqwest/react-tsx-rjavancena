import React from "react";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import routes from "../routes/LayoutRoutes";

const PageContent: React.FC = () => {
  return (
    <>
      <div className="yw-full yflex yflex-col ygap-5">
        <Header />
        <main className="bg-white m-10 ypx-7">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                exact={true}
                path={`${route.path}`}
                element={<route.component />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </>
  );
};

export default PageContent;
