import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  getProjects,
  deleteProjects,
  getTemplates,
  deleteTemplate,
} from "../utils/FetchOperations";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [templates, setTemplates] = useState([]);
  const user = useSelector((state) => state.user);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  useEffect(() => {
    syncUsers();
    syncProjects();
    syncTemplates();
  }, []);

  const syncUsers = () => {
    getUsers(jwt)
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.log(error));
  };
  const syncProjects = () => {
    getProjects(jwt)
      .then((data) => {
        setProjects(data.projects);
      })
      .catch((error) => console.log(error));
  };

  const syncTemplates = () => {
    getTemplates(jwt)
      .then((data) => {
        setTemplates(data.templates);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteUser = (e) => {
    if (window.confirm(`Supprimer l'utilisateur et les projets associés ?`)) {
      const id = e.currentTarget.getAttribute("id");
      const index = e.currentTarget.getAttribute("index");
      deleteUser(jwt, id)
        .then((data) => {
          console.log(data);
          syncProjects();
          syncUsers();
          if (user.id === id) {
            navigate("/register");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteProject = (e) => {
    if (window.confirm(`Supprimer le projet ?`)) {
      const projectId = e.currentTarget.getAttribute("id");
      const projectUser = e.currentTarget.getAttribute("name");
      const payload = {
        projectId,
        projectUser,
      };
      deleteProjects(jwt, payload)
        .then(() => {
          syncProjects();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteTemplate = (e) => {
    if (window.confirm(`Supprimer le modèle ?`)) {
      const templateId = e.currentTarget.getAttribute("id");
      deleteTemplate(jwt, { templateId })
        .then(() => {
          syncTemplates();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <main className="main">
      <section>
        <h2>Administration</h2>
        <div className="document">
          <h3>utilisateurs</h3>
          <table>
            <thead>
              <tr>
                <th>pseudo</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {users.length !== 0 &&
                users.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td>{user.pseudo}</td>
                      <td>{user.email}</td>
                      <td id={user._id} index={i} onClick={handleDeleteUser}>
                        <AiFillDelete className="icon" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="document">
          <h3>projets</h3>
          <table>
            <thead>
              <tr>
                <th>titre</th>
                <th>support</th>
                <th>auteur</th>
              </tr>
            </thead>
            <tbody>
              {projects.length !== 0 &&
                projects.map((project, i) => {
                  return (
                    <tr key={i}>
                      <td>{project.title}</td>
                      <td>{project.support}</td>
                      <td>{project.publicUser}</td>
                      <td
                        id={project._id}
                        name={project.user}
                        index={i}
                        onClick={handleDeleteProject}
                      >
                        <AiFillDelete className="icon" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="document">
          <h3>modèles</h3>
          <div className="classicButton deselect">CRÉER UN MODÈLE</div>
          <table>
            <thead>
              <tr>
                <th>thème</th>
              </tr>
            </thead>
            <tbody>
              {templates.length !== 0 &&
                templates.map((template, i) => {
                  return (
                    <tr key={i}>
                      <td>{template.theme}</td>
                      <td onClick={handleDeleteTemplate} id={template._id}>
                        <AiFillDelete className="icon" />
                      </td>
                      <td id={template._id}>
                        <AiFillEdit className="icon" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Admin;
