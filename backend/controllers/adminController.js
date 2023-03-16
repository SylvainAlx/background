import User from "../models/userSchema.js";
import Project from "../models/projectSchema.js";
import Template from "../models/templateSchema.js";
import Comment from "../models/commentSchema.js";
import { deleteFolder } from "../utils/deleteFolder.js";

//PROJECTS

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ erreur: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.body.projectId;
    const projectUser = req.body.projectUser;
    deleteFolder(
      `${process.env.PUBLIC_DIR_URL}images/${projectUser}/${projectId}`
    );
    Project.findByIdAndDelete(projectId)
      .then((resp) =>
        res.status(200).json({
          action: `le projet ${resp.title} a été retiré de la base de données`,
        })
      )
      .catch((error) => {
        res.status(400).json({
          message: "suppression du projet impossible",
          erreur: error.message,
        });
      });
  } catch (error) {
    res.status(400).json({
      message: "suppression du projet impossible",
      erreur: error.message,
    });
  }
};

//USERS

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ erreur: error.message });
  }
};

export const deleteUser = (req, res) => {
  try {
    const id = req.params.id;
    deleteFolder(`${process.env.PUBLIC_DIR_URL}images/${id}`);
    Project.deleteMany({ user: id })
      .then(() => {
        console.log("projet(s) supprimé(s)");
      })
      .catch((error) => {
        console.log(error);
      });
    User.findByIdAndDelete(id)
      .then((resp) => {
        res.status(200).json({
          action: `l'utilisateur ${resp._id} a été retiré de la base de données`,
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(400).json({ erreur: error.message });
  }
};

//TEMPLATES

export const createTemplate = (req, res) => {
  try {
    const { theme, data } = req.body;
    const template = new Template({
      theme,
      data,
    });
    template
      .save()
      .then((resp) => {
        res.status(201).json({ template });
      })
      .catch((error) => res.status(400).json(error.message));
  } catch (error) {
    res.status(400).json({
      message: "création du template impossible",
      erreur: error.message,
    });
  }
};

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json({ templates });
  } catch (error) {
    res.status(400).json({ erreur: error.message });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const { templateId } = req.body;
    Template.findByIdAndDelete(templateId)
      .then((resp) => {
        res.status(200).json({
          action: `le template a été retiré de la base de données`,
        });
      })
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    res.status(400).json({
      message: "suppression du projet impossible",
      erreur: error.message,
    });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const update = req.body;
    const template = await Template.findOne({ _id: update._id });
    template.theme = update.theme;
    template.data = update.data;

    template.save().then((resp) => res.status(200).json({ template }));
  } catch (error) {
    res.status(400).json({ message: "mise à jour impossible", erreur: Error });
  }
};

//COMMENTS

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    Comment.findByIdAndDelete(commentId)
      .then((resp) => {
        res.status(200).json({
          action: `le commentaire a été retiré de la base de données`,
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: "suppression du commentaire impossible",
          erreur: error.message,
        })
      );
  } catch (error) {
    res.status(400).json({
      message: "suppression du commentaire impossible",
      erreur: error.message,
    });
  }
};
