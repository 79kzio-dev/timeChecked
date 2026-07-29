import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Worker from "./pages/Worker";
import Check from "./pages/Check";
import Memo from "./pages/Memo";
import Edit from "./pages/Edit";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "./theme.ts";

export default function App() {

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/worker"
            element={<Worker />}
          />
          <Route
            path="/check"
            element={<Check />}
          />
          <Route
            path="/memo"
            element={<Memo />}
          />
          <Route
            path="/edit"
            element={<Edit />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}