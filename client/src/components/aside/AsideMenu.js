import NavLink from "../nav/NavLink"

const AsideMenu = () => {
    return (
        <ul className="aside">
            <li>choix 1</li>
            <li>choix 2</li>
            <li>choix 3</li>
            <li><NavLink link="/" content="se déconnecter"/></li>

        </ul>

    )
}

export default AsideMenu