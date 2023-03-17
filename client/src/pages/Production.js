import { useDispatch, useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { setProject } from "../store/slices/projectSlice";
import { projectSupports, projectThemes } from "../utils/projectSelect";
import { updateProject } from "../utils/FetchOperations";
import { tileModel } from "../utils/tileModel";
import { useEffect } from "react";
import Tile from "../components/tile/Tile";

const Production = () => {
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    console.log(project);
  }, [project]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    dispatch(setProject({ ...project, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(jwt, project)
      .then((result) => {
        dispatch(setProject(result.project));
      })
      .catch((error) => console.log(error));
  };

  const handleClick = (e) => {
    const newTile = tileModel;
    const updateData = Object.assign([], project.data);
    updateData.push(newTile);
    dispatch(setProject({ ...project, data: updateData }));
  };

  return (
    <main className="main">
      <section>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <h3>Informations générales</h3>
            <em>visibilité</em>
            {project.isPublic ? <AiFillEye /> : <AiFillEyeInvisible />}
            <select
              name="isPublic"
              onChange={handleChange}
              value={project.isPublic}
            >
              <option value={true}>public</option>
              <option value={false}>privé</option>
            </select>
            <em>titre</em>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
            />
            <em>support</em>
            <select
              name="support"
              onChange={handleChange}
              value={project.support}
            >
              {projectSupports.map((support, i) => {
                return (
                  <option key={i} value={support}>
                    {support}
                  </option>
                );
              })}
            </select>
            <em>thème</em>
            <select name="theme" onChange={handleChange} value={project.theme}>
              {projectThemes.map((theme, i) => {
                return (
                  <option key={i} value={theme}>
                    {theme}
                  </option>
                );
              })}
            </select>
            <div className="validateButton classicButton green">
              <input type="submit" value="sauvegarder" />
            </div>
          </fieldset>
        </form>
        <div className="document">
          <h3>Données du projet</h3>
          <div onClick={handleClick} className="classicButton deselect">
            CRÉER UNE CATÉGORIE
          </div>
          {project.data.length !== 0 &&
            project.data.map((element, i) => {
              return <Tile key={i} element={element} index={i} />;
            })}
        </div>
      </section>
    </main>
  );
};

export default Production;
