import User from "../models/userSchema.js";
import Project from "../models/projectSchema.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteUser = (req, res) => {
  try {
    const id = req.params.id;
    User.findByIdAndDelete(id).then((resp) =>
      res.status(200).json({
        action: `l'utilisateur ${resp._id} a été retiré de la base de données`,
      })
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};
