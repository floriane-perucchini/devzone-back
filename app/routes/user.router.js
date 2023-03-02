import express from "express";
import { userController as user } from "../controllers/index.controller.js";
import { validateUser as validate } from "../middlewares/validators/index.validator.js";
import {  auth, imageUpload as upload } from "../middlewares/index.middleware.js";

const router = express.Router();
// GET Routes
router.get("/users", auth, user.getAll);
router.get("/user/:id", auth, user.get);

// POST Routes
router.post("/user/:id/upload/avatar",upload.single("avatar"),user.uploadAvatar);

// PATCH Routes
router.patch("/user/:id", validate, user.update);

// DELETE Routes
router.delete("/user/:id", user.delete);

export default router;