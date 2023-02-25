import { useNavigate } from "react-router-dom";

const NavLink = (props) => {

    const navigate = useNavigate()

    const handleClick = () => {

        navigate(props.link)
    }

    return (
        <div className="navLink" onClick={handleClick}>{props.content}</div>
    )
}

export default NavLink
