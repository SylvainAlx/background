import { AiFillCheckCircle } from "react-icons/ai";

const ValidateButton = (props) => {
  return (
    <div onClick={props.action} className="classicButton green">
      <AiFillCheckCircle className="iconButton" />
      sauvegarder
    </div>
  );
};

export default ValidateButton;
