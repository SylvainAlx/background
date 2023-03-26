import User from "../models/userSchema.js";
import Project from "../models/projectSchema.js";
import Template from "../models/templateSchema.js";
import Category from "../models/categorySchema.js";
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

export const createCategory = (req, res) => {
  try {
    const { type, name } = req.body;
    const category = new Category({
      type,
      name,
    });
    category
      .save()
      .then((resp) => {
        res.status(201).json({ category });
      })
      .catch((error) => res.status(400).json(error.message));
  } catch (error) {
    res.status(400).json({
      message: "création de la catégorie impossible",
      erreur: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    Category.findByIdAndDelete(categoryId)
      .then((resp) => {
        res.status(200).json({
          action: `la catégorie a été retirée de la base de données`,
        });
      })
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    res.status(400).json({
      message: "suppression impossible",
      erreur: error.message,
    });
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
