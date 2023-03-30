import "../assets/styles/Header.scss";
import Nav from "../components/nav/Nav.js";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="title">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>background</h1>
        </Link>
        <em>worldbuilding pour créateurs d'histoires</em>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
