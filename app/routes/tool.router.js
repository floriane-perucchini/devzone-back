import express from "express";
import   { toolController } from '../controllers/index.controller.js';

const router = express.Router();

/**
 * tool
 * @typedef {object} tool
 * @property {string} name - nom
 * @property {string} logo - logo
 * @property {string} description - description
 */
/**

// GET Routes
/**
 * GET /v1/tool
 * @summary affiche un tool
 * @tags tool
 * @return {string} 200 - un ou plusieurs tools"
 * @return {object} 500 - Unexpected error
 */
router.get("/tools", toolController.getAlltools);
router.get("/tool/:id", toolController.getTool);


/**
 * POST /tool
 * @summary ajout d'un nouveau tool
 * @tags tool
 * @param {tool} request.body.required - tool info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */

// POST Routes
router.post("/tool", toolController.createTool);

/**
 * PATCH /tool/:id
 * @summary modification d'un tool
 * @tags tool
 * @param {tool} request.body.required - tool info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */

// PATCH Routes
router.patch("/tool/:id", toolController.updateTool);

/**
 * DELETE /tool/:id
 * @summary suppression d'un tool
 * @tags tool
 * @param {tool} request.body.required - tool info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */

//DELETE Routes
router.delete("/tool/:id", toolController.deleteTool)

export default router;
