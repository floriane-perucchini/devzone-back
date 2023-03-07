import express from "express";
import { emailController as email } from "../controllers/index.controller.js";

const router = express.Router();

// GET Routes
router.get("/verify", email.verify);
router.get("/confirmation/:id", email.confirmation);
router.get("/reset-link/:id", email.resetPasswordLink);

// POST Routes
router.post("/reset/:id", email.resetPassword);

export default router;
