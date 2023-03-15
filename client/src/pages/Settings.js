import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../utils/FetchOperations";
import { setUser } from "../store/slices/userSlice";

const Settings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [edition, setEdtion] = useState(false);
  const [update, setUpdate] = useState({
    pseudo: user.pseudo,
    email: user.email,
  });
  const jwt = localStorage.getItem("jwt");

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
    updateUser(jwt, update)
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((error) => console.log(error));
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
              <div className="classicButton deselect">SUPPRIMER LE COMPTE</div>
            </>
          ) : (
            <>
              <div onClick={handleCancel} className="classicButton deselect">
                ANNULÉ
              </div>
              <div onClick={handleSubmit} className="classicButton deselect">
                VALIDER
              </div>
            </>
          )}
        </div>
        <div className="document">
          <h3>Personnalisation</h3>
          <div className="table">
            <div className="legend">
              <h4>Couleur 1</h4>
              <h4>Couleur 2</h4>
            </div>
            <div className="data">
              <input type="color" />
              <input type="color" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Settings;
