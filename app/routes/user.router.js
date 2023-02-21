import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

// GET Routes
router.get('/users', userController.getAllUser);
router.get('/user', userController.getUser);

// POST Routes
router.post("/user", userController.createUser);

// PATCH Routes
router.patch('/user/:id', userController.updateUser);

// DELETE Routes
router.delete('/user/:id', userController.deleteUser);

export default router;
