import { AiFillDelete } from "react-icons/ai";

const DeleteButton = (props) => {
  return (
    <div onClick={props.action} className="classicButton red">
      <AiFillDelete className="iconButton" />
      supprimer
    </div>
  );
};

export default DeleteButton;
