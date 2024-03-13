import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashBoardLayout,
  Error,
  Admin,
  AddShow,
  Stats,
  Profile,
  EditShow,
  AllShows,
} from "./pages/index.js";

import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { loader as dashboardLoader } from "./pages/DashBoardLayout.jsx";
import { action as addShowAction } from "./pages/AddShow.jsx";
import { loader as allShowsLoader } from "./pages/AllShows.jsx";
import { loader as editShowLoader } from "./pages/EditShow.jsx";
import { action as editShowAction } from "./pages/EditShow.jsx";
import { action as deleteShowAction } from "./pages/DeleteShow.jsx";
import { loader as adminLoader } from "./pages/Admin.jsx";
import { action as profileAction } from "./pages/Profile.jsx";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashBoardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddShow />, action: addShowAction },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-shows",
            element: <AllShows />,
            loader: allShowsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-show/:id",
            element: <EditShow />,
            loader: editShowLoader,
            action: editShowAction,
          },
          {
            path: "delete-show/:id",
            action: deleteShowAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
