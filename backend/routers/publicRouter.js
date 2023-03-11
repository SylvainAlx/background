import express from "express";
import {
  getpublicprojects,
  projectApi,
} from "../controllers/publicController.js";

const publicRouter = express.Router();

publicRouter.get("/getpublicprojects", getpublicprojects);
publicRouter.get("/api/:id", projectApi);

export default publicRouter;
