import { toast } from "react-toastify";

export const saveOk = () => toast.success("Sauvegarde effectuée");
export const deleteOk = () => toast.success("Suppression effectuée");
export const addCategory = () => toast.success("Ajout effectué");
export const newElement = () => toast.success("Création réussie");
export const commentOk = () => toast.success("Commentaire posté");

export const loginOk = () => toast.success("Connexion réussie");
export const registerOk = () => toast.success("Inscription réussie");
export const logoutOk = () => toast.success("Déconnexion réussie");

export const errorMessage = (message) => toast.error(message);
