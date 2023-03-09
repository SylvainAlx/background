import Project from "../../models/projectSchema.js";
import User from "../../models/userSchema.js";
import Comment from "../../models/commentSchema.js";

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
    if (!commentId || !commentUser) {
      return res.status(400).json({
        message: "informations manquantes",
      });
    }
    if (commentUser === req.userId) {
      Comment.findByIdAndDelete(commentId)
        .then((resp) =>
          res.status(200).json({
            action: `le commentaire à été supprimé`,
          })
        )
        .catch((error) => res.status(400).json(error));
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
