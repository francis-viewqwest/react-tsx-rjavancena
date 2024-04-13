import React from "react";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import routes from "../routes/LayoutRoutes";

const PageContent: React.FC = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <Header />
        <main className="bg-white px-4 lg:px-3">
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
