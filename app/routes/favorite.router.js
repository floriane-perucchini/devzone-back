import express from "express";
import   { favoriteController } from '../controllers/index.controller.js';

const router = express.Router();

// GET Routes
router.get("/favorites", favoriteController.getAllFavorite);
router.get("/favorite/:id", favoriteController.getFavorite);

// POST Routes
router.post("/favorite", favoriteController.createFavorite);


// PATCH Routes
router.patch("/favorite/:id", favoriteController.updateFavorite);

//DELETE Routes
router.delete("/favorite/:id", favoriteController.deleteFavorite)

export default router;
