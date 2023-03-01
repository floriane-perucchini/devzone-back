import express from "express";
import { toolController as tool } from "../controllers/index.controller.js";
import { validateTool as validate } from "../middlewares/validators/index.validator.js";

const router = express.Router();
/**
 * tool
 * @typedef {object} tool
 * @property {string} name - nom
 * @property {string} logo - logo
 * @property {string} description - description
 */

// GET Routes
/**
 * GET /v1/tool
 * @summary affiche un tool
 * @tags tool
 * @return {string} 200 - un ou plusieurs tools"
 * @return {object} 500 - Unexpected error
 */
router.get("/tools", tool.getAll);
router.get("/tool/:id", tool.get);

// POST Routes
/**
 * POST /tool
 * @summary ajout d'un nouveau tool
 * @tags tool
 * @param {tool} request.body.required - tool info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.post("/tool", validate, tool.create);

// PATCH Routes
/**
 * PATCH /tool/:id
 * @summary modification d'un tool
 * @tags tool
 * @param {tool} request.body.required - tool info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.patch("/tool/:id", validate, tool.update);

//DELETE Routes
/**
 * DELETE /tool/:id
 * @summary suppression d'un tool
 * @tags tool
 * @param {tool} request.body.required - tool info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.delete("/tool/:id", tool.delete);

export default router;
