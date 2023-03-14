import "../assets/styles/Footer.scss";
import ClassicButton from "../components/ClassicButton";

const Footer = () => {
  return (
    <footer>
      <nav>
        <ClassicButton
          class="classicButton deselect"
          link="/contacts"
          content="contacts"
        />
        <ClassicButton
          class="classicButton deselect"
          link="/thanks"
          content="remerciements"
        />
      </nav>
    </footer>
  );
};

export default Footer;
