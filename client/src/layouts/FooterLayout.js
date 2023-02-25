import "../assets/styles/Footer.scss"
import NavLink from "../components/nav/NavLink"

const Footer = () => {

    return (
        <footer>
            <nav>
            < NavLink link="/contacts" content="contacts"/>
            < NavLink link="/thanks" content="remerciements"/>
            </nav>
        </footer>
    )

}

export default Footer