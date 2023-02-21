import userRouter from "./user.router.js";
import favoriteRouter from "./favorite.router.js";
import toolRouter from "./tool.router"

import express from "express";
const router = express.Router();

router.use(userRouter);
router.use(favoriteRouter);
router.use(toolRouter);

export default router;
