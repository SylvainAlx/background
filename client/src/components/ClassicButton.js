import "../assets/styles/ClassicButton.scss";
import { useNavigate } from "react-router-dom";

const ClassicButton = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.link);
  };

  return (
    <div className={props.class} onClick={handleClick}>
      {props.icon}
      {props.content}
    </div>
  );
};

export default ClassicButton;
