import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/users/Users";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Product from "./pages/Products/Product";
import NewProduct from "./pages/Products/NewProduct";
import NewUser from "./pages/users/newUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/user"} element={<Users />} />
        <Route path={"/product"} element={<Product />} />
        <Route path={"/new-product"} element={<NewProduct />} />
        <Route path="/product/:productId/edit" element={<NewProduct />} />
        <Route path={"/new-user"} element={<NewUser />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
