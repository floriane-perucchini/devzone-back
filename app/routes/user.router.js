import express from "express";
import { userController as user } from "../controllers/index.controller";

const router = express.Router();

// GET Routes
router.get("/users", user.getAll);
router.get("/user", user.get);

// POST Routes
router.post("/user", user.create);

// PATCH Routes
router.patch("/user/:id", user.update);

// DELETE Routes
router.delete("/user/:id", user.delete);

export default router;
