import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

// GET Routes
router.get("/", userController.getUser);

// GET Routes
router.post("/user", userController.createUser);

export default router;
