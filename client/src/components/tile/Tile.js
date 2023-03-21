import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCaretDown } from "react-icons/ai";
import {
  setProject,
  setChildren,
  unsetChildren,
} from "../../store/slices/projectSlice";
import { updateProject } from "../../utils/FetchOperations";
import "../../assets/styles/Tile.scss";
import ValidateButton from "../ValidateButton";
import DeleteButton from "../DeleteButton";
import ClassicButton from "../ClassicButton";
import { DisplayImage } from "./DisplayImage";

const Tile = (props) => {
  const project = useSelector((state) => state.project);
  const [element, setElement] = useState(props.element);
  const [saved, setSaved] = useState(true);
  const [displayChildren, setDisplayChildren] = useState("hidden");

  const dispatch = useDispatch();
  const jwt = props.jwt;

  useEffect(() => {
    console.log(project);
  }, [project]);

  const fetchUpdate = (jwt, project) => {
    updateProject(jwt, project)
      .then((result) => {
        dispatch(setProject(result.project));
        window.alert("sauvegarde effectuée");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setSaved(false);
    const value = e.target.value;
    const name = e.target.name;
    setElement({ ...element, [name]: value });
  };

  const update = (path) => {
    dispatch(setChildren({ children: project.data, tile: element, path }));
    window.alert("sauvegarde effectuée");
    setSaved(true);
  };

  const handleClick = () => {
    update();
  };

  const handleDelete = () => {
    if (window.confirm(`Supprimer l'élément ${element.title} ?`)) {
      dispatch(unsetChildren({ children: project.data, tile: element }));
      setSaved(true);
    }
  };

  return (
    <div className="tile">
      {saved ? <h5>élément sauvegardé</h5> : <h5>élément non sauvegardé</h5>}
      <DisplayImage
        element={element}
        setElement={setElement}
        setSaved={setSaved}
        update={update}
      />
      <input
        onChange={handleChange}
        type="text"
        name="title"
        value={element.title}
        placeholder="titre"
      />

      <input
        onChange={handleChange}
        type="text"
        name="tag"
        value={element.tag}
        placeholder="tag"
      />
      <textarea
        onChange={handleChange}
        name="description"
        value={element.description}
        placeholder="description"
      />
      <h4>nombre de sous-elements : {element.children.length}</h4>
      <div
        onClick={() => {
          displayChildren === "hidden"
            ? setDisplayChildren("show")
            : setDisplayChildren("hidden");
        }}
        className="classicButton deselect"
      >
        <AiFillCaretDown />
        VOIR LES SOUS-ÉLÉMENTS
      </div>
      <div className={`children ${displayChildren}`}>
        {element.children.map((child, i) => {
          return <h5 key={i}>{child.title}</h5>;
        })}
        <ClassicButton
          link="/production/children"
          class="classicButton deselect"
          content="détails"
        />
      </div>

      <div className="littleFlex">
        {!saved ? (
          <ValidateButton action={handleClick} />
        ) : (
          <DeleteButton action={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Tile;
