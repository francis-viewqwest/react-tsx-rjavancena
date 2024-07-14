import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./app/store.ts";
import "./index.css";
import "unfonts.css";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
  // </React.StrictMode>,
);
