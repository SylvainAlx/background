import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillFileAdd, AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { setProject } from "../../store/slices/projectSlice";
import "../../assets/styles/Tile.scss";

const Tile = (props) => {
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const index = props.index;
    setElement({ ...element, index: index });
  }, []);

  const [element, setElement] = useState(props.element);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setElement({ ...element, [name]: value });
  };

  const handleClick = (e) => {
    if (
      window.confirm(
        `Valider les modifications de l'élément ${element.title} ?`
      )
    ) {
      const updateData = Object.assign([], project.data);
      updateData[element.index] = element;
      const updateProject = Object.assign({}, project);
      updateProject.data = updateData;
      dispatch(setProject(updateProject));
    }
  };

  const handleDelete = (e) => {
    if (window.confirm(`Supprimer l'élément ${element.title} ?`)) {
      const updateData = Object.assign([], project.data);

      const remove = (array) => {
        array.forEach((child, i) => {
          if (child.title === element.title) {
            array.splice(i, 1);
          } else {
            remove(child);
          }
        });
      };

      remove(updateData);
      const updateProject = Object.assign({}, project);
      updateProject.data = updateData;
      //console.log(updateProject);
      dispatch(setProject(updateProject));

      /*
      updateData.splice(element.index, 1);
      
      
      */
    }
  };

  return (
    <div className="tile">
      {element.image !== "" ? (
        <>
          <img src={element.image} alt={element.image} />
          <AiFillDelete />
        </>
      ) : (
        <>
          <label className="classicButton green">
            <AiFillFileAdd />
            Choisir une image
            <input id="file" className="input-file" type="file" />
          </label>
          <img
            src={`http://localhost:9875/images/noimage.jpg`}
            alt="pas d'image"
          />
        </>
      )}
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
        name="category"
        value={element.tag}
        placeholder="tag"
      />
      <textarea
        onChange={handleChange}
        name="description"
        value={element.description}
        placeholder="description"
      />
      <div className="littleFlex">
        <AiFillDelete onClick={handleDelete} className="icon delete" />
        <AiFillCheckCircle onClick={handleClick} className="icon validate" />
      </div>
    </div>
  );
};

export default Tile;
