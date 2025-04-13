import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
     <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster/>
  </Provider>
);
