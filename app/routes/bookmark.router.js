import express from "express";
import { bookmarkController as bookmark } from "../controllers/index.controller.js";
import { validateBookmark as validate } from "../middlewares/validators/index.validator.js";

const router = express.Router();

/**
 * bookmark
 * @typedef {object} bookmark
 * @property {string} name - nom
 * @property {string} description - description
 * @property {string} link - lien
 * @property {string} link_img - lien image
 */

// GET Routes
/**
 * GET /v1/bookmark
 * @summary affiche un bookmark
 * @tags bookmark
 * @return {string} 200 - un ou plusieurs bookmarks"
 * @return {object} 500 - Unexpected error
 */
router.get("/bookmarks", bookmark.getAll);
router.get("/bookmark/:id", bookmark.get);

// POST Routes
/**
 * POST /bookmark
 * @summary ajout d'un nouveau bookmark
 * @tags bookmark
 * @param {bookmark} request.body.required - bookmark info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.post("/bookmark", validate, bookmark.create);

// PATCH Routes
/**
 * PATCH /bookmark/:id
 * @summary modification d'un bookmark
 * @tags bookmark
 * @param {bookmark} request.body.required - bookmark info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.patch("/bookmark/:id", validate, bookmark.update);

//DELETE Routes
/**
 * DELETE /bookmark/:id
 * @summary suppression d'un bookmark
 * @tags bookmark
 * @param {bookmark} request.body.required - bookmark info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */
router.delete("/bookmark/:id", bookmark.delete);

export default router;

// TODO: Gérer le GET des bookmarks/tools etc
// TODO: Add Contact Routes && request.get('host')
// TODO: ADD default user avatar
// TODO: Understand refresh tokens
