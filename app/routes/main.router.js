import express from "express";
import { mainController as main } from "../controllers/index.controller.js";
import { validateMain as validate } from "../middlewares/validators/index.validator.js";

const router = express.Router();

// GET Routes
router.get("/verify", main.verify);

// POST Routes
router.post("/signup", validate, main.signup);
router.post("/login", validate, main.login);

export default router;
