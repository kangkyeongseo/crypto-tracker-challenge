import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./Routes/Coin";
import Home from "./Routes/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path=":coinid" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
