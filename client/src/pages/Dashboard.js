import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { getMyProjects, deleteProject } from "../utils/FetchOperations";
import { setProject } from "../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projects, setprojects] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    syncProjects();
  }, []);

  const syncProjects = () => {
    getMyProjects(jwt)
      .then((data) => {
        console.log(data);
        setprojects(data.projects);
      })
      .catch((error) => console.log(error));
  };

  const handleClick = (e) => {
    const i = e.target.id;
    dispatch(setProject(projects[i]));
    navigate("/production");
  };

  const handleDelete = (e) => {
    if (window.confirm(`Supprimer le projet ?`)) {
      const projectId = e.currentTarget.getAttribute("id");
      const projectUser = e.currentTarget.getAttribute("name");
      const payload = { projectId, projectUser };
      deleteProject(jwt, payload)
        .then(() => {
          syncProjects();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <main className="main">
      <section>
        <h2>Mes projets</h2>
        <div className="projectsContainer">
          {projects.length !== 0 ? (
            <>
              <div className="classicButton green">CRÉER UN NOUVEAU PROJET</div>
              {projects.map((project, i) => {
                return (
                  <article className="document" key={i}>
                    <h4>{project.title}</h4>
                    <h6>
                      {project.support} ({project.theme})
                    </h6>
                    <img src={project.image} alt={project.image} />
                    <div
                      onClick={handleClick}
                      id={i}
                      className="classicButton deselect"
                    >
                      VOIR LE PROJET
                    </div>
                    <AiFillDelete
                      id={project._id}
                      name={project.user}
                      onClick={handleDelete}
                      className="icon delete"
                    />
                  </article>
                );
              })}
            </>
          ) : (
            <div className="classicButton green">CRÉER UN PREMIER PROJET</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
