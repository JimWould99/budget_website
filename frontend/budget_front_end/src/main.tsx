import React from "react";
import { useContext } from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider, AuthContext } from "./context/auth_context.jsx";

import Main_page from "./pages/main_page";
import Login_page from "./pages/login_page";
import Sign_up_Page from "./pages/sign_up_page.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_page />,
  },
  {
    path: "/login",
    element: <Login_page />,
  },
  {
    path: "/sign_up",
    element: <Sign_up_Page />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
