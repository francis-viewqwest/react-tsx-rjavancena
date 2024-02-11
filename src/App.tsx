import React from "react";
import Routes from "../src/routes/index.tsx";
import AuthProvider from "./app/AuthProvider.tsx";
const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;
