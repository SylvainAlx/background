import express from "express";
import {
    getUsers,
    getProjects,
    deleteUser,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getusers", getUsers);
adminRouter.get("/getprojects", getProjects);
adminRouter.delete("/deleteuser/:id", deleteUser);

export default adminRouter;
