import express from "express";
import {
    updateUser,
    createProject,
    getMyProjects,
    deleteProject,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/updateuser", updateUser);
userRouter.post("/createproject", createProject);
userRouter.get("/getmyprojects", getMyProjects);
userRouter.delete("/deleteproject", deleteProject);

export default userRouter;
