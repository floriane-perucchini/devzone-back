import express from "express";
import favoriteController from "../controllers/user.controller.js";

const router = express.Router();

// GET Routes
router.get("/", favoriteController.getFavorite);

// GET Routes
router.post("/user", favoriteController.createFavorite);

export default router;
