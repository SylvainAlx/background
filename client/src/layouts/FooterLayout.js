import "../assets/styles/Footer.scss";
import { AiFillGithub, AiFillMail } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="contact">
        <h4>CONTACT</h4>
        <h5>
          <AiFillMail /> sylval49@gmail.com
        </h5>
        <h5>
          <AiFillGithub /> SylvainAlx
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
