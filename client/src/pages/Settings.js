import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector((state) => state.user);

  return (
    <main className="main">
      <section>
        <h2>Paramètres</h2>
        <table className="document">
          <thead>
            <tr>
              <th colspan="2">informations du compte</th>
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
          <tfoot>
            <th>
              <div className="classicButton deselect">MODIFIER</div>
            </th>
            <th>
              <div className="classicButton deselect">SUPPRIMER</div>
            </th>
          </tfoot>
        </table>
      </section>
    </main>
  );
};

export default Settings;
