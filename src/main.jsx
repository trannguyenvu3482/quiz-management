import "./init.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router/router.jsx";
import { Provider } from "react-redux";
import "nprogress/nprogress.css";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-18-image-lightbox/style.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
);
