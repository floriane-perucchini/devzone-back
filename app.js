import express from "express";
// import logger from "morgan";
// import fs from "fs";
// import cors from "cors";

// import router from "./app/routes/index.js";
// import { handleErrors } from "./app/middlewares/index.js";

const app = express();

// app.use(cors());
// app.use(logger("dev"));
// app.use(logger("common", { stream: fs.createWriteStream("./access.log", { flags: "a" }) }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use(router);

// app.use(handleErrors);

export default app;
