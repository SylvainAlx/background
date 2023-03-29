import "../assets/styles/Footer.scss";
import { AiFillGithub, AiFillMail } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="contact">
        <h4>CONTACT</h4>
        <h5>
          <a
            href={`mailto:${process.env.REACT_APP_CONTACT_MAIL}`}
            target="_blank"
            rel="noreferrer"
          >
            <AiFillMail /> {process.env.REACT_APP_CONTACT_MAIL}
          </a>
        </h5>
        <h5>
          <a
            href={process.env.REACT_APP_GITHUB}
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub /> {process.env.REACT_APP_GITHUB}
          </a>
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
