import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillFileAdd, AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { setProject } from "../../store/slices/projectSlice";
import { updateProject, uploadFile } from "../../utils/FetchOperations";
import "../../assets/styles/Tile.scss";

const Tile = (props) => {
  const project = useSelector((state) => state.project);
  const [element, setElement] = useState(props.element);
  const [saved, setSaved] = useState(true);

  const dispatch = useDispatch();
  const jwt = props.jwt;

  const upload = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const payload = {
      file,
      projectId: project._id,
    };
    uploadFile(jwt, payload)
      .then((result) => {
        const path = result.newpath.replace("public/", "");
        setElement({ ...element, image: path });
      })
      .catch((error) => console.log(error));
  };

  const handleFileChange = (e) => {
    console.log(e);
  };

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

  const handleClick = (e) => {
    if (
      window.confirm(
        `Valider les modifications de l'élément ${element.title} ?`
      )
    ) {
      const updateData = [...project.data];
      const update = (array) => {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id === element.id) {
            array[i] = element;
          } else {
            update(array[i].children);
          }
        }
      };
      update(updateData);
      const updateProject = { ...project };
      updateProject.data = updateData;
      fetchUpdate(jwt, updateProject);
      setSaved(true);
    }
  };

  const handleDelete = (e) => {
    if (window.confirm(`Supprimer l'élément ${element.title} ?`)) {
      const updateData = [...project.data];
      const remove = (array) => {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id === element.id) {
            array.splice(i, 1);
          } else {
            remove(array[i].children);
          }
        }
      };
      remove(updateData);
      const updateProject = { ...project };
      updateProject.data = updateData;
      fetchUpdate(jwt, updateProject);
    }
  };

  return (
    <div className="tile">
      {element.image !== "" ? (
        <>
          <img
            src={`http://localhost:9875/${element.image}`}
            alt={element.image}
          />
          <AiFillDelete className="icon delete" />
        </>
      ) : (
        <>
          <form onSubmit={upload}>
            <input type="file" />
            <button type="submit">Envoyer</button>
          </form>
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
        {!saved ? (
          <AiFillCheckCircle onClick={handleClick} className="icon validate" />
        ) : (
          <AiFillDelete onClick={handleDelete} className="icon delete" />
        )}
      </div>
    </div>
  );
};

export default Tile;
