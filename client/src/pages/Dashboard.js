import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import {
  getMyProjects,
  deleteProject,
  createProject,
} from "../utils/FetchOperations";
import { setProject } from "../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";
import { projectSupports, projectThemes } from "../utils/projectSelect";

const Dashboard = () => {
  const [projects, setprojects] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [newProjet, setNewProject] = useState({
    title: "",
    support: projectSupports[0],
    theme: projectThemes[0],
    children: [],
    isPublic: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    syncProjects();
  }, []);

  const syncProjects = () => {
    getMyProjects()
      .then((data) => {
        setprojects(data.projects);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewProject({ ...newProjet, [name]: value });
  };
  const handleClick = (e) => {
    const i = e.target.id;
    dispatch(setProject(projects[i]));
    navigate("/production");
  };

  const createNewProject = () => {
    createProject(newProjet)
      .then((data) => {
        console.log(data);

        const update = [...projects];
        update.push(data.project);
        setprojects(update);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (e) => {
    if (window.confirm(`Supprimer le projet ?`)) {
      const projectId = e.currentTarget.getAttribute("id");
      const projectUser = e.currentTarget.getAttribute("name");
      const payload = { projectId, projectUser };
      deleteProject(payload)
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
        <div
          onClick={() => setDisplayForm(true)}
          className="classicButton green"
        >
          CRÉER UN NOUVEAU PROJET
        </div>
        {displayForm && (
          <form>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={newProjet.title}
              placeholder="titre"
              required
            />
            <select
              name="support"
              onChange={handleChange}
              value={newProjet.support}
            >
              {projectSupports.map((support, i) => {
                return (
                  <option key={i} value={support}>
                    {support}
                  </option>
                );
              })}
            </select>
            <select
              name="theme"
              onChange={handleChange}
              value={newProjet.theme}
            >
              {projectThemes.map((theme, i) => {
                return (
                  <option key={i} value={theme}>
                    {theme}
                  </option>
                );
              })}
            </select>
            <div onClick={createNewProject} className="classicButton green">
              CRÉER
            </div>
          </form>
        )}
        <div className="projectsContainer">
          {projects.length !== 0 ? (
            <>
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
