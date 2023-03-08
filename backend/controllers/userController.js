import User from "../models/userSchema.js";
import Project from "../models/projectSchema.js";
import Template from "../models/templateSchema.js";

export const updateUser = async (req, res) => {
    try {
        const { id, pseudo, email, password } = req.body;
        const updateUser = {
            pseudo,
            email,
            password,
        };
        const user = await User.findByIdAndUpdate(id, updateUser, {
            new: true,
        });
        res.json(user);
    } catch (error) {
        res.status(500).send(
            "Une erreur s'est produite lors de la mise à jour de l'utilisateur."
        );
    }
};
export const getMyProjects = async (req, res) => {
    try {
        const id = req.body.id;
        const projects = await Project.find({ user: id });
        res.status(200).json({ projects });
    } catch (error) {
        res.status(400).json({
            message: "aucun projet à afficher",
            erreur: error,
        });
    }
};
export const createProject = async (req, res) => {
    try {
        const { title, theme, userId, isPublic } = req.body;
        const user = await User.findOne({ _id: userId });
        const project = new Project({
            title,
            theme,
            user: user,
            data: [],
            isPublic,
        });
        project.save();
        res.status(201).json({ project });
    } catch (error) {
        res.status(400).json({
            message: "création du projet impossible",
            erreur: error,
        });
    }
};

export const deleteProject = (req, res) => {
    const id = req.params.id;
    Project.findByIdAndDelete(id)
        .then((resp) =>
            res.status(200).json({
                action: `le projet ${resp.title} a été retiré de la base de données`,
            })
        )
        .catch((error) => res.status(400).json(error));
};
