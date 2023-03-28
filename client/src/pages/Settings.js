import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser, deleteAccount } from "../utils/FetchOperations";
import { setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Settings.scss";

const Settings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edition, setEdtion] = useState(false);
  const [update, setUpdate] = useState({
    pseudo: user.pseudo,
    email: user.email,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUpdate({ ...update, [name]: value });
  };

  const handleEdit = (e) => {
    setEdtion(!edition);
  };

  const handleCancel = (e) => {
    setEdtion(!edition);
  };

  const handleSubmit = (e) => {
    setEdtion(!edition);
    updateUser(update)
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (e) => {
    if (
      window.confirm(
        `Etes-vous sûr de supprimer votre compte et tous les projets associés ?`
      )
    ) {
      deleteAccount()
        .then(() => {
          localStorage.removeItem("jwt");
          dispatch(setUser({ email: "", isAdmin: false }));
          navigate("/register");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <main className="main">
      <section>
        <h2>Paramètres</h2>
        <div className="document">
          <h3>informations du compte</h3>
          <div className="table">
            <div className="legend">
              <h4>Pseudo</h4>
              <h4>Email</h4>
              <h4>Mot de passe</h4>
            </div>
            <div className="data">
              {!edition ? (
                <>
                  <h5>{user.pseudo}</h5>
                  <h5>{user.email}</h5>
                  <h5>*****</h5>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="pseudo"
                    value={update.pseudo}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="email"
                    value={update.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="nouveau mot de passe"
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
          </div>
          {!edition ? (
            <>
              <div onClick={handleEdit} className="classicButton deselect">
                MODIFIER
              </div>
              <div onClick={handleDelete} className="classicButton red">
                SUPPRIMER LE COMPTE
              </div>
            </>
          ) : (
            <>
              <div onClick={handleCancel} className="classicButton deselect">
                ANNULER
              </div>
              <div onClick={handleSubmit} className="classicButton deselect">
                VALIDER
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Settings;
