import express from "express";
import { mainController as main } from "../controllers/index.controller.js";

const router = express.Router();

// POST Routes
router.post("/login", main.login);

export default router;
