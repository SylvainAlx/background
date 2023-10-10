import express from "express";
import {
  getHome,
  getpublicprojects,
  projectApi,
} from "../controllers/publicController.js";
import { getComments } from "../controllers/user/commentsController.js";

const publicRouter = express.Router();

publicRouter.get("/getpublicprojects", getpublicprojects);
publicRouter.get("/getcomments", getComments);
publicRouter.get("/api/:id", projectApi);
publicRouter.get("/", getHome);

export default publicRouter;
