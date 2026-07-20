import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Worker from "./pages/Worker";
import Check from "./pages/Check";
import Result from "./pages/Result";
import Memo from "./pages/Memo";
import Edit from "./pages/Edit";

export default function App() {

  return (

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
              path="/result"
              element={<Result />}
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

  );

}