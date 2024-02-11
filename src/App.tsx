import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../src/pages/user/Home";
// import About from "../src/pages/user/About";
// import Shop from "../src/pages/user/Shop";
// import SignIn from "../src/pages/user/SignIn";
// import SignUp from "../src/pages/user/SignUp";
// import Navbar from "../src/components/user/navbar/components/Navbar";
// import Footer from "../src/components/user/footer/components/Footer";
import Routes from "../src/routes/index.tsx";
import AuthProvider from "./app/AuthProvider.tsx";
const App: React.FC = () => {
  return (
    <>
      {/* <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter> */}

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;
