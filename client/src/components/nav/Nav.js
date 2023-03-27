import ClassicButton from "../buttons/ClassicButton.js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu.js";
import { setUser } from "../../store/slices/userSlice.js";
import { logoutOk } from "../../utils/toast.js";
import {
  AiFillHome,
  AiFillSetting,
  AiFillCopy,
  AiFillControl,
  AiFillRead,
} from "react-icons/ai";
import "../../assets/styles/NavButton.scss";

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
    if (window.confirm(`Souhaitez-vous vous déconnecter ?`)) {
      localStorage.removeItem("jwt");
      dispatch(setUser({ email: "", isAdmin: false }));
      navigate("/login");
      logoutOk();
    }
  };

  return (
    <>
      <div onClick={toggleNav}>
        <BurgerMenu burgerModel={burgerModel} />
      </div>
      <nav className={`headerNav ${navOpen}`} onClick={toggleNav}>
        <ClassicButton
          link="/"
          class="navButton"
          icon={<AiFillHome />}
          content="accueil"
        />
        <ClassicButton
          link="/publics"
          class="navButton"
          icon={<AiFillCopy />}
          content="projets publics"
        />
        {user.isAdmin && (
          <ClassicButton
            link="/admin"
            class="navButton"
            icon={<AiFillControl />}
            content="administration"
          />
        )}
        {user.email === "" ? (
          <>
            <ClassicButton
              link="/login"
              class="navButton"
              content="se connecter"
            />
            <ClassicButton
              link="/register"
              class="navButton"
              content="s'inscrire"
            />
          </>
        ) : (
          <>
            <ClassicButton
              link="/dashboard"
              class="navButton"
              icon={<AiFillRead />}
              content="mes projets"
            />
            <ClassicButton
              link="/settings"
              class="navButton"
              icon={<AiFillSetting />}
              content="paramètres"
            />
            <div
              className="navButton navRed"
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
