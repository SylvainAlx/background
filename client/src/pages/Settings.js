import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector((state) => state.user);

  return (
    <main className="main">
      <section>
        <h2>Paramètres</h2>
        <div className="document">
          <table>
            <thead>
              <tr>
                <th colSpan="2">informations du compte</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>pseudo</th>
                <td>{user.pseudo}</td>
              </tr>
              <tr>
                <th>email</th>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
          <div className="classicButton deselect">MODIFIER</div>
          <div className="classicButton deselect">SUPPRIMER</div>
        </div>
      </section>
    </main>
  );
};

export default Settings;
