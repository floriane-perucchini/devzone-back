import express from "express";
import { imageController as image } from "../controllers/index.controller.js";
// import { validateImage as validate } from "../middlewares/validators/index.validator.js";
import { imageUpload } from "../middlewares/index.middleware.js";

const router = express.Router();

// GET Routes
// router.get("/image/:filename", image.create);

// POST Routes
// router.post("/image", imageUpload.single("image"));

export default router;
