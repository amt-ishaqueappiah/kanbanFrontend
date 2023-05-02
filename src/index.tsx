import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import ContextProvider from "./context/dataContext";
import { ThemeProvider } from "./context/ThemesContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(

    <ThemeProvider>  
        <ContextProvider>
          <App />
        </ContextProvider>
    </ThemeProvider>
);
