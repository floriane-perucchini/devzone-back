import userRouter from "./user.router.js";
import bookmarkRouter from "./bookmark.router.js";
import toolRouter from "./tool.router.js"

import express from "express";
const router = express.Router();

router.use(userRouter);
router.use(bookmarkRouter);
router.use(toolRouter);

export default router;
