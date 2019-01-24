import "react-app-polyfill/ie11";
// import "./polyphill";
import React from "react";
import ReactDOM from "react-dom";
import "./normalize.scss";
import "./index.scss";
import Root from "./components/Root";
import configureStore from "./configureStore";

const store = configureStore();
ReactDOM.render(<Root store={store} />, document.getElementById("root"));
