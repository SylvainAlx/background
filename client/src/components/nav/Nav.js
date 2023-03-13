import ClassicButton from "../ClassicButton.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import AsideMenu from "../aside/AsideMenu.js";
import BurgerMenu from "./BurgerMenu.js";

const Nav = () => {
  const [asideOpen, setAsideOpen] = useState("hidden");
  const [burgerModel, setBurgerModel] = useState("burgerClose");
  const user = useSelector((state) => state.user);

  const toggleAside = () => {
    if (asideOpen === "hidden") {
      setAsideOpen("show");
      setBurgerModel("burgerOpen");
    } else {
      setAsideOpen("hidden");
      setBurgerModel("burgerClose");
    }
  };

  return (
    <>
      <nav className="headerNav">
        <div onClick={toggleAside}>
          <BurgerMenu burgerModel={burgerModel} />
        </div>
        <ClassicButton link="/" content="accueil" />
        <ClassicButton link="/" content="parcourir" />
        {user.email === "" ? (
          <>
            <ClassicButton link="/login" content="se connecter" />
            <ClassicButton link="/register" content="s'inscrire" />
          </>
        ) : (
          <ClassicButton link="/" content="se déconnecter" />
        )}
      </nav>
      <aside className={asideOpen}>
        <AsideMenu />
      </aside>
    </>
  );
};
export default Nav;
