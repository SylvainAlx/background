import ClassicButton from "../ClassicButton.js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu.js";
import { setUser } from "../../store/slices/userSlice.js";
import {
  AiFillHome,
  AiFillSetting,
  AiFillCopy,
  AiFillControl,
  AiFillRead,
} from "react-icons/ai";

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
    navigate("/login");
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
          icon={<AiFillHome />}
          content="accueil"
        />
        <ClassicButton
          link="/publics"
          class="classicButton deselect"
          icon={<AiFillCopy />}
          content="projets publics"
        />
        {user.isAdmin && (
          <ClassicButton
            link="/admin"
            class="classicButton deselect"
            icon={<AiFillControl />}
            content="administration"
          />
        )}
        {user.email === "" ? (
          <>
            <ClassicButton
              link="/login"
              class="classicButton green"
              content="se connecter"
            />
            <ClassicButton
              link="/register"
              class="classicButton green"
              content="s'inscrire"
            />
          </>
        ) : (
          <>
            <ClassicButton
              link="/dashboard"
              class="classicButton deselect"
              icon={<AiFillRead />}
              content="mes projets"
            />
            <ClassicButton
              link="/settings"
              class="classicButton deselect"
              icon={<AiFillSetting />}
              content="paramètres"
            />
            <div
              className="classicButton red"
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
