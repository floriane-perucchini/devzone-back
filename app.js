import express from "express";
import logger from "morgan";
import fs from "fs";
import cors from "cors";

import router from "./app/routes/index.router.js";
import { errorsHandler } from "./app/middlewares/index.middleware.js";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(
  logger("common", {
    stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router);

app.use(errorsHandler);

export default app;
