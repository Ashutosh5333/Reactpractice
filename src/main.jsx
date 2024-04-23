import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextProvider from "./ContextApi/ContextProvider.jsx";
import MachineProvider from "./machine/MachineProvider.jsx";
import { Provider } from "react-redux";
// import { store } from "./machine/store.jsx";
import {store} from "./Redux/store.jsx"
import ErrorBoundary from "./Errorboundry/ErrorBoundary.jsx";
// console.log("storee",store)


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    
  </React.StrictMode>
);
