import express from "express";
import {
  getUsers,
  getProjects,
  deleteUser,
  createCategory,
  deleteCategory,
  deleteProject,
  deleteComment,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getusers", getUsers);
adminRouter.get("/getprojects", getProjects);
adminRouter.delete("/deleteuser/:id", deleteUser);
adminRouter.delete("/deletecategory", deleteCategory);
adminRouter.delete("/deleteproject", deleteProject);
adminRouter.delete("/deletecomment", deleteComment);
adminRouter.post("/createcategory", createCategory);

export default adminRouter;
