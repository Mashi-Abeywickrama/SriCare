import { React, useState } from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
  BrowserRouter,
  Routes,
  Router,
} from "react-router-dom";

import { useSession } from "./constants/SessionContext";

import Rootlayout from "./layouts/Rootlayout";
import Login from "./pages/visitor/login";
import SignUp from "./pages/visitor/signup";
import OnlyHeaderRootlayout from "./layouts/OnlyHeaderRootlayout";

const routes = (
  <>
    <Route path="/" element={<Rootlayout />} errorElement={<Error />}>
      <Route index element={<Login />} />

    </Route>
    <Route
      path="/login"
      element={<OnlyHeaderRootlayout />}
      // errorElement={<Error />}
    >
      <Route
        index
        element={
          <>
            {/* <AlertPopup /> */}
            <Login />
          </>
        }
      />
    </Route>
    <Route
      path="/signup"
      element={<OnlyHeaderRootlayout />}
      // errorElement={<Error />}
    >
      <Route index element={<SignUp />} />
    </Route>
  </>
);

const App = () => {
  const currentURL = window.location.href;
  const sessionItems = useSession();
  const splitURL = currentURL.split("/");
  if (
    splitURL[3] === "customer"
  ) {
    console.log(sessionItems.sessionData);
    if (
      sessionItems.sessionData === null ||
      sessionItems.sessionData.userType === undefined
    ) {
      window.location.href = "/login";
    } else {
      if (sessionItems.sessionData.userType !== splitURL[3]) {
        window.location.href = "/login";
      } else {
        const router = createBrowserRouter(createRoutesFromElements(routes));
        return <RouterProvider router={router} />;
      }
    }
  } else {
    const router = createBrowserRouter(createRoutesFromElements(routes));
    return <RouterProvider router={router} />;
  }
};

export default App;
