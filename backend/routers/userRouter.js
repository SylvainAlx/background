import express from "express";
import { updateUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/updateuser", updateUser);

export default userRouter;
