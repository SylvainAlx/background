import User from "../../models/userSchema.js";
import fs from "fs";
import { deleteFolder } from "../../utils/deleteFolder.js";

export const updateAccount = async (req, res) => {
    try {
        const { pseudo, email, password } = req.body;
        const user = await User.findOne({ _id: req.userId });

        (user.pseudo = pseudo || user.pseudo),
            (user.email = email || user.email),
            (user.password = password || user.password),
            user
                .save()
                .then((resp) => res.status(200).json(user))
                .catch((error) => res.status(400).json(error.message));
    } catch (error) {
        res
            .status(400)
            .send(
                "Une erreur s'est produite lors de la mise à jour de l'utilisateur."
            );
    }
};

export const deleteAccount = (req, res) => {
    try {
        const id = req.userId;
        User.findByIdAndDelete(id).then((resp) => {
            const path = `${process.env.PUBLIC_DIR_URL}/images/${req.userId}`;
            deleteFolder(path);
            res.status(200).json({
                action: `Votre compte a été supprimé`,
            });
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};
