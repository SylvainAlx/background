import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPublics } from "../store/slices/publicsSlice.js";
import { getPublics } from "../utils/FetchOperations.js";

const Publics = () => {
  const dispatch = useDispatch();
  const publics = useSelector((state) => state.publics);

  useEffect(() => {
    getPublics()
      .then((data) => {
        dispatch(setPublics(data.publicProjects));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="main">
      <section>
        <h2>Projets publics</h2>
        <div className="projectsContainer">
          {publics.projects.length !== 0 ? (
            publics.projects.map((project, i) => {
              return (
                <article key={i}>
                  <h4>{project.title}</h4>
                  <h5>{project.support}</h5>
                  <h6>{project.theme}</h6>
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
