import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import { Provider } from "react-redux";
import "./index.css";
import AppRouter from "./routes/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <RouterProvider router={AppRouter} />
    {/* </Provider> */}
  </React.StrictMode>
);
