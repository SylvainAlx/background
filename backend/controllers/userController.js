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
        console.error(error);
        res.status(500).send(
            "Une erreur s'est produite lors de la mise à jour de l'utilisateur."
        );
    }
};
