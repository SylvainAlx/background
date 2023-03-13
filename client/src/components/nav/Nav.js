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
      <nav className={`headerNav, ${navOpen}`}>
        <ClassicButton link="/" content="accueil" />
        <ClassicButton link="/" content="parcourir" />
        {user.isAdmin && (
          <ClassicButton link="/admin" content="administration" />
        )}
        {user.email === "" ? (
          <>
            <ClassicButton link="/login" content="se connecter" />
            <ClassicButton link="/register" content="s'inscrire" />
          </>
        ) : (
          <>
            <ClassicButton link="/dashboard" content="tableau de bord" />
            <ClassicButton link="/settings" content="paramètres" />
            <div
              className="classicButton"
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
