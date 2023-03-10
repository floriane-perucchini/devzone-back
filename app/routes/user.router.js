import express from "express";
import { userController as user } from "../controllers/index.controller.js";
import { validateUser as validate } from "../middlewares/validators/index.validator.js";
// import { auth } from "../middlewares/index.middleware.js";

const router = express.Router();
// GET Routes
router.get("/users", user.getAll);
router.get("/user/:id", user.get);
router.get("/user/token", user.getByToken);

// PATCH Routes
router.patch("/user/:id", validate, user.update);

// DELETE Routes
router.delete("/user/:id", user.delete);

export default router;
