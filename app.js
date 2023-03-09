import express from "express";
import cors from "cors";
import router from "./app/routes/index.router.js";
import { errorsHandler } from "./app/middlewares/index.middleware.js";
import logger from "morgan";
import fs from "fs";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(logger("dev"));

app.use(
  logger("common", {
    stream: fs.promises
      .access("logs")
      .catch(() => fs.mkdirSync("logs"))
      .finally(() => fs.createWriteStream("./logs/access.log", { flags: "a" })),
  })
);

app.use(router);

app.use(errorsHandler);

export default app;
