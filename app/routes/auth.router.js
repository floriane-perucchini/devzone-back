import express from "express";
import { authController as auth } from "../controllers/index.controller.js";
import { validateAuth as validate } from "../middlewares/validators/index.validator.js";

const router = express.Router();

// POST Routes
router.post("/auth/signup", validate, auth.signup);
router.post("/auth/login", validate, auth.login);

export default router;
