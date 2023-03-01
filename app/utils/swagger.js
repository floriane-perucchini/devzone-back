import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import expressJSDocSwagger from "express-jsdoc-swagger";
import app from "../../app.js";

const options = {
  info: {
    version: "1.0.0",
    title: "devzone",
    license: {
      name: "MIT",
    },
  },

  swaggerUIPath: "/devzone-api",
  security: {
    BasicAuth: {
      type: "http",
      scheme: "basic",
    },
  },
  baseDir: __dirname,
  filesPattern: "./**/*.js",
};

expressJSDocSwagger(app)(options);
