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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    loginFetch(userData)
      .then((data) => {
        if (data.user) {
          dispatch(setUser(data.user));
          localStorage.setItem("jwt", data.jwt);
          navigate("/dashboard");
        } else {
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className="main">
      <h3>Déjà un compte ?</h3>
      <form>
        <fieldset className="userFieldset">
          <legend>Connectez-vous</legend>
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
          <div onClick={handleClick}>
            <input
              className="classicButton"
              type="submit"
              value="se connecter"
              onClick={handleClick}
            />
          </div>
        </fieldset>
      </form>
    </main>
  );
};

export default Login;
