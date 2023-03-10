import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import fs from "fs";

export const register = async (req, res) => {
    try {
        const { pseudo, email, password } = req.body;
        const user = new User({
            pseudo,
            email,
            password,
            isAdmin: email === process.env.EMAIL_ADMIN,
        });
        user
            .save()
            .then((user) => {
                const jwt = user.createJWT();
                fs.mkdir(
                    `${process.env.PUBLIC_DIR_URL}/images/${user._id}`,
                    (error) => {
                        if (error) {
                            console.log(error);
                        }
                    }
                );
                res.status(201).json({ user, jwt });
            })

            .catch((error) => {
                if (error.code === 11000) {
                    res.status(400).json({
                        message: "informations déjà existantes dans la base de données",
                        erreur: error.keyValue,
                    });
                } else {
                    res.status(400).json({ erreur: error.message });
                }
            });
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
            .then((user) => {
                user.comparePassword(password, async (error, isMatch) => {
                    if (isMatch) {
                        const jwt = user.createJWT();
                        res.status(200).json({ user, jwt });
                    } else {
                        res.status(401).json({
                            message: "mot de passe invalide",
                        });
                    }
                });
            })
            .catch((error) => {
                res.status(400).json({ message: "utilisateur introuvable" });
            });
    } catch (error) {
        res.status(400).json({ message: "connexion impossible" });
    }
};

export const verify = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        const user = await User.findOne({ email: decoded.email });
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: "JWT erroné" });
    }
};
