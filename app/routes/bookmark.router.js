import express from "express";
import { bookmarkController as bookmark } from "../controllers/index.controller.js";
import { validateBookmark as validate } from "../middlewares/validators/index.validator.js";

const router = express.Router();

// GET Routes
router.get("/bookmarks", bookmark.getAll);
router.get("/bookmark/:id", bookmark.get);

// POST Routes
router.post("/bookmark", validate, bookmark.create);

// PATCH Routes
router.patch("/bookmark/:id", validate, bookmark.update);

//DELETE Routes
router.delete("/bookmark/:id", bookmark.delete);

export default router;
