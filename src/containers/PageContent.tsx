import React from "react";
import Header from "./Header";

const PageContent: React.FC = () => {
  return (
    <>
      <div className="yw-full yflex yflex-col ygap-5">
        <Header />
        <main className="bg-white m-10 ypx-7"></main>
      </div>
    </>
  );
};

export default PageContent;
