import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { HomeView } from "../views/home/HomeView";
import { Login } from "../views/login/Login";
import { Error } from "../views/error/Error";
import { OrderView } from "../views/orders/orderView";
import ProtectedRoutes from "./ProtRoutes";


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route index element={<Login/>}/>
        <Route path="*" element={<Error/>}/>

        <Route element={<ProtectedRoutes/>}>
          <Route path="/home">
            <Route index element={<HomeView />} />
            <Route path="orderview/:ID" element={<OrderView />} />
          </Route>
        </Route>
   
      </Routes>
    </BrowserRouter>
  );
}
