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

export const deleteUser = async (req, res) => {
    try {
        const i = req.params.id;
        const users = await User.find();
        const ID = users[i]._id;
        User.findByIdAndDelete(ID, (error) => {
            if (error) res.send(error);
        });
    } catch (error) {
        res.send(error);
    }
};
