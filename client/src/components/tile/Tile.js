import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillFileAdd, AiFillDelete } from "react-icons/ai";
import { setProject } from "../../store/slices/projectSlice";
import {
  updateProject,
  uploadFile,
  deleteFile,
} from "../../utils/FetchOperations";
import "../../assets/styles/Tile.scss";
import ValidateButton from "../ValidateButton";
import DeleteButton from "../DeleteButton";

const Tile = (props) => {
  const project = useSelector((state) => state.project);
  const [element, setElement] = useState(props.element);
  const [saved, setSaved] = useState(true);

  const dispatch = useDispatch();
  const jwt = props.jwt;

  const upload = (file) => {
    const payload = {
      file,
      projectId: project._id,
    };
    uploadFile(jwt, payload)
      .then((result) => {
        const path = result.newpath.replace("public/", "");
        setElement({ ...element, image: path });
        handleClick(path);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteImage = (e) => {
    if (window.confirm(`Supprimer l'image ?`)) {
      setSaved(false);
      const payload = {
        path: "public/" + e.target.id,
      };

      deleteFile(jwt, payload)
        .then((result) => {
          console.log(result.message);
          setElement({ ...element, image: "" });
          handleClick();
        })
        .catch((error) => console.log(error));
    }
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

  const handleFile = (e) => {
    if (window.confirm(`Enregistrer l'image ?`)) {
      upload(e.target.files[0]);
    }
  };

  const handleClick = (path) => {
    const updateData = [...project.data];
    const update = (array) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === element.id) {
          array[i] = { ...element };
          path ? (array[i].image = path) : (array[i].image = "");
        } else {
          update(array[i].children);
        }
      }
    };
    update(updateData);
    const updateProject = { ...project };
    updateProject.data = updateData;
    fetchUpdate(jwt, updateProject);
    dispatch(setProject(updateProject));
    setSaved(true);
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
      dispatch(setProject(updateProject));
      setSaved(true);
    }
  };

  return (
    <div className="tile">
      {saved ? <h5>élément sauvegardé</h5> : <h5>élément non sauvegardé</h5>}
      {element.image !== "" && saved ? (
        <>
          <img
            src={`http://localhost:9875/${element.image}`}
            alt={element.image}
          />
          <div
            onClick={handleDeleteImage}
            id={element.image}
            className="classicButton red"
          >
            supprimer l'image <AiFillDelete />
          </div>
        </>
      ) : (
        <>
          <input onChange={handleFile} type="file" />
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
          <ValidateButton action={handleClick} />
        ) : (
          <DeleteButton action={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Tile;
