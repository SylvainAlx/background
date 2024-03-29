import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import adminRouter from "./routers/adminRouter.js";
import userRouter from "./routers/userRouter.js";
import publicRouter from "./routers/publicRouter.js";
import { verifyJwt, isAdmin } from "./middlewares/authMiddleware.js";
import { getHome } from "./controllers/publicController.js";

//config serveur
const app = express();
const PORT = 3000;
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//connection à la base de données
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("error", () => {
  console.log("Erreur lors de la connexion à la base de données");
});
mongoose.connection.on("open", () => {
  console.log("connexion à la base de données");
});

//écouteur du port
app.listen(PORT, () => {
  console.log(`server running at PORT : ${PORT}`);
  app.use("/auth", authRouter);
  app.use("/admin", [verifyJwt], [isAdmin], adminRouter);
  app.use("/user", [verifyJwt], userRouter);
  app.use("/public", publicRouter);
  app.use("/", getHome);
});
