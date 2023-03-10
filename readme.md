PROJET DE FIN D'ÉTUDES : DÉVELOPPEMENT D’UNE APPLICATION


Généralités

Nom : Background
Description : Le but est de proposer une application qui serait un outil d'aide à la création d'univers fictionnels (“worldbuilding”). Cela peut permettre d'aider par exemple un auteur, un cinéaste, un créateur de jeu vidéo ou jeu de plateau de poser les bases de son monde pour ensuite créer l'histoire qui en est liée.
Stack technique :
Front-end : React, SAAS
Back-end: Node.js, Express, MongoDB

Comportement utilisateur

Utilisateur non connecté

Lorsqu'un utilisateur non connecté se rend sur l'application, il peut consulter sur l'accueil la description et l'explication du fonctionnement de l’application.
Également, depuis l'onglet parcourir, il peut consulter les projets que les utilisateurs ont choisis de rendre public.
Enfin, il peut choisir de s'inscrire ou se connecter s'il possède un compte.

Utilisateur connecté

Une fois inscrit  et connecté, l'utilisateur peut accéder au tableau de bord. Depuis le tableau de bord, il peut ouvrir un projet existant ou en créer de nouveaux. Il peut choisir de rendre son projet public ou non.
Il peut aussi commenter les projets publics.
L'utilisateur a également accès à ses paramètres où il peut modifier ses informations ou supprimer son compte.

Utilisateur Administrateur

L'administrateur peut accéder au panneau d'administration depuis lequel il peut modifier ou supprimer entièrement ou en partie les collections de la base de données.


Côté backend

Base de données

Collections : 

users : la liste des utilisateurs {email,password,pseudo,isAdmin,timestamps}
projects: la liste de l’ensemble des projets de tous les users {title,user,data,isPublic,timestamps}
comments: la liste des commentaires pour les projets publics {user,message,timestamps}
templates: listes de modèles pour l’assistant de création de projet {theme, data}

Le serveur

CRUD :

routes publiques : 

GET : accès aux projets publics
POST : s’enregistrer
POST : se connecter

routes utilisateurs (vérification du JWT) : 

GET : accès aux templates lors de la création d’un nouveau projet
GET : accès à ses propres projets
POST : créer des projets
PUT : modifier ses projets
POST : uploader une image
DELETE : supprimer une image
POST : ajout de commentaires sur les projets publiques
PUT : modifier ses informations de compte
DELETE : supprimer un ou plusieurs de ses projets
DELETE : supprimer un ou plusieurs de ses commentaires
DELETE : supprimer son compte

routes administrateurs (vérification du JWT et des droit admin) : 

GET : accès à la liste des utilisateurs
GET : accès aux projets
POST : création des templates
PUT : modification des templates
DELETE: supprimer des templates
DELETE: supprimer des utilisateurs
DELETE: supprimer des projets
DELETE: supprimer des commentaires


côté front

La navigation

pages publiques :

accueil (“/”) : page d’accueil avec la présentation de Background
projets publics (“/publics”) : liste des projets publics
s'enregistrer (“/register”) : formulaire d’inscription
login (“/login”) : formulaire de connexion

page utilisateurs : 

tableau de bord (“/dashboard”) : interface d’édition des projets

page administrateurs : 

administration (“/admin”) : gestion des utilisateurs et des projets


Projet de l'utilisateur

Création d'un nouveau projet

Assistant de création : 

L’assistant de création de projet propose à l’utilisateur certains paramètres prédéfinis pour se lancer. Il peut s’agir par exemple de modèles de lieux ou de personnages selon le style d’univers fictif (historique, fantastique, science-fiction,...). L’utilisateur peut choisir de ne pas utiliser l’assistant et démarrer sur un projet entièrement vierge.

Édition d'un projet en cours

Tableau de bord :

Une fois l’assistant passé, l’utilisateur se retrouve devant son tableau de bord. Le nouveau projet est présent. Il peut donc y entrer et ajouter des éléments enfants puis apporter des modifications. Une arborescence sur le côté permet de se repérer dans la hiérarchie des éléments du projet.

