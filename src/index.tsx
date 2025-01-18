import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider
import { store } from "./redux/store"; // Import the Redux store
import { AppRoutes } from "./navigation/Routes"; // Import AppRoutes
import "./index.scss"; // Import your styles

const createdStore = store();

ReactDOM.render(
  <Provider store={createdStore}>
    <AppRoutes />
  </Provider>,
  document.getElementById("root")
);
