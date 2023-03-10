import express from "express";
import cors from "cors";
import router from "./app/routes/index.router.js";
import { errorsHandler } from "./app/middlewares/index.middleware.js";
import logger from "morgan";
import fs from "fs";
import error404 from "./app/middlewares/error404.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(logger("dev"));
app.use(
  logger("common", {
    stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
  })
);

app.use(router);
app.use(errorsHandler);
app.all("*", error404);
export default app;
