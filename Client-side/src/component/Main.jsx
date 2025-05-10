import React, { useEffect } from "react";
import { Nav } from "../routing/Nav";
import { Provider } from "react-redux";
import store from "../redux/Store";
import { BrowserRouter, Outlet } from "react-router";
import { Routing } from "../routing/Routing";

export const Main = () => {
 return<>
 <Provider  store={store}>
 <BrowserRouter>
  <Routing/>
  </BrowserRouter>
  </Provider>
  </>
};

