import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPublics } from "../store/slices/publicsSlice.js";
import {
  getPublics,
  getComments,
  addComment,
  deleteComment,
} from "../utils/FetchOperations.js";
import { AiFillDelete } from "react-icons/ai";

const Publics = () => {
  const dispatch = useDispatch();
  const publics = useSelector((state) => state.publics);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getPublics()
      .then((data) => {
        dispatch(setPublics(data.publicProjects));
        console.log(data);
      })
      .catch((error) => console.log(error));
    getComments()
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      projectId: e.target.id,
      message: newComment,
    };
    addComment(payload).then((data) => {
      console.log(data);
    });

    const handleDelete = (e) => {
      deleteComment()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    };
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
                  <h4>{project.title}</h4>
                  <h6>
                    par {project.publicUser} | {project.support} (
                    {project.theme})
                  </h6>
                  <p>{project.description}</p>
                  <div className="commentContainer">
                    <h4>commentaires :</h4>
                    <form>
                      <textarea
                        onChange={handleChange}
                        name="message"
                        placeholder="message"
                      />
                      <div
                        onClick={handleSubmit}
                        id={project._id}
                        className="classicButton green"
                      >
                        POSTER
                      </div>
                    </form>
                    <AiFillDelete className="icon delete" />
                    {comments !== undefined &&
                      comments.map((comment, i) => {
                        if (comment.project === project._id) {
                          return <em>{comment.message}</em>;
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
