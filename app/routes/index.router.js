import userRouter from "./user.router.js";
import bookmarkRouter from "./bookmark.router.js";
import toolRouter from "./tool.router.js";
import authRouter from "./auth.router.js";
import featureRouter from "./feature.router.js";
import categoryRouter from "./category.router.js";
import emailRouter from "./email.router.js";
import avatarRouter from "./avatar.router.js";

import express from "express";
const router = express.Router();

router.use(userRouter);
router.use(bookmarkRouter);
router.use(toolRouter);
router.use(authRouter);
router.use(featureRouter);
router.use(categoryRouter);
router.use(emailRouter);
router.use(avatarRouter);

export default router;
