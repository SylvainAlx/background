
import ClassicButton from "../ClassicButton.js"
import { useState } from "react"
import AsideMenu from "../aside/AsideMenu.js"
import BurgerMenu from "./BurgerMenu.js"

const Nav = (props) => {

    const [asideOpen, setAsideOpen] = useState("hidden")
    const [burgerModel, setBurgerModel] = useState("burgerClose")

    const toggleAside = () => {
        if(asideOpen === "hidden"){
            setAsideOpen("show")
            setBurgerModel("burgerOpen")
        }
        else{
            setAsideOpen("hidden")
            setBurgerModel("burgerClose")
        }
    }

    if(props.page === "home"){

        return (
            <nav className="headerNav">
                <ClassicButton link="/login" content="se connecter"/>
            </nav>
        )
    }
    else{
        return (
            <nav className="headerNav">
                <ClassicButton link="/" content="accueil"/>
                <div onClick={toggleAside}>
                    <BurgerMenu burgerModel={burgerModel} />
                </div>
                <aside className={asideOpen}>
                    <AsideMenu />
                </aside>
            </nav>
        )
    }
}
export default Nav