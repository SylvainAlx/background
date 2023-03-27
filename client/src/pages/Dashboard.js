import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import {
  getMyProjects,
  deleteProject,
  createProject,
  getCategories,
} from "../utils/FetchOperations";
import { setProject } from "../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";
import { tilesCounter } from "../utils/tilesCounter";
import { newElement, deleteOk } from "../utils/toast";
import "../assets/styles/Dashboard.scss";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [projects, setprojects] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newProjet, setNewProject] = useState({
    title: "",
    support: "",
    theme: "",
    description: "",
    children: [],
    isPublic: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    syncProjects();
    syncCategories();
  }, [user]);

  const syncProjects = () => {
    getMyProjects()
      .then((data) => {
        setprojects(data.projects);
      })
      .catch((error) => console.log(error));
  };

  const syncCategories = () => {
    getCategories()
      .then((data) => {
        setCategories(data.categories);
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
        const update = [...projects];
        update.push(data.project);
        setprojects(update);
        newElement();
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
          deleteOk();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <main className="main">
      <section>
        <h2>Mes projets</h2>
        {!displayForm && (
          <div
            onClick={() => setDisplayForm(true)}
            className="classicButton green"
          >
            NOUVEAU PROJET
          </div>
        )}
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
              {categories !== undefined &&
                categories.map((category, i) => {
                  if (category.type === "support") {
                    return (
                      <option key={i} value={category.name}>
                        {category.name}
                      </option>
                    );
                  }
                })}
            </select>
            <select
              name="theme"
              onChange={handleChange}
              value={newProjet.theme}
            >
              {categories !== undefined &&
                categories.map((category, i) => {
                  if (category.type === "theme") {
                    return (
                      <option key={i} value={category.name}>
                        {category.name}
                      </option>
                    );
                  }
                })}
            </select>
            <textarea
              onChange={handleChange}
              name="description"
              value={newProjet.description}
              placeholder="description"
            />
            <div onClick={createNewProject} className="classicButton green">
              CRÉER
            </div>
          </form>
        )}
        <div className="projectsContainer">
          {projects.length !== undefined && (
            <>
              {projects.map((project, i) => {
                return (
                  <article className="document" key={i}>
                    <h3>{project.title}</h3>
                    <h6>
                      {project.support} ({project.theme})
                    </h6>
                    <h6>Nombre d'éléments : {tilesCounter(project)}</h6>
                    {project.image !== "" ||
                      (project.image !== undefined && (
                        <img src={project.image} alt="image principale" />
                      ))}
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
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
