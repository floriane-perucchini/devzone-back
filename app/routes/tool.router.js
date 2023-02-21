import express from "express";
import   { toolController } from '../controllers/index.controller.js';

const router = express.Router();

// GET Routes
router.get("/tools", toolController.getAlltools);
router.get("/tool/:id", toolController.getTool);

// POST Routes
router.post("/tool", toolController.createTool);


// PATCH Routes
router.patch("/tool/:id", toolController.updateTool);

//DELETE Routes
router.delete("/tool/:id", toolController.deleteTool)

export default router;
