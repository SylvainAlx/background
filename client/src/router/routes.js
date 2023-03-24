//pages
import Home from "../pages/Home.js";
import Publics from "../pages/Publics.js";
import Dashboard from "../pages/Dashboard.js";
import Production from "../pages/Production.js";
import Login from "../pages/Login.js";
import Register from "../pages/Register.js";
import Admin from "../pages/Admin.js";
import Settings from "../pages/Settings.js";

export const publicRoutes = [
  { path: "/", page: <Home /> },
  { path: "/publics", page: <Publics /> },
  { path: "/register", page: <Register /> },
  { path: "/login", page: <Login /> },
];

export const privateRoutes = [
  { path: "/dashboard", page: <Dashboard /> },
  { path: "/production", page: <Production /> },
  { path: "/settings", page: <Settings /> },
];

export const adminRoutes = [{ path: "/admin", page: <Admin /> }];
