import "../assets/styles/Header.scss";
import Nav from "../components/nav/Nav.js";

const Header = () => {
  return (
    <header>
      <div className="title">
        <h1>background</h1>
        <em>worldbuilding pour créateurs d'histoires</em>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
