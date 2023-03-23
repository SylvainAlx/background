import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCaretDown } from "react-icons/ai";
import {
  createChildren,
  setChildren,
  unsetChildren,
} from "../../store/slices/projectSlice";
import "../../assets/styles/Tile.scss";
import ValidateButton from "../ValidateButton";
import DeleteButton from "../DeleteButton";
import { DisplayImage } from "./DisplayImage";
import CreateTile from "./CreateTile";
import { useNavigate } from "react-router-dom";

const Tile = (props) => {
  const project = useSelector((state) => state.project);
  const [element, setElement] = useState(props.element);
  const [saved, setSaved] = useState(true);
  const [displayChildren, setDisplayChildren] = useState("hidden");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSaved(false);
    const value = e.target.value;
    const name = e.target.name;
    setElement({ ...element, [name]: value });
  };

  const update = (path) => {
    dispatch(
      setChildren({
        tile: element,
        path,
        project: project,
      })
    );
    window.alert("sauvegarde effectuée");
    setSaved(true);
  };

  const handleClick = () => {
    if (window.confirm(`Sauvegarder l'élément ${element.title} ?`)) {
      update();
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Supprimer l'élément ${element.title} ?`)) {
      dispatch(unsetChildren({ project: project, tile: element }));
      setSaved(true);
    }
  };

  const addSubTile = () => {
    let newTile = CreateTile(element.id);
    const updateData = [...element.children];
    updateData.push(newTile);
    setElement({ ...element, children: updateData });
    dispatch(createChildren({ project, tile: newTile }));
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
        <div onClick={addSubTile} className="classicButton green">
          AJOUTER
        </div>
        {element.children.map((child, i) => {
          return <Tile key={i} element={child} />;
        })}
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
