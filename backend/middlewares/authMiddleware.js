import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const secret = "key_secret";
        const decoded = jwt.verify(token, secret);
        if (decoded) {
            res.locals.decoded = decoded;
            next();
        } else {
            res.status(400).json({ error });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const isAdmin = (req, res, next) => {
    if (res.locals.decoded.isAdmin) {
        next();
    } else {
        res.status(400).json({
            erreur: "vous n'avez pas les droits d'administration",
        });
    }
};
