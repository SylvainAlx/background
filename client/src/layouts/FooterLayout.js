import "../assets/styles/Footer.scss";
import { AiFillGithub, AiFillMail } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="contact">
        <h4>CONTACT</h4>
        <h5>
          <a href="mailto:sylval49@gmail.com" target="_blank">
            <AiFillMail /> sylval49@gmail.com
          </a>
        </h5>
        <h5>
          <a href="https://github.com/SylvainAlx" target="_blank">
            <AiFillGithub /> SylvainAlx
          </a>
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
