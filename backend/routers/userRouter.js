import express from "express";
import {
  getCategories,
  createProject,
  getMyProjects,
  deleteProject,
  updateProject,
} from "../controllers/user/projectsController.js";
import {
  updateAccount,
  deleteAccount,
} from "../controllers/user/settingsController.js";
import {
  addComment,
  deleteComment,
} from "../controllers/user/commentsController.js";
import { uploadFile, deleteFile } from "../controllers/user/filesController.js";

const userRouter = express.Router();

userRouter.put("/updateaccount", updateAccount);
userRouter.delete("/deleteaccount", deleteAccount);
userRouter.get("/getcategories", getCategories);
userRouter.post("/createproject", createProject);
userRouter.get("/getmyprojects", getMyProjects);
userRouter.delete("/deleteproject", deleteProject);
userRouter.put("/updateproject", updateProject);
userRouter.post("/addcomment", addComment);
userRouter.delete("/deletecomment", deleteComment);
userRouter.post("/uploadfile", uploadFile);
userRouter.delete("/deletefile", deleteFile);

export default userRouter;
