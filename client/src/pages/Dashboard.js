import { useEffect, useState } from "react";
//import { useSelector } from "react-redux";
import { getMyProjects } from "../utils/FetchOperations";

const Dashboard = () => {
  //const user = useSelector((state) => state.user);
  const [projects, setprojects] = useState([]);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    getMyProjects(jwt)
      .then((data) => {
        console.log(data);
        setprojects(data.projects);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="main">
      <section>
        <h2>Mes projets</h2>
        <div className="projectsContainer">
          {projects.length !== 0 ? (
            projects.map((project, i) => {
              return (
                <article className="document" key={i}>
                  <h4>{project.title}</h4>
                  <h6>
                    {project.support} ({project.theme})
                  </h6>
                </article>
              );
            })
          ) : (
            <h4>Aucun projet</h4>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
