import express from "express";
import { emailController as email } from "../controllers/index.controller.js";

const router = express.Router();

// GET Routes
router.get("/email/verify", email.verify);
router.get("/email/confirmation/:id", email.confirmation);
router.get("/password/reset-link/:id", email.resetPasswordLink);

// POST Routes
router.post("/password/reset/:id", email.resetPassword);
router.post("/contact", email.contact);

export default router;
