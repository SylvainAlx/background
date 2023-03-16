import express from "express";
import {
  getUsers,
  getProjects,
  deleteUser,
  createTemplate,
  deleteTemplate,
  updateTemplate,
  deleteProject,
  deleteComment,
  getTemplates,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getusers", getUsers);
adminRouter.get("/getprojects", getProjects);
adminRouter.get("/gettemplates", getTemplates);
adminRouter.delete("/deleteuser/:id", deleteUser);
adminRouter.delete("/deletetemplate", deleteTemplate);
adminRouter.delete("/deleteproject", deleteProject);
adminRouter.delete("/deletecomment", deleteComment);
adminRouter.post("/createtemplate", createTemplate);
adminRouter.put("/updatetemplate", updateTemplate);

export default adminRouter;
