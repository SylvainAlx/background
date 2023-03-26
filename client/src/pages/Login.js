import { useEffect, useState } from "react";
import { setUser } from "../store/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFetch } from "../utils/FetchOperations.js";
import "../assets/styles/ClassicButton.scss";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginFetch(userData)
      .then((data) => {
        if (data.user) {
          dispatch(setUser(data.user));
          localStorage.setItem("jwt", data.jwt);
          navigate("/dashboard");
        } else {
          setError(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className="main">
      <section>
        <h2>Déjà un compte ?</h2>
        <form className="authForm" onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <input
              type="email"
              name="email"
              placeholder="e-mail"
              value={userData.email}
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              autoComplete="on"
              placeholder="mot de passe"
              value={userData.password}
              required
              onChange={handleChange}
            />
            <div className="error">{error}</div>
            <div className="validateButton classicButton deselect">
              <input type="submit" value="se connecter" />
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default Login;
