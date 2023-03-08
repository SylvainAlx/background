import Project from "../models/projectSchema.js";

export const getpublicprojects = async (req, res) => {
    try {
        const publicProjects = await Project.find({ isPublic: true });
        res.status(200).json({ publicProjects });
    } catch (error) {
        res.status(400).json({
            message: "aucun projet à afficher",
            erreur: error,
        });
    }
};
