import express from "express";
import { featureController as feature } from "../controllers/index.controller.js";
// import { validateImage as validate } from "../middlewares/validators/index.validator.js";

const router = express.Router();

// GET Routes
router.get("/api/rss", feature.rss);

export default router;
