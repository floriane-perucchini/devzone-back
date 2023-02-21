import express from "express";
import { toolController as tool } from "../controllers/index.controller.js";
import { validateTool as validate } from "../middlewares/validators/index.validator.js";

const router = express.Router();

// GET Routes
router.get("/tools", tool.getAll);
router.get("/tool/:id", tool.get);

// POST Routes
router.post("/tool", validate, tool.create);

// PATCH Routes
router.patch("/tool/:id", validate, tool.update);

//DELETE Routes
router.delete("/tool/:id", tool.delete);

export default router;
