import Nav from "../components/nav/Nav.js"
import ClassicButton from "../components/ClassicButton.js"

const Home = () => {
    return (
        <>
            < Nav page="home"/>
            <main className="main">
                <h2>Bienvenue sur Background !</h2>
                <h3>présentation du projet :</h3>
                <p>Background est un gestionnaire de mondes pour créateurs d'histoires. Grâce à cet outil vous pourrer gérer l'ensemble des éléments qui composent votre projet de fiction, comme les lieux, les personnages, les évenements, etc...</p>
                <h3>Pour commencer :</h3>
                <ClassicButton link="/login" content="Se connecter"/>
            </main>
        </>
    )
}

export default Home