import React from "react";
import Routes from "../src/routes/index.tsx";
import AuthProvider from "./app/AuthProvider.tsx";
import { TableProvider } from "./hooks/TableContext.tsx";

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <TableProvider>
          <Routes />
        </TableProvider>
      </AuthProvider>
    </>
  );
};

export default App;
