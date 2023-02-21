import express from "express";
import { userController as user } from "../controllers/index.controller.js";
import { validateUser as validate } from "../middlewares/validators/index.validator.js";

const router = express.Router();

// GET Routes
router.get("/users", user.getAll);
router.get("/user", user.get);

// POST Routes
router.post("/user", validate, user.create);

// PATCH Routes
router.patch("/user/:id", validate, user.update);

// DELETE Routes
router.delete("/user/:id", user.delete);

export default router;
