import express from "express";
import { avatarController as avatar } from "../controllers/index.controller.js";
import { imageUpload as upload } from "../middlewares/index.middleware.js";

const router = express.Router();

// POST Routes
router.post("/avatar/user/:id", upload.single("avatar"), avatar.upload);

// PATCH Routes
router.patch("/avatar/user/:id", upload.single("avatar"), avatar.update);

// DELETE Routes
router.delete("/avatar/user/:id", avatar.delete);

export default router;
