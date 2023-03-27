import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveOk, deleteOk } from "../../utils/toast";
import { AiFillCaretDown } from "react-icons/ai";
import {
  createChildren,
  setChildren,
  unsetChildren,
} from "../../store/slices/projectSlice";
import "../../assets/styles/Tile.scss";
import ValidateButton from "../buttons/ValidateButton";
import DeleteButton from "../buttons/DeleteButton";
import { DisplayImage } from "./DisplayImage";
import CreateTile from "./CreateTile";
import "react-toastify/dist/ReactToastify.css";

const Tile = (props) => {
  const project = useSelector((state) => state.project);
  const [element, setElement] = useState(props.element);
  const [saved, setSaved] = useState(true);
  const [displayChildren, setDisplayChildren] = useState("hidden");

  const dispatch = useDispatch();

  useEffect(() => {
    setSaved(true);
  }, [project]);

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
    saveOk();
  };

  const handleClick = () => {
    if (window.confirm(`Sauvegarder l'élément ${element.title} ?`)) {
      update();
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Supprimer l'élément ${element.title} ?`)) {
      dispatch(unsetChildren({ project: project, tile: element }));
      deleteOk();
    }
  };

  const addSubTile = () => {
    let newTile = CreateTile(element.id);
    const updateData = [...element.children];
    updateData.push(newTile);
    setElement({ ...element, children: updateData });
    dispatch(createChildren({ project, tile: newTile }));
    saveOk();
  };

  return (
    <div className="tile">
      <DisplayImage
        element={element}
        setElement={setElement}
        setSaved={setSaved}
        update={update}
      />
      <div className="tileForm">
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
          className="description"
        />
      </div>

      <h5>nombre de sous-elements : {element.children.length}</h5>
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
        <div onClick={addSubTile} className="addButton classicButton green">
          AJOUTER
        </div>
        {element.children.map((child, i) => {
          return <Tile key={i} element={child} />;
        })}
      </div>
      {saved ? <h5>élément sauvegardé</h5> : <h5>élément non sauvegardé</h5>}
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
