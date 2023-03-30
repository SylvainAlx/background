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

export const projectApi = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findOne({ _id: projectId });
    res.status(200).json({
      title: project.title,
      support: project.support,
      theme: project.theme,
      description: project.description,
      children: project.children,
    });
  } catch (error) {
    res.status(400).json({
      message: "aucun projet à afficher",
      erreur: error.message,
    });
  }
};
