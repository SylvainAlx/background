//dépendances
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/slices/userSlice.js";
//layouts et pages
import { Layout } from "./layouts/Layout.js";
import { adminRoutes, privateRoutes, publicRoutes } from "./router/routes.js";
//assets
import "./assets/styles/App.scss";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      fetch("http://localhost:9875/auth/verify", {
        headers: { authorization: `Bearer ${jwt}` },
      })
        .then((resp) => resp.json())
        .then((json) => dispatch(setUser(json)));
    } else {
      dispatch(setUser({ pseudo: "", email: "", isAdmin: false }));
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, i) => (
            <Route
              path={route.path}
              element={<Layout>{route.page}</Layout>}
              key={i}
            />
          ))}
          {user.email !== "" && (
            <>
              {privateRoutes.map((route, i) => (
                <Route
                  path={route.path}
                  element={<Layout key={i}>{route.page}</Layout>}
                />
              ))}
            </>
          )}
          {user.isAdmin === true && (
            <>
              {adminRoutes.map((route, i) => (
                <Route
                  path={route.path}
                  element={<Layout key={i}>{route.page}</Layout>}
                />
              ))}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
