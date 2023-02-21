import express from "express";
// import logger from "morgan";
// import fs from "fs";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import router from "./app/routes/index.router.js";
// import { handleErrors } from "./app/middlewares/errorHandler.js";

const app = express();

import expressJSDocSwagger from "express-jsdoc-swagger";

const options = {
    info: {
        version: '1.0.0',
        title: 'devzone',
        license: {
            name: 'MIT',
        },
    },
    // Chemin de la doc
    swaggerUIPath: '/devzone-api',
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
};

expressJSDocSwagger(app)(options);

 app.use(cors());
// app.use(logger("dev"));
// app.use(logger("common", { stream: fs.createWriteStream("./access.log", { flags: "a" }) }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router);

//app.use(errorService.manage);
//app.use(handleErrors);

export default app;
