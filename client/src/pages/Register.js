import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { registerFetch } from "../utils/FetchOperations";
import { setUser } from "../store/slices/userSlice.js";

const Register = () => {
  const [userData, setUserData] = useState({
    pseudo: "",
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
    registerFetch(userData)
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
        <h2>Pas encore de compte ?</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <input
              type="text"
              name="pseudo"
              placeholder="nom d'utilisateur"
              value={userData.pseudo}
              required
              onChange={handleChange}
            />
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
              <input type="submit" value="créer un compte" />
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default Register;
