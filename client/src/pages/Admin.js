import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  getProjects,
  deleteProjects,
  getCategories,
  deleteCategory,
  createCategory,
  getComments,
  deleteCommentAdmin,
} from "../utils/FetchOperations";
import { AiFillDelete } from "react-icons/ai";
import { addCategory, deleteOk } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../assets/styles/Admin.scss";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    syncUsers();
    syncProjects();
    syncCategories();
    syncComments();
  }, []);

  const syncComments = () => {
    getComments()
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.log(error));
  };

  const syncUsers = () => {
    getUsers()
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.log(error));
  };
  const syncProjects = () => {
    getProjects()
      .then((data) => {
        setProjects(data.projects);
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

  const handleDeleteUser = (e) => {
    if (window.confirm(`Supprimer l'utilisateur et les projets associés ?`)) {
      const id = e.currentTarget.getAttribute("id");
      deleteUser(id)
        .then(() => {
          deleteOk();
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
      deleteProjects(payload)
        .then(() => {
          syncProjects();
          deleteOk();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteCategory = (e) => {
    if (window.confirm(`Supprimer la catégorie ?`)) {
      const categoryId = e.currentTarget.getAttribute("id");
      deleteCategory({ categoryId })
        .then(() => {
          syncCategories();
          deleteOk();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteComment = (e) => {
    if (window.confirm(`Supprimer le commentaire ?`)) {
      const commentId = e.currentTarget.getAttribute("id");
      const payload = {
        commentId,
      };
      deleteCommentAdmin(payload)
        .then(() => {
          syncComments();
          deleteOk();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleSubmit = () => {
    const type = window.prompt("Type de catégorie");
    const name = window.prompt("Nom de la catégorie");
    if (window.confirm(`Créer la catégorie ${type + " " + name} ?`)) {
      const payload = {
        type,
        name,
      };
      createCategory(payload)
        .then(() => {
          syncCategories();
          addCategory();
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
                      <td id={user._id} onClick={handleDeleteUser}>
                        <AiFillDelete className="icon delete" />
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
                        <AiFillDelete className="icon delete" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="document">
          <h3>commentaires</h3>
          <table>
            <thead>
              <tr>
                <th>auteur</th>
                <th>commentaire</th>
                <th>projet</th>
              </tr>
            </thead>
            <tbody>
              {comments.length !== 0 &&
                comments.map((comment, i) => {
                  return (
                    <tr key={i}>
                      <td>{comment.publicUser}</td>
                      <td>{comment.message}</td>
                      <td>{comment.publicProject}</td>
                      <td onClick={handleDeleteComment} id={comment._id}>
                        <AiFillDelete className="icon delete" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="document">
          <h3>catégories</h3>
          <div onClick={handleSubmit} className="classicButton deselect">
            CRÉER UNE CATÉGORIE
          </div>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Nom</th>
              </tr>
            </thead>
            <tbody>
              {categories.length !== 0 &&
                categories.map((category, i) => {
                  return (
                    <tr key={i}>
                      <td>{category.type}</td>
                      <td>{category.name}</td>
                      <td onClick={handleDeleteCategory} id={category._id}>
                        <AiFillDelete className="icon delete" />
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
