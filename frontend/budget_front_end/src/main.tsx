import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/auth_context.jsx";
import { BudgetsContextProvider } from "./context/budgets_context.js";
import { SidebarContextProvider } from "./context/sidebar_context.js";

import Main_page from "./pages/main_page";
import Login_page from "./pages/login_page";
import Sign_up_Page from "./pages/sign_up_page.js";
import Analysis_page from "./pages/analysis_page.js";
import AI_advice from "./pages/AI_advice.js";

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
  { path: "/analysis", element: <Analysis_page /> },
  { path: "/advice", element: <AI_advice /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SidebarContextProvider>
      <BudgetsContextProvider>
        <AuthContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthContextProvider>
      </BudgetsContextProvider>
    </SidebarContextProvider>
  </React.StrictMode>
);
