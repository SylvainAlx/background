const Home = () => {
  return (
    <main className="main">
      <section>
        <h2>Bienvenue sur Background !</h2>
        <h3>Généralités</h3>
        <p>
          Le but est de proposer une application qui serait un outil d'aide à la
          création d'univers fictionnels (“worldbuilding”). Cela peut permettre
          d'aider par exemple un auteur, un cinéaste, un créateur de jeu vidéo
          ou jeu de plateau de poser les bases de son monde pour ensuite créer
          l'histoire qui en est liée.
        </p>
        <h3>Comportement utilisateur</h3>
        <p>
          Lorsqu'un utilisateur non connecté se rend sur l'application, il peut
          consulter sur l'accueil la description et l'explication du
          fonctionnement de l’application. Également, depuis l'onglet parcourir,
          il peut consulter les projets que les utilisateurs ont choisis de
          rendre public. Enfin, il peut choisir de s'inscrire ou se connecter
          s'il possède un compte.
        </p>
        <p>
          Une fois inscrit et connecté, l'utilisateur peut accéder au tableau de
          bord. Depuis le tableau de bord, il peut ouvrir un projet existant ou
          en créer de nouveaux. Il peut choisir de rendre son projet public ou
          non. Il peut aussi commenter les projets publics. L'utilisateur a
          également accès à ses paramètres où il peut modifier ses informations
          ou supprimer son compte.
        </p>
        <p>
          L'administrateur peut accéder au panneau d'administration depuis
          lequel il peut modifier ou supprimer entièrement ou en partie les
          collections de la base de données.
        </p>
      </section>
    </main>
  );
};

export default Home;
