import User from "../../models/userSchema.js";
import Project from "../../models/projectSchema.js";
import Template from "../../models/templateSchema.js";
import { deleteFolder } from "../../utils/deleteFolder.js";
import { createFolder } from "../../utils/createFolder.js";
import { gitKeep } from "../../utils/createGitkeep.js";

export const getMyProjects = async (req, res) => {
  try {
    const id = req.userId;
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
    console.log(req.body);
    const { title, support, theme, image, isPublic } = req.body;
    const user = await User.findOne({ _id: req.userId });
    const project = new Project({
      title,
      support,
      theme,
      image,
      user,
      data: [],
      publicUser: user.pseudo,
      isPublic,
    });
    project
      .save()
      .then((resp) => {
        createFolder(
          `${process.env.PUBLIC_DIR_URL}/images/${req.userId}/${project._id}`
        );
        gitKeep(
          `${process.env.PUBLIC_DIR_URL}/images/${req.userId}/${project._id}`
        );
        res.status(201).json({ project });
      })
      .catch((error) => res.status(400).json(error.message));
  } catch (error) {
    res.status(400).json({
      message: "création du projet impossible",
      erreur: error,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId, projectUser } = req.body;
    if (projectUser === req.userId) {
      Project.findByIdAndDelete(projectId)
        .then((resp) => {
          deleteFolder(
            `${process.env.PUBLIC_DIR_URL}/images/${req.userId}/${projectId}`
          );
          res.status(200).json({
            action: `le projet ${resp.title} a été retiré de la base de données`,
          });
        })
        .catch((error) => res.status(400).json(error));
    } else {
      res.status(403).json({
        message: "suppression interdite",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "suppression du projet impossible",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    if (req.body.user === req.userId) {
      const update = req.body;
      const project = await Project.findOne({ _id: update._id });
      project.title = update.title;
      project.support = update.support;
      project.theme = update.theme;
      project.image = update.image;
      project.data = update.data;
      project.isPublic = update.isPublic;
      project
        .save()
        .then((resp) => res.status(200).json({ project }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      res.status(403).json({
        message: "modification interdite",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json({ templates });
  } catch (error) {
    res.status(400).json({ error });
  }
};
