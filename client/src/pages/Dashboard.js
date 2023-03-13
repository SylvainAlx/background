import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <main className="main">
        <h2>Tableau de bord de {user.pseudo}</h2>
        <input type="text" name="search" placeholder="RECHERCHER"></input>
      </main>
    </>
  );
};

export default Dashboard;
