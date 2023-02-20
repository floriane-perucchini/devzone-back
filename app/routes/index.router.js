import userRouter from "./user.router.js";
import favoritesRouter from "./favorites.router.js";

import express from "express";
const router = express.Router();

router.use(userRouter);
router.use(favoritesRouter);

export default router;
