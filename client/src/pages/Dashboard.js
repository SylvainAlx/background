import Nav from "../components/nav/Nav.js"



const Dashboard = () => {

    

    return (

        <>
            <Nav page="dashboard"/>
            <main className="main">
                <h2>Tableau de bord</h2>
                <input type="text" name="search" placeholder="RECHERCHER"></input>
            </main>
        </>
    )
}

export default Dashboard