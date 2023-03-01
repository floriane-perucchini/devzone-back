import express from "express";
import { userController as user } from "../controllers/index.controller.js";
import { validateUser as validate } from "../middlewares/validators/index.validator.js";
import { auth } from "../middlewares/index.middleware.js";

const router = express.Router();
// GET Routes
router.get("/users",  user.getAll);
router.get("/user/:id",  user.getUserWithTools);

// PATCH Routes
router.patch("/user/:id", user.update);
//router.post("/user/:id", user. );

// DELETE Routes
router.delete("/user/:id", user.delete);

export default router;
