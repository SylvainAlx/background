import express from "express";
import { getpublicprojects } from "../controllers/publicController.js";

const publicRouter = express.Router();

publicRouter.get("/getpublicprojects", getpublicprojects);

export default publicRouter;
