//pages
import Home from "../pages/Home.js";
import Dashboard from "../pages/Dashboard.js";
import Login from "../pages/Login.js";
import Register from "../pages/Register.js";

export const publicRoutes = [
  { path: "/", page: <Home /> },
  { path: "/register", page: <Register /> },
  { path: "/login", page: <Login /> },
];

export const privateRoutes = [{ path: "/dashboard", page: <Dashboard /> }];

export const adminRoutes = [];
