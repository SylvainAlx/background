import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPublics } from "../store/slices/publicsSlice.js";
import { tilesCounter } from "../utils/tilesCounter.js";
import {
  getPublics,
  getComments,
  addComment,
  deleteComment,
} from "../utils/FetchOperations.js";
import { AiFillDelete } from "react-icons/ai";
import { commentOk, deleteOk } from "../utils/toast.js";
import "../assets/styles/Publics.scss";

const Publics = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const publics = useSelector((state) => state.publics);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showForm, setShowForm] = useState(0);

  useEffect(() => {
    syncPublics();
    syncComments();
  }, []);

  const syncComments = () => {
    getComments()
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.log(error));
  };

  const syncPublics = () => {
    getPublics()
      .then((data) => {
        dispatch(setPublics(data.publicProjects));
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleClick = (e) => {
    showForm !== 0 ? setShowForm(0) : setShowForm(e.target.id);
  };

  const handleSubmit = (e) => {
    if (window.confirm(`Poster le commentaire ?`)) {
      e.preventDefault();
      const payload = {
        projectId: e.target.id,
        message: newComment,
      };
      addComment(payload).then(() => {
        syncComments();
        commentOk();
      });
    }
  };
  const handleDelete = (e) => {
    if (window.confirm(`Supprimer le commentaire ?`)) {
      const commentId = e.currentTarget.getAttribute("id");
      const commentUser = e.currentTarget.getAttribute("name");
      const payload = {
        commentId,
        commentUser,
      };
      deleteComment(payload)
        .then(() => {
          syncComments();
          deleteOk();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <main className="main">
      <section>
        <h2>Projets publics</h2>
        <div className="projectsContainer">
          {publics.projects.length !== 0 ? (
            publics.projects.map((project, i) => {
              return (
                <article className="document" key={i}>
                  <h3>{project.title}</h3>
                  <h6>par {project.publicUser}</h6>
                  <h6>
                    {project.support} ({project.theme})
                  </h6>
                  <h6>Nombre d'élément(s) : {tilesCounter(project)}</h6>
                  <p>{project.description}</p>

                  <div className="commentContainer">
                    {user.pseudo !== undefined && (
                      <div>
                        <div
                          id={project._id}
                          className="classicButton green"
                          onClick={handleClick}
                        >
                          COMMENTER
                        </div>
                        {showForm === project._id && (
                          <form>
                            <textarea
                              onChange={handleChange}
                              name="message"
                              placeholder="message"
                              className="commentArea"
                            />
                            <div
                              onClick={handleSubmit}
                              id={project._id}
                              className="classicButton green"
                            >
                              POSTER
                            </div>
                          </form>
                        )}
                      </div>
                    )}
                    {comments !== undefined &&
                      comments.map((comment, i) => {
                        if (comment.project === project._id) {
                          return (
                            <div className="comment" key={i}>
                              <span>{comment.message} </span>
                              <em>par {comment.publicUser}</em>
                              {comment.user === user.id && (
                                <AiFillDelete
                                  id={comment._id}
                                  name={comment.user}
                                  className="icon delete"
                                  onClick={handleDelete}
                                />
                              )}
                            </div>
                          );
                        }
                      })}
                  </div>
                </article>
              );
            })
          ) : (
            <h4>Aucun projet public</h4>
          )}
        </div>
      </section>
    </main>
  );
};

export default Publics;
