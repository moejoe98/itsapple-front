import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { MainRoutes, EndRoutes } from "./AppRoutes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const router = createBrowserRouter([ ...MainRoutes], {});

const theme = localStorage.getItem("theme");

export const AppRoutes = () => {
  const [dark, setDark] = useState(theme);

  useEffect(() => {
    window.addEventListener("theme", () => {
      const th = localStorage.getItem("theme");
      th === "dark" ? setDark("dark") : setDark("dark");
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={dark === "dark" ? darkTheme : darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};
