import express from "express";
import { categoryController as category } from "../controllers/index.controller.js";
//import { validateTool as validate } from "../middlewares/validators/index.validator.js";

const router = express.Router();
/**
 * category
 * @typedef {object} category
 * @property {string} name - nom
 * @property {string} logo - logo
 * @property {string} description - description
 */

// GET Routes
/**
 * GET /category
 * @summary affiche une categorie
 * @tags tool
 * @return {string} 200 - un ou plusieurs categories"
 * @return {object} 500 - Unexpected error
 */
router.get("/categories", category.getAll);
router.get("/category/:id", category.get);


export default router;
