import "./App.css";
import Home from "./pages/Home";

import Cricket from "./assets/cricketground.jpg";
import { Route, Routes } from "react-router-dom";
import InningScore from "./components/InningScore";
function App() {
  return (
    <div className=" w-[100%] border">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/inningscore"
          element={<InningScore />}
        />
      </Routes>
    </div>
  );
}

export default App;
