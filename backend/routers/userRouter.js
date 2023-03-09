import express from "express";
import {
  getTemplates,
  createProject,
  getMyProjects,
  deleteProject,
  updateProject,
} from "../controllers/user/projectsController.js";
import {
  updateAccount,
  deleteAccount,
} from "../controllers/user/settingsController.js";
import { addComment } from "../controllers/user/commentsController.js";

const userRouter = express.Router();

userRouter.put("/updateaccount", updateAccount);
userRouter.delete("/deleteaccount", deleteAccount);
userRouter.get("/gettemplates", getTemplates);
userRouter.post("/createproject", createProject);
userRouter.get("/getmyprojects", getMyProjects);
userRouter.delete("/deleteproject", deleteProject);
userRouter.put("/updateproject", updateProject);
userRouter.post("/addcomment", addComment);

export default userRouter;
