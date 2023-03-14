import ClassicButton from "../ClassicButton.js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu.js";
import { setUser } from "../../store/slices/userSlice.js";

const Nav = () => {
  const [navOpen, setNavOpen] = useState("hidden");
  const [burgerModel, setBurgerModel] = useState("burgerClose");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleNav = () => {
    if (navOpen === "hidden") {
      setNavOpen("show");
      setBurgerModel("burgerOpen");
    } else {
      setNavOpen("hidden");
      setBurgerModel("burgerClose");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    dispatch(setUser({ email: "", isAdmin: false }));
    navigate("/");
  };

  return (
    <>
      <div onClick={toggleNav}>
        <BurgerMenu burgerModel={burgerModel} />
      </div>
      <nav className={`headerNav, ${navOpen}`} onClick={toggleNav}>
        <ClassicButton
          link="/"
          class="classicButton deselect"
          content="accueil"
        />
        <ClassicButton
          link="/publics"
          class="classicButton deselect"
          content="parcourir les projets"
        />
        {user.isAdmin && (
          <ClassicButton
            link="/admin"
            class="classicButton deselect"
            content="administration"
          />
        )}
        {user.email === "" ? (
          <>
            <ClassicButton
              link="/login"
              class="classicButton deselect"
              content="se connecter"
            />
            <ClassicButton
              link="/register"
              class="classicButton deselect"
              content="s'inscrire"
            />
          </>
        ) : (
          <>
            <ClassicButton
              link="/dashboard"
              class="classicButton deselect"
              content="tableau de bord"
            />
            <ClassicButton
              link="/settings"
              class="classicButton deselect"
              content="paramètres"
            />
            <div
              className="classicButton deselect"
              link="/"
              content="se déconnecter"
              onClick={handleClick}
            >
              se déconnecter
            </div>
          </>
        )}
      </nav>
    </>
  );
};
export default Nav;
