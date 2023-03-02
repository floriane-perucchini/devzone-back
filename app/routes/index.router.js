import userRouter from "./user.router.js";
import bookmarkRouter from "./bookmark.router.js";
import toolRouter from "./tool.router.js";
import mainRouter from "./main.router.js";
import featureRouter from "./feature.router.js";
import categoryRouter from "./category.router.js";

import express from "express";
const router = express.Router();

router.use(userRouter);
router.use(bookmarkRouter);
router.use(toolRouter);
router.use(mainRouter);
router.use(featureRouter);
router.use(categoryRouter);





export default router;
