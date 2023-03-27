import { useDispatch, useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { setProject, createChildren } from "../store/slices/projectSlice";
import { updateProject, getCategories } from "../utils/FetchOperations";
import { useEffect, useState } from "react";
import Tile from "../components/tile/Tile";
import ValidateButton from "../components/buttons/ValidateButton";
import CreateTile from "../components/tile/CreateTile";
import "../assets/styles/Production.scss";

const Production = () => {
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    syncCategories();
  }, []);

  const syncCategories = () => {
    getCategories()
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setSaved(false);
    const value = e.target.value;
    const name = e.target.name;
    dispatch(setProject({ ...project, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(project)
      .then((result) => {
        dispatch(setProject(result.project));
        setSaved(true);
        window.alert("sauvegarde effectuée");
      })
      .catch((error) => console.log(error));
  };

  const handleClick = (e) => {
    const newTile = CreateTile(0);
    const updateData = [...project.children];
    updateData.push(newTile);
    dispatch(createChildren({ project, tile: newTile }));
  };

  return (
    <main className="main">
      <section className="production">
        <form>
          <fieldset className="fieldset">
            <h3>Informations générales</h3>
            <div>
              {project.isPublic ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>

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
            <em>thème</em>
            <select name="theme" onChange={handleChange} value={project.theme}>
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
            <em>description</em>
            <textarea
              onChange={handleChange}
              name="description"
              value={project.description}
              placeholder="description"
              className="description"
            />
            {!saved && <ValidateButton action={handleSubmit} />}
          </fieldset>
        </form>
        <div className="document dashboard">
          <div className="dashboardTitle">
            <h3>Données du projet</h3>
            <div onClick={handleClick} className="classicButton deselect">
              CRÉER UN ÉLEMENT
            </div>
          </div>
          {project.children.length !== 0 &&
            project.children.map((element, i) => {
              return <Tile key={i} element={element} />;
            })}
        </div>
      </section>
    </main>
  );
};

export default Production;
