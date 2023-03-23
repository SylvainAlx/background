import { uploadFile, deleteFile } from "../../utils/FetchOperations";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

export const DisplayImage = ({ element, setElement, setSaved, update }) => {
  const project = useSelector((state) => state.project);

  const handleFile = (e) => {
    if (window.confirm(`Enregistrer l'image ?`)) {
      upload(e.target.files[0]);
    }
  };

  const handleDeleteImage = (e) => {
    if (window.confirm(`Supprimer l'image ?`)) {
      const payload = {
        path: "public/" + e.target.id,
      };
      deleteFile(payload)
        .then((result) => {
          console.log(result.message);
          setElement({ ...element, image: "" });
          const path = "";
          update(path);
        })
        .catch((error) => console.log(error));
    }
  };

  const upload = (file) => {
    const payload = {
      file,
      projectId: project._id,
    };
    uploadFile(payload)
      .then((result) => {
        const path = result.newpath.replace("public/", "");
        setElement({ ...element, image: path });
        update(path);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="imageControl">
      {element.image !== "" ? (
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
          <img src={`http://localhost:9875/images/noimage.jpg`} alt="noimage" />
        </>
      )}
    </div>
  );
};
