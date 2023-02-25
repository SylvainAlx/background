import { useNavigate } from "react-router-dom";
import ClassicButton from "../components/ClassicButton"


const Register = () => {

    const navigate = useNavigate()

    const handleClick = () => {

        navigate("/dashboard")
    }


    return (
        <main className="main">
            <h3>Pas encore de compte ?</h3>
            <form>
                <fieldset className="userFieldset">
                    <legend>Inscrivez-vous</legend>
                    <input type="text" name="name" placeholder="nom d'utilisateur" />
                    <input type="email" name="email" placeholder="e-mail" />
                    <input type="password" name="password" placeholder="mot de passe" />
                    <div onClick={handleClick}>
                        < ClassicButton link="/dashboard" content={"VALIDER"}/>
                    </div>
                </fieldset>
            </form>
        </main>
    )
}

export default Register