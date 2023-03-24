import Project from "../../models/projectSchema.js";
import User from "../../models/userSchema.js";
import Comment from "../../models/commentSchema.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({
      message: "impossible de récupérer les commentaires",
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { projectId, message } = req.body;
    if (!projectId) {
      return res.status(400).json(error.message);
    }
    const project = await Project.findOne({ _id: projectId });
    const user = await User.findOne({ _id: req.userId });

    const comment = new Comment({
      message,
      user,
      project,
      publicUser: user.pseudo,
      publicProject: project.title,
    });

    comment
      .save()
      .then((resp) => res.status(201).json({ comment }))
      .catch((error) => res.status(400).json(error.message));
  } catch (error) {
    res.status(400).json({
      message: "impossible de poster le commentaire",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId, commentUser } = req.body;
    if (!commentId) {
      return res.status(400).json({
        message: "informations manquantes",
      });
    }
    if (req.userId === commentUser) {
      Comment.findByIdAndDelete(commentId)
        .then((resp) =>
          res.status(200).json({
            action: `le commentaire à été supprimé`,
          })
        )
        .catch((error) => res.status(400).json(error.message));
    } else {
      res.status(403).json({
        message: "suppression interdite",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "suppression du commentaire impossible",
    });
  }
};
