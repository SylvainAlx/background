import express from "express";
import { getUsers, getProjects } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getusers", getUsers);
adminRouter.get("/getprojects", getProjects);

export default adminRouter;
