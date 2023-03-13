import { useState } from "react";
import { setUser } from "../store/slices/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/styles/ClassicButton.scss";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFetch = async () => {
    fetch("http://localhost:9875/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setUser(data));
        localStorage.setItem("jwt", data.jwt);
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    loginFetch();
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
