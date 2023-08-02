import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#C2DEDC",
    },
    secondary: {
      main: "#116A7B",
    },
    neutral: {
      contrastText: "#FFFFF",
    }
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
