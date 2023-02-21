import express from "express";
import   { bookmarkController } from '../controllers/index.controller.js';

const router = express.Router();

/**
 * bookmark
 * @typedef {object} bookmark
 * @property {string} name - nom
 * @property {string} description - description
 * @property {string} link - lien
 * @property {string} link_img - lien image
 */

/**


// GET Routes
/**
 * GET /v1/bookmark
 * @summary Génère un bookmark
 * @tags bookmark
 * @return {string} 200 - un ou plusieurs bookmarks"
 * @return {object} 500 - Unexpected error
 */

router.get("/bookmarks", bookmarkController.getAllBookmark);
router.get("/bookmark/:id", bookmarkController.getBookmark);

/**
 * POST /v1/bookmark
 * @summary ajout d'un nouveau bookmark
 * @tags bookmark
 * @param {bookmark} request.body.required - bookmark info
 * @return {object} 200 - bookmark response
 * @return {object} 500 - Unexpected error
 */

// POST Routes
router.post("/bookmark", bookmarkController.createBookmark);


// PATCH Routes
router.patch("/bookmark/:id", bookmarkController.updateBookmark);

//DELETE Routes
router.delete("/bookmark/:id", bookmarkController.deleteBookmark)

export default router;
