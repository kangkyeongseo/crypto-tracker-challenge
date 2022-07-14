import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Coin from "./Routes/Coin";
import Price from "./Routes/Price";
import Chart from "./Routes/Chart";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path=":coinId" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
