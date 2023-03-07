import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { pseudo, email, password } = req.body;
        const user = new User({
            pseudo,
            email,
            password,
            isAdmin: email === process.env.EMAIL_ADMIN,
        });
        user.save()
            .then((user) => {
                const jwt = user.createJWT();
                res.status(201).json({ user, jwt });
            })
            .catch((error) => {
                res.status(400).json({ error });
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
                        res.status(400).json({ message: error });
                    }
                });
            })
            .catch((error) => {
                res.status(400).json({ message: error });
            });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const verify = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        res.send(decoded);
    } catch (err) {
        res.send(err);
    }
};
